import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-[#2D1B12] text-[#EAD8C7] pt-16 pb-12 border-t border-[#4A3226]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
                    {/* Col 1: Brand Info */}
                    <div className="space-y-4">
                        <Link href="/" className="inline-block">
                            <span className="font-serif text-2xl font-bold tracking-widest text-[#FAF4ED]">
                                GLAMOUR<span className="text-[#E07A7C]">.</span>NAILS
                            </span>
                            <span className="block text-[11px] tracking-[0.25em] uppercase text-[#C4A48A] mt-0.5">
                                Luxury Beauty & Spa
                            </span>
                        </Link>
                        <p className="text-sm text-[#C4A48A] leading-relaxed">
                            A 5-star boutique nail studio and spa dedicated to empowering your natural beauty with clean, vegan, and hospital-grade sanitized care.
                        </p>
                        <div className="flex items-center space-x-3 pt-2">
                            {/* INSTAGRAM */}
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noreferrer"
                                className="w-9 h-9 rounded-full bg-[#3D251A] hover:bg-[#E07A7C] text-white flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-xs"
                                aria-label="Instagram"
                            >
                                <svg
                                    className="w-4.5 h-4.5"
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
                            </a>

                            {/* FACEBOOK */}
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noreferrer"
                                className="w-9 h-9 rounded-full bg-[#3D251A] hover:bg-[#E07A7C] text-white flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-xs"
                                aria-label="Facebook"
                            >
                                <svg
                                    className="w-4.5 h-4.5"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                </svg>
                            </a>

                            {/* TIKTOK */}
                            <a
                                href="https://tiktok.com"
                                target="_blank"
                                rel="noreferrer"
                                className="w-9 h-9 rounded-full bg-[#3D251A] hover:bg-[#E07A7C] text-white flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-xs"
                                aria-label="TikTok"
                            >
                                <svg
                                    className="w-4.5 h-4.5"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Col 2: Quick Links */}
                    <div>
                        <h4 className="font-serif text-lg font-semibold text-[#FAF4ED] mb-4 tracking-wide">
                            Explore
                        </h4>
                        <ul className="space-y-2.5 text-sm text-[#C4A48A]">
                            <li>
                                <Link href="/" className="hover:text-[#FAF4ED] transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/gallery" className="hover:text-[#FAF4ED] transition-colors">
                                    Nail Lookbook & Gallery
                                </Link>
                            </li>
                            <li>
                                <Link href="/service" className="hover:text-[#FAF4ED] transition-colors">
                                    Services & Price List
                                </Link>
                            </li>
                            <li>
                                <Link href="/booking" className="hover:text-[#FAF4ED] transition-colors">
                                    Book Online Appointment
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-[#FAF4ED] transition-colors">
                                    Contact & Location
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Col 3: Business Hours */}
                    <div>
                        <h4 className="font-serif text-lg font-semibold text-[#FAF4ED] mb-4 tracking-wide">
                            Opening Hours
                        </h4>
                        <ul className="space-y-2 text-sm text-[#C4A48A]">
                            <li className="flex justify-between py-1 border-b border-[#4A3226]">
                                <span>Mon - Fri:</span>
                                <span className="font-medium text-[#FAF4ED]">09:00 AM - 08:00 PM</span>
                            </li>
                            <li className="flex justify-between py-1 border-b border-[#4A3226]">
                                <span>Saturday:</span>
                                <span className="font-medium text-[#FAF4ED]">09:00 AM - 09:00 PM</span>
                            </li>
                            <li className="flex justify-between py-1">
                                <span>Sunday:</span>
                                <span className="font-medium text-[#FAF4ED]">10:00 AM - 06:00 PM</span>
                            </li>
                        </ul>

                    </div>

                    {/* Col 4: Visit Us */}
                    <div>
                        <h4 className="font-serif text-lg font-semibold text-[#FAF4ED] mb-4 tracking-wide">
                            Visit Our Studio
                        </h4>
                        <ul className="space-y-3.5 text-sm text-[#C4A48A]">
                            {/* ĐỊA CHỈ (MAP PIN) */}
                            <li className="flex items-start space-x-3">
                                <svg
                                    className="w-4.5 h-4.5 text-[#E07A7C] shrink-0 mt-0.5"
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
                                <span className="leading-relaxed">
                                    123 Nguyen Hue Boulevard, Ben Nghe Ward, District 1, Ho Chi Minh City
                                </span>
                            </li>

                            {/* SỐ ĐIỆN THOẠI (PHONE) */}
                            <li className="flex items-center space-x-3">
                                <svg
                                    className="w-4.5 h-4.5 text-[#E07A7C] shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                </svg>
                                <a
                                    href="tel:0901234567"
                                    className="hover:text-[#FAF4ED] transition-colors duration-200"
                                >
                                    090 123 4567 / (028) 3822 9999
                                </a>
                            </li>

                            {/* EMAIL (MAIL) */}
                            <li className="flex items-center space-x-3">
                                <svg
                                    className="w-4.5 h-4.5 text-[#E07A7C] shrink-0"
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
                                <a
                                    href="mailto:contact@glamournails.vn"
                                    className="hover:text-[#FAF4ED] transition-colors duration-200"
                                >
                                    contact@glamournails.vn
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-[#4A3226] flex flex-col md:flex-row items-center justify-between text-xs text-[#A88B77] gap-4">
                    <p>© 2026 Glamour Nails & Spa. All rights reserved.</p>
                    <div className="flex space-x-6">
                        <span className="hover:text-[#FAF4ED] cursor-pointer">Privacy Policy</span>
                        <span className="hover:text-[#FAF4ED] cursor-pointer">Terms of Service</span>
                        <span className="hover:text-[#FAF4ED] cursor-pointer">7-Day Nail Warranty</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
