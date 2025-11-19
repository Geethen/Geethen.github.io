import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { PROFILE } from '../constants';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path ? "text-emerald-700 font-semibold" : "text-gray-600 hover:text-emerald-600";

  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-40 border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <span className="font-serif text-xl font-bold text-emerald-900">{PROFILE.name}</span>
              </Link>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8 sm:items-center">
              <Link to="/" className={isActive('/')}>Home</Link>
              <Link to="/research" className={isActive('/research')}>Research</Link>
              <Link to="/blog" className={isActive('/blog')}>Blog</Link>
              <a href={`mailto:${PROFILE.email}`} className="px-4 py-2 rounded-md bg-emerald-700 text-white hover:bg-emerald-800 transition-colors">
                Contact
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center sm:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="sm:hidden bg-white border-t border-gray-200">
            <div className="pt-2 pb-3 space-y-1">
              <Link 
                to="/" 
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-emerald-500 hover:text-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/research" 
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-emerald-500 hover:text-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Research
              </Link>
              <Link 
                to="/blog" 
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-emerald-500 hover:text-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} {PROFILE.name}.
            </div>
            <div className="flex space-x-6">
              {PROFILE.socials.github && (
                <a href={PROFILE.socials.github} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-emerald-800">
                  <span className="sr-only">GitHub</span>
                  <Github size={20} />
                </a>
              )}
              {PROFILE.socials.twitter && (
                <a href={PROFILE.socials.twitter} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-emerald-500">
                  <span className="sr-only">Twitter</span>
                  <Twitter size={20} />
                </a>
              )}
              {PROFILE.socials.linkedin && (
                <a href={PROFILE.socials.linkedin} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-emerald-700">
                  <span className="sr-only">LinkedIn</span>
                  <Linkedin size={20} />
                </a>
              )}
              <a href={`mailto:${PROFILE.email}`} className="text-gray-400 hover:text-emerald-600">
                <span className="sr-only">Email</span>
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};