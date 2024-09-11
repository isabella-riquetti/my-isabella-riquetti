import aquilesImage from 'src/assets/my-cats/aquiles.png';
import confeteImage from 'src/assets/my-cats/confete.png';
import atenaImage from 'src/assets/my-cats/atena.png';
import luaImage from 'src/assets/my-cats/lua.png';
import auroraImage from 'src/assets/my-cats/aurora.png';
import mickeyImage from 'src/assets/my-cats/mickey.png';
import purpurinaImage from 'src/assets/my-cats/purpurina.png';
import juliettaImage from 'src/assets/my-cats/julietta.png';

function About() {
  return (
    <div className='relative w-full bg-black-900 flex flex-col text-center gap-2 default-spacing pt-12 text-white'>
      <span className="text-4xl font-bold mb-2">About Me</span>
      <div className="my-5">
        <p>Hello, my name is Isabella. I'm a Full-Stack developer with over 9 years of experience with several technologies.</p>
        <p>Since I started, I have worked on projects of all different scales, from newly founded startups to recently consolidated companies and multinationals.</p>
        <p>Most of my experience has been with B2B software, and I am adept at handling projects to ensure they are beautiful, fast, and secure.</p>
      </div>
      <div className="grid grid-cols-3 mb-16 text-center font-bold">
        <div className="flex flex-col">
          <span className="text-6xl text-purple-300">+10</span>
          <span className="text-lg">Projects</span>
        </div>
        <div className="flex flex-col">
          <span className="text-6xl text-purple-300">+9</span>
          <span className="text-lg">Years Developing</span>
        </div>
        <div className="flex flex-col">
          <span className="text-6xl text-purple-300">8</span>
          <span className="text-lg">Loyals assistants</span>
        </div>
      </div>
      <div className="w-full grid grid-rows-1 grid-cols-8 md:grid-cols-[auto,auto,auto,auto,160px,auto,auto,auto,auto] justify-center items-end gap-[2%]">
        <img src={aquilesImage} alt="aquiles" className="w-auto h-auto" />
        <img src={confeteImage} alt="confete" className="w-auto h-auto" />
        <img src={atenaImage} alt="atena" className="w-auto h-auto" />
        <img src={luaImage} alt="lua" className="w-auto h-auto" />
        <div className="hidden md:block w-40 h-20 bg-purple-600 rounded-t-full self-end mb-[-25px]"></div>
        <img src={auroraImage} alt="aurora" className="w-auto h-auto" />
        <img src={mickeyImage} alt="mickey" className="w-auto h-auto" />
        <img src={purpurinaImage} alt="purpurina" className="w-auto h-auto" />
        <img src={juliettaImage} alt="julietta" className="w-auto h-auto" />
      </div>
    </div>
  )
}

export default About;