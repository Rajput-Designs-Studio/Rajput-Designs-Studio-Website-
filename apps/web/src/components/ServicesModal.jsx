import React from 'react';
import BaseModal from './BaseModal.jsx';
import FadeIn from './FadeIn.jsx';

const services = [
  {
    number: '01',
    name: 'Graphic Design',
    description: 'Creating visually compelling designs for marketing materials, branding, and digital assets that communicate brand identity and engage audiences.'
  },
  {
    number: '02',
    name: 'Motion Graphics',
    description: 'Dynamic animations and motion graphics that add energy and storytelling to digital experiences and marketing campaigns.'
  },
  {
    number: '03',
    name: 'Adobe Creative Suite',
    description: 'Expert proficiency in Photoshop, Illustrator, and InDesign for professional print and digital design work.'
  },
  {
    number: '04',
    name: 'Figma Design',
    description: 'Modern UI/UX design and prototyping using Figma for web and app interfaces with attention to user experience.'
  },
  {
    number: '05',
    name: 'Print Design',
    description: 'Professional print design including branding materials, proposals, and marketing collateral for high-stakes projects.'
  }
];

function ServicesModal() {
  return (
    <BaseModal id="services" title="My Services">
      <div className="max-w-4xl mx-auto py-8">
        {services.map((service, index) => (
          <FadeIn key={service.number} delay={index * 0.1} y={30}>
            <div
              className="flex flex-col sm:flex-row gap-6 sm:gap-8 md:gap-12 py-8 border-l-2 border-[hsl(var(--primary))] pl-6 sm:pl-8 mb-6 rounded-r-2xl hover:bg-[hsla(var(--primary)/0.05)] transition-colors duration-300"
              style={{ borderBottom: '1px solid hsla(var(--primary)/0.1)' }}
            >
              <div
                className="text-[hsl(var(--primary))] text-glow-cyan font-black flex-shrink-0"
                style={{ fontSize: 'clamp(3rem, 8vw, 100px)', lineHeight: 0.9 }}
              >
                {service.number}
              </div>

              <div className="flex flex-col gap-3 justify-center">
                <h3
                  className="text-white font-medium uppercase tracking-wide"
                  style={{ fontSize: 'clamp(1.2rem, 2vw, 1.8rem)' }}
                >
                  {service.name}
                </h3>
                <p
                  className="text-white font-light leading-relaxed opacity-80"
                  style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)' }}
                >
                  {service.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </BaseModal>
  );
}

export default ServicesModal;