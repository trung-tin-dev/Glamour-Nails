'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// Danh sách 24 ảnh chuẩn không trùng lặp
const GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1619615787228-ce0fa8440e18?auto=format&fit=crop&w=800&h=800&q=80',
  'https://plus.unsplash.com/premium_photo-1703343320234-4c1a75b3ff13?auto=format&fit=crop&w=800&h=800&q=80',
  'https://images.unsplash.com/photo-1772322586702-73125782bd99?auto=format&fit=crop&w=800&h=800&q=80',
  'https://images.unsplash.com/photo-1666226399043-bbb245d216d0?auto=format&fit=crop&w=800&h=800&q=80',
  'https://plus.unsplash.com/premium_photo-1661432806304-6d6cb7bfa4c1?auto=format&fit=crop&w=800&h=800&q=80',
  'https://images.unsplash.com/photo-1584566006505-8923576e70d4?auto=format&fit=crop&w=800&h=800&q=80',
  'https://images.unsplash.com/photo-1637264718120-e70224dc0662?auto=format&fit=crop&w=800&h=800&q=80',
  'https://images.unsplash.com/photo-1754799670312-8e7da8e40ad7?auto=format&fit=crop&w=800&h=800&q=80',
  'https://images.unsplash.com/photo-1588359953494-0c215e3cedc6?auto=format&fit=crop&w=800&h=800&q=80',
  'https://images.unsplash.com/photo-1641814280326-d74ea2300067?auto=format&fit=crop&w=800&h=800&q=80',
  'https://images.unsplash.com/photo-1493799817216-4b57dda4229f?auto=format&fit=crop&w=800&h=800&q=80',
  'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&h=800&q=80',
  'https://images.unsplash.com/photo-1754799670410-b282791342c3?auto=format&fit=crop&w=800&h=800&q=80',
  'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&h=800&q=80',
  'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?auto=format&fit=crop&w=800&h=800&q=80',
  'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&h=800&q=80',
  'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=800&h=800&q=80',
  'https://plus.unsplash.com/premium_photo-1664187387373-cc949ab82605?auto=format&fit=crop&w=800&h=800&q=80',
  'https://images.unsplash.com/photo-1667207229735-266c430cca15?auto=format&fit=crop&w=800&h=800&q=80',
  'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&w=800&h=800&q=80',
  'https://images.unsplash.com/photo-1772322586785-3a34772cbc61?auto=format&fit=crop&w=800&h=800&q=80',
  'https://images.unsplash.com/photo-1559006045-d34d415b2cff?auto=format&fit=crop&w=800&h=800&q=80',
  'https://images.unsplash.com/photo-1688583417770-ff6cc18071dc?auto=format&fit=crop&w=800&h=800&q=80',
  'https://images.unsplash.com/photo-1587729927069-ef3b7a5ab9b4?auto=format&fit=crop&w=800&h=800&q=80'
];

export default function GalleryPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Header hiện nhẹ khi load
      gsap.fromTo(
        '.gsap-gallery-header',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
      );

      // ScrollTrigger.batch(): các khung ảnh hiện lên lần lượt
      ScrollTrigger.batch('.gsap-image', {
        start: 'top 90%',
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.8,
            ease: 'sine.out',
            overwrite: true,
          }),
      });

      // Tính toán lại vị trí sau khi toàn bộ ảnh tải xong
      const t = setTimeout(() => ScrollTrigger.refresh(), 400);
      return () => clearTimeout(t);
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="bg-[#FAF6F0] min-h-screen text-[#3D2314] py-14 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="gsap-gallery-header text-center max-w-xl mx-auto mb-12 space-y-3">
        <span className="inline-block px-3.5 py-1 rounded-full bg-[#EBD8C3] text-[11px] font-semibold tracking-widest uppercase text-[#6B4E3D]">
          Lookbook
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight">
          Our Nail Art Gallery
        </h1>
        <p className="text-neutral-600 text-sm">
          A curated collection of designs hand-crafted by our artists.
        </p>
      </div>

      {/* Lưới ảnh */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {GALLERY_IMAGES.map((src, i) => (
          <div
            key={i}
            // Khung ngoài ẩn sẵn để GSAP điều khiển chuyển động và bo tròn che đi phần ảnh thừa khi phóng to
            className="gsap-image opacity-0 translate-y-10 will-change-transform w-full aspect-square overflow-hidden rounded-xl shadow-xs group cursor-pointer bg-neutral-200"
          >
            <img
              src={src}
              alt={`Nail design ${i + 1}`}
              loading="lazy"
              // Hiệu ứng zoom: Group-hover kích hoạt phóng to 110%, chuyển động lướt cực nhẹ (700ms) tạo vẻ sang trọng
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
          </div>
        ))}
      </div>
    </div>
  );
}