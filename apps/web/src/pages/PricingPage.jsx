import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, ArrowRight, X } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import FadeIn from '@/components/FadeIn.jsx';

const pricingPlans = [
  {
    name: 'Starter',
    price: '$35',
    description: 'Best for: Freelancers and small businesses',
    features: [
      '1 Design Concept',
      '2 Revisions',
      'Source Files (PSD/AI)',
      '48-hour Delivery',
      'Email Support'
    ],
    highlight: false,
    cta: 'Get Started',
    checkoutSlug: 'starter',
  },
  {
    name: 'Professional',
    price: '$75',
    description: 'Best for: Small to medium businesses',
    badge: 'Most Popular',
    features: [
      '3 Design Concepts',
      '5 Revisions',
      'Source Files (PSD/AI)',
      '3-7 Days Delivery',
      'Priority Email Support',
      'Brand Guidelines'
    ],
    highlight: true,
    cta: 'Choose Professional',
    checkoutSlug: 'professional',
  },
  {
    name: 'Premium',
    price: '$149.99',
    description: 'Best for: Large enterprises, complex projects',
    features: [
      '5 Design Concepts',
      'Unlimited Revisions',
      'All Source Files + Assets',
      '5-7 Day Delivery',
      '24/7 Priority Support',
      'Brand Guidelines',
      'Prototype/Animation',
      'Dedicated Account Manager'
    ],
    highlight: false,
    cta: 'Choose Premium',
    checkoutSlug: 'premium',
  },
  {
    name: 'Custom',
    price: 'Custom Quote',
    description: 'Best for: Unique, large-scale projects',
    features: [
      'Fully Customized Package',
      'Dedicated Team',
      'Flexible Timeline',
      'All Deliverables',
      'Ongoing Support'
    ],
    highlight: false,
    cta: 'Contact Us',
    checkoutSlug: 'custom',
  }
];

const specialtyPackages = [
  {
    name: 'Logo Design Package',
    icon: '✏️',
    price: '$65',
    description: 'Professional logo that defines your brand',
    image: 'https://i.postimg.cc/fbXspjM7/S-E-W-Logo-in-Dark-Blue-01.jpg',
    features: [
      '3 Logo Concepts',
      '5 Revisions',
      'All Formats (PNG, SVG, PDF, AI)',
      'Transparent Background',
      'Color + B&W Versions',
      '3-5 Day Delivery',
    ],
    highlight: false,
    checkoutSlug: 'logo-design',
  },
  {
    name: 'Full Branding Package',
    icon: '🎨',
    price: '$249',
    description: 'Complete brand identity from scratch',
    image: 'https://horizons-cdn.hostinger.com/a0966b37-06c7-4331-9849-3d170f68d2ed/7ea46274f50ddf435f18c05def36b613.png',
    features: [
      'Logo Design (3 Concepts)',
      'Business Card Design',
      'Letterhead & Envelope',
      'Social Media Profile Kit',
      'Brand Style Guide (Colors, Fonts)',
      'All Source Files (AI/PSD)',
      '7-10 Day Delivery',
    ],
    highlight: true,
    badge: 'Best Value',
    checkoutSlug: 'full-branding',
  },
  {
    name: 'Menu Design Package',
    icon: '🍽️',
    price: '$79',
    description: 'Professional restaurant & cafe menus',
    image: 'https://i.postimg.cc/CMBD83tP/Dani-s-Fast-Food-Menu-Page-1.jpg',
    images: [
      'https://i.postimg.cc/CMBD83tP/Dani-s-Fast-Food-Menu-Page-1.jpg',
      'https://i.postimg.cc/RVx3HNwW/Dani-s-Fast-Food-Menu-Page-2.jpg',
    ],
    features: [
      'Up to 2 Pages / Sides',
      '2 Design Concepts',
      '3 Revisions',
      'Print-Ready PDF + Source File',
      '3-5 Day Delivery',
    ],
    highlight: false,
    checkoutSlug: 'menu-design',
  },
  {
    name: 'Promotion Poster',
    icon: '📣',
    price: '$39',
    description: 'Eye-catching social media & print posters',
    image: 'https://horizons-cdn.hostinger.com/a0966b37-06c7-4331-9849-3d170f68d2ed/0d539764c663a87bef648a3a5ac4f680.jpg',
    features: [
      '1 Poster Design',
      '3 Revisions',
      'Social & Print Sizes Included',
      'Source File (PSD/AI)',
      '48-Hour Delivery',
    ],
    highlight: false,
    checkoutSlug: 'promotion-poster',
  },
  {
    name: 'Banner Design Package',
    icon: '🖼️',
    price: '$55',
    description: 'Web banners, social covers & digital ads',
    image: 'https://horizons-cdn.hostinger.com/a0966b37-06c7-4331-9849-3d170f68d2ed/137d29c2299119a30e31a18b3ddc35a0.jpg',
    features: [
      'Up to 5 Banner Sizes',
      '2 Design Concepts',
      '3 Revisions',
      'PNG + Source Files',
      '2-3 Day Delivery',
    ],
    highlight: false,
    checkoutSlug: 'banner-design',
  },
  {
    name: 'Bundle Package',
    icon: '📦',
    price: '$179',
    description: 'Posters + Banners + Social Media Kit',
    image: 'https://horizons-cdn.hostinger.com/a0966b37-06c7-4331-9849-3d170f68d2ed/6108b17e80dd90eda7d6f829a1638469.jpg',
    features: [
      '5 Promotion Posters',
      '5 Banner Designs',
      'Social Media Profile Kit',
      'Unlimited Revisions',
      'All Source Files',
      '7-10 Day Delivery',
      'Priority Support',
    ],
    highlight: false,
    badge: 'Save 40%',
    checkoutSlug: 'bundle',
  },
  {
    name: 'Website Design Package',
    icon: '💻',
    price: '$149',
    description: 'Modern, mobile-ready website UI design',
    image: 'https://horizons-cdn.hostinger.com/a0966b37-06c7-4331-9849-3d170f68d2ed/4016f71bbfb257d2ecafb261dddf6cfb.jpg',
    features: [
      'Up to 5 Pages',
      '2 Design Concepts',
      '5 Revisions',
      'Mobile + Desktop Layouts',
      'Figma / PSD Source Files',
      '7-10 Day Delivery',
    ],
    highlight: false,
    checkoutSlug: 'website-design',
  },
];

const faqs = [
  {
    question: "What is your typical turnaround time?",
    answer: "Turnaround times vary based on the project scope. A basic logo design might take 1-2 weeks, while a full brand identity or UI/UX project can take 4-6 weeks. We will establish a clear timeline during our initial consultation."
  },
  {
    question: "How do revisions work?",
    answer: "Each package includes a set number of revision rounds. A revision round consists of a consolidated list of feedback from you, which we then apply to the designs. Additional revisions beyond the package scope are billed at our hourly rate."
  },
  {
    question: "Do you offer refunds?",
    answer: "We require a 50% non-refundable deposit to begin work. If you choose to cancel the project before completion, you won't be billed for the remaining 50%, but the initial deposit covers the time and resources already invested."
  },
  {
    question: "What files will I receive at the end?",
    answer: "Depending on your package, you will receive standard web formats (PNG, JPG, SVG) and potentially source files (AI, PSD, EPS) for print-ready assets. UI/UX projects are delivered via Figma links."
  },
  {
    question: "Can I upgrade my package later?",
    answer: "Absolutely! If you start with a smaller package and realize you need more assets, we can easily upgrade your project scope and adjust the pricing accordingly."
  }
];

function PricingPage() {
  const [lightbox, setLightbox] = React.useState(null);
  const navigate = useNavigate();

  const handleCheckout = (plan) => {
    navigate(`/checkout/${plan.checkoutSlug}`);
  };

  return (
    <>
      <Helmet>
        <title>Design Packages &amp; Pricing | Logo $65 · Branding $249 · Website $149 — Rajput Designs Studio</title>
        <meta name="description" content="Affordable graphic design packages with transparent pricing. Logo design from $65, full branding from $249, website design $149. No hidden fees. Order online and get results in days." />
        <meta name="keywords" content="logo design price, graphic design packages cost, affordable branding packages, buy logo design online, brand identity package price, menu design cost, website design package price, social media design price, cheap graphic designer online" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
        <meta name="author" content="Rajput Designs Studio" />
        <link rel="canonical" href="https://www.rajputdesignsstudio.com/pricing" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.rajputdesignsstudio.com/pricing" />
        <meta property="og:title" content="Design Packages &amp; Pricing | Logo $65 · Branding $249 · Website $149 — Rajput Designs Studio" />
        <meta property="og:description" content="Affordable graphic design packages with transparent pricing. Logo design from $65, full branding $249, website design $149. No hidden fees." />
        <meta property="og:image" content="https://i.postimg.cc/zBhyWx99/Facebook-Cover-Elevate-Your-Brand-with-Design.jpg" />
        <meta property="og:site_name" content="Rajput Designs Studio" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Design Packages &amp; Pricing | Logo $65 · Branding $249 · Website $149" />
        <meta name="twitter:description" content="Affordable graphic design packages. Logo $65, branding $249, website design $149. No hidden fees. Order online." />
        <meta name="twitter:image" content="https://i.postimg.cc/zBhyWx99/Facebook-Cover-Elevate-Your-Brand-with-Design.jpg" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Graphic Design Packages",
          "url": "https://www.rajputdesignsstudio.com/pricing",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "item": { "@type": "Service", "name": "Logo Design Package", "description": "Professional logo design with 3 concepts, 5 revisions, and all file formats (PNG, SVG, PDF, AI).", "offers": { "@type": "Offer", "price": "65", "priceCurrency": "USD", "availability": "https://schema.org/InStock" } } },
            { "@type": "ListItem", "position": 2, "item": { "@type": "Service", "name": "Full Branding Package", "description": "Complete brand identity including logo, business card, letterhead, social media kit, and brand style guide.", "offers": { "@type": "Offer", "price": "249", "priceCurrency": "USD", "availability": "https://schema.org/InStock" } } },
            { "@type": "ListItem", "position": 3, "item": { "@type": "Service", "name": "Menu Design Package", "description": "Professional restaurant and cafe menu design, print-ready PDF.", "offers": { "@type": "Offer", "price": "79", "priceCurrency": "USD", "availability": "https://schema.org/InStock" } } },
            { "@type": "ListItem", "position": 4, "item": { "@type": "Service", "name": "Promotion Poster", "description": "Eye-catching social media and print posters for promotions.", "offers": { "@type": "Offer", "price": "39", "priceCurrency": "USD", "availability": "https://schema.org/InStock" } } },
            { "@type": "ListItem", "position": 5, "item": { "@type": "Service", "name": "Banner Design Package", "description": "Web banners, social covers and digital ads in multiple sizes.", "offers": { "@type": "Offer", "price": "55", "priceCurrency": "USD", "availability": "https://schema.org/InStock" } } },
            { "@type": "ListItem", "position": 6, "item": { "@type": "Service", "name": "Bundle Package", "description": "5 posters, 5 banners, social media kit, unlimited revisions.", "offers": { "@type": "Offer", "price": "179", "priceCurrency": "USD", "availability": "https://schema.org/InStock" } } },
            { "@type": "ListItem", "position": 7, "item": { "@type": "Service", "name": "Website Design Package", "description": "Modern mobile-ready website UI design, up to 5 pages, Figma/PSD source files.", "offers": { "@type": "Offer", "price": "149", "priceCurrency": "USD", "availability": "https://schema.org/InStock" } } }
          ]
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.rajputdesignsstudio.com/" },
            { "@type": "ListItem", "position": 2, "name": "Pricing", "item": "https://www.rajputdesignsstudio.com/pricing" }
          ]
        })}</script>
      </Helmet>

      <div className="min-h-screen bg-[#E6F1FB] text-foreground pb-24 overflow-x-hidden">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#B5D4F4]">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-2 text-[#042C53] hover:text-[hsl(var(--primary))] transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium uppercase tracking-wider text-sm">Back to Home</span>
            </Link>
            <div>
              <img
                src="https://i.postimg.cc/FFL8k0MJ/Rajput-Desgins-Logo-without-background-for-website-01.png"
                alt="Rajput Designs Studio"
                style={{ height: '45px', width: 'auto' }}
              />
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-5 sm:px-8 md:px-10 pt-16 sm:pt-24">
          <FadeIn delay={0} y={20}>
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h1
                className="font-black uppercase tracking-tight leading-[1.1] text-balance mb-4 drop-shadow-md text-center"
                style={{ fontSize: 'clamp(1.8rem, 6vw, 5rem)', letterSpacing: '-0.02em' }}
              >
                <span style={{ color: '#042C53' }}>Pricing </span>
                <span style={{ color: '#378ADD' }}>Plan</span>
              </h1>
              <p className="text-[#185FA5] text-base sm:text-xl font-light">
                Choose the perfect package for your design needs. Clear, upfront pricing with no hidden surprises.
              </p>
            </div>
          </FadeIn>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16 sm:mb-32 items-stretch">
            {pricingPlans.map((plan, index) => (
              <FadeIn key={plan.name} delay={index * 0.1} y={30} className="h-full">
                <div
                  className={`h-full flex flex-col p-5 sm:p-8 rounded-3xl relative transition-all duration-300 ${plan.highlight
                    ? 'bg-[#042C53] border-2 border-[hsl(var(--primary))] glow-cyan scale-100 lg:scale-105 z-10'
                    : 'bg-white/90 border border-[#B5D4F4] hover:border-[hsl(var(--primary))] shadow-sm backdrop-blur-sm hover:shadow-md'
                    }`}
                >
                  {plan.badge && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[hsl(var(--primary))] text-[hsl(var(--background))] text-xs font-bold uppercase tracking-wider py-1.5 px-4 rounded-full glow-cyan-subtle">
                      {plan.badge}
                    </div>
                  )}

                  <h3 className={`text-xl font-bold uppercase tracking-wider mb-2 ${plan.highlight ? 'text-white' : 'text-[#042C53]'}`}>{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-2xl sm:text-3xl font-black text-[hsl(var(--primary))] glow-text-cyan">{plan.price}</span>
                    {plan.price !== 'Custom Quote' && <span className={`text-sm font-light ml-1 ${plan.highlight ? 'text-white opacity-60' : 'text-[#185FA5]'}`}>/ project</span>}
                  </div>
                  <p className={`text-sm font-light h-10 mb-8 border-b pb-12 ${plan.highlight ? 'text-white opacity-70 border-[hsla(var(--primary)/0.2)]' : 'text-[#185FA5] border-[#B5D4F4]'}`}>
                    {plan.description}
                  </p>

                  <ul className="flex flex-col gap-4 mb-8 flex-grow">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-[hsl(var(--primary))] shrink-0 mt-0.5" />
                        <span className={`font-light text-sm ${plan.highlight ? 'text-white' : 'text-[#185FA5]'}`}>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleCheckout(plan)}
                    className={`w-full py-3 rounded-xl font-bold uppercase tracking-wider transition-all duration-300 ${plan.highlight
                      ? 'bg-[hsl(var(--primary))] text-[hsl(var(--background))] hover:brightness-110 glow-cyan-subtle'
                      : 'bg-transparent text-[#042C53] hover:bg-[hsl(var(--primary))] hover:text-white border border-[hsl(var(--primary))]'
                      }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Specialty Packages */}
          <FadeIn delay={0.1} y={30}>
            <div className="mb-20 sm:mb-32">
              <h2 className="text-center text-2xl md:text-4xl font-black uppercase mb-4 tracking-wide">
                <span style={{ color: '#042C53' }}>Specialty </span>
                <span style={{ color: '#378ADD' }}>Packages</span>
              </h2>
              <p className="text-center text-[#185FA5] mb-10 sm:mb-16 text-base font-light max-w-2xl mx-auto">
                Purpose-built packages for specific design needs — straightforward pricing, no guesswork.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                {specialtyPackages.map((pkg, index) => (
                  <FadeIn key={pkg.name} delay={index * 0.08} y={30} className="h-full">
                    <div className={`h-full flex flex-col p-5 sm:p-7 rounded-3xl relative transition-all duration-300 ${
                      pkg.highlight
                        ? 'bg-[#042C53] border-2 border-[hsl(var(--primary))] glow-cyan'
                        : 'bg-white/90 border border-[#B5D4F4] hover:border-[hsl(var(--primary))] shadow-sm backdrop-blur-sm hover:shadow-md'
                    }`}>
                      {pkg.badge && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[hsl(var(--primary))] text-[hsl(var(--background))] text-xs font-bold uppercase tracking-wider py-1.5 px-4 rounded-full glow-cyan-subtle z-10">
                          {pkg.badge}
                        </div>
                      )}
                      {pkg.image && (
                        <div className="relative -mx-5 sm:-mx-7 -mt-5 sm:-mt-7 mb-5 h-44 overflow-hidden rounded-t-3xl cursor-zoom-in"
                          onClick={() => setLightbox({ images: pkg.images || [pkg.image], index: 0 })}>
                          <img
                            src={pkg.image}
                            alt={`${pkg.name} sample`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(4,44,83,0.55)]" />
                          <div className="absolute bottom-3 left-4">
                            <span className="text-[10px] text-white font-semibold opacity-75 uppercase tracking-widest">Sample Work</span>
                          </div>
                        </div>
                      )}
                      <div className="text-3xl mb-3">{pkg.icon}</div>
                      <h3 className={`text-lg font-bold uppercase tracking-wider mb-1 ${pkg.highlight ? 'text-white' : 'text-[#042C53]'}`}>{pkg.name}</h3>
                      <p className={`text-xs mb-4 ${pkg.highlight ? 'text-white opacity-60' : 'text-[#185FA5]'}`}>{pkg.description}</p>
                      <div className="mb-5">
                        <span className="text-2xl sm:text-3xl font-black text-[hsl(var(--primary))] glow-text-cyan">{pkg.price}</span>
                        <span className={`text-sm font-light ml-1 ${pkg.highlight ? 'text-white opacity-60' : 'text-[#185FA5]'}`}>/ project</span>
                      </div>
                      <ul className="flex flex-col gap-3 mb-6 flex-grow">
                        {pkg.features.map((f, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <Check className="w-4 h-4 text-[hsl(var(--primary))] shrink-0 mt-0.5" />
                            <span className={`font-light text-sm ${pkg.highlight ? 'text-white' : 'text-[#185FA5]'}`}>{f}</span>
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={() => handleCheckout(pkg)}
                        className={`w-full py-3 rounded-xl font-bold uppercase tracking-wider transition-all duration-300 ${
                          pkg.highlight
                            ? 'bg-[hsl(var(--primary))] text-[hsl(var(--background))] hover:brightness-110 glow-cyan-subtle'
                            : 'bg-transparent text-[#042C53] hover:bg-[hsl(var(--primary))] hover:text-white border border-[hsl(var(--primary))]'
                        }`}
                      >
                        Get Started
                      </button>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* FAQ Section */}
          <FadeIn delay={0.2} y={30}>
            <div className="max-w-3xl mx-auto mb-24">
              <h2 className="text-center text-2xl md:text-4xl font-black uppercase text-[#042C53] mb-10 tracking-wide">
                Frequently Asked Questions
              </h2>

              <Accordion type="single" collapsible className="w-full flex flex-col gap-4">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="bg-white/90 border border-[#B5D4F4] rounded-2xl px-6 data-[state=open]:border-[hsl(var(--primary))] transition-colors backdrop-blur-sm"
                  >
                    <AccordionTrigger className="text-[#042C53] hover:text-[hsl(var(--primary))] hover:no-underline font-medium text-left text-base sm:text-lg py-6">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-[#185FA5] font-light leading-relaxed pb-6 text-base">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <div className="flex justify-center pb-24">
              <Link
                to="/#contact"
                className="flex items-center gap-2 text-[hsl(var(--primary))] hover:text-[#042C53] uppercase font-bold tracking-widest transition-colors group"
              >
                Still have questions? Contact Us
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeIn>
        </main>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.95)' }}
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all z-10"
          >
            <X className="w-6 h-6" />
          </button>
          {lightbox.images.length > 1 && (
            <>
              <button
                onClick={e => { e.stopPropagation(); setLightbox(p => ({ ...p, index: (p.index - 1 + p.images.length) % p.images.length })); }}
                className="absolute left-4 w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all z-10"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                onClick={e => { e.stopPropagation(); setLightbox(p => ({ ...p, index: (p.index + 1) % p.images.length })); }}
                className="absolute right-20 w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all z-10"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
              <div className="absolute bottom-5 text-white text-sm opacity-60 z-10">
                {lightbox.index + 1} / {lightbox.images.length}
              </div>
            </>
          )}
          <img
            src={lightbox.images[lightbox.index]}
            alt="Full preview"
            className="max-w-[92vw] max-h-[88vh] rounded-2xl object-contain shadow-2xl"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
export default PricingPage;
