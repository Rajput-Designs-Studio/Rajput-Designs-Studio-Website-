import React from 'react';

function ContactButton() {
  return (
    <button
      className="rounded-full px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base font-medium uppercase tracking-widest text-white transition-all duration-300 hover:scale-105 active:scale-95 hover:brightness-110"
      style={{
        background: 'linear-gradient(123deg, #00D9FF 7%, #0066FF 100%)',
        boxShadow: '0 0 20px rgba(0, 217, 255, 0.6), 0 0 40px rgba(0, 217, 255, 0.3)',
        outline: '2px solid white',
        outlineOffset: '-3px'
      }}
    >
      Contact Me
    </button>
  );
}

export default ContactButton;