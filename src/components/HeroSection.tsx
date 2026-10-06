'use client';

import { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(TextPlugin);

export default function HeroSectionGSAP() {
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: 'none' } });

        tl.to(headlineRef.current, {
            duration: 2,
            text: {
                value: 'Artistry For Your Nails, <br /><span class="italic font-light text-[#F7D8BA] font-serif">Serenity</span> For Your Soul',
            },
            ease: 'power1.inOut',
        })
            .to(
                subtitleRef.current,
                {
                    duration: 2,
                    text: {
                        value: 'Where hospital-grade sanitized care meets cutting-edge nail fashion in an elegant, serene sanctuary.',
                    },
                    ease: 'power1.out',
                },
                '+=0.1'
            )
            .fromTo(
                '.gsap-hero-btn',
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out' },
                '-=0.3'
            )
            .fromTo(
                '.gsap-hero-stats',
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
                '-=0.2'
            );
    }, []);

    return (
        <div className="w-full h-full min-h-[550px] flex items-center justify-center relative">
            {/* Background Video */}
            <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover z-0 scale-105 filter brightness-[0.7]"
            >
                <source src="/videos/hero_video.mp4" type="video/mp4" />
            </video>

            {/* Ambient Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-10" />

            {/* Hero Content */}
            <div className="relative z-20 text-center text-white px-6 max-w-4xl mx-auto space-y-6 pt-4">
                {/* Main Headline */}
                <h1
                    ref={headlineRef}
                    className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-white leading-[1.15] drop-shadow-lg min-h-[100px] sm:min-h-[150px]"
                >
                    {/* GSAP Typewriter */}
                </h1>

                {/* Subtitle */}
                <p
                    ref={subtitleRef}
                    className="text-sm sm:text-lg text-[#F2E8DC] font-light max-w-2xl mx-auto leading-relaxed drop-shadow-sm min-h-[50px]"
                >
                    {/* GSAP Typewriter */}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                    <div className="gsap-hero-btn opacity-0 w-full sm:w-auto">
                        <Link
                            href="/booking"
                            className="px-8 py-3.5 rounded-full bg-[#9E2A2B] hover:bg-[#852122] text-white font-semibold text-sm tracking-wide shadow-xl transition-all duration-200 block text-center"
                        >
                            Book Appointment Now
                        </Link>
                    </div>

                    <div className="gsap-hero-btn opacity-0 w-full sm:w-auto">
                        <Link
                            href="/service"
                            className="px-8 py-3.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white font-semibold text-sm tracking-wide transition-all duration-200 block text-center"
                        >
                            Services & Price Menu
                        </Link>
                    </div>
                </div>
            </div>

            {/* Floating Stats Bar */}
            <div className="gsap-hero-stats opacity-0 absolute bottom-6 left-6 right-6 max-w-5xl mx-auto z-20 hidden lg:block">
                <div className="bg-[#FAF6F0]/95 backdrop-blur-md border border-[#E8DAC7]/80 rounded-2xl p-4 shadow-lg grid grid-cols-4 divide-x divide-[#E8DAC7] text-center text-[#3D2314]">
                    <div className="px-4">
                        <div className="font-serif text-xl font-bold text-[#9E2A2B]">4.9 / 5.0</div>
                        <div className="text-[11px] text-[#6B4E3D] mt-0.5">1,500+ Reviews</div>
                    </div>
                    <div className="px-4">
                        <div className="font-serif text-xl font-bold text-[#9E2A2B]">200+ Designs</div>
                        <div className="text-[11px] text-[#6B4E3D] mt-0.5">Weekly Lookbook</div>
                    </div>
                    <div className="px-4">
                        <div className="font-serif text-xl font-bold text-[#9E2A2B]">100% Sterile</div>
                        <div className="text-[11px] text-[#6B4E3D] mt-0.5">UV Autoclave</div>
                    </div>
                    <div className="px-4">
                        <div className="font-serif text-xl font-bold text-[#9E2A2B]">7-Day Warranty</div>
                        <div className="text-[11px] text-[#6B4E3D] mt-0.5">Complimentary Repair</div>
                    </div>
                </div>
            </div>
        </div>
    );
}