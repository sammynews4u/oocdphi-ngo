import React, { useState } from 'react';
import { SectionTitle, Card, Badge } from '../components/UIComponents';
import { Search, PlayCircle, FileText, Download, BookOpen } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';

export const Resources: React.FC = () => {
    const { resources } = useAppData();
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('All');

    const filteredResources = resources.filter(res => {
        const matchesSearch = res.title.toLowerCase().includes(searchTerm.toLowerCase()) || res.summary.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === 'All' || res.type === filter;
        return matchesSearch && matchesFilter;
    });

    const getIcon = (type: string) => {
        switch(type) {
            case 'Video': return <PlayCircle size={20} className="text-red-500" />;
            case 'Guide': return <BookOpen size={20} className="text-blue-500" />;
            case 'Infographic': return <Download size={20} className="text-purple-500" />;
            default: return <FileText size={20} className="text-emerald-500" />;
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle title="Health Education Hub" subtitle="Empower yourself with knowledge. Explore our library of expert-vetted resources." />

                {/* Search & Filter */}
                <div className="mb-12 flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search topics..." 
                            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                        {['All', 'Article', 'Video', 'Guide', 'Infographic'].map(f => (
                            <button 
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                                    filter === f 
                                    ? 'bg-slate-900 text-white' 
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredResources.map(res => (
                        <Card key={res.id} className="flex flex-col p-6 hover:border-emerald-400 transition-colors cursor-pointer group">
                            <div className="flex justify-between items-start mb-4">
                                <Badge color="blue">{res.type}</Badge>
                                {getIcon(res.type)}
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-600">{res.title}</h3>
                            <p className="text-slate-600 text-sm mb-6 flex-1">{res.summary}</p>
                            <div className="flex items-center justify-between pt-4 border-t border-slate-50 text-xs text-slate-400">
                                <span>{res.author}</span>
                                <span>{res.date}</span>
                            </div>
                        </Card>
                    ))}
                </div>

                {filteredResources.length === 0 && (
                    <div className="text-center py-20 text-slate-400">
                        <p>No resources found matching your search.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
