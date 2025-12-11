export interface Program {
  id: string;
  title: string;
  description: string;
  category: 'Prevention' | 'Screening' | 'Education' | 'Community';
  impactMetric: string;
  image: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  type: 'Screening' | 'Walk' | 'Seminar' | 'Outreach';
  registeredCount: number;
}

export interface Resource {
  id: string;
  title: string;
  summary: string;
  type: 'Article' | 'Guide' | 'Video' | 'Infographic';
  date: string;
  author: string;
}

export interface Donation {
  id: string;
  amount: number;
  donorName: string;
  email?: string;
  project?: string;
  date: string;
  recurring: boolean;
}

export interface Volunteer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  interest: string;
  message: string;
  dateJoined: string;
  status: 'Pending' | 'Approved';
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

export enum UserRole {
  GUEST = 'GUEST',
  ADMIN = 'ADMIN'
}

export interface ScreeningSlot {
  id: string;
  date: string;
  time: string;
  location: string;
  available: boolean;
  type: string;
}

export interface SiteSettings {
  name: string;
  logoUrl: string;
  currency: string;
  paymentGateway: 'Stripe' | 'PayPal' | 'Razorpay' | 'Manual';
  heroTitle: string;
  heroSubtitle: string;
  contactEmail: string;
  contactPhone: string;
  missionText: string;
  visionText: string;
}
