import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowLeft, Check, ShieldCheck, RefreshCw, Clock, Zap, Award, MessageCircle } from 'lucide-react';
import FadeIn from '@/components/FadeIn.jsx';

const PACKAGES = {
  starter: {
    slug: 'starter',
    name: 'Starter',
    tagline: 'Get your brand moving — fast, clean, delivered.',
    price: '$35',
    priceNote: 'one-time payment',
    badge: null,
    category: 'Design Package',
    icon: '🚀',
    deliveryDays: '2 days',
    revisions: '2 revisions',
    description:
      'Everything you need to launch a clean, professional design quickly. Perfect for freelancers and small businesses who need quality without compromise.',
    features: [
      '1 Design Concept',
      '2 Revisions',
      'Source Files (PSD / AI)',
      '48-Hour Delivery',
      'Email Support',
    ],
    process: [
      { step: '01', title: 'Place Your Order', desc: 'Complete secure checkout on Gumroad in under 60 seconds.' },
      { step: '02', title: 'Share Your Brief', desc: 'Send your brand info, color preferences, and style notes via email.' },
      { step: '03', title: 'Receive Your Design', desc: 'Get polished, ready-to-use design files within 48 hours.' },
    ],
    gumroadLink: 'https://rajputdesignsstudio.gumroad.com/l/pbgpsm',
    isContact: false,
  },
  professional: {
    slug: 'professional',
    name: 'Professional',
    tagline: 'The complete design solution for growing businesses.',
    price: '$75',
    priceNote: 'one-time payment',
    badge: 'Most Popular',
    category: 'Design Package',
    icon: '⚡',
    deliveryDays: '3–7 days',
    revisions: '5 revisions',
    description:
      'Three polished design concepts, fast revisions, and brand guidelines included. Built for businesses that take their identity seriously.',
    features: [
      '3 Design Concepts',
      '5 Revisions',
      'Source Files (PSD / AI)',
      '3–7 Days Delivery',
      'Priority Email Support',
      'Brand Guidelines',
    ],
    process: [
      { step: '01', title: 'Place Your Order', desc: 'Secure checkout via Gumroad — quick and straightforward.' },
      { step: '02', title: 'Discovery Brief', desc: 'A short questionnaire helps us understand your brand vision.' },
      { step: '03', title: 'Choose & Refine', desc: 'Pick your favourite concept and refine it until it\'s perfect.' },
    ],
    gumroadLink: 'https://rajputdesignsstudio.gumroad.com/l/kwoeak',
    isContact: false,
  },
  premium: {
    slug: 'premium',
    name: 'Premium',
    tagline: 'Enterprise-grade design — no compromises.',
    price: '$149.99',
    priceNote: 'one-time payment',
    badge: 'Best Results',
    category: 'Design Package',
    icon: '👑',
    deliveryDays: '5–7 days',
    revisions: 'Unlimited',
    description:
      'Five distinct concepts, unlimited revisions, brand guidelines, motion prototypes, and a dedicated account manager. For brands that demand the very best.',
    features: [
      '5 Design Concepts',
      'Unlimited Revisions',
      'All Source Files + Assets',
      '5–7 Day Delivery',
      '24/7 Priority Support',
      'Brand Guidelines',
      'Prototype / Animation',
      'Dedicated Account Manager',
    ],
    process: [
      { step: '01', title: 'Dedicated Onboarding', desc: 'Your account manager walks you through every detail of the process.' },
      { step: '02', title: 'Concept Presentation', desc: '5 fully developed design concepts delivered for your review.' },
      { step: '03', title: 'Perfect Delivery', desc: 'Refined to perfection — all files, assets, and guidelines included.' },
    ],
    gumroadLink: 'https://rajputdesignsstudio.gumroad.com/l/hqskdn',
    isContact: false,
  },
  custom: {
    slug: 'custom',
    name: 'Custom',
    tagline: 'Fully bespoke design for unique, large-scale projects.',
    price: 'Custom Quote',
    priceNote: 'based on project scope',
    badge: null,
    category: 'Design Package',
    icon: '🎯',
    deliveryDays: 'Flexible',
    revisions: 'Unlimited',
    description:
      'Need something beyond the standard packages? We build fully tailored solutions for complex briefs — from large campaigns to ongoing design retainers.',
    features: [
      'Fully Customised Package',
      'Dedicated Team',
      'Flexible Timeline',
      'All Deliverables Included',
      'Ongoing Support',
    ],
    process: [
      { step: '01', title: 'Discovery Call', desc: 'A free consultation to understand your project scope and goals.' },
      { step: '02', title: 'Tailored Proposal', desc: 'We send a detailed proposal with pricing and timeline.' },
      { step: '03', title: 'Project Kickoff', desc: 'Once approved, your dedicated team begins immediately.' },
    ],
    gumroadLink: null,
    isContact: true,
  },
  'logo-design': {
    slug: 'logo-design',
    name: 'Logo Design',
    tagline: 'A professional logo that defines your brand identity.',
    price: '$65',
    priceNote: 'one-time payment',
    badge: null,
    category: 'Specialty Package',
    icon: '✏️',
    deliveryDays: '3–5 days',
    revisions: '5 revisions',
    description:
      'Three distinct logo concepts crafted specifically for your brand, delivered in every format you need — print, web, and social media.',
    features: [
      '3 Logo Concepts',
      '5 Revisions',
      'All Formats (PNG, SVG, PDF, AI)',
      'Transparent Background',
      'Colour + B&W Versions',
      '3–5 Day Delivery',
    ],
    process: [
      { step: '01', title: 'Place Your Order', desc: 'Complete secure checkout — Gumroad handles payment safely.' },
      { step: '02', title: 'Brand Brief', desc: 'Share your industry, style preferences, and examples you love.' },
      { step: '03', title: 'Logo Delivered', desc: '3 concepts in 3–5 days. Choose, refine, receive all files.' },
    ],
    gumroadLink: 'https://rajputdesignsstudio.gumroad.com/l/lfusys',
    isContact: false,
  },
  'full-branding': {
    slug: 'full-branding',
    name: 'Full Branding',
    tagline: 'Complete brand identity built from scratch.',
    price: '$249',
    priceNote: 'one-time payment',
    badge: 'Best Value',
    category: 'Specialty Package',
    icon: '🎨',
    deliveryDays: '7–10 days',
    revisions: '5 revisions',
    description:
      'Everything your brand needs to look cohesive across every touchpoint — logo, stationery, social media kit, and a full brand style guide.',
    features: [
      'Logo Design (3 Concepts)',
      'Business Card Design',
      'Letterhead & Envelope',
      'Social Media Profile Kit',
      'Brand Style Guide (Colours, Fonts)',
      'All Source Files (AI / PSD)',
      '7–10 Day Delivery',
    ],
    process: [
      { step: '01', title: 'Place Your Order', desc: 'Secure payment via Gumroad — everything handled online.' },
      { step: '02', title: 'Brand Discovery', desc: 'Deep-dive questionnaire to capture your brand personality.' },
      { step: '03', title: 'Full Brand Delivery', desc: 'Logo, stationery, social kit, and guidelines — all delivered.' },
    ],
    gumroadLink: 'https://rajputdesignsstudio.gumroad.com/l/xyoxh',
    isContact: false,
  },
  'menu-design': {
    slug: 'menu-design',
    name: 'Menu Design',
    tagline: 'Professional restaurant & café menus that sell.',
    price: '$79',
    priceNote: 'one-time payment',
    badge: null,
    category: 'Specialty Package',
    icon: '🍽️',
    deliveryDays: '3–5 days',
    revisions: '3 revisions',
    description:
      'Eye-catching, print-ready menus designed for restaurants, cafés, and food businesses. Delivered in PDF and editable source format.',
    features: [
      'Up to 2 Pages / Sides',
      '2 Design Concepts',
      '3 Revisions',
      'Print-Ready PDF + Source File',
      '3–5 Day Delivery',
    ],
    process: [
      { step: '01', title: 'Place Your Order', desc: 'Checkout securely on Gumroad in under a minute.' },
      { step: '02', title: 'Send Your Menu', desc: 'Share your menu items, brand colours, and any references.' },
      { step: '03', title: 'Print-Ready Delivery', desc: 'Receive print-ready PDF and editable source files.' },
    ],
    gumroadLink: 'https://rajputdesignsstudio.gumroad.com/l/wjrpnc',
    isContact: false,
  },
  'promotion-poster': {
    slug: 'promotion-poster',
    name: 'Promotion Poster',
    tagline: 'Eye-catching posters that stop the scroll.',
    price: '$39',
    priceNote: 'one-time payment',
    badge: null,
    category: 'Specialty Package',
    icon: '📣',
    deliveryDays: '48 hours',
    revisions: '3 revisions',
    description:
      'Vibrant, high-impact poster designs for social media and print — built to grab attention and communicate your message instantly.',
    features: [
      '1 Poster Design',
      '3 Revisions',
      'Social & Print Sizes Included',
      'Source File (PSD / AI)',
      '48-Hour Delivery',
    ],
    process: [
      { step: '01', title: 'Place Your Order', desc: 'Quick and secure checkout via Gumroad.' },
      { step: '02', title: 'Share Your Brief', desc: 'Tell us the offer, event, or message to promote.' },
      { step: '03', title: 'Poster Ready', desc: 'High-resolution files ready for print and social in 48 hours.' },
    ],
    gumroadLink: 'https://rajputdesignsstudio.gumroad.com/l/ncnkbh',
    isContact: false,
  },
  'banner-design': {
    slug: 'banner-design',
    name: 'Banner Design',
    tagline: 'Web banners, social covers & digital ads — pixel-perfect.',
    price: '$55',
    priceNote: 'one-time payment',
    badge: null,
    category: 'Specialty Package',
    icon: '🖼️',
    deliveryDays: '2–3 days',
    revisions: '3 revisions',
    description:
      'Professional digital banners sized for every platform — websites, social media covers, and paid advertising formats.',
    features: [
      'Up to 5 Banner Sizes',
      '2 Design Concepts',
      '3 Revisions',
      'PNG + Source Files',
      '2–3 Day Delivery',
    ],
    process: [
      { step: '01', title: 'Place Your Order', desc: 'Checkout securely on Gumroad.' },
      { step: '02', title: 'Share Requirements', desc: 'Tell us which platforms and what message to feature.' },
      { step: '03', title: 'Banners Delivered', desc: 'All sizes exported in PNG + editable source files.' },
    ],
    gumroadLink: 'https://rajputdesignsstudio.gumroad.com/l/dbcfxs',
    isContact: false,
  },
  bundle: {
    slug: 'bundle',
    name: 'Bundle Package',
    tagline: 'Posters + Banners + Social Media Kit — save 40%.',
    price: '$179',
    priceNote: 'one-time payment',
    badge: 'Save 40%',
    category: 'Specialty Package',
    icon: '📦',
    deliveryDays: '7–10 days',
    revisions: 'Unlimited',
    description:
      'The complete marketing design bundle — five posters, five banners, and a full social media profile kit, all at a massive saving over individual orders.',
    features: [
      '5 Promotion Posters',
      '5 Banner Designs',
      'Social Media Profile Kit',
      'Unlimited Revisions',
      'All Source Files',
      '7–10 Day Delivery',
      'Priority Support',
    ],
    process: [
      { step: '01', title: 'Place Your Order', desc: 'Secure checkout via Gumroad — one payment covers everything.' },
      { step: '02', title: 'Campaign Brief', desc: 'Share your brand, promotions, and campaign goals.' },
      { step: '03', title: 'Full Kit Delivered', desc: 'All posters, banners, and social kit files — complete and ready.' },
    ],
    gumroadLink: 'https://rajputdesignsstudio.gumroad.com/l/kucwct',
    isContact: false,
  },
  'website-design': {
    slug: 'website-design',
    name: 'Website Design',
    tagline: 'Modern, mobile-ready website UI — built in Figma.',
    price: '$149',
    priceNote: 'one-time payment',
    badge: null,
    category: 'Specialty Package',
    icon: '💻',
    deliveryDays: '7–10 days',
    revisions: '5 revisions',
    description:
      'A clean, conversion-focused website design for up to 5 pages. Delivered as Figma and PSD source files, ready for development.',
    features: [
      'Up to 5 Pages',
      '2 Design Concepts',
      '5 Revisions',
      'Mobile + Desktop Layouts',
      'Figma / PSD Source Files',
      '7–10 Day Delivery',
    ],
    process: [
      { step: '01', title: 'Place Your Order', desc: 'Checkout securely on Gumroad.' },
      { step: '02', title: 'Site Brief', desc: 'Share your brand, goals, pages needed, and any references.' },
      { step: '03', title: 'Design Delivered', desc: 'Figma + PSD files for all pages — desktop and mobile.' },
    ],
    gumroadLink: 'https://rajputdesignsstudio.gumroad.com/l/ghmoo',
    isContact: false,
  },
};

function CheckoutPage() {
  const { slug } = useParams();
  const pkg = PACKAGES[slug];

  if (!pkg) return <Navigate to="/pricing" replace />;

  const metaTitle = `Order ${pkg.name} Package — ${pkg.price} | Rajput Designs Studio`;
  const metaDesc = `${pkg.description} Secure checkout via Gumroad. ${pkg.deliveryDays} delivery, ${pkg.revisions} included.`;

  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDesc} />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href={`https://www.rajputdesignsstudio.com/checkout/${slug}`} />
      </Helmet>

      <div className="min-h-screen bg-[#042C53] text-white overflow-x-hidden">
        {/* Ambient background blobs */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-[0.06]"
            style={{ background: 'radial-gradient(circle, #378ADD 0%, transparent 70%)' }} />
          <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full opacity-[0.05]"
            style={{ background: 'radial-gradient(circle, #378ADD 0%, transparent 70%)' }} />
        </div>

        {/* Header */}
        <header className="sticky top-0 z-50 glass-panel border-b border-[hsla(var(--primary)/0.1)]">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
            <Link
              to="/pricing"
              className="flex items-center gap-2 text-white hover:text-[hsl(var(--primary))] transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium uppercase tracking-wider text-sm">Back to Pricing</span>
            </Link>
            <img
              src="https://i.postimg.cc/FFL8k0MJ/Rajput-Desgins-Logo-without-background-for-website-01.png"
              alt="Rajput Designs Studio"
              style={{ height: '42px', width: 'auto' }}
            />
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-5 sm:px-8 pt-10 sm:pt-14 pb-24 relative">
          {/* ── Package Hero Bar ── */}
          <FadeIn delay={0} y={20}>
            <div className="mb-8 sm:mb-10 p-6 sm:p-8 rounded-3xl glass-panel border border-[hsla(var(--primary)/0.2)] relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.04]"
                style={{ background: 'radial-gradient(ellipse at top left, #378ADD 0%, transparent 60%)' }} />
              <div className="relative flex flex-col sm:flex-row sm:items-center gap-5">
                <div className="text-5xl sm:text-6xl leading-none select-none">{pkg.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {pkg.badge && (
                      <span className="text-xs font-bold uppercase tracking-wider bg-[hsl(var(--primary))] text-[hsl(var(--background))] px-3 py-1 rounded-full">
                        {pkg.badge}
                      </span>
                    )}
                    <span className="text-white/40 text-xs uppercase tracking-widest">{pkg.category}</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-white leading-tight">
                    {pkg.name} <span className="text-[hsl(var(--primary))]">Package</span>
                  </h1>
                  <p className="text-white/60 mt-1 text-sm sm:text-base font-light">{pkg.tagline}</p>
                </div>
                <div className="sm:text-right shrink-0">
                  <div className="text-4xl sm:text-5xl font-black text-[hsl(var(--primary))] glow-text-cyan">{pkg.price}</div>
                  <div className="text-white/40 text-sm mt-1">{pkg.priceNote}</div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* ── Two Column Layout ── */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">

            {/* ── LEFT: Details ── */}
            <div className="flex flex-col gap-8">

              {/* Description */}
              <FadeIn delay={0.05} y={20}>
                <div className="glass-panel border border-[hsla(var(--primary)/0.15)] rounded-3xl p-6 sm:p-8">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-[hsl(var(--primary))] mb-4">About This Package</h2>
                  <p className="text-white/75 leading-relaxed text-base">{pkg.description}</p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-[hsla(var(--primary)/0.1)]">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-[hsl(var(--primary))] shrink-0" />
                      <div>
                        <div className="text-white/40 text-xs uppercase tracking-wider">Delivery</div>
                        <div className="text-white font-semibold text-sm">{pkg.deliveryDays}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <RefreshCw className="w-5 h-5 text-[hsl(var(--primary))] shrink-0" />
                      <div>
                        <div className="text-white/40 text-xs uppercase tracking-wider">Revisions</div>
                        <div className="text-white font-semibold text-sm">{pkg.revisions}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="w-5 h-5 text-[hsl(var(--primary))] shrink-0" />
                      <div>
                        <div className="text-white/40 text-xs uppercase tracking-wider">Payment</div>
                        <div className="text-white font-semibold text-sm">Secured</div>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Features */}
              <FadeIn delay={0.1} y={20}>
                <div className="glass-panel border border-[hsla(var(--primary)/0.15)] rounded-3xl p-6 sm:p-8">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-[hsl(var(--primary))] mb-5">What's Included</h2>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                    {pkg.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full bg-[hsla(var(--primary)/0.15)] border border-[hsla(var(--primary)/0.4)] flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-[hsl(var(--primary))]" />
                        </span>
                        <span className="text-white/80 text-sm leading-snug">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>

              {/* How It Works */}
              <FadeIn delay={0.15} y={20}>
                <div className="glass-panel border border-[hsla(var(--primary)/0.15)] rounded-3xl p-6 sm:p-8">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-[hsl(var(--primary))] mb-6">How It Works</h2>
                  <div className="flex flex-col gap-6">
                    {pkg.process.map((step, i) => (
                      <div key={i} className="flex gap-5 items-start">
                        <div className="shrink-0 w-10 h-10 rounded-2xl bg-[hsla(var(--primary)/0.1)] border border-[hsla(var(--primary)/0.3)] flex items-center justify-center">
                          <span className="text-[hsl(var(--primary))] font-black text-xs">{step.step}</span>
                        </div>
                        <div>
                          <div className="text-white font-bold text-sm mb-1">{step.title}</div>
                          <div className="text-white/60 text-sm font-light leading-relaxed">{step.desc}</div>
                        </div>
                        {i < pkg.process.length - 1 && (
                          <div className="hidden" /> /* connector handled via gap */
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* Trust / Guarantee row */}
              <FadeIn delay={0.2} y={20}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { icon: <Lock className="w-5 h-5" />, title: 'Secure Payment', sub: 'SSL-encrypted checkout via Gumroad' },
                    { icon: <Award className="w-5 h-5" />, title: 'Quality Guaranteed', sub: 'We revise until you\'re satisfied' },
                    { icon: <Zap className="w-5 h-5" />, title: 'Fast Turnaround', sub: 'Delivery within agreed timeframe' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 glass-panel border border-[hsla(var(--primary)/0.15)] rounded-2xl p-4">
                      <span className="text-[hsl(var(--primary))] shrink-0 mt-0.5">{item.icon}</span>
                      <div>
                        <div className="text-white font-bold text-sm">{item.title}</div>
                        <div className="text-white/50 text-xs font-light mt-0.5">{item.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>

            {/* ── RIGHT: Sticky Order Card ── */}
            <FadeIn delay={0.1} y={20}>
              <div className="lg:sticky lg:top-24 flex flex-col gap-4">

                {/* Order Summary Card */}
                <div className="rounded-3xl border-2 border-[hsl(var(--primary))] overflow-hidden relative"
                  style={{ background: 'linear-gradient(135deg, rgba(55,138,221,0.08) 0%, rgba(4,44,83,0.95) 100%)' }}>
                  <div className="absolute inset-0 opacity-[0.06]"
                    style={{ background: 'radial-gradient(ellipse at top right, #378ADD 0%, transparent 60%)' }} />

                  <div className="relative p-6 sm:p-7">
                    <div className="text-xs font-bold uppercase tracking-widest text-[hsl(var(--primary))] mb-5">Order Summary</div>

                    <div className="flex items-center justify-between pb-4 border-b border-[hsla(var(--primary)/0.15)]">
                      <div>
                        <div className="text-white font-bold">{pkg.name} Package</div>
                        <div className="text-white/50 text-xs">{pkg.category}</div>
                      </div>
                      <div className="text-[hsl(var(--primary))] font-black text-xl">{pkg.price}</div>
                    </div>

                    <ul className="my-4 flex flex-col gap-2">
                      {pkg.features.slice(0, 4).map((f, i) => (
                        <li key={i} className="flex items-center gap-2 text-white/60 text-xs">
                          <Check className="w-3 h-3 text-[hsl(var(--primary))] shrink-0" />
                          {f}
                        </li>
                      ))}
                      {pkg.features.length > 4 && (
                        <li className="text-white/40 text-xs pl-5">+ {pkg.features.length - 4} more included</li>
                      )}
                    </ul>

                    <div className="flex items-center justify-between py-3 border-t border-[hsla(var(--primary)/0.15)] mb-5">
                      <span className="text-white/60 text-sm">Total</span>
                      <span className="text-white font-black text-2xl">{pkg.price}</span>
                    </div>

                    {/* CTA Button */}
                    <a
                      href={pkg.isContact
                        ? `mailto:hello@rajputdesignsstudio.com?subject=Custom%20Project%20Enquiry&body=Hi%2C%20I%27d%20like%20to%20discuss%20a%20custom%20project.`
                        : `https://wa.me/923365843243?text=${encodeURIComponent(`Hi! I'd like to order the ${pkg.name} Package (${pkg.price}). Please guide me on next steps.`)}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all duration-300 flex items-center justify-center gap-2 glow-cyan-subtle hover:brightness-110 active:scale-[0.98]"
                      style={{ background: 'linear-gradient(135deg, #378ADD 0%, #1a5fa8 100%)', color: '#fff' }}
                    >
                      <MessageCircle className="w-5 h-5" />
                      {pkg.isContact ? 'Send Enquiry' : 'Order via WhatsApp'}
                    </a>

                    <div className="flex items-center justify-center gap-2 mt-3">
                      <ShieldCheck className="w-3.5 h-3.5 text-white/30" />
                      <span className="text-white/30 text-xs">We reply within a few hours</span>
                    </div>
                  </div>
                </div>

                {/* Need help? */}
                <div className="glass-panel border border-[hsla(var(--primary)/0.15)] rounded-2xl p-5 text-center">
                  <div className="text-white/50 text-xs mb-3">Have a question before ordering?</div>
                  <Link
                    to="/#contact"
                    className="inline-flex items-center gap-2 text-[hsl(var(--primary))] font-bold text-sm uppercase tracking-wider hover:text-white transition-colors group"
                  >
                    <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    Talk to Us First
                  </Link>
                </div>

                {/* Other packages */}
                <div className="glass-panel border border-[hsla(var(--primary)/0.1)] rounded-2xl p-5">
                  <div className="text-white/40 text-xs uppercase tracking-wider mb-3">Compare All Packages</div>
                  <Link
                    to="/pricing"
                    className="flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors group"
                  >
                    <span className="text-[hsl(var(--primary))] group-hover:translate-x-1 transition-transform">→</span>
                    View all plans & pricing
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </main>
      </div>
    </>
  );
}

export default CheckoutPage;
