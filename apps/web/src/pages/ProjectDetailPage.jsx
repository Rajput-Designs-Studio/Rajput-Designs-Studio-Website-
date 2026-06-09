import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import FadeIn from '@/components/FadeIn.jsx';
import { projects } from '@/data/projects.js';

function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const project = projects.find(p => p.id === parseInt(id));

  useEffect(() => {
    if (!project) navigate('/portfolio-gallery');
  }, [project, navigate]);

  const allImages = project ? (project.images || (project.image ? [project.image] : [])) : [];
  const currentIndex = project ? projects.findIndex(p => p.id === project.id) : -1;
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  // Hero carousel
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

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

  // Lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (i) => { setLightboxIndex(i); setLightboxOpen(true); };

  useEffect(() => {
    if (!lightboxOpen) return;
    const handle = (e) => {
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowLeft') setLightboxIndex(i => (i - 1 + allImages.length) % allImages.length);
      if (e.key === 'ArrowRight') setLightboxIndex(i => (i + 1) % allImages.length);
    };
    document.addEventListener('keydown', handle);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', handle); document.body.style.overflow = ''; };
  }, [lightboxOpen, allImages.length]);

  if (!project) return null;

  return (
    <>
      <Helmet>
        <title>{project.name} | Rajput Designs Studio</title>
        <meta name="description" content={project.description.substring(0, 160)} />
        <link rel="canonical" href={`https://www.rajputdesignsstudio.com/project/${project.id}`} />
        <meta property="og:title" content={`${project.name} | Rajput Designs Studio`} />
        <meta property="og:description" content={project.description.substring(0, 160)} />
        <meta property="og:image" content={allImages[0]} />
        <meta property="og:url" content={`https://www.rajputdesignsstudio.com/project/${project.id}`} />
      </Helmet>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.95)' }}
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all z-10"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          {allImages.length > 1 && (
            <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-white/10 border border-white/20 px-4 py-2 rounded-full text-white text-sm font-bold uppercase tracking-widest">
              {lightboxIndex + 1} / {allImages.length}
            </div>
          )}

          {allImages.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxIndex(i => (i - 1 + allImages.length) % allImages.length); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:text-[hsl(var(--primary))] hover:bg-white/20 transition-all z-10"
              aria-label="Previous"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>
          )}

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

          {allImages.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxIndex(i => (i + 1) % allImages.length); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:text-[hsl(var(--primary))] hover:bg-white/20 transition-all z-10"
              aria-label="Next"
            >
              <ChevronRight className="w-7 h-7" />
            </button>
          )}

          {allImages.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 flex-wrap justify-center px-4">
              {allImages.map((img, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                  className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                    i === lightboxIndex ? 'border-[hsl(var(--primary))] scale-110' : 'border-transparent opacity-50 hover:opacity-100'
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

      <div className="min-h-screen bg-[#042C53] text-white overflow-x-hidden pb-24">

        {/* Header */}
        <header className="sticky top-0 z-50 glass-panel border-b border-[hsla(var(--primary)/0.1)]">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
            <Link
              to="/portfolio-gallery"
              className="flex items-center gap-2 text-white hover:text-[hsl(var(--primary))] transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium uppercase tracking-wider text-sm">Back to Portfolio</span>
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

        <main className="max-w-7xl mx-auto px-5 sm:px-8 md:px-10 pt-10 sm:pt-16">

          {/* Hero Carousel / Image */}
          <FadeIn delay={0} y={30}>
            <div className="relative rounded-3xl overflow-hidden h-[45vw] min-h-[240px] max-h-[620px] mb-12 sm:mb-16 group">
              {allImages.length > 1 ? (
                <>
                  <div className="overflow-hidden h-full w-full" ref={emblaRef}>
                    <div className="flex h-full w-full">
                      {allImages.map((img, i) => (
                        <div
                          key={i}
                          className="flex-[0_0_100%] min-w-0 h-full cursor-zoom-in"
                          onClick={() => openLightbox(i)}
                        >
                          <img src={img} alt={`${project.name} ${i + 1}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Zoom hint */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    <div className="bg-white/80 rounded-full p-3">
                      <ZoomIn className="w-6 h-6 text-[#042C53]" />
                    </div>
                  </div>

                  {/* Carousel controls */}
                  <button
                    onClick={scrollPrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 flex items-center justify-center z-20 text-[#042C53] hover:text-[hsl(var(--primary))] transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={scrollNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 flex items-center justify-center z-20 text-[#042C53] hover:text-[hsl(var(--primary))] transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>

                  {/* Dot indicators */}
                  <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2 z-20">
                    {allImages.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => emblaApi && emblaApi.scrollTo(i)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          i === selectedIndex ? 'bg-[hsl(var(--primary))] w-6' : 'bg-white/60 hover:bg-white w-2.5'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Counter */}
                  <div className="absolute top-4 right-4 z-20 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-xs font-bold tracking-widest uppercase">
                    {selectedIndex + 1} / {allImages.length}
                  </div>
                </>
              ) : (
                <div className="h-full w-full cursor-zoom-in" onClick={() => openLightbox(0)}>
                  <img src={allImages[0]} alt={project.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    <div className="bg-white/80 rounded-full p-3">
                      <ZoomIn className="w-6 h-6 text-[#042C53]" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </FadeIn>

          {/* Project Info */}
          <FadeIn delay={0.1} y={30}>
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 mb-16 sm:mb-20">

              {/* Left: title + description */}
              <div className="lg:w-7/12">
                <div className="flex items-center gap-4 mb-4 flex-wrap">
                  <span
                    className="text-[hsl(var(--primary))] font-black"
                    style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1 }}
                  >
                    {project.number}
                  </span>
                  <span className="glass-panel px-4 py-1.5 rounded-full text-[hsl(var(--primary))] text-xs font-bold uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>
                <h1
                  className="font-black uppercase leading-tight mb-6 text-white"
                  style={{ fontSize: 'clamp(1.6rem, 4vw, 3.5rem)', letterSpacing: '-0.02em' }}
                >
                  {project.name}
                </h1>
                <p className="text-white/75 font-light leading-relaxed text-base sm:text-lg">
                  {project.description}
                </p>
              </div>

              {/* Right: metadata */}
              <div className="lg:w-5/12 flex flex-col gap-4">
                {[
                  { label: 'Role', value: project.role },
                  { label: 'Client', value: project.client },
                  { label: 'Year', value: project.year },
                  { label: 'Category', value: project.category },
                ].map(({ label, value }) => (
                  <div key={label} className="glass-panel rounded-2xl p-5 flex items-center justify-between border border-[hsla(var(--primary)/0.15)]">
                    <span className="text-xs text-[hsl(var(--primary))] uppercase tracking-widest font-semibold">{label}</span>
                    <span className="text-white font-medium text-sm text-right max-w-[60%]">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Image Gallery Grid (if multiple images) */}
          {allImages.length > 1 && (
            <FadeIn delay={0.2} y={30}>
              <div className="mb-16 sm:mb-20">
                <h2 className="text-white font-black uppercase text-xl sm:text-2xl tracking-wider mb-6 sm:mb-8">
                  <span style={{ color: '#378ADD' }}>All </span>
                  <span>Images</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {allImages.map((img, i) => (
                    <div
                      key={i}
                      className="relative rounded-2xl overflow-hidden h-52 sm:h-64 cursor-zoom-in group/tile"
                      onClick={() => openLightbox(i)}
                    >
                      <img
                        src={img}
                        alt={`${project.name} ${i + 1}`}
                        className="w-full h-full object-cover group-hover/tile:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover/tile:bg-black/30 transition-colors flex items-center justify-center">
                        <div className="opacity-0 group-hover/tile:opacity-100 transition-opacity bg-white/90 rounded-full p-2.5">
                          <ZoomIn className="w-5 h-5 text-[#042C53]" />
                        </div>
                      </div>
                      <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs font-bold px-2 py-1 rounded-full tracking-widest">
                        {i + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          )}

          {/* Pricing CTA */}
          <FadeIn delay={0.15} y={20}>
            <div className="bg-[#0C3A6B] border border-[hsla(var(--primary)/0.4)] p-6 sm:p-10 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 mb-16">
              <div className="text-center md:text-left">
                <h3 className="text-white text-xl sm:text-2xl font-bold uppercase tracking-wider mb-2">Love this work?</h3>
                <p className="text-[#85B7EB] font-light text-base sm:text-lg">Get a similar design for your brand. Clear, upfront pricing — no surprises.</p>
              </div>
              <Link
                to="/pricing"
                className="px-8 py-4 rounded-full border-2 border-[hsl(var(--primary))] text-white font-bold uppercase tracking-wider hover:bg-[hsl(var(--primary))] transition-all duration-300 whitespace-nowrap flex items-center gap-2 group"
              >
                View Pricing
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeIn>

          {/* Prev / Next Navigation */}
          <FadeIn delay={0.15} y={20}>
            <div className="border-t border-[hsla(var(--primary)/0.2)] pt-10 flex flex-col sm:flex-row items-stretch gap-4 mb-12">
              {prevProject ? (
                <Link
                  to={`/project/${prevProject.id}`}
                  className="flex-1 glass-panel rounded-2xl p-5 sm:p-6 flex items-center gap-4 hover:border-[hsl(var(--primary))] transition-all group"
                >
                  <ArrowLeft className="w-5 h-5 text-[hsl(var(--primary))] group-hover:-translate-x-1 transition-transform shrink-0" />
                  <div>
                    <p className="text-xs text-[hsl(var(--primary))] uppercase tracking-widest font-semibold mb-1">Previous</p>
                    <p className="text-white font-bold uppercase text-sm leading-tight">{prevProject.name}</p>
                  </div>
                </Link>
              ) : <div className="flex-1" />}

              {nextProject ? (
                <Link
                  to={`/project/${nextProject.id}`}
                  className="flex-1 glass-panel rounded-2xl p-5 sm:p-6 flex items-center justify-end gap-4 hover:border-[hsl(var(--primary))] transition-all group text-right"
                >
                  <div>
                    <p className="text-xs text-[hsl(var(--primary))] uppercase tracking-widest font-semibold mb-1">Next</p>
                    <p className="text-white font-bold uppercase text-sm leading-tight">{nextProject.name}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-[hsl(var(--primary))] group-hover:translate-x-1 transition-transform shrink-0" />
                </Link>
              ) : <div className="flex-1" />}
            </div>
          </FadeIn>

          {/* Back to Portfolio CTA */}
          <FadeIn delay={0.2} y={20}>
            <div className="flex justify-center pb-8">
              <Link
                to="/portfolio-gallery"
                className="flex items-center gap-2 px-8 py-4 rounded-full bg-[hsl(var(--primary))] text-white font-bold uppercase tracking-wider hover:bg-[#185FA5] transition-all duration-300 group"
              >
                View All Projects
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeIn>

        </main>
      </div>
    </>
  );
}

export default ProjectDetailPage;
