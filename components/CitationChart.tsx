import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { PAPERS } from '../constants';

export const CitationChart: React.FC = () => {
  // Process data: Aggregate papers by year and sum citations
  const dataMap = PAPERS.reduce((acc, paper) => {
    const year = paper.year || 2024; // Default to 2024 if year missing
    if (!acc[year]) {
      acc[year] = { year, papers: 0, citations: 0 };
    }
    acc[year].papers += 1;
    acc[year].citations += paper.citations || 0;
    return acc;
  }, {} as Record<number, { year: number, papers: number, citations: number }>);

  const data = Object.values(dataMap).sort((a, b) => a.year - b.year);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-emerald-100">
      <h3 className="text-lg font-bold text-gray-900 mb-6">Impact Overview</h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
            <XAxis 
              dataKey="year" 
              tick={{ fontSize: 12, fill: '#6B7280' }} 
              axisLine={false} 
              tickLine={false} 
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#6B7280' }} 
              axisLine={false} 
              tickLine={false} 
            />
            <Tooltip 
              cursor={{ fill: '#F3F4F6' }}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
            />
            <Bar dataKey="citations" name="Citations" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill="#059669" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4 text-center">
        <div className="p-3 bg-stone-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">{PAPERS.length}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">Total Publications</div>
        </div>
        <div className="p-3 bg-stone-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">{PAPERS.reduce((sum, p) => sum + (p.citations || 0), 0)}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">Total Citations</div>
        </div>
      </div>
    </div>
  );
};