"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, X, Loader2, AlertCircle, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { useAppContext } from "@/context/AppContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const AuthModal = ({
    onClose,
}: {
    onClose: () => void;
}) => {
    const { setToken, setUser } = useAppContext();
    const [isLogin, setIsLogin] = useState(false);

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError("");
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!form.email || !form.password) {
            setError("Please fill in all required fields.");
            return;
        }
        if (!isLogin && (!form.firstName || !form.lastName)) {
            setError("Please enter your full name.");
            return;
        }
        if (!isLogin && form.password !== form.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);
        try {
            const endpoint = isLogin
                ? `${API_URL}/api/user/login`
                : `${API_URL}/api/user/register`;

            const payload = isLogin
                ? { email: form.email, password: form.password }
                : {
                    name: `${form.firstName} ${form.lastName}`.trim(),
                    email: form.email,
                    password: form.password,
                };

            const { data } = await axios.post(endpoint, payload);

            if (!data.success) {
                setError(data.message || "Something went wrong. Please try again.");
                return;
            }

            setToken(data.token);
            setUser(data.user);
            onClose();
        } catch (err: any) {
            setError("Network error — is the server running?");
        } finally {
            setLoading(false);
        }
    };

    const switchMode = (toLogin: boolean) => {
        setError("");
        setForm({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" });
        setIsLogin(toLogin);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-sans">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            ></motion.div>

            {/* Modal */}
            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 16 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ type: "spring", damping: 22, stiffness: 180 }}
                className="relative z-10 w-full max-w-[940px] max-h-[92vh] bg-[#101013] border border-white/10 rounded-[28px] shadow-[0_30px_80px_rgba(0,0,0,0.6)] flex flex-col md:flex-row overflow-hidden"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/15 transition-all z-50 text-white/60 hover:text-white"
                >
                    <X size={18} />
                </button>

                {/* ── LEFT: IMAGE PANEL ── */}
                <div className="hidden md:flex md:w-1/2 relative overflow-hidden">
                    <img
                        src="/images/limg.png"
                        alt="AI generated abstract portrait"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/60"></div>
                    {/* Bottom copy */}
                    <div className="relative z-10 mt-auto p-8">
                        <div className="flex gap-1.5 mb-6">
                            <span className="h-1 w-6 rounded-full bg-white"></span>
                            <span className="h-1 w-1.5 rounded-full bg-white/40"></span>
                            <span className="h-1 w-1.5 rounded-full bg-white/40"></span>
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-3 leading-tight">
                            Create Your Vision
                        </h3>
                        <p className="text-white/70 text-sm leading-relaxed max-w-[280px]">
                            AI-assisted workspace to craft and elevate your ideas.
                        </p>
                    </div>
                </div>

                {/* ── RIGHT: FORM ── */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center overflow-y-auto">
                    {/* Toggle */}
                    <div className="flex justify-center mb-8">
                        <div className="inline-flex bg-white/5 border border-white/10 rounded-full p-1">
                            <button
                                onClick={() => switchMode(false)}
                                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${!isLogin
                                    ? "bg-violet-600 text-black shadow"
                                    : "text-white/60 hover:text-white"
                                    }`}
                            >
                                Sign Up
                            </button>
                            <button
                                onClick={() => switchMode(true)}
                                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${isLogin
                                    ? "bg-violet-600 text-black shadow"
                                    : "text-white/60 hover:text-white"
                                    }`}
                            >
                                Log In
                            </button>
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={isLogin ? "login" : "signup"}
                            initial={{ x: 12, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -12, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h2 className="text-3xl font-bold text-white mb-6 text-center">
                                {isLogin ? "Welcome Back" : "Create An Account"}
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Name — signup only */}
                                {!isLogin && (
                                    <div className="flex gap-3">
                                        <input
                                            type="text"
                                            name="firstName"
                                            placeholder="First name"
                                            value={form.firstName}
                                            onChange={handleChange}
                                            required
                                            className="w-1/2 px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-amber-400/60 focus:bg-white/[0.07] transition-all text-white placeholder:text-white/30 text-sm"
                                        />
                                        <input
                                            type="text"
                                            name="lastName"
                                            placeholder="Last name"
                                            value={form.lastName}
                                            onChange={handleChange}
                                            required
                                            className="w-1/2 px-4 py-3.5 rounded-xl bg-white/5 border border-amber-400/50 outline-none focus:border-amber-400/60 focus:bg-white/[0.07] transition-all text-white placeholder:text-white/30 text-sm"
                                        />
                                    </div>
                                )}

                                {/* Email */}
                                <div className="relative group">
                                    <Mail
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-amber-400 transition-colors"
                                        size={17}
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Enter Your Email"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-amber-400/60 focus:bg-white/[0.07] transition-all text-white placeholder:text-white/30 text-sm"
                                    />
                                </div>

                                {/* Password */}
                                <div className="relative group">
                                    <Lock
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-amber-400 transition-colors"
                                        size={17}
                                    />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Password"
                                        value={form.password}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-11 pr-11 py-3.5 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-amber-400/60 focus:bg-white/[0.07] transition-all text-white placeholder:text-white/30 text-sm"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((v) => !v)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                                    </button>
                                </div>

                                {/* Confirm Password — signup only */}
                                {!isLogin && (
                                    <div className="relative group">
                                        <Lock
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-amber-400 transition-colors"
                                            size={17}
                                        />
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            name="confirmPassword"
                                            placeholder="Confirm Password"
                                            value={form.confirmPassword}
                                            onChange={handleChange}
                                            required
                                            className="w-full pl-11 pr-11 py-3.5 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-amber-400/60 focus:bg-white/[0.07] transition-all text-white placeholder:text-white/30 text-sm"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword((v) => !v)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                                        >
                                            {showConfirmPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                                        </button>
                                    </div>
                                )}

                                {/* Error Message */}
                                <AnimatePresence>
                                    {error && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -6 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3"
                                        >
                                            <AlertCircle size={16} />
                                            {error}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-3.5 mt-2 rounded-xl bg-violet-400 text-black font-bold hover:bg-violet-300 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 size={18} className="animate-spin" />
                                            {isLogin ? "Signing in..." : "Creating account..."}
                                        </>
                                    ) : isLogin ? (
                                        "Log In"
                                    ) : (
                                        "Create an Account"
                                    )}
                                </button>
                            </form>

                            {/* Divider */}
                            <div className="flex items-center gap-3 my-6">
                                <div className="flex-1 h-px bg-white/10"></div>
                                <span className="text-white/40 text-xs">or</span>
                                <div className="flex-1 h-px bg-white/10"></div>
                            </div>

                            {/* Social buttons */}
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    className="flex-1 flex items-center justify-center py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                                >
                                    <svg width="18" height="18" viewBox="0 0 18 18">
                                        <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.88 2.7-6.62z" />
                                        <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.81.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.95v2.33A9 9 0 0 0 9 18z" />
                                        <path fill="#FBBC05" d="M3.95 10.7a5.4 5.4 0 0 1 0-3.4V4.97H.95a9 9 0 0 0 0 8.06z" />
                                        <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58A8.96 8.96 0 0 0 9 0a9 9 0 0 0-8.05 4.97L3.95 7.3C4.66 5.17 6.65 3.58 9 3.58z" />
                                    </svg>
                                </button>
                                <button
                                    type="button"
                                    className="flex-1 flex items-center justify-center py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
                                        <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99h-2.54V12h2.54V9.8c0-2.5 1.5-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
                                    </svg>
                                </button>
                                <button
                                    type="button"
                                    className="flex-1 flex items-center justify-center py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
                                        <path d="M16.36 1.43c.07 1-.34 1.97-.93 2.68-.6.71-1.58 1.27-2.55 1.2-.1-.98.37-2 .94-2.66.62-.72 1.7-1.27 2.54-1.22zM20.5 17.2c-.46 1.07-.68 1.55-1.27 2.5-.82 1.32-1.97 2.97-3.4 2.98-1.27.02-1.6-.83-3.32-.82-1.72.01-2.08.84-3.35.82-1.43-.01-2.51-1.5-3.33-2.81-2.28-3.62-2.52-7.87-1.11-10.13.99-1.6 2.56-2.54 4.04-2.54 1.5 0 2.45.84 3.7.84 1.21 0 1.96-.84 3.7-.84 1.32 0 2.72.72 3.7 1.96-3.26 1.78-2.73 6.43.64 8.04z" />
                                    </svg>
                                </button>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
};

export default AuthModal;