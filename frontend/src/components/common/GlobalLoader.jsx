import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Global Loader - شاشة تحميل احترافية شفافة (Glassmorphism)
 */
const GlobalLoader = ({ message }) => {
  const { t } = useTranslation();
  
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-emerald-900/40 backdrop-blur-md transition-all duration-500">
      <div className="relative flex items-center justify-center">
        {/* Outer Ring */}
        <div className="w-24 h-24 rounded-full border-4 border-emerald-100/20 border-t-emerald-400 animate-spin"></div>
        
        {/* Inner Pulsing Circle */}
        <div className="absolute w-12 h-12 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_30px_rgba(16,185,129,0.6)]"></div>
      </div>
      
      {message && (
        <p className="mt-8 text-white font-black text-xl tracking-widest animate-bounce">
          {message}
        </p>
      )}
    </div>
  );
};

export default GlobalLoader;
