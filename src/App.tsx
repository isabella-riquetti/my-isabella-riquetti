import './App.css'
import Contact from './components/Contact/Contact'
import Header from './components/Header/Header'
import About from './components/About/About';
import Landing from './components/Landing/Landing';
import Portifolio from './components/Portifolio/Portifolio';
import Skills from './components/Skills/Skills';
import PastExperience from './components/PastExperience/PastExperience';

function App() {

  return (
    <div className='bg-purple-200'>
      <Header />
      <Landing />
      <About />
      <PastExperience />
      <Portifolio />
      <Skills />
      <Contact />
    </div>
  )
}

export default App
