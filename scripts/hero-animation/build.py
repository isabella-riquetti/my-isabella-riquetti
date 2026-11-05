"""Builds the animated hero illustration from the original Freepik vector.

Usage (from the repo root):
    python3 scripts/hero-animation/build.py

reads scripts/hero-animation/vector-source.svg and writes src/assets/vector.svg.

The original stays the source of truth. The artwork only has her sitting, so
this script regroups its shapes and adds a small rig (arms and legs drawn as
tapered capsules in the artwork's colours, the original shoes reused as feet)
for everything before she is seated. Every pose is computed here in Python on
a hand-written timeline and sampled into CSS keyframes:

    she stands beside the desk, right of the chair, which is pushed in;
    leans in, grabs the backrest and pulls the chair back;
    lets go and side-steps behind the desk to the front of the chair;
    sits down, feet sliding forward under the desk;
    hands go to the keyboard, she scoots the chair in, and types forever.

When she is done moving, the rig hands over to the artwork's own arms and
shins, so the resting picture (and the reduced-motion one) is the original.

All coordinates are in the artwork's 500x500 viewBox, in screen space.
"""
import math
import os
import re
import sys
import xml.etree.ElementTree as ET

SVG = "http://www.w3.org/2000/svg"
ET.register_namespace("", SVG)
NS = "{%s}" % SVG

FPS = 24
P = "ir-"  # class prefix; inline SVG CSS is global

# ---------------------------------------------------------------- timeline
# Seconds from page load. The hero fades in for about a second first (see
# [data-rise] in src/index.css), so she just stands there until it has.
START = 1.4
T_REACH = (START, START + 0.45)            # leans in, takes the backrest
T_PULL = (START + 0.5, START + 1.2)        # pulls the chair back
T_LETGO = (START + 1.2, START + 1.5)
T_WALK = (START + 1.45, START + 2.85)      # four side-steps
STEPS = 4
T_SIT = (START + 2.9, START + 3.65)
T_FEET = (START + 3.2, START + 3.75)       # feet slide under the desk
T_SETTLE = (START + 3.65, START + 3.95)
T_ARMS_UP = (START + 3.35, START + 3.95)   # hands to the keyboard
T_SWAP = (START + 3.95, START + 4.1)       # rig arms -> the artwork's arms
T_HOP1 = (START + 4.15, START + 4.4)       # scoots in, twice
T_HOP2 = (START + 4.45, START + 4.7)
T_LEGSWAP = (START + 4.7, START + 4.8)     # rig shins -> the artwork's shins
T_END = START + 4.8                        # then types forever

# ---------------------------------------------------------------- geometry
# Iso floor directions on screen: F is towards the desk (the way she faces),
# BACK is away from it.
F = (-0.866, 0.5)
BACK = (0.866, -0.5)

HC = (365.0, 294.5)            # hip centre, rest pose: pivot of the upper body
HIP_R = (350.0, 292.0)         # hips, rest pose (R is image left)
HIP_L = (380.0, 297.0)
THIGH, SHIN = 57.0, 58.0
STAND = 108.0                  # hip to ankle when standing, knees soft
ANKLE_L = (318.7, 381.0)       # where the artwork's shins meet its shoes
ANKLE_R = (282.4, 367.0)

SL = (383.5, 221.0)            # shoulders, rest pose
SR = (333.0, 220.0)
L_UP, L_FORE = 44.0, 47.0
GRIP = (367.0, 229.0)          # low on the backrest's left edge, rest pose

TYPE_L = (100.0, 165.0)        # typing arm angles, matched to the artwork
TYPE_R = (139.0, 139.0)
HANG_L = (94.0, 118.0)         # relaxed, elbows a little bent
HANG_R = (98.0, 124.0)


def scale(v, k):
    return (v[0] * k, v[1] * k)


def add(p, q):
    return (p[0] + q[0], p[1] + q[1])


def sub(p, q):
    return (p[0] - q[0], p[1] - q[1])


TUCK = scale(F, 10)            # chair starts pushed in under the desk
PULLED = scale(BACK, 15)       # where she pulls it to; she sits there, then
                               # scoots it (and herself) back in to rest
ROOT_SEAT = add(HC, PULLED)    # seated, before scooting in
ROOT_S = sub(ROOT_SEAT, (40.0, 46.0))   # standing in front of the chair
ROOT_P0 = add(ROOT_S, (102.9, 56.1))    # standing right of the desk


def ease(u):
    u = max(0.0, min(1.0, u))
    return u * u * (3 - 2 * u)


def linear(u):
    return max(0.0, min(1.0, u))


def local(t, span):
    return (t - span[0]) / (span[1] - span[0])


def prog(t, span, f=ease):
    return f(local(t, span))


def lerp(a, b, u):
    return a + (b - a) * u


def lerp2(p, q, u):
    return (lerp(p[0], q[0], u), lerp(p[1], q[1], u))


def bump(u):
    """0 -> 1 -> 0 over u in [0, 1]."""
    return math.sin(math.pi * max(0.0, min(1.0, u)))


# ------------------------------------------------------------ pose at time t
def scoot(t):
    """Offset of chair, body and feet from rest once she is seated."""
    half = scale(PULLED, 0.5)
    if t < T_HOP2[0]:
        off = lerp2(PULLED, half, prog(t, T_HOP1))
        lift = -1.6 * bump(local(t, T_HOP1))
    else:
        off = lerp2(half, (0.0, 0.0), prog(t, T_HOP2))
        lift = -1.6 * bump(local(t, T_HOP2))
    return (off[0], off[1] + lift)


def body_offset(t):
    return PULLED if t < T_HOP1[0] else scoot(t)


def chair_offset(t):
    if t < T_HOP1[0]:
        u = prog(t, T_PULL)
        # a drag, not a glide: the chair lags, then catches up
        u = u + 0.06 * math.sin(2 * math.pi * u) * (1 - u)
        return lerp2(TUCK, PULLED, u)
    return scoot(t)


def walk_u(t):
    return linear(local(t, T_WALK))


def step_phase(t):
    """(index of the step under way, progress through it) during the walk."""
    w = walk_u(t) * STEPS
    k = min(int(w), STEPS - 1)
    return k, w - k


def root(t):
    """Screen position of her hip centre."""
    if t < T_WALK[0]:
        # weight goes back with the pull
        lean_back = prog(t, T_PULL) - prog(t, T_LETGO)
        return add(ROOT_P0, (4.0 * lean_back, -1.5 * lean_back))
    if t < T_SIT[0]:
        u = walk_u(t)
        r = lerp2(ROOT_P0, ROOT_S, ease(u))
        k, s = step_phase(t)
        crouch = 4.0 * bump(u)                  # knees a little bent
        bob = -1.6 * bump(s) if 0 < u < 1 else 0.0
        return (r[0], r[1] + crouch + bob)
    if t < T_HOP1[0]:
        u = local(t, T_SIT)
        # hips go back first, then down onto the seat
        x = lerp(ROOT_S[0], ROOT_SEAT[0], ease(u))
        y = lerp(ROOT_S[1], ROOT_SEAT[1], ease(u) ** 1.35)
        settle = local(t, T_SETTLE)
        if 0 <= settle <= 1:
            y += 1.8 * bump(settle) * (1 - settle)
        return (x, y)
    return add(HC, scoot(t))


def lean(t):
    reach = -5.0 * (prog(t, T_REACH) - prog(t, T_PULL))
    pull = 3.0 * (prog(t, T_PULL) - prog(t, T_LETGO))
    k, s = step_phase(t)
    sway = 1.5 * bump(s) * (1 if k % 2 else -1) if T_WALK[0] < t < T_WALK[1] else 0
    sit = -12.0 * bump(local(t, T_SIT))
    return reach + pull + sway + sit


def torso_point(t, p):
    """Rest-pose point p carried by the upper body at time t."""
    r, a = root(t), math.radians(lean(t))
    dx, dy = p[0] - HC[0], p[1] - HC[1]
    return (r[0] + dx * math.cos(a) - dy * math.sin(a),
            r[1] + dx * math.sin(a) + dy * math.cos(a))


def ik(s, g, l1, l2, bend):
    """Two-bone IK. Returns (angle1, joint, angle2, end) in degrees/screen."""
    dx, dy = g[0] - s[0], g[1] - s[1]
    d = max(1e-6, min(math.hypot(dx, dy), l1 + l2 - 0.01))
    base = math.atan2(dy, dx)
    cos_a = (l1 * l1 + d * d - l2 * l2) / (2 * l1 * d)
    a1 = base + bend * math.acos(max(-1.0, min(1.0, cos_a)))
    j = (s[0] + l1 * math.cos(a1), s[1] + l1 * math.sin(a1))
    a2 = math.atan2(g[1] - j[1], g[0] - j[0])
    e = (j[0] + l2 * math.cos(a2), j[1] + l2 * math.sin(a2))
    return math.degrees(a1), j, math.degrees(a2), e


# ---- feet
def stance(r, hip):
    return add(add(r, sub(hip, HC)), (0.0, STAND))


def foot_target(t, side):
    hip = HIP_L if side == "L" else HIP_R
    ankle = ANKLE_L if side == "L" else ANKLE_R
    start, end = stance(ROOT_P0, hip), stance(ROOT_S, hip)
    if t < T_WALK[0]:
        return start
    if t < T_SIT[0]:
        if walk_u(t) >= 1:
            return end
        # the right foot leads (she is stepping to her right), the left follows
        mine = (0, 2) if side == "R" else (1, 3)
        k, s = step_phase(t)
        done = sum(1 for m in mine if m < k)
        a = lerp2(start, end, done / 2)
        if k not in mine:
            return a
        b = lerp2(start, end, (done + 1) / 2)
        p = lerp2(a, b, ease(s))
        return (p[0], p[1] - 8.0 * bump(s))
    seated = add(ankle, PULLED)
    if t < T_HOP1[0]:
        return lerp2(end, seated, prog(t, T_FEET))
    return add(ankle, scoot(t))


def leg_pose(t, side):
    hip = torso_point(t, HIP_L if side == "L" else HIP_R)
    return ik(hip, foot_target(t, side), THIGH, SHIN, bend=1)


# ---- arms
def grip(t):
    return add(GRIP, chair_offset(t))


def near(a, ref):
    """a, shifted by whole turns to within half a turn of ref, so blending
    two angles never swings the long way round."""
    return a - 360.0 * round((a - ref) / 360.0)


def walking_swing(t, side):
    if not T_WALK[0] < t < T_WALK[1]:
        return 0.0
    k, s = step_phase(t)
    sign = 1 if (k % 2 == 0) == (side == "L") else -1
    return 5.0 * sign * bump(s)


def arm_pose(t, side):
    s = torso_point(t, SL if side == "L" else SR)
    hang = HANG_L if side == "L" else HANG_R
    typing = TYPE_L if side == "L" else TYPE_R
    tilt = lean(t) + walking_swing(t, side)
    hang = (hang[0] + tilt, hang[1] + tilt)
    up = prog(t, T_ARMS_UP)
    a1, a2 = lerp(hang[0], typing[0], up), lerp(hang[1], typing[1], up)
    if side == "R":
        hold = prog(t, T_REACH) - prog(t, T_LETGO)
        if hold > 0:
            h1, _, h2, _ = ik(s, grip(t), L_UP, L_FORE, bend=-1)
            a1 = lerp(a1, near(h1, a1), hold)
            a2 = lerp(a2, near(h2, a2), hold)
    e = (s[0] + L_UP * math.cos(math.radians(a1)),
         s[1] + L_UP * math.sin(math.radians(a1)))
    return s, a1, e, a2


# ------------------------------------------------------------- keyframes
def fmt(x, nd=1):
    s = f"{x:.{nd}f}".rstrip("0").rstrip(".")
    return "0" if s in ("-0", "") else s


def keyframes(name, fn):
    """fn(t) -> css declarations; sampled at FPS, holds collapsed."""
    n = int(round(T_END * FPS))
    d = [fn(min(T_END, i / FPS)) for i in range(n + 1)]
    keep = [i for i in range(n + 1)
            if i in (0, n) or d[i] != d[i - 1] or d[i] != d[i + 1]]
    body = "".join(f"{fmt(100.0 * i / n, 2)}%{{{d[i]}}}" for i in keep)
    return f"@keyframes {P}{name}{{{body}}}"


def tr(x, y):
    return f"translate({fmt(x)}px,{fmt(y)}px)"


def place(p, deg):
    return f"transform:{tr(*p)} rotate({fmt(deg)}deg)"


def kf_chair(t):
    return f"transform:{tr(*chair_offset(t))}"


def kf_torso(t):
    return (f"transform:{tr(*root(t))} rotate({fmt(lean(t))}deg) "
            f"{tr(-HC[0], -HC[1])}")


def kf_lap(t):
    op = prog(t, (T_SIT[1] - 0.3, T_SIT[1]), linear)
    return f"transform:{tr(*body_offset(t))};opacity:{fmt(op, 2)}"


def kf_foot(side):
    anchor = ANKLE_L if side == "L" else ANKLE_R

    def f(t):
        return f"transform:{tr(*sub(leg_pose(t, side)[3], anchor))}"
    return f


def kf_leg(side, which):
    def f(t):
        a1, knee, a2, _ = leg_pose(t, side)
        if which == "thigh":
            hip = torso_point(t, HIP_L if side == "L" else HIP_R)
            return place(hip, a1)
        return place(knee, a2)
    return f


def kf_arm(side, which):
    def f(t):
        s, a1, e, a2 = arm_pose(t, side)
        return place(s, a1) if which == "up" else place(e, a2)
    return f


def swap(span):
    """The artwork's parts fade in under the rig first, then the rig fades
    away, so nothing is ever see-through mid-swap."""
    mid = (span[0] + span[1]) / 2
    return (span[0], mid), (mid, span[1])


ARM_IN, ARM_OUT = swap(T_SWAP)
LEG_IN, LEG_OUT = swap(T_LEGSWAP)


def kf_rig_arms(t):
    return f"opacity:{fmt(1 - prog(t, ARM_OUT, linear), 2)}"


def kf_orig_arms(t):
    return (f"transform:{tr(*body_offset(t))};"
            f"opacity:{fmt(prog(t, ARM_IN, linear), 2)}")


def kf_rig_legs(t):
    return f"opacity:{fmt(1 - prog(t, LEG_OUT, linear), 2)}"


def kf_orig_shins(t):
    return f"opacity:{fmt(prog(t, LEG_IN, linear), 2)}"


# ------------------------------------------------------------- rig shapes
def capsule(length, w1, w2, fill):
    r1, r2 = w1 / 2, w2 / 2
    d = (f"M0,{-r1} L{length},{-r2} A{r2},{r2} 0 0 1 {length},{r2} "
         f"L0,{r1} A{r1},{r1} 0 0 1 0,{-r1}Z")
    return f'<path d="{d}" style="fill:{fill}"/>'


def rig_arm(side):
    up = capsule(L_UP, 17, 13, "#455a64")
    shade = capsule(L_UP, 17, 13, "#000")
    fore = capsule(L_FORE, 13, 11, "#455a64")
    hand = (f'<rect x="{L_FORE - 3}" y="-6" width="5" height="12" rx="2" '
            f'style="fill:#263238"/>'
            f'<ellipse cx="{L_FORE + 6}" cy="0" rx="7.5" ry="5.5" '
            f'style="fill:#ffa8a7"/>')
    return (f'<g class="{P}seg {P}arm-{side}-up">{up}'
            f'<g style="opacity:0.12">{shade}</g></g>'
            f'<g class="{P}seg {P}arm-{side}-fore">{fore}{hand}</g>')


def rig_leg(side):
    """Shin first so the thigh's round end covers the knee."""
    far = side == "r"   # the far leg is a touch darker
    shade = '<g style="opacity:0.15">{}</g>'
    shin = capsule(SHIN, 16, 11, "#37474f")
    thigh = capsule(THIGH, 21, 16, "#37474f")
    if far:
        shin += shade.format(capsule(SHIN, 16, 11, "#000"))
        thigh += shade.format(capsule(THIGH, 21, 16, "#000"))
    return (f'<g class="{P}rig-leg">'
            f'<g class="{P}seg {P}leg-{side}-shin">{shin}</g>'
            f'<g class="{P}seg {P}leg-{side}-thigh">{thigh}</g></g>')


# Pants between the jacket and the thighs; hidden by the lap and desk once
# she is seated, so it can stay on for good.
PELVIS = ('<path d="M336,270 L391,274 L388,297 Q366,309 337,298 Z" '
          'style="fill:#37474f"/>')


# --------------------------------------------------------- code being typed
# The last rows of the big code window get typed out token by token, held,
# cleared, and typed again while she works. Rows run along the iso axis
# (0.866, -0.5); a token is "typed" by scaling it along that axis from its
# left end, keeping its vertical left edge in place.
ISO = 0.5 / 0.866
CODE_FROM_ROW = 249.0   # rows below this (by r = .5x + .866y) are animated
TYPE_SPEED = 120.0      # svg units per second
CHAR = 6.0              # svg units per typed "character" (one step)
GAP, NEWLINE = 0.08, 0.3
HOLD, CLEARED = 2.0, 0.7


def code_tokens(win):
    """Tags the animated tokens in the Windows group; returns their geometry."""
    found = {}
    for el in win.iter(NS + "polygon"):
        nums = [float(v) for v in re.split(r"[\s,]+", el.get("points").strip())]
        xs, ys = nums[0::2], nums[1::2]
        ox, oy = min(xs), max(ys)
        r = 0.5 * ox + 0.866 * oy
        if r < CODE_FROM_ROW or ox < 80:
            continue
        key = el.get("points")
        tok = found.setdefault(key, {"ox": ox, "oy": oy, "w": max(xs) - ox,
                                     "r": round(r, 1), "u": 0.866 * ox - 0.5 * oy,
                                     "els": []})
        tok["els"].append(el)
    toks = sorted(found.values(), key=lambda d: (d["r"], d["u"]))
    for i, tok in enumerate(toks):
        for el in tok["els"]:
            el.set("class", f"{P}tk {P}tk{i}")
    return toks


def code_css(toks):
    """Per-token step keyframes plus a caret that follows the typing."""
    t, row, sched = CLEARED, None, []
    for tok in toks:
        if row is not None:
            t += NEWLINE if tok["r"] != row else GAP
        row = tok["r"]
        steps = max(1, round(tok["w"] / CHAR))
        dur = tok["w"] / TYPE_SPEED
        sched.append([(t + dur * k / steps, k / steps) for k in range(1, steps + 1)])
        t += dur
    typed = t
    period = typed + HOLD
    pct = lambda x: fmt(100.0 * x / period)

    def mat(tok, s):
        b = ISO * (1 - s)
        return (f"matrix({fmt(s)},{fmt(b)},0,1,{fmt(tok['ox'] * (1 - s))},"
                f"{fmt(-b * tok['ox'])})")

    css = []
    for i, (tok, steps) in enumerate(zip(toks, sched)):
        hidden = f"opacity:0;transform:{mat(tok, 0.001)}"
        kf = [f"0%{{{hidden}}}"]
        kf += [f"{pct(at)}%{{opacity:1;transform:{mat(tok, s)}}}" for at, s in steps]
        kf.append(f"{pct(period - 0.001)}%{{opacity:1;transform:none}}100%{{{hidden}}}")
        css.append(f"@keyframes {P}tk{i}{{{''.join(kf)}}}")
        css.append(f".{P}tk{i}{{animation:{P}tk{i} {fmt(period)}s step-end {T_END}s infinite backwards}}")

    # caret: blinks while idle, rides the end of the token being typed
    def at(x, y):
        return f"transform:translate({fmt(x)}px,{fmt(y)}px)"
    first = toks[0]
    kf = []

    def blink(a, b, x, y):
        out, k, on = [], a, True
        while k < b - 1e-6:
            out.append(f"{pct(k)}%{{opacity:{1 if on else 0};{at(x, y)}}}")
            k += 0.45
            on = not on
        return out
    kf += blink(0.0, CLEARED, first["ox"], first["oy"])
    for tok, steps in zip(toks, sched):
        for when, s in steps:
            x = tok["ox"] + s * tok["w"] + 0.8
            y = tok["oy"] - ISO * s * tok["w"]
            kf.append(f"{pct(when)}%{{opacity:1;{at(x, y)}}}")
    last, end = toks[-1], toks[-1]["ox"] + toks[-1]["w"] + 0.8
    kf += blink(typed, period, end, last["oy"] - ISO * last["w"])
    kf.append(f"100%{{opacity:1;{at(first['ox'], first['oy'])}}}")
    css.append(f"@keyframes {P}caret{{{''.join(kf)}}}")
    css.append(f".{P}caret{{animation:{P}caret {fmt(period)}s step-end {T_END}s infinite backwards}}")
    return "".join(css)


# ------------------------------------------------------------- assemble
def main(src, dst):
    tree = ET.parse(src)
    root_el = tree.getroot()
    char = next(g for g in root_el if g.get("id", "").startswith("freepik--Character"))
    win = next(g for g in root_el if g.get("id", "").startswith("freepik--Windows"))
    toks = code_tokens(win)
    ET.SubElement(win, NS + "rect", {
        "class": f"{P}caret", "x": "0", "y": "-4.4", "width": "1.4", "height": "4.4",
        "style": "fill:#fff;opacity:0"})
    kids = list(char)
    xml = lambda els: "".join(ET.tostring(e, encoding="unicode") for e in els)

    def grp(cls, els):
        return f'<g class="{cls}">{xml(els)}</g>'

    chair = kids[0:17]
    foot_l, shin_l = kids[17:23], kids[23:24]
    foot_r, shin_r = kids[24:30], kids[30:31]
    lap = kids[31:32]
    torso_back = kids[32:33]       # skin under the shirt
    head = kids[33:45]             # hair, neck, face (eyes are 41, 42)
    body = kids[45:55]             # shirt and jacket
    desk = kids[55:92]             # desk, plant, laptop base
    arm_l = kids[92:98]
    arm_r = kids[98:100]
    screen = kids[100:103]

    eye_l, eye_r = kids[41], kids[42]
    head_rest = [k for k in head if k is not eye_l and k is not eye_r]

    parts = [
        grp(f"{P}chair", chair),
        # far leg first, so the near one passes in front of it
        grp(f"{P}foot-r", foot_r), rig_leg("r"), grp(f"{P}shin", shin_r),
        grp(f"{P}foot-l", foot_l), rig_leg("l"), grp(f"{P}shin", shin_l),
        grp(f"{P}lap", lap),
        f'<g class="{P}torso">{PELVIS}'
        + xml(torso_back)
        + f'<g class="{P}head">{xml(head_rest)}'
        + f'<g class="{P}eye {P}eye-l">{xml([eye_l])}</g>'
        + f'<g class="{P}eye {P}eye-r">{xml([eye_r])}</g></g>'
        + xml(body)
        + "</g>",
        xml(desk),
        f'<g class="{P}orig">'
        + f'<g class="{P}type-l">{xml(arm_l)}</g>'
        + f'<g class="{P}type-r">{xml(arm_r)}</g></g>',
        f'<g class="{P}rig-arms">{rig_arm("r")}{rig_arm("l")}</g>',
        xml(screen),
    ]

    css = build_css(code_css(toks))
    new_char = f'<g id="{char.get("id")}">' + "".join(parts) + "</g>"

    out = [new_char if g is char else ET.tostring(g, encoding="unicode") for g in root_el]
    svg = (f'<svg xmlns="{SVG}" viewBox="{root_el.get("viewBox")}">'
           f"<style>{css}</style>" + "".join(out) + "</svg>")
    svg = re.sub(r' xmlns="http://www.w3.org/2000/svg"(?=[^>]*>)', "", svg)
    svg = svg.replace("<svg ", f'<svg xmlns="{SVG}" ', 1)
    open(dst, "w").write(svg)


def build_css(code=""):
    ani = [
        ("chair", kf_chair), ("torso", kf_torso), ("lap", kf_lap),
        ("foot-l", kf_foot("L")), ("foot-r", kf_foot("R")),
        ("rig-legs", kf_rig_legs), ("shin", kf_orig_shins),
        ("rig-arms", kf_rig_arms), ("orig", kf_orig_arms),
    ]
    for side in ("l", "r"):
        ani += [(f"leg-{side}-thigh", kf_leg(side.upper(), "thigh")),
                (f"leg-{side}-shin", kf_leg(side.upper(), "shin")),
                (f"arm-{side}-up", kf_arm(side.upper(), "up")),
                (f"arm-{side}-fore", kf_arm(side.upper(), "fore"))]

    intro = f"{fmt(T_END, 2)}s linear 0s 1 both"
    loop_delay = f"{fmt(T_END, 2)}s"
    rules = [
        # the rig only ever shows while animating
        f".{P}rig-arms,.{P}rig-leg{{opacity:0}}",
        f".{P}seg,.{P}chair,.{P}foot-l,.{P}foot-r,.{P}lap,.{P}torso,.{P}type-l,"
        f".{P}type-r,.{P}orig,.{P}head,.{P}eye,.{P}tk,.{P}caret"
        f"{{transform-box:view-box;transform-origin:0 0}}",
        f".{P}type-l{{transform-origin:{SL[0]}px {SL[1]}px}}",
        f".{P}type-r{{transform-origin:{SR[0]}px {SR[1]}px}}",
        f".{P}head{{transform-origin:360px 208px}}",
        f".{P}eye-l{{transform-origin:354.5px 184.5px}}",
        f".{P}eye-r{{transform-origin:341.5px 183.5px}}",
    ]
    motion = []
    for name, fn in ani:
        motion.append(keyframes(name, fn))
        sel = f".{P}rig-leg" if name == "rig-legs" else f".{P}{name}"
        motion.append(f"{sel}{{animation:{P}{name} {intro}}}")
    # typing, forever
    motion += [
        f"@keyframes {P}tap-l{{0%,100%{{transform:rotate(0)}}"
        f"12%{{transform:rotate(1.4deg)}}24%{{transform:rotate(0)}}"
        f"50%{{transform:rotate(0)}}62%{{transform:rotate(1deg)}}74%{{transform:rotate(0)}}}}",
        f"@keyframes {P}tap-r{{0%,100%{{transform:rotate(0)}}"
        f"25%{{transform:rotate(0)}}37%{{transform:rotate(1.6deg)}}49%{{transform:rotate(0)}}"
        f"75%{{transform:rotate(0)}}87%{{transform:rotate(1.2deg)}}}}",
        f"@keyframes {P}nod{{0%,100%{{transform:rotate(0)}}50%{{transform:rotate(-1.5deg)}}}}",
        f"@keyframes {P}blink{{0%,92%,100%{{transform:scaleY(1)}}95%{{transform:scaleY(.1)}}}}",
        f".{P}type-l{{animation:{P}tap-l .5s linear {loop_delay} infinite}}",
        f".{P}type-r{{animation:{P}tap-r .5s linear {loop_delay} infinite}}",
        f".{P}head{{animation:{P}nod 3.2s ease-in-out {loop_delay} infinite}}",
        f".{P}eye{{animation:{P}blink 4.6s linear 1.6s infinite}}",
        code,
    ]
    return "".join(rules) + "@media (prefers-reduced-motion:no-preference){" + "".join(motion) + "}"


if __name__ == "__main__":
    here = os.path.dirname(os.path.abspath(__file__))
    src = sys.argv[1] if len(sys.argv) > 1 else os.path.join(here, "vector-source.svg")
    dst = sys.argv[2] if len(sys.argv) > 2 else os.path.join(here, "..", "..", "src", "assets", "vector.svg")
    main(src, dst)
