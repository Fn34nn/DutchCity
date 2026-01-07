import React, { useState, useEffect } from 'react';
import { DutchCity, AppLanguage } from '../types';

interface CitySearchProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  onSearch: () => void;
  searchResults: DutchCity | null;
  onSaveCity: (city: DutchCity) => void;
  loading: boolean;
  appLanguage: AppLanguage;
}

const CitySearch: React.FC<CitySearchProps> = ({
  searchTerm,
  onSearchTermChange,
  searchResults,
  onSaveCity,
  appLanguage,
}) => {
  const [localInput, setLocalInput] = useState(searchTerm);

  useEffect(() => {
    setLocalInput(searchTerm);
  }, [searchTerm]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocalInput(val);
    onSearchTermChange(val);
  };

  const t = {
    [AppLanguage.ENGLISH]: {
      placeholder: "Search for a Dutch city...",
      save: "Add to List",
      found: "Found:",
      noResults: "No city found."
    },
    [AppLanguage.DUTCH]: {
      placeholder: "Zoek een Nederlandse stad...",
      save: "Toevoegen",
      found: "Gevonden:",
      noResults: "Geen stad gevonden."
    }
  }[appLanguage];

  return (
    <div className="w-full relative group">
      <div className="relative flex items-center transition-all duration-300">
        <input
          type="text"
          className="w-full bg-[#f4f4f4] dark:bg-[#2f2f2f] border-0 rounded-[26px] py-4 pl-6 pr-14 text-[16px] text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-300 dark:focus:ring-slate-600 shadow-sm transition-shadow"
          placeholder={t.placeholder}
          value={localInput}
          onChange={handleChange}
        />
        <button 
           className={`absolute right-3 p-2 rounded-full transition-all duration-200 ${
             localInput 
               ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md hover:scale-105' 
               : 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
           }`}
           disabled={!localInput}
        >
           <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" />
           </svg>
        </button>
      </div>

      {/* Result Card - Floating above */}
      <div className={`absolute bottom-full left-0 w-full mb-3 transition-all duration-300 origin-bottom ${searchResults && localInput ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-2 pointer-events-none'}`}>
         {searchResults && (
           <div className="bg-white dark:bg-[#2f2f2f] rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700/50 p-4 flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white truncate">
                       {searchResults.name}
                    </h3>
                    {searchResults.province && (
                      <span className="shrink-0 text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
                        {searchResults.province}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1">
                     {searchResults.description}
                  </p>
              </div>
              <button 
                onClick={() => onSaveCity(searchResults)}
                className="shrink-0 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-slate-900/10"
              >
                {t.save}
              </button>
           </div>
         )}
      </div>
    </div>
  );
};

export default CitySearch;