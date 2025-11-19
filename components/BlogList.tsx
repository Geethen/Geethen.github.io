import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';
import { BLOG_POSTS } from '../constants';

export const BlogList: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 font-serif mb-4">Research Blog</h1>
        <p className="text-lg text-gray-600">Notes on remote sensing, ML, and fieldwork.</p>
      </div>

      <div className="grid gap-12">
        {BLOG_POSTS.map(post => (
          <article key={post.id} className="flex flex-col md:flex-row gap-8 items-start">
            {/* Image */}
            <div className="w-full md:w-1/3 flex-shrink-0">
              <Link to={`/blog/${post.slug}`} className="block overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <img 
                  src={post.coverImage} 
                  alt={post.title} 
                  className="w-full h-48 md:h-48 object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </Link>
            </div>

            {/* Content */}
            <div className="flex-grow space-y-3">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  Read
                </span>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 hover:text-emerald-700 transition-colors">
                <Link to={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              
              <p className="text-gray-600 leading-relaxed">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between pt-2">
                <div className="flex gap-2">
                    {post.tags.map(tag => (
                        <span key={tag} className="text-xs font-medium px-2 py-1 bg-stone-100 text-stone-600 rounded-full">
                            {tag}
                        </span>
                    ))}
                </div>
                <Link to={`/blog/${post.slug}`} className="text-emerald-700 font-medium hover:underline">
                  Read more
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};