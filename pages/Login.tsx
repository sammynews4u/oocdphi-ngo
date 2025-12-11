import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, ArrowRight } from 'lucide-react';
import { Button, Card } from '../components/UIComponents';
import { useAuth } from '../context/AuthContext';
import { useAppData } from '../context/AppDataContext';

export const Login: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const { settings } = useAppData();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      navigate('/admin');
    } else {
      setError('Invalid Access Key. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
            <Shield className="h-8 w-8 text-emerald-500" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">{settings.name} Admin</h1>
          <p className="text-slate-400">Secure access for staff and administrators.</p>
        </div>

        <Card className="p-8 bg-white/95 backdrop-blur shadow-2xl border-none">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Administrator Access Key
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  placeholder="Enter admin password..."
                  autoFocus
                />
              </div>
              {error && (
                <p className="mt-2 text-sm text-red-600 animate-pulse">
                  {error}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full py-3 text-lg justify-between group">
              <span>Access Dashboard</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <div className="text-center">
              <p className="text-xs text-slate-400">
                Demo Password: <span className="font-mono bg-slate-100 px-1 py-0.5 rounded text-slate-600">admin123</span>
              </p>
            </div>
          </form>
        </Card>
        
        <p className="text-center text-slate-600 text-sm mt-8">
          &copy; {new Date().getFullYear()} {settings.name}. Authorized personnel only.
        </p>
      </div>
    </div>
  );
};