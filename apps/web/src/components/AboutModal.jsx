import React from 'react';
import BaseModal from './BaseModal.jsx';
import AnimatedText from './AnimatedText.jsx';
import FadeIn from './FadeIn.jsx';
import ContactButton from './ContactButton.jsx';
import { useModal } from '@/context/ModalContext.jsx';

function AboutModal() {
  const { openModal } = useModal();

  return (
    <BaseModal id="about" title="About Me">
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-10 sm:gap-14 relative z-10 py-10">
        <AnimatedText
          text="Dynamic Graphic Designer with 1+ years of experience specializing in translating complex content into compelling marketing and proposal materials. Expert in Adobe Creative Suite and Figma, with a proven track record of delivering high-stakes print and digital assets for international audiences."
          className="text-[#FFFFFF] font-medium text-center leading-relaxed max-w-[750px]"
          style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)' }}
        />
        
        <div className="flex flex-col sm:flex-row gap-8 items-center mt-8 w-full max-w-3xl justify-center">
          <FadeIn delay={0.2} x={-30} y={0} className="glass-panel p-6 rounded-2xl w-full sm:w-1/2 text-center flex flex-col items-center gap-4 hover:bg-[hsla(var(--primary)/0.1)] transition-colors">
             <img
                src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
                alt="Vision"
                className="w-20 h-20 object-contain drop-shadow-lg"
              />
              <h3 className="text-xl font-bold uppercase text-[hsl(var(--primary))]">Vision</h3>
              <p className="text-sm font-light opacity-80">To transform ideas into striking visual realities that resonate globally.</p>
          </FadeIn>
          
          <FadeIn delay={0.4} x={30} y={0} className="glass-panel p-6 rounded-2xl w-full sm:w-1/2 text-center flex flex-col items-center gap-4 hover:bg-[hsla(var(--primary)/0.1)] transition-colors">
              <img
                src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
                alt="Building"
                className="w-20 h-20 object-contain drop-shadow-lg"
              />
              <h3 className="text-xl font-bold uppercase text-[hsl(var(--primary))]">Approach</h3>
              <p className="text-sm font-light opacity-80">Combining strategic thinking with pixel-perfect execution.</p>
          </FadeIn>
        </div>

        <div className="mt-8" onClick={() => openModal('contact')}>
          <ContactButton />
        </div>
      </div>
    </BaseModal>
  );
}

export default AboutModal;