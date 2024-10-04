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
import { Button } from "@mui/material";
import Vitrine from "../Vitrine/Vitrine";

function Portfolio() {
    return (
        <div className="relative z-10 w-full bg-white text-center" style={{ background: "linear-gradient(0, white 60%, #e3dff5 40%)" }}>
            <div className="default-spacing py-12" id="portfolio">
                <span className="text-4xl font-bold mb-2">Portfolio</span>
                <div className="my-5">
                    <p>Explore my projects services, from 0 to release!</p>
                </div>
                <div className="flex items-center justify-center h-full gap-x-20">
                    <div className="w-[280px] text-start flex flex-col gap-2 shadow-lg h-[430px]">
                        <Vitrine images={[desktopMonth, mobileMonth, desktopCreate, mobileCreate, desktopWeek, mobileWeek, desktopDay, mobileDay, desktopList, mobileList, desktopMain]} />
                        <div className="flex flex-col gap-2 p-2">
                            <p className="font-bold my-1">CareMinder</p>
                            <p className="text-sm font-light">Self care reminders app.</p>
                            <p className="flex gap-1">
                                <img src="https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB" alt="react" />
                                <img src="https://img.shields.io/badge/node.js-6DA55F?style=flat&logo=node.js&logoColor=white" alt="node.js" />
                                <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=flat&logo=supabase&logoColor=white" alt="Supabase" />
                            </p>
                            <p className="text-sm">
                                <strong>User:</strong> <span>demo-user</span><br />
                                <strong>Password:</strong> <span>Dem0Pas$word</span>
                            </p>
                            <p className="text-xs">User limited to 5 reminder inclusions every 10 minutes.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-3 mt-auto p-2">
                            <div><a href="https://github.com/isabella-riquetti/careminder" target="_blank"><Button className="w-full h-10 bg-black-950 text-white">Source</Button></a></div>
                            <div><a href="https://careminder.netlify.app/" target="_blank"><Button className="w-full h-10 text-black-950">Demo</Button></a></div>
                        </div>
                    </div>
                    <div className="w-[280px] text-start flex flex-col gap-2 shadow-lg h-[430px]">
                        <Vitrine images={[desktopMainUnauthenticated, desktopLogin, desktopMainAuthenticated, mobileMainUnauthenticated, mobileLogin, mobileMainAuthenticated]} />
                        <div className="flex flex-col gap-2 p-2">
                            <p className="font-bold my-1">Moodl</p>
                            <p className="text-sm font-light">Mood tracker</p>
                            <p className="flex gap-1">
                                <img src="https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB" alt="react" />
                                <img src="https://img.shields.io/badge/Next.js-ffffff?style=flat&logo=nextdotjs&logoColor=000000" alt="next.js" />
                                <img src="https://img.shields.io/badge/Firebase-dd2c01?style=flat&logo=firebase&logoColor=ffc403" alt="firebase" />
                            </p>
                            <p className="text-sm">
                                <strong>User:</strong> <span>demo-user@demo.com</span><br />
                                <strong>Password:</strong> <span>Dem0Pas$word</span>
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-3 mt-auto p-2">
                            <div><a href="https://github.com/isabella-riquetti/moodl" target="_blank"><Button className="w-full h-10 bg-black-950 text-white">Source</Button></a></div>
                            <div><a href="https://my-moodl.vercel.app/" target="_blank"><Button className="w-full h-10 text-black-950">Demo</Button></a></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Portfolio;