import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronDown, Leaf, Globe, Cpu, ExternalLink, Mail, Linkedin, Sparkles, MessageCircle, MapPin, GraduationCap, Briefcase, Award } from 'lucide-react';
import ExpertiseCard from '../components/ExpertiseCard';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    const heroRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const aboutImageRef = useRef<HTMLDivElement>(null);
    const contactCanvasRef = useRef<HTMLCanvasElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

    // Particle network animation
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const particles: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];
        const particleCount = 60;
        const connectionDistance = 150;

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1,
            });
        }

        let animationId: number;
        let frameCount = 0;

        const animate = () => {
            frameCount++;
            // Render every 2nd frame for performance
            if (frameCount % 2 === 0) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                particles.forEach((particle, i) => {
                    particle.x += particle.vx;
                    particle.y += particle.vy;

                    if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                    if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

                    ctx.beginPath();
                    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(76, 175, 80, 0.4)';
                    ctx.fill();

                    if (i % 5 === 0) {
                        for (let j = i + 1; j < particles.length; j += 3) {
                            const dx = particles[j].x - particle.x;
                            const dy = particles[j].y - particle.y;
                            const distance = Math.sqrt(dx * dx + dy * dy);

                            if (distance < connectionDistance) {
                                ctx.beginPath();
                                ctx.moveTo(particle.x, particle.y);
                                ctx.lineTo(particles[j].x, particles[j].y);
                                ctx.strokeStyle = `rgba(76, 175, 80, ${0.2 * (1 - distance / connectionDistance)})`;
                                ctx.lineWidth = 0.5;
                                ctx.stroke();
                            }
                        }
                    }
                });
            }
            animationId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationId);
        };
    }, []);

    // Mouse parallax effect for hero background
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!imageRef.current) return;

            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            const x = (clientX / innerWidth - 0.5) * 20;
            const y = (clientY / innerHeight - 0.5) * 20;

            gsap.to(imageRef.current, {
                x,
                y,
                duration: 0.8,
                ease: 'power2.out',
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // GSAP entrance animations
    useEffect(() => {
        const tl = gsap.timeline({ delay: 0.3 });

        // Hero background animation
        if (imageRef.current) {
            tl.fromTo(
                imageRef.current,
                { scale: 1.2, filter: 'blur(10px)' },
                { scale: 1, filter: 'blur(0px)', duration: 1.8, ease: 'expo.out' },
                0
            );
        }

        // Hero content animation
        tl.fromTo('.hero-content',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out' },
            0.5
        );

        // Word by word title animation
        if (titleRef.current) {
            const words = titleRef.current.querySelectorAll('.word');
            tl.fromTo(
                words,
                { y: '100%', opacity: 0 },
                { y: '0%', opacity: 1, duration: 1, stagger: 0.1, ease: 'expo.out' },
                0.7
            );
        }

        // CTA buttons animation
        tl.fromTo('.hero-cta',
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'elastic.out(1, 0.5)' },
            1.2
        );

        // Section reveals
        const reveals = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-scale');
        reveals.forEach((el) => {
            gsap.fromTo(el,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });

        // About image reveal
        if (aboutImageRef.current) {
            gsap.fromTo(
                aboutImageRef.current,
                { clipPath: 'inset(100% 0 0 0)' },
                {
                    clipPath: 'inset(0% 0 0 0)',
                    duration: 1.2,
                    ease: 'expo.out',
                    scrollTrigger: {
                        trigger: aboutImageRef.current,
                        start: 'top 70%',
                        once: true,
                    },
                }
            );
        }

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    // Contact section animated gradient
    useEffect(() => {
        const canvas = contactCanvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            canvas.width = canvas.offsetWidth * window.devicePixelRatio;
            canvas.height = canvas.offsetHeight * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        };
        resize();
        window.addEventListener('resize', resize);

        let time = 0;
        let animationId: number;

        const animate = () => {
            time += 0.005;
            const width = canvas.offsetWidth;
            const height = canvas.offsetHeight;

            const gradient = ctx.createRadialGradient(
                width * (0.3 + Math.sin(time) * 0.1 + (mousePos.x - 0.5) * 0.2),
                height * (0.3 + Math.cos(time * 0.7) * 0.1 + (mousePos.y - 0.5) * 0.2),
                0,
                width * 0.5,
                height * 0.5,
                width * 0.8
            );

            gradient.addColorStop(0, 'rgba(45, 90, 61, 0.9)');
            gradient.addColorStop(0.5, 'rgba(27, 58, 42, 0.95)');
            gradient.addColorStop(1, 'rgba(45, 90, 61, 1)');

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);

            const orbs = [
                { x: 0.2, y: 0.3, radius: 150, color: 'rgba(76, 175, 80, 0.15)' },
                { x: 0.8, y: 0.7, radius: 200, color: 'rgba(45, 90, 61, 0.2)' },
                { x: 0.5, y: 0.5, radius: 100, color: 'rgba(76, 175, 80, 0.1)' },
            ];

            orbs.forEach((orb, i) => {
                const orbX = width * (orb.x + Math.sin(time + i) * 0.05);
                const orbY = height * (orb.y + Math.cos(time * 0.8 + i) * 0.05);

                const orbGradient = ctx.createRadialGradient(orbX, orbY, 0, orbX, orbY, orb.radius);
                orbGradient.addColorStop(0, orb.color);
                orbGradient.addColorStop(1, 'transparent');

                ctx.fillStyle = orbGradient;
                ctx.fillRect(0, 0, width, height);
            });

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationId);
        };
    }, [mousePos]);

    const handleContactMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({
            x: (e.clientX - rect.left) / rect.width,
            y: (e.clientY - rect.top) / rect.height,
        });
    };

    const stats = [
        { icon: GraduationCap, label: 'PhD Researcher', value: 'Remote Sensing' },
        { icon: Briefcase, label: 'Experience', value: '10+ Years' },
        { icon: MapPin, label: 'Location', value: 'South Africa' },
        { icon: Award, label: 'Publications', value: '8+ Papers' },
    ];

    const expertiseAreas = [
        {
            icon: Globe,
            title: 'Remote Sensing',
            subtitle: 'EO Data',
            description: 'Extracting high-resolution insights from satellite or aerial imagery to track environmental changes at scale across diverse biomes.',
        },
        {
            icon: Cpu,
            title: 'Computer Vision',
            subtitle: 'Deep Learning',
            description: 'Applying state-of-the-art CNNs and Vision Transformers to automate species mapping and enable near real-time monitoring.',
        },
        {
            icon: Leaf,
            title: 'Conservation AI',
            subtitle: 'Ecological Modeling',
            description: 'Developing predictive models to help conservationists make data-driven decisions for reforestation and ecosystem health.',
        },
    ];

    return (
        <div className="home-page overflow-x-hidden">
            <div className="grain-overlay" />

            {/* Hero Section */}
            <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pb-24">
                {/* ... existing background code ... */}
                <div
                    ref={imageRef}
                    className="absolute inset-0 w-full h-full"
                    style={{ willChange: 'transform' }}
                >
                    <img
                        src="/assets/kimi/hero-bg.jpg"
                        alt="Aerial view of forest and river"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-green-dark/60 via-green-dark/40 to-green-dark/70" />
                    <div className="absolute inset-0 bg-gradient-to-r from-green-dark/50 to-transparent" />
                </div>

                <canvas ref={canvasRef} className="particle-canvas" />

                <div className="container-custom relative z-20 hero-content text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8">
                        <span className="w-2 h-2 rounded-full bg-green-accent animate-pulse" />
                        <span className="text-white/90 text-sm font-bold uppercase tracking-widest">Ecology x AI</span>
                    </div>

                    <h1 ref={titleRef} className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-bold mb-8 leading-tight">
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

                    <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
                        Bridging the gap between ecological conservation and cutting-edge machine learning to protect our planet's future.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link to="/research" className="hero-cta btn-primary group flex items-center gap-2 text-lg px-10">
                            Explore Research
                            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </Link>
                        <a href="#contact" className="hero-cta btn-secondary text-lg px-10">
                            Get In Touch
                        </a>
                    </div>
                </div>

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 animate-bounce">
                    <a href="#about" className="text-white/40 hover:text-white transition-colors flex flex-col items-center gap-2">
                        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
                        <ChevronDown className="w-6 h-6" />
                    </a>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="relative py-24 md:py-32 bg-white overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-green-light/30 to-transparent" />

                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">
                        {/* Content */}
                        <div className="order-2 lg:order-1">
                            <div className="reveal-up flex items-center gap-3 mb-6">
                                <div className="w-12 h-px bg-green-primary" />
                                <span className="text-green-primary text-sm font-medium uppercase tracking-wider">
                                    About Me
                                </span>
                            </div>

                            <div className="relative mb-8 reveal-up">
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-green-dark">
                                    My Mission
                                </h2>
                                <svg className="absolute -bottom-2 left-0 w-48 h-3" viewBox="0 0 200 12" fill="none">
                                    <path
                                        d="M2 8C50 2 150 2 198 8"
                                        stroke="#4caf50"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        fill="none"
                                        className="underline-path"
                                    />
                                </svg>
                            </div>

                            <h3 className="reveal-up text-xl sm:text-2xl text-green-primary font-medium mb-6">
                                Scaling Conservation through Technology
                            </h3>

                            <div className="space-y-4 text-gray-600 leading-relaxed mb-10">
                                <p className="reveal-up text-xl">
                                    I am an Ecologist and AI Researcher specializing in the application of Machine Learning to Earth Observation data. Currently a Post-doctoral Fellow at Stellenbosch University, my work focuses on developing operational environmental monitoring systems and advancing uncertainty quantification using techniques like Conformal Prediction.
                                </p>
                                <p className="reveal-up text-xl">
                                    With nearly 10 years of experience, I bridge academia and industry to estimate forest metrics, monitor species, and quantify ecosystem health at scale.
                                </p>
                            </div>

                            {/* Stats grid */}
                            <div className="reveal-up grid grid-cols-2 gap-4">
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
                                ref={aboutImageRef}
                                className="relative rounded-2xl overflow-hidden shadow-soft-lg"
                            >
                                <div className="img-zoom">
                                    <img
                                        src="/assets/profile.jpg"
                                        alt="Geethen Singh"
                                        className="w-full h-[500px] lg:h-[600px] object-cover object-right"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-green-dark/40 to-transparent" />

                                {/* Floating badge */}
                                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/90 backdrop-blur-sm shadow-soft">
                                    <p className="text-sm text-gray-600">Ecologist & AI Researcher</p>
                                    <p className="text-lg font-serif font-semibold text-green-primary">
                                        Bridging nature and technology
                                    </p>
                                </div>
                            </div>
                            <div className="absolute -top-10 -left-10 w-40 h-40 bg-green-light rounded-full -z-10 animate-pulse-slow" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Expertise Section */}
            <section className="relative py-24 md:py-32 bg-gradient-to-b from-white via-green-light/20 to-white overflow-hidden">
                <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-green-accent/5 blur-3xl" />
                <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-green-primary/5 blur-3xl" />

                <div className="container-custom">
                    <div className="text-center mb-20 reveal-up">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <div className="w-8 h-px bg-green-primary" />
                            <span className="text-green-primary text-sm font-medium uppercase tracking-wider">
                                What I Do
                            </span>
                            <div className="w-8 h-px bg-green-primary" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-green-dark mb-4">Expertise</h2>
                        <p className="text-gray-600 text-lg">
                            Core research areas where ecology meets artificial intelligence
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto" style={{ perspective: '1000px' }}>
                        {expertiseAreas.map((area, index) => (
                            <ExpertiseCard
                                key={index}
                                icon={area.icon}
                                title={area.title}
                                subtitle={area.subtitle}
                                description={area.description}
                                index={index}
                                isHighlighted={index === 2}
                            />
                        ))}
                    </div>

                    <div className="text-center mt-16 reveal-up">
                        <Link
                            to="/research"
                            className="inline-flex items-center gap-2 text-green-primary font-medium hover:gap-3 transition-all duration-300"
                        >
                            View all research
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Latest Publications */}
            <section className="py-24 md:py-32 bg-white">
                <div className="container-custom">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 reveal-up">
                        <div>
                            <span className="tag">Research</span>
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-green-dark">Recent Contributions</h2>
                        </div>
                        <a
                            href="https://scholar.google.com/citations?user=J4rtU2kAAAAJ&hl=en"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-primary font-bold inline-flex items-center gap-2 mt-4 md:mt-0 hover:gap-4 transition-all"
                        >
                            View Google Scholar <ExternalLink className="w-5 h-5" />
                        </a>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        <div className="group bg-white border border-gray-100 p-8 rounded-3xl hover:bg-green-primary transition-all duration-500 reveal-up card-lift">
                            <div className="flex justify-between items-start mb-6">
                                <span className="bg-green-light text-green-primary text-xs font-bold px-3 py-1 rounded-full group-hover:bg-white/20 group-hover:text-white transition-colors">Journal Paper</span>
                                <span className="text-gray-400 font-bold group-hover:text-white/50 transition-colors">2024</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-green-dark group-hover:text-white transition-colors">Uncertainty quantification for probabilistic machine learning in earth observation</h3>
                            <p className="text-gray-500 group-hover:text-white/70 transition-colors line-clamp-2">
                                Machine learning is increasingly applied to Earth Observation data. This work advances uncertainty quantification using Conformal Prediction.
                            </p>
                        </div>

                        <div className="group bg-white border border-gray-100 p-8 rounded-3xl hover:bg-green-primary transition-all duration-500 reveal-up card-lift">
                            <div className="flex justify-between items-start mb-6">
                                <span className="bg-green-light text-green-primary text-xs font-bold px-3 py-1 rounded-full group-hover:bg-white/20 group-hover:text-white transition-colors">Journal Paper</span>
                                <span className="text-gray-400 font-bold group-hover:text-white/50 transition-colors">2022</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-green-dark group-hover:text-white transition-colors">Global 10m land use land cover datasets: Dynamic World, World Cover and ESRI</h3>
                            <p className="text-gray-500 group-hover:text-white/70 transition-colors line-clamp-2">
                                A comparative study of global LULC mapping with unprecedented detail at 10m resolution using Sentinel satellites.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact CTA Section */}
            <section
                id="contact"
                className="relative py-32 lg:py-40 overflow-hidden"
                onMouseMove={handleContactMouseMove}
            >
                <canvas ref={contactCanvasRef} className="absolute inset-0 w-full h-full" />

                <div className="relative z-10 container-custom">
                    <div className="max-w-3xl mx-auto text-center">
                        {/* Sparkle decoration */}
                        <div className="flex justify-center mb-6 reveal-up">
                            <div className="relative">
                                <Sparkles className="w-8 h-8 text-green-accent animate-pulse" />
                                <div className="absolute inset-0 w-8 h-8 bg-green-accent/30 blur-xl" />
                            </div>
                        </div>

                        {/* Badge */}
                        <div className="reveal-up inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
                            <MessageCircle className="w-4 h-4 text-green-accent" />
                            <span className="text-white/90 text-sm font-medium">
                                Open for Collaboration
                            </span>
                        </div>

                        <h2 className="reveal-up text-4xl md:text-6xl font-serif font-bold text-white mb-8">Let's Work Together</h2>
                        <p className="reveal-up text-xl text-white/70 mb-12 leading-relaxed">
                            Whether you're interested in research collaboration, speaking engagements, or just want to chat about AI and Ecology, I'd love to hear from you.
                        </p>

                        <div className="reveal-up flex flex-col sm:flex-row items-center justify-center gap-6">
                            <a
                                href="mailto:geethen.singh@gmail.com"
                                className="magnetic-btn bg-white text-green-primary px-10 py-5 rounded-full font-bold text-lg hover:shadow-glow transition-all flex items-center gap-3 group"
                            >
                                <Mail className="w-5 h-5" />
                                Send an Email
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/geethen-singh-a06660106/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="magnetic-btn bg-transparent text-white border-2 border-white/50 px-10 py-5 rounded-full font-bold text-lg hover:bg-white/10 hover:border-white transition-all flex items-center gap-3 group"
                            >
                                <Linkedin className="w-5 h-5" />
                                LinkedIn Profile
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </a>
                        </div>

                        <div className="reveal-up mt-16 pt-8 border-t border-white/10">
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
        </div>
    );
};

export default Home;
