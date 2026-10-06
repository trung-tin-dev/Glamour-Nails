'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface FAQ {
  question: string;
  answer: string;
}

const FAQS: FAQ[] = [
  {
    question: 'Do I need to book an appointment before visiting the studio?',
    answer: 'We strongly recommend booking in advance via our website or concierge hotline. This ensures your designated master nail artist and sanitization station are prepared exclusively for you, preventing wait times during busy peak hours and weekends.',
  },
  {
    question: 'How long does a Russian gel manicure last, and does it damage natural nails?',
    answer: 'Our signature Russian dry e-file manicure paired with OPI/CND vegan gels typically lasts 3 to 4 weeks with zero lifting. We strictly apply protective keratin base coats and utilize gentle non-damaging soak-off methods, ensuring your natural nail plate stays thick and strong.',
  },
  {
    question: 'What is your 7-day complimentary nail warranty policy?',
    answer: 'Glamour Nails proudly offers a 100% complimentary 7-day quality warranty. If you experience any gel chipping, peel-back, or crystal displacement due to technical reasons within 7 days, simply visit us for a free touch-up repair.',
  },
  {
    question: 'Is there parking available for cars and motorbikes at the studio?',
    answer: 'Yes, we provide complimentary secure valet and on-site parking for both automobiles and motorbikes right in front of our entrance at 123 Nguyen Hue Boulevard, with security attendants on duty.',
  },
  {
    question: 'Are your products safe for pregnant women and sensitive skin?',
    answer: 'Absolutely. 100% of our polishes and spa treatments are certified vegan, cruelty-free, and 10-free (formulated without formaldehyde, toluene, DBP, or harsh chemical fumes), making them completely safe for expectant mothers and children.',
  },
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'Nail Art Consultation',
    message: '',
  });

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const faqRefs = useRef<(HTMLDivElement | null)[]>([]);

  // ── GSAP entrance animations ──
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo('.gsap-contact-header', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 })
        .fromTo(
          '.gsap-contact-info',
          { opacity: 0, x: -40 },
          { opacity: 1, x: 0, duration: 0.8 },
          '-=0.4'
        )
        .fromTo(
          '.gsap-contact-form',
          { opacity: 0, x: 40 },
          { opacity: 1, x: 0, duration: 0.8 },
          '-=0.7'
        );

      // FAQ section ScrollTrigger
      gsap.fromTo(
        '.gsap-faq-item',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.gsap-faq-section',
            start: 'top 82%',
          },
        }
      );
    },
    { scope: containerRef }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) return;

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Failed to send message. Please try again.');
      }

      setFormSubmitted(true);
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleFaq = (index: number) => {
    const isOpening = openFaqIndex !== index;
    setOpenFaqIndex(isOpening ? index : null);

    const panel = faqRefs.current[index];
    if (panel) {
      if (isOpening) {
        gsap.fromTo(
          panel,
          { height: 0, opacity: 0 },
          { height: 'auto', opacity: 1, duration: 0.35, ease: 'power3.out' }
        );
      } else {
        gsap.to(panel, { height: 0, opacity: 0, duration: 0.25, ease: 'power2.in' });
      }
    }
  };

  const whatsappUrl = `https://wa.me/84901234567?text=${encodeURIComponent(
    `Hello Glamour Nails, my name is ${formData.name || 'Guest'}. I would like to inquire about: ${formData.subject}. Message: ${formData.message}`
  )}`;

  return (
    <div ref={containerRef} className="bg-[#FAF6F0] min-h-screen text-[#3D2314] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* ========================================================= */}
        {/* 1. HEADER BANNER                                          */}
        {/* ========================================================= */}
        <div className="gsap-contact-header text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBD8C3] text-xs font-semibold tracking-widest uppercase text-[#6B4E3D]">
            Get In Touch
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#3D2314] tracking-tight">
            Contact Us
          </h1>

        </div>

        {/* ========================================================= */}
        {/* 2. CONTACT GRID                                           */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
          {/* Left Column: Direct Info Cards */}
          <div className="gsap-contact-info lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-[#E8DAC7] shadow-xs space-y-6">
              <h3 className="font-serif font-bold text-2xl text-[#3D2314] border-b border-[#F5EBDD] pb-4">
                Studio Information
              </h3>

              <div className="space-y-5 text-sm">
                {/* ĐỊA CHỈ (Map Pin Icon) */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-rose-50 flex items-center justify-center shrink-0 text-[#9E2A2B]">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#3D2314]">Studio Address</h4>
                    <p className="text-neutral-600 text-xs mt-1 leading-relaxed">
                      123 Nguyen Hue Boulevard, Ben Nghe Ward, District 1, Ho Chi Minh City
                    </p>
                    <span className="text-[11px] text-[#9E2A2B] font-semibold mt-1 inline-block">
                      ★ Free secure valet &amp; parking on-site
                    </span>
                  </div>
                </div>

                {/* SỐ ĐIỆN THOẠI (Phone Icon) */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-rose-50 flex items-center justify-center shrink-0 text-[#9E2A2B]">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#3D2314]">Hotline</h4>
                    <p className="text-neutral-600 text-xs mt-1">
                      <a href="tel:0901234567" className="hover:text-[#9E2A2B] font-medium">
                        0834636991
                      </a>
                    </p>
                    <span className="text-[11px] text-neutral-400 mt-0.5 block">
                      Concierge support &amp; consultations available 7 days a week
                    </span>
                  </div>
                </div>

                {/* EMAIL (Envelope Icon) */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-rose-50 flex items-center justify-center shrink-0 text-[#9E2A2B]">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#3D2314]">Email</h4>
                    <p className="text-neutral-600 text-xs mt-1">
                      <a href="mailto:tatin3469@gmail.com" className="hover:text-[#9E2A2B]">
                        tatin3469@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                {/* GIỜ MỞ CỬA (Clock Icon) */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-rose-50 flex items-center justify-center shrink-0 text-[#9E2A2B]">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#3D2314]">Opening Hours</h4>
                    <div className="text-xs text-neutral-600 mt-1 space-y-1">
                      <p>Mon - Fri: <strong>09:00 AM - 08:00 PM</strong></p>
                      <p>Saturday: <strong>09:00 AM - 09:00 PM</strong></p>
                      <p>Sunday: <strong>10:00 AM - 06:00 PM</strong></p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-[#F5EBDD]">
                <span className="text-xs font-semibold text-[#3D2314] block mb-3 uppercase tracking-wider">
                  Connect With Glamour Nails
                </span>
                <div className="flex flex-wrap gap-2.5">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FAF6F0] hover:bg-[#9E2A2B] hover:text-white text-xs font-semibold transition-all duration-300"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                    <span>Instagram</span>
                  </a>
                  <a
                    href="https://www.facebook.com/tin.trung.735134"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FAF6F0] hover:bg-[#9E2A2B] hover:text-white text-xs font-semibold transition-all duration-300"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                    <span>Facebook</span>
                  </a>
                  <a
                    href="https://tiktok.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FAF6F0] hover:bg-[#9E2A2B] hover:text-white text-xs font-semibold transition-all duration-300"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                    </svg>
                    <span>TikTok</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="gsap-contact-form lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E8DAC7] shadow-sm">
              <h3 className="font-serif font-bold text-2xl text-[#3D2314] mb-2">
                Send Us A Message
              </h3>
              <p className="text-xs text-neutral-500 mb-6">
                Fill in your details below. Your message will be delivered directly to the salon management team.
              </p>

              {formSubmitted ? (
                <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-4">
                  <div className="text-4xl"></div>
                  <h4 className="font-serif font-bold text-xl text-emerald-800">
                    Thank You! Your Message Has Been Sent.
                  </h4>
                  <p className="text-sm text-emerald-700 leading-relaxed">
                    We have received your inquiry. Our guest concierge will review it and contact you via phone/WhatsApp at{' '}
                    <strong>{formData.phone}</strong> shortly.
                  </p>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-full text-xs font-semibold transition"
                    >
                      Continue on WhatsApp
                    </a>
                    <button
                      onClick={() => {
                        setFormSubmitted(false);
                        setFormData({
                          name: '',
                          phone: '',
                          email: '',
                          subject: 'Nail Art Consultation',
                          message: '',
                        });
                      }}
                      className="px-5 py-2.5 bg-white border border-emerald-300 text-emerald-800 rounded-full text-xs font-semibold hover:bg-emerald-100 transition cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#3D2314] mb-1.5">
                        Your Full Name <span className="text-[#9E2A2B]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Sophia Laurent"
                        className="w-full px-4 py-3 rounded-xl border border-[#E8DAC7] text-sm focus:outline-none focus:ring-2 focus:ring-[#9E2A2B] bg-[#FAF6F0]/40"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#3D2314] mb-1.5">
                        Phone / WhatsApp <span className="text-[#9E2A2B]">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+84 90 123 4567"
                        className="w-full px-4 py-3 rounded-xl border border-[#E8DAC7] text-sm focus:outline-none focus:ring-2 focus:ring-[#9E2A2B] bg-[#FAF6F0]/40"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#3D2314] mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="sophia@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-[#E8DAC7] text-sm focus:outline-none focus:ring-2 focus:ring-[#9E2A2B] bg-[#FAF6F0]/40"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#3D2314] mb-1.5">
                        Inquiry Topic
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-[#E8DAC7] text-sm focus:outline-none focus:ring-2 focus:ring-[#9E2A2B] bg-[#FAF6F0]/40 animate-none"
                      >
                        <option value="Nail Art Consultation">Nail Art &amp; Shape Consultation</option>
                        <option value="Group / Event Booking">Group / Bridal Party Booking</option>
                        <option value="Touch-up / Warranty">7-Day Warranty Touch-up Request</option>
                        <option value="Partnership / Press">Partnership &amp; Media Inquiries</option>
                        <option value="Other">Other Questions</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#3D2314] mb-1.5">
                      Your Message <span className="text-[#9E2A2B]">*</span>
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us what you would like to know, or describe your desired nail inspiration..."
                      className="w-full px-4 py-3 rounded-xl border border-[#E8DAC7] text-sm focus:outline-none focus:ring-2 focus:ring-[#9E2A2B] bg-[#FAF6F0]/40"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#9E2A2B] hover:bg-[#852122] disabled:opacity-50 text-white font-semibold py-3.5 rounded-xl text-sm transition shadow-md cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
                    >
                      {isSubmitting ? (
                        <span>Sending your message...</span>
                      ) : (
                        <span>Send Message Directly</span>
                      )}
                    </button>
                  </div>

                  <div className="pt-2 text-center">
                    <span className="text-xs text-neutral-400 block mb-2">
                      Prefer instant messaging?
                    </span>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                    >
                      <span>Chat with us on WhatsApp (+84 90 123 4567)</span>
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}