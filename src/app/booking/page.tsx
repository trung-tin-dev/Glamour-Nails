'use client';

import React, { useState } from 'react';
import { PopupModal } from 'react-calendly';

interface Service {
    id: string;
    name: string;
    price: string;
    duration: string;
    description: string;
    calendlyUrl: string;
}

// 3 Dịch vụ kết nối trực tiếp với 3 link Calendly của bạn
const SERVICES: Service[] = [
    {
        id: '1',
        name: 'Service 1',
        price: '$45',
        duration: '45 mins',
        description: 'Classic manicure with premium gel polish, nail shaping, and cuticle care.',
        calendlyUrl: 'https://calendly.com/tatin3469/gel-manicure-45',
    },
    {
        id: '2',
        name: 'Service 2',
        price: '$60',
        duration: '60 mins',
        description: 'Relaxing foot soak, scrub exfoliation, foot massage, and nail care.',
        calendlyUrl: 'https://calendly.com/tatin3469/gel-manicure-45-clone',
    },
    {
        id: '3',
        name: 'Service 3',
        price: '$55+',
        duration: '60 mins',
        description: 'Full set of acrylic nail extensions with custom shape and color.',
        calendlyUrl: 'https://calendly.com/tatin3469/gel-manicure-45-clone-clone',
    },
];

export default function BookingPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedUrl, setSelectedUrl] = useState('');

    // Hàm xử lý khi bấm vào nút đặt lịch của từng dịch vụ
    const handleBook = (url: string) => {
        setSelectedUrl(url);
        setIsOpen(true);
    };

    return (
        <div className="min-h-screen bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                {/* Tiêu đề trang */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-serif font-bold text-neutral-800 mb-3">
                        Our Services & Booking
                    </h1>
                    <p className="text-neutral-600 text-sm max-w-md mx-auto">
                        Select your preferred treatment and schedule your appointment online.
                    </p>
                </div>

                {/* Bảng hiển thị 3 Dịch vụ */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {SERVICES.map((service) => (
                        <div
                            key={service.id}
                            className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200 flex flex-col justify-between hover:shadow-md transition duration-200"
                        >
                            <div>
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-lg text-neutral-800">{service.name}</h3>
                                    <span className="text-pink-600 font-bold text-lg">{service.price}</span>
                                </div>
                                <p className="text-xs text-neutral-400 font-medium mb-3">⏱ {service.duration}</p>
                                <p className="text-sm text-neutral-600 mb-6">{service.description}</p>
                            </div>

                            <button
                                onClick={() => handleBook(service.calendlyUrl)}
                                className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-xl text-sm transition shadow-sm active:scale-95 cursor-pointer"
                            >
                                Book Appointment
                            </button>
                        </div>
                    ))}
                </div>

                {/* Component Popup Modal chính thức từ react-calendly */}
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