import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle2, Clock, CreditCard, Mail, ArrowLeft } from 'lucide-react';

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

export default function OrderReceivedPage() {
  const [params] = useSearchParams();
  const slug = params.get('pkg') || 'logo-design';
  const pkg = PACKAGES[slug] || PACKAGES['logo-design'];

  return (
    <>
      <Helmet>
        <title>Order Received — Rajput Designs Studio</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="min-h-screen bg-[#E6F1FB] flex flex-col">
        <header className="bg-white/90 backdrop-blur-md border-b border-[#B5D4F4]">
          <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-[#042C53] hover:text-[hsl(var(--primary))] transition-colors group">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium uppercase tracking-wider text-sm">Home</span>
            </Link>
            <img
              src="https://i.postimg.cc/FFL8k0MJ/Rajput-Desgins-Logo-without-background-for-website-01.png"
              alt="Rajput Designs Studio"
              style={{ height: '40px', width: 'auto' }}
            />
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center px-5 py-16">
          <div className="max-w-lg w-full">

            {/* Success icon */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#042C53] mb-5">
                <CheckCircle2 className="w-10 h-10 text-[hsl(var(--primary))]" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-[#042C53] uppercase tracking-tight mb-3">
                Order Received!
              </h1>
              <p className="text-[#185FA5] text-base font-light max-w-sm mx-auto">
                We've received your project details and will review them shortly.
              </p>
            </div>

            {/* Package card */}
            <div className="bg-[#042C53] rounded-2xl p-5 mb-5 flex items-center justify-between">
              <div>
                <p className="text-white/60 text-xs uppercase tracking-wider mb-1">Package</p>
                <h2 className="text-white font-bold text-lg">{pkg.name}</h2>
                <div className="flex items-center gap-2 mt-2">
                  <Clock className="w-4 h-4 text-white/50" />
                  <span className="text-white/60 text-sm">Delivery in {pkg.delivery} after payment</span>
                </div>
              </div>
              <span className="text-[hsl(var(--primary))] text-3xl font-black">{pkg.price}</span>
            </div>

            {/* Steps */}
            <div className="bg-white rounded-2xl border border-[#B5D4F4] p-6 mb-5 shadow-sm">
              <h3 className="text-sm font-bold text-[#042C53] uppercase tracking-wider mb-4">What Happens Next</h3>
              <ol className="flex flex-col gap-4">
                {[
                  { icon: <CreditCard className="w-5 h-5" />, title: 'Complete Your Payment', desc: 'Pay via Payoneer using the button below to confirm your order.' },
                  { icon: <CheckCircle2 className="w-5 h-5" />, title: 'We Confirm & Start', desc: "Once payment is confirmed, we'll send you a confirmation email and begin work." },
                  { icon: <Mail className="w-5 h-5" />, title: 'Receive Your Design', desc: `Your completed design will be delivered within ${pkg.delivery} to your email.` },
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#E6F1FB] flex items-center justify-center text-[hsl(var(--primary))]">
                      {step.icon}
                    </div>
                    <div>
                      <p className="font-semibold text-[#042C53] text-sm">{step.title}</p>
                      <p className="text-[#185FA5] text-xs font-light mt-0.5">{step.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Pay button */}
            <a
              href={pkg.payoneerLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 rounded-xl font-bold uppercase tracking-wider bg-[hsl(var(--primary))] text-white hover:brightness-110 transition-all duration-300 flex items-center justify-center gap-2 text-base mb-4 block text-center"
            >
              <CreditCard className="w-5 h-5" />
              Pay {pkg.price} via Payoneer
            </a>

            {/* Contact */}
            <div className="text-center">
              <p className="text-[#185FA5] text-sm mb-1">Have questions?</p>
              <a
                href="mailto:rajputdesigns.studio@gmail.com"
                className="text-[hsl(var(--primary))] text-sm font-semibold hover:underline"
              >
                rajputdesigns.studio@gmail.com
              </a>
              <span className="text-[#185FA5] text-sm mx-2">·</span>
              <Link to="/#contact" className="text-[hsl(var(--primary))] text-sm font-semibold hover:underline">
                Contact Us
              </Link>
            </div>

          </div>
        </main>
      </div>
    </>
  );
}
