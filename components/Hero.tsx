import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, PenTool, Leaf } from 'lucide-react';
import { PROFILE, PAPERS, BLOG_POSTS } from '../constants';
import { InteractiveBackground } from './InteractiveBackground';

export const Hero: React.FC = () => {
  const latestPaper = PAPERS[0];
  const latestPost = BLOG_POSTS[0];

  return (
    <div className="relative space-y-16">
      {/* Interactive Background Container */}
      {/* We use a gradient fade at the bottom to blend into the page, but keep the top clear for the canvas */}
      <div className="absolute inset-0 -z-10 overflow-hidden rounded-3xl border border-emerald-50 bg-gradient-to-b from-transparent via-white/50 to-stone-50">
         <InteractiveBackground />
      </div>

      {/* Profile Header */}
      <section className="text-center space-y-6 py-12 md:py-24 relative z-10">
        <div className="relative inline-block">
          <img 
            src={PROFILE.avatarUrl} 
            alt={PROFILE.name} 
            className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover border-4 border-white shadow-xl mx-auto bg-white"
          />
          <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 w-8 h-8 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center animate-bounce" title="Focused on Ecology">
            <Leaf size={14} className="text-white" />
          </div>
        </div>
        
        <div className="space-y-2 backdrop-blur-sm py-2 rounded-xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 font-serif">{PROFILE.name}</h1>
          <p className="text-xl text-emerald-700 font-medium">{PROFILE.title}</p>
          <p className="text-gray-500">{PROFILE.institution}</p>
        </div>

        <p className="max-w-2xl mx-auto text-lg text-gray-700 leading-relaxed bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-white/50 shadow-sm">
          {PROFILE.bio}
        </p>

        <div className="flex justify-center gap-4 pt-4">
          <Link 
            to="/research" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-emerald-700 hover:bg-emerald-800 transition-all hover:scale-105"
          >
            View Research
          </Link>
          <Link 
            to="/blog" 
            className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-all hover:scale-105"
          >
            Read Blog
          </Link>
        </div>
      </section>

      {/* Highlights */}
      <div className="grid md:grid-cols-2 gap-8 relative z-10">
        
        {/* Latest Research */}
        <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-sm border border-emerald-100 hover:shadow-md transition-shadow hover:border-emerald-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <BookOpen size={20} className="text-emerald-600" />
              Latest Publication
            </h2>
            <Link to="/research" className="text-sm text-emerald-600 hover:underline flex items-center">
              All Papers <ArrowRight size={14} className="ml-1" />
            </Link>
          </div>
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-800">{latestPaper.title}</h3>
            <p className="text-sm text-gray-500">{latestPaper.venue} {latestPaper.year}</p>
            {latestPaper.abstract && (
                <p className="text-gray-600 text-sm line-clamp-3">{latestPaper.abstract}</p>
            )}
            <div className="flex gap-2 mt-2">
              {latestPaper.tags?.map(tag => (
                <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-800">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Latest Blog */}
        <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-sm border border-emerald-100 hover:shadow-md transition-shadow hover:border-emerald-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <PenTool size={20} className="text-teal-500" />
              Latest Thoughts
            </h2>
            <Link to="/blog" className="text-sm text-emerald-600 hover:underline flex items-center">
              All Posts <ArrowRight size={14} className="ml-1" />
            </Link>
          </div>
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-800">{latestPost.title}</h3>
            <p className="text-sm text-gray-500">{latestPost.date}</p>
            <p className="text-gray-600 text-sm line-clamp-3">{latestPost.excerpt}</p>
            <Link to={`/blog/${latestPost.slug}`} className="text-sm font-medium text-emerald-600 hover:text-emerald-500">
              Read article &rarr;
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};