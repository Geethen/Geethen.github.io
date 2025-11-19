import React, { useState } from 'react';
import { Download, ExternalLink, Search } from 'lucide-react';
import { PAPERS } from '../constants';
import { CitationChart } from './CitationChart';

export const ResearchList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Extract all unique tags, handling undefined tags
  const allTags = Array.from(new Set(PAPERS.flatMap(p => p.tags || [])));

  // Filter papers
  const filteredPapers = PAPERS.filter(paper => {
    const searchContent = `${paper.title} ${paper.abstract || ''} ${paper.venue || ''}`.toLowerCase();
    const matchesSearch = searchContent.includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag ? paper.tags?.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* Main Content: Paper List */}
      <div className="lg:col-span-2 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-3xl font-bold text-gray-900 font-serif">Publications</h1>
            
            {/* Search Bar */}
            <div className="relative w-full sm:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={16} className="text-gray-400" />
                </div>
                <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                    placeholder="Search papers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>

        {/* Tags Filter */}
        <div className="flex flex-wrap gap-2">
            <button 
                onClick={() => setSelectedTag(null)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${!selectedTag ? 'bg-emerald-800 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
                All
            </button>
            {allTags.map(tag => (
                <button 
                    key={tag}
                    onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${tag === selectedTag ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'}`}
                >
                    {tag}
                </button>
            ))}
        </div>

        {/* Papers */}
        <div className="space-y-6">
            {filteredPapers.length > 0 ? (
                filteredPapers.map(paper => (
                    <div key={paper.id} className="bg-white p-6 rounded-lg shadow-sm border border-emerald-100 hover:border-emerald-300 transition-colors">
                        <div className="flex justify-between items-start">
                            <h2 className="text-xl font-semibold text-gray-900 leading-tight">{paper.title}</h2>
                            {paper.year && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-stone-100 text-stone-800 ml-2 flex-shrink-0">
                                    {paper.year}
                                </span>
                            )}
                        </div>
                        
                        {paper.authors && (
                            <p className="text-emerald-700 mt-1 font-medium text-sm">{paper.authors.join(", ")}</p>
                        )}
                        
                        {paper.venue && (
                            <p className="text-sm text-gray-500 italic mb-2">{paper.venue}</p>
                        )}
                        
                        {paper.abstract && (
                            <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-4">{paper.abstract}</p>
                        )}
                        
                        <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-4 border-t border-gray-50">
                            <div className="flex gap-2">
                                {paper.tags?.map(tag => (
                                    <span key={tag} className="text-xs text-gray-500 bg-stone-100 px-2 py-1 rounded">#{tag}</span>
                                ))}
                            </div>
                            <div className="flex gap-3">
                                {paper.pdfLink && (
                                    <a href={paper.pdfLink} className="inline-flex items-center text-sm font-medium text-red-600 hover:text-red-700">
                                        <Download size={16} className="mr-1" /> PDF
                                    </a>
                                )}
                                {paper.link && (
                                    <a href={paper.link} className="inline-flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-700">
                                        <ExternalLink size={16} className="mr-1" /> View
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center py-12 text-gray-500 bg-white rounded-lg border border-dashed border-gray-300">
                    No papers found matching your criteria.
                </div>
            )}
        </div>
      </div>

      {/* Sidebar: Stats */}
      <div className="lg:col-span-1 space-y-8">
        <div className="sticky top-24 space-y-8">
            <CitationChart />
            
            {/* Additional Info Box */}
            <div className="bg-gradient-to-br from-emerald-700 to-teal-800 rounded-xl p-6 text-white shadow-md">
                <h3 className="font-bold text-lg mb-2">Collaborate?</h3>
                <p className="text-emerald-50 text-sm mb-4">I am always open to discussing new research ideas, especially regarding biodiversity and conservation technology.</p>
                <button className="w-full py-2 bg-white text-emerald-800 font-semibold rounded-md text-sm hover:bg-emerald-50 transition-colors">
                    Get in touch
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};