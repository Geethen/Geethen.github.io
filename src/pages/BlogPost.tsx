import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { blogs } from '../content/data';
import { Copy, Check, ArrowLeft } from 'lucide-react';

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

    const CodeBlock = ({ node, inline, className, children, ...props }: any) => {
        const [copied, setCopied] = useState(false);
        const match = /language-(\w+)/.exec(className || '');
        const codeString = String(children).replace(/\n$/, '');

        const handleCopy = () => {
            navigator.clipboard.writeText(codeString);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        };

        if (inline) {
            return <code className={className} {...props}>{children}</code>;
        }

        return (
            <div className="code-container">
                <button
                    onClick={handleCopy}
                    className={`copy-button ${copied ? 'copied' : ''}`}
                    title="Copy code"
                >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                </button>
                <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={match ? match[1] : ''}
                    PreTag="div"
                    {...props}
                >
                    {codeString}
                </SyntaxHighlighter>
            </div>
        );
    };

    if (!post) return null;

    return (
        <div className="blog-post-page">
            <section style={{ padding: '6rem 0' }}>
                <div className="container" style={{ maxWidth: '900px' }}>
                    <button
                        onClick={() => navigate('/blog')}
                        className="btn btn-outline"
                        style={{ marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                        <ArrowLeft size={18} /> Back to Blog
                    </button>

                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                            <p>Loading your field notes...</p>
                        </div>
                    ) : (
                        <article className="prose">
                            <div className="pub-year">{post.date}</div>
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeRaw]}
                                components={{
                                    code: CodeBlock
                                }}
                            >
                                {content}
                            </ReactMarkdown>
                        </article>
                    )}
                </div>
            </section>
        </div>
    );
};

export default BlogPost;

