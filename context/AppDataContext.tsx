import React, { createContext, useContext, useState, useEffect } from 'react';
import { Program, Event, Resource, Donation, Volunteer, SiteSettings } from '../types';

// Default Initial Data
const defaultSettings: SiteSettings = {
  name: 'LifeGuard',
  logoUrl: '', // Empty means default icon
  currency: '$',
  paymentGateway: 'Stripe',
  heroTitle: 'Fighting Chronic Disease Together.',
  heroSubtitle: 'LifeGuard is dedicated to reducing the burden of chronic conditions through education, early screening, and community empowerment.',
  contactEmail: 'info@lifeguard-ngo.org',
  contactPhone: '+1 (555) 123-4567',
  missionText: 'To eradicate preventable chronic diseases through accessible screenings and education.',
  visionText: 'A world where quality healthcare information and early detection are accessible to all.'
};

const defaultPrograms: Program[] = [
  { id: '1', title: 'Heart Health Initiative', description: 'Comprehensive cardiovascular health screenings.', category: 'Prevention', impactMetric: '5,000+ Screened', image: 'https://picsum.photos/500/300?random=10' },
  { id: '2', title: 'Diabetes Awareness', description: 'Education on blood sugar management and nutrition.', category: 'Education', impactMetric: '12,000+ Educated', image: 'https://picsum.photos/500/300?random=11' },
  { id: '3', title: 'Clean Lungs Project', description: 'Focusing on respiratory health and smoking cessation.', category: 'Community', impactMetric: '800+ Quit Smoking', image: 'https://picsum.photos/500/300?random=12' }
];

const defaultEvents: Event[] = [
  { id: '1', title: 'Community Health Fair 2024', date: 'Oct 15, 2024', location: 'City Central Park', type: 'Outreach', registeredCount: 120 },
  { id: '2', title: 'Free Blood Pressure Screening', date: 'Oct 22, 2024', location: 'Westside Community Center', type: 'Screening', registeredCount: 45 },
  { id: '3', title: 'Nutrition for Life Seminar', date: 'Nov 05, 2024', location: 'Online (Zoom)', type: 'Seminar', registeredCount: 300 }
];

const defaultResources: Resource[] = [
  { id: '1', title: 'Understanding Type 2 Diabetes', summary: 'A complete guide to symptoms and prevention.', type: 'Guide', date: 'Sep 10, 2024', author: 'Dr. Emily Chen' },
  { id: '2', title: '5 Heart-Healthy Exercises', summary: 'Simple at-home workouts.', type: 'Video', date: 'Sep 05, 2024', author: 'Coach Mike' },
  { id: '3', title: 'The Hidden Sugar in Your Diet', summary: 'Infographic showing sugar content in common foods.', type: 'Infographic', date: 'Aug 28, 2024', author: 'Sarah Nutritionist' }
];

const defaultDonations: Donation[] = [
  { id: '1', amount: 50, donorName: 'John Doe', date: '2024-01-15', recurring: false },
  { id: '2', amount: 100, donorName: 'Jane Smith', date: '2024-02-20', recurring: true },
  { id: '3', amount: 25, donorName: 'Alice Johnson', date: '2024-03-10', recurring: false }
];

interface AppContextType {
  settings: SiteSettings;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  programs: Program[];
  addProgram: (program: Program) => void;
  deleteProgram: (id: string) => void;
  events: Event[];
  addEvent: (event: Event) => void;
  deleteEvent: (id: string) => void;
  resources: Resource[];
  addResource: (resource: Resource) => void;
  deleteResource: (id: string) => void;
  donations: Donation[];
  addDonation: (donation: Donation) => void;
  volunteers: Volunteer[];
  addVolunteer: (volunteer: Volunteer) => void;
  getTotalDonations: () => number;
}

const AppDataContext = createContext<AppContextType | undefined>(undefined);

export const AppDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load from localStorage or use defaults
  const [settings, setSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('lg_settings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });
  
  const [programs, setPrograms] = useState<Program[]>(() => {
    const saved = localStorage.getItem('lg_programs');
    return saved ? JSON.parse(saved) : defaultPrograms;
  });

  const [events, setEvents] = useState<Event[]>(() => {
    const saved = localStorage.getItem('lg_events');
    return saved ? JSON.parse(saved) : defaultEvents;
  });

  const [resources, setResources] = useState<Resource[]>(() => {
    const saved = localStorage.getItem('lg_resources');
    return saved ? JSON.parse(saved) : defaultResources;
  });

  const [donations, setDonations] = useState<Donation[]>(() => {
    const saved = localStorage.getItem('lg_donations');
    return saved ? JSON.parse(saved) : defaultDonations;
  });

  const [volunteers, setVolunteers] = useState<Volunteer[]>(() => {
    const saved = localStorage.getItem('lg_volunteers');
    return saved ? JSON.parse(saved) : [];
  });

  // Persistence Effects
  useEffect(() => localStorage.setItem('lg_settings', JSON.stringify(settings)), [settings]);
  useEffect(() => localStorage.setItem('lg_programs', JSON.stringify(programs)), [programs]);
  useEffect(() => localStorage.setItem('lg_events', JSON.stringify(events)), [events]);
  useEffect(() => localStorage.setItem('lg_resources', JSON.stringify(resources)), [resources]);
  useEffect(() => localStorage.setItem('lg_donations', JSON.stringify(donations)), [donations]);
  useEffect(() => localStorage.setItem('lg_volunteers', JSON.stringify(volunteers)), [volunteers]);

  // Actions
  const updateSettings = (newSettings: Partial<SiteSettings>) => setSettings(prev => ({ ...prev, ...newSettings }));
  
  const addProgram = (item: Program) => setPrograms(prev => [...prev, item]);
  const deleteProgram = (id: string) => setPrograms(prev => prev.filter(i => i.id !== id));
  
  const addEvent = (item: Event) => setEvents(prev => [...prev, item]);
  const deleteEvent = (id: string) => setEvents(prev => prev.filter(i => i.id !== id));
  
  const addResource = (item: Resource) => setResources(prev => [...prev, item]);
  const deleteResource = (id: string) => setResources(prev => prev.filter(i => i.id !== id));
  
  const addDonation = (item: Donation) => setDonations(prev => [item, ...prev]); // Newest first
  
  const addVolunteer = (item: Volunteer) => setVolunteers(prev => [item, ...prev]);

  const getTotalDonations = () => donations.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <AppDataContext.Provider value={{
      settings, updateSettings,
      programs, addProgram, deleteProgram,
      events, addEvent, deleteEvent,
      resources, addResource, deleteResource,
      donations, addDonation,
      volunteers, addVolunteer,
      getTotalDonations
    }}>
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = () => {
  const context = useContext(AppDataContext);
  if (!context) throw new Error("useAppData must be used within an AppDataProvider");
  return context;
};
