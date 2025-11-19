import React, { useEffect, useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import Markdown from 'react-markdown';
import { ArrowLeft, Calendar, Loader2, AlertCircle } from 'lucide-react';
import { BLOG_POSTS } from '../constants';

export const BlogPostViewer: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find(p => p.slug === slug);
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch content
  useEffect(() => {
    if (!post) return;

    const fetchContent = async () => {
      setLoading(true);
      setError(null);
      
      try {
        if (post.content) {
          // If content is inline, use it
          setContent(post.content);
        } else if (post.contentUrl) {
          // If content is a URL, fetch it. 
          // Note: We don't add a leading slash in fetch to ensure it respects the relative base path.
          // This is critical for GitHub Pages deployment.
          const response = await fetch(post.contentUrl);
          if (!response.ok) {
            // Fallback: Try adding the prefix manually if the relative fetch fails
            // This helps if the user is on a nested route in some setups
            const fallbackResponse = await fetch(`/${post.contentUrl}`);
            if (!fallbackResponse.ok) {
                 throw new Error(`Failed to load post content: ${response.statusText}`);
            }
            const text = await fallbackResponse.text();
            setContent(text);
            return;
          }
          const text = await response.text();
          setContent(text);
        } else {
            setContent("No content available for this post.");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load blog post content. Please check your internet connection or try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [post]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <article className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
            <Link to="/blog" className="inline-flex items-center text-sm text-gray-500 hover:text-emerald-600 mb-6">
                <ArrowLeft size={16} className="mr-1" /> Back to Blog
            </Link>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 font-serif mb-4 leading-tight">
                {post.title}
            </h1>
            
            <div className="flex items-center gap-4 text-gray-500 text-sm border-b border-gray-200 pb-6">
                <span className="flex items-center gap-1">
                    <Calendar size={16} />
                    {post.date}
                </span>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <div className="flex gap-2">
                    {post.tags.map(tag => (
                        <span key={tag} className="text-gray-600 font-medium">#{tag}</span>
                    ))}
                </div>
            </div>
        </div>

        {/* Content Area */}
        {loading ? (
            <div className="flex justify-center py-20">
                <Loader2 className="animate-spin text-emerald-600" size={48} />
            </div>
        ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg flex items-center gap-2">
                <AlertCircle size={20} />
                {error}
            </div>
        ) : (
            <div className="prose prose-emerald max-w-none">
                <Markdown>{content}</Markdown>
            </div>
        )}

        {/* Footer / Author */}
        <div className="mt-16 pt-8 border-t border-gray-200">
            <p className="text-center text-gray-500 italic">
                Thanks for reading. If you found this useful, feel free to cite it or share it.
            </p>
        </div>
    </article>
  );
};
