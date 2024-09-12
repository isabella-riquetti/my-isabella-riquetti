import desktopCreate from "@/assets/portifolio/desktop-create.png";
import { Button } from "@mui/material";

function Portifolio() {
    const goTo = (url: string) => {
        window.open(url, "_blank");
    }

    return (
        <div className="relative z-10 w-full bg-white text-center" style={{ background: "linear-gradient(0, white 60%, #e3dff5 40%)" }}>
            <div className="default-spacing py-12" id="portifolio">
                <span className="text-4xl font-bold mb-2">Portifolio</span>
                <div className="my-5">
                    <p>Explore my projects services, from user interface and experience to prototyping and testing.</p>
                </div>
                <div className="flex items-center justify-center h-full">
                    <div className="w-[250px] text-start flex flex-col gap-2">
                        <img src={desktopCreate} alt="desktop view of create new event" />
                        <div>
                            <p className="font-bold my-1">CareMinder</p>
                            <p className="text-sm font-light">Self care reminders app.</p>
                        </div>
                        <div className="flex gap-3 mt-2">
                            <Button className="h-10 bg-black-950 text-white" onClick={() => goTo("https://github.com/isabella-riquetti/careminder")}>Source</Button>
                            <Button className="h-10 text-black-950" onClick={() => goTo("https://careminder.netlify.app/")}>Demo</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Portifolio;