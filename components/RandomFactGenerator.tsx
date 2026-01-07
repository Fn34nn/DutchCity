import React, { useState } from 'react';
import { AppLanguage, DutchCity } from '../types';
import { dutchCities } from '../data/dutchCities';

interface RandomFactGeneratorProps {
  appLanguage: AppLanguage;
  currentCity?: DutchCity | null;
}

const RandomFactGenerator: React.FC<RandomFactGeneratorProps> = ({ appLanguage, currentCity }) => {
  const [fact, setFact] = useState<string | null>(null);

  const t = {
    [AppLanguage.ENGLISH]: {
      title: "Trivia",
      action: "Learn a fact",
      desc: "Get a random fact about a city."
    },
    [AppLanguage.DUTCH]: {
      title: "Weetjes",
      action: "Leer iets",
      desc: "Krijg een willekeurig feitje."
    }
  }[appLanguage];

  const generate = () => {
    const city = currentCity || dutchCities[Math.floor(Math.random() * dutchCities.length)];
    setFact(appLanguage === AppLanguage.ENGLISH ? `${city.name} is in ${city.province}.` : `${city.name} ligt in ${city.province}.`);
  };

  return (
    <div 
        onClick={generate}
        className="group cursor-pointer bg-white dark:bg-[#2f2f2f] hover:bg-slate-50 dark:hover:bg-[#383838] border border-slate-200 dark:border-slate-700 rounded-2xl p-4 transition-all duration-200 flex flex-col justify-between h-32 w-full"
    >
        <div className="flex justify-between items-start">
             <div className="p-2 rounded-xl bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
             </div>
        </div>
        <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1">{t.title}</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                {fact || t.desc}
            </p>
        </div>
    </div>
  );
};

export default RandomFactGenerator;