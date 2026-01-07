import React, { useState, useEffect } from 'react';
import { DutchCity, AppLanguage } from '../types';

interface CityNotesProps {
  city: DutchCity;
  onSaveNotes: (id: string, notes: string) => void;
  onBack: () => void;
  appLanguage: AppLanguage;
}

const CityNotes: React.FC<CityNotesProps> = ({ city, onSaveNotes, appLanguage }) => {
  const [currentNotes, setCurrentNotes] = useState(city.notes);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  useEffect(() => {
    setCurrentNotes(city.notes);
    setSaveStatus('idle');
  }, [city]);

  // Auto-save simulation
  useEffect(() => {
    if (currentNotes !== city.notes) {
      const timer = setTimeout(() => {
        setSaveStatus('saving');
        onSaveNotes(city.id, currentNotes);
        setTimeout(() => setSaveStatus('saved'), 500);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentNotes, city.id, onSaveNotes, city.notes]);

  const t = {
    [AppLanguage.ENGLISH]: {
      placeholder: "Start writing your notes here...",
      status: {
        idle: "Saved",
        saving: "Saving...",
        saved: "All changes saved"
      }
    },
    [AppLanguage.DUTCH]: {
      placeholder: "Begin hier met schrijven...",
      status: {
        idle: "Opgeslagen",
        saving: "Opslaan...",
        saved: "Wijzigingen opgeslagen"
      }
    }
  }[appLanguage];

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto w-full animate-fade-in">
      {/* Header Section */}
      <div className="px-8 pt-10 pb-6">
        <div className="flex items-center gap-3 mb-2">
           <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">{city.name}</h2>
           {city.province && (
              <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                {city.province}
              </span>
           )}
        </div>
        
        {city.description && (
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            {city.description}
          </p>
        )}
      </div>

      {/* Editor Surface */}
      <div className="flex-1 px-8 pb-8 flex flex-col">
         <div className="flex-1 bg-white dark:bg-[#1e1e1e] rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-white/5 flex flex-col relative overflow-hidden group">
            
            {/* Status Indicator */}
            <div className="absolute top-4 right-6 text-xs font-medium text-slate-300 dark:text-slate-600 transition-colors">
              {t.status[saveStatus]}
            </div>

            <textarea
              className="flex-grow w-full h-full bg-transparent border-none focus:ring-0 text-slate-800 dark:text-slate-200 leading-7 placeholder-slate-300 dark:placeholder-slate-600 resize-none text-lg p-0 font-medium"
              placeholder={t.placeholder}
              value={currentNotes}
              onChange={(e) => setCurrentNotes(e.target.value)}
              spellCheck={false}
            />
         </div>
      </div>
    </div>
  );
};

export default CityNotes;