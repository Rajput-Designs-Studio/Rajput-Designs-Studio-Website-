import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, ChevronLeft, ChevronRight, Play, Pause, X, ZoomIn } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import FadeIn from '@/components/FadeIn.jsx';
import { projects } from '@/data/projects.js';

const filters = ['All', 'Print & Digital', 'Print Design', 'Digital Design', 'Web Design', 'UI/UX App Design'];

// Lightbox Component
function Lightbox({ images, startIndex, projectName, onClose }) {
  const [current, setCurrent] = useState(startIndex);

  const prev = useCallback(() => {
    setCurrent(i => (i - 1 + images.length) % images.length);
  }, [images.length]);

  const next = useCallback(() => {
    setCurrent(i => (i + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose, prev, next]);

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.95)' }}
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 w-11 h-11 rounded-full glass-panel flex items-center justify-center text-white hover:text-[hsl(var(--primary))] transition-all z-10"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Counter */}
      {images.length > 1 && (
        <div className="absolute top-5 left-1/2 -translate-x-1/2 glass-panel px-4 py-2 rounded-full text-white text-sm font-bold uppercase tracking-widest">
          {current + 1} / {images.length}
        </div>
      )}

      {/* Prev */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); prev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-panel flex items-center justify-center text-white hover:text-[hsl(var(--primary))] hover:glow-cyan transition-all z-10"
        >
          <ChevronLeft className="w-7 h-7" />
        </button>
      )}

      {/* Image */}
      <div
        className="relative max-w-5xl max-h-[85vh] w-full px-20"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          key={current}
          src={images[current]}
          alt={`${projectName} ${current + 1}`}
          className="w-full h-full object-contain max-h-[85vh] rounded-xl"
          style={{ animation: 'fadeIn 0.2s ease' }}
        />
      </div>

      {/* Next */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); next(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-panel flex items-center justify-center text-white hover:text-[hsl(var(--primary))] hover:glow-cyan transition-all z-10"
        >
          <ChevronRight className="w-7 h-7" />
        </button>
      )}

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
              className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${i === current ? 'border-[hsl(var(--primary))] glow-cyan-subtle scale-110' : 'border-transparent opacity-50 hover:opacity-100'}`}
            >
              <img src={img} alt={`thumb ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      <style>{`@keyframes fadeIn { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: scale(1); } }`}</style>
    </div>
  );
}

// Carousel Component
function GalleryCardCarousel({ images, name, onImageClick }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const scrollPrev = useCallback((e) => {
    if (e) e.preventDefault();
    if (emblaApi) { emblaApi.scrollPrev(); setIsPlaying(false); }
  }, [emblaApi]);

  const scrollNext = useCallback((e) => {
    if (e) e.preventDefault();
    if (emblaApi) { emblaApi.scrollNext(); if (e) setIsPlaying(false); }
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    let intervalId;
    if (isPlaying && emblaApi) {
      intervalId = setInterval(() => emblaApi.scrollNext(), 3000);
    }
    return () => { if (intervalId) clearInterval(intervalId); };
  }, [isPlaying, emblaApi]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowLeft') scrollPrev();
    else if (e.key === 'ArrowRight') { scrollNext(); setIsPlaying(false); }
  }, [scrollPrev, scrollNext]);

  return (
    <div
      className="relative h-64 overflow-hidden group/carousel focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))]"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="absolute inset-0 bg-[hsl(var(--background))] opacity-20 group-hover:opacity-0 transition-opacity z-10 pointer-events-none" />

      <div className="overflow-hidden h-full w-full" ref={emblaRef}>
        <div className="flex h-full w-full">
          {images.map((img, i) => (
            <div
              key={i}
              className="flex-[0_0_100%] min-w-0 h-full relative cursor-zoom-in"
              onClick={() => onImageClick(i)}
            >
              <img
                src={img}
                alt={`${name} slide ${i + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Zoom hint */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity z-10 pointer-events-none">
                <div className="glass-panel p-2 rounded-full">
                  <ZoomIn className="w-5 h-5 text-[hsl(var(--primary))]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Autoplay */}
      <div className="absolute top-3 left-3 z-20 opacity-0 group-hover/carousel:opacity-100 transition-opacity">
        <button
          onClick={(e) => { e.preventDefault(); setIsPlaying(!isPlaying); }}
          className="w-8 h-8 rounded-full glass-panel flex items-center justify-center text-white hover:text-[hsl(var(--primary))] transition-all"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </button>
      </div>

      <button onClick={scrollPrev} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full glass-panel flex items-center justify-center z-20 text-white hover:text-[hsl(var(--primary))] transition-all opacity-0 group-hover/carousel:opacity-100">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button onClick={scrollNext} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full glass-panel flex items-center justify-center z-20 text-white hover:text-[hsl(var(--primary))] transition-all opacity-0 group-hover/carousel:opacity-100">
        <ChevronRight className="w-5 h-5" />
      </button>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-20 opacity-0 group-hover/carousel:opacity-100 transition-opacity">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.preventDefault(); if (emblaApi) emblaApi.scrollTo(i); setIsPlaying(false); }}
            className={`h-2 rounded-full transition-all duration-300 ${i === selectedIndex ? 'bg-[hsl(var(--primary))] w-4 glow-cyan-subtle' : 'bg-white/40 hover:bg-white/80 w-2'}`}
          />
        ))}
      </div>

      <div className="absolute bottom-3 right-3 z-20 glass-panel px-2 py-1 rounded-full text-white text-[10px] font-bold tracking-widest uppercase opacity-0 group-hover/carousel:opacity-100 transition-opacity pointer-events-none">
        {selectedIndex + 1} / {images.length}
      </div>
    </div>
  );
}

function PortfolioGalleryPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightbox, setLightbox] = useState(null); // { images, index, name }

  const openLightbox = (images, index, name) => {
    setLightbox({ images, index, name });
  };

  const filteredProjects = projects.filter(project => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Digital Design' && project.category.includes('Digital')) return true;
    return project.category.includes(activeFilter);
  });

  return (
    <>
      <Helmet>
        <title>Portfolio | Rajput Designs Studio — Graphic Design Projects</title>
        <meta name="description" content="Explore Rajput Designs Studio's portfolio — logo design, brand identity, social media graphics, food & restaurant branding, UI/UX design and more. Real projects for clients in Pakistan and worldwide." />
        <meta name="keywords" content="graphic design portfolio Pakistan, logo design portfolio, brand identity examples, social media design work, UI UX design portfolio, Rajput Designs Studio portfolio" />
        <link rel="canonical" href="https://www.rajputdesignsstudio.com/portfolio-gallery" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.rajputdesignsstudio.com/portfolio-gallery" />
        <meta property="og:title" content="Portfolio | Rajput Designs Studio — Graphic Design Projects" />
        <meta property="og:description" content="Logo design, brand identity, social media graphics, UI/UX and more. Real projects for clients in Pakistan and worldwide." />
        <meta property="og:image" content="https://i.postimg.cc/zBhyWx99/Facebook-Cover-Elevate-Your-Brand-with-Design.jpg" />
        <meta property="og:site_name" content="Rajput Designs Studio" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Portfolio | Rajput Designs Studio — Graphic Design Projects" />
        <meta name="twitter:description" content="Logo design, brand identity, social media graphics, UI/UX and more." />
        <meta name="twitter:image" content="https://i.postimg.cc/zBhyWx99/Facebook-Cover-Elevate-Your-Brand-with-Design.jpg" />
      </Helmet>

      {lightbox && (
        <Lightbox
          images={lightbox.images}
          startIndex={lightbox.index}
          projectName={lightbox.name}
          onClose={() => setLightbox(null)}
        />
      )}

      <div className="min-h-screen bg-[#042C53] text-foreground pb-24">
        <header className="sticky top-0 z-50 glass-panel border-b border-[hsla(var(--primary)/0.1)]">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-white hover:text-[hsl(var(--primary))] transition-colors group">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium uppercase tracking-wider text-sm">Back to Home</span>
            </Link>
            <Link to="/">
              <img
                src="https://i.postimg.cc/FFL8k0MJ/Rajput-Desgins-Logo-without-background-for-website-01.png"
                alt="Rajput Designs Studio"
                className="w-24 h-14 object-contain"
              />
            </Link>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-5 sm:px-8 md:px-10 pt-16 sm:pt-24">
          <FadeIn delay={0} y={20}>
            <h1
  className="font-black uppercase tracking-tight leading-[1.1] text-balance mb-4 drop-shadow-md text-center"
  style={{ fontSize: 'clamp(1.8rem, 6vw, 5rem)', letterSpacing: '-0.02em' }}
>
  <span style={{ color: '#ffffff' }}>Pro</span>
  <span style={{ color: '#378ADD' }}>jects</span>
</h1>
            <p className="text-center text-white opacity-80 max-w-2xl mx-auto mb-16 text-lg font-light">
              A curated collection of my best work across print, digital, and web design.
            </p>
          </FadeIn>

          <FadeIn delay={0.1} y={20}>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-16">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-2 rounded-full text-sm font-medium uppercase tracking-wider transition-all duration-300 ${activeFilter === filter
                    ? 'bg-[hsl(var(--primary))] text-[hsl(var(--background))] glow-cyan-subtle'
                    : 'glass-panel text-white hover:text-[hsl(var(--primary))] hover:border-[hsl(var(--primary))]'
                    }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {filteredProjects.map((project, index) => {
              const hasMultipleImages = project.images && project.images.length > 1;
              const displayImage = project.image || (project.images && project.images[0]);
              const allImages = project.images || [project.image];

              return (
                <FadeIn key={project.id} delay={index * 0.1} y={30}>
                  <div className="glass-panel rounded-3xl overflow-hidden group hover:border-[hsl(var(--primary))] transition-all duration-500 h-full flex flex-col">

                    {hasMultipleImages ? (
                      <div className="relative">
                        <GalleryCardCarousel
                          images={project.images}
                          name={project.name}
                          onImageClick={(i) => openLightbox(project.images, i, project.name)}
                        />
                        <div className="absolute top-4 right-4 z-20 glass-panel px-3 py-1 rounded-full text-[hsl(var(--primary))] text-xs font-bold uppercase tracking-wider pointer-events-none">
                          {project.category}
                        </div>
                      </div>
                    ) : (
                      <div
                        className="relative h-64 overflow-hidden cursor-zoom-in"
                        onClick={() => openLightbox(allImages, 0, project.name)}
                      >
                        <div className="absolute inset-0 bg-[hsl(var(--background))] opacity-20 group-hover:opacity-0 transition-opacity z-10 pointer-events-none" />
                        <img
                          src={displayImage}
                          alt={project.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                          <div className="glass-panel p-3 rounded-full">
                            <ZoomIn className="w-6 h-6 text-[hsl(var(--primary))]" />
                          </div>
                        </div>
                        <div className="absolute top-4 right-4 z-20 glass-panel px-3 py-1 rounded-full text-[hsl(var(--primary))] text-xs font-bold uppercase tracking-wider pointer-events-none">
                          {project.category}
                        </div>
                      </div>
                    )}

                    <div className="p-6 sm:p-8 flex flex-col flex-grow">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-[hsl(var(--primary))] font-black text-xl">{project.number}</span>
                        <h3 className="text-white font-bold text-xl uppercase tracking-wide">{project.name}</h3>
                      </div>
                      <p className="text-white opacity-70 font-light text-sm leading-relaxed mb-6 flex-grow">
                        {project.description}
                      </p>
                      <button className="flex items-center gap-2 text-[hsl(var(--primary))] font-medium uppercase tracking-wider text-sm group/btn mt-auto hover:text-white transition-colors">
                        View Details
                        <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-white opacity-60 text-lg">No projects found for this category.</p>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
export default PortfolioGalleryPage;