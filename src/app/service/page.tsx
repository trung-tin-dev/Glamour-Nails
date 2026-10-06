'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import FloatingGem from '@/components/FloatingGem'; // ← THÊM DÒNG NÀY

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface ServiceItem {
  id: string;
  name: string;
  category: 'manicure' | 'pedicure' | 'art' | 'addon';
  price: string;
  duration: string;
  badge?: string;
  description: string;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'mani-1',
    name: 'Classic Organic Manicure',
    category: 'manicure',
    price: '$30',
    duration: '35 mins',
    description: 'Essential hand care using organic botanical oils. Includes gentle cuticle grooming, natural nail shaping, light hand massage, and non-toxic regular polish.',
  },
  {
    id: 'mani-2',
    name: 'Signature Russian Gel Manicure',
    category: 'manicure',
    price: '$45',
    duration: '45 mins',
    badge: 'Most Popular',
    description: 'Precision dry e-file cuticle technique providing an immaculate contour. Finished with a protective apex alignment and premium vegan gel polish (lasts 3-4 weeks).',
  },
  {
    id: 'pedi-1',
    name: 'Luxury Herbal Rose Pedicure',
    category: 'pedicure',
    price: '$60',
    duration: '60 mins',
    badge: 'Deep Relaxation',
    description: 'Our signature royal bath featuring fresh organic rose petals, pink Himalayan salts, gentle heel resurfacing, and hot volcanic stone reflexology massage.',
  },
  {
    id: 'art-1',
    name: 'Glazed Donut Chrome Pearl Polish',
    category: 'art',
    price: '$50',
    duration: '50 mins',
    badge: 'Trending',
    description: 'The iconic iridescent pearl chrome finish buffed over a semi-translucent milky nude gel base. Complete with a glass-finish scratch-resistant top coat.',
  },
  {
    id: 'art-2',
    name: 'Gel-X Extensions / Ombré Full Set',
    category: 'art',
    price: 'From $65',
    duration: '90 mins',
    badge: 'Lasts 4-6 Weeks',
    description: 'Odorless soft-gel Gel-X extensions or seamless 2-tone baby boomer ombré sculpting designed to lengthen while preserving natural nail health.',
  },
  {
    id: 'addon-1',
    name: 'Safe Gel / Acrylic Removal',
    category: 'addon',
    price: '$15',
    duration: '20 mins',
    description: 'Non-invasive soak-off removal using organic nourishing solvents to protect your natural keratin layers, finished with essential vitamin elixir.',
  },
];

const COMBOS = [
  {
    name: 'Glamour Royal VIP Combination',
    tag: 'Save $15',
    price: '$95',
    originalPrice: '$110',
    duration: '100 mins',
    desc: 'Our ultimate treatment: Signature Russian Gel Manicure combined with the Luxury Herbal Rose Spa Pedicure and a warm Paraffin hands mask.',
  },
  {
    name: 'Bridal Dream Package',
    tag: 'Special Day',
    price: '$120',
    originalPrice: '$140',
    duration: '120 mins',
    desc: 'Tailored set of Gel-X extensions, soft custom French Ombré art, Swarovski stone accents, paired with a matching Herbal Rose Pedicure.',
  },
];

export default function ServicePage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredServices =
    activeCategory === 'all'
      ? SERVICES_DATA
      : SERVICES_DATA.filter((s) => s.category === activeCategory);

  useGSAP(
    () => {
      gsap.fromTo('.gsap-svc-header', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' });
      gsap.fromTo('.gsap-svc-tabs', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: 0.2 });

      ScrollTrigger.batch('.gsap-svc-item', {
        start: 'top 92%',
        onEnter: (batch) =>
          gsap.fromTo(batch, { opacity: 0, y: 15 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.6, ease: 'power2.out', overwrite: 'auto' }),
      });

      ScrollTrigger.batch('.gsap-combo-card', {
        start: 'top 90%',
        onEnter: (batch) =>
          gsap.fromTo(batch, { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out', overwrite: 'auto' }),
      });
    },
    { scope: containerRef, dependencies: [activeCategory], revertOnUpdate: true }
  );

  return (
    // ← THÊM relative ĐỂ LÀM KHUNG QUY CHIẾU CHO VIÊN ĐÁ QUÝ
    <div ref={containerRef} className="bg-[#FAF6F0] min-h-screen text-[#3D2314] py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">

      {/* ========================================================= */}
      {/* VIÊN ĐÁ QUÝ 3D TRANG TRÍ NỀN (Floating Background)       */}
      {/* ========================================================= */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
        {/* Kích thước được phóng to đáng kể (lên đến 560px), độ mờ (opacity) chỉnh nhẹ 12% - 15% để tôn chữ rõ ràng */}
        <div className="w-[85vw] h-[85vw] max-w-[480px] max-h-[480px] sm:max-w-[560px] sm:max-h-[560px] opacity-[0.13] sm:opacity-[0.16]">
          <FloatingGem />
        </div>
      </div>

      {/* NỘI DUNG CHÍNH (z-10 nằm trên viên đá) */}
      <div className="max-w-4xl mx-auto space-y-16 relative z-10">

        {/* ========================================================= */}
        {/* 1. HEADER BANNER                                          */}
        {/* ========================================================= */}
        <div className="gsap-svc-header text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-block px-3.5 py-1.5 rounded-full bg-[#EBD8C3] text-[10px] font-semibold tracking-widest uppercase text-[#6B4E3D]">
            Service Menu
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight">
            Treatments &amp; Pricing
          </h1>
          <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed">
            Every service features 100% certified non-toxic, vegan formulations and adheres strictly to clinical, hospital-grade autoclave sterilization.
          </p>
        </div>

        {/* ========================================================= */}
        {/* 2. CATEGORY TABS                                          */}
        {/* ========================================================= */}
        <div className="gsap-svc-tabs flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
          {[
            { key: 'all', label: 'All Services' },
            { key: 'manicure', label: 'Gel Manicures' },
            { key: 'pedicure', label: 'Spa Pedicures' },
            { key: 'art', label: 'Nail Art' },
            { key: 'addon', label: 'Add-ons' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveCategory(tab.key)}
              className={`px-4.5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer ${activeCategory === tab.key
                ? 'bg-[#3D2314] text-[#FAF6F0] shadow-xs'
                : 'bg-white/40 border border-[#E8DAC7]/60 text-[#3D2314] hover:bg-white'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ========================================================= */}
        {/* 3. MINIMAL TYPOGRAPHIC MENU                               */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 pt-4">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="gsap-svc-item opacity-0 flex flex-col justify-between group py-1"
            >
              <div className="space-y-1">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-serif font-semibold text-base sm:text-lg text-[#3D2314] group-hover:text-[#9E2A2B] transition-colors duration-300">
                    {service.name}
                  </h3>
                  <span className="flex-1 border-b border-dotted border-[#E8DAC7] mx-1 opacity-60"></span>
                  <span className="font-serif font-bold text-lg text-[#9E2A2B]">
                    {service.price}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[10px] text-neutral-400 font-semibold tracking-wide uppercase">
                  {service.badge && (
                    <>
                      <span>•</span>
                      <span className="text-[#9E2A2B] normal-case italic font-serif">{service.badge}</span>
                    </>
                  )}
                </div>

                <p className="text-neutral-500 text-xs sm:text-[13px] leading-relaxed pr-4 pt-0.5">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ========================================================= */}
        {/* 4. VALUE COMBOS                                           */}
        {/* ========================================================= */}
        <section className="pt-12 border-t border-[#E8DAC7]/50">
          <div className="text-center mb-10 space-y-1.5">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#9E2A2B]">
              Bespoke Bundles
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#3D2314]">
              Signature Combos
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {COMBOS.map((combo) => (
              <div
                key={combo.name}
                className="gsap-combo-card opacity-0 bg-white/50 p-6 rounded-2xl border border-[#E8DAC7] flex flex-col justify-between hover:shadow-md hover:bg-white transition-all duration-300"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-serif font-semibold text-lg text-[#3D2314]">
                      {combo.name}
                    </h3>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#9E2A2B] bg-[#9E2A2B]/10 px-2 py-0.5 rounded">
                      {combo.tag}
                    </span>
                  </div>

                  <p className="text-neutral-500 text-xs leading-relaxed">
                    {combo.desc}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#F5EBDD]/60 text-xs">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-serif font-bold text-lg text-[#9E2A2B]">{combo.price}</span>
                    <span className="text-[10px] text-neutral-400 line-through">{combo.originalPrice}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}