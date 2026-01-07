import React, { useState } from 'react';
import { AppLanguage, DutchCity } from '../types';

interface WeatherProps {
  appLanguage: AppLanguage;
  currentCity?: DutchCity | null;
}

const StaleWeatherSnapshot: React.FC<WeatherProps> = ({ appLanguage, currentCity }) => {
  const [data, setData] = useState<string | null>(null);

  const t = {
    [AppLanguage.ENGLISH]: {
      title: "Weather",
      desc: "Check local forecast."
    },
    [AppLanguage.DUTCH]: {
      title: "Het Weer",
      desc: "Bekijk de weersverwachting."
    }
  }[appLanguage];

  const check = () => {
    const name = currentCity ? currentCity.name : "Netherlands";
    setData(`${name}: 18°C ⛅`);
  };

  return (
    <div 
        onClick={check}
        className="group cursor-pointer bg-white dark:bg-[#2f2f2f] hover:bg-slate-50 dark:hover:bg-[#383838] border border-slate-200 dark:border-slate-700 rounded-2xl p-4 transition-all duration-200 flex flex-col justify-between h-32 w-full"
    >
        <div className="flex justify-between items-start">
             <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
             </div>
        </div>
        <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1">{t.title}</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 leading-relaxed">
                {data || t.desc}
            </p>
        </div>
    </div>
  );
};

export default StaleWeatherSnapshot;