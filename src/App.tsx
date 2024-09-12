import './App.css'
import Contact from './components/sections/Contact/Contact'
import Header from './components/sections/Header/Header'
import About from './components/sections/About/About';
import Landing from './components/sections/Landing/Landing';
import Portifolio from './components/sections/Portifolio/Portifolio';
import Skills from './components/sections/Skills/Skills';

function App() {

  return (
    <div className='bg-purple-200'>
      <Header />
      <Landing />
      <About />
      <Portifolio />
      <Skills />
      <Contact />
    </div>
  )
}

export default App
