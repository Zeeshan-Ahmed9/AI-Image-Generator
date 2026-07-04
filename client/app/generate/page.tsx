"use client"
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import { Space_Grotesk } from "next/font/google";

export const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});
const Generate = () => {
    const { isLoggedIn, isAuthLoading, token, setUser, setShowAuthModal } = useAppContext();
    const router = useRouter();

    const [image, setImage] = React.useState("/images/gen1.png");
    const [isImageLoaded, setIsImageLoaded] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [input, setInput] = React.useState("");

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (!isAuthLoading && !isLoggedIn) {
            router.push("/");
            setShowAuthModal(true);
        }
    }, [isLoggedIn, isAuthLoading, router, setShowAuthModal]);

    // Auto-grow the textarea up to a max height, no resize handle, no React re-render churn.
    useEffect(() => {
        const el = textareaRef.current;
        if (!el) return;
        el.style.height = "0px";
        const next = Math.min(el.scrollHeight, 220);
        el.style.height = `${next}px`;
    }, [input]);

    const onSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        setLoading(true);
        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
            const { data } = await axios.post(
                `${API_URL}/api/image/generate-image`,
                { prompt: input },
                { headers: { token } }
            );

            if (data.success) {
                setImage(data.resultImage);
                setIsImageLoaded(true);
                setUser((prev: any) => {
                    if (!prev) return null;
                    return { ...prev, creditBalance: data.creditBalance };
                });
            } else {
                alert(data.message);
                if (data.creditBalance !== undefined) {
                    setUser((prev: any) => {
                        if (!prev) return null;
                        return { ...prev, creditBalance: data.creditBalance };
                    });
                }
            }
        } catch (error: any) {
            console.error("Error generating image:", error);
            alert(error.message || "Failed to generate image");
        } finally {
            setLoading(false);
        }
    };

    if (isAuthLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#05010a] text-white">
                <div className="text-center">
                    <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-sm text-gray-400">Checking authorization...</p>
                </div>
            </div>
        );
    }



    if (!isLoggedIn) {
        return null;
    }

    return (
        <form onSubmit={onSubmitHandler} className="max-w-4xl mx-auto px-6 pt-24 pb-24 flex flex-col items-center ">

            {/* Generated Image */}
            {isImageLoaded && (
                <div className="mb-10">
                    <div className="w-[420px] max-w-full relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_60px_-15px_rgba(139,92,246,0.5)]">
                        <Image
                            src={image}
                            alt="Generated result"
                            width={420}
                            height={420}
                            className="w-full h-auto"
                            unoptimized
                        />
                    </div>
                </div>
            )}

            {/* Loading Text */}
            <p className={loading ? "text-gray-400 text-sm mb-6 mt-1" : "hidden"}>
                Generating your image...
            </p>
            {!isImageLoaded && (
                <div className="flex flex-col items-center w-full max-w-3xl mt-12">
                    <div className="mb-10">
                        <div className="w-[420px] max-w-full relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_60px_-15px_rgba(139,92,246,0.5)]">
                            <Image
                                src="/images/gen1.png"
                                alt="Initial preview"
                                width={420}
                                height={420}
                                className="w-full h-auto"
                                unoptimized
                            />
                        </div>
                    </div>
                    <div className="w-full gemini-prompt-shell">
                        {/* Bottom ambient glow — makes the container feel like it's floating */}
                        <div className="gemini-ambient-glow" aria-hidden="true" />

                        {/* Travelling neon border: the ring shape is fixed, only the light sweeps around it */}
                        <div className={`gemini-border-frame ${loading ? "is-loading" : ""}`}>
                            <div className="gemini-border-glow" aria-hidden="true" />
                            <div className="gemini-border-track" aria-hidden="true" />
                            <div className="gemini-border-beam" aria-hidden="true" />

                            {/* Glass container */}
                            <div className="gemini-glass">
                                <div className="gemini-content">
                                    <textarea
                                        ref={textareaRef}
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Describe anything..."
                                        rows={1}
                                        disabled={loading}
                                        className="gemini-textarea"
                                    />

                                    <button
                                        type="submit"
                                        disabled={loading || !input.trim()}
                                        className="gemini-generate-btn"
                                    >
                                        <span>{loading ? "Generating..." : "Generate"}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {isImageLoaded && (
                <div className="flex gap-4 flex-wrap justify-center text-sm mt-10">

                    {/* Generate Button */}
                    <button type="button" onClick={() => { setIsImageLoaded(false); setInput(""); }} className="px-8 py-3 cursor-pointer rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-purple-700 text-white font-medium shadow-lg shadow-purple-900/40 hover:scale-105 hover:shadow-pink-500/40 transition-all duration-300">

                        Generate Another

                    </button>

                    {/* Download Button */}
                    <a download href={image} className="px-10 py-3 cursor-pointer rounded-full border border-purple-500 bg-black/40 backdrop-blur-md text-purple-300 font-medium hover:bg-gradient-to-r hover:text-white hover:scale-105 transition-all duration-300">

                        Download

                    </a>

                </div>
            )}

            <style jsx>{`
                @property --beam-angle {
                    syntax: '<angle>';
                    initial-value: 0deg;
                    inherits: false;
                }

                /* ----------------------------------------------------------------
                   Gemini-style prompt box
                   Structure (bottom → top):
                     gemini-ambient-glow  -> soft floor glow, makes it feel afloat
                     gemini-border-glow   -> soft blurred halo that follows the beam
                     gemini-border-track  -> the always-visible, static thin ring
                     gemini-border-beam   -> the rotating conic gradient, clipped to
                                             the ring shape via mask so the RING itself
                                             never moves — only the light within it does
                     gemini-glass         -> the dark glassmorphic content box on top
                -------------------------------------------------------------------*/

                .gemini-prompt-shell {
                    position: relative;
                    isolation: isolate;
                }

                .gemini-ambient-glow {
                    position: absolute;
                    left: 10%;
                    right: 10%;
                    bottom: -28px;
                    height: 56px;
                    background: radial-gradient(
                        ellipse at center,
                        rgba(139, 92, 246, 0.45) 0%,
                        rgba(139, 92, 246, 0.18) 45%,
                        transparent 75%
                    );
                    filter: blur(22px);
                    z-index: 0;
                    pointer-events: none;
                }

                .gemini-border-frame {
                    position: relative;
                    border-radius: 32px;
                    padding: 1.5px;
                    transform: translateY(0);
                    transition: transform 400ms cubic-bezier(0.22, 1, 0.36, 1);
                }

                .gemini-border-frame:hover {
                    transform: translateY(-2px);
                }

                /* Soft halo that extends outside the border and glows with the beam */
                .gemini-border-glow {
                    position: absolute;
                    inset: -14px;
                    border-radius: 40px;
                    background: conic-gradient(
                        from var(--beam-angle, 0deg),
                        transparent 0deg,
                        rgba(139, 92, 246, 0.9) 25deg,
                        rgba(236, 72, 153, 0.9) 60deg,
                        rgba(59, 130, 246, 0.85) 95deg,
                        rgba(6, 182, 212, 0.7) 120deg,
                        transparent 150deg,
                        transparent 360deg
                    );
                    filter: blur(22px);
                    opacity: 0.5;
                    animation: gemini-beam-rotate 5s linear infinite;
                    transition: opacity 400ms cubic-bezier(0.22, 1, 0.36, 1);
                    z-index: 0;
                    pointer-events: none;
                }

                .gemini-border-frame:hover .gemini-border-glow {
                    opacity: 0.7;
                }

                .gemini-prompt-shell:focus-within .gemini-border-glow {
                    opacity: 0.85;
                }

                .gemini-border-frame.is-loading .gemini-border-glow {
                    opacity: 0.95;
                    animation-duration: 2.6s;
                }

                /* Static, always-visible thin ring underneath the travelling light */
                .gemini-border-track {
                    position: absolute;
                    inset: 0;
                    border-radius: 32px;
                    padding: 1.5px;
                    background: rgba(255, 255, 255, 0.08);
                    -webkit-mask:
                        linear-gradient(#000 0 0) content-box,
                        linear-gradient(#000 0 0);
                    -webkit-mask-composite: xor;
                    mask:
                        linear-gradient(#000 0 0) content-box,
                        linear-gradient(#000 0 0);
                    mask-composite: exclude;
                    z-index: 1;
                    pointer-events: none;
                }

                /* The moving light itself: a rotating conic gradient clipped to the
                   exact same fixed ring shape as the track above. The ring never
                   moves — only the bright arc travelling within it does. */
                .gemini-border-beam {
                    position: absolute;
                    inset: 0;
                    border-radius: 32px;
                    padding: 1.5px;
                    background: conic-gradient(
                        from var(--beam-angle, 0deg),
                        transparent 0deg,
                        #8b5cf6 25deg,
                        #ec4899 60deg,
                        #3b82f6 95deg,
                        #06b6d4 120deg,
                        transparent 150deg,
                        transparent 360deg
                    );
                    -webkit-mask:
                        linear-gradient(#000 0 0) content-box,
                        linear-gradient(#000 0 0);
                    -webkit-mask-composite: xor;
                    mask:
                        linear-gradient(#000 0 0) content-box,
                        linear-gradient(#000 0 0);
                    mask-composite: exclude;
                    animation: gemini-beam-rotate 5s linear infinite;
                    opacity: 0.9;
                    transition: opacity 400ms cubic-bezier(0.22, 1, 0.36, 1);
                    z-index: 2;
                    pointer-events: none;
                }

                .gemini-border-frame:hover .gemini-border-beam {
                    opacity: 1;
                }

                .gemini-border-frame.is-loading .gemini-border-beam {
                    animation-duration: 2.6s;
                }

                @keyframes gemini-beam-rotate {
                    from {
                        --beam-angle: 0deg;
                    }
                    to {
                        --beam-angle: 360deg;
                    }
                }

                .gemini-glass {
                    position: relative;
                    z-index: 3;
                    border-radius: 30.5px;
                    background: rgba(10, 10, 18, 0.85);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    box-shadow:
                        0 20px 60px -20px rgba(0, 0, 0, 0.6),
                        inset 0 1px 0 rgba(255, 255, 255, 0.04);
                    transition: box-shadow 400ms cubic-bezier(0.22, 1, 0.36, 1);
                }

                .gemini-prompt-shell:focus-within .gemini-glass {
                    box-shadow:
                        0 24px 70px -18px rgba(139, 92, 246, 0.4),
                        inset 0 1px 0 rgba(255, 255, 255, 0.1);
                }

                .gemini-content {
                    display: flex;
                    align-items: flex-end;
                    gap: 12px;
                    padding: 18px 18px 18px 26px;
                }

                .gemini-textarea {
                    flex: 1;
                    resize: none;
                    background: transparent;
                    outline: none;
                    border: none;
                    color: #f5f3ff;
                    font-size: 17px;
                    line-height: 1.5;
                    max-height: 220px;
                    min-height: 28px;
                    padding: 6px 0;
                    overflow-y: auto;
                    transition: height 200ms cubic-bezier(0.22, 1, 0.36, 1);
                    scrollbar-width: thin;
                    scrollbar-color: rgba(139, 92, 246, 0.4) transparent;
                }

                .gemini-textarea::placeholder {
                    color: rgba(229, 224, 245, 0.4);
                }

                .gemini-textarea::-webkit-scrollbar {
                    width: 6px;
                }

                .gemini-textarea::-webkit-scrollbar-thumb {
                    background: rgba(139, 92, 246, 0.35);
                    border-radius: 999px;
                }

                .gemini-generate-btn {
                    flex-shrink: 0;
                    border: none;
                    cursor: pointer;
                    border-radius: 999px;
                    padding: 12px 26px;
                    font-weight: 500;
                    font-size: 15px;
                    color: white;
                    background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 55%, #3b82f6 100%);
                    transition: transform 350ms cubic-bezier(0.22, 1, 0.36, 1),
                                box-shadow 350ms cubic-bezier(0.22, 1, 0.36, 1),
                                opacity 250ms ease;
                    box-shadow: 0 8px 24px -8px rgba(139, 92, 246, 0.5);
                }

                .gemini-generate-btn:hover:not(:disabled) {
                    transform: translateY(-1px) scale(1.03);
                    box-shadow: 0 12px 32px -8px rgba(236, 72, 153, 0.55);
                }

                .gemini-generate-btn:disabled {
                    opacity: 0.55;
                    cursor: not-allowed;
                    transform: none;
                }

                @media (max-width: 640px) {
                    .gemini-content {
                        flex-direction: column;
                        align-items: stretch;
                        padding: 16px;
                        gap: 14px;
                    }

                    .gemini-generate-btn {
                        width: 100%;
                        text-align: center;
                    }

                    .gemini-textarea {
                        font-size: 16px;
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    .gemini-border-glow,
                    .gemini-border-beam {
                        animation: none;
                    }
                }
            `}</style>
        </form>
    );
};

export default Generate;