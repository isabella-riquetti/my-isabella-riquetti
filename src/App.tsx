import './App.css'
import Contact from './components/Contact/Contact'
import Header from './components/Header/Header'
import About from './components/About/About';
import Landing from './components/Landing/Landing';
import Portfolio from './components/Portfolio/Portfolio';
import Skills from './components/Skills/Skills';

function App() {

  return (
    <div className='bg-purple-200'>
      <Header />
      <Landing />
      <About />
      <Portfolio />
      <Skills />
      <Contact />
    </div>
  )
}

export default App
