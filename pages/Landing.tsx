import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Activity, Users, Heart, Globe, Target, UserCheck } from 'lucide-react';
import { Button, Card, SectionTitle } from '../components/UIComponents';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { generateHealthTip } from '../services/geminiService';
import { useAppData } from '../context/AppDataContext';

const impactData = [
  { name: 'Screenings', value: 4500, color: '#059669' },
  { name: 'Educated', value: 12000, color: '#2563EB' },
  { name: 'Volunteers', value: 800, color: '#D97706' },
  { name: 'Events', value: 150, color: '#7C3AED' },
];

export const Landing: React.FC = () => {
  const { settings } = useAppData();
  const [dailyTip, setDailyTip] = useState<string>('');

  useEffect(() => {
    generateHealthTip().then(setDailyTip);
  }, []);

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="relative bg-slate-900 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://picsum.photos/1920/1080" 
            alt="Doctor holding hands with patient" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-48">
          <div className="lg:w-2/3">
            <span className="inline-block py-1 px-3 rounded-full bg-emerald-500/20 text-emerald-300 text-sm font-semibold mb-6 border border-emerald-500/30">
              Prevention is the best cure
            </span>
            <h1 className="text-4xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
              {settings.heroTitle}
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-2xl">
              {settings.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
               <Link to="/action">
                 <Button size="lg" className="w-full sm:w-auto">Donate Now</Button>
               </Link>
               <Link to="/programs">
                 <Button variant="outline" size="lg" className="w-full sm:w-auto text-white border-slate-500 hover:bg-slate-800 hover:text-white hover:border-white">
                    View Programs
                 </Button>
               </Link>
            </div>
          </div>
        </div>
        
        {/* Daily Tip Banner */}
        {dailyTip && (
           <div className="absolute bottom-0 w-full bg-emerald-700/90 backdrop-blur-md py-3 px-4 text-center text-white text-sm font-medium border-t border-emerald-500">
              <span className="bg-emerald-800 px-2 py-0.5 rounded mr-2 text-xs uppercase tracking-wider">Daily AI Tip</span>
              {dailyTip}
           </div>
        )}
      </section>

      {/* Impact Stats */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                    <SectionTitle title="Our Impact in 2024" align="left" subtitle="Transparent results driven by our commitment to global health standards." />
                    <p className="text-slate-600 mb-8">
                        We track every screening, every workshop, and every dollar donated to ensure maximum impact on community health. Our data-driven approach allows us to target interventions where they are needed most.
                    </p>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                            <div className="text-3xl font-bold text-emerald-600 mb-1">25k+</div>
                            <div className="text-sm text-slate-500">Lives Impacted</div>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                            <div className="text-3xl font-bold text-blue-600 mb-1">50+</div>
                            <div className="text-sm text-slate-500">Local Partners</div>
                        </div>
                    </div>
                </div>
                <div className="h-80 w-full bg-slate-50 rounded-xl p-6 border border-slate-100 shadow-sm">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={impactData}>
                            <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                              {impactData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
      </section>

      {/* About / Mission */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <SectionTitle title="Who We Are" subtitle="Driven by compassion, guided by science." />
           
           <div className="grid md:grid-cols-3 gap-8 mt-12">
              <Card className="p-8 text-center hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600">
                      <Target size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Our Mission</h3>
                  <p className="text-slate-600">{settings.missionText}</p>
              </Card>
              <Card className="p-8 text-center hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
                      <Globe size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Our Vision</h3>
                  <p className="text-slate-600">{settings.visionText}</p>
              </Card>
              <Card className="p-8 text-center hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-600">
                      <Users size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Our Team</h3>
                  <p className="text-slate-600">A dedicated board of medical professionals, community leaders, and passionate volunteers.</p>
              </Card>
           </div>

           {/* Team Preview */}
           <div className="mt-20">
              <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">Leadership Team</h3>
              <div className="grid md:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="group relative overflow-hidden rounded-xl">
                        <img src={`https://picsum.photos/300/400?random=${i}`} alt="Team Member" className="w-full h-80 object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 translate-y-4 group-hover:translate-y-0 transition-transform">
                            <h4 className="text-white font-bold text-lg">Dr. Jane Doe</h4>
                            <p className="text-emerald-400 text-sm">Chief Medical Officer</p>
                        </div>
                    </div>
                ))}
              </div>
           </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-emerald-900 py-20 px-4">
         <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Join the Fight Against Chronic Disease</h2>
            <p className="text-emerald-100 text-lg mb-8">Your contribution can save a life today. Whether you donate time or money, you make a difference.</p>
            <div className="flex justify-center gap-4">
                <Link to="/action">
                    <Button size="lg" variant="primary">Become a Volunteer</Button>
                </Link>
                <Link to="/action">
                    <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-emerald-900">Make a Donation</Button>
                </Link>
            </div>
         </div>
      </section>
    </div>
  );
};
