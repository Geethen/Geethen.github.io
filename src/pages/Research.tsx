import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { papers } from '../content/data';
import scholarStats from '../content/scholar.json';
import { ExternalLink, ArrowRight, BookOpen, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface PublicationCardProps {
    paper: typeof papers[0];
    index: number;
}

const PublicationCard: React.FC<PublicationCardProps> = ({ paper, index }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    const citationCount = scholarStats.citations[paper.id as keyof typeof scholarStats.citations] || 0;
    const [displayCitations, setDisplayCitations] = useState(0);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true);
                    // Animate citation counter
                    const duration = 1500;
                    const start = 0;
                    const end = citationCount;
                    const startTime = performance.now();

                    const animate = (currentTime: number) => {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const easeProgress = 1 - Math.pow(1 - progress, 3);
                        setDisplayCitations(Math.floor(start + (end - start) * easeProgress));

                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        }
                    };

                    requestAnimationFrame(animate);
                }
            },
            { threshold: 0.5 }
        );

        observer.observe(card);
        return () => observer.disconnect();
    }, [citationCount, isVisible]);

    // Placeholder images based on paper category
    const getPlaceholderImage = () => {
        if (paper.tags.includes('Remote Sensing') || paper.tags.includes('Land Cover')) {
            return '/assets/kimi/pub-1.jpg';
        } else if (paper.tags.includes('Machine Learning') || paper.tags.includes('XAI')) {
            return '/assets/kimi/pub-2.jpg';
        } else {
            return '/assets/kimi/pub-3.jpg';
        }
    };

    return (
        <div
            ref={cardRef}
            className="group relative flex-shrink-0 w-[350px] sm:w-[400px] snap-center"
        >
            <div className="relative h-full rounded-2xl bg-white border border-gray-100 shadow-soft overflow-hidden hover:shadow-soft-lg transition-all duration-500">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={getPlaceholderImage()}
                        alt={paper.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    {/* Year badge */}
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-sm font-medium text-green-primary">
                        {paper.date}
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
                        {paper.journal.split(/\d/)[0].trim()}
                    </p>
                    <h3 className="font-serif text-lg text-gray-900 font-semibold mb-3 line-clamp-2 group-hover:text-green-primary transition-colors">
                        {paper.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">{paper.authors}</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                        {paper.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="px-2 py-0.5 bg-gray-50 text-gray-500 rounded-full text-xs">
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-3">
                        {paper.link && (
                            <a
                                href={paper.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm font-medium text-green-primary hover:gap-3 transition-all duration-300"
                            >
                                Read Paper
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        )}
                        <Link
                            to={`/research/${paper.id}`}
                            className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-green-primary transition-colors"
                        >
                            Details
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Research = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    useEffect(() => {
        // Clear any existing triggers
        if (ScrollTrigger.getAll().length > 0) {
            ScrollTrigger.getAll().forEach(t => t.kill());
        }

        gsap.fromTo('.reveal-up',
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.container-custom',
                    start: 'top 90%',
                }
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    const checkScrollButtons = () => {
        const container = scrollContainerRef.current;
        if (!container) return;

        setCanScrollLeft(container.scrollLeft > 0);
        setCanScrollRight(
            container.scrollLeft < container.scrollWidth - container.clientWidth - 10
        );
    };

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        container.addEventListener('scroll', checkScrollButtons, { passive: true });
        checkScrollButtons();

        return () => container.removeEventListener('scroll', checkScrollButtons);
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const scrollAmount = 420;
        container.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth',
        });
    };

    const totalCitations = scholarStats.totalCitations;

    return (
        <div className="research-page pt-32 pb-24 bg-green-light/10 min-h-screen relative overflow-hidden">
            {/* Background quote decoration */}
            <Quote className="absolute top-32 left-10 w-32 h-32 text-green-light opacity-50" />

            <div className="container-custom">
                <header className="mb-16 reveal-up text-center max-w-3xl mx-auto">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="w-8 h-px bg-green-primary" />
                        <span className="text-green-primary text-sm font-medium uppercase tracking-wider">
                            Research Output
                        </span>
                        <div className="w-8 h-px bg-green-primary" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-green-dark mb-6">Research Contributions</h1>
                    <p className="text-xl text-gray-600 leading-relaxed mb-8">
                        A collection of peer-reviewed articles focusing on the intersection of Remote Sensing,
                        Ecological Conservation, and Machine Learning.
                    </p>

                    {/* Stats */}
                    <div className="flex items-center justify-center gap-8">
                        <div className="text-center">
                            <p className="text-3xl font-serif font-bold text-green-primary">{papers.length}</p>
                            <p className="text-sm text-gray-500">Publications</p>
                        </div>
                        <div className="w-px h-12 bg-gray-200" />
                        <div className="text-center">
                            <p className="text-3xl font-serif font-bold text-green-primary">{totalCitations}+</p>
                            <p className="text-sm text-gray-500">Total Citations</p>
                        </div>
                        <div className="w-px h-12 bg-gray-200" />
                        <div className="text-center">
                            <p className="text-3xl font-serif font-bold text-green-primary">h-{scholarStats.hIndex}</p>
                            <p className="text-sm text-gray-500">H-Index</p>
                        </div>
                    </div>
                </header>
            </div>

            {/* Horizontal scroll container */}
            <div className="relative mb-16">
                {/* Scroll buttons */}
                <button
                    onClick={() => scroll('left')}
                    className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-soft-lg flex items-center justify-center transition-all duration-300 ${canScrollLeft
                        ? 'opacity-100 hover:bg-green-primary hover:text-white'
                        : 'opacity-0 pointer-events-none'
                        }`}
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                    onClick={() => scroll('right')}
                    className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-soft-lg flex items-center justify-center transition-all duration-300 ${canScrollRight
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
                    {/* Spacer */}
                    <div className="flex-shrink-0 w-4 sm:w-8 lg:w-16" />

                    {papers.map((paper, index) => (
                        <PublicationCard key={paper.id} paper={paper} index={index} />
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

            {/* Grid view for detailed browsing */}
            <div className="container-custom">
                <h2 className="text-2xl font-serif font-bold text-green-dark mb-8 reveal-up">All Publications</h2>
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    {papers.map((paper) => (
                        <div
                            key={paper.id}
                            className="bg-white border border-gray-100 rounded-[2rem] p-8 lg:p-10 shadow-soft hover:shadow-soft-lg transition-all duration-500 card-hover reveal-up group"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="pub-year">{paper.date}</div>
                                <div className="w-12 h-12 bg-green-light rounded-xl flex items-center justify-center text-green-primary group-hover:bg-green-primary group-hover:text-white transition-colors">
                                    <BookOpen className="w-6 h-6" />
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold mb-4 text-green-dark group-hover:text-green-primary transition-colors leading-snug">
                                {paper.title}
                            </h3>

                            <p className="text-gray-500 mb-2 font-medium">{paper.authors}</p>
                            <p className="text-gray-400 font-serif italic mb-8">{paper.journal}</p>

                            <div className="flex flex-wrap gap-2 mb-10">
                                {paper.tags.map(tag => (
                                    <span key={tag} className="px-4 py-1.5 bg-gray-50 text-gray-500 rounded-full text-xs font-bold uppercase tracking-widest group-hover:bg-green-light group-hover:text-green-primary transition-colors">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center gap-4 mt-auto">
                                {paper.link ? (
                                    <a
                                        href={paper.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 bg-green-primary text-white text-center py-4 rounded-full font-bold hover:bg-green-dark transition-all flex items-center justify-center gap-2 group/btn"
                                    >
                                        Read Paper
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                ) : (
                                    <Link
                                        to={`/research/${paper.id}`}
                                        className="flex-1 bg-green-light text-green-primary text-center py-4 rounded-full font-bold hover:bg-green-primary hover:text-white transition-all flex items-center justify-center gap-2 group/btn"
                                    >
                                        View Details
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                                    </Link>
                                )}
                                <Link
                                    to={`/research/${paper.id}`}
                                    className="w-14 h-14 bg-green-light text-green-primary rounded-full flex items-center justify-center hover:bg-green-primary hover:text-white transition-colors"
                                    title="View Details"
                                >
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Research;
