import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function ProjectCard({ project, index, totalCards }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start 15%']
  });

  const targetScale = 1 - (totalCards - 1 - index) * 0.04;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  const hasMultipleImages = project.images && project.images.length > 1;
  const displayImage = project.image || (project.images && project.images[0]);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div ref={ref} className="min-h-[500px] sm:min-h-[600px] lg:h-[80vh] flex items-center justify-center relative mb-16" style={{ top: `${index * 30}px` }}>
      <motion.div
        style={{ scale, background: '#F5F9FF', border: '1px solid #B5D4F4' }}
        className="sticky top-24 md:top-32 w-full h-auto lg:h-full max-h-none lg:max-h-[700px] rounded-[30px] sm:rounded-[40px] md:rounded-[50px] overflow-hidden flex flex-col lg:flex-row gap-8 lg:gap-12 transition-colors duration-500"
      >
        {/* Left Content Area */}
        <div className="flex flex-col justify-between w-full lg:w-5/12 h-full z-10 relative p-6 sm:p-8 md:p-12">
          <div>
            <div
              className="text-[hsl(var(--primary))] font-black leading-none mb-6"
              style={{ fontSize: 'clamp(4rem, 10vw, 100px)' }}
            >
              {project.number}
            </div>

            <div className="flex flex-col gap-2 mb-6">
              <span className="text-[hsl(var(--primary))] font-medium uppercase tracking-widest text-xs sm:text-sm">
                {project.category}
              </span>
              <h3 className="text-[#042C53] font-bold uppercase text-2xl sm:text-3xl md:text-4xl leading-tight">
                {project.name}
              </h3>
            </div>

            <p className="text-[#185FA5] font-light leading-relaxed text-sm sm:text-base md:text-lg mb-8 max-w-md">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex flex-col">
                <span className="text-xs text-[#185FA5] opacity-70 uppercase tracking-wider mb-1">Role</span>
                <span className="text-sm text-[#042C53] font-medium">{project.role}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-[#185FA5] opacity-70 uppercase tracking-wider mb-1">Client</span>
                <span className="text-sm text-[#042C53] font-medium">{project.client}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-[#185FA5] opacity-70 uppercase tracking-wider mb-1">Year</span>
                <span className="text-sm text-[#042C53] font-medium">{project.year}</span>
              </div>
            </div>
          </div>

          <button className="self-start px-8 py-3 rounded-full bg-transparent border-2 border-[hsl(var(--primary))] text-[#042C53] font-medium uppercase tracking-wider hover:bg-[hsl(var(--primary))] hover:text-white transition-all duration-300">
            View Project
          </button>
        </div>

        {/* Right Image Area */}
        <div className="w-full lg:w-7/12 h-[300px] lg:h-full relative overflow-hidden group/image">
          {hasMultipleImages ? (
            <div className="h-full w-full relative">
              <div className="overflow-hidden h-full w-full" ref={emblaRef}>
                <div className="flex h-full w-full">
                  {project.images.map((img, i) => (
                    <div className="flex-[0_0_100%] min-w-0 h-full relative" key={i}>
                      <img
                        src={img}
                        alt={`${project.name} slide ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={scrollPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 flex items-center justify-center z-20 text-[#042C53] hover:text-[hsl(var(--primary))] transition-all opacity-100 lg:opacity-0 lg:group-hover/image:opacity-100"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={scrollNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 flex items-center justify-center z-20 text-[#042C53] hover:text-[hsl(var(--primary))] transition-all opacity-100 lg:opacity-0 lg:group-hover/image:opacity-100"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
                {project.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => emblaApi && emblaApi.scrollTo(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      i === selectedIndex
                        ? 'bg-[hsl(var(--primary))] w-6'
                        : 'bg-white/60 hover:bg-white'
                    }`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <img
              src={displayImage}
              alt={project.name}
              className="w-full h-full object-cover group-hover/image:scale-105 transition-transform duration-700 ease-out"
            />
          )}
        </div>
      </motion.div>
    </div>
  );
}
export default ProjectCard;