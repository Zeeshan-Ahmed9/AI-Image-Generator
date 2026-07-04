import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { Space_Grotesk } from "next/font/google";
import Footer from "./components/Footer";
import { AppContextProvider } from "@/context/AppContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Imagen | AI Image Generator",
  description: "Generate stunning AI images instantly with Imagen.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppContextProvider>
          <div className="relative min-h-screen flex flex-col bg-[#05010a] text-white overflow-hidden">

            {/* Purple Brush Glow */}
            <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-purple-600 opacity-30 blur-[160px] rounded-full"></div>

            {/* Second Glow */}
            <div className="absolute top-40 left-60 w-[400px] h-[400px] bg-indigo-500 opacity-20 blur-[140px] rounded-full"></div>

            <Navbar />

            <main className="flex-1 relative z-10">
              {children}
            </main>

            <Footer />

          </div>
        </AppContextProvider>
      </body>
    </html>
  );
}