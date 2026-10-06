'use client';

import React, { useState, useRef } from 'react';
import { PopupModal } from 'react-calendly';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface Service {
  id: string;
  name: string;
  category: string;
  price: string;
  duration: string;
  badge?: string;
  badgeColor?: string;
  description: string;
  highlights: string[];
  calendlyUrl: string;
}

// 3 Services connected directly to your Calendly scheduling links
const SERVICES: Service[] = [
  {
    id: '1',
    name: 'Signature Russian Gel Manicure',
    category: 'Hand Sanctuary',
    price: '$45',
    duration: '45 mins',
    badge: 'Best Seller',
    badgeColor: 'bg-rose-100 text-rose-800',
    description: 'Precision dry Russian e-file cuticle contouring, apex balancing, and 3-coat non-toxic gel polish lasting 3-4 chip-free weeks.',
    highlights: [
      'Gentle Russian e-file dry cuticle technique',
      'Certified vegan non-toxic OPI & CND gel',
      'Full 7-day complimentary touch-up guarantee',
    ],
    calendlyUrl: 'https://calendly.com/tatin3469/gel-manicure-45',
  },
  {
    id: '2',
    name: 'Luxury Herbal Rose Pedicure',
    category: 'Foot Sanctuary',
    price: '$60',
    duration: '60 mins',
    badge: 'Deep Relaxation',
    badgeColor: 'bg-amber-100 text-amber-800',
    description: 'Organic rose petal & Himalayan salt foot soak, cane sugar exfoliation, heel smoothing, and hot basalt stone reflexology massage.',
    highlights: [
      'Aroma whirlpool hydro-massage foot basin',
      'Organic raw sugar scrub & warm towel wrap',
      'Hot volcanic basalt stone reflexology massage',
    ],
    calendlyUrl: 'https://calendly.com/tatin3469/gel-manicure-45-clone',
  },
  {
    id: '3',
    name: 'Bespoke Nail Art & Gel-X Extensions',
    category: 'Nail Artistry',
    price: '$55+',
    duration: '60 - 75 mins',
    badge: 'Trending Design',
    badgeColor: 'bg-purple-100 text-purple-800',
    description: 'Full set Gel-X extensions, glazed donut chrome pearl powders, 9D magnetic cat-eye, or genuine Swarovski crystal embellishments.',
    highlights: [
      'Custom nail shape tailored to your hand (Almond, Coffin...)',
      'Genuine Swarovski crystal & magnetic 9D shimmer',
      'Durable, healthy wear for 4 - 6 weeks',
    ],
    calendlyUrl: 'https://calendly.com/tatin3469/gel-manicure-45-clone-clone',
  },
];

export default function BookingPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  // ── GSAP entrance animations ──
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo('.gsap-book-header', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 })
        .fromTo(
          '.gsap-book-step',
          { opacity: 0, y: 25, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.1 },
          '-=0.3'
        )
        .fromTo(
          '.gsap-book-card',
          { opacity: 0, y: 50, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.13, ease: 'back.out(1.3)' },
          '-=0.3'
        );

      // Same-day section
      gsap.fromTo(
        '.gsap-book-sameday',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.gsap-book-sameday', start: 'top 85%' },
        }
      );

      // Policy section
      gsap.fromTo(
        '.gsap-book-policy',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          scrollTrigger: { trigger: '.gsap-book-policy', start: 'top 90%' },
        }
      );
    },
    { scope: containerRef }
  );

  // Handle Calendly popup trigger
  const handleBook = (url: string) => {
    setSelectedUrl(url);
    setIsOpen(true);
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#FAF6F0] text-[#3D2314] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* ========================================================= */}
        {/* 1. HEADER                                                 */}
        {/* ========================================================= */}
        <div className="gsap-book-header text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBD8C3] text-xs font-semibold tracking-widest uppercase text-[#6B4E3D]">
            Online Appointment Booking
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#3D2314] tracking-tight">
            Reserve Your Pampering Experience
          </h1>
          <p className="text-neutral-600 text-base leading-relaxed">
            Select your preferred treatment below and choose a time that perfectly fits your schedule. Our team will prepare a tranquil sanctuary prior to your arrival.
          </p>
        </div>

        {/* ========================================================= */}
        {/* 2. 3-STEP RESERVATION FLOW                                */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {[
            { step: '1', title: 'Select Treatment', desc: 'Choose between our signature manicure, herbal pedicure, or bespoke art.' },
            { step: '2', title: 'Pick Date & Time', desc: 'Real-time calendar availability lets you choose the perfect appointment slot.' },
            { step: '3', title: 'Instant Confirmation', desc: 'Automated calendar invitations & SMS reminders delivered straight to your inbox.' },
          ].map((item) => (
            <div
              key={item.step}
              className="gsap-book-step bg-white rounded-2xl p-6 border border-[#E8DAC7] shadow-xs flex items-start gap-4 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-[#9E2A2B] text-white flex items-center justify-center font-bold text-sm shrink-0">
                {item.step}
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#3D2314]">{item.title}</h4>
                <p className="text-xs text-neutral-500 mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ========================================================= */}
        {/* 3. CALENDLY SERVICE CARDS                                 */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="gsap-book-card bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl border border-[#E8DAC7] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-400 font-medium">
                    {service.category}
                  </span>
                  {service.badge && (
                    <span
                      className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                        service.badgeColor || 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {service.badge}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-serif font-bold text-2xl text-[#3D2314]">
                    {service.name}
                  </h3>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="font-serif font-bold text-3xl text-[#9E2A2B]">
                      {service.price}
                    </span>
                    <span className="text-xs text-neutral-400">
                      ⏱ {service.duration}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-neutral-600 leading-relaxed">
                  {service.description}
                </p>

                {/* Highlights */}
                <div className="pt-2">
                  <span className="text-[11px] font-semibold text-[#3D2314] block mb-2 uppercase tracking-wide">
                    Service Includes:
                  </span>
                  <ul className="space-y-1.5 text-xs text-neutral-500">
                    {service.highlights.map((hl, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#9E2A2B] font-bold text-xs mt-0.5">✓</span>
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Calendly Popup Action */}
              <div className="mt-8 pt-4 border-t border-[#F5EBDD]">
                <button
                  onClick={() => handleBook(service.calendlyUrl)}
                  className="w-full bg-[#9E2A2B] hover:bg-[#852122] text-white font-semibold py-3.5 rounded-xl text-sm transition shadow-md cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>📅 Select Time &amp; Book</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ========================================================= */}
        {/* 4. SAME-DAY OR GROUP BOOKINGS                             */}
        {/* ========================================================= */}
        <div className="gsap-book-sameday rounded-3xl bg-white p-8 sm:p-10 border border-[#E8DAC7] shadow-xs flex flex-col md:flex-row items-center justify-between gap-6 mb-16">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="font-serif font-bold text-xl text-[#3D2314]">
              Need A Same-Day Booking Or Group Party?
            </h4>
            <p className="text-xs text-neutral-600 max-w-lg">
              For bookings within the next 1-2 hours or bridal/private parties of 3 or more guests, please call our studio concierge directly for immediate priority seating.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <a
              href="tel:0901234567"
              className="bg-[#3D2314] hover:bg-[#25150C] text-white text-xs font-semibold px-6 py-3.5 rounded-full transition shadow-xs block hover:scale-105 active:scale-95"
            >
              📞 Call 090 123 4567
            </a>
            <Link
              href="/contact"
              className="border border-[#E8DAC7] hover:bg-[#FAF6F0] text-[#3D2314] text-xs font-semibold px-6 py-3.5 rounded-full transition block hover:scale-105 active:scale-95"
            >
              Send A Message
            </Link>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 5. GUEST ETIQUETTE & POLICIES                             */}
        {/* ========================================================= */}
        <div className="gsap-book-policy bg-[#FAF4ED] rounded-2xl p-6 border border-[#E8DAC7] text-xs text-neutral-600 space-y-2">
          <h5 className="font-bold text-[#3D2314] uppercase tracking-wider text-[11px]">
            💡 Important Guest Guidelines:
          </h5>
          <p>
            • Please arrive <strong>5 - 10 minutes prior</strong> to your appointment to browse our color swatch book and sip our welcome tea.
          </p>
          <p>
            • Should you need to reschedule or cancel, kindly notify us at least <strong>2 hours in advance</strong> to free up the artist slot.
          </p>
          <p>
            • Complimentary valet &amp; on-site secure parking is provided at 123 Nguyen Hue Boulevard, District 1.
          </p>
        </div>

        {/* Calendly Popup Modal Component */}
        {isOpen && (
          <PopupModal
            url={selectedUrl}
            onModalClose={() => setIsOpen(false)}
            open={isOpen}
            rootElement={document.body}
          />
        )}
      </div>
    </div>
  );
}