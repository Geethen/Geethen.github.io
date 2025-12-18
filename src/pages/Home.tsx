import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home-page">
            <header className="hero" style={{
                backgroundImage: 'linear-gradient(rgba(27, 67, 50, 0.85), rgba(27, 67, 50, 0.7)), url("/assets/hero.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: 'white',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <span className="tag" style={{ background: 'var(--accent)', color: 'var(--primary)', boxShadow: '0 4px 15px rgba(82, 183, 136, 0.3)' }}>Ecology x AI</span>
                    <h1 style={{ color: 'white', textShadow: '0 2px 20px rgba(0,0,0,0.4)', fontSize: '5rem', maxWidth: '900px', margin: '0 auto 1.5rem' }}>Decoding Nature with Artificial Intelligence</h1>
                    <p style={{ color: 'rgba(255,255,255,0.95)', margin: '0 auto 3rem', fontSize: '1.5rem', maxWidth: '700px', fontWeight: 300, lineHeight: 1.4 }}>
                        Bridging the gap between ecological conservation and cutting-edge machine learning to protect our planet's future.
                    </p>
                    <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                        <Link to="/research" className="btn btn-primary" style={{ background: 'var(--accent)', color: 'var(--primary)', padding: '1rem 2.5rem', fontSize: '1.1rem' }}>View Research</Link>
                        <a href="#contact" className="btn btn-outline" style={{ color: 'white', borderColor: 'white', padding: '1rem 2.5rem', fontSize: '1.1rem' }}>Get In Touch</a>
                    </div>
                </div>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '150px', background: 'linear-gradient(transparent, var(--bg))' }}></div>
            </header>

            <section id="about" style={{ padding: '8rem 0' }}>
                <div className="container">
                    <div className="responsive-grid">
                        <div>
                            <span className="tag">My Mission</span>
                            <h2 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Scaling Conservation through Technology</h2>
                            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                                I am an Ecologist and AI Researcher dedicated to developing scalable solutions for environmental monitoring. My work focuses on the intersection of Remote Sensing, Computer Vision, and Conservation Biology.
                            </p>
                            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>
                                By leveraging satellite data and deep learning, I build tools that help us understand biodiversity loss, monitor invasive species, and quantify the impacts of climate change in real-time.
                            </p>
                        </div>
                        <div style={{ position: 'relative' }}>
                            <div style={{
                                width: '100%',
                                height: 'auto',
                                minHeight: '400px',
                                background: 'var(--bg-offset)',
                                borderRadius: '2.5rem',
                                overflow: 'hidden',
                                boxShadow: 'var(--shadow)',
                                border: '4px solid white'
                            }}>
                                <img src="/assets/profile.jpg" alt="Geethen" style={{ width: '100%', height: '100%', minHeight: '400px', objectFit: 'cover' }} />
                            </div>
                            <div style={{
                                position: 'absolute',
                                bottom: '-1rem',
                                right: '-1rem',
                                background: 'var(--primary)',
                                color: 'white',
                                padding: '1.5rem',
                                borderRadius: '1.5rem',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                                maxWidth: '280px',
                                zIndex: 10
                            }}>
                                <p style={{ fontWeight: 700, fontSize: '1.2rem', marginBottom: '0.2rem' }}>Ecologist & AI Researcher</p>
                                <p style={{ fontSize: '0.85rem', opacity: 0.8 }}>Bridging nature and technology with 10+ peer-reviewed publications.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="highlights" style={{ background: 'var(--bg-offset)', padding: '8rem 0' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                        <span className="tag">Expertise</span>
                        <h2 style={{ fontSize: '3rem' }}>Core Research Areas</h2>
                    </div>
                    <div className="grid">
                        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                            <div style={{ height: '250px', overflow: 'hidden' }}>
                                <img src="/assets/remote-sensing.png" alt="Remote Sensing" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div style={{ padding: '2.5rem' }}>
                                <div className="tag" style={{ marginBottom: '1rem', fontSize: '0.7rem' }}>EO Data</div>
                                <h3>Remote Sensing</h3>
                                <p>Extracting high-resolution insights from satellite and drone imagery to track environmental changes at scale across diverse biomes.</p>
                            </div>
                        </div>
                        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                            <div style={{ height: '250px', overflow: 'hidden' }}>
                                <img src="/assets/conservation.png" alt="Conservation AI" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div style={{ padding: '2.5rem' }}>
                                <div className="tag" style={{ marginBottom: '1rem', fontSize: '0.7rem' }}>Deep Learning</div>
                                <h3>Computer Vision</h3>
                                <p>Applying state-of-the-art CNNs and Vision Transformers to automate species identification and real-time habitat mapping.</p>
                            </div>
                        </div>
                        <div className="card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'var(--primary)', color: 'white' }}>
                            <div style={{ marginBottom: '2rem', fontSize: '4rem' }}>🌿</div>
                            <h3 style={{ color: 'white' }}>Conservation AI</h3>
                            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem' }}>Developing predictive models to help conservationists make data-driven decisions for reforestation, species protection, and ecosystem restoration.</p>
                            <Link to="/research" className="btn btn-outline" style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'white', marginTop: '2rem', width: 'fit-content' }}>Explore Research</Link>
                        </div>
                    </div>
                </div>
            </section>

            <section id="contact" style={{ padding: '8rem 0' }}>
                <div className="container">
                    <div style={{
                        background: 'linear-gradient(135deg, var(--primary), var(--primary-light))',
                        borderRadius: '3rem',
                        padding: '5rem',
                        color: 'white',
                        textAlign: 'center',
                        boxShadow: '0 30px 60px rgba(27, 67, 50, 0.2)'
                    }}>
                        <h2 style={{ color: 'white', fontSize: '3.5rem', marginBottom: '1.5rem' }}>Let's Work Together</h2>
                        <p style={{ fontSize: '1.4rem', color: 'rgba(255,255,255,0.9)', maxWidth: '700px', margin: '0 auto 3rem' }}>
                            Whether you're interested in research collaboration, speaking engagements, or just want to chat about AI and Ecology, I'd love to hear from you.
                        </p>
                        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <a href="mailto:contact@geethen.com" className="btn btn-primary" style={{ background: 'white', color: 'var(--primary)', padding: '1.2rem 3rem', fontSize: '1.1rem' }}>
                                Send an Email
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'white', padding: '1.2rem 3rem', fontSize: '1.1rem' }}>
                                LinkedIn Profile
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section style={{ background: 'var(--bg)', padding: '6rem 0' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <h2 style={{ marginBottom: '1rem' }}>Latest Publications</h2>
                    <p style={{ maxWidth: '600px', margin: '0 auto 3rem', color: 'var(--text-muted)' }}>
                        My research is automatically synced from my Google Scholar profile.
                    </p>
                    <a href="https://scholar.google.com/citations?user=J4rtU2kAAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                        View all on Google Scholar
                    </a>
                </div>
            </section>
        </div>
    );
};

export default Home;
