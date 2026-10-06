'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP);
}

export default function Navbar() {
  // Chỉ giữ lại state cho mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Check if the current route is active
  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // GSAP Initial entrance animation for Navbar
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.gsap-nav-logo',
        { opacity: 0, y: -20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8 }
      ).fromTo(
        '.gsap-nav-item',
        { opacity: 0, y: -15 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 },
        '-=0.4'
      );
    },
    { scope: navRef }
  );

  // GSAP Animation for Mobile Menu opening/closing
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (isMobileMenuOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.35, ease: 'power3.out' }
      );
      gsap.fromTo(
        mobileMenuRef.current.querySelectorAll('.gsap-mobile-link'),
        { opacity: 0, x: -15 },
        { opacity: 1, x: 0, duration: 0.3, stagger: 0.05, delay: 0.1, ease: 'power2.out' }
      );
    }
  }, [isMobileMenuOpen]);

  return (
    <header
      ref={navRef}
      // ĐÃ XÓA CÁC CLASS DỊCH CHUYỂN, CHỈ GIỮ LẠI FIXED
      className="fixed top-0 left-0 w-full z-50 bg-[#F5EBDD]/95 backdrop-blur-md border-b border-[#E8DAC7]/60 shadow-xs"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-20">
          {/* MOBILE LOGO */}
          <div className="md:hidden flex items-center gsap-nav-logo">
            <Link
              href="/"
              className="font-serif text-xl font-bold tracking-wider text-[#3D2314]"
            >
              GLAMOUR<span className="text-[#9E2A2B]">.</span>NAILS
            </Link>
          </div>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden md:flex items-center justify-between w-full">
            {/* Left links group */}
            <div className="flex items-center space-x-10">
              <Link
                href="/"
                className={`gsap-nav-item group relative py-2 text-sm tracking-wider uppercase transition-colors duration-200 ${isActive('/')
                    ? 'text-[#9E2A2B] font-bold'
                    : 'text-[#3D2314]/85 hover:text-[#9E2A2B] font-medium'
                  }`}
              >
                <span>Home</span>
                <span
                  className={`absolute bottom-0 left-0 right-0 h-0.5 bg-[#9E2A2B] rounded-full transition-all duration-300 ${isActive('/') ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100'
                    }`}
                />
              </Link>

              <Link
                href="/gallery"
                className={`gsap-nav-item group relative py-2 text-sm tracking-wider uppercase transition-colors duration-200 ${isActive('/gallery')
                    ? 'text-[#9E2A2B] font-bold'
                    : 'text-[#3D2314]/85 hover:text-[#9E2A2B] font-medium'
                  }`}
              >
                <span>Gallery</span>
                <span
                  className={`absolute bottom-0 left-0 right-0 h-0.5 bg-[#9E2A2B] rounded-full transition-all duration-300 ${isActive('/gallery') ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100'
                    }`}
                />
              </Link>
            </div>

            {/* Center Brand Logo */}
            <div className="text-center px-6 gsap-nav-logo">
              <Link href="/" className="inline-block group transform hover:scale-105 transition-all duration-300">
                <div className="font-serif text-2xl font-bold tracking-widest text-[#3D2314]">
                  GLAMOUR<span className="text-[#9E2A2B]">.</span>NAILS
                </div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-[#6B4E3D] font-light mt-0.5">
                  Luxury Beauty & Spa Studio
                </div>
              </Link>
            </div>

            {/* Right links group + Booking Button */}
            <div className="flex items-center space-x-8">
              <Link
                href="/service"
                className={`gsap-nav-item group relative py-2 text-sm tracking-wider uppercase transition-colors duration-200 ${isActive('/service')
                    ? 'text-[#9E2A2B] font-bold'
                    : 'text-[#3D2314]/85 hover:text-[#9E2A2B] font-medium'
                  }`}
              >
                <span>Services</span>
                <span
                  className={`absolute bottom-0 left-0 right-0 h-0.5 bg-[#9E2A2B] rounded-full transition-all duration-300 ${isActive('/service') ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100'
                    }`}
                />
              </Link>

              <Link
                href="/contact"
                className={`gsap-nav-item group relative py-2 text-sm tracking-wider uppercase transition-colors duration-200 ${isActive('/contact')
                    ? 'text-[#9E2A2B] font-bold'
                    : 'text-[#3D2314]/85 hover:text-[#9E2A2B] font-medium'
                  }`}
              >
                <span>Contact</span>
                <span
                  className={`absolute bottom-0 left-0 right-0 h-0.5 bg-[#9E2A2B] rounded-full transition-all duration-300 ${isActive('/contact') ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100'
                    }`}
                />
              </Link>

              {/* Book Appointment CTA Button */}
              <div className="gsap-nav-item">
                <Link
                  href="/booking"
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-xs block hover:scale-105 active:scale-95 ${isActive('/booking')
                      ? 'bg-[#3D2314] text-[#F5EBDD] ring-2 ring-[#9E2A2B] ring-offset-2 ring-offset-[#F5EBDD]'
                      : 'bg-[#9E2A2B] hover:bg-[#852324] text-white hover:shadow-md'
                    }`}
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>

          {/* MOBILE BUTTONS */}
          <div className="md:hidden flex items-center gap-2 gsap-nav-item">
            <Link
              href="/booking"
              className="bg-[#9E2A2B] text-white text-xs font-semibold px-3.5 py-1.5 rounded-full shadow-xs"
            >
              Book Now
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[#3D2314] hover:text-[#9E2A2B] focus:outline-hidden rounded-lg transition"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* MOBILE MENU DROPDOWN WITH GSAP */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden bg-[#FAF6F0] border-t border-[#E8DAC7] px-6 pt-4 pb-6 space-y-2 shadow-xl overflow-hidden"
        >
          <Link
            href="/"
            className={`gsap-mobile-link flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all ${isActive('/')
                ? 'bg-[#9E2A2B]/10 text-[#9E2A2B] font-bold border-l-4 border-[#9E2A2B]'
                : 'text-[#3D2314] hover:bg-white/60 font-medium'
              }`}
          >
            <span>Home</span>
            {isActive('/') && <span className="text-xs bg-[#9E2A2B] text-white px-2 py-0.5 rounded-full">Active</span>}
          </Link>

          <Link
            href="/gallery"
            className={`gsap-mobile-link flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all ${isActive('/gallery')
                ? 'bg-[#9E2A2B]/10 text-[#9E2A2B] font-bold border-l-4 border-[#9E2A2B]'
                : 'text-[#3D2314] hover:bg-white/60 font-medium'
              }`}
          >
            <span>Nail Lookbook (Gallery)</span>
            {isActive('/gallery') && <span className="text-xs bg-[#9E2A2B] text-white px-2 py-0.5 rounded-full">Active</span>}
          </Link>

          <Link
            href="/service"
            className={`gsap-mobile-link flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all ${isActive('/service')
                ? 'bg-[#9E2A2B]/10 text-[#9E2A2B] font-bold border-l-4 border-[#9E2A2B]'
                : 'text-[#3D2314] hover:bg-white/60 font-medium'
              }`}
          >
            <span>Services & Pricing</span>
            {isActive('/service') && <span className="text-xs bg-[#9E2A2B] text-white px-2 py-0.5 rounded-full">Active</span>}
          </Link>

          <Link
            href="/contact"
            className={`gsap-mobile-link flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all ${isActive('/contact')
                ? 'bg-[#9E2A2B]/10 text-[#9E2A2B] font-bold border-l-4 border-[#9E2A2B]'
                : 'text-[#3D2314] hover:bg-white/60 font-medium'
              }`}
          >
            <span>Contact Us</span>
            {isActive('/contact') && <span className="text-xs bg-[#9E2A2B] text-white px-2 py-0.5 rounded-full">Active</span>}
          </Link>

          <div className="pt-3 border-t border-[#E8DAC7]/70">
            <Link
              href="/booking"
              className="gsap-mobile-link block w-full text-center bg-[#9E2A2B] text-white py-3 rounded-xl font-semibold text-sm shadow-md active:scale-98 transition"
            >
              💅 Book Appointment Online
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}