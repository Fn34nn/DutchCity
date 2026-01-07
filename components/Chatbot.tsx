import React, { useState, useRef, useEffect } from 'react';
import { AppLanguage, DutchCity, ChatMessage } from '../types';

interface ChatbotProps {
  appLanguage: AppLanguage;
  currentCity?: DutchCity | null;
}

const Chatbot: React.FC<ChatbotProps> = ({ appLanguage, currentCity }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  const t = {
    [AppLanguage.ENGLISH]: {
      button: "Assistant",
      header: "Assistant",
      initial: "Hi! Ask me anything about Dutch cities.",
      questions: {
        pop: "Population",
        area: "Land Area",
        fun: "Fun Fact",
        time: "Time"
      },
      answers: {
        pop: (c: string) => `${c} has a vibrant population.`,
        area: (c: string) => `${c} covers a beautiful area.`,
        fun: (c: string) => `${c} is rich in Dutch history!`,
        time: () => `It is ${new Date().toLocaleTimeString()}.`
      }
    },
    [AppLanguage.DUTCH]: {
      button: "Assistent",
      header: "Assistent",
      initial: "Hoi! Vraag me iets over steden.",
      questions: {
        pop: "Bevolking",
        area: "Oppervlakte",
        fun: "Weetje",
        time: "Tijd"
      },
      answers: {
        pop: (c: string) => `${c} heeft een levendige bevolking.`,
        area: (c: string) => `${c} beslaat een prachtig gebied.`,
        fun: (c: string) => `${c} is rijk aan geschiedenis!`,
        time: () => `Het is ${new Date().toLocaleTimeString()}.`
      }
    }
  }[appLanguage];

  const toggleOpen = () => setIsOpen(!isOpen);

  const addMsg = (text: string, sender: 'user' | 'chatbot') => {
    setChatHistory(prev => [...prev, { id: Date.now().toString(), sender, text }]);
  };

  const handleAsk = (type: 'pop' | 'area' | 'fun' | 'time') => {
    const qText = t.questions[type];
    addMsg(qText, 'user');

    setTimeout(() => {
      let ans = "";
      if (type === 'time') {
        ans = (t.answers.time as () => string)();
      } else {
        const city = currentCity ? currentCity.name : (appLanguage === AppLanguage.ENGLISH ? "The Netherlands" : "Nederland");
        ans = (t.answers[type] as (c: string) => string)(city);
      }
      addMsg(ans, 'chatbot');
    }, 400); // Slightly longer delay for natural feel
  };

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTo({
        top: chatWindowRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [chatHistory, isOpen]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-5 w-[350px] h-[500px] bg-white dark:bg-slate-900/95 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] flex flex-col overflow-hidden animate-slide-up origin-bottom-right ring-1 ring-slate-900/5 dark:ring-white/10">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-5 flex justify-between items-center text-white shadow-md z-10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm tracking-wide">{t.header}</span>
                <span className="text-[10px] text-indigo-100 font-medium opacity-80 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span> Online
                </span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors text-white/90"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Chat Body */}
          <div ref={chatWindowRef} className="flex-1 p-5 overflow-y-auto space-y-4 bg-slate-50/50 dark:bg-transparent">
            {chatHistory.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-3 opacity-0 animate-[fadeIn_0.5s_ease-out_0.2s_forwards]">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-2xl flex items-center justify-center mb-2">
                    <span className="text-3xl">👋</span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 font-medium text-sm max-w-[200px] leading-relaxed">
                    {t.initial}
                  </p>
              </div>
            )}
            {chatHistory.map((msg, idx) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-[slideUp_0.3s_ease-out_forwards]`}>
                <div 
                  className={`max-w-[85%] px-5 py-3 text-sm font-medium shadow-sm ${
                    msg.sender === 'user' 
                      ? 'bg-gradient-to-br from-indigo-600 to-indigo-700 text-white rounded-[1.25rem] rounded-tr-sm' 
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-[1.25rem] rounded-tl-sm border border-slate-100 dark:border-slate-700'
                  }`}
                  style={{ overflowWrap: 'break-word' }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 z-10">
            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3 px-1">Suggested</p>
            <div className="grid grid-cols-2 gap-2.5">
              {(['pop', 'area', 'fun', 'time'] as const).map(k => (
                <button
                  key={k}
                  onClick={() => handleAsk(k)}
                  className="text-xs bg-slate-50 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 font-semibold py-2.5 px-3 rounded-xl transition-all border border-slate-100 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-800 active:scale-95 text-left"
                >
                  {t.questions[k]}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <button
        onClick={toggleOpen}
        className={`h-16 w-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-105 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center z-50 ${isOpen ? 'rotate-90 scale-90 opacity-0 pointer-events-none absolute' : 'opacity-100'}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>

      {/* Floating Close Button when open, to allow closing without reaching top */}
      <button
         onClick={() => setIsOpen(false)}
         className={`h-14 w-14 rounded-full bg-slate-800 text-white shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center z-50 ${!isOpen ? 'scale-0 opacity-0 pointer-events-none absolute' : 'opacity-100 rotate-0'}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
  );
};

export default Chatbot;