import Vector from "@/assets/vector.svg?react";

function Landing() {

  return (
    <div className='bg-purple-200 w-full grid grid-cols-[40%,60%] max-h-screen h-[700px] items-center justify-items-center	'>
      <div className="flex flex-col gap-2">

        <span className="text-xl mb-5">Full-Stack Developer</span>
        <div className="text-5xl"><strong>Hi There</strong>, I'm</div>
        <span className="text-5xl text-purple-700">Isabella</span>
        <div>
          Welcome to my page! Any questions, requests, or feedback, please feel free to pick a time for us to talk!
        </div>
        <div>
        </div>
      </div>
      <Vector className="w-1/2" />
    </div>
  )
}

export default Landing;
