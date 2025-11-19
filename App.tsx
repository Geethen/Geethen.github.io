import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { PAPERS, BLOG_POSTS, PROFILE } from './constants';
import { Paper, BlogPost } from './types';

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <header className="flex justify-between items-center mb-12 pb-6 border-b border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900">{PROFILE.name}</h1>
        <nav className="flex gap-6">
          <a href="#/" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Home</a>
          <a href="#/research" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Research</a>
          <a href="#/blog" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Blog</a>
        </nav>
      </header>
      {children}
      <footer className="mt-16 pt-8 border-t border-gray-200 text-sm text-gray-600 text-center">
        © {new Date().getFullYear()} {PROFILE.name}
      </footer>
    </div>
  );
};

const Hero: React.FC = () => (
  <section>
    <img src={PROFILE.avatarUrl} alt={PROFILE.name} style={{ width: 160, borderRadius: '50%' }} />
    <h2 style={{ marginTop: '1rem' }}>{PROFILE.title}</h2>
    <p style={{ maxWidth: 640 }}>{PROFILE.bio}</p>
  </section>
);

const ResearchList: React.FC = () => (
  <section>
    <h2>Research & Outputs</h2>
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {PAPERS.map((p: Paper) => (
        <li key={p.id} style={{ marginBottom: '0.75rem' }}>
          <strong>{p.title}</strong>{p.year ? ` (${p.year})` : ''}
          {p.authors && <div style={{ fontSize: '0.85rem' }}>{p.authors.join(', ')}</div>}
          {p.tags && <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>{p.tags.join(' · ')}</div>}
        </li>
      ))}
    </ul>
  </section>
);

const BlogList: React.FC = () => (
  <section>
    <h2>Blog</h2>
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {BLOG_POSTS.map((b: BlogPost) => (
        <li key={b.id} style={{ marginBottom: '1rem' }}>
          <a href={`#/blog/${b.slug}`} style={{ fontSize: '1.1rem', fontWeight: 600 }}>{b.title}</a>
          <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>{b.date}</div>
          <div style={{ fontSize: '0.85rem' }}>{b.excerpt}</div>
          <div style={{ fontSize: '0.65rem', opacity: 0.6 }}>{b.tags.join(' · ')}</div>
        </li>
      ))}
    </ul>
  </section>
);

const BlogPostViewer: React.FC = () => {
  const { slug } = useParams();
  const post = BLOG_POSTS.find(p => p.slug === slug);
  const [content, setContent] = useState<string>('');
  useEffect(() => {
    if (post?.contentUrl) {
      fetch(post.contentUrl)
        .then(r => r.text())
        .then(setContent)
        .catch(() => setContent('Could not load content.'));
    } else if (post?.content) {
      setContent(post.content);
    }
  }, [post]);
  if (!post) return <div>Post not found.</div>;
  return (
    <article>
      <h2>{post.title}</h2>
      <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>{post.date}</div>
      <div style={{ fontSize: '0.7rem', opacity: 0.6, marginBottom: '1rem' }}>{post.tags.join(' · ')}</div>
      <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>{content || 'Loading...'}</pre>
    </article>
  );
};

interface ChatMessage { id: string; text: string; sender: 'user' | 'bot'; }
const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([{ id: 'welcome', text: 'Hi! Ask me about the research or blog posts.', sender: 'bot' }]);
  const [input, setInput] = useState('');
  const send = () => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = { id: Date.now() + '', text: input, sender: 'user' };
    setMessages(m => [...m, userMsg]);
    // naive bot echo
    const botMsg: ChatMessage = { id: Date.now() + 'b', text: `You said: ${input}`, sender: 'bot' };
    setTimeout(() => setMessages(m => [...m, botMsg]), 300);
    setInput('');
  };
  return (
    <div style={{ position: 'fixed', bottom: 16, right: 16, width: 260, background: '#fff', border: '1px solid #ccc', borderRadius: 8, boxShadow: '0 2px 6px rgba(0,0,0,0.15)', padding: 8 }}>
      <div style={{ maxHeight: 180, overflowY: 'auto', fontSize: '0.75rem', marginBottom: 8 }}>
        {messages.map(msg => (
          <div key={msg.id} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
            <span style={{ display: 'inline-block', padding: '4px 6px', margin: '2px 0', background: msg.sender === 'user' ? '#007acc' : '#eee', color: msg.sender === 'user' ? '#fff' : '#000', borderRadius: 4 }}>{msg.text}</span>
          </div>
        ))}
      </div>
      <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Ask..." style={{ width: '100%', boxSizing: 'border-box', marginBottom: 4 }} />
      <button onClick={send} style={{ width: '100%' }}>Send</button>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/research" element={<ResearchList />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPostViewer />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <ChatBot />
      </Layout>
    </HashRouter>
  );
};

export default App;