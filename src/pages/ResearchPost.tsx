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
                        <article className="prose">
                            <div className="pub-year">{paper.date} | {paper.journal}</div>
                            <h1 style={{ marginBottom: '1rem' }}>{paper.title}</h1>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>{paper.authors}</p>
                            <ReactMarkdown>{content}</ReactMarkdown>
                            {paper.link && (
                                <div style={{ marginTop: '3rem' }}>
                                    <a href={paper.link} className="btn btn-primary">Download Full Paper</a>
                                </div>
                            )}
                        </article>
                    )}
                </div>
            </section>
        </div>
    );
};

export default ResearchPost;
