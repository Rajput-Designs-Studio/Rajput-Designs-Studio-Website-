import React from 'react';
import { Phone, Mail, Globe, Linkedin, Instagram } from 'lucide-react';
import BaseModal from './BaseModal.jsx';
import FadeIn from './FadeIn.jsx';

function ContactModal() {
  return (
    <BaseModal id="contact" title="Get in Touch">
      <div className="flex flex-col items-center justify-center min-h-[50vh] py-10">
        <FadeIn delay={0} y={20} className="text-center mb-12">
          <p className="text-white opacity-80 font-light max-w-xl mx-auto text-lg sm:text-xl leading-relaxed">
            Ready to elevate your brand's visual identity? Reach out today to discuss your next big project and let's craft something unforgettable together.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          <ContactLink 
            icon={Mail} 
            label="Email Address" 
            value="RajputDesigns.Studio@gmail.com" 
            href="mailto:RajputDesigns.Studio@gmail.com" 
            delay={0.1}
          />
          <ContactLink 
            icon={Phone} 
            label="Phone Number" 
            value="+92 336 5843243" 
            href="tel:+923365843243" 
            delay={0.2}
          />
          <ContactLink 
            icon={Globe} 
            label="Portfolio" 
            value="behance.net/RajputDesigns" 
            href="https://www.behance.net/RajputDesigns" 
            delay={0.3}
          />
          <ContactLink 
            icon={Linkedin} 
            label="LinkedIn" 
            value="linkedin.com/in/rajputdesigns" 
            href="https://www.linkedin.com/in/rajputdesigns/" 
            delay={0.4}
          />
          <div className="md:col-span-2 flex justify-center">
             <ContactLink 
              icon={Instagram} 
              label="Instagram" 
              value="@RajputDesignsStudio" 
              href="https://instagram.com/RajputDesignsStudio" 
              delay={0.5}
            />
          </div>
        </div>
      </div>
    </BaseModal>
  );
}

function ContactLink({ icon: Icon, label, value, href, delay }) {
  return (
    <FadeIn delay={delay} y={20}>
      <a 
        href={href} 
        target="_blank" 
        rel="noreferrer" 
        className="flex items-center gap-5 p-5 rounded-2xl glass-panel group hover:bg-[hsla(var(--primary)/0.1)] transition-all duration-300 w-full"
      >
        <div className="w-14 h-14 rounded-full flex items-center justify-center bg-[hsla(var(--primary)/0.05)] border border-[hsla(var(--primary)/0.2)] group-hover:glow-cyan-subtle transition-all flex-shrink-0">
          <Icon className="w-6 h-6 text-[hsl(var(--primary))]" />
        </div>
        <div className="flex flex-col overflow-hidden">
          <span className="text-[hsl(var(--primary))] text-sm font-semibold uppercase tracking-wider mb-1">{label}</span>
          <span className="text-white font-light text-base sm:text-lg truncate">{value}</span>
        </div>
      </a>
    </FadeIn>
  );
}

export default ContactModal;