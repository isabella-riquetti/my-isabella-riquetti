import './App.css'
import Contact from './components/Contact/Contact'
import Header from './components/Header/Header'
import About from './components/About/About';
import Landing from './components/Landing/Landing';

function App() {

  return (
    <div className='bg-purple-200'>
      <Header />
      <Landing />
      <About />
      <Contact />
    </div>
  )
}

export default App
