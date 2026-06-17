import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>Page Not Found — Rajput Designs Studio</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div
        className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
        style={{ background: 'linear-gradient(135deg, #031e3d 0%, #042C53 100%)' }}
      >
        <h1
          className="font-black uppercase text-white mb-4"
          style={{ fontSize: 'clamp(5rem, 20vw, 10rem)', lineHeight: 1 }}
        >
          404
        </h1>
        <p className="text-white/70 text-lg mb-8">
          This page doesn&apos;t exist.
        </p>
        <Link
          to="/"
          className="px-8 py-4 rounded-full font-bold uppercase tracking-wider text-[#042C53] bg-white hover:bg-[#378ADD] hover:text-white transition-all duration-300"
        >
          Back to Home
        </Link>
      </div>
    </>
  );
}
