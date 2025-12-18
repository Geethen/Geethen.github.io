import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="nav">
            <div className="container nav-content">
                <Link to="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '1.2rem' }}>🌿</span> Geethen
                </Link>
                <div className="nav-links">
                    <Link to="/" className={isActive('/') ? 'active' : ''}>Home</Link>
                    <a href="/#about">About</a>
                    <Link to="/research" className={isActive('/research') ? 'active' : ''}>Research</Link>
                    <Link to="/blog" className={isActive('/blog') ? 'active' : ''}>Blog</Link>
                    <a href="/#contact" className="btn btn-primary" style={{ padding: '0.5rem 1.2rem', marginLeft: '1rem' }}>Contact</a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
