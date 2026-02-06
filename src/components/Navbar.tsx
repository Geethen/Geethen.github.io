import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Leaf } from 'lucide-react';

const Navbar = () => {
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const isActive = (path: string) => location.pathname === path;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Research', path: '/research' },
        { name: 'Blog', path: '/blog' },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                ? 'bg-white/80 backdrop-blur-lg shadow-soft py-3'
                : 'bg-transparent py-6'
            }`}>
            <div className="container-custom flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 group">
                    <Leaf className={`w-6 h-6 transition-colors duration-300 ${isScrolled || location.pathname !== '/' ? 'text-green-primary' : 'text-white'
                        } group-hover:text-green-accent`} />
                    <span className={`font-serif text-xl font-bold transition-colors duration-300 ${isScrolled || location.pathname !== '/' ? 'text-green-primary' : 'text-white'
                        }`}>
                        Geethen
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`relative text-sm font-medium transition-colors duration-300 group ${isScrolled || location.pathname !== '/'
                                    ? 'text-gray-700 hover:text-green-primary'
                                    : 'text-white/90 hover:text-white'
                                } ${isActive(link.path) ? 'text-green-primary font-bold' : ''}`}
                        >
                            {link.name}
                            <span className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-300 group-hover:w-full ${isActive(link.path) ? 'w-full' : 'w-0'
                                } ${isScrolled || location.pathname !== '/' ? 'bg-green-primary' : 'bg-white'}`} />
                        </Link>
                    ))}
                    <a
                        href="/#contact"
                        className={`inline-flex items-center px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${isScrolled || location.pathname !== '/'
                                ? 'bg-green-primary text-white hover:bg-green-dark hover:shadow-green'
                                : 'bg-white/10 text-white border border-white/30 hover:bg-white/20 backdrop-blur-sm'
                            }`}
                    >
                        Get In Touch
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 rounded-lg"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? (
                        <X className={isScrolled || location.pathname !== '/' ? 'text-gray-900' : 'text-white'} />
                    ) : (
                        <Menu className={isScrolled || location.pathname !== '/' ? 'text-gray-900' : 'text-white'} />
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-soft-lg transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-96 border-t border-gray-100' : 'max-h-0'
                }`}>
                <div className="px-8 py-6 flex flex-col gap-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-gray-700 hover:text-green-primary font-medium py-2 transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <a
                        href="/#contact"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="bg-green-primary text-white text-center py-3 rounded-full font-medium"
                    >
                        Get In Touch
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
