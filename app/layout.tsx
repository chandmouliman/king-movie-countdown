import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google"; // Import fonts
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel" }); // Configure Cinzel

export const metadata: Metadata = {
  title: {
    default: "KING | The Rule Begins - Official Countdown",
    template: "%s | KING Movie"
  },
  description: "Join the Army. Witness the Dehshat. The official countdown for Shah Rukh Khan's KING (2026). Directed by Siddharth Anand.",
  openGraph: {
    title: "KING | The Rule Begins",
    description: "Join the SRK Hyderabad Fans Army. Generate your Fan ID and prepare for the King's arrival.",
    type: "website",
    locale: "en_US",
    siteName: "KING Movie Countdown",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${cinzel.variable}`}>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
