import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { blogs } from '../content/data';

const BlogPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [content, setContent] = useState<string>('');
    const [loading, setLoading] = useState(true);

    const post = blogs.find(b => b.id === id);

    useEffect(() => {
        if (!post) {
            navigate('/blog');
            return;
        }

        fetch(post.file)
            .then(res => res.text())
            .then(text => {
                setContent(text);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error loading blog post:", err);
                setLoading(false);
            });
    }, [id, post, navigate]);

    if (!post) return null;

    return (
        <div className="blog-post-page">
            <section>
                <div className="container">
                    <button
                        onClick={() => navigate('/blog')}
                        className="btn btn-outline"
                        style={{ marginBottom: '2rem', padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}
                    >
                        &larr; Back to Blog
                    </button>

                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <article className="prose">
                            <div className="pub-year">{post.date}</div>
                            <ReactMarkdown>{content}</ReactMarkdown>
                        </article>
                    )}
                </div>
            </section>
        </div>
    );
};

export default BlogPost;
