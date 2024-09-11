import Vector from "@/assets/vector.svg?react";
import Button from '@mui/material/Button';

function Landing() {
  const openYouCanBookMe = () => {
    window.open("https://riquetti.youcanbook.me/", "_blank");
  }

  const scrollToContactSection = () => {}

  return (
    <div className='bg-purple-200 w-full grid grid-cols-[40%,60%] max-h-screen h-[700px] items-center justify-items-center px-12 md:px-24 lg:px-48'>
      <div className="flex flex-col gap-2">

        <span className="text-xl mb-5">Full-Stack Developer</span>
        <div className="text-5xl"><strong>Hi There</strong>, I'm</div>
        <span className="text-5xl text-purple-700">Isabella</span>
        <div className="my-5">
          Welcome to my page! Any questions, requests, or feedback, please feel free to pick a time for us to talk!
        </div>
        <div className="flex flex-col md:flex-row gap-3 mt-5">
          <Button variant="contained" className="normal-case rounded-none bg-black text-white border-black w-[180px] shadow-none font-bold" onClick={scrollToContactSection}>Contact me</Button>
          <Button variant="contained" className="normal-case rounded-none bg-white text-black border border-solid border-black w-[180px] shadow-none font-bold" onClick={openYouCanBookMe}>Book some time</Button>
        </div>
      </div>
      <Vector className="w-3/4" />
    </div>
  )
}

export default Landing;
