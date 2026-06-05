import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import BaseModal from './BaseModal.jsx';
import LiveProjectButton from './LiveProjectButton.jsx';

const projects = [
  {
    number: '01',
    category: 'Branding',
    name: 'Brand Identity Revamp',
    images: [
      'https://images.unsplash.com/photo-1495224814653-94f36c0a31ea?w=1280&q=85',
      'https://images.unsplash.com/photo-1695634365024-b7513447e4f0?w=1280&q=85',
      'https://images.unsplash.com/photo-1688760871131-29afc15029ec?w=1280&q=85'
    ],
    link: 'https://www.behance.net/RajputDesigns'
  },
  {
    number: '02',
    category: 'UI/UX Design',
    name: 'Web UI Overhaul',
    images: [
      'https://images.unsplash.com/photo-1695634365024-b7513447e4f0?w=1280&q=85',
      'https://images.unsplash.com/photo-1688760871131-29afc15029ec?w=1280&q=85',
      'https://images.unsplash.com/photo-1495224814653-94f36c0a31ea?w=1280&q=85'
    ],
    link: 'https://www.behance.net/RajputDesigns'
  },
  {
    number: '03',
    category: 'Print & Digital',
    name: 'Marketing Campaign',
    images: [
      'https://images.unsplash.com/photo-1688760871131-29afc15029ec?w=1280&q=85',
      'https://images.unsplash.com/photo-1495224814653-94f36c0a31ea?w=1280&q=85',
      'https://images.unsplash.com/photo-1695634365024-b7513447e4f0?w=1280&q=85'
    ],
    link: 'https://www.linkedin.com/in/rajputdesigns/'
  }
];

function ProjectsModal() {
  const [scrollContainer, setScrollContainer] = useState(null);

  useEffect(() => {
    // Get the scroll container created inside BaseModal
    const container = document.getElementById('projects-scroll-container');
    if (container) setScrollContainer(container);
  }, []);

  return (
    <BaseModal id="projects" title="Featured Projects">
      <div className="max-w-5xl mx-auto pb-32">
        {projects.map((project, index) => (
          <ProjectCard 
            key={project.number} 
            project={project} 
            index={index} 
            totalCards={projects.length} 
            containerRef={scrollContainer}
          />
        ))}
      </div>
    </BaseModal>
  );
}

function ProjectCard({ project, index, totalCards, containerRef }) {
  const ref = useRef(null);
  
  // Conditionally use scroll container if available, otherwise default to window 
  // (though in modal it should use containerRef)
  const scrollOptions = {
    target: ref,
    offset: ['start end', 'start 20%']
  };
  
  if (containerRef) {
    scrollOptions.container = { current: containerRef };
  }
  
  const { scrollYProgress } = useScroll(scrollOptions);

  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div ref={ref} className="min-h-[70vh] flex items-center justify-center relative mb-12" style={{ top: `${index * 20}px` }}>
      <motion.div
        style={{ scale }}
        className="sticky top-10 w-full rounded-[30px] sm:rounded-[40px] glass-panel glow-cyan-inset p-4 sm:p-6 md:p-8 border border-[hsl(var(--primary))] shadow-[0_0_15px_hsla(var(--primary)/0.4)_inset]"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <div
              className="text-[hsl(var(--primary))] text-glow-cyan font-black leading-none"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 80px)' }}
            >
              {project.number}
            </div>

            <div className="flex flex-col">
              <span className="text-white font-light uppercase tracking-wide opacity-80 text-xs sm:text-sm">
                {project.category}
              </span>
              <h3 className="text-white font-bold uppercase text-lg sm:text-2xl md:text-3xl">
                {project.name}
              </h3>
            </div>
          </div>

          <a href={project.link} target="_blank" rel="noreferrer" className="flex-shrink-0">
            <LiveProjectButton />
          </a>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5">
          <div className="flex flex-col gap-3 sm:gap-4 w-full sm:w-2/5">
            <img
              src={project.images[0]}
              alt={`${project.name} preview 1`}
              className="w-full rounded-2xl object-cover border border-[hsla(var(--primary)/0.2)] h-[120px] sm:h-[160px]"
            />
            <img
              src={project.images[1]}
              alt={`${project.name} preview 2`}
              className="w-full rounded-2xl object-cover border border-[hsla(var(--primary)/0.2)] h-[140px] sm:h-[200px]"
            />
          </div>
          <div className="w-full sm:w-3/5">
            <img
              src={project.images[2]}
              alt={`${project.name} preview 3`}
              className="w-full h-[200px] sm:h-full rounded-2xl object-cover border border-[hsla(var(--primary)/0.2)]"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default ProjectsModal;