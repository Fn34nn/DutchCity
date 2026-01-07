import React from 'react';

const LiveUserCount: React.FC = () => {
  // Static visual for V2 clean look, or could be real logic. Keeping it static/clean.
  return (
    <div className="fixed top-4 left-4 z-40 flex items-center gap-2 px-3 py-1 bg-white/50 backdrop-blur-md border border-white/50 rounded-full shadow-sm">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
      </span>
      <span className="text-xs font-medium text-slate-600">Online</span>
    </div>
  );
};

export default LiveUserCount;