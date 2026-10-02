import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Rare Logistics | Parcels, Couriers & Vehicle Hire Lesotho",
  description: "Leading courier, parcel collection (Bloemfontein & Ladybrand), 7-seater vehicle hire, and truck rentals across Lesotho and South Africa.",
  keywords: ["Rare Logistics", "Lesotho Courier", "Bloemfontein Parcel Collection", "Ladybrand Delivery", "7 Seater Rental Maseru", "Truck Hire Lesotho", "M-Pesa Delivery"],
  metadataBase: new URL('https://rarelogistics.co.ls'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
