import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer style={{ padding: '4rem 0', background: 'var(--primary)', color: 'white' }}>
            <div className="container">
                <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '4rem', textAlign: 'left', marginBottom: '4rem' }}>
                    <div>
                        <h3 style={{ color: 'white', marginBottom: '1.5rem' }}>Geethen</h3>
                        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
                            Ecologist & AI Researcher dedicated to protecting our planet through technology.
                        </p>
                    </div>
                    <div>
                        <h4 style={{ color: 'white', marginBottom: '1.5rem', fontFamily: 'Inter' }}>Explore</h4>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            <li><Link to="/" style={{ color: 'rgba(255,255,255,0.7)' }}>Home</Link></li>
                            <li><Link to="/research" style={{ color: 'rgba(255,255,255,0.7)' }}>Research</Link></li>
                            <li><Link to="/blog" style={{ color: 'rgba(255,255,255,0.7)' }}>Blog</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 style={{ color: 'white', marginBottom: '1.5rem', fontFamily: 'Inter' }}>Connect</h4>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            <li><a href="https://scholar.google.com/citations?user=J4rtU2kAAAAJ&hl=en" style={{ color: 'rgba(255,255,255,0.7)' }}>Google Scholar</a></li>
                            <li><a href="https://www.linkedin.com/in/geethen-singh-a06660106/" style={{ color: 'rgba(255,255,255,0.7)' }}>LinkedIn</a></li>
                            <li><a href="https://github.com" style={{ color: 'rgba(255,255,255,0.7)' }}>GitHub</a></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)' }}>&copy; {new Date().getFullYear()} Geethen. All rights reserved.</p>
                    <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)' }}>Built with passion for the Earth 🌍</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
