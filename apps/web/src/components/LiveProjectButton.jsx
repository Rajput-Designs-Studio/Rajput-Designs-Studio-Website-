import React from 'react';

function LiveProjectButton() {
  return (
    <button
      className="rounded-full border-2 border-[#00D9FF] px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base font-medium uppercase tracking-widest text-[#00D9FF] transition-all duration-300 hover:bg-[#00D9FF]/10 active:scale-95"
      style={{
        boxShadow: '0 0 15px rgba(0, 217, 255, 0.4)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 0 25px rgba(0, 217, 255, 0.8)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 217, 255, 0.4)';
      }}
    >
      Live Project
    </button>
  );
}

export default LiveProjectButton;