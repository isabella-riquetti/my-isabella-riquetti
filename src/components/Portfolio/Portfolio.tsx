import { ReactNode } from "react";
import {
    desktopMain,
    desktopCreate,
    desktopMonth,
    desktopWeek,
    desktopDay,
    desktopList,
    mobileCreate,
    mobileMonth,
    mobileWeek,
    mobileDay,
    mobileList
} from "@/assets/portfolio/careminder";
import {
    desktopMainUnauthenticated,
    desktopLogin,
    desktopMainAuthenticated,
    mobileMainUnauthenticated,
    mobileLogin,
    mobileMainAuthenticated
} from "@/assets/portfolio/moodl";
import {
    comiferHero,
    comiferServicos,
    comiferOrcamento,
    comiferMarcas,
    comiferSobre,
    comiferMobileHero
} from "@/assets/portfolio/comifer";
import {
    habity01,
    habity02,
    habity03,
    habity04,
    habity05,
    habity06,
    habity07,
    habity08
} from "@/assets/portfolio/habity-care";
import {
    planye01,
    planye02,
    planye03,
    planye04,
    planye05,
    planye06,
    planye07,
    planye08
} from "@/assets/portfolio/planye";
import {
    vetvitae01,
    vetvitae02,
    vetvitae03,
    vetvitae04,
    vetvitae05,
    vetvitae06,
    vetvitae07,
    vetvitae08
} from "@/assets/portfolio/vetvitae";
import {
    desktopHero,
    desktopEmpresa
} from "@/assets/portfolio/riquetti-studio";
import { Button } from "@mui/material";
import Vitrine from "../Vitrine/Vitrine";
import ProjectCarousel from "./ProjectCarousel";

const badges = {
    vite: { alt: "Vite", src: "https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white" },
    react: { alt: "react", src: "https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB" },
    typescript: { alt: "TypeScript", src: "https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white" },
    tailwind: { alt: "Tailwind CSS", src: "https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white" },
    node: { alt: "node.js", src: "https://img.shields.io/badge/node.js-6DA55F?style=flat&logo=node.js&logoColor=white" },
    hono: { alt: "Hono", src: "https://img.shields.io/badge/Hono-E36002?style=flat&logo=hono&logoColor=white" },
    postgres: { alt: "Postgres", src: "https://img.shields.io/badge/Postgres-316192?style=flat&logo=postgresql&logoColor=white" },
    supabase: { alt: "Supabase", src: "https://img.shields.io/badge/Supabase-3ECF8E?style=flat&logo=supabase&logoColor=white" },
    capacitor: { alt: "Capacitor", src: "https://img.shields.io/badge/Capacitor-119EFF?style=flat&logo=capacitor&logoColor=white" },
    nextjs: { alt: "next.js", src: "https://img.shields.io/badge/Next.js-ffffff?style=flat&logo=nextdotjs&logoColor=000000" },
    firebase: { alt: "firebase", src: "https://img.shields.io/badge/Firebase-dd2c01?style=flat&logo=firebase&logoColor=ffc403" },
    html5: { alt: "HTML5", src: "https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white" },
    css3: { alt: "CSS3", src: "https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white" },
    javascript: { alt: "JavaScript", src: "https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black" },
};

interface Project {
    name: string;
    description: string;
    media: string[];
    badges: { alt: string; src: string }[];
    links: [ProjectLink, ProjectLink];
    extra?: ReactNode;
}

interface ProjectLink {
    label: string;
    href: string;
    disabled?: boolean;
}

const projects: Project[] = [
    {
        name: "Planye",
        description: "Digital planner with the feel of a paper one, on web and mobile.",
        media: [planye01, planye02, planye03, planye04, planye05, planye06, planye07, planye08],
        badges: [badges.react, badges.typescript, badges.hono, badges.postgres, badges.capacitor],
        links: [
            { label: "Site", href: "https://planye.com" },
            { label: "Web App", href: "https://app.planye.com" },
        ],
    },
    {
        name: "VetVitae",
        description: "Pet health record: vaccines, vet visits, exams and medicines, shareable with the vet.",
        media: [vetvitae01, vetvitae02, vetvitae03, vetvitae04, vetvitae05, vetvitae06, vetvitae07, vetvitae08],
        badges: [badges.react, badges.typescript, badges.node, badges.supabase, badges.capacitor],
        links: [
            { label: "Site", href: "https://vetvitae.com/en/" },
            { label: "Web App", href: "https://app.vetvitae.com" },
        ],
    },
    {
        name: "Habity Care",
        description: "Care routine, resource and budget management app.",
        media: [habity01, habity02, habity03, habity04, habity05, habity06, habity07, habity08],
        badges: [badges.vite, badges.react, badges.typescript, badges.node, badges.supabase],
        links: [
            { label: "Docs", href: "https://habity.care/help" },
            { label: "Web App", href: "https://habity.care/#" },
        ],
    },
    {
        name: "Riquetti Studio",
        description: "My app building studio: websites and apps designed and built from scratch.",
        media: [desktopHero, desktopEmpresa],
        badges: [badges.vite, badges.react, badges.tailwind],
        links: [
            { label: "Site", href: "https://riquetti.com.br" },
            { label: "Blog", href: "https://riquetti.com.br/blog" },
        ],
    },
    {
        name: "Comifer",
        description: "Institutional company website.",
        media: [comiferHero, comiferServicos, comiferOrcamento, comiferMarcas, comiferSobre, comiferMobileHero],
        badges: [badges.html5, badges.css3, badges.javascript],
        links: [
            { label: "Source", href: "https://github.com/isabella-riquetti/asstec" },
            { label: "Site", href: "https://comifer.com.br/" },
        ],
    },
    {
        name: "CareMinder",
        description: "Self care reminders app.",
        media: [desktopMonth, mobileMonth, desktopCreate, mobileCreate, desktopWeek, mobileWeek, desktopDay, mobileDay, desktopList, mobileList, desktopMain],
        badges: [badges.react, badges.node, badges.supabase],
        links: [
            { label: "Source", href: "https://github.com/isabella-riquetti/careminder" },
            { label: "Demo", href: "https://careminder.netlify.app/", disabled: true },
        ],
        extra: <p className="text-xs">Service disabled.</p>,
    },
    {
        name: "Moodl",
        description: "Mood tracker",
        media: [desktopMainUnauthenticated, desktopLogin, desktopMainAuthenticated, mobileMainUnauthenticated, mobileLogin, mobileMainAuthenticated],
        badges: [badges.react, badges.nextjs, badges.firebase],
        links: [
            { label: "Source", href: "https://github.com/isabella-riquetti/moodl" },
            { label: "Demo", href: "https://my-moodl.vercel.app/" },
        ],
        extra: (
            <p className="text-sm">
                <strong>User:</strong> <span>demo-user@demo.com</span><br />
                <strong>Password:</strong> <span>Dem0Pas$word</span>
            </p>
        ),
    },
];

const ProjectCard = ({ project }: { project: Project }) => {
    const [primary, secondary] = project.links;
    return (
        <div className="w-[280px] text-start flex flex-col gap-2 shadow-lg h-[430px] bg-white">
            <Vitrine images={project.media} />
            <div className="flex flex-col gap-2 p-2">
                <p className="font-bold my-1">{project.name}</p>
                <p className="text-sm font-light">{project.description}</p>
                <p className="flex flex-wrap gap-1">
                    {project.badges.map(badge => <img key={badge.alt} src={badge.src} alt={badge.alt} />)}
                </p>
                {project.extra}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-3 mt-auto p-2">
                <div>
                    <a href={primary.href} target="_blank" rel="noopener noreferrer">
                        <Button className="w-full h-10 bg-black-950 text-white" disabled={primary.disabled}>{primary.label}</Button>
                    </a>
                </div>
                <div>
                    <a href={secondary.href} target="_blank" rel="noopener noreferrer">
                        <Button className="w-full h-10 text-black-950" disabled={secondary.disabled}>{secondary.label}</Button>
                    </a>
                </div>
            </div>
        </div>
    );
};

function Portfolio() {
    return (
        <div className="relative z-10 w-full bg-white text-center" style={{ background: "linear-gradient(0, white 60%, #e3dff5 40%)" }}>
            <div className="py-12" id="portfolio">
                <div className="default-spacing">
                    <span data-rise className="inline-block text-4xl font-bold mb-2">Portfolio</span>
                    <div data-rise className="my-5">
                        <p>Explore my projects services, from 0 to release!</p>
                    </div>
                </div>
                <div data-rise>
                    <ProjectCarousel
                        label="Projects"
                        items={projects.map(project => <ProjectCard key={project.name} project={project} />)}
                    />
                </div>
            </div>
        </div>
    )
}

export default Portfolio;
