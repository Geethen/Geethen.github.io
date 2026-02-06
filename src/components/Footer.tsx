import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Github, Linkedin, BookOpen, ArrowUpRight, Heart } from 'lucide-react';

const Footer = () => {
    const socialLinks = [
        { name: 'Google Scholar', href: 'https://scholar.google.com/citations?user=J4rtU2kAAAAJ&hl=en', icon: BookOpen },
        { name: 'LinkedIn', href: 'https://www.linkedin.com/in/geethen-singh-a06660106/', icon: Linkedin },
        { name: 'GitHub', href: 'https://github.com/geethen', icon: Github },
    ];

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Research', path: '/research' },
        { name: 'Blog', path: '/blog' },
    ];

    return (
        <footer className="relative bg-green-dark text-white overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                    backgroundSize: '40px 40px',
                }} />
            </div>

            <div className="relative z-10 w-full px-8 py-20 lg:py-24 max-w-[1400px] mx-auto">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <Leaf className="w-8 h-8 text-green-accent" />
                            <span className="font-serif text-3xl font-bold">Geethen</span>
                        </div>
                        <p className="text-white/70 max-w-md mb-8 leading-relaxed text-lg">
                            Ecologist & AI Researcher dedicated to protecting our planet through technology.
                            Bridging the gap between ecological conservation and cutting-edge machine learning.
                        </p>

                        {/* Social links */}
                        <div className="flex items-center gap-4">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-green-accent transition-all duration-300 group"
                                    aria-label={link.name}
                                >
                                    <link.icon className="w-6 h-6 text-white/70 group-hover:text-white transition-colors" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-widest text-green-accent mb-6">
                            Explore
                        </h3>
                        <ul className="space-y-4">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        className="group inline-flex items-center gap-1 text-white/70 hover:text-white transition-colors duration-300 text-lg"
                                    >
                                        <span className="relative">
                                            {link.name}
                                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-green-accent group-hover:w-full transition-all duration-300" />
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-widest text-green-accent mb-6">
                            Connect
                        </h3>
                        <ul className="space-y-4">
                            {socialLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-300 text-lg"
                                    >
                                        <link.icon className="w-5 h-5" />
                                        <span className="relative">
                                            {link.name}
                                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-green-accent group-hover:w-full transition-all duration-300" />
                                        </span>
                                        <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="pt-10 border-t border-white/10">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                        <p className="text-white/50 text-base">
                            © {new Date().getFullYear()} Geethen. All rights reserved.
                        </p>
                        <p className="text-white/50 text-base flex items-center gap-2">
                            Built with <Heart className="w-5 h-5 text-red-400 fill-red-400" /> for the Earth
                        </p>
                    </div>
                </div>
            </div>

            {/* Large background text */}
            <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none select-none">
                <p className="text-[20vw] font-serif font-bold text-white/[0.03] leading-none text-center translate-y-1/3">
                    GEETHEN
                </p>
            </div>
        </footer>
    );
};

export default Footer;
