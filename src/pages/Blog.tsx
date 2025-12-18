import React from 'react';
import { Link } from 'react-router-dom';
import { blogs } from '../content/data';

const Blog = () => {
    return (
        <div className="blog-page">
            <section>
                <div className="container">
                    <h2 style={{ marginBottom: '3rem' }}>Blog & Insights</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {blogs.map((post) => (
                            <div key={post.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div className="pub-year">{post.date}</div>
                                <h3>{post.title}</h3>
                                <p className="summary">{post.summary}</p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        {post.tags.map(tag => (
                                            <span key={tag} className="tag" style={{ marginBottom: 0 }}>{tag}</span>
                                        ))}
                                    </div>
                                    <Link to={`/blog/${post.id}`} className="btn btn-primary">Read More</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Blog;
