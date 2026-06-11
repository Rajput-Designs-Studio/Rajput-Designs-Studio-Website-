import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, ZoomIn, X, ArrowRight } from 'lucide-react';

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
  const allImages = project.images || (project.image ? [project.image] : []);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

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

  // Keyboard + scroll-lock for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    const handle = (e) => {
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowLeft') setLightboxIndex((i) => (i - 1 + allImages.length) % allImages.length);
      if (e.key === 'ArrowRight') setLightboxIndex((i) => (i + 1) % allImages.length);
    };
    document.addEventListener('keydown', handle);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handle);
      document.body.style.overflow = '';
    };
  }, [lightboxOpen, allImages.length]);

  const openLightbox = (i) => { setLightboxIndex(i); setLightboxOpen(true); };

  return (
    <>
      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.95)' }}
          onClick={() => setLightboxOpen(false)}
        >
          {/* Close */}
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all z-10"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Counter */}
          {allImages.length > 1 && (
            <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-white/10 border border-white/20 px-4 py-2 rounded-full text-white text-sm font-bold uppercase tracking-widest">
              {lightboxIndex + 1} / {allImages.length}
            </div>
          )}

          {/* Prev */}
          {allImages.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => (i - 1 + allImages.length) % allImages.length); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:text-[hsl(var(--primary))] hover:bg-white/20 transition-all z-10"
              aria-label="Previous"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>
          )}

          {/* Main image */}
          <div
            className="relative max-w-5xl max-h-[85vh] w-full px-4 sm:px-12 md:px-20"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              key={lightboxIndex}
              src={allImages[lightboxIndex]}
              alt={`${project.name} ${lightboxIndex + 1}`}
              className="w-full h-full object-contain max-h-[85vh] rounded-xl"
              style={{ animation: 'lbFadeIn 0.2s ease' }}
            />
          </div>

          {/* Next */}
          {allImages.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => (i + 1) % allImages.length); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:text-[hsl(var(--primary))] hover:bg-white/20 transition-all z-10"
              aria-label="Next"
            >
              <ChevronRight className="w-7 h-7" />
            </button>
          )}

          {/* Thumbnails */}
          {allImages.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 flex-wrap justify-center px-4">
              {allImages.map((img, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                  className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                    i === lightboxIndex
                      ? 'border-[hsl(var(--primary))] scale-110'
                      : 'border-transparent opacity-50 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`thumb ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          <style>{`@keyframes lbFadeIn { from { opacity:0; transform:scale(0.97); } to { opacity:1; transform:scale(1); } }`}</style>
        </div>
      )}

      <div ref={ref} className="h-auto lg:min-h-[560px] lg:h-[85vh] flex items-center justify-center relative mb-6 sm:mb-8 md:mb-10 lg:mb-12" style={{ top: `${index * 30}px` }}>
        <motion.div
          style={{ scale, background: '#F5F9FF', border: '1px solid #B5D4F4' }}
          className="sticky top-24 md:top-32 w-full h-auto lg:h-full max-h-none lg:max-h-[700px] rounded-[24px] sm:rounded-[32px] md:rounded-[40px] overflow-hidden flex flex-col lg:flex-row transition-colors duration-500"
        >
          {/* Left Content Area */}
          <div className="flex flex-col w-full lg:w-5/12 lg:h-full z-10 relative p-5 sm:p-7 md:p-8 lg:p-10">
            <div
              className="text-[hsl(var(--primary))] font-black leading-none mb-4 sm:mb-5"
              style={{ fontSize: 'clamp(1.8rem, 5vw, 80px)' }}
            >
              {project.number}
            </div>

            <div className="flex flex-col gap-1 sm:gap-2 mb-4 sm:mb-5">
              <span className="text-[hsl(var(--primary))] font-medium uppercase tracking-widest text-xs sm:text-sm">
                {project.category}
              </span>
              <h3 className="text-[#042C53] font-bold uppercase text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-tight">
                {project.name}
              </h3>
            </div>

            <p className="text-[#185FA5] font-light leading-relaxed text-sm sm:text-base mb-4 sm:mb-5">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 sm:gap-5 mb-4">
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

            <Link
              to={`/project/${project.id}`}
              className="self-start mt-4 lg:mt-auto px-6 py-2.5 rounded-full bg-[hsl(var(--primary))] text-white font-bold uppercase tracking-wider hover:bg-[#042C53] transition-all duration-300 text-sm shadow-md hover:shadow-lg flex items-center gap-2 group"
            >
              View Project <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Right Image Area */}
          <div className="w-full lg:w-7/12 h-[200px] sm:h-[260px] md:h-[320px] lg:h-full relative overflow-hidden group/image rounded-b-[24px] sm:rounded-b-[32px] md:rounded-b-[40px] lg:rounded-b-none lg:rounded-r-[40px]">
            {hasMultipleImages ? (
              <div className="h-full w-full relative">
                <div className="overflow-hidden h-full w-full" ref={emblaRef}>
                  <div className="flex h-full w-full">
                    {project.images.map((img, i) => (
                      <div
                        className="flex-[0_0_100%] min-w-0 h-full relative cursor-zoom-in"
                        key={i}
                        onClick={() => openLightbox(i)}
                      >
                        <img
                          src={img}
                          alt={`${project.name} slide ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Zoom hint */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity z-10 pointer-events-none">
                  <div className="bg-white/80 rounded-full p-3">
                    <ZoomIn className="w-6 h-6 text-[#042C53]" />
                  </div>
                </div>

                <button
                  onClick={(e) => { e.stopPropagation(); scrollPrev(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 flex items-center justify-center z-20 text-[#042C53] hover:text-[hsl(var(--primary))] transition-all opacity-100 lg:opacity-0 lg:group-hover/image:opacity-100"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); scrollNext(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 flex items-center justify-center z-20 text-[#042C53] hover:text-[hsl(var(--primary))] transition-all opacity-100 lg:opacity-0 lg:group-hover/image:opacity-100"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
                  {project.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => { e.stopPropagation(); emblaApi && emblaApi.scrollTo(i); }}
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
              <div className="h-full w-full relative cursor-zoom-in" onClick={() => openLightbox(0)}>
                <img
                  src={displayImage}
                  alt={project.name}
                  className="w-full h-full object-cover group-hover/image:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Zoom hint */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity z-10 pointer-events-none">
                  <div className="bg-white/80 rounded-full p-3">
                    <ZoomIn className="w-6 h-6 text-[#042C53]" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
}
export default ProjectCard;
