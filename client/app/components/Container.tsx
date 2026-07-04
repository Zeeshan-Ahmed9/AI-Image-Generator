"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Container = () => {
    const leftCard = useRef(null);
    const rightCard = useRef(null);

    const [prompt, setPrompt] = useState("");

    useEffect(() => {
        gsap.fromTo(
            leftCard.current,
            { x: -120, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: leftCard.current,
                    start: "top 80%",
                },
            }
        );

        gsap.fromTo(
            rightCard.current,
            { x: 120, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: rightCard.current,
                    start: "top 80%",
                },
            }
        );
    }, []);

    const promptSuggestions = [
        "Surreal dreamscape at golden hour",
        "Minimalist product on white",
        "Abstract neon geometry",
    ];

    const handleSuggestion = (text: string) => {
        setPrompt(text);
    };

    const handleGenerate = () => {
        if (!prompt.trim()) {
            alert("Please enter a prompt.");
            return;
        }

        console.log("Generating image for:", prompt);

        // TODO:
        // Call your image generation API here
        // Example:
        // generateImage(prompt);
    };

    return (
        <section className="w-full flex justify-center items-center py-24 bg-black mt-[-100px]">
            <div className="max-w-[1200px] w-full grid grid-cols-1 md:grid-cols-2 gap-6 px-6">

                {/* Left Card */}
                <div
                    ref={leftCard}
                    className="opacity-0 relative bg-[#0f0f18] rounded-2xl border border-neutral-800 p-10 flex flex-col gap-6 overflow-hidden"
                >
                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#7F77DD]" />

                    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium tracking-widest uppercase px-3 py-1 rounded-full bg-[#EEEDFE]/10 text-[#AFA9EC] border border-[#7F77DD]/20 w-fit">
                        <svg
                            className="w-3 h-3"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M12 3l2.5 6.5H21l-5.5 4 2 6.5L12 16l-5.5 4 2-6.5L3 9.5h6.5z" />
                        </svg>
                        AI Creative Suite
                    </span>

                    <div>
                        <h2 className="text-2xl text-white font-semibold leading-snug mb-3">
                            Automated image <br /> synthesis and design
                        </h2>

                        <p className="text-neutral-400 text-sm leading-relaxed">
                            AI-powered image generation helps designers streamline
                            their workflows and unlock new levels of creative
                            efficiency—from concept to output in seconds.
                        </p>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                        {[
                            {
                                label: "Style",
                                value: "Abstract",
                                color: "bg-[#CECBF6]/15 border-[#7F77DD]/20 text-[#AFA9EC]",
                            },
                            {
                                label: "Mode",
                                value: "Generative",
                                color: "bg-[#9FE1CB]/10 border-[#1D9E75]/20 text-[#5DCAA5]",
                            },
                            {
                                label: "Output",
                                value: "4K PNG",
                                color: "bg-[#F5C4B3]/10 border-[#D85A30]/20 text-[#F0997B]",
                            },
                        ].map(({ label, value, color }) => (
                            <div
                                key={label}
                                className={`flex flex-col gap-0.5 rounded-xl border p-3 ${color}`}
                            >
                                <span className="text-[10px] opacity-60 uppercase tracking-wider">
                                    {label}
                                </span>
                                <span className="text-xs font-medium">
                                    {value}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-3 flex-wrap">
                        <button className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-neutral-700 text-sm text-white hover:bg-white hover:text-black transition-all duration-200">
                            YouTube
                        </button>

                        <button className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-neutral-700 text-sm text-white hover:bg-white hover:text-black transition-all duration-200">
                            Podcast
                        </button>
                    </div>
                </div>

                {/* Right Card */}
                <div
                    ref={rightCard}
                    className="opacity-0 relative bg-[#0f0f18] rounded-2xl border border-neutral-800 p-10 flex flex-col gap-6 overflow-hidden"
                >
                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#1D9E75]" />

                    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium tracking-widest uppercase px-3 py-1 rounded-full bg-[#E1F5EE]/10 text-[#5DCAA5] border border-[#1D9E75]/20 w-fit">
                        Image Generator
                    </span>

                    <div>
                        <h2 className="text-2xl text-white font-semibold leading-snug mb-3">
                            Create stunning visuals <br />
                            in seconds
                        </h2>

                        <p className="text-neutral-400 text-sm leading-relaxed">
                            Spark inspiration by letting AI analyze vast amounts
                            of data to generate innovative, production-ready ideas
                            tailored to your creative vision.
                        </p>
                    </div>

                    {/* Prompt Input */}
                    <div className="flex items-center bg-black/60 rounded-full border border-neutral-800 px-4 py-2 gap-3 focus-within:border-[#1D9E75]/50 transition-colors duration-200">
                        <input
                            id="prompt-input"
                            type="text"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Describe the image you want to create..."
                            className="flex-1 bg-transparent outline-none text-sm text-white placeholder-neutral-600"
                        />

                        <button
                            onClick={handleGenerate}
                            className="bg-[#1D9E75] hover:bg-[#0F6E56] text-white text-sm px-5 py-2 rounded-full font-medium transition-all duration-200 hover:scale-105 active:scale-95 shrink-0"
                        >
                            Generate
                        </button>
                    </div>

                    {/* Suggestions */}
                    <div className="flex flex-wrap gap-2">
                        {promptSuggestions.map((suggestion) => (
                            <button
                                key={suggestion}
                                onClick={() => handleSuggestion(suggestion)}
                                className="text-[11px] px-3 py-1.5 rounded-full border border-neutral-800 text-neutral-500 hover:text-neutral-300 hover:border-neutral-600 transition-all duration-150"
                            >
                                ✦ {suggestion}
                            </button>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Container;