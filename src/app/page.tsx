'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import HeroSectionGSAP from '@/components/HeroSection';
import FloatingGem from '@/components/FloatingGem'; // ← Nhập 3D trang trí nền

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const FEATURED_SERVICES = [
  {
    id: 'manicure',
    name: 'Signature Russian Gel Manicure',
    category: 'Manicure',
    duration: '45 mins',
    price: '$45',
    tag: 'Best Seller',
    tagColor: 'bg-rose-100 text-rose-800',
    description: 'Precision dry Russian cuticle care, gentle e-file shaping, and 3-coat premium vegan gel polish lasting up to 4 chip-free weeks.',
    image: 'https://images.unsplash.com/photo-1619615787228-ce0fa8440e18?auto=format&fit=crop&w=800&h=800&q=80',
  },
  {
    id: 'pedicure',
    name: 'Luxury Herbal Rose Pedicure',
    category: 'Pedicure',
    duration: '60 mins',
    price: '$60',
    tag: 'Deep Relaxation',
    tagColor: 'bg-amber-100 text-amber-800',
    description: 'Fresh rose petal & Himalayan salt foot soak, organic raw sugar scrub, heel smoothing, and rejuvenating hot stone reflexology massage.',
    image: 'https://images.unsplash.com/photo-1637264718120-e70224dc0662?auto=format&fit=crop&w=800&h=800&q=80',
  },
  {
    id: 'nail-art',
    name: 'Bespoke Nail Art & Crystals',
    category: 'Artistry',
    duration: '75 mins',
    price: 'From $55',
    tag: 'Trending Style',
    tagColor: 'bg-purple-100 text-purple-800',
    description: 'Custom artistry: Glazed Donut chrome powder, soft ombré blushes, 9D magnetic cat-eye, and authentic Swarovski crystal placements.',
    image: 'https://images.unsplash.com/photo-1588359953494-0c215e3cedc6?auto=format&fit=crop&w=800&h=800&q=80',
  },
  {
    id: 'combo-vip',
    name: 'Royal VIP Mani & Pedi Combo',
    category: 'Value Package',
    duration: '100 mins',
    price: '$95',
    tag: 'Save $15',
    tagColor: 'bg-emerald-100 text-emerald-800',
    description: 'Complete royal head-to-toe pampering: Russian Gel Manicure combined with Herbal Rose Spa Pedicure and warm paraffin moisture mask.',
    image: 'https://images.unsplash.com/photo-1493799817216-4b57dda4229f?auto=format&fit=crop&w=800&h=800&q=80',
  },
];

const TESTIMONIALS = [
  { id: 1, name: 'Emily Watson', role: 'Loyal Client', avatar: 'https://plus.unsplash.com/premium_photo-1739178656567-068b26a4b979?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fHw%3D', rating: 5, comment: 'The Russian manicure here is by far the cleanest and gentlest I have ever experienced. My gel polish stays flawless for a whole month with zero chipping.', service: 'Russian Gel Manicure' },
  { id: 2, name: 'Sophia Laurent', role: 'Verified Booking', avatar: 'https://images.unsplash.com/photo-1728577740843-5f29c7586afe?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXZhdGFyfGVufDB8fDB8fHww', rating: 5, comment: 'The atmosphere is pure serenity. Gentle music, soothing lavender scent, and the herbal rose pedicure with hot stones made all my stress melt away.', service: 'Herbal Rose Pedicure' },
  { id: 3, name: 'Jessica Nguyen', role: 'Nail Art Fan', avatar: 'https://media.istockphoto.com/id/2193990595/fr/photo/portrait-lumineux-de-mignon-beau-kawaii-excit%C3%A9-homme-africain-souriant-avec-des-cheveux-de.webp?a=1&b=1&s=612x612&w=0&k=20&c=hn5_6ckQKSterUzSHXFPpRz_upHXYSKCy-cO9YIdL3Y=', rating: 5, comment: 'I brought in an intricate Pinterest design and the artist recreated it even more beautifully than the photo! The glazed pearl chrome finish is perfection.', service: 'Bespoke Nail Art' },
];

export default function HomePage() {
  const mainContainerRef = useRef<HTMLDivElement>(null);

  // GSAP Layered Pinning & Horizontal Scroll Integration
  useGSAP(
    () => {
      const panels = gsap.utils.toArray<HTMLElement>('.gsap-panel');
      if (panels.length === 0) return;

      const panelsToAnimate = panels.slice(0, -1);

      panelsToAnimate.forEach((panel) => {
        const navbarHeight = 80;
        const windowHeight = window.innerHeight - navbarHeight;

        // ==========================================
        // KHU VỰC CUỘN NGANG (Panel 3)
        // ==========================================
        if (panel.classList.contains('gsap-horiz-panel')) {
          const strip = panel.querySelector<HTMLElement>('.gsap-horiz-strip');
          if (!strip) return;

          const getScrollAmount = () => {
            return strip.scrollWidth - window.innerWidth;
          };

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: panel,
              start: 'top 80px',
              end: () => `+=${getScrollAmount() + windowHeight}`,
              pin: true,
              pinSpacing: true,
              scrub: true,
              invalidateOnRefresh: true,
            },
          });

          // Phase 1: Cuộn ngang dải băng
          tl.to(strip, {
            x: () => -getScrollAmount(),
            ease: 'none',
            duration: 1,
          });

          // Phase 2: Panel 3 đứng yên và mờ/thu nhỏ dần trong lúc Panel 4 cuộn lên chồng đè
          tl.to(panel, {
            scale: 0.92,
            opacity: 0.4,
            ease: 'power1.inOut',
            duration: () => windowHeight / getScrollAmount(),
          });

        } else {
          // ==========================================
          // KHU VỰC XẾP CHỒNG DỌC (Panel 1, 2, 5)
          // ==========================================
          const innerPanel = panel.querySelector<HTMLElement>('.gsap-panel-inner');
          if (!innerPanel) return;

          const panelHeight = innerPanel.offsetHeight;
          const difference = panelHeight - windowHeight;
          const fakeScrollRatio = difference > 0 ? difference / (difference + windowHeight) : 0;

          if (fakeScrollRatio) {
            panel.style.marginBottom = `${panelHeight * fakeScrollRatio}px`;
          }

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: panel,
              start: 'top 80px',
              end: () => (fakeScrollRatio ? `+=${innerPanel.offsetHeight}` : 'bottom top'),
              pinSpacing: false, // Cuộn lướt xếp đè lên nhau
              pin: true,
              scrub: true,
              invalidateOnRefresh: true,
            },
          });

          if (fakeScrollRatio) {
            tl.to(innerPanel, {
              yPercent: -100,
              y: windowHeight,
              duration: 1 / (1 - fakeScrollRatio) - 1,
              ease: 'none',
            });
          }

          tl.fromTo(
            panel,
            { scale: 1, opacity: 1 },
            { scale: 0.92, opacity: 0.4, duration: 0.9, ease: 'power1.inOut' }
          ).to(panel, { opacity: 0, duration: 0.1 });
        }
      });

      const refreshTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 600);

      return () => clearTimeout(refreshTimeout);
    },
    { scope: mainContainerRef }
  );

  return (
    <div ref={mainContainerRef} className="bg-[#1C120C] text-[#3D2314] overflow-x-hidden relative">
      {/* ========================================================================= */}
      {/* PANEL 1: HERO SECTION (Đã tích hợp 3D chìm trung tâm trong component)    */}
      {/* ========================================================================= */}
      <section className="gsap-panel w-full h-[calc(100vh-80px)] overflow-hidden rounded-b-3xl shadow-2xl bg-[#FAF6F0] border-b border-[#E8DAC7]/50 z-10 relative">
        <div className="gsap-panel-inner h-full w-full">
          <HeroSectionGSAP />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PANEL 2: ABOUT SECTION (z-20)                                            */}
      {/* ========================================================================= */}
      <section className="gsap-panel w-full h-[calc(100vh-80px)] overflow-hidden rounded-3xl shadow-2xl bg-[#FAF6F0] border-b border-[#E8DAC7]/50 z-20 relative">
        <div className="gsap-panel-inner w-full flex flex-col justify-center py-16 px-4 sm:px-8 lg:px-16">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border-2 border-white aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1652869122685-c7792ef56ee2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fG5haWwlMjBzYWxvbnxlbnwwfHwwfHx8MA%3D%3D"
                  alt="Studio Interior"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl p-4 shadow-md border border-[#E8DAC7] hidden sm:flex items-center gap-3">
                <span className="text-2xl">🌿</span>
                <div>
                  <div className="font-bold text-xs">Vegan & Clean Care</div>
                  <div className="text-[10px] text-neutral-500">100% Organic Products</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-5">
              <span className="inline-block px-3 py-1 rounded-full bg-[#EBD8C3] text-[10px] font-semibold uppercase tracking-wider text-[#6B4E3D]">
                OUR PHILOSOPHY
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#3D2314] leading-tight">
                Pampering Your Hands With <span className="text-[#9E2A2B] italic">Love</span> & Flawless Artistry
              </h2>
              <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                At Glamour Nails & Spa, we believe a great manicure is more than beauty—it is a personal statement of elegance and self-care. Relax in our European-inspired minimalist sanctuary designed for mindful renewal.
              </p>

              <div className="pt-2">
                <Link
                  href="/gallery"
                  className="inline-flex items-center gap-2 bg-[#3D2314] hover:bg-[#2A180E] text-white text-xs font-semibold px-6 py-3 rounded-full transition"
                >
                  Explore Studio & Designs →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PANEL 3: SERVICES MENU (HORIZONTAL SCROLLING - THIẾT KẾ TỐI GIẢN)        */}
      {/* ========================================================================= */}
      <section className="gsap-panel gsap-horiz-panel w-full h-[calc(100vh-80px)] overflow-hidden rounded-3xl shadow-2xl bg-[#F5EBDD] border-b border-[#E8DAC7]/50 flex items-center z-30 relative">
        <div className="gsap-horiz-strip flex flex-row flex-nowrap items-center h-full pl-6 md:pl-16 lg:pl-20 pr-12 md:pr-20 gap-6 lg:gap-8 shrink-0">

          {/* Card giới thiệu */}
          <div className="w-[80vw] sm:w-[46vw] lg:w-[28vw] h-[68vh] min-h-[420px] max-h-[520px] shrink-0 flex flex-col justify-center space-y-4">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#9E2A2B] bg-[#9E2A2B]/10 px-3.5 py-1 rounded-full self-start">
              SIGNATURE MENUS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#3D2314] leading-tight">
              Curated Luxury <br />Nail Treatments
            </h2>
            <p className="text-neutral-500 text-xs sm:text-sm max-w-sm leading-relaxed">
              Swipe or scroll down to explore our exclusive range of precision Russian manicures, botanical spa pedicures, and custom nail art designs.
            </p>
            <div className="text-xs text-[#9E2A2B] font-bold flex items-center gap-2 pt-2 animate-pulse">
              <span>Scroll down to slide menu</span>
              <span>→</span>
            </div>
          </div>

          {/* Dải dịch vụ tối giản */}
          {FEATURED_SERVICES.map((service) => (
            <Link
              key={service.id}
              href="/booking"
              className="group w-[75vw] sm:w-[42vw] lg:w-[22vw] h-[68vh] min-h-[420px] max-h-[520px] bg-white rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col shrink-0 border border-[#E8DAC7]/40"
            >
              <div className="relative h-[60%] w-full overflow-hidden bg-neutral-100 shrink-0">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute bottom-3 left-3 bg-[#3D2314]/90 backdrop-blur-md text-[#FAF6F0] text-xs font-semibold px-3 py-1 rounded-full">
                  {service.price}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between bg-white">
                <div className="space-y-1.5">
                  <div className="text-[10px] tracking-widest text-[#9E2A2B] font-semibold uppercase">
                    {service.category} • {service.duration}
                  </div>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-[#3D2314] leading-snug group-hover:text-[#9E2A2B] transition-colors duration-300">
                    {service.name}
                  </h3>
                </div>

                <div className="flex items-center text-xs font-bold text-[#3D2314] gap-1 group-hover:text-[#9E2A2B] transition-colors duration-300 pt-2">
                  <span>Book Treatment</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PANEL 5: TESTIMONIALS (z-50)                                             */}
      {/* ========================================================================= */}
      <section className="gsap-panel w-full min-h-[calc(100vh-80px)] flex flex-col justify-center rounded-t-3xl shadow-2xl bg-[#FAF4ED] pb-12 z-50 relative overflow-hidden">

        {/* ========================================================================= */}
        {/* 3D GEM CHÌM NỀN (Centered Background Watermark cho phần Testimonials)   */}
        {/* ========================================================================= */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <div className="w-[85vw] h-[85vw] max-w-[420px] max-h-[420px] sm:max-w-[500px] sm:max-h-[500px] opacity-[0.11] sm:opacity-[0.14]">
            <FloatingGem />
          </div>
        </div>

        {/* Nội dung Testimonial nổi lên trên (z-10) */}
        <div className="w-full py-16 px-4 sm:px-8 lg:px-16 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Tiêu đề */}
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#9E2A2B] bg-[#9E2A2B]/10 px-3 py-1 rounded-full">
                GUEST REVIEWS
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#3D2314]">
                Trusted by Over 1,500+ Happy Guests
              </h2>
              <p className="text-neutral-500 text-xs sm:text-sm">
                What our clients say about their 5-star beauty experience with us.
              </p>
            </div>

            {/* Danh sách 3 thẻ đánh giá */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((review) => (
                <div
                  key={review.id}
                  className="bg-white p-6 rounded-2xl border border-[#E8DAC7]/60 flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow duration-300"
                >
                  <div className="space-y-3">
                    <div className="text-amber-400 text-xs">{'★'.repeat(review.rating)}</div>
                    <p className="text-neutral-600 text-xs sm:text-sm italic leading-relaxed">
                      "{review.comment}"
                    </p>
                  </div>

                  {/* PHẦN AVATAR ĐÃ ĐƯỢC CHUYỂN SANG ẢNH THẬT */}
                  <div className="flex items-center gap-3.5 mt-6 pt-4 border-t border-[#F5EBDD]">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      loading="lazy"
                      className="w-10 h-10 rounded-full object-cover border border-[#E8DAC7] shadow-xs shrink-0"
                    />
                    <div>
                      <h5 className="font-bold text-xs text-[#3D2314]">{review.name}</h5>
                      <p className="text-[10px] text-neutral-400">{review.service}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}