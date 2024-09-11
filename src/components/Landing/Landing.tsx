import Vector from "@/assets/vector.svg?react";
import Button from '@mui/material/Button';

function Landing() {
  const scrollToContactSection = () => { }

  return (
    <div className='w-full grid grid-cols-[40%,60%] max-h-screen h-[700px] items-center justify-items-center'>
      <div className="flex flex-col gap-2">
        <span className="text-xl mb-5">Full-Stack Developer</span>
        <div className="text-5xl"><strong>Hi There</strong>, I'm</div>
        <span className="text-5xl text-purple-700">Isabella Riquetti</span>
        <div className="my-5">
          Welcome to my page! Any questions, requests, or feedback, please feel free to pick a time for us to talk!
        </div>
        <div className="flex flex-col md:flex-row gap-3 mt-5 landing-buttons">
          <Button variant="contained" className="bg-black text-white" onClick={scrollToContactSection}>Contact me</Button>
        </div>
      </div>
      <Vector className="h-3/4" />
    </div>
  )
}

export default Landing;
