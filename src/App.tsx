import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Research from './pages/Research';
import ResearchPost from './pages/ResearchPost';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

function App() {
    return (
        <Router>
            <ScrollToTop />
            <div className="app-container relative">
                <div className="grain-overlay" />
                <Navbar />
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/research" element={<Research />} />
                        <Route path="/research/:id" element={<ResearchPost />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/blog/:id" element={<BlogPost />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;

