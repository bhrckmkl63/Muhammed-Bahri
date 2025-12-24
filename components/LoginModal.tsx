
import React, { useState } from 'react';
import { CloseIcon } from './icons';

interface LoginModalProps {
  onClose: () => void;
  onLogin: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Kullanıcı adı: admin | Şifre: 123
    if (username === 'admin' && password === '123') {
      onLogin();
    } else {
      setError('Kullanıcı adı veya şifre hatalı!');
    }
  };

  return (
    <div className="fixed inset-0 bg-[#2a1a15]/90 backdrop-blur-md flex justify-center items-center z-[60] p-4 animate-fade-in">
      <div className="bg-[#fcfaf7] rounded-[2.5rem] shadow-2xl w-full max-w-md overflow-hidden relative border border-white/20">
        
        {/* Header Section */}
        <div className="bg-[#2a1a15] p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-amber-500"></div>
          <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-900/40 rotate-6 mx-auto mb-4">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
             </svg>
          </div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Yönetici Paneli</h2>
          <p className="text-stone-400 text-xs font-bold uppercase tracking-widest mt-1">Giriş Yaparak Yönetmeye Başla</p>
          
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-stone-500 hover:text-white transition-colors"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Kullanıcı Adı</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white border-2 border-stone-100 rounded-2xl py-4 px-5 text-sm font-bold text-[#2a1a15] focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 outline-none transition-all placeholder:text-stone-300"
                placeholder="Örn: admin"
                required
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Şifre</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border-2 border-stone-100 rounded-2xl py-4 px-5 text-sm font-bold text-[#2a1a15] focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 outline-none transition-all placeholder:text-stone-300"
                placeholder="••••••"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 text-xs font-black p-4 rounded-xl text-center animate-shake">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="group relative w-full h-16 bg-[#2a1a15] text-white font-black rounded-2xl transition-all overflow-hidden flex items-center justify-center shadow-xl shadow-stone-200 active:scale-95 uppercase tracking-widest text-xs"
            >
              <div className="absolute inset-0 bg-amber-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <span className="relative z-10 flex items-center gap-2">
                Sisteme Giriş Yap
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
          </form>
          
          <p className="mt-8 text-center text-stone-400 text-[10px] font-bold uppercase tracking-widest">
            © 2024 Cafe POS Automation
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
