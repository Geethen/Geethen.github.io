import { useEffect, useState, useRef } from 'react'
import { gsap } from 'gsap'
import { Menu, X, Leaf } from 'lucide-react'

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Expertise', href: '#expertise' },
    { name: 'Publications', href: '#publications' },
    { name: 'Contact', href: '#contact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.5, ease: 'expo.out' }
      )
    }
  }, [])

  useEffect(() => {
    if (mobileMenuRef.current) {
      if (isMobileMenuOpen) {
        gsap.fromTo(
          mobileMenuRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.3, ease: 'expo.out' }
        )
      }
    }
  }, [isMobileMenuOpen])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)
    
    const target = document.querySelector(href)
    if (target) {
      const offset = 80
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-lg shadow-soft py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="w-full section-padding">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a 
            href="#home" 
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-2 group"
          >
            <Leaf 
              className={`w-6 h-6 transition-colors duration-300 ${
                isScrolled ? 'text-green-primary' : 'text-white'
              } group-hover:text-green-accent`}
            />
            <span 
              className={`font-serif text-xl font-semibold transition-colors duration-300 ${
                isScrolled ? 'text-green-primary' : 'text-white'
              }`}
            >
              Geethen
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative text-sm font-medium transition-colors duration-300 group ${
                  isScrolled ? 'text-gray-700 hover:text-green-primary' : 'text-white/90 hover:text-white'
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                  isScrolled ? 'bg-green-primary' : 'bg-white'
                }`} />
              </a>
            ))}
          </div>

          {/* Contact Button (Desktop) */}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className={`hidden md:inline-flex items-center px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
              isScrolled
                ? 'bg-green-primary text-white hover:bg-green-dark hover:shadow-green'
                : 'bg-white/10 text-white border border-white/30 hover:bg-white/20 backdrop-blur-sm'
            }`}
          >
            Get In Touch
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors duration-300 ${
              isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg shadow-soft-lg border-t border-gray-100"
        >
          <div className="section-padding py-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="block text-gray-700 hover:text-green-primary font-medium py-2 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="block w-full text-center bg-green-primary text-white py-3 rounded-full font-medium hover:bg-green-dark transition-colors"
            >
              Get In Touch
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navigation
