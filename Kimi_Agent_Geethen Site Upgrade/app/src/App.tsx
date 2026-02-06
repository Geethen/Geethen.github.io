import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'
import Navigation from './sections/Navigation'
import Hero from './sections/Hero'
import About from './sections/About'
import Expertise from './sections/Expertise'
import Publications from './sections/Publications'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initial load animation
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isLoaded) return

    // Setup reveal animations for sections
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-scale')
    
    revealElements.forEach((element) => {
      ScrollTrigger.create({
        trigger: element,
        start: 'top 85%',
        onEnter: () => {
          element.classList.add('revealed')
        },
        once: true,
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [isLoaded])

  return (
    <div 
      ref={mainRef}
      className={`relative min-h-screen bg-white transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Grain overlay */}
      <div className="grain-overlay" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main content */}
      <main>
        <Hero />
        <About />
        <Expertise />
        <Publications />
        <Contact />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
