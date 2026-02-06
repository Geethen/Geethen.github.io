import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin, GraduationCap, Briefcase, Award } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const underlineRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const image = imageRef.current
    const content = contentRef.current
    const heading = headingRef.current
    const underline = underlineRef.current

    if (!section || !image || !content || !heading || !underline) return

    // Image reveal animation
    gsap.fromTo(
      image,
      { clipPath: 'inset(100% 0 0 0)' },
      {
        clipPath: 'inset(0% 0 0 0)',
        duration: 1.2,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          once: true,
        },
      }
    )

    // Image scale on scroll
    gsap.fromTo(
      image.querySelector('img'),
      { scale: 1 },
      {
        scale: 1.1,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    )

    // Heading character reveal
    const chars = heading.querySelectorAll('.char')
    gsap.fromTo(
      chars,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.03,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          once: true,
        },
      }
    )

    // Underline draw animation
    const pathLength = underline.getTotalLength()
    gsap.fromTo(
      underline,
      { strokeDasharray: pathLength, strokeDashoffset: pathLength },
      {
        strokeDashoffset: 0,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          once: true,
        },
      }
    )

    // Content paragraphs stagger
    const paragraphs = content.querySelectorAll('.content-item')
    gsap.fromTo(
      paragraphs,
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
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

  const stats = [
    { icon: GraduationCap, label: 'PhD Researcher', value: 'Remote Sensing' },
    { icon: Briefcase, label: 'Experience', value: '10+ Years' },
    { icon: MapPin, label: 'Location', value: 'South Africa' },
    { icon: Award, label: 'Publications', value: '8+ Papers' },
  ]

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-white overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-green-light/30 to-transparent" />
      
      <div className="w-full section-padding">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Content */}
          <div ref={contentRef} className="order-2 lg:order-1">
            {/* Section label */}
            <div className="content-item flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-green-primary" />
              <span className="text-green-primary text-sm font-medium uppercase tracking-wider">
                About Me
              </span>
            </div>

            {/* Heading with animated underline */}
            <div className="relative mb-8">
              <h2
                ref={headingRef}
                className="font-serif text-4xl sm:text-5xl lg:text-6xl text-gray-900 font-bold"
              >
                {'My Mission'.split('').map((char, i) => (
                  <span key={i} className="char inline-block">
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </h2>
              <svg
                className="absolute -bottom-2 left-0 w-48 h-3"
                viewBox="0 0 200 12"
                fill="none"
              >
                <path
                  ref={underlineRef}
                  d="M2 8C50 2 150 2 198 8"
                  stroke="#4caf50"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </div>

            {/* Subheading */}
            <h3 className="content-item text-xl sm:text-2xl text-green-primary font-medium mb-6">
              Scaling Conservation through Technology
            </h3>

            {/* Body text */}
            <div className="space-y-4 text-gray-600 leading-relaxed mb-10">
              <p className="content-item">
                I am an Ecologist and AI Researcher specializing in the application of Machine Learning 
                to Earth Observation data. Currently a Post-doctoral Fellow at Stellenbosch University 
                and an Associate at the University of the Witwatersrand, my work focuses on developing 
                operational environmental monitoring systems and advancing uncertainty quantification 
                using techniques like Conformal Prediction.
              </p>
              <p className="content-item">
                With a PhD focused on using Remote Sensing and Google Earth Engine to manage invasive 
                species, I have experience bridging academia and industry, having worked with NGOs like 
                Natural State and Conservation Alpha to estimate forest metrics and biomass at scale.
              </p>
            </div>

            {/* Stats grid */}
            <div className="content-item grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-xl bg-green-light/50 hover:bg-green-light transition-colors duration-300 group"
                >
                  <div className="p-2 rounded-lg bg-green-primary/10 group-hover:bg-green-primary/20 transition-colors">
                    <stat.icon className="w-5 h-5 text-green-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</p>
                    <p className="text-sm font-semibold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 lg:sticky lg:top-24">
            <div
              ref={imageRef}
              className="relative rounded-2xl overflow-hidden shadow-soft-lg"
            >
              <img
                src="/about-image.jpg"
                alt="Ecologist in field"
                className="w-full h-[500px] lg:h-[600px] object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-green-dark/40 to-transparent" />
              
              {/* Floating badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/90 backdrop-blur-sm shadow-soft">
                <p className="text-sm text-gray-600">Ecologist & AI Researcher</p>
                <p className="text-lg font-serif font-semibold text-green-primary">
                  Bridging nature and technology
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
