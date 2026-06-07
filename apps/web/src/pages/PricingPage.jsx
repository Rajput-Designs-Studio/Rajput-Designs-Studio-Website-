import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check, ArrowRight } from 'lucide-react';
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
    paymentLink: 'https://rajputdesignsstudio.gumroad.com/l/pbgpsm'
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
    paymentLink: 'https://rajputdesignsstudio.gumroad.com/l/kwoeak'
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
    paymentLink: 'https://rajputdesignsstudio.gumroad.com/l/hqskdn'
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
    paymentLink: null
  }
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

  const handlePayment = (plan) => {
    if (plan.paymentLink) {
      window.open(plan.paymentLink, '_blank');
    } else {
      window.location.href = '/#contact';
    }
  };

  return (
    <>
      <Helmet>
  <title>Pricing Plans | Rajput Designs Studio</title>
  <meta name="description" content="Affordable graphic design packages for businesses in Pakistan and worldwide. Logo design, brand identity, social media graphics, and digital visuals. Choose the plan that fits your budget." />
  <link rel="canonical" href="https://www.rajputdesignsstudio.com/pricing" />
</Helmet>

      <div className="min-h-screen bg-[#042C53] text-foreground pb-24 overflow-x-hidden">
        {/* Header */}
        <header className="sticky top-0 z-50 glass-panel border-b border-[hsla(var(--primary)/0.1)]">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-2 text-white hover:text-[hsl(var(--primary))] transition-colors group"
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
  <span style={{ color: '#ffffff' }}>Pricing </span>
  <span style={{ color: '#378ADD' }}>Plan</span>
</h1>
              <p className="text-white opacity-80 text-lg sm:text-xl font-light">
                Choose the perfect package for your design needs. Clear, upfront pricing with no hidden surprises.
              </p>
            </div>
          </FadeIn>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32 items-stretch">
            {pricingPlans.map((plan, index) => (
              <FadeIn key={plan.name} delay={index * 0.1} y={30} className="h-full">
                <div
                  className={`h-full flex flex-col p-8 rounded-3xl relative transition-all duration-300 ${plan.highlight
                    ? 'bg-[hsla(var(--primary)/0.1)] border-2 border-[hsl(var(--primary))] glow-cyan scale-100 lg:scale-105 z-10'
                    : 'glass-panel border border-[hsla(var(--primary)/0.2)] hover:border-[hsl(var(--primary))]'
                    }`}
                >
                  {plan.badge && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[hsl(var(--primary))] text-[hsl(var(--background))] text-xs font-bold uppercase tracking-wider py-1.5 px-4 rounded-full glow-cyan-subtle">
                      {plan.badge}
                    </div>
                  )}

                  <h3 className="text-white text-xl font-bold uppercase tracking-wider mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-black text-[hsl(var(--primary))] glow-text-cyan">{plan.price}</span>
                    {plan.price !== 'Custom Quote' && <span className="text-white opacity-60 text-sm font-light ml-1">/ project</span>}
                  </div>
                  <p className="text-white opacity-70 text-sm font-light h-10 mb-8 border-b border-[hsla(var(--primary)/0.1)] pb-12">
                    {plan.description}
                  </p>

                  <ul className="flex flex-col gap-4 mb-8 flex-grow">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-[hsl(var(--primary))] shrink-0 mt-0.5" />
                        <span className="text-white font-light text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handlePayment(plan)}
                    className={`w-full py-3 rounded-xl font-bold uppercase tracking-wider transition-all duration-300 ${plan.highlight
                      ? 'bg-[hsl(var(--primary))] text-[hsl(var(--background))] hover:brightness-110 glow-cyan-subtle'
                      : 'bg-[hsla(var(--primary)/0.1)] text-white hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--background))] border border-[hsl(var(--primary))]'
                      }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* FAQ Section */}
          <FadeIn delay={0.2} y={30}>
            <div className="max-w-3xl mx-auto mb-24">
              <h2 className="text-center text-3xl md:text-4xl font-black uppercase text-white mb-10 tracking-wide">
                Frequently Asked Questions
              </h2>

              <Accordion type="single" collapsible className="w-full flex flex-col gap-4">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="glass-panel border border-[hsla(var(--primary)/0.2)] rounded-2xl px-6 data-[state=open]:border-[hsl(var(--primary))] transition-colors"
                  >
                    <AccordionTrigger className="text-white hover:text-[hsl(var(--primary))] hover:no-underline font-medium text-left text-lg py-6">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-white opacity-80 font-light leading-relaxed pb-6 text-base">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <div className="flex justify-center pb-24">
              <Link
                to="/#contact"
                className="flex items-center gap-2 text-[hsl(var(--primary))] hover:text-white uppercase font-bold tracking-widest transition-colors group"
              >
                Still have questions? Contact Us
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeIn>
        </main>
      </div>
    </>
  );
}
export default PricingPage;