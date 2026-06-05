import React, { useRef, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, Award, PenTool, Languages, Mail, Linkedin, Instagram, ArrowRight, Star } from 'lucide-react';
import FadeIn from '@/components/FadeIn.jsx';
import Magnet from '@/components/Magnet.jsx';
import AnimatedText from '@/components/AnimatedText.jsx';
import ServiceCard from '@/components/ServiceCard.jsx';
import ProjectCard from '@/components/ProjectCard.jsx';

const allImages = [
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=380&h=240&fit=crop&auto=format&q=70',
  'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=380&h=240&fit=crop&auto=format&q=70',
  'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=380&h=240&fit=crop&auto=format&q=70',
  'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=380&h=240&fit=crop&auto=format&q=70',
  'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=380&h=240&fit=crop&auto=format&q=70',
  'https://images.unsplash.com/photo-1576153192396-180ecef2a715?w=380&h=240&fit=crop&auto=format&q=70',
  'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=380&h=240&fit=crop&auto=format&q=70',
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=380&h=240&fit=crop&auto=format&q=70',
  'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=380&h=240&fit=crop&auto=format&q=70',
  'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=380&h=240&fit=crop&auto=format&q=70',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=380&h=240&fit=crop&auto=format&q=70',
  'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=380&h=240&fit=crop&auto=format&q=70',
  'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=380&h=240&fit=crop&auto=format&q=70',
  'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=380&h=240&fit=crop&auto=format&q=70',
  'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=380&h=240&fit=crop&auto=format&q=70',
  'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=380&h=240&fit=crop&auto=format&q=70',
  'https://images.unsplash.com/photo-1523726491678-bf852e717f6a?w=380&h=240&fit=crop&auto=format&q=70',
  'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=380&h=240&fit=crop&auto=format&q=70',
  'https://images.unsplash.com/photo-1561070791-36c11767b26a?w=380&h=240&fit=crop&auto=format&q=70',
  'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=380&h=240&fit=crop&auto=format&q=70',
  'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=380&h=240&fit=crop&auto=format&q=70',
];

const row1Images = allImages.slice(0, 11);
const row2Images = allImages.slice(11, 21);

const services = [
  { number: '01', name: 'Graphic Design', description: 'Creating visually compelling designs for marketing materials, branding, and digital assets that communicate brand identity and engage audiences.' },
  { number: '02', name: 'Adobe Creative Suite', description: 'Expert proficiency in Photoshop, Illustrator, and InDesign for professional print and digital design work.' },
  { number: '03', name: 'Figma Design', description: 'Modern UI/UX design and prototyping using Figma for web and app interfaces with attention to user experience.' },
  { number: '04', name: 'Print Design', description: 'Professional print design including branding materials, proposals, and marketing collateral for high-stakes projects.' }
];

const projects = [
  {
    number: '01',
    name: "Print & Digital Design - Food & Restaurant Branding",
    category: 'Print & Digital',
    description: "Comprehensive design suite for food and restaurant brands including promotional flyers, menu designs, and marketing materials. Features bold typography, vibrant color schemes, compelling visual hierarchy, and strategic use of food imagery to drive customer engagement and brand recognition.",
    images: [
      'https://horizons-cdn.hostinger.com/a0966b37-06c7-4331-9849-3d170f68d2ed/7ea46274f50ddf435f18c05def36b613.png',
      'https://horizons-cdn.hostinger.com/a0966b37-06c7-4331-9849-3d170f68d2ed/6ff4a4421ec6b2f271683aff372cae47.jpg',
      'https://horizons-cdn.hostinger.com/a0966b37-06c7-4331-9849-3d170f68d2ed/0d539764c663a87bef648a3a5ac4f680.jpg',
      'https://horizons-cdn.hostinger.com/a0966b37-06c7-4331-9849-3d170f68d2ed/137d29c2299119a30e31a18b3ddc35a0.jpg',
      'https://horizons-cdn.hostinger.com/a0966b37-06c7-4331-9849-3d170f68d2ed/6108b17e80dd90eda7d6f829a1638469.jpg',
      'https://horizons-cdn.hostinger.com/a0966b37-06c7-4331-9849-3d170f68d2ed/3b85874f92af44f489b1b30d55460856.png',
      'https://horizons-cdn.hostinger.com/a0966b37-06c7-4331-9849-3d170f68d2ed/1851e7253a46ce84ad0f7ef916a00af6.png'
    ],
    role: 'Graphic Designer', year: '2025', client: "Multiple Food & Restaurant Brands"
  },
  {
    number: '02',
    name: "Web UI Overhaul",
    category: 'Web Design & UI/UX',
    description: "Modern portfolio website redesign featuring clean navigation, responsive layout, and engaging visual hierarchy. Designed to showcase creative work with smooth animations, glassmorphism effects, and intuitive user experience across all devices.",
    image: 'https://horizons-cdn.hostinger.com/a0966b37-06c7-4331-9849-3d170f68d2ed/4016f71bbfb257d2ecafb261dddf6cfb.jpg',
    role: 'UI/UX Designer', year: '2025', client: 'Portfolio Project'
  },
  {
    number: '03',
    name: "UNO Game App UI/UX Design",
    category: 'UI/UX App Design',
    description: "Comprehensive UI/UX design for a multiplayer card game application. Features vibrant 3D environments, intuitive game flow, engaging user interface, and seamless multiplayer experience.",
    images: [
      'https://horizons-cdn.hostinger.com/a0966b37-06c7-4331-9849-3d170f68d2ed/c68cbd9f04d8564f4e985e5198c34b7f.jpg',
      'https://horizons-cdn.hostinger.com/a0966b37-06c7-4331-9849-3d170f68d2ed/1b62472e3ad79527bc841696bf9a52cb.jpg',
      'https://horizons-cdn.hostinger.com/a0966b37-06c7-4331-9849-3d170f68d2ed/fd9a34b810b2806d3fb79d3ef40f22fc.jpg',
      'https://horizons-cdn.hostinger.com/a0966b37-06c7-4331-9849-3d170f68d2ed/d6d094413910abf82250ad80ada7deb2.jpg',
      'https://horizons-cdn.hostinger.com/a0966b37-06c7-4331-9849-3d170f68d2ed/bac012a2d1cbaf0ec8da4d86aefbc5ae.jpg'
    ],
    role: 'UI/UX Designer', year: '2025', client: 'Game Development Project'
  }
];

const skills = [
  { name: 'Adobe Photoshop', value: 100 },
  { name: 'Adobe Illustrator', value: 100 },
  { name: 'Figma', value: 100 },
  { name: 'Adobe InDesign', value: 100 },
  { name: 'Canva', value: 100 },
  { name: 'Print Design', value: 100 },
  { name: 'Presentation Design', value: 100 }
];

const languages = [
  { name: 'English', score: 10 },
  { name: 'Urdu', score: 8 },
  { name: 'Hindi', score: 4 }
];

const experience = [
  { period: 'Oct 2025 – March 2026', company: 'Mentisera (Remote)', role: 'Graphic Designer', desc: 'Directing digital transformation efforts to modernize school systems through technology-enabled visual solutions.' },
  { period: 'May 2025 – Aug 2025', company: 'iae GLOBAL Pakistan', role: 'Junior Graphic Designer', desc: 'Developed high-stakes proposal materials and marketing collateral, ensuring alignment with global brand standards.' },
  { period: 'Sept 2024 – Dec 2024', company: 'Hadi E-Learning', role: 'Junior Graphic Designer', desc: 'Created motion graphics and digital illustrations for e-learning platforms, improving student engagement.' }
];

const certifications = [
  { name: 'Foundations of User Experience (UX) Design', issuer: 'Google (via Coursera)', date: 'January 26, 2026' },
  { name: 'Figma Design Basics and Features', issuer: 'Alison (CPD Certified)', date: 'November 5, 2024' },
  { name: 'Graphic Designing Mastery', issuer: 'Hadi E-Learning System', date: 'September 4, 2024' }
];

// ─── HELPER: Format relative time ─────────────────────────────────────────────
const formatRelativeTime = (timestamp) => {
  try {
    const now = new Date();
    const reviewDate = new Date(timestamp * 1000);
    const diffMs = now - reviewDate;
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    if (diffSecs < 60) return 'now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffWeeks < 4) return `${diffWeeks}w ago`;
    if (diffMonths < 12) return `${diffMonths}mo ago`;
    return `${diffYears}y ago`;
  } catch (e) {
    return 'recently';
  }
};

// ─── HELPER: Get initials from name ───────────────────────────────────────────
const getInitials = (name) => {
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

// ─── HELPER: Generate avatar color from name ─────────────────────────────────
const getAvatarColor = (name) => {
  const colors = [
    { bg: '#E6F1FB', text: '#0C447C' },
    { bg: '#EAF3DE', text: '#27500A' },
    { bg: '#FAECE7', text: '#712B13' },
    { bg: '#FAEEDA', text: '#633806' },
    { bg: '#FBEAF0', text: '#72243E' },
    { bg: '#EEEDFE', text: '#3C3489' },
    { bg: '#E1F5EE', text: '#085041' },
    { bg: '#FCEBEB', text: '#791F1F' },
  ];
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
};

// ─── REVIEW MODAL ─────────────────────────────────────────────────────────────
const ReviewModal = ({ review, onClose, onPrev, onNext, current, total }) => {
  React.useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext]);

  if (!review) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(4, 44, 83, 0.7)',
        backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
        animation: 'tmModalBgIn 0.25s ease',
      }}
    >
      {/* Prev arrow */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        style={{
          position: 'absolute', left: '16px',
          top: '50%', transform: 'translateY(-50%)',
          width: '44px', height: '44px', borderRadius: '50%',
          background: 'white', border: '1.5px solid #378ADD',
          color: '#378ADD', fontSize: '20px', fontWeight: '700',
          cursor: 'pointer', display: 'flex', alignItems: 'center',
          justifyContent: 'center', transition: 'all 0.2s',
          boxShadow: '0 4px 16px rgba(55,138,221,0.2)',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = '#378ADD'; e.currentTarget.style.color = '#fff'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = '#378ADD'; }}
        aria-label="Previous review"
      >
        ←
      </button>

      {/* Next arrow */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        style={{
          position: 'absolute', right: '16px',
          top: '50%', transform: 'translateY(-50%)',
          width: '44px', height: '44px', borderRadius: '50%',
          background: 'white', border: '1.5px solid #378ADD',
          color: '#378ADD', fontSize: '20px', fontWeight: '700',
          cursor: 'pointer', display: 'flex', alignItems: 'center',
          justifyContent: 'center', transition: 'all 0.2s',
          boxShadow: '0 4px 16px rgba(55,138,221,0.2)',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = '#378ADD'; e.currentTarget.style.color = '#fff'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = '#378ADD'; }}
        aria-label="Next review"
      >
        →
      </button>

      {/* Modal card */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#fff',
          borderRadius: '24px',
          maxWidth: '560px',
          width: '100%',
          padding: '2.5rem',
          position: 'relative',
          boxShadow: '0 32px 80px rgba(4,44,83,0.25)',
          animation: 'tmModalCardIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        {/* Top accent bar */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
          background: 'linear-gradient(to right, #378ADD, #185FA5)',
          borderRadius: '24px 24px 0 0',
        }} />

        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '1.2rem', right: '1.2rem',
            width: '32px', height: '32px', borderRadius: '50%',
            background: '#F1F5F9', border: 'none',
            color: '#64748B', fontSize: '18px', lineHeight: 1,
            cursor: 'pointer', display: 'flex', alignItems: 'center',
            justifyContent: 'center', transition: 'all 0.18s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#FECACA'; e.currentTarget.style.color = '#DC2626'; }}
          onMouseLeave={e => { e.currentTarget.style.background = '#F1F5F9'; e.currentTarget.style.color = '#64748B'; }}
          aria-label="Close"
        >
          ✕
        </button>

        {/* Counter */}
        <div style={{
          fontSize: '11px', color: '#9CA3AF', fontWeight: '600',
          letterSpacing: '0.08em', textTransform: 'uppercase',
          marginBottom: '1.25rem',
        }}>
          Review {current + 1} of {total}
        </div>

        {/* Stars */}
        <div style={{ display: 'flex', gap: '3px', marginBottom: '1rem' }}>
          {[...Array(review.rating)].map((_, i) => (
            <Star key={i} size={20} className="fill-[#F59E0B] text-[#F59E0B]" />
          ))}
        </div>

        {/* Big quote mark */}
        <div style={{
          fontSize: '72px', lineHeight: 0.8, color: '#378ADD',
          opacity: 0.12, marginBottom: '0.5rem', fontFamily: 'Georgia, serif',
        }}>
          "
        </div>

        {/* Full review text */}
        <p style={{
          fontSize: '1.05rem', lineHeight: '1.8',
          color: '#1E293B', margin: '0 0 1.75rem',
          fontWeight: '400',
        }}>
          {review.text}
        </p>

        {/* Divider */}
        <div style={{ height: '1px', background: '#E8EEF5', marginBottom: '1.25rem' }} />

        {/* Author row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {review.profilePhoto ? (
            <img
              src={review.profilePhoto}
              alt={review.author}
              style={{
                width: '52px', height: '52px', borderRadius: '50%',
                flexShrink: 0, objectFit: 'cover',
                boxShadow: '0 4px 12px rgba(55,138,221,0.15)',
              }}
            />
          ) : (
            <div style={{
              width: '52px', height: '52px', borderRadius: '50%',
              background: review.color, color: review.textColor,
              fontSize: '17px', fontWeight: '700',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 4px 12px rgba(55,138,221,0.15)',
            }}>
              {review.initials}
            </div>
          )}
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontWeight: '700', fontSize: '15px', color: '#042C53' }}>{review.author}</p>
            <p style={{ margin: 0, fontSize: '13px', color: '#185FA5', marginTop: '2px' }}>{review.role}</p>
            <p style={{ margin: 0, fontSize: '11px', color: '#9CA3AF', marginTop: '2px' }}>{review.date}</p>
          </div>
          {/* Google dots */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1px' }}>
            <div style={{ display: 'flex', gap: '3px', fontSize: '10px' }}>
              <span style={{ color: '#4285F4' }}>●</span>
              <span style={{ color: '#EA4335' }}>●</span>
            </div>
            <div style={{ display: 'flex', gap: '3px', fontSize: '10px' }}>
              <span style={{ color: '#FBBC05' }}>●</span>
              <span style={{ color: '#34A853' }}>●</span>
            </div>
            <span style={{ fontSize: '9px', color: '#9CA3AF', letterSpacing: '0.02em' }}>Google</span>
          </div>
        </div>

        {/* Keyboard hint */}
        <p style={{
          textAlign: 'center', fontSize: '11px', color: '#CBD5E1',
          marginTop: '1.5rem', marginBottom: 0,
        }}>
          Use ← → arrow keys to navigate · Esc to close
        </p>
      </div>

      <style>{`
        @keyframes tmModalBgIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes tmModalCardIn {
          from { opacity: 0; transform: scale(0.88) translateY(20px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
};

// ─── TESTIMONIAL CAROUSEL (infinite auto-scroll + arrows + click-to-expand) ───
const TestimonialCarouselMultiple = () => {
  const trackRef = React.useRef(null);
  const animRef = React.useRef(null);
  const pausedRef = React.useRef(false);
  const pixelOffsetRef = React.useRef(0);
  const currentCardRef = React.useRef(0);
  const animatingRef = React.useRef(false);

  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [avgRating, setAvgRating] = useState(5);
  const [totalReviews, setTotalReviews] = useState(0);
  const [modalIdx, setModalIdx] = React.useState(null);

  const CARD_W = 320;
  const GAP = 24;
  const STEP = CARD_W + GAP;
  const PAUSE_MS = 2400;
  const SLIDE_MS = 1200;

  // Manual reviews (no API needed)
  const fallbackReviews = [
    {
      id: 1,
      initials: null,
      color: '#E6F1FB',
      textColor: '#0C447C',
      rating: 5,
      date: '2 weeks ago',
      author: 'Saddar Engineering Works',
      role: 'CEO & Founder',
      text: 'I came to Rajput Designs Studio needing a complete brand identity for my company, Saddar Engineering Works. That meant a logo, website, business card, letterhead, and stamp. Everything done from scratch. They delivered on all of it, and I am genuinely happy with the results. The logo feels professional and fits the engineering industry well. The website looks clean and represents the business properly. The business card, letterhead, and stamp all follow the same visual direction, which is exactly what you want when you are building a brand. What stood out to me was that they understood the brief. I did not have to keep going back and forth endlessly. The work came back looking like a real business, not a template someone threw together in an hour. If you are a business owner in Pakistan looking for someone to handle your branding professionally, I would recommend Rajput Designs Studio without hesitation. They took my company from no identity to a complete brand, and the quality shows.',
      profilePhoto: 'https://i.postimg.cc/fbXspjM7/S-E-W-Logo-in-Dark-Blue-01.jpg',
    },
    {
      id: 2,
      initials: 'EA',
      color: '#EAF3DE',
      textColor: '#27500A',
      rating: 5,
      date: '2 weeks ago',
      author: 'Eman Arshad',
      role: 'Google Reviewer',
      text: 'Working with Rajput Designs Studio has been an absolute pleasure! His work is highly professional and reflects pure perfection in every detail. What impressed me the most was his lightning fast delivery and incredible responsiveness. He communicates exceptionally well, is extremely polite, and is always open to feedback and adjustments without any hesitation. I highly recommend him to anyone looking for top tier results!',
      profilePhoto: null,
    },
    {
      id: 3,
      initials: 'HM',
      color: '#FAECE7',
      textColor: '#712B13',
      rating: 5,
      date: '2 weeks ago',
      author: 'Hafiz Muhammad',
      role: 'Google Reviewer',
      text: 'I recently got my work done by Rajput Designs Studio and I must say the experience was outstanding. The team is highly professional, creative, and dedicated. They understood my requirements perfectly and delivered exceptional results on time. The quality of their work truly exceeded my expectations. Communication was smooth throughout the process and the pricing was very reasonable. If you are looking for a reliable and talented design studio, Rajput Design Studio is the place to go. Highly recommended!',
      profilePhoto: null,
    },
    {
      id: 4,
      initials: 'FA',
      color: '#FAEEDA',
      textColor: '#633806',
      rating: 5,
      date: '2 weeks ago',
      author: 'Fatima Afzaal',
      role: 'Google Reviewer',
      text: 'They are amazing! Great creativity and clean design work. Excellent sense of color and layout. You deliver quality work on time. Very professional and easy to work with.',
      profilePhoto: null,
    },
    {
      id: 5,
      initials: 'AM',
      color: '#FAEEDA',
      textColor: '#633806',
      rating: 5,
      date: 'Just now',
      author: 'Aman Arshad',
      role: 'Google Reviewer',
      text: 'I really liked my experience here. The staff was friendly, professional, and very helpful. The service was excellent, and everything was handled smoothly. The quality exceeded my expectations, and I would definitely recommend this place to others. Looking forward to visiting again! Rajputs Designs Studio is the best design studio in Pakistan.',
      profilePhoto: null,
    },
  ];

  // Load manual reviews on mount
  useEffect(() => {
    // Using manual reviews (no API needed)
    const formatted = fallbackReviews.map((review) => ({
      ...review,
    }));

    setTestimonials(formatted);
    setAvgRating(5);
    setTotalReviews(5);
    setLoading(false);
  }, []);

  const TOTAL = testimonials.length > 0 ? testimonials.length : 1;
  const allCards = testimonials.length > 0 ? [...testimonials, ...testimonials] : [];

  function easeInOut(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  function triggerVisible(idx) {
    const track = trackRef.current;
    if (!track || idx >= track.children.length) return;
    const card = track.children[idx];
    if (!card) return;
    const av = card.querySelector('.tm-av');
    const tx = card.querySelector('.tm-tx');
    if (av) { av.style.transform = 'scale(0.85)'; av.style.opacity = '0'; }
    if (tx) { tx.style.opacity = '0'; }
    requestAnimationFrame(() => {
      if (av) {
        av.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
        av.style.transform = 'scale(1)';
        av.style.opacity = '1';
      }
      if (tx) {
        tx.style.transition = 'opacity 0.5s ease 0.15s';
        tx.style.opacity = '1';
      }
    });
  }

  function slideNext() {
    if (animatingRef.current || pausedRef.current || testimonials.length === 0) return;
    animatingRef.current = true;
    const startOffset = pixelOffsetRef.current;
    const startTime = performance.now();

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / SLIDE_MS, 1);
      const eased = easeInOut(progress);
      pixelOffsetRef.current = startOffset + STEP * eased;
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(-${pixelOffsetRef.current}px)`;
      }
      if (progress < 1) {
        animRef.current = requestAnimationFrame(step);
      } else {
        currentCardRef.current++;
        if (currentCardRef.current >= TOTAL) {
          currentCardRef.current = 0;
          pixelOffsetRef.current = 0;
          if (trackRef.current) {
            trackRef.current.style.transition = 'none';
            trackRef.current.style.transform = 'translateX(0)';
          }
        }
        triggerVisible(currentCardRef.current + 2);
        animatingRef.current = false;
        animRef.current = setTimeout(slideNext, PAUSE_MS);
      }
    }
    animRef.current = requestAnimationFrame(step);
  }

  function slidePrev() {
    if (animatingRef.current || pausedRef.current || testimonials.length === 0) return;
    animatingRef.current = true;
    const startOffset = pixelOffsetRef.current;
    const startTime = performance.now();

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / SLIDE_MS, 1);
      const eased = easeInOut(progress);
      pixelOffsetRef.current = startOffset - STEP * eased;
      const safePx = pixelOffsetRef.current < 0
        ? STEP * TOTAL + pixelOffsetRef.current
        : pixelOffsetRef.current;
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(-${safePx}px)`;
      }
      if (progress < 1) {
        animRef.current = requestAnimationFrame(step);
      } else {
        if (pixelOffsetRef.current < 0) {
          pixelOffsetRef.current = STEP * TOTAL + pixelOffsetRef.current;
        }
        currentCardRef.current = Math.max(0, currentCardRef.current - 1);
        triggerVisible(currentCardRef.current);
        animatingRef.current = false;
        animRef.current = setTimeout(slideNext, PAUSE_MS);
      }
    }
    animRef.current = requestAnimationFrame(step);
  }

  function handleArrow(dir) {
    clearTimeout(animRef.current);
    cancelAnimationFrame(animRef.current);
    animatingRef.current = false;
    if (dir === 'next') slideNext();
    else slidePrev();
  }

  useEffect(() => {
    if (testimonials.length === 0) return;
    triggerVisible(0);
    triggerVisible(1);
    triggerVisible(2);
    animRef.current = setTimeout(slideNext, PAUSE_MS);
    return () => {
      clearTimeout(animRef.current);
      cancelAnimationFrame(animRef.current);
    };
  }, [testimonials.length]);

  useEffect(() => {
    if (modalIdx !== null) {
      pausedRef.current = true;
      clearTimeout(animRef.current);
      cancelAnimationFrame(animRef.current);
    } else {
      pausedRef.current = false;
      if (testimonials.length > 0) {
        animRef.current = setTimeout(slideNext, PAUSE_MS);
      }
    }
  }, [modalIdx]);

  const openModal = (realIdx) => setModalIdx(realIdx % (testimonials.length || 1));
  const closeModal = () => setModalIdx(null);
  const prevModal = () => setModalIdx((i) => (i - 1 + (testimonials.length || 1)) % (testimonials.length || 1));
  const nextModal = () => setModalIdx((i) => (i + 1) % (testimonials.length || 1));

  if (loading) {
    return (
      <div className="mt-12 text-center">
        <div className="inline-block animate-spin w-8 h-8 border-4 border-[#378ADD] border-t-transparent rounded-full"></div>
        <p className="text-[#185FA5] mt-4">Loading Google Reviews...</p>
      </div>
    );
  }

  return (
    <div className="mt-12">
      {/* Stars summary row */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={18} className="fill-[#F59E0B] text-[#F59E0B]" />
          ))}
        </div>
        <span className="text-[#042C53] font-bold text-lg">{avgRating.toFixed(1)}</span>
        <span className="text-[#185FA5] text-sm">· Based on {totalReviews} Google Reviews</span>
      </div>

      {/* Carousel row: arrows + track */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>

        {/* LEFT ARROW */}
        <button
          onClick={() => handleArrow('prev')}
          disabled={testimonials.length === 0}
          style={{
            flexShrink: 0,
            width: '44px', height: '44px', borderRadius: '50%',
            background: 'white',
            border: '1.5px solid #378ADD',
            color: '#378ADD', fontSize: '18px', fontWeight: '700',
            cursor: testimonials.length === 0 ? 'not-allowed' : 'pointer',
            display: 'flex', alignItems: 'center',
            justifyContent: 'center', transition: 'all 0.2s',
            boxShadow: '0 2px 12px rgba(55,138,221,0.15)',
            zIndex: 5,
            opacity: testimonials.length === 0 ? 0.5 : 1,
          }}
          onMouseEnter={e => { if (testimonials.length > 0) { e.currentTarget.style.background = '#378ADD'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'scale(1.08)'; } }}
          onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = '#378ADD'; e.currentTarget.style.transform = 'scale(1)'; }}
          aria-label="Previous reviews"
        >
          ←
        </button>

        {/* Track wrapper */}
        <div
          style={{ flex: 1, overflow: 'hidden', position: 'relative', padding: '0.5rem 0 1rem', minHeight: '320px' }}
          onMouseEnter={() => { pausedRef.current = true; }}
          onMouseLeave={() => {
            if (modalIdx === null) {
              pausedRef.current = false;
              if (!animatingRef.current && testimonials.length > 0) {
                clearTimeout(animRef.current);
                animRef.current = setTimeout(slideNext, PAUSE_MS);
              }
            }
          }}
        >
          {/* Left fade */}
          <div
            className="pointer-events-none absolute left-0 top-0 bottom-0 z-10"
            style={{ width: '60px', background: 'linear-gradient(to right, #ffffff, transparent)' }}
          />
          {/* Right fade */}
          <div
            className="pointer-events-none absolute right-0 top-0 bottom-0 z-10"
            style={{ width: '60px', background: 'linear-gradient(to left, #ffffff, transparent)' }}
          />

          {/* Scrolling track */}
          <div
            ref={trackRef}
            style={{
              display: 'flex',
              gap: `${GAP}px`,
              width: 'max-content',
              willChange: 'transform',
            }}
          >
            {allCards.map((r, idx) => (
              <div
                key={`${r.id}-${idx}`}
                onClick={() => openModal(idx)}
                style={{
                  width: `${CARD_W}px`,
                  flexShrink: 0,
                  background: '#F8FAFB',
                  border: '0.5px solid #E8EEF5',
                  borderRadius: '16px',
                  padding: '1.4rem',
                  boxSizing: 'border-box',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s, transform 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#378ADD';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 8px 28px rgba(55,138,221,0.14)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#E8EEF5';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Top accent line */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                  background: 'linear-gradient(to right, #378ADD, #185FA5)',
                  borderRadius: '16px 16px 0 0',
                }} />

                {/* Avatar + name row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                  {r.profilePhoto ? (
                    <img
                      src={r.profilePhoto}
                      alt={r.author}
                      className="tm-av"
                      style={{
                        width: '44px', height: '44px', borderRadius: '50%',
                        flexShrink: 0, objectFit: 'cover',
                        transform: 'scale(0.85)', opacity: 0,
                      }}
                    />
                  ) : (
                    <div
                      className="tm-av"
                      style={{
                        width: '44px', height: '44px', borderRadius: '50%',
                        background: r.color, color: r.textColor,
                        fontSize: '15px', fontWeight: '600',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                        transform: 'scale(0.85)', opacity: 0,
                      }}
                    >
                      {r.initials}
                    </div>
                  )}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ margin: 0, fontWeight: '600', fontSize: '14px', color: '#042C53' }}>{r.author}</p>
                    <p style={{ margin: 0, fontSize: '12px', color: '#9CA3AF' }}>{r.date}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '2px', fontSize: '9px', flexShrink: 0 }}>
                    <span style={{ color: '#4285F4' }}>●</span>
                    <span style={{ color: '#EA4335' }}>●</span>
                    <span style={{ color: '#FBBC05' }}>●</span>
                    <span style={{ color: '#34A853' }}>●</span>
                  </div>
                </div>

                {/* Stars */}
                <div style={{ display: 'flex', gap: '2px', marginBottom: '0.7rem' }}>
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} size={13} className="fill-[#F59E0B] text-[#F59E0B]" />
                  ))}
                </div>

                {/* Review text (truncated) */}
                <p
                  className="tm-tx"
                  style={{
                    margin: 0,
                    fontSize: '13.5px',
                    lineHeight: '1.65',
                    color: '#4B5563',
                    opacity: 0,
                    display: '-webkit-box',
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {r.text}
                </p>

                {/* Footer row */}
                <div style={{
                  marginTop: '1rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <span style={{
                    fontSize: '11px', color: '#378ADD', fontWeight: '600',
                    background: '#E6F1FB', padding: '3px 10px', borderRadius: '100px',
                  }}>
                    {r.role}
                  </span>
                  <span style={{ fontSize: '11px', color: '#9CA3AF' }}>
                    Click to read more →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT ARROW */}
        <button
          onClick={() => handleArrow('next')}
          disabled={testimonials.length === 0}
          style={{
            flexShrink: 0,
            width: '44px', height: '44px', borderRadius: '50%',
            background: 'white',
            border: '1.5px solid #378ADD',
            color: '#378ADD', fontSize: '18px', fontWeight: '700',
            cursor: testimonials.length === 0 ? 'not-allowed' : 'pointer',
            display: 'flex', alignItems: 'center',
            justifyContent: 'center', transition: 'all 0.2s',
            boxShadow: '0 2px 12px rgba(55,138,221,0.15)',
            zIndex: 5,
            opacity: testimonials.length === 0 ? 0.5 : 1,
          }}
          onMouseEnter={e => { if (testimonials.length > 0) { e.currentTarget.style.background = '#378ADD'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'scale(1.08)'; } }}
          onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = '#378ADD'; e.currentTarget.style.transform = 'scale(1)'; }}
          aria-label="Next reviews"
        >
          →
        </button>
      </div>

      {/* Write a Review button */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2.5rem', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
        <a
          href="https://share.google/m7CXc2AQYJc3Fa3ds"
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '12px 28px', borderRadius: '100px',
            border: '1.5px solid #4285F4', color: '#4285F4',
            fontWeight: '600', fontSize: '14px', textDecoration: 'none',
            background: 'white', transition: 'all 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#4285F4';
            e.currentTarget.style.color = '#fff';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'white';
            e.currentTarget.style.color = '#4285F4';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          ✏️ Write a Review
        </a>
        <p style={{ fontSize: '12px', color: '#9CA3AF', margin: 0 }}>
          Your review helps others find us — thank you!
        </p>
      </div>

      {/* Modal */}
      {modalIdx !== null && testimonials.length > 0 && (
        <ReviewModal
          review={testimonials[modalIdx]}
          current={modalIdx}
          total={testimonials.length}
          onClose={closeModal}
          onPrev={prevModal}
          onNext={nextModal}
        />
      )}
    </div>
  );
};

// ─── SVG / SOCIAL ICONS ───────────────────────────────────────────────────────
const BehanceIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 1.2.836 1.891 2.054 1.891.93 0 1.519-.455 1.702-1.157L23.726 17zm-7.686-4h4.965c-.105-1.547-.99-2.096-2.313-2.096-1.32 0-2.265.556-2.652 2.096zM9.25 7.34c1.456 0 2.483.717 2.483 2.12 0 .983-.493 1.64-1.23 1.94.985.26 1.73 1.03 1.73 2.31 0 1.76-1.3 2.79-3.09 2.79H2V7.34h7.25zm-4.917 3.7h3.84c.84 0 1.36-.42 1.36-1.15 0-.74-.52-1.13-1.36-1.13H4.333v2.28zm0 3.98h3.84c.984 0 1.558-.46 1.558-1.28 0-.79-.574-1.24-1.557-1.24H4.333v2.52z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const TikTokIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z" />
  </svg>
);

const SocialBtn = ({ href, icon, title }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    title={title}
    className="w-12 h-12 rounded-full glass-panel flex items-center justify-center hover:glow-cyan-subtle text-[hsl(var(--primary))] hover:text-white border border-transparent hover:border-[hsla(var(--primary)/0.3)] transition-all"
  >
    {icon}
  </a>
);

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage() {
  const marqueeRef = useRef(null);
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    let animationFrameId;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        animationFrameId = requestAnimationFrame(() => {
          if (marqueeRef.current && row1Ref.current && row2Ref.current) {
            const sectionTop = marqueeRef.current.offsetTop;
            const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
            row1Ref.current.style.transform = `translateX(${offset - 200}px)`;
            row2Ref.current.style.transform = `translateX(${-(offset - 200)}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleNavClick = (e, item) => {
    e.preventDefault();
    if (item.isRoute) {
      navigate(item.path);
    } else {
      const element = document.getElementById(item.id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, null, `#${item.id}`);
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Rajput Designs Studio</title>
        <meta name="description" content="Crafting simple, clear visuals that connect your brand with people." />
      </Helmet>

      <div className="overflow-x-clip bg-background">

        {/* ── SECTION 1 · HERO ── */}
        <section id="hero" className="h-screen flex flex-col overflow-x-clip relative">
          <FadeIn delay={0} y={-20}>
            <nav className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6 px-5 pt-5 sm:pt-6 md:pt-8 relative z-20 max-w-7xl mx-auto w-full">
              <img
                src="https://i.postimg.cc/FFL8k0MJ/Rajput-Desgins-Logo-without-background-for-website-01.png"
                alt="Rajput Designs Studio"
                className="w-24 h-14 sm:w-28 sm:h-16 md:w-32 md:h-20 object-contain"
              />
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-5 md:gap-8">
                {[
                  { label: 'About',    id: 'about',    isRoute: false },
                  { label: 'Services', id: 'services', isRoute: false },
                  { label: 'Pricing',  path: '/pricing', isRoute: true },
                  { label: 'Contact',  id: 'contact',  isRoute: false },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.isRoute ? item.path : `#${item.id}`}
                    onClick={(e) => handleNavClick(e, item)}
                    className="font-bold uppercase tracking-wider text-xs sm:text-sm md:text-base px-4 py-2 rounded-full border border-[hsl(var(--primary))] text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--background))] hover:glow-cyan-subtle transition-all duration-300"
                  >
                    {item.label}
                  </a>
                ))}
                <Link
                  to="/portfolio-gallery"
                  className="font-bold uppercase tracking-wider text-xs sm:text-sm md:text-base px-4 py-2 rounded-full border border-[hsl(var(--primary))] text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--background))] hover:glow-cyan-subtle transition-all duration-300 flex items-center gap-1"
                >
                  Projects <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </Link>
              </div>
            </nav>
          </FadeIn>

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-4 z-10" style={{ paddingTop: '100px' }}>
            <FadeIn delay={0.15} y={40} className="max-w-6xl mx-auto text-center pointer-events-auto">
              <Magnet padding={200} strength={1} activeTransition="transform 0.3s ease-out" inactiveTransition="transform 0.6s ease-in-out">
                <h1
                  className="font-black uppercase tracking-tight leading-[1.1] text-balance mb-4 drop-shadow-md"
                  style={{ fontSize: 'clamp(1.8rem, 6vw, 5rem)', letterSpacing: '-0.02em' }}
                >
                  <span style={{ color: '#ffffff' }}>Designs That Make </span>
                  <span style={{ color: '#378ADD' }}>People Stop Scrolling</span>
                </h1>
                <p
                  className="text-white font-light tracking-wide uppercase text-balance opacity-90"
                  style={{ fontSize: 'clamp(0.75rem, 2vw, 1.5rem)' }}
                >
                  I help brands look professional through branding, social media design, and digital visuals.
                </p>
              </Magnet>
            </FadeIn>
          </div>
        </section>

        {/* ── SECTION 2 · MARQUEE ── */}
        <section ref={marqueeRef} className="pt-10 pb-16 bg-background border-t border-[hsla(var(--primary)/0.1)]">
          <div className="flex flex-col gap-3">
            <div ref={row1Ref} className="flex gap-3" style={{ willChange: 'transform' }}>
              {[...row1Images, ...row1Images].map((src, index) => (
                <img
                  key={`r1-${index}`}
                  src={src}
                  alt={`Showcase ${index + 1}`}
                  className="rounded-2xl object-cover glow-cyan-subtle opacity-80 hover:opacity-100 transition-opacity"
                  style={{ width: '380px', height: '240px', flexShrink: 0, backgroundColor: 'rgba(0,217,255,0.05)' }}
                  loading={index < 8 ? 'eager' : 'lazy'}
                  decoding="async"
                  fetchpriority={index < 4 ? 'high' : 'auto'}
                />
              ))}
            </div>
            <div ref={row2Ref} className="flex gap-3" style={{ willChange: 'transform' }}>
              {[...row2Images, ...row2Images].map((src, index) => (
                <img
                  key={`r2-${index}`}
                  src={src}
                  alt={`Showcase ${index + 12}`}
                  className="rounded-2xl object-cover glow-cyan-subtle opacity-80 hover:opacity-100 transition-opacity"
                  style={{ width: '380px', height: '240px', flexShrink: 0, backgroundColor: 'rgba(0,217,255,0.05)' }}
                  loading="lazy"
                  decoding="async"
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 3 · ABOUT ── */}
        <section id="about" className="min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-24 relative bg-[#E6F1FB] border-t border-[#B5D4F4]">
          <FadeIn delay={0.1} x={-80} y={0} duration={0.9} className="absolute top-[5%] left-4 lg:left-12 xl:left-24">
            <div className="glass-panel p-4 rounded-2xl hidden md:block">
              <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png" alt="Moon icon" className="w-[100px] sm:w-[130px] md:w-[160px]" />
            </div>
          </FadeIn>
          <FadeIn delay={0.3} x={80} y={0} duration={0.9} className="absolute top-[5%] right-4 lg:right-12 xl:right-24">
            <div className="glass-panel p-4 rounded-2xl hidden md:block">
              <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png" alt="Lego icon" className="w-[100px] sm:w-[130px] md:w-[160px]" />
            </div>
          </FadeIn>
          <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16 relative z-10 w-full max-w-5xl mx-auto">
            <FadeIn delay={0} y={40}>
              <h2 className="font-black uppercase leading-none tracking-tight text-center mb-4" style={{ fontSize: 'clamp(3rem, 10vw, 120px)', letterSpacing: '-0.02em' }}>
                <span style={{ color: '#042C53' }}>About </span>
                <span style={{ color: '#378ADD' }}>Me</span>
              </h2>
            </FadeIn>
            <AnimatedText
              text="Graphic designer with 1+ year of experience in branding, social media design, and digital visuals. I use Photoshop, Illustrator, Figma, and InDesign to turn ideas into clean, professional designs that connect with the right people."
              className="text-[#0D1F3C] font-medium text-center leading-relaxed"
              style={{ fontSize: 'clamp(1rem, 2.5vw, 1.5rem)' }}
            />
          </div>
        </section>

        {/* ── SECTION 4 · SERVICES ── */}
        <section id="services" className="services-section bg-[#042C53] px-5 sm:px-8 md:px-10 py-24 sm:py-32 relative z-10 border-t border-[#0C3A6B]">
          <h2 className="font-black uppercase text-center mb-16 sm:mb-24" style={{ fontSize: 'clamp(3rem, 10vw, 120px)', letterSpacing: '-0.02em' }}>
            <span style={{ color: '#ffffff' }}>Ser</span>
            <span style={{ color: '#378ADD' }}>vices</span>
          </h2>
          <div className="max-w-5xl mx-auto mb-16">
            {services.map((service, index) => (
              <ServiceCard key={service.number} service={service} index={index} />
            ))}
          </div>
          <FadeIn delay={0.2} y={20} className="flex justify-center max-w-5xl mx-auto">
            <div className="bg-[#0C3A6B] border border-[hsla(var(--primary)/0.4)] p-6 sm:p-10 rounded-3xl w-full flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-white text-xl sm:text-2xl font-bold uppercase tracking-wider mb-2">Ready to start?</h3>
                <p className="text-[#85B7EB] font-light text-base sm:text-lg">Check out our transparent pricing plans tailored for your needs.</p>
              </div>
              <Link
                to="/pricing"
                className="px-8 py-4 rounded-full bg-transparent border-2 border-[hsl(var(--primary))] text-white font-bold uppercase tracking-wider hover:bg-[hsl(var(--primary))] transition-all duration-300 glow-cyan-subtle whitespace-nowrap flex items-center gap-2 group"
              >
                View Pricing
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </FadeIn>
        </section>

        {/* ── SECTION 5 · PROJECTS ── */}
        <section id="projects" className="bg-white px-5 sm:px-8 md:px-10 pt-24 pb-8 relative z-20 border-t border-[#B5D4F4]">
          <h2 className="font-black uppercase text-center mb-16 sm:mb-24" style={{ fontSize: 'clamp(3rem, 10vw, 120px)', letterSpacing: '-0.02em' }}>
            <span style={{ color: '#042C53' }}>Pro</span>
            <span style={{ color: '#378ADD' }}>jects</span>
          </h2>
          <div className="max-w-7xl mx-auto">
            {projects.map((project, index) => (
              <ProjectCard key={project.number} project={project} index={index} totalCards={projects.length} />
            ))}
            <FadeIn delay={0} y={30} className="flex justify-center mt-24">
              <Link
                to="/portfolio-gallery"
                className="px-6 py-4 rounded-full bg-[hsl(var(--primary))] text-white font-bold uppercase tracking-wider hover:bg-[#042C53] transition-all duration-300 flex items-center gap-3 group"
              >
                View All Projects
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </FadeIn>
          </div>
        </section>

        {/* ── SECTION 5.5 · TESTIMONIALS ── */}
        <section className="bg-white px-5 sm:px-8 md:px-10 py-24 relative z-20 border-t border-[#B5D4F4]">
          <div className="max-w-7xl mx-auto">
            <FadeIn delay={0} y={30} className="mb-8 text-center">
              <h2
                className="font-black uppercase leading-none tracking-tight mb-6"
                style={{ fontSize: 'clamp(2rem, 8vw, 60px)', letterSpacing: '-0.02em' }}
              >
                <span style={{ color: '#042C53' }}>What clients </span>
                <span style={{ color: '#378ADD' }}>say</span>
              </h2>
              <p
                className="text-[#185FA5] font-light leading-relaxed max-w-3xl mx-auto"
                style={{ fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}
              >
                Real feedback from real clients. These testimonials represent the impact of our work on their success.
                We're proud to have helped transform their brands and businesses through strategic design and creative solutions.
              </p>
            </FadeIn>

            <TestimonialCarouselMultiple />
          </div>
        </section>

        {/* ── SECTION 6 · EXPERTISE ── */}
        <section id="resume" className="bg-[#042C53] px-5 sm:px-8 md:px-10 py-24 relative z-20 border-t border-[#0C3A6B]">
          <div className="max-w-7xl mx-auto">
            <FadeIn delay={0} y={30}>
              <h2 className="font-black uppercase text-center mb-16 md:mb-24" style={{ fontSize: 'clamp(2.5rem, 8vw, 80px)', letterSpacing: '-0.02em' }}>
                <span style={{ color: '#ffffff' }}>My </span>
                <span style={{ color: '#378ADD' }}>Expertise</span>
              </h2>
            </FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
              {/* Left column */}
              <div className="flex flex-col gap-16">
                {/* Experience */}
                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <Briefcase className="w-8 h-8 text-[hsl(var(--primary))]" />
                    <h3 className="text-white text-2xl sm:text-3xl font-bold uppercase">Experience</h3>
                  </div>
                  <div className="relative border-l-2 border-[hsla(var(--primary)/0.3)] ml-3 md:ml-4">
                    {experience.map((exp, index) => (
                      <FadeIn key={index} delay={index * 0.1} y={20}>
                        <div className="mb-10 ml-8 relative group">
                          <div className="absolute w-4 h-4 bg-[hsl(var(--primary))] rounded-full -left-[41px] top-1 glow-cyan-subtle group-hover:scale-125 transition-transform" />
                          <span className="text-[hsl(var(--primary))] text-sm uppercase tracking-wider font-semibold">{exp.period}</span>
                          <h4 className="text-white text-lg sm:text-xl font-bold mt-1 uppercase">{exp.role}</h4>
                          <h5 className="text-[#85B7EB] text-sm sm:text-md font-medium mb-3">{exp.company}</h5>
                          <p className="text-[#85B7EB] font-light text-sm leading-relaxed max-w-md">{exp.desc}</p>
                        </div>
                      </FadeIn>
                    ))}
                  </div>
                </div>
                {/* Certifications */}
                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <Award className="w-8 h-8 text-[hsl(var(--primary))]" />
                    <h3 className="text-white text-2xl sm:text-3xl font-bold uppercase">Certifications</h3>
                  </div>
                  <div className="flex flex-col gap-6">
                    {certifications.map((cert, index) => (
                      <FadeIn key={index} delay={index * 0.1} y={20}>
                        <div className="glass-panel p-5 sm:p-6 rounded-2xl relative overflow-hidden group hover:bg-[hsla(var(--primary)/0.08)] transition-all duration-300">
                          <div className="absolute top-0 left-0 w-1 h-full bg-[hsl(var(--primary))] glow-cyan-subtle" />
                          <h4 className="text-white text-base sm:text-lg font-bold uppercase leading-tight mb-2">{cert.name}</h4>
                          <h5 className="text-[hsl(var(--primary))] font-medium text-sm mb-1">{cert.issuer}</h5>
                          <span className="text-[#85B7EB] text-xs">{cert.date}</span>
                        </div>
                      </FadeIn>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right column */}
              <div className="flex flex-col gap-16">
                {/* Skills */}
                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <PenTool className="w-8 h-8 text-[hsl(var(--primary))]" />
                    <h3 className="text-white text-2xl sm:text-3xl font-bold uppercase">Skills</h3>
                  </div>
                  <div className="flex flex-col gap-6">
                    {skills.map((skill, index) => (
                      <FadeIn key={index} delay={index * 0.05} y={15}>
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-white text-sm uppercase tracking-wide">{skill.name}</span>
                            <span className="text-[hsl(var(--primary))] text-sm font-bold">{skill.value}%</span>
                          </div>
                          <div className="w-full bg-[hsla(var(--primary)/0.1)] border border-[hsla(var(--primary)/0.2)] rounded-full h-2.5 overflow-hidden">
                            <div className="bg-[hsl(var(--primary))] h-full rounded-full glow-cyan-subtle transition-all duration-1000 ease-out" style={{ width: `${skill.value}%` }} />
                          </div>
                        </div>
                      </FadeIn>
                    ))}
                  </div>
                </div>
                {/* Languages */}
                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <Languages className="w-8 h-8 text-[hsl(var(--primary))]" />
                    <h3 className="text-white text-2xl sm:text-3xl font-bold uppercase">Languages</h3>
                  </div>
                  <div className="flex flex-col gap-8">
                    {languages.map((lang, index) => (
                      <FadeIn key={index} delay={index * 0.1} y={15}>
                        <div className="flex flex-col gap-3">
                          <div className="flex justify-between items-center">
                            <span className="text-white uppercase tracking-wide font-medium">{lang.name}</span>
                            <span className="text-[hsl(var(--primary))] text-sm font-bold opacity-80">{lang.score}/10</span>
                          </div>
                          <div className="flex gap-1.5 sm:gap-2 flex-wrap">
                            {Array.from({ length: 10 }).map((_, i) => (
                              <div
                                key={i}
                                className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full transition-all duration-500 ${
                                  i < lang.score
                                    ? 'bg-[hsl(var(--primary))] glow-cyan-subtle scale-100'
                                    : 'bg-[hsla(var(--primary)/0.15)] border border-[hsla(var(--primary)/0.3)] scale-90'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </FadeIn>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 7 · CONTACT ── */}
        <section id="contact" className="bg-white py-16 sm:py-24 px-4 sm:px-8 md:px-10 border-t border-[#B5D4F4] relative z-20">
          <div className="max-w-4xl mx-auto">
            <FadeIn delay={0} y={30}>
              <div className="bg-[#F5F9FF] border border-[#B5D4F4] p-6 sm:p-10 md:p-14 rounded-[30px] sm:rounded-[40px] flex flex-col gap-10">

                <div className="text-center">
                  <h2 className="font-black uppercase text-3xl sm:text-5xl md:text-6xl tracking-tight mb-3">
                    <span style={{ color: '#042C53' }}>Let's </span>
                    <span style={{ color: '#378ADD' }}>Connect</span>
                  </h2>
                  <p className="text-[#185FA5] font-light text-base sm:text-lg max-w-xl mx-auto">
                    Ready to elevate your brand's visual identity? Reach out today to discuss your next big project.
                  </p>
                </div>

                <div className="w-full">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const name = e.target.name.value;
                      const email = e.target.email.value;
                      const message = e.target.message.value;
                      window.location.href = `mailto:hello@rajputdesignsstudio.com?subject=${encodeURIComponent(`Project Inquiry from ${name}`)}&body=${encodeURIComponent(`${message}\n\nFrom: ${email}`)}`;
                    }}
                    className="flex flex-col gap-4 w-full"
                  >
                    <input type="text" name="name" placeholder="Your Name" required
                      className="bg-white border border-[#B5D4F4] px-4 py-3 rounded-xl text-[#042C53] placeholder-[#185FA5] placeholder-opacity-50 outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] w-full" />
                    <input type="email" name="email" placeholder="Your Email" required
                      className="bg-white border border-[#B5D4F4] px-4 py-3 rounded-xl text-[#042C53] placeholder-[#185FA5] placeholder-opacity-50 outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] w-full" />
                    <textarea name="message" placeholder="Tell me about your project" required rows={4}
                      className="bg-white border border-[#B5D4F4] px-4 py-3 rounded-xl text-[#042C53] placeholder-[#185FA5] placeholder-opacity-50 outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] w-full resize-none" />
                    <button type="submit"
                      className="bg-[hsl(var(--primary))] text-white font-bold py-3 px-8 rounded-xl hover:bg-[#042C53] transition-colors duration-300 uppercase tracking-wider">
                      Send Message
                    </button>
                  </form>
                </div>

                <div className="w-full h-px bg-[#B5D4F4]" />

                <div className="flex flex-wrap items-center justify-center gap-4">
                  <SocialBtn href="https://mail.google.com/mail/?view=cm&to=hello@rajputdesignsstudio.com" icon={<Mail className="w-5 h-5" />} title="Email" />
                  <SocialBtn href="https://wa.me/923365843243" icon={<WhatsAppIcon />} title="WhatsApp" />
                  <SocialBtn href="https://www.behance.net/RajputDesigns" icon={<BehanceIcon />} title="Behance" />
                  <SocialBtn href="https://www.linkedin.com/in/rajputdesigns/" icon={<Linkedin className="w-5 h-5" />} title="LinkedIn" />
                  <SocialBtn href="https://instagram.com/RajputDesignsStudio" icon={<Instagram className="w-5 h-5" />} title="Instagram" />
                  <SocialBtn href="https://facebook.com/RajputDesignsStudio" icon={<FacebookIcon />} title="Facebook" />
                  <SocialBtn href="https://www.x.com/rajputdesign" icon={<XIcon />} title="X" />
                  <SocialBtn href="https://www.tiktok.com/@rajputdesignsstudio" icon={<TikTokIcon />} title="TikTok" />
                </div>

              </div>
            </FadeIn>
          </div>
        </section>

      </div>
    </>
  );
}

export default HomePage;