import React from 'react';
import { Link } from 'react-router-dom';
import { papers } from '../content/data';

const Research = () => {
    return (
        <div className="research-page">
            <section>
                <div className="container">
                    <h2 style={{ marginBottom: '3rem' }}>Research Publications</h2>
                    <div className="grid">
                        {papers.map((paper) => (
                            <div key={paper.id} className="card">
                                <div className="pub-year">{paper.date}</div>
                                <h3 className="pub-title">{paper.title}</h3>
                                <p className="pub-authors">{paper.authors}</p>
                                <p style={{ fontStyle: 'italic', marginBottom: '1rem', color: 'var(--text-muted)' }}>{paper.journal}</p>
                                <div className="tags" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                                    {paper.tags.map(tag => (
                                        <span key={tag} className="tag" style={{ marginBottom: 0 }}>{tag}</span>
                                    ))}
                                </div>
                                <div className="pub-links" style={{ display: 'flex', gap: '0.5rem' }}>
                                    <Link to={`/research/${paper.id}`} className="btn btn-outline">Overview</Link>
                                    {paper.link && <a href={paper.link} className="btn btn-primary" target="_blank" rel="noopener noreferrer">Paper</a>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Research;
