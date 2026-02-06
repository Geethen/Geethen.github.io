import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Mail, Linkedin, MessageCircle, ArrowRight, Sparkles } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// Magnetic button component
const MagneticButton = ({ 
  children, 
  href, 
  variant = 'primary',
  onClick,
  icon: Icon
}: { 
  children: React.ReactNode
  href?: string
  variant?: 'primary' | 'secondary'
  onClick?: () => void
  icon?: React.ElementType
}) => {
  const buttonRef = useRef<HTMLAnchorElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return
    
    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY
    
    setPosition({
      x: distanceX * 0.3,
      y: distanceY * 0.3,
    })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  const baseClasses = "magnetic-btn relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-medium text-lg transition-all duration-300 overflow-hidden group"
  
  const variantClasses = variant === 'primary'
    ? "bg-white text-green-primary hover:shadow-glow"
    : "bg-transparent text-white border-2 border-white/50 hover:border-white hover:bg-white/10"

  const Component = href ? 'a' : 'button'
  const props = href ? { href, target: '_blank', rel: 'noopener noreferrer' } : { onClick }

  return (
    <Component
      ref={buttonRef as any}
      {...props}
      className={`${baseClasses} ${variantClasses}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: position.x === 0 && position.y === 0 ? 'transform 0.5s ease-out' : 'none',
      }}
    >
      {/* Background animation */}
      <span className={`absolute inset-0 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-500 ${
        variant === 'primary' ? 'bg-green-light' : 'bg-white/10'
      }`} />
      
      <span className="relative flex items-center gap-3">
        {Icon && <Icon className="w-5 h-5" />}
        <span className="relative z-10">{children}</span>
        <ArrowRight className="w-5 h-5 relative z-10 transform group-hover:translate-x-1 transition-transform" />
      </span>
    </Component>
  )
}

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })

  // Animated gradient mesh background
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resize()
    window.addEventListener('resize', resize)

    let time = 0
    let animationId: number

    const animate = () => {
      time += 0.005
      const width = canvas.offsetWidth
      const height = canvas.offsetHeight

      // Create gradient mesh
      const gradient = ctx.createRadialGradient(
        width * (0.3 + Math.sin(time) * 0.1 + (mousePos.x - 0.5) * 0.2),
        height * (0.3 + Math.cos(time * 0.7) * 0.1 + (mousePos.y - 0.5) * 0.2),
        0,
        width * 0.5,
        height * 0.5,
        width * 0.8
      )

      gradient.addColorStop(0, 'rgba(45, 90, 61, 0.9)')
      gradient.addColorStop(0.5, 'rgba(27, 58, 42, 0.95)')
      gradient.addColorStop(1, 'rgba(45, 90, 61, 1)')

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      // Add floating orbs
      const orbs = [
        { x: 0.2, y: 0.3, radius: 150, color: 'rgba(76, 175, 80, 0.15)' },
        { x: 0.8, y: 0.7, radius: 200, color: 'rgba(45, 90, 61, 0.2)' },
        { x: 0.5, y: 0.5, radius: 100, color: 'rgba(76, 175, 80, 0.1)' },
      ]

      orbs.forEach((orb, i) => {
        const orbX = width * (orb.x + Math.sin(time + i) * 0.05)
        const orbY = height * (orb.y + Math.cos(time * 0.8 + i) * 0.05)

        const orbGradient = ctx.createRadialGradient(orbX, orbY, 0, orbX, orbY, orb.radius)
        orbGradient.addColorStop(0, orb.color)
        orbGradient.addColorStop(1, 'transparent')

        ctx.fillStyle = orbGradient
        ctx.fillRect(0, 0, width, height)
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [mousePos])

  // Mouse tracking for gradient
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      })
    }

    const section = sectionRef.current
    if (section) {
      section.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      if (section) {
        section.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [])

  // Content animation
  useEffect(() => {
    const section = sectionRef.current
    const content = contentRef.current

    if (!section || !content) return

    const elements = content.querySelectorAll('.animate-item')
    gsap.fromTo(
      elements,
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          once: true,
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === section) st.kill()
      })
    }
  }, [])

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-32 lg:py-40 overflow-hidden"
    >
      {/* Animated background canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Content */}
      <div ref={contentRef} className="relative z-10 w-full section-padding">
        <div className="max-w-3xl mx-auto text-center">
          {/* Sparkle decoration */}
          <div className="animate-item flex justify-center mb-6">
            <div className="relative">
              <Sparkles className="w-8 h-8 text-green-accent animate-pulse" />
              <div className="absolute inset-0 w-8 h-8 bg-green-accent/30 blur-xl" />
            </div>
          </div>

          {/* Badge */}
          <div className="animate-item inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
            <MessageCircle className="w-4 h-4 text-green-accent" />
            <span className="text-white/90 text-sm font-medium">
              Open for Collaboration
            </span>
          </div>

          {/* Heading */}
          <h2 className="animate-item font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-bold mb-6">
            Let&apos;s Work Together
          </h2>

          {/* Description */}
          <p className="animate-item text-lg sm:text-xl text-white/80 max-w-xl mx-auto mb-10 leading-relaxed">
            Whether you&apos;re interested in research collaboration, speaking engagements, 
            or just want to chat about AI and Ecology, I&apos;d love to hear from you.
          </p>

          {/* CTA Buttons */}
          <div className="animate-item flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton
              href="mailto:geethen.singh@gmail.com"
              variant="primary"
              icon={Mail}
            >
              Send an Email
            </MagneticButton>
            
            <MagneticButton
              href="https://www.linkedin.com/in/geethen-singh-a06660106/"
              variant="secondary"
              icon={Linkedin}
            >
              LinkedIn Profile
            </MagneticButton>
          </div>

          {/* Additional info */}
          <div className="animate-item mt-16 pt-8 border-t border-white/10">
            <p className="text-white/60 text-sm">
              Based in South Africa • Available for remote collaboration worldwide
            </p>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-10 left-10 w-20 h-20 rounded-full border border-white/10 animate-pulse-slow" />
      <div className="absolute top-20 right-20 w-32 h-32 rounded-full border border-white/5 animate-float" />
    </section>
  )
}

export default Contact
