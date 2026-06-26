import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

const PACKAGES = {
  'promotion-poster': {
    name: 'Promotion Poster',
    price: '$20',
    delivery: '48 hours',
    payoneerLink: 'https://link.payoneer.com/Token?t=7F83BBEE046F4AB3B8A27A9C06F937CE&src=pl',
  },
  'banner-design': {
    name: 'Banner Design Package',
    price: '$20',
    delivery: '2–3 days',
    payoneerLink: 'https://link.payoneer.com/Token?t=652718AC5C65470F9A7A91F087928673&src=pl',
  },
  'logo-design': {
    name: 'Logo Design Package',
    price: '$20',
    delivery: '3–5 days',
    payoneerLink: 'https://link.payoneer.com/Token?t=6BB2A2351861479BA30A7F3F0D27560B&src=pl',
  },
  'menu-design': {
    name: 'Menu Design Package',
    price: '$29',
    delivery: '3–5 days',
    payoneerLink: 'https://link.payoneer.com/Token?t=70F9E889E35C4014ABBF1DC12E553DB6&src=pl',
  },
  'website-design': {
    name: 'Website Design Package',
    price: '$60',
    delivery: '7–10 days',
    payoneerLink: 'https://link.payoneer.com/Token?t=BF3395283F8D4D0E91B96086B008923C&src=pl',
  },
  'bundle': {
    name: 'Bundle Package',
    price: '$60',
    delivery: '7–10 days',
    payoneerLink: 'https://link.payoneer.com/Token?t=196DEB4930704FEC92430D2E97007B3B&src=pl',
  },
  'full-branding': {
    name: 'Full Branding Package',
    price: '$100',
    delivery: '10–14 days',
    payoneerLink: 'https://link.payoneer.com/Token?t=B3274606B1AD40B3A602352782B20DC5&src=pl',
  },
};

function SpecificFields({ slug, values, onChange }) {
  const field = (name, label, type = 'text', options = null, placeholder = '') => (
    <div key={name}>
      <label className="block text-sm font-semibold text-[#042C53] mb-1">{label}</label>
      {type === 'textarea' ? (
        <textarea
          name={name}
          value={values[name] || ''}
          onChange={onChange}
          rows={3}
          placeholder={placeholder}
          className="w-full px-4 py-3 rounded-xl border border-[#B5D4F4] bg-white text-[#042C53] focus:outline-none focus:border-[hsl(var(--primary))] text-sm resize-none"
        />
      ) : type === 'select' ? (
        <select
          name={name}
          value={values[name] || ''}
          onChange={onChange}
          className="w-full px-4 py-3 rounded-xl border border-[#B5D4F4] bg-white text-[#042C53] focus:outline-none focus:border-[hsl(var(--primary))] text-sm"
        >
          <option value="">Select...</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : (
        <input
          type="text"
          name={name}
          value={values[name] || ''}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-4 py-3 rounded-xl border border-[#B5D4F4] bg-white text-[#042C53] focus:outline-none focus:border-[hsl(var(--primary))] text-sm"
        />
      )}
    </div>
  );

  if (slug === 'promotion-poster') return (
    <>
      {field('purpose', 'Event / Purpose *', 'text', null, 'e.g. Eid Sale, Grand Opening, Product Launch')}
      {field('text_content', 'Text to include on poster *', 'textarea', null, 'Business name, tagline, date, discount % etc.')}
      {field('colors', 'Preferred Colors', 'text', null, 'e.g. Red & Gold, or "match my logo"')}
      {field('references', 'Reference Links (optional)', 'text', null, 'Any poster you like — Google Drive, Pinterest etc.')}
    </>
  );

  if (slug === 'banner-design') return (
    <>
      {field('purpose', 'Banner Purpose *', 'text', null, 'e.g. Facebook cover, Google ad, website hero')}
      {field('text_content', 'Text to include *', 'textarea', null, 'Headline, subtext, CTA, offers etc.')}
      {field('colors', 'Preferred Colors', 'text', null, 'e.g. Blue & White, or "match my brand"')}
      {field('references', 'Reference Links (optional)', 'text', null, 'Any banner style you like')}
    </>
  );

  if (slug === 'logo-design') return (
    <>
      {field('industry', 'Your Industry / Niche *', 'text', null, 'e.g. Restaurant, Tech Startup, Fashion')}
      {field('tagline', 'Tagline / Slogan (optional)', 'text', null, 'Leave blank if none')}
      {field('style', 'Logo Style *', 'select', ['Modern & Minimal', 'Classic & Traditional', 'Playful & Fun', 'Luxury & Premium', 'Bold & Strong'])}
      {field('colors_use', 'Colors to Use', 'text', null, 'e.g. Blue, Gold — or "your choice"')}
      {field('colors_avoid', 'Colors to Avoid', 'text', null, 'e.g. Pink, Red')}
      {field('references', 'Reference / Competitor Links (optional)', 'text', null, 'Logos you like or want to avoid')}
    </>
  );

  if (slug === 'menu-design') return (
    <>
      {field('restaurant_name', 'Restaurant / Cafe Name *', 'text', null, 'e.g. Al-Noor Restaurant')}
      {field('type', 'Type of Establishment *', 'select', ['Restaurant', 'Cafe', 'Fast Food', 'Fine Dining', 'Bakery', 'Pizza Shop', 'Other'])}
      {field('items_count', 'Approx. Number of Menu Items', 'text', null, 'e.g. 30 items across 4 sections')}
      {field('languages', 'Language(s)', 'text', null, 'e.g. English, or English + Urdu')}
      {field('special_sections', 'Special Sections (optional)', 'text', null, 'e.g. Deals, Seasonal, Kids Menu')}
      {field('colors', 'Preferred Colors / Style', 'text', null, 'e.g. Dark & Elegant, or Bright & Fun')}
    </>
  );

  if (slug === 'website-design') return (
    <>
      {field('purpose', 'Website Purpose *', 'text', null, 'e.g. Portfolio, E-commerce, Business landing page')}
      {field('pages', 'Pages Needed *', 'text', null, 'e.g. Home, About, Services, Contact')}
      {field('features', 'Key Features / Sections', 'textarea', null, 'e.g. Contact form, Gallery, Pricing table, Testimonials')}
      {field('style', 'Design Style Preference', 'select', ['Modern & Minimal', 'Bold & Creative', 'Corporate & Professional', 'Dark Theme', 'Light & Clean'])}
      {field('references', 'Reference Website Links (optional)', 'text', null, 'Sites you like the look of')}
    </>
  );

  if (slug === 'bundle') return (
    <>
      {field('business_desc', 'Business Description *', 'textarea', null, 'What does your business do? Who is your audience?')}
      {field('content_needed', 'What content / text to include', 'textarea', null, 'Taglines, offers, social handles, website etc.')}
      {field('colors', 'Brand Colors / Style', 'text', null, 'e.g. Blue & White, Minimalist')}
      {field('references', 'Reference Links (optional)', 'text', null, 'Designs or brands you like')}
    </>
  );

  if (slug === 'full-branding') return (
    <>
      {field('industry', 'Industry / Niche *', 'text', null, 'e.g. Fashion, Food, Real Estate')}
      {field('audience', 'Target Audience *', 'text', null, 'e.g. Young professionals aged 25–35')}
      {field('personality', 'Brand Personality *', 'select', ['Professional & Corporate', 'Creative & Artistic', 'Luxury & Premium', 'Playful & Friendly', 'Bold & Energetic', 'Minimal & Clean'])}
      {field('colors', 'Colors to Use / Avoid', 'text', null, 'e.g. Use Gold & Navy, avoid Red')}
      {field('existing_assets', 'Existing Assets (if any)', 'text', null, 'e.g. "I have a logo" or "Starting from scratch"')}
      {field('references', 'Reference / Competitor Brands', 'text', null, 'Brands whose style you like or want to avoid')}
    </>
  );

  return null;
}

export default function OrderFormPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const pkg = PACKAGES[slug];

  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!pkg) {
    return (
      <div className="min-h-screen bg-[#E6F1FB] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#042C53] text-xl font-bold mb-4">Package not found.</p>
          <Link to="/pricing" className="text-[hsl(var(--primary))] underline">Back to Pricing</Link>
        </div>
      </div>
    );
  }

  const onChange = (e) => setValues(v => ({ ...v, [e.target.name]: e.target.value }));

  const buildDetails = () => {
    return Object.entries(values)
      .filter(([k]) => !['full_name', 'email', 'business_name', 'whatsapp', 'notes'].includes(k))
      .map(([k, v]) => `${k.replace(/_/g, ' ').toUpperCase()}: ${v}`)
      .join('\n');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!values.full_name || !values.email || !values.business_name) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    setLoading(true);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    const templateParams = {
      to_email: 'rajputdesigns.studio@gmail.com',
      from_name: values.full_name,
      from_email: values.email,
      package_name: pkg.name,
      package_price: pkg.price,
      business_name: values.business_name,
      whatsapp: values.whatsapp || 'Not provided',
      details: buildDetails(),
      notes: values.notes || 'None',
    };

    try {
      if (serviceId && templateId && publicKey) {
        await emailjs.send(serviceId, templateId, templateParams, publicKey);
      } else {
        // Fallback: open mailto if EmailJS not configured
        const body = encodeURIComponent(
          `New Order: ${pkg.name} (${pkg.price})\n\nName: ${values.full_name}\nEmail: ${values.email}\nBusiness: ${values.business_name}\nWhatsApp: ${values.whatsapp || 'N/A'}\n\nProject Details:\n${buildDetails()}\n\nNotes: ${values.notes || 'None'}`
        );
        window.open(`mailto:rajputdesigns.studio@gmail.com?subject=New Order: ${encodeURIComponent(pkg.name)}&body=${body}`);
      }
      navigate(`/order-received?pkg=${slug}`);
    } catch {
      setError('Failed to send order. Please email us at rajputdesigns.studio@gmail.com');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Order {pkg.name} — Rajput Designs Studio</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="min-h-screen bg-[#E6F1FB] pb-24">
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#B5D4F4]">
          <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link to="/pricing" className="flex items-center gap-2 text-[#042C53] hover:text-[hsl(var(--primary))] transition-colors group">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium uppercase tracking-wider text-sm">Back to Pricing</span>
            </Link>
            <img
              src="https://i.postimg.cc/FFL8k0MJ/Rajput-Desgins-Logo-without-background-for-website-01.png"
              alt="Rajput Designs Studio"
              style={{ height: '40px', width: 'auto' }}
            />
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-5 sm:px-8 pt-12">
          {/* Package Summary */}
          <div className="bg-[#042C53] rounded-2xl p-5 mb-8 flex items-center justify-between">
            <div>
              <p className="text-white/60 text-xs uppercase tracking-wider mb-1">Your Selected Package</p>
              <h2 className="text-white font-bold text-lg">{pkg.name}</h2>
              <p className="text-white/60 text-sm mt-1">Delivery: {pkg.delivery}</p>
            </div>
            <div className="text-right">
              <span className="text-[hsl(var(--primary))] text-3xl font-black">{pkg.price}</span>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-3xl border border-[#B5D4F4] p-6 sm:p-8 shadow-sm">
            <h1 className="text-2xl font-black text-[#042C53] uppercase tracking-tight mb-2">Order Form</h1>
            <p className="text-[#185FA5] text-sm mb-8">Fill in your details so we can start your project. We'll contact you to confirm before starting.</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Common fields */}
              <div>
                <label className="block text-sm font-semibold text-[#042C53] mb-1">Full Name *</label>
                <input type="text" name="full_name" value={values.full_name || ''} onChange={onChange} required
                  placeholder="Your full name"
                  className="w-full px-4 py-3 rounded-xl border border-[#B5D4F4] bg-white text-[#042C53] focus:outline-none focus:border-[hsl(var(--primary))] text-sm" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#042C53] mb-1">Email Address *</label>
                <input type="email" name="email" value={values.email || ''} onChange={onChange} required
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-[#B5D4F4] bg-white text-[#042C53] focus:outline-none focus:border-[hsl(var(--primary))] text-sm" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#042C53] mb-1">Business / Brand Name *</label>
                <input type="text" name="business_name" value={values.business_name || ''} onChange={onChange} required
                  placeholder="e.g. Al-Noor Traders"
                  className="w-full px-4 py-3 rounded-xl border border-[#B5D4F4] bg-white text-[#042C53] focus:outline-none focus:border-[hsl(var(--primary))] text-sm" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#042C53] mb-1">WhatsApp Number (optional)</label>
                <input type="text" name="whatsapp" value={values.whatsapp || ''} onChange={onChange}
                  placeholder="+92 300 1234567"
                  className="w-full px-4 py-3 rounded-xl border border-[#B5D4F4] bg-white text-[#042C53] focus:outline-none focus:border-[hsl(var(--primary))] text-sm" />
              </div>

              {/* Divider */}
              <div className="border-t border-[#B5D4F4] pt-2">
                <p className="text-xs font-bold text-[#042C53] uppercase tracking-wider mb-4">Project Details</p>
                <div className="flex flex-col gap-5">
                  <SpecificFields slug={slug} values={values} onChange={onChange} />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-semibold text-[#042C53] mb-1">Additional Notes (optional)</label>
                <textarea name="notes" value={values.notes || ''} onChange={onChange} rows={3}
                  placeholder="Anything else we should know about your project..."
                  className="w-full px-4 py-3 rounded-xl border border-[#B5D4F4] bg-white text-[#042C53] focus:outline-none focus:border-[hsl(var(--primary))] text-sm resize-none" />
              </div>

              {error && (
                <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">{error}</p>
              )}

              <button type="submit" disabled={loading}
                className="w-full py-4 rounded-xl font-bold uppercase tracking-wider bg-[hsl(var(--primary))] text-white hover:brightness-110 transition-all duration-300 flex items-center justify-center gap-2 text-base disabled:opacity-60">
                {loading ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Sending Order...</>
                ) : (
                  <><Send className="w-5 h-5" /> Submit Order</>
                )}
              </button>

              <p className="text-center text-xs text-[#185FA5]">
                After submitting, you'll be shown your payment link. We start work once payment is confirmed.
              </p>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}
