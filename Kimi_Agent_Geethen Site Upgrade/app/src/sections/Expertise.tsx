import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Satellite, Brain, TreePine, ArrowUpRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface CardProps {
  icon: React.ElementType
  title: string
  subtitle: string
  description: string
  index: number
}

const ExpertiseCard = ({ icon: Icon, title, subtitle, description, index }: CardProps) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    
    setTilt({
      x: y * -10,
      y: x * 10,
    })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setIsHovered(false)
  }

  return (
    <div
      ref={cardRef}
      className={`tilt-card group relative ${index === 1 ? 'lg:mt-10' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: isHovered ? 'none' : 'transform 0.5s ease-out',
      }}
    >
      <div className="relative p-8 rounded-2xl bg-white border border-gray-100 shadow-soft hover:shadow-soft-lg transition-shadow duration-500 overflow-hidden">
        {/* Background glow */}
        <div 
          className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-green-accent/10 blur-3xl transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        />
        
        {/* Icon */}
        <div className="relative mb-6">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-primary to-green-accent flex items-center justify-center shadow-green group-hover:scale-110 transition-transform duration-500">
            <Icon className="w-7 h-7 text-white" />
          </div>
          {/* Animated ring */}
          <div className={`absolute inset-0 w-14 h-14 rounded-xl border-2 border-green-accent/30 transition-all duration-500 ${isHovered ? 'scale-150 opacity-0' : 'scale-100 opacity-100'}`} />
        </div>

        {/* Content */}
        <div className="relative">
          <p className="text-xs font-medium text-green-accent uppercase tracking-wider mb-2">
            {subtitle}
          </p>
          <h3 className="font-serif text-2xl text-gray-900 font-semibold mb-3 group-hover:text-green-primary transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 leading-relaxed text-sm mb-4">
            {description}
          </p>
          
          {/* Learn more link */}
          <a 
            href="#publications" 
            className="inline-flex items-center gap-1 text-sm font-medium text-green-primary opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
          >
            Explore
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Corner decoration */}
        <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
          <div className={`absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-green-light/50 to-transparent transform rotate-45 translate-x-10 -translate-y-10 transition-transform duration-500 ${isHovered ? 'scale-150' : 'scale-100'}`} />
        </div>
      </div>
    </div>
  )
}

const Expertise = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  const expertiseAreas = [
    {
      icon: Satellite,
      title: 'Remote Sensing',
      subtitle: 'EO Data',
      description: 'Extracting high-resolution insights from satellite or aerial imagery to track environmental changes at scale across diverse biomes.',
    },
    {
      icon: Brain,
      title: 'Computer Vision',
      subtitle: 'Deep Learning',
      description: 'Applying state-of-the-art CNNs and Vision Transformers to automate species mapping and enable near real-time environmental monitoring.',
    },
    {
      icon: TreePine,
      title: 'Conservation AI',
      subtitle: 'Ecological Modeling',
      description: 'Developing predictive models to help conservationists make data-driven decisions for reforestation, species protection, and ecosystem restoration.',
    },
  ]

  useEffect(() => {
    const section = sectionRef.current
    const heading = headingRef.current
    const cards = cardsRef.current

    if (!section || !heading || !cards) return

    // Heading animation
    gsap.fromTo(
      heading.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          once: true,
        },
      }
    )

    // Cards 3D flip animation
    const cardElements = cards.querySelectorAll('.tilt-card')
    gsap.fromTo(
      cardElements,
      { opacity: 0, rotateX: 45, y: 50 },
      {
        opacity: 1,
        rotateX: 0,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: cards,
          start: 'top 75%',
          once: true,
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === section || st.vars.trigger === cards) st.kill()
      })
    }
  }, [])

  return (
    <section
      id="expertise"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-gradient-to-b from-white via-green-light/20 to-white overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-green-accent/5 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-green-primary/5 blur-3xl" />

      <div className="w-full section-padding">
        {/* Header */}
        <div ref={headingRef} className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-green-primary" />
            <span className="text-green-primary text-sm font-medium uppercase tracking-wider">
              What I Do
            </span>
            <div className="w-8 h-px bg-green-primary" />
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-gray-900 font-bold mb-4">
            Expertise
          </h2>
          <p className="text-gray-600 text-lg">
            Core research areas where ecology meets artificial intelligence
          </p>
        </div>

        {/* Cards Grid */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto"
          style={{ perspective: '1000px' }}
        >
          {expertiseAreas.map((area, index) => (
            <ExpertiseCard
              key={index}
              icon={area.icon}
              title={area.title}
              subtitle={area.subtitle}
              description={area.description}
              index={index}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <a
            href="#publications"
            className="inline-flex items-center gap-2 text-green-primary font-medium hover:gap-3 transition-all duration-300"
          >
            View all research
            <ArrowUpRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  )
}

export default Expertise
