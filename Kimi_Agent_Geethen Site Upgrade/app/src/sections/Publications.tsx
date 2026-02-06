import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ExternalLink, BookOpen, Quote, ChevronLeft, ChevronRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface Publication {
  title: string
  year: number
  venue: string
  citations: number
  abstract: string
  url: string
  image: string
}

const publicationsData: Publication[] = [
  {
    title: "Global 10m land use land cover datasets: A comparison of dynamic world, world cover and esri land cover",
    year: 2022,
    venue: "Remote Sensing",
    citations: 355,
    abstract: "The European Space Agency's Sentinel satellites have laid the foundation for global land use land cover (LULC) mapping with unprecedented detail at 10m resolution.",
    url: "https://www.mdpi.com/2072-4292/14/16/4101",
    image: "/pub-1.jpg"
  },
  {
    title: "Uncertainty quantification for probabilistic machine learning in earth observation using conformal prediction",
    year: 2024,
    venue: "Scientific Reports",
    citations: 35,
    abstract: "Machine learning is increasingly applied to Earth Observation (EO) data to obtain datasets that contribute towards international accords.",
    url: "https://www.nature.com/articles/s41598-024-65954-w",
    image: "/pub-2.jpg"
  },
  {
    title: "A remote sensing method to monitor water, aquatic vegetation, and invasive water hyacinth at national extents",
    year: 2020,
    venue: "Remote Sensing",
    citations: 80,
    abstract: "Diverse freshwater biological communities are threatened by invasive aquatic alien plant (IAAP) invasions and consequently, cost countries millions to manage.",
    url: "https://www.mdpi.com/2072-4292/12/24/4021",
    image: "/pub-3.jpg"
  },
  {
    title: "A place-based assessment of biodiversity intactness in sub-Saharan Africa",
    year: 2025,
    venue: "Nature",
    citations: 1,
    abstract: "Maintaining biodiversity is central to the sustainable development agenda. However, a lack of context-specific biodiversity information at policy-relevant scales has posed major challenges.",
    url: "https://www.nature.com/articles/s41586-025-09781-7",
    image: "/pub-1.jpg"
  },
  {
    title: "The invaded range of the tree fern Sphaeropteris cooperi is predicted to shrink in two southern hemisphere biodiversity hotspots",
    year: 2025,
    venue: "South African Journal of Botany",
    citations: 0,
    abstract: "Biological invasions are increasing globally, with species demonstrating differing responses to climate change in their native and invaded ranges.",
    url: "https://www.sciencedirect.com/science/article/pii/S0254629925000596",
    image: "/pub-3.jpg"
  },
  {
    title: "An earth observation and explainable machine learning approach for determining the drivers of invasive species",
    year: 2025,
    venue: "Environmental Monitoring and Assessment",
    citations: 0,
    abstract: "Invasive species management is often constrained by limited resources and complicated by ecological and socio-economic variability across landscapes.",
    url: "https://link.springer.com/article/10.1007/s10661-025-14517-1",
    image: "/pub-2.jpg"
  }
]

const PublicationCard = ({ pub }: { pub: Publication }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [displayCitations, setDisplayCitations] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
          // Animate citation counter
          const duration = 1500
          const start = 0
          const end = pub.citations
          const startTime = performance.now()

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            const easeProgress = 1 - Math.pow(1 - progress, 3)
            setDisplayCitations(Math.floor(start + (end - start) * easeProgress))

            if (progress < 1) {
              requestAnimationFrame(animate)
            }
          }

          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(card)
    return () => observer.disconnect()
  }, [pub.citations, isVisible])

  return (
    <div
      ref={cardRef}
      className="group relative flex-shrink-0 w-[350px] sm:w-[400px] snap-center"
    >
      <div className="relative h-full rounded-2xl bg-white border border-gray-100 shadow-soft overflow-hidden hover:shadow-soft-lg transition-all duration-500">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={pub.image}
            alt={pub.title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Year badge */}
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-sm font-medium text-green-primary">
            {pub.year}
          </div>
          
          {/* Citations badge */}
          <div className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-1 rounded-full bg-green-primary/90 backdrop-blur-sm text-white text-sm">
            <BookOpen className="w-4 h-4" />
            <span className="font-semibold">{displayCitations}</span>
            <span className="text-white/80">citations</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-xs text-green-accent font-medium uppercase tracking-wider mb-2">
            {pub.venue}
          </p>
          <h3 className="font-serif text-lg text-gray-900 font-semibold mb-3 line-clamp-2 group-hover:text-green-primary transition-colors">
            {pub.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-3 mb-4">
            {pub.abstract}
          </p>
          
          {/* Link */}
          <a
            href={pub.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-green-primary hover:gap-3 transition-all duration-300"
          >
            Read Paper
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  )
}

const Publications = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  useEffect(() => {
    const section = sectionRef.current
    const heading = headingRef.current

    if (!section || !heading) return

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

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === section) st.kill()
      })
    }
  }, [])

  const checkScrollButtons = () => {
    const container = scrollContainerRef.current
    if (!container) return

    setCanScrollLeft(container.scrollLeft > 0)
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    )
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    container.addEventListener('scroll', checkScrollButtons, { passive: true })
    checkScrollButtons()

    return () => container.removeEventListener('scroll', checkScrollButtons)
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current
    if (!container) return

    const scrollAmount = 420
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  const totalCitations = publicationsData.reduce((sum, pub) => sum + pub.citations, 0)

  return (
    <section
      id="publications"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-white overflow-hidden"
    >
      {/* Background quote decoration */}
      <Quote className="absolute top-20 left-10 w-32 h-32 text-green-light opacity-50" />

      <div className="w-full">
        {/* Header */}
        <div ref={headingRef} className="section-padding text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-green-primary" />
            <span className="text-green-primary text-sm font-medium uppercase tracking-wider">
              Research Output
            </span>
            <div className="w-8 h-px bg-green-primary" />
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-gray-900 font-bold mb-4">
            Latest Publications
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            My research is automatically synced from my Google Scholar profile.
          </p>
          
          {/* Stats */}
          <div className="flex items-center justify-center gap-8">
            <div className="text-center">
              <p className="text-3xl font-serif font-bold text-green-primary">{publicationsData.length}</p>
              <p className="text-sm text-gray-500">Publications</p>
            </div>
            <div className="w-px h-12 bg-gray-200" />
            <div className="text-center">
              <p className="text-3xl font-serif font-bold text-green-primary">{totalCitations}</p>
              <p className="text-sm text-gray-500">Total Citations</p>
            </div>
            <div className="w-px h-12 bg-gray-200" />
            <div className="text-center">
              <p className="text-3xl font-serif font-bold text-green-primary">h-3</p>
              <p className="text-sm text-gray-500">H-Index</p>
            </div>
          </div>
        </div>

        {/* Horizontal scroll container */}
        <div className="relative">
          {/* Scroll buttons */}
          <button
            onClick={() => scroll('left')}
            className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-soft-lg flex items-center justify-center transition-all duration-300 ${
              canScrollLeft
                ? 'opacity-100 hover:bg-green-primary hover:text-white'
                : 'opacity-0 pointer-events-none'
            }`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={() => scroll('right')}
            className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-soft-lg flex items-center justify-center transition-all duration-300 ${
              canScrollRight
                ? 'opacity-100 hover:bg-green-primary hover:text-white'
                : 'opacity-0 pointer-events-none'
            }`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Cards container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 sm:px-8 lg:px-16 pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* Spacer for centering */}
            <div className="flex-shrink-0 w-4 sm:w-8 lg:w-16" />
            
            {publicationsData.map((pub, index) => (
              <PublicationCard key={index} pub={pub} />
            ))}
            
            {/* View all card */}
            <div className="flex-shrink-0 w-[350px] sm:w-[400px] snap-center">
              <a
                href="https://scholar.google.com/citations?user=J4rtU2kAAAAJ&hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center h-full min-h-[400px] rounded-2xl bg-gradient-to-br from-green-primary to-green-dark text-white p-8 hover:shadow-glow transition-all duration-500 group"
              >
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ExternalLink className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-semibold mb-2 text-center">
                  View All Publications
                </h3>
                <p className="text-white/80 text-center mb-4">
                  Explore my complete research portfolio on Google Scholar
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all">
                  Visit Profile
                  <ChevronRight className="w-4 h-4" />
                </span>
              </a>
            </div>
            
            {/* Spacer */}
            <div className="flex-shrink-0 w-4 sm:w-8 lg:w-16" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Publications
