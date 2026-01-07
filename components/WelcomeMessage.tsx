import React, { useEffect, useState } from 'react';

const WelcomeMessage: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    // Fade out after 2.5 seconds
    const timer = setTimeout(() => setOpacity(0), 2000);
    // Unmount after fade
    const closeTimer = setTimeout(onClose, 2500);
    return () => { clearTimeout(timer); clearTimeout(closeTimer); };
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-neutral-900 transition-colors duration-700 pointer-events-none"
      style={{ opacity, transitionProperty: 'opacity, background-color' }}
    >
      <div className="relative group">
        <div className="absolute -inset-[1px] bg-gradient-to-r from-gray-200 to-gray-400 dark:from-gray-700 dark:to-gray-800 rounded-3xl blur-[2px]"></div>
        
        <div className="relative px-12 py-8 bg-white dark:bg-[#212121] rounded-3xl flex flex-col items-center justify-center shadow-2xl border border-gray-100 dark:border-gray-800">
          <div className="text-center">
             <h1 className="text-6xl font-black text-gray-900 dark:text-white tracking-tighter mb-2">
              V2.5
            </h1>
            <p className="text-gray-500 dark:text-gray-400 font-bold tracking-[0.2em] text-[10px] uppercase">Sidebar & Focus Update</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;