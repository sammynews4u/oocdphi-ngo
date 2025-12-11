import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, Shield, Phone, Facebook, Twitter, Instagram, Linkedin, Sun, Moon } from 'lucide-react';
import { Button } from './UIComponents';
import { useAppData } from '../context/AppDataContext';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { settings } = useAppData();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const location = useLocation();

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
    document.documentElement.classList.toggle('high-contrast');
  };

  // Close menu on route change
  React.useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Programs', path: '/programs' },
    { name: 'Resources', path: '/resources' },
    { name: 'Action Center', path: '/action' },
    { name: 'Dashboard', path: '/admin' },
  ];

  return (
    <div className={`min-h-screen flex flex-col ${highContrast ? 'contrast-125 brightness-90 bg-white' : 'bg-slate-50'}`}>
      {/* Top Bar */}
      <div className="bg-slate-900 text-slate-300 py-2 px-4 text-sm hidden md:flex justify-between items-center">
        <div className="flex space-x-4">
          <span className="flex items-center hover:text-white cursor-pointer"><Phone size={14} className="mr-1" /> {settings.contactPhone}</span>
          <span className="hover:text-white cursor-pointer">{settings.contactEmail}</span>
        </div>
        <div className="flex space-x-4 items-center">
          <button onClick={toggleHighContrast} className="flex items-center hover:text-white" title="Toggle High Contrast">
             {highContrast ? <Sun size={14} className="mr-1" /> : <Moon size={14} className="mr-1" />}
             {highContrast ? 'Normal View' : 'High Contrast'}
          </button>
          <div className="flex space-x-2">
            <Facebook size={14} className="hover:text-white cursor-pointer" />
            <Twitter size={14} className="hover:text-white cursor-pointer" />
            <Linkedin size={14} className="hover:text-white cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className={`sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm ${highContrast ? 'border-b-2 border-black' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center">
                {settings.logoUrl ? (
                    <img src={settings.logoUrl} alt="Logo" className="h-10 w-10 mr-2 object-contain" />
                ) : (
                    <Shield className="h-8 w-8 text-emerald-600" />
                )}
                <span className="ml-2 text-2xl font-bold text-slate-900 tracking-tight">{settings.name}</span>
              </Link>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors hover:text-emerald-600 ${
                      isActive ? 'text-emerald-600 font-semibold' : 'text-slate-600'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              <Link to="/action">
                <Button variant="primary" size="sm" className="shadow-emerald-200/50 shadow-lg">
                  Donate Now <Heart size={16} className="ml-1 fill-current" />
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200">
            <div className="pt-2 pb-3 space-y-1 px-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium ${
                      isActive ? 'bg-emerald-50 text-emerald-700' : 'text-slate-700 hover:bg-slate-50'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              <div className="mt-4">
                <Link to="/action" className="block w-full">
                    <Button variant="primary" className="w-full justify-center">Donate Now</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center text-white text-xl font-bold">
                 {settings.logoUrl ? (
                    <img src={settings.logoUrl} alt="Logo" className="h-6 w-6 mr-2 object-contain grayscale brightness-200" />
                ) : (
                    <Shield className="h-6 w-6 text-emerald-500 mr-2" />
                )}
                {settings.name}
              </div>
              <p className="text-sm text-slate-400">
                {settings.heroSubtitle}
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/programs" className="hover:text-emerald-400">Programs</Link></li>
                <li><Link to="/resources" className="hover:text-emerald-400">Health Hub</Link></li>
                <li><Link to="/action" className="hover:text-emerald-400">Volunteer</Link></li>
                <li><Link to="/action" className="hover:text-emerald-400">Donate</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm">
                <li>123 Health Avenue, Cityville</li>
                <li>{settings.contactEmail}</li>
                <li>{settings.contactPhone}</li>
                <li>Mon-Fri: 9am - 5pm</li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Newsletter</h3>
              <p className="text-xs text-slate-400 mb-2">Subscribe for health tips and updates.</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Enter email" 
                  className="bg-slate-800 border-none text-white text-sm rounded-l-md px-3 py-2 w-full focus:ring-1 focus:ring-emerald-500 outline-none" 
                />
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-r-md text-sm">Join</button>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-xs text-slate-500">
            © {new Date().getFullYear()} {settings.name}. All rights reserved. Privacy Policy | Terms of Service
          </div>
        </div>
      </footer>
    </div>
  );
};
