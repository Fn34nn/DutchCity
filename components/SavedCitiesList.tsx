import React from 'react';
import { DutchCity, AppLanguage } from '../types';

interface SavedCitiesListProps {
  savedCities: DutchCity[];
  onSelectCity: (id: string) => void;
  onDeleteCity: (id: string, e: React.MouseEvent) => void;
  selectedCityId: string | null;
  appLanguage: AppLanguage;
  deletingCityId: string | null;
  darkMode: boolean;
}

const SavedCitiesList: React.FC<SavedCitiesListProps> = ({
  savedCities,
  onSelectCity,
  onDeleteCity,
  selectedCityId,
  darkMode,
}) => {
  
  return (
    <div className="space-y-0.5">
      {savedCities.map((city) => {
        const isActive = selectedCityId === city.id;
        return (
          <div
            key={city.id}
            onClick={() => onSelectCity(city.id)}
            className={`
              group relative flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer text-sm transition-all duration-200
              ${isActive 
                ? (darkMode ? 'bg-[#2f2f2f] text-white' : 'bg-slate-100 text-slate-900') 
                : (darkMode ? 'text-slate-400 hover:bg-[#212121] hover:text-slate-200' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900')
              }
            `}
          >
            <div className="flex items-center gap-3 truncate pr-2">
              <span className="truncate font-medium">{city.name}</span>
            </div>
            
            <button 
              onClick={(e) => onDeleteCity(city.id, e)}
              className={`
                p-1.5 rounded-md transition-all duration-200
                ${isActive 
                   ? 'opacity-100 text-slate-400 hover:text-red-500 hover:bg-slate-200 dark:hover:bg-slate-700' 
                   : 'opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 hover:bg-slate-200 dark:hover:bg-slate-700'
                }
              `}
              aria-label="Remove"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default SavedCitiesList;