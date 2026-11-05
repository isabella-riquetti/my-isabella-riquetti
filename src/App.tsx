import './App.css'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import About from './components/About/About';
import Landing from './components/Landing/Landing';
import Portfolio from './components/Portfolio/Portfolio';
import Skills from './components/Skills/Skills';
import { useReveal } from './lib/motion';

function App() {
  useReveal();

  return (
    <div className='bg-purple-200'>
      <Header />
      <Landing />
      <About />
      <Portfolio />
      <Skills />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
