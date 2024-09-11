import Icon from "@/assets/icon.svg?react";
import Button from '@mui/material/Button';

function Header() {
  const openYouCanBookMe = () => {
    window.open("https://riquetti.youcanbook.me/", "_blank");
  }

  return (
    <div>
      <div className='w-full h-20 py-2 flex gap-4 items-center'>
        <div className="flex gap-2 items-center">
          <Icon className="max-h-12 max-w-12" /><span>Riquetti</span>
        </div>
        <div className="relative ml-auto flex gap-8 text-lg font-bold">
          <div className="absolute top-[-105px] left-[-105px] z-0 w-36 h-36 bg-purple-600 rounded-full"></div>
          <a href="#about-me" className="z-10">About me</a>
          <a href="#projects" className="z-10">Projects</a>
          <a href="#skills" className="z-10">Projects</a>
        </div>

        <Button variant="contained" className="ml-auto bg-black text-white" onClick={openYouCanBookMe}>Book some time</Button>
      </div>

    </div>
  )
}

export default Header;
