import desktopCreate from "@/assets/portifolio/desktop-create.png";
import { Button } from "@mui/material";

function Portifolio() {
    return (
        <div className="relative z-10 w-full bg-white text-center" style={{ background: "linear-gradient(0, white 60%, #e3dff5 40%)" }}>
            <div className="default-spacing py-12" id="portifolio">
                <span className="text-4xl font-bold mb-2">Portifolio</span>
                <div className="my-5">
                    <p>Explore my projects services, from 0 to release!</p>
                </div>
                <div className="flex items-center justify-center h-full">
                    <div className="w-[280px] text-start flex flex-col gap-2 shadow-lg">
                        <img src={desktopCreate} alt="desktop view of create new event" />
                        <div className="flex flex-col gap-2 p-2">
                            <p className="font-bold my-1">CareMinder</p>
                            <p className="text-sm font-light">Self care reminders app.</p>
                            <p className="flex gap-1">
                                <img src="https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB" alt="react" />
                                <img src="https://img.shields.io/badge/node.js-6DA55F?style=flat&logo=node.js&logoColor=white" alt="node.js" />
                                <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=flat&logo=supabase&logoColor=white" alt="Supabase" />
                            </p>
                            <p className="text-sm">
                                <strong>User:</strong> <span>demo-user</span><br/>
                                <strong>Password:</strong> <span>Dem0Pas$word</span>
                                </p>
                            <p className="text-xs">User limited to 5 reminder inclusions every 10 minutes.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-3 mt-2 p-2">
                            <div><a href="https://github.com/isabella-riquetti/careminder" target="_blank"><Button className="w-full h-10 bg-black-950 text-white">Source</Button></a></div>
                            <div><a href="https://careminder.netlify.app/" target="_blank"><Button className="w-full h-10 text-black-950">Demo</Button></a></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Portifolio;