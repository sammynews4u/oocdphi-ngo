import React from 'react';
import { SectionTitle, Card, Badge, Button } from '../components/UIComponents';
import { MapPin, Users, ArrowRight, Clock } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';

export const ProgramsAndEvents: React.FC = () => {
    const { programs, events } = useAppData();

    return (
        <div className="py-16 space-y-24 bg-slate-50">
            {/* Programs Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle title="Our Initiatives" subtitle="Targeted programs designed to tackle chronic diseases at their root." />
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {programs.length > 0 ? programs.map(prog => (
                        <Card key={prog.id} className="flex flex-col h-full">
                            <div className="relative h-48 overflow-hidden">
                                <img src={prog.image} alt={prog.title} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                                <div className="absolute top-4 right-4">
                                    <Badge color="green">{prog.category}</Badge>
                                </div>
                            </div>
                            <div className="p-6 flex-1 flex flex-col">
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{prog.title}</h3>
                                <p className="text-slate-600 text-sm mb-4 flex-1">{prog.description}</p>
                                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                                        Impact: {prog.impactMetric}
                                    </span>
                                    <button className="text-slate-400 hover:text-emerald-600 transition-colors">
                                        <ArrowRight size={20} />
                                    </button>
                                </div>
                            </div>
                        </Card>
                    )) : (
                        <div className="col-span-3 text-center text-slate-500">No programs currently available.</div>
                    )}
                </div>
            </div>

            {/* Events Section */}
            <div className="bg-white py-16 border-y border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-10">
                        <div className="text-left">
                            <h2 className="text-3xl font-bold text-slate-900">Upcoming Events</h2>
                            <p className="mt-2 text-slate-600">Join us in person or online to learn and get screened.</p>
                        </div>
                        <Button variant="outline" className="mt-4 md:mt-0">View Calendar</Button>
                    </div>

                    <div className="space-y-4">
                        {events.length > 0 ? events.map(evt => (
                            <div key={evt.id} className="group flex flex-col md:flex-row md:items-center bg-slate-50 border border-slate-100 p-6 rounded-xl hover:border-emerald-500 transition-colors cursor-pointer">
                                <div className="flex-shrink-0 flex md:flex-col items-center justify-center bg-white border border-slate-200 rounded-lg w-16 h-16 md:w-20 md:h-20 mr-6 mb-4 md:mb-0 shadow-sm">
                                    <span className="text-xs font-bold text-slate-500 uppercase">{evt.date.split(' ')[0]}</span>
                                    <span className="text-xl md:text-2xl font-bold text-slate-900">{evt.date.split(' ')[1] ? evt.date.split(' ')[1].replace(',', '') : ''}</span>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <Badge color="blue">{evt.type}</Badge>
                                        <span className="text-xs text-slate-500 flex items-center"><Users size={12} className="mr-1"/> {evt.registeredCount} Registered</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">{evt.title}</h3>
                                    <div className="flex items-center text-slate-500 text-sm mt-1">
                                        <MapPin size={14} className="mr-1" /> {evt.location}
                                        <Clock size={14} className="ml-4 mr-1" /> 10:00 AM - 2:00 PM
                                    </div>
                                </div>
                                <div className="mt-4 md:mt-0">
                                    <Button size="sm">Register Now</Button>
                                </div>
                            </div>
                        )) : (
                            <div className="text-center text-slate-500">No upcoming events.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
