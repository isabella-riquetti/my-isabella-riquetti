import Icon from "@/assets/icon.svg?react";
import Button from '@mui/material/Button';

function Header() {
  const openYouCanBookMe = () => {
    window.open("https://riquetti.youcanbook.me/", "_blank");
  }

  return (
    <div className='w-full h-20 py-2 hidden md:flex gap-4 items-center default-spacing'>
      <div className="flex gap-3 items-center">
        <Icon className="max-h-12 max-w-12" /><span className="text-3xl font-semibold"><em className="text-4xl opacity-75">R</em><span className="text-purple-800">iquetti</span></span>
      </div>
      <div className="relative ml-auto flex gap-8 text-lg font-bold">
        <div className="absolute top-[-105px] left-[-105px] z-0 w-36 h-36 bg-purple-600 rounded-full hidden xl:block"></div>
        <a href="#about-me" className="z-10">About me</a>
        <a href="#portifolio" className="z-10">Portifolio</a>
        <a href="#skills" className="z-10">Skills</a>
        <a href="#contact" className="z-10">Contact</a>
      </div>
      <Button variant="contained" className="ml-auto bg-black-950 text-white" onClick={openYouCanBookMe}>Book some time</Button>
    </div>
  )
}

export default Header;
