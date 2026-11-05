import Vector from "@/assets/vector.svg?react";
import Button from '@mui/material/Button';

function Landing() {
  return (
    <div className='w-full grid grid-cols-1 md:grid-cols-[40%,60%] max-h-screen h-[700px] items-center justify-items-center default-spacing'>
      <div className="flex flex-col gap-2">
        <span data-rise className="text-2xl mb-5">Full-Stack Developer</span>
        <div data-rise className="text-5xl"><strong>Hi There</strong>, I'm</div>
        <span data-rise className="text-5xl text-purple-700">Isabella Riquetti</span>
        <div data-rise className="my-5">
          Welcome to my page! Any questions, requests, or feedback, please feel free to pick a time for us to talk!
        </div>
        <div data-rise className="flex flex-col md:flex-row gap-3 mt-5 landing-buttons">
          <a href="#contact"><Button variant="contained" className="bg-black-950 text-white">Contact me</Button></a>
        </div>
      </div>
      <Vector data-rise className="drift hidden md:block h-3/4" />
    </div>
  )
}

export default Landing;
