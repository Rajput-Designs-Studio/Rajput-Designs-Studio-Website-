import React from 'react';
import FadeIn from './FadeIn.jsx';

function ServiceCard({ service, index }) {
  return (
    <FadeIn delay={index * 0.1} y={30}>
      <div
        className="flex flex-row gap-5 sm:gap-8 md:gap-12 py-6 sm:py-10 md:py-12 border-l-2 border-[hsl(var(--primary))] pl-5 sm:pl-8 mb-6 rounded-r-2xl hover:bg-[hsla(var(--primary)/0.08)] transition-colors duration-300 group items-center"
        style={{
          borderBottom: '1px solid hsla(var(--primary) / 0.2)'
        }}
      >
        <div
          className="text-[hsl(var(--primary))] text-glow-cyan font-black flex-shrink-0 group-hover:scale-105 transition-transform duration-300 origin-left"
          style={{ fontSize: 'clamp(2rem, 8vw, 120px)', lineHeight: 0.85 }}
        >
          {service.number}
        </div>

        <div className="flex flex-col gap-3 justify-center">
          <h3
            className="text-white font-semibold uppercase tracking-wide group-hover:text-[hsl(var(--primary))] transition-colors"
            style={{ fontSize: 'clamp(1rem, 2.5vw, 2rem)' }}
          >
            {service.name}
          </h3>
          <p
            className="text-[#85B7EB] font-light leading-relaxed max-w-3xl opacity-90"
            style={{ fontSize: 'clamp(0.95rem, 1.6vw, 1.15rem)' }}
          >
            {service.description}
          </p>
        </div>
      </div>
    </FadeIn>
  );
}
export default ServiceCard;