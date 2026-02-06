import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { papers } from '../content/data';
import { Copy, Check, ArrowLeft, Headphones, Sparkles, AlertCircle } from 'lucide-react';
import { gsap } from 'gsap';

const ResearchPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [content, setContent] = useState<string>('');
    const [loading, setLoading] = useState(true);

    const paper = papers.find(p => p.id === id);

    useEffect(() => {
        if (!loading) {
            // Small delay to ensure DOM is updated
            const timer = setTimeout(() => {
                gsap.fromTo('.reveal-up',
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
                );
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [loading]);

    useEffect(() => {
        if (!paper) {
            navigate('/research');
            return;
        }

        // Ensure correct path handling
        const contentPath = paper.file.startsWith('/') ? paper.file : `/${paper.file}`;

        fetch(contentPath)
            .then(res => {
                if (!res.ok) throw new Error(`Failed to load content: ${res.statusText}`);
                return res.text();
            })
            .then(text => {
                setContent(text);
                setLoading(false);
            })
            .catch(err => {
                console.error("ResearchPost: Error loading paper content:", err);
                setLoading(false);
            });
    }, [id, paper, navigate]);

    const CodeBlock = ({ node, inline, className, children, ...props }: any) => {
        const match = /language-(\w+)/.exec(className || '');
        const codeString = String(children).replace(/\n$/, '');
        const [copied, setCopied] = useState(false);

        const handleCopy = () => {
            navigator.clipboard.writeText(codeString);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        };

        if (inline) {
            return <code className="bg-gray-100 px-1.5 py-0.5 rounded text-green-dark font-mono text-sm" {...props}>{children}</code>;
        }

        return (
            <div className="relative my-8 group">
                <div className="absolute right-4 top-4 z-10">
                    <button
                        onClick={handleCopy}
                        className="p-2 bg-gray-800/80 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-all backdrop-blur-sm border border-gray-700 shadow-lg"
                        title="Copy code"
                    >
                        {copied ? <Check size={16} className="text-green-accent" /> : <Copy size={16} />}
                    </button>
                </div>
                <div className="overflow-hidden rounded-xl border border-gray-800 shadow-2xl">
                    <SyntaxHighlighter
                        style={vscDarkPlus}
                        language={match ? match[1] : 'text'}
                        PreTag="div"
                        customStyle={{
                            margin: 0,
                            padding: '1.5em',
                            fontSize: '0.9rem',
                            lineHeight: '1.5',
                            backgroundColor: '#1a1b26'
                        }}
                        {...props}
                    >
                        {codeString}
                    </SyntaxHighlighter>
                </div>
            </div>
        );
    };

    // Calculate read time
    const readTime = content ? Math.ceil(content.split(/\s+/).length / 200) : 10;

    return (
        <div className="research-post-page pt-32 pb-24 min-h-screen bg-white">
            <div className="container-custom max-w-[680px] mx-auto px-4 md:px-0">
                <button
                    onClick={() => navigate('/research')}
                    className="group mb-8 flex items-center gap-2 text-gray-500 hover:text-green-primary transition-colors reveal-up"
                >
                    <ArrowLeft size={20} /> <span className="text-sm font-medium">Back to Research</span>
                </button>

                {loading ? (
                    <div className="py-32 text-center reveal-up">
                        <div className="w-16 h-16 border-4 border-gray-100 border-t-green-primary rounded-full animate-spin mx-auto mb-6" />
                        <p className="text-gray-500 font-medium font-serif italic text-lg">Analyzing paper...</p>
                    </div>
                ) : (content === '' || content.startsWith('Error')) ? (
                    <div className="py-32 text-center reveal-up">
                        <p className="text-xl text-red-500 font-medium">Failed to load content.</p>
                    </div>
                ) : (
                    <article className="reveal-up">
                        <header className="mb-12">
                            <h1 className="text-4xl md:text-[48px] font-sans font-extrabold text-green-primary mb-6 leading-[1.1] tracking-tight">
                                {paper.title}
                            </h1>
                            <p className="text-xl text-[#757575] font-serif mb-8 leading-relaxed italic">
                                {paper.authors}
                            </p>

                            <div className="flex items-center gap-4 mb-8 border-b border-gray-100 pb-8">
                                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center text-green-primary bg-green-light">
                                    <Sparkles size={20} />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-sans font-medium text-[#292929]">{paper.journal}</span>
                                        <span className="text-xs px-2 py-0.5 bg-green-light text-green-primary rounded-full font-medium">Published</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[14px] text-[#757575] font-sans">
                                        <span>{readTime} min read</span>
                                        <span>·</span>
                                        <span>{paper.date}</span>
                                    </div>
                                </div>
                            </div>
                        </header>

                        {/* AI Summary/Audio Section - Integrated inline */}
                        {(paper.audio || paper.highlights) && (
                            <div className="bg-gray-50 rounded-2xl p-8 mb-12 border border-gray-100">
                                <div className="flex items-center gap-2 mb-6">
                                    <Sparkles className="w-5 h-5 text-green-primary" />
                                    <h3 className="font-sans font-bold text-lg">AI Research Assistant</h3>
                                </div>

                                {paper.audio && (
                                    <div className="mb-8">
                                        <h4 className="text-sm font-bold uppercase tracking-widest text-[#757575] mb-3 font-sans">Deep Dive Audio</h4>
                                        <audio controls className="w-full h-10">
                                            <source src={paper.audio} type="audio/mpeg" />
                                            Your browser does not support audio.
                                        </audio>
                                    </div>
                                )}

                                {paper.highlights && (
                                    <div>
                                        <h4 className="text-sm font-bold uppercase tracking-widest text-[#757575] mb-3 font-sans">Key Takeaways</h4>
                                        <ul className="space-y-3">
                                            {paper.highlights.map((h, i) => (
                                                <li key={i} className="flex gap-3 text-[#292929] font-serif">
                                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-primary shrink-0" />
                                                    {h}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="prose prose-lg max-w-none 
                            prose-headings:font-sans prose-headings:font-extrabold prose-headings:text-green-primary prose-headings:tracking-tight
                            prose-h1:text-4xl md:prose-h1:text-[48px] prose-h1:mb-10
                            prose-h2:text-3xl md:prose-h2:text-[36px] prose-h2:mt-[2.5em] prose-h2:mb-[0.8em] prose-h2:leading-[1.1]
                            prose-h3:text-2xl md:prose-h3:text-[28px] prose-h3:mt-[1.8em] prose-h3:mb-[0.5em] prose-h3:leading-[1.2]
                            prose-p:font-serif prose-p:text-[18px] md:prose-p:text-[21px] prose-p:leading-[1.6] md:prose-p:leading-[1.8] prose-p:text-[#292929] prose-p:mb-8
                            prose-a:text-green-primary prose-a:no-underline hover:prose-a:underline
                            prose-strong:font-bold prose-strong:text-[#292929]
                            prose-img:rounded-sm prose-img:mx-auto prose-img:my-10
                            prose-code:text-[14px] prose-code:bg-gray-100 prose-code:text-gray-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-sm prose-code:font-normal prose-code:before:content-none prose-code:after:content-none
                            prose-blockquote:border-l-[3px] prose-blockquote:border-green-primary prose-blockquote:pl-6 prose-blockquote:font-serif prose-blockquote:italic prose-blockquote:text-[22px] md:prose-blockquote:text-[24px] prose-blockquote:leading-[1.4] prose-blockquote:text-[#757575] prose-blockquote:not-italic
                        ">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeRaw]}
                                components={{
                                    code: CodeBlock,
                                    h1: ({ node, ...props }) => <h1 className="font-sans font-extrabold text-green-primary tracking-tight text-4xl md:text-[48px] mb-12" {...props} />,
                                    h2: ({ node, ...props }) => <h2 className="font-sans font-extrabold text-green-primary tracking-tight text-3xl md:text-[36px] mt-[2.5em] mb-[0.8em] leading-[1.1]" {...props} />,
                                    h3: ({ node, ...props }) => <h3 className="font-sans font-extrabold text-green-primary tracking-tight text-2xl md:text-[28px] mt-[1.8em] mb-[0.5em] leading-[1.2]" {...props} />
                                }}
                            >
                                {content}
                            </ReactMarkdown>
                        </div>

                        {paper.link && (
                            <div className="mt-16 pt-12 border-t border-gray-100 text-center">
                                <h3 className="font-sans font-bold text-2xl mb-4 text-[#292929]">Read the full paper</h3>
                                <p className="text-[#757575] font-serif mb-8 text-lg">Access the original publication for complete details and data.</p>
                                <a href={paper.link} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2">
                                    View on Publisher Site <ArrowLeft className="w-4 h-4 rotate-180" />
                                </a>
                            </div>
                        )}
                    </article>
                )}
            </div>
        </div>
    );
};

export default ResearchPost;
