import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ArrowRight, ChevronDown } from 'lucide-react'

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  // Particle network animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Particle system
    const particles: { x: number; y: number; vx: number; vy: number; radius: number }[] = []
    const particleCount = 60
    const connectionDistance = 150

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
      })
    }

    let animationId: number
    let frameCount = 0

    const animate = () => {
      frameCount++
      // Render every 2nd frame for performance (30fps)
      if (frameCount % 2 === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Update and draw particles
        particles.forEach((particle, i) => {
          particle.x += particle.vx
          particle.y += particle.vy

          // Bounce off edges
          if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
          if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

          // Draw particle
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
          ctx.fillStyle = 'rgba(76, 175, 80, 0.4)'
          ctx.fill()

          // Draw connections (only check every 5th particle for performance)
          if (i % 5 === 0) {
            for (let j = i + 1; j < particles.length; j += 3) {
              const dx = particles[j].x - particle.x
              const dy = particles[j].y - particle.y
              const distance = Math.sqrt(dx * dx + dy * dy)

              if (distance < connectionDistance) {
                ctx.beginPath()
                ctx.moveTo(particle.x, particle.y)
                ctx.lineTo(particles[j].x, particles[j].y)
                ctx.strokeStyle = `rgba(76, 175, 80, ${0.2 * (1 - distance / connectionDistance)})`
                ctx.lineWidth = 0.5
                ctx.stroke()
              }
            }
          }
        })
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  // GSAP entrance animations
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 })

    // Background image animation
    if (imageRef.current) {
      tl.fromTo(
        imageRef.current,
        { scale: 1.2, filter: 'blur(10px)' },
        { scale: 1, filter: 'blur(0px)', duration: 1.8, ease: 'expo.out' },
        0
      )
    }

    // Badge animation
    if (badgeRef.current) {
      tl.fromTo(
        badgeRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out' },
        0.5
      )
    }

    // Title animation - word by word
    if (titleRef.current) {
      const words = titleRef.current.querySelectorAll('.word')
      tl.fromTo(
        words,
        { y: '100%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 1, stagger: 0.1, ease: 'expo.out' },
        0.7
      )
    }

    // Subtitle animation
    if (subtitleRef.current) {
      tl.fromTo(
        subtitleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
        1.0
      )
    }

    // CTA buttons animation
    if (ctaRef.current) {
      const buttons = ctaRef.current.querySelectorAll('a')
      tl.fromTo(
        buttons,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'elastic.out(1, 0.5)' },
        1.2
      )
    }
  }, [])

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!imageRef.current) return
      
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      
      const x = (clientX / innerWidth - 0.5) * 20
      const y = (clientY / innerHeight - 0.5) * 20
      
      gsap.to(imageRef.current, {
        x,
        y,
        duration: 0.8,
        ease: 'power2.out',
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
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

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-full"
        style={{ willChange: 'transform' }}
      >
        <img
          src="/hero-bg.jpg"
          alt="Aerial view of forest and river"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-green-dark/60 via-green-dark/40 to-green-dark/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-green-dark/50 to-transparent" />
      </div>

      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="particle-canvas"
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 w-full section-padding py-32"
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-green-accent animate-pulse" />
            <span className="text-white/90 text-sm font-medium tracking-wide uppercase">
              Ecology x AI
            </span>
          </div>

          {/* Title */}
          <h1
            ref={titleRef}
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-bold leading-tight mb-6"
          >
            <span className="overflow-hidden inline-block">
              <span className="word inline-block">Decoding</span>
            </span>{' '}
            <span className="overflow-hidden inline-block">
              <span className="word inline-block">Nature</span>
            </span>{' '}
            <span className="overflow-hidden inline-block">
              <span className="word inline-block">with</span>
            </span>
            <br className="hidden sm:block" />
            <span className="overflow-hidden inline-block">
              <span className="word inline-block text-green-accent">Artificial</span>
            </span>{' '}
            <span className="overflow-hidden inline-block">
              <span className="word inline-block text-green-accent">Intelligence</span>
            </span>
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Bridging the gap between ecological conservation and cutting-edge machine learning 
            to protect our planet&apos;s future.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#publications"
              onClick={(e) => handleNavClick(e, '#publications')}
              className="btn-primary flex items-center gap-2 group"
            >
              View Research
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="btn-secondary"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <a
          href="#about"
          onClick={(e) => handleNavClick(e, '#about')}
          className="flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </a>
      </div>
    </section>
  )
}

export default Hero
