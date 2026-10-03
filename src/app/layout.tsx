import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from '@next/third-parties/google';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Glamour Nails & Spa",
  description: "Book your appointment online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
      {/* Điền đúng Mã đo lường G-09GWXY51PW của bạn vào đây */}
      <GoogleAnalytics gaId="G-09GWXY51PW" />
    </html>
  );
}