import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { papers } from '../content/data';

const ResearchPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [content, setContent] = useState<string>('');
    const [loading, setLoading] = useState(true);

    const paper = papers.find(p => p.id === id);

    useEffect(() => {
        if (!paper) {
            navigate('/research');
            return;
        }

        fetch(paper.file)
            .then(res => res.text())
            .then(text => {
                setContent(text);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error loading paper content:", err);
                setLoading(false);
            });
    }, [id, paper, navigate]);

    if (!paper) return null;

    return (
        <div className="research-post-page">
            <section>
                <div className="container">
                    <button
                        onClick={() => navigate('/research')}
                        className="btn btn-outline"
                        style={{ marginBottom: '2rem' }}
                    >
                        &larr; Back to Research
                    </button>

                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) 1fr', gap: '4rem' }}>
                            <article className="prose">
                                <div className="pub-year">{paper.date} | {paper.journal}</div>
                                <h1 style={{ marginBottom: '1.5rem' }}>{paper.title}</h1>
                                <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1.1rem' }}>{paper.authors}</p>

                                <ReactMarkdown>{content}</ReactMarkdown>

                                {paper.link && (
                                    <div style={{ marginTop: '4rem' }}>
                                        <a href={paper.link} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                                            Read Full Paper on Publisher Site
                                        </a>
                                    </div>
                                )}
                            </article>

                            <aside>
                                {(paper.audio || paper.highlights) && (
                                    <div style={{
                                        position: 'sticky',
                                        top: '100px',
                                        background: 'var(--bg-offset)',
                                        padding: '2rem',
                                        borderRadius: '2rem',
                                        border: '1px solid var(--accent-soft)',
                                        boxShadow: 'var(--shadow)'
                                    }}>
                                        <div className="tag" style={{ background: 'var(--primary)', color: 'white', fontSize: '0.7rem' }}>AI RESEARCH ASSISTANT</div>

                                        {paper.audio && (
                                            <div style={{ marginBottom: '2.5rem' }}>
                                                <h4 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                    <span>🎧</span> Deep Dive Audio
                                                </h4>
                                                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                                                    Listen to a 2-minute AI-generated briefing on this research.
                                                </p>
                                                <audio controls style={{ width: '100%', height: '40px' }}>
                                                    <source src={paper.audio} type="audio/mpeg" />
                                                    Your browser does not support the audio element.
                                                </audio>
                                            </div>
                                        )}

                                        {paper.highlights && (
                                            <div>
                                                <h4 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                    <span>✨</span> Key Takeaways
                                                </h4>
                                                <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                                    {paper.highlights.map((h, i) => (
                                                        <li key={i} style={{ fontSize: '0.9rem', display: 'flex', gap: '0.8rem' }}>
                                                            <span style={{ color: 'var(--accent)' }}>•</span>
                                                            {h}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        <div style={{ marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
                                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                                                Summaries and audio generated using Gemini & NotebookLM to make environmental data more accessible.
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </aside>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default ResearchPost;
