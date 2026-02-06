import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Leaf, Github, Linkedin, BookOpen, ArrowUpRight, Heart } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const footer = footerRef.current
    const content = contentRef.current

    if (!footer || !content) return

    // Content fade in
    const elements = content.querySelectorAll('.footer-item')
    gsap.fromTo(
      elements,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: footer,
          start: 'top 90%',
          once: true,
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === footer) st.kill()
      })
    }
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
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

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Expertise', href: '#expertise' },
    { name: 'Publications', href: '#publications' },
    { name: 'Contact', href: '#contact' },
  ]

  const socialLinks = [
    { name: 'Google Scholar', href: 'https://scholar.google.com/citations?user=J4rtU2kAAAAJ&hl=en', icon: BookOpen },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/geethen-singh-a06660106/', icon: Linkedin },
    { name: 'GitHub', href: 'https://github.com/geethen', icon: Github },
  ]

  return (
    <footer
      ref={footerRef}
      className="relative bg-green-dark text-white overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div ref={contentRef} className="relative z-10 w-full section-padding py-16 lg:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="footer-item flex items-center gap-2 mb-4">
              <Leaf className="w-6 h-6 text-green-accent" />
              <span className="font-serif text-2xl font-semibold">Geethen</span>
            </div>
            <p className="footer-item text-white/70 max-w-md mb-6 leading-relaxed">
              Ecologist & AI Researcher dedicated to protecting our planet through technology. 
              Bridging the gap between ecological conservation and cutting-edge machine learning.
            </p>
            
            {/* Social links */}
            <div className="footer-item flex items-center gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-green-accent transition-colors duration-300 group"
                  aria-label={link.name}
                >
                  <link.icon className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="footer-item text-sm font-semibold uppercase tracking-wider text-white/50 mb-4">
              Explore
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name} className="footer-item">
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="group inline-flex items-center gap-1 text-white/70 hover:text-white transition-colors duration-300"
                  >
                    <span className="relative">
                      {link.name}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-green-accent group-hover:w-full transition-all duration-300" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="footer-item text-sm font-semibold uppercase tracking-wider text-white/50 mb-4">
              Connect
            </h3>
            <ul className="space-y-3">
              {socialLinks.map((link) => (
                <li key={link.name} className="footer-item">
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-300"
                  >
                    <link.icon className="w-4 h-4" />
                    <span className="relative">
                      {link.name}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-green-accent group-hover:w-full transition-all duration-300" />
                    </span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-item pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/50 text-sm">
              © {new Date().getFullYear()} Geethen. All rights reserved.
            </p>
            <p className="text-white/50 text-sm flex items-center gap-1">
              Built with <Heart className="w-4 h-4 text-red-400 fill-red-400" /> for the Earth
            </p>
          </div>
        </div>
      </div>

      {/* Large background text */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
        <p className="text-[20vw] font-serif font-bold text-white/[0.02] leading-none text-center translate-y-1/3">
          GEETHEN
        </p>
      </div>
    </footer>
  )
}

export default Footer
