import React, { useState } from 'react';
import { AppLanguage } from '../types';

interface VersionButtonProps {
  version: string;
  appLanguage: AppLanguage;
  onToggleBeta: (lang: AppLanguage) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

const VersionButton: React.FC<VersionButtonProps> = ({ 
  version, 
  appLanguage, 
  onToggleBeta, 
  darkMode, 
  onToggleDarkMode 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Custom Toggle Switch Component
  const ToggleSwitch = ({ isOn, onToggle }: { isOn: boolean; onToggle: () => void }) => (
    <div 
      onClick={onToggle}
      className={`w-12 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${isOn ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-600'}`}
      role="switch"
      aria-checked={isOn}
    >
      <div 
        className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ease-spring ${isOn ? 'translate-x-5' : 'translate-x-0'}`}
      />
    </div>
  );

  return (
    <div className="fixed top-6 right-6 z-50">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-xs font-bold text-slate-600 dark:text-slate-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
      >
        v{version}
      </button>

      {isOpen && (
        <>
          {/* Backdrop to close */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          
          <div className="absolute top-12 right-0 w-64 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl shadow-2xl p-5 flex flex-col gap-4 z-50 animate-slide-up origin-top-right">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-700">
              <span className="text-sm font-bold text-slate-800 dark:text-white">Settings</span>
            </div>
            
            {/* Dark Mode Toggle */}
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Dark Mode</span>
                <span className="text-[10px] text-slate-400">Easy on the eyes</span>
              </div>
              <ToggleSwitch 
                isOn={darkMode} 
                onToggle={onToggleDarkMode} 
              />
            </div>

            {/* Beta Language Toggle */}
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Dutch Beta</span>
                <span className="text-[10px] text-slate-400">Translate UI</span>
              </div>
              <ToggleSwitch 
                isOn={appLanguage === AppLanguage.DUTCH} 
                onToggle={() => onToggleBeta(appLanguage === AppLanguage.ENGLISH ? AppLanguage.DUTCH : AppLanguage.ENGLISH)} 
              />
            </div>

            <div className="text-[10px] text-center text-slate-400 mt-2 font-medium">
              CityNotetaker v{version}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default VersionButton;