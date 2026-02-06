import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogs } from '../content/data';
import { ArrowRight, Calendar, Tag } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Blog = () => {
    useEffect(() => {
        // Clear any existing triggers to prevent duplicates on navigation
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
    }, []);

    return (
        <div className="blog-page pt-32 pb-24 bg-white min-h-screen">
            <div className="container-custom">
                <header className="mb-20 reveal-up text-center max-w-3xl mx-auto">
                    <span className="tag">Notebook</span>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-green-dark mb-6">Thoughts & Insights</h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Explorations into the latest developments in AI for ecology,
                        methodological breakdowns, and conservation tech stories.
                    </p>
                </header>

                <div className="max-w-4xl mx-auto space-y-12">
                    {blogs.map((post) => (
                        <div
                            key={post.id}
                            className="reveal-up group"
                        >
                            <Link to={`/blog/${post.id}`} className="block">
                                <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 md:p-12 shadow-soft hover:shadow-soft-lg transition-all duration-500 card-hover flex flex-col md:flex-row gap-10">
                                    <div className="md:w-2/3">
                                        <div className="flex items-center gap-4 mb-6 text-gray-400 font-medium">
                                            <div className="flex items-center gap-1.5 bg-green-light px-3 py-1 rounded-full text-green-primary text-xs font-bold uppercase tracking-widest">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {post.date}
                                            </div>
                                            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest">
                                                <Tag className="w-3.5 h-3.5" />
                                                {post.tags[0]}
                                            </div>
                                        </div>

                                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-green-dark group-hover:text-green-primary transition-colors leading-tight">
                                            {post.title}
                                        </h2>

                                        <p className="text-lg text-gray-500 mb-8 leading-relaxed line-clamp-3">
                                            {post.summary}
                                        </p>

                                        <div className="inline-flex items-center gap-2 text-green-primary font-bold text-lg group-hover:gap-4 transition-all">
                                            Read Full Article <ArrowRight className="w-5 h-5" />
                                        </div>
                                    </div>

                                    <div className="md:w-1/3 h-64 md:h-auto rounded-3xl overflow-hidden shadow-inner bg-green-light/20 flex items-center justify-center">
                                        <div className="text-6xl group-hover:scale-110 transition-transform duration-700">🌿</div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blog;
