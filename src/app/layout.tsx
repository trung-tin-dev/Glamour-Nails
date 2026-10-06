import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Glamour Nails & Spa | Luxury Nail Studio & 5-Star Care",
  description:
    "Experience luxury nail art, Russian gel manicures, organic herbal pedicures, and rejuvenating treatments in our serene boutique sanctuary.",
  keywords: "nail salon, nail art, gel manicure, pedicure, spa, luxury nails, Russian manicure",
  openGraph: {
    title: "Glamour Nails & Spa | Luxury Nail Studio",
    description: "5-star boutique nail studio offering bespoke artistry, hospital-grade sterile tools, and vegan formulations.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#FAF6F0] text-[#3D2314] antialiased flex flex-col selection:bg-[#9E2A2B]/20 selection:text-[#9E2A2B]">
        {/* Persistent Navigation Bar */}
        <Navbar />

        {/* Dynamic page content */}
        <main className="flex-1 pt-20">{children}</main>

        {/* Persistent Footer */}
        <Footer />
      </body>
    </html>
  );
}