import React, { useState, useEffect, useCallback } from 'react';
import { DutchCity, AppSection, AppLanguage } from './types';
import { dutchCities } from './data/dutchCities';
import CitySearch from './components/CitySearch';
import SavedCitiesList from './components/SavedCitiesList';
import CityNotes from './components/CityNotes';
import WelcomeMessage from './components/WelcomeMessage'; 
import RandomFactGenerator from './components/RandomFactGenerator';
import StaleWeatherSnapshot from './components/StaleWeatherSnapshot'; 
import LocalEventRadar from './components/LocalEventRadar'; 
import Chatbot from './components/Chatbot';

const LOCAL_STORAGE_KEY = 'dutchCityV2';
const APP_VERSION = '2.5.2';

function App() {
  const [savedCities, setSavedCities] = useState<DutchCity[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<DutchCity | null>(null);
  const [appLanguage, setAppLanguage] = useState<AppLanguage>(AppLanguage.ENGLISH);
  const [showIntro, setShowIntro] = useState(true);
  const [selectedCityId, setSelectedCityId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const [darkMode, setDarkMode] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) setSavedCities(JSON.parse(stored));
    
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedCities));
  }, [savedCities]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResults(null);
      return;
    }
    const term = searchTerm.toLowerCase();
    const found = dutchCities.find(c => 
      c.name.toLowerCase().includes(term) || 
      (c.dutchName && c.dutchName.toLowerCase().includes(term))
    );
    setSearchResults(found || null);
  }, [searchTerm]);

  const addCity = useCallback((city: DutchCity) => {
    if (!savedCities.some(c => c.id === city.id)) {
      setSavedCities(prev => [city, ...prev]);
      setSearchTerm(''); 
      setSelectedCityId(city.id);
    }
  }, [savedCities]);

  const deleteCity = useCallback((id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedCities(prev => prev.filter(c => c.id !== id));
    if (selectedCityId === id) {
      setSelectedCityId(null);
    }
  }, [selectedCityId]);

  const updateNotes = useCallback((id: string, notes: string) => {
    setSavedCities(prev => prev.map(c => c.id === id ? { ...c, notes } : c));
  }, []);

  const handleNewSearch = () => {
    setSelectedCityId(null);
    setSearchTerm('');
    setSearchResults(null);
    if (window.innerWidth < 768) setSidebarOpen(false);
  };

  const selectedCity = selectedCityId ? savedCities.find(c => c.id === selectedCityId) : null;

  const toggleSettings = () => setShowSettings(!showSettings);

  const t = {
    [AppLanguage.ENGLISH]: {
      newSearch: "New Search",
      history: "Library",
      settings: "Settings",
      emptyHistory: "Your list is empty.",
      introTitle: "Where to next?",
      darkMode: "Dark Mode",
      language: "Dutch Beta",
    },
    [AppLanguage.DUTCH]: {
      newSearch: "Nieuwe Zoekopdracht",
      history: "Bibliotheek",
      settings: "Instellingen",
      emptyHistory: "Lijst is leeg.",
      introTitle: "Waar gaat de reis heen?",
      darkMode: "Donkere Modus",
      language: "Nederlands Beta",
    }
  }[appLanguage];

  return (
    // Usage of h-[100dvh] ensures perfect full height on mobile browsers (Safari iOS) where address bar shifts layout
    <div className={`flex h-screen supports-[height:100dvh]:h-[100dvh] font-sans overflow-hidden transition-colors duration-500 relative ${darkMode ? 'bg-[#212121] text-gray-100' : 'bg-[#fafafa] text-gray-800'}`}>
        
        {/* Ambient Background Effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className={`absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] opacity-20 animate-pulse-slow ${darkMode ? 'bg-indigo-900' : 'bg-indigo-200'}`}></div>
          <div className={`absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[100px] opacity-20 animate-pulse-slow ${darkMode ? 'bg-purple-900' : 'bg-purple-200'}`} style={{ animationDelay: '2s' }}></div>
        </div>

        {showIntro && <WelcomeMessage onClose={() => setShowIntro(false)} />}

        {/* SIDEBAR */}
        <div className={`
          ${sidebarOpen ? 'translate-x-0 w-[280px]' : '-translate-x-full w-0'} 
          fixed md:relative z-40 h-full flex flex-col transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]
          ${darkMode ? 'bg-[#171717]/80 backdrop-blur-xl border-r border-white/5' : 'bg-white/80 backdrop-blur-xl border-r border-gray-200/60'}
        `}>
          {/* New Search Button */}
          <div className="p-4 pt-6">
            <button 
              onClick={handleNewSearch}
              className={`
                group w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 shadow-sm
                ${darkMode 
                  ? 'bg-[#262626] hover:bg-[#333] text-white border border-white/5' 
                  : 'bg-white hover:bg-gray-50 text-gray-800 border border-gray-200'}
              `}
            >
              <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${darkMode ? 'border-gray-500 group-hover:border-white' : 'border-gray-400 group-hover:border-gray-900'}`}>
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <span>{t.newSearch}</span>
            </button>
          </div>

          {/* Saved Cities List */}
          <div className="flex-1 overflow-y-auto px-4 py-2 custom-scrollbar">
            <div className={`text-[10px] uppercase tracking-widest font-bold mb-3 px-2 opacity-50 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {t.history}
            </div>
            
            <SavedCitiesList 
              savedCities={savedCities}
              onSelectCity={(id) => { setSelectedCityId(id); if (window.innerWidth < 768) setSidebarOpen(false); }}
              onDeleteCity={deleteCity}
              selectedCityId={selectedCityId}
              appLanguage={appLanguage}
              deletingCityId={null}
              darkMode={darkMode}
            />
            
            {savedCities.length === 0 && (
              <div className={`px-2 text-sm italic opacity-50 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                {t.emptyHistory}
              </div>
            )}
          </div>

          {/* Settings Footer */}
          <div className={`p-4 mt-auto z-20 ${darkMode ? 'border-t border-white/5' : 'border-t border-gray-200/60'}`}>
             <div className="relative">
                <button 
                  onClick={toggleSettings}
                  className={`w-full flex items-center gap-3 px-2 py-2 rounded-lg text-sm transition-colors ${darkMode ? 'hover:bg-[#262626] text-gray-300 hover:text-white' : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'}`}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-purple-500/20">
                    CN
                  </div>
                  <div className="flex-1 text-left font-medium">CityNotetaker</div>
                  <svg className={`w-4 h-4 transition-transform duration-300 ${showSettings ? 'rotate-180' : ''} opacity-50`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </button>

                {showSettings && (
                  <div className={`absolute bottom-full left-0 w-full mb-3 rounded-2xl border shadow-2xl overflow-hidden animate-slide-up ${darkMode ? 'bg-[#262626] border-white/5 shadow-black/50' : 'bg-white border-gray-100 shadow-gray-200'}`}>
                    <div className="p-1.5 space-y-0.5">
                      <button 
                        onClick={() => setDarkMode(!darkMode)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-colors ${darkMode ? 'hover:bg-white/5 text-gray-200' : 'hover:bg-gray-50 text-gray-700'}`}
                      >
                         <span>{t.darkMode}</span>
                         <div className={`w-10 h-6 rounded-full relative transition-colors duration-300 ${darkMode ? 'bg-indigo-600' : 'bg-slate-300'}`}>
                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 shadow-sm ${darkMode ? 'left-5' : 'left-1'}`}></div>
                         </div>
                      </button>
                      <button 
                         onClick={() => setAppLanguage(appLanguage === AppLanguage.ENGLISH ? AppLanguage.DUTCH : AppLanguage.ENGLISH)}
                         className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-colors ${darkMode ? 'hover:bg-white/5 text-gray-200' : 'hover:bg-gray-50 text-gray-700'}`}
                      >
                         <span>{t.language}</span>
                         <div className={`w-10 h-6 rounded-full relative transition-colors duration-300 ${appLanguage === AppLanguage.DUTCH ? 'bg-indigo-600' : 'bg-slate-300'}`}>
                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 shadow-sm ${appLanguage === AppLanguage.DUTCH ? 'left-5' : 'left-1'}`}></div>
                         </div>
                      </button>
                    </div>
                  </div>
                )}
             </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 flex flex-col relative h-full w-full z-10">
            
            {/* Mobile Header */}
            <div className={`md:hidden flex items-center p-4 border-b ${darkMode ? 'border-white/5 bg-[#212121]/90 backdrop-blur' : 'border-gray-200/60 bg-white/90 backdrop-blur'}`}>
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="mr-4 p-1">
                 <svg className={`w-6 h-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                 </svg>
              </button>
              <h1 className="font-semibold text-lg tracking-tight">CityNotetaker</h1>
            </div>

            <main className="flex-1 overflow-y-auto w-full relative">
              {!selectedCity ? (
                // SEARCH VIEW
                <div className="min-h-full flex flex-col items-center justify-center p-4 md:p-8">
                  
                  <div className="w-full max-w-2xl flex flex-col items-center animate-fade-in">
                      <div className="relative group mb-8">
                          <div className={`absolute inset-0 rounded-full blur-xl opacity-50 ${darkMode ? 'bg-indigo-500' : 'bg-indigo-300'} animate-pulse`}></div>
                          <div className="relative w-20 h-20 rounded-full bg-white dark:bg-[#333] shadow-xl flex items-center justify-center border border-white/10">
                              <span className="text-4xl">🇳🇱</span>
                          </div>
                      </div>
                      
                      <h2 className={`text-3xl md:text-5xl font-bold mb-3 text-center tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                        {t.introTitle}
                      </h2>
                      <p className={`mb-10 text-center ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        {APP_VERSION} &middot; GitHub Ready
                      </p>

                      {/* Suggestion Chips */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full mb-8">
                          <RandomFactGenerator appLanguage={appLanguage} currentCity={searchResults} />
                          <StaleWeatherSnapshot appLanguage={appLanguage} currentCity={searchResults} />
                          <LocalEventRadar appLanguage={appLanguage} currentCity={searchResults} />
                          {/* Placeholder Chip for symmetry */}
                          <div className="hidden md:flex flex-col justify-between p-4 rounded-2xl border border-dashed border-slate-300 dark:border-white/10 h-32 items-center justify-center text-slate-400 dark:text-slate-600 hover:border-slate-400 transition-colors cursor-default">
                             <span className="text-xs font-medium">More soon</span>
                          </div>
                      </div>

                      {/* Search Bar */}
                      <div className="w-full relative z-20">
                        <CitySearch 
                            searchTerm={searchTerm}
                            onSearchTermChange={setSearchTerm}
                            onSearch={() => {}} 
                            searchResults={searchResults}
                            onSaveCity={addCity}
                            loading={false}
                            appLanguage={appLanguage}
                        />
                      </div>
                  </div>

                </div>
              ) : (
                // NOTES VIEW
                <div className="h-full">
                  <CityNotes 
                    city={selectedCity}
                    onSaveNotes={updateNotes}
                    onBack={() => setSelectedCityId(null)}
                    appLanguage={appLanguage}
                  />
                </div>
              )}
            </main>
        </div>

        <Chatbot appLanguage={appLanguage} currentCity={selectedCity || searchResults} />
    </div>
  );
}

export default App;