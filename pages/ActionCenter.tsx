import React, { useState } from 'react';
import { SectionTitle, Card, Button } from '../components/UIComponents';
import { CreditCard, Calendar, Clock, CheckCircle } from 'lucide-react';
import { ScreeningSlot } from '../types';
import { useAppData } from '../context/AppDataContext';

// Mock screening slots (local to this component for now)
const slots: ScreeningSlot[] = [
    { id: '1', date: '2024-10-20', time: '09:00 AM', location: 'Main Clinic', available: true, type: 'General Checkup' },
    { id: '2', date: '2024-10-20', time: '10:00 AM', location: 'Main Clinic', available: true, type: 'Blood Pressure' },
    { id: '3', date: '2024-10-21', time: '02:00 PM', location: 'Mobile Van', available: false, type: 'Diabetes Screen' },
    { id: '4', date: '2024-10-21', time: '03:00 PM', location: 'Mobile Van', available: true, type: 'Diabetes Screen' },
];

export const ActionCenter: React.FC = () => {
    const { addDonation, addVolunteer, settings } = useAppData();
    const [activeTab, setActiveTab] = useState<'donate' | 'volunteer' | 'portal'>('donate');
    
    // Donation State
    const [donationAmount, setDonationAmount] = useState<number | null>(null);
    const [customAmount, setCustomAmount] = useState<string>('');
    const [donorName, setDonorName] = useState('');
    const [donorEmail, setDonorEmail] = useState('');

    // Volunteer State
    const [volunteerForm, setVolunteerForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        interest: 'Event Coordination',
        message: ''
    });

    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [booked, setBooked] = useState(false);

    const handleBooking = () => {
        if (!selectedSlot) return;
        setBooked(true);
        setTimeout(() => {
            setBooked(false);
            setSelectedSlot(null);
            alert("Appointment Booked Successfully! You will receive an SMS confirmation.");
        }, 2000);
    };

    const handleDonation = (e: React.FormEvent) => {
        e.preventDefault();
        const finalAmount = donationAmount || parseFloat(customAmount);
        if (!finalAmount || !donorName) {
            alert("Please enter a valid amount and your name.");
            return;
        }

        addDonation({
            id: Date.now().toString(),
            amount: finalAmount,
            donorName,
            email: donorEmail,
            date: new Date().toISOString().split('T')[0],
            recurring: false
        });

        alert(`Thank you for your donation of ${settings.currency}${finalAmount} via ${settings.paymentGateway}!`);
        setDonorName('');
        setDonorEmail('');
        setDonationAmount(null);
        setCustomAmount('');
    };

    const handleVolunteerSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!volunteerForm.firstName || !volunteerForm.email) return;

        addVolunteer({
            id: Date.now().toString(),
            ...volunteerForm,
            dateJoined: new Date().toISOString().split('T')[0],
            status: 'Pending'
        });

        alert("Thank you for signing up! We will contact you shortly.");
        setVolunteerForm({ firstName: '', lastName: '', email: '', interest: 'Event Coordination', message: '' });
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Tabs */}
                <div className="flex justify-center mb-12">
                    <div className="bg-white p-1 rounded-xl shadow-sm border border-slate-200 inline-flex">
                        <button 
                            onClick={() => setActiveTab('donate')}
                            className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'donate' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'}`}
                        >
                            Donate
                        </button>
                        <button 
                            onClick={() => setActiveTab('volunteer')}
                            className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'volunteer' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'}`}
                        >
                            Volunteer
                        </button>
                        <button 
                            onClick={() => setActiveTab('portal')}
                            className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'portal' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'}`}
                        >
                            Book Screening
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="animate-fade-in">
                    {activeTab === 'donate' && (
                        <div className="grid md:grid-cols-2 gap-12">
                            <div>
                                <h2 className="text-3xl font-bold text-slate-900 mb-4">Support Our Mission</h2>
                                <p className="text-slate-600 mb-8">
                                    Your donation directly funds screenings, educational materials, and support groups for low-income communities.
                                </p>
                                <ul className="space-y-4 mb-8">
                                    <li className="flex items-center text-slate-700"><CheckCircle className="text-emerald-500 mr-2" size={20} /> {settings.currency}25 provides a diabetes screening kit.</li>
                                    <li className="flex items-center text-slate-700"><CheckCircle className="text-emerald-500 mr-2" size={20} /> {settings.currency}50 sponsors a health workshop.</li>
                                    <li className="flex items-center text-slate-700"><CheckCircle className="text-emerald-500 mr-2" size={20} /> {settings.currency}100 supports a patient for a month.</li>
                                </ul>
                            </div>
                            <Card className="p-8 border-t-4 border-t-emerald-500">
                                <h3 className="text-xl font-bold mb-6">Make a secure donation</h3>
                                <form onSubmit={handleDonation}>
                                    <div className="grid grid-cols-3 gap-3 mb-6">
                                        {[25, 50, 100, 250, 500].map(amt => (
                                            <button 
                                                type="button"
                                                key={amt}
                                                onClick={() => { setDonationAmount(amt); setCustomAmount(''); }}
                                                className={`py-2 rounded-lg border text-sm font-medium ${donationAmount === amt ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'border-slate-200 hover:border-emerald-300'}`}
                                            >
                                                {settings.currency}{amt}
                                            </button>
                                        ))}
                                        <input 
                                            placeholder="Custom" 
                                            className="py-2 px-3 rounded-lg border border-slate-200 text-sm text-center focus:ring-emerald-500 outline-none" 
                                            type="number"
                                            value={customAmount}
                                            onChange={(e) => { setCustomAmount(e.target.value); setDonationAmount(null); }}
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <input 
                                            type="text" 
                                            placeholder="Full Name" 
                                            value={donorName}
                                            onChange={e => setDonorName(e.target.value)}
                                            className="w-full p-3 border border-slate-200 rounded-lg text-sm focus:ring-1 focus:ring-emerald-500 outline-none" 
                                            required
                                        />
                                        <input 
                                            type="email" 
                                            placeholder="Email Address" 
                                            value={donorEmail}
                                            onChange={e => setDonorEmail(e.target.value)}
                                            className="w-full p-3 border border-slate-200 rounded-lg text-sm focus:ring-1 focus:ring-emerald-500 outline-none" 
                                        />
                                        <div className="relative">
                                            <input type="text" placeholder="Card Number" className="w-full p-3 border border-slate-200 rounded-lg text-sm focus:ring-1 focus:ring-emerald-500 outline-none pl-10" />
                                            <CreditCard className="absolute left-3 top-3 text-slate-400" size={18} />
                                        </div>
                                        <Button className="w-full py-3 text-lg shadow-emerald-200 shadow-lg" type="submit">
                                            Donate {donationAmount || customAmount ? `${settings.currency}${donationAmount || customAmount}` : ''}
                                        </Button>
                                        <p className="text-xs text-center text-slate-400 flex justify-center items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span> Processing securely via {settings.paymentGateway}</p>
                                    </div>
                                </form>
                            </Card>
                        </div>
                    )}

                    {activeTab === 'volunteer' && (
                        <div className="text-center max-w-2xl mx-auto">
                            <SectionTitle title="Join the Team" subtitle="We need passionate individuals to help us organize events, create content, and assist in screenings." />
                            <Card className="p-8 text-left mt-8">
                                <form className="space-y-4" onSubmit={handleVolunteerSubmit}>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-sm font-medium text-slate-700">First Name</label>
                                            <input 
                                                type="text" 
                                                required 
                                                value={volunteerForm.firstName}
                                                onChange={e => setVolunteerForm({...volunteerForm, firstName: e.target.value})}
                                                className="w-full p-2 border border-slate-200 rounded-lg focus:ring-emerald-500 outline-none" 
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-sm font-medium text-slate-700">Last Name</label>
                                            <input 
                                                type="text" 
                                                value={volunteerForm.lastName}
                                                onChange={e => setVolunteerForm({...volunteerForm, lastName: e.target.value})}
                                                className="w-full p-2 border border-slate-200 rounded-lg focus:ring-emerald-500 outline-none" 
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-slate-700">Email</label>
                                        <input 
                                            type="email" 
                                            required
                                            value={volunteerForm.email}
                                            onChange={e => setVolunteerForm({...volunteerForm, email: e.target.value})}
                                            className="w-full p-2 border border-slate-200 rounded-lg focus:ring-emerald-500 outline-none" 
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-slate-700">Interest Area</label>
                                        <select 
                                            value={volunteerForm.interest}
                                            onChange={e => setVolunteerForm({...volunteerForm, interest: e.target.value})}
                                            className="w-full p-2 border border-slate-200 rounded-lg focus:ring-emerald-500 outline-none bg-white"
                                        >
                                            <option>Event Coordination</option>
                                            <option>Medical Professional (Doctor/Nurse)</option>
                                            <option>Content Creation</option>
                                            <option>Community Outreach</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-slate-700">Message</label>
                                        <textarea 
                                            rows={4} 
                                            value={volunteerForm.message}
                                            onChange={e => setVolunteerForm({...volunteerForm, message: e.target.value})}
                                            className="w-full p-2 border border-slate-200 rounded-lg focus:ring-emerald-500 outline-none" 
                                            placeholder="Tell us about yourself..."
                                        ></textarea>
                                    </div>
                                    <Button className="w-full" type="submit">Submit Application</Button>
                                </form>
                            </Card>
                        </div>
                    )}

                    {activeTab === 'portal' && (
                        <div>
                            <SectionTitle title="Screening Portal" subtitle="Book a free chronic disease screening appointment." />
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                                {slots.map(slot => (
                                    <div 
                                        key={slot.id} 
                                        onClick={() => slot.available && setSelectedSlot(slot.id)}
                                        className={`p-4 border rounded-xl flex justify-between items-center transition-all ${
                                            !slot.available 
                                            ? 'bg-slate-50 border-slate-100 opacity-60 cursor-not-allowed' 
                                            : selectedSlot === slot.id 
                                                ? 'bg-emerald-50 border-emerald-500 ring-1 ring-emerald-500 cursor-pointer' 
                                                : 'bg-white border-slate-200 hover:border-emerald-300 cursor-pointer'
                                        }`}
                                    >
                                        <div>
                                            <h4 className="font-bold text-slate-900">{slot.type}</h4>
                                            <div className="text-sm text-slate-500 flex items-center mt-1">
                                                <Calendar size={14} className="mr-1" /> {slot.date}
                                                <Clock size={14} className="mx-2" /> {slot.time}
                                            </div>
                                            <p className="text-xs text-slate-400 mt-1">{slot.location}</p>
                                        </div>
                                        <div className="text-right">
                                            {slot.available 
                                                ? <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded">Available</span>
                                                : <span className="text-xs font-bold text-slate-500 bg-slate-200 px-2 py-1 rounded">Booked</span>
                                            }
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {selectedSlot && (
                                <div className="mt-8 p-6 bg-white border border-slate-200 rounded-xl shadow-lg sticky bottom-4 animate-fade-in-up">
                                    <h4 className="font-bold text-lg mb-4">Complete Booking</h4>
                                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                                        <input type="text" placeholder="Patient Name" className="p-2 border border-slate-200 rounded-lg outline-none focus:border-emerald-500" />
                                        <input type="tel" placeholder="Phone Number" className="p-2 border border-slate-200 rounded-lg outline-none focus:border-emerald-500" />
                                    </div>
                                    <Button onClick={handleBooking} disabled={booked} className="w-full">
                                        {booked ? 'Processing...' : 'Confirm Appointment'}
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
