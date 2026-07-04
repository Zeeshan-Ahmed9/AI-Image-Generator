"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Space_Grotesk } from "next/font/google";
import AuthModal from "./AuthModal";
import { useAppContext } from "@/context/AppContext";
import { Coins, LogOut, ChevronDown } from "lucide-react";

const logoFont = Space_Grotesk({
    subsets: ["latin"],
    weight: ["500", "600", "700"],
});

const Navbar = () => {
    const { isLoggedIn, user, logout, showAuthModal, setShowAuthModal } = useAppContext();
    const router = useRouter();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleProtectedRoute = (path: string) => {
        if (!isLoggedIn) {
            setShowAuthModal(true);
        } else {
            router.push(path);
        }
    };

    return (
        <>
            <nav className="relative z-50 w-full backdrop-blur-md mt-6">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center justify-between h-16">

                        {/* Logo */}
                        <div className={`${logoFont.className} text-3xl font-semibold tracking-wide`}>
                            <Link href="/">Imagen</Link>
                        </div>

                        {/* Nav Links */}
                        <div className="hidden md:flex items-center gap-12 text-sm text-gray-300">
                            <Link href="/" className="hover:text-white transition">Home</Link>

                            <button
                                onClick={() => handleProtectedRoute("/generate")}
                                className="hover:text-white transition cursor-pointer"
                            >
                                Generate
                            </button>

                            <Link href="/pricing" className="hover:text-white transition">Pricing</Link>


                        </div>

                        {/* Auth Section */}
                        {isLoggedIn && user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm text-white"
                                >
                                    {/* Avatar circle */}
                                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="max-w-[100px] truncate">{user.name}</span>
                                    {/* Credits badge */}
                                    <span className="flex items-center gap-1 text-xs text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded-full">
                                        <Coins size={11} />
                                        {user.creditBalance}
                                    </span>
                                    <ChevronDown size={14} className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                                </button>

                                {/* Dropdown */}
                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-44 bg-[#1a1225] border border-white/10 rounded-2xl shadow-xl overflow-hidden z-50">
                                        <Link
                                            href="/generate"
                                            onClick={() => setDropdownOpen(false)}
                                            className="flex items-center gap-2 px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition"
                                        >
                                            Generate Image
                                        </Link>
                                        <button
                                            onClick={() => { logout(); setDropdownOpen(false); }}
                                            className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition"
                                        >
                                            <LogOut size={14} />
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button
                                onClick={() => setShowAuthModal(true)}
                                className="text-sm px-5 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium hover:opacity-90 hover:scale-105 transition-all cursor-pointer"
                            >
                                Login
                            </button>
                        )}

                    </div>
                </div>
            </nav>

            {/* Auth Modal */}
            {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
        </>
    );
};

export default Navbar;