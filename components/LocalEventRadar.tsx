import React, { useState } from 'react';
import { AppLanguage, DutchCity } from '../types';

interface EventsProps {
  appLanguage: AppLanguage;
  currentCity?: DutchCity | null;
}

const LocalEventRadar: React.FC<EventsProps> = ({ appLanguage, currentCity }) => {
  const [event, setEvent] = useState<string | null>(null);

  const t = {
    [AppLanguage.ENGLISH]: {
      title: "Events",
      desc: "What's happening nearby?"
    },
    [AppLanguage.DUTCH]: {
      title: "Evenementen",
      desc: "Wat is er te doen?"
    }
  }[appLanguage];

  const scan = () => {
    setEvent("Market Day 🥬");
  };

  return (
    <div 
        onClick={scan}
        className="group cursor-pointer bg-white dark:bg-[#2f2f2f] hover:bg-slate-50 dark:hover:bg-[#383838] border border-slate-200 dark:border-slate-700 rounded-2xl p-4 transition-all duration-200 flex flex-col justify-between h-32 w-full"
    >
        <div className="flex justify-between items-start">
             <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
             </div>
        </div>
        <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1">{t.title}</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 leading-relaxed">
                {event || t.desc}
            </p>
        </div>
    </div>
  );
};

export default LocalEventRadar;