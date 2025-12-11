import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card, Button, Badge } from '../components/UIComponents';
import { Users, DollarSign, Calendar, FileText, Settings, LogOut, Plus, Trash2, Save, Layout, List, Shield, Database, AlertCircle } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';
import { useAuth } from '../context/AuthContext';
import { Event, Resource } from '../types';

export const AdminDashboard: React.FC = () => {
    const { 
        settings, updateSettings, 
        events, addEvent, deleteEvent, 
        resources, addResource, deleteResource, 
        volunteers, donations, getTotalDonations,
        programs 
    } = useAppData();

    const { logout } = useAuth();
    const [activeView, setActiveView] = useState<'overview' | 'cms' | 'events' | 'resources' | 'volunteers' | 'settings'>('overview');

    // Forms State
    const [newEvent, setNewEvent] = useState<Partial<Event>>({ title: '', date: '', location: '', type: 'Outreach' });
    const [newResource, setNewResource] = useState<Partial<Resource>>({ title: '', summary: '', type: 'Article', author: '' });

    // Chart Data Preparation
    const donationData = donations.slice(0, 10).reverse().map(d => ({ name: d.date, amount: d.amount }));
    const programDistribution = [
        { name: 'Prevention', value: programs.filter(p => p.category === 'Prevention').length },
        { name: 'Education', value: programs.filter(p => p.category === 'Education').length },
        { name: 'Community', value: programs.filter(p => p.category === 'Community').length },
    ];
    const COLORS = ['#059669', '#2563EB', '#D97706'];

    const handleAddEvent = () => {
        if (!newEvent.title || !newEvent.date) return;
        addEvent({
            id: Date.now().toString(),
            title: newEvent.title!,
            date: newEvent.date!,
            location: newEvent.location || 'TBD',
            type: (newEvent.type as any) || 'Outreach',
            registeredCount: 0
        });
        setNewEvent({ title: '', date: '', location: '', type: 'Outreach' });
    };

    const handleAddResource = () => {
        if (!newResource.title || !newResource.summary) return;
        addResource({
            id: Date.now().toString(),
            title: newResource.title!,
            summary: newResource.summary!,
            type: (newResource.type as any) || 'Article',
            date: new Date().toLocaleDateString(),
            author: newResource.author || 'Admin'
        });
        setNewResource({ title: '', summary: '', type: 'Article', author: '' });
    };

    const renderSidebar = () => (
        <div className="w-64 bg-slate-900 text-slate-300 flex-shrink-0 hidden lg:flex flex-col">
            <div className="p-6 flex items-center">
                <Shield className="h-6 w-6 text-emerald-500 mr-2" />
                <h2 className="text-xl font-bold text-white">Admin Panel</h2>
            </div>
            <nav className="flex-1 px-4 space-y-2">
                {[
                    { id: 'overview', icon: Users, label: 'Dashboard' },
                    { id: 'cms', icon: Layout, label: 'Homepage Content' },
                    { id: 'events', icon: Calendar, label: 'Events' },
                    { id: 'resources', icon: FileText, label: 'Resources' },
                    { id: 'volunteers', icon: List, label: 'Volunteers' },
                    { id: 'settings', icon: Settings, label: 'Site Settings' },
                ].map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveView(item.id as any)}
                        className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                            activeView === item.id ? 'bg-emerald-600 text-white' : 'hover:bg-slate-800'
                        }`}
                    >
                        <item.icon size={18} className="mr-3" /> {item.label}
                    </button>
                ))}
            </nav>
            <div className="p-4 border-t border-slate-800">
                <div className="mb-4 px-2 py-2 bg-slate-800 rounded text-xs text-slate-400">
                     <div className="flex items-center mb-1 text-yellow-500"><Database size={12} className="mr-1"/> Local Storage Mode</div>
                     Data is saved to this browser only.
                </div>
                <button 
                    onClick={logout}
                    className="flex items-center text-red-400 hover:text-red-300 w-full px-2"
                >
                    <LogOut size={18} className="mr-3" /> Logout
                </button>
            </div>
        </div>
    );

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden">
            {renderSidebar()}

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-y-auto">
                <header className="bg-white border-b border-slate-200 py-4 px-8 flex justify-between items-center sticky top-0 z-10">
                    <h1 className="text-2xl font-bold text-slate-800 capitalize">{activeView.replace('-', ' ')}</h1>
                    <div className="flex items-center space-x-4">
                        <div className="text-right hidden sm:block">
                            <div className="text-sm font-bold text-slate-900">Admin User</div>
                            <div className="text-xs text-slate-500">Super Admin</div>
                        </div>
                        <div className="h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold">A</div>
                    </div>
                </header>

                <div className="p-8 space-y-8 max-w-7xl mx-auto w-full">
                    
                    {/* OVERVIEW VIEW */}
                    {activeView === 'overview' && (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <Card className="p-6 border-l-4 border-l-emerald-500">
                                    <div className="text-slate-500 text-xs font-bold uppercase mb-1">Total Donations</div>
                                    <div className="text-2xl font-bold text-slate-900">{settings.currency}{getTotalDonations().toLocaleString()}</div>
                                    <div className="text-xs text-emerald-600 mt-2">Latest: {donations[0]?.donorName || 'N/A'}</div>
                                </Card>
                                <Card className="p-6 border-l-4 border-l-blue-500">
                                    <div className="text-slate-500 text-xs font-bold uppercase mb-1">Volunteers</div>
                                    <div className="text-2xl font-bold text-slate-900">{volunteers.length}</div>
                                    <div className="text-xs text-blue-600 mt-2">Registered</div>
                                </Card>
                                <Card className="p-6 border-l-4 border-l-amber-500">
                                    <div className="text-slate-500 text-xs font-bold uppercase mb-1">Active Events</div>
                                    <div className="text-2xl font-bold text-slate-900">{events.length}</div>
                                </Card>
                                <Card className="p-6 border-l-4 border-l-purple-500">
                                    <div className="text-slate-500 text-xs font-bold uppercase mb-1">Resources</div>
                                    <div className="text-2xl font-bold text-slate-900">{resources.length}</div>
                                </Card>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <Card className="p-6">
                                    <h3 className="font-bold text-slate-900 mb-6">Recent Donations</h3>
                                    <div className="h-64">
                                        {donations.length > 0 ? (
                                            <ResponsiveContainer width="100%" height="100%">
                                                <AreaChart data={donationData}>
                                                    <defs>
                                                        <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                                                            <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                                                            <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                                                        </linearGradient>
                                                    </defs>
                                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                                                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                                                    <Tooltip />
                                                    <Area type="monotone" dataKey="amount" stroke="#10B981" fillOpacity={1} fill="url(#colorAmt)" />
                                                </AreaChart>
                                            </ResponsiveContainer>
                                        ) : (
                                            <div className="h-full flex items-center justify-center text-slate-400">No donation data yet</div>
                                        )}
                                    </div>
                                </Card>

                                <Card className="p-6">
                                    <h3 className="font-bold text-slate-900 mb-6">Program Categories</h3>
                                    <div className="h-64 flex items-center justify-center">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={programDistribution}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={60}
                                                    outerRadius={80}
                                                    paddingAngle={5}
                                                    dataKey="value"
                                                >
                                                    {programDistribution.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                                <Tooltip />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="flex justify-center gap-4 text-xs">
                                        {programDistribution.map((entry, index) => (
                                            <div key={index} className="flex items-center">
                                                <div className="w-2 h-2 rounded-full mr-1" style={{ backgroundColor: COLORS[index] }}></div>
                                                {entry.name}: {entry.value}
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            </div>
                        </>
                    )}

                    {/* SETTINGS VIEW */}
                    {activeView === 'settings' && (
                        <Card className="p-8 max-w-3xl">
                            <h3 className="text-xl font-bold mb-6">General Configuration</h3>
                            <div className="grid gap-6">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Organization Name</label>
                                        <input 
                                            type="text" 
                                            value={settings.name}
                                            onChange={(e) => updateSettings({ name: e.target.value })}
                                            className="w-full p-2 border border-slate-300 rounded-md focus:ring-emerald-500 outline-none" 
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Logo URL</label>
                                        <input 
                                            type="text" 
                                            value={settings.logoUrl}
                                            onChange={(e) => updateSettings({ logoUrl: e.target.value })}
                                            className="w-full p-2 border border-slate-300 rounded-md focus:ring-emerald-500 outline-none" 
                                        />
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Currency Symbol</label>
                                        <select 
                                            value={settings.currency}
                                            onChange={(e) => updateSettings({ currency: e.target.value })}
                                            className="w-full p-2 border border-slate-300 rounded-md bg-white focus:ring-emerald-500 outline-none"
                                        >
                                            <option value="$">USD ($)</option>
                                            <option value="€">EUR (€)</option>
                                            <option value="£">GBP (£)</option>
                                            <option value="₹">INR (₹)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Payment Gateway</label>
                                        <select 
                                            value={settings.paymentGateway}
                                            onChange={(e) => updateSettings({ paymentGateway: e.target.value as any })}
                                            className="w-full p-2 border border-slate-300 rounded-md bg-white focus:ring-emerald-500 outline-none"
                                        >
                                            <option value="Stripe">Stripe</option>
                                            <option value="PayPal">PayPal</option>
                                            <option value="Razorpay">Razorpay</option>
                                            <option value="Manual">Manual Bank Transfer</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="border-t border-slate-200 pt-6">
                                    <h4 className="font-bold mb-4">Contact Info</h4>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <input 
                                            type="text" 
                                            value={settings.contactPhone}
                                            onChange={(e) => updateSettings({ contactPhone: e.target.value })}
                                            className="w-full p-2 border border-slate-300 rounded-md focus:ring-emerald-500 outline-none" 
                                            placeholder="Phone"
                                        />
                                        <input 
                                            type="text" 
                                            value={settings.contactEmail}
                                            onChange={(e) => updateSettings({ contactEmail: e.target.value })}
                                            className="w-full p-2 border border-slate-300 rounded-md focus:ring-emerald-500 outline-none" 
                                            placeholder="Email"
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <Button onClick={() => alert('Settings Saved!')}>
                                        <Save size={18} className="mr-2" /> Save Changes
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    )}

                    {/* CMS VIEW */}
                    {activeView === 'cms' && (
                        <Card className="p-8 max-w-3xl">
                            <h3 className="text-xl font-bold mb-6">Homepage Content</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Hero Title</label>
                                    <input 
                                        type="text" 
                                        value={settings.heroTitle}
                                        onChange={(e) => updateSettings({ heroTitle: e.target.value })}
                                        className="w-full p-2 border border-slate-300 rounded-md focus:ring-emerald-500 outline-none" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Hero Subtitle</label>
                                    <textarea 
                                        rows={3}
                                        value={settings.heroSubtitle}
                                        onChange={(e) => updateSettings({ heroSubtitle: e.target.value })}
                                        className="w-full p-2 border border-slate-300 rounded-md focus:ring-emerald-500 outline-none" 
                                    />
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Mission Statement</label>
                                        <textarea 
                                            rows={4}
                                            value={settings.missionText}
                                            onChange={(e) => updateSettings({ missionText: e.target.value })}
                                            className="w-full p-2 border border-slate-300 rounded-md focus:ring-emerald-500 outline-none" 
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Vision Statement</label>
                                        <textarea 
                                            rows={4}
                                            value={settings.visionText}
                                            onChange={(e) => updateSettings({ visionText: e.target.value })}
                                            className="w-full p-2 border border-slate-300 rounded-md focus:ring-emerald-500 outline-none" 
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end pt-4">
                                    <Button onClick={() => alert('Content Updated!')}>
                                        <Save size={18} className="mr-2" /> Publish Changes
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    )}

                    {/* EVENTS VIEW */}
                    {activeView === 'events' && (
                        <div className="space-y-6">
                             {/* Add Form */}
                             <Card className="p-6">
                                <h4 className="font-bold mb-4">Add New Event</h4>
                                <div className="grid md:grid-cols-4 gap-4">
                                    <input placeholder="Event Title" value={newEvent.title} onChange={e => setNewEvent({...newEvent, title: e.target.value})} className="p-2 border rounded" />
                                    <input placeholder="Date (e.g. Oct 20)" value={newEvent.date} onChange={e => setNewEvent({...newEvent, date: e.target.value})} className="p-2 border rounded" />
                                    <input placeholder="Location" value={newEvent.location} onChange={e => setNewEvent({...newEvent, location: e.target.value})} className="p-2 border rounded" />
                                    <Button onClick={handleAddEvent} disabled={!newEvent.title}><Plus size={16} /> Add</Button>
                                </div>
                             </Card>

                             {/* List */}
                             <Card className="overflow-hidden">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-xs">
                                        <tr>
                                            <th className="px-6 py-3">Title</th>
                                            <th className="px-6 py-3">Date</th>
                                            <th className="px-6 py-3">Location</th>
                                            <th className="px-6 py-3">Type</th>
                                            <th className="px-6 py-3">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {events.map(evt => (
                                            <tr key={evt.id} className="hover:bg-slate-50">
                                                <td className="px-6 py-4 font-medium">{evt.title}</td>
                                                <td className="px-6 py-4">{evt.date}</td>
                                                <td className="px-6 py-4">{evt.location}</td>
                                                <td className="px-6 py-4"><Badge color="blue">{evt.type}</Badge></td>
                                                <td className="px-6 py-4">
                                                    <button onClick={() => deleteEvent(evt.id)} className="text-red-500 hover:bg-red-50 p-1 rounded">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                             </Card>
                        </div>
                    )}

                    {/* RESOURCES VIEW */}
                    {activeView === 'resources' && (
                        <div className="space-y-6">
                             <Card className="p-6">
                                <h4 className="font-bold mb-4">Add New Resource</h4>
                                <div className="grid md:grid-cols-2 gap-4 mb-4">
                                    <input placeholder="Title" value={newResource.title} onChange={e => setNewResource({...newResource, title: e.target.value})} className="p-2 border rounded" />
                                    <input placeholder="Summary" value={newResource.summary} onChange={e => setNewResource({...newResource, summary: e.target.value})} className="p-2 border rounded" />
                                </div>
                                <div className="grid md:grid-cols-3 gap-4">
                                    <select value={newResource.type} onChange={e => setNewResource({...newResource, type: e.target.value as any})} className="p-2 border rounded bg-white">
                                        <option value="Article">Article</option>
                                        <option value="Video">Video</option>
                                        <option value="Guide">Guide</option>
                                    </select>
                                    <input placeholder="Author" value={newResource.author} onChange={e => setNewResource({...newResource, author: e.target.value})} className="p-2 border rounded" />
                                    <Button onClick={handleAddResource} disabled={!newResource.title}><Plus size={16} /> Add Resource</Button>
                                </div>
                             </Card>

                             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {resources.map(res => (
                                    <Card key={res.id} className="p-4 relative group">
                                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                             <button onClick={() => deleteResource(res.id)} className="text-red-500 bg-white shadow-sm p-1 rounded-full"><Trash2 size={16} /></button>
                                        </div>
                                        <Badge color="green">{res.type}</Badge>
                                        <h4 className="font-bold mt-2">{res.title}</h4>
                                        <p className="text-sm text-slate-500 mt-1 mb-2">{res.summary}</p>
                                        <div className="text-xs text-slate-400">By {res.author}</div>
                                    </Card>
                                ))}
                             </div>
                        </div>
                    )}

                    {/* VOLUNTEERS VIEW */}
                    {activeView === 'volunteers' && (
                        <Card className="overflow-hidden">
                            <div className="p-4 bg-slate-50 border-b border-slate-100">
                                <h3 className="font-bold">Volunteer Applications</h3>
                            </div>
                            {volunteers.length > 0 ? (
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-white border-b border-slate-200">
                                        <tr>
                                            <th className="px-6 py-3">Name</th>
                                            <th className="px-6 py-3">Email</th>
                                            <th className="px-6 py-3">Interest</th>
                                            <th className="px-6 py-3">Date</th>
                                            <th className="px-6 py-3">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {volunteers.map(vol => (
                                            <tr key={vol.id} className="hover:bg-slate-50">
                                                <td className="px-6 py-4 font-medium">{vol.firstName} {vol.lastName}</td>
                                                <td className="px-6 py-4">{vol.email}</td>
                                                <td className="px-6 py-4">{vol.interest}</td>
                                                <td className="px-6 py-4">{vol.dateJoined}</td>
                                                <td className="px-6 py-4"><Badge color="yellow">{vol.status}</Badge></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="p-8 text-center text-slate-500">No volunteers yet.</div>
                            )}
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};