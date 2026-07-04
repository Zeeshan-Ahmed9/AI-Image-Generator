"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Community: React.FC = () => {
    const numbersRef = useRef<HTMLSpanElement[]>([]);
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const subTextRef = useRef<HTMLParagraphElement>(null);
    const dividerRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement[]>([]);
    const particlesRef = useRef<HTMLDivElement>(null);
    const orbRef = useRef<HTMLDivElement>(null);
    const orb2Ref = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            // Floating orbs ambient animation
            gsap.to(orbRef.current, {
                y: -30,
                x: 20,
                duration: 6,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1,
            });
            gsap.to(orb2Ref.current, {
                y: 25,
                x: -15,
                duration: 8,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1,
                delay: 1.5,
            });

            // Pulsing rings
            ringRef.current.forEach((ring, i) => {
                if (!ring) return;
                gsap.to(ring, {
                    scale: 1.25,
                    opacity: 0,
                    duration: 3 + i * 0.8,
                    ease: "power2.out",
                    repeat: -1,
                    delay: i * 1,
                });
            });

            // Scroll-triggered heading reveal
            const headingChars = headingRef.current?.querySelectorAll(".char");
            if (headingChars) {
                gsap.from(headingChars, {
                    y: 80,
                    opacity: 0,
                    rotateX: -40,
                    stagger: 0.03,
                    duration: 0.9,
                    ease: "back.out(1.6)",
                    scrollTrigger: {
                        trigger: headingRef.current,
                        start: "top 80%",
                    },
                });
            }

            // Sub-text and divider
            gsap.from(subTextRef.current, {
                y: 20,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
                delay: 0.3,
                scrollTrigger: {
                    trigger: subTextRef.current,
                    start: "top 85%",
                },
            });
            gsap.from(dividerRef.current, {
                scaleX: 0,
                opacity: 0,
                duration: 1.2,
                ease: "power3.inOut",
                scrollTrigger: {
                    trigger: dividerRef.current,
                    start: "top 85%",
                },
            });

            // Stats cards — stagger slide up
            statsRef.current.forEach((el, i) => {
                if (!el) return;
                gsap.from(el, {
                    y: 60,
                    opacity: 0,
                    duration: 0.9,
                    ease: "power3.out",
                    delay: i * 0.18,
                    scrollTrigger: {
                        trigger: el,
                        start: "top 88%",
                    },
                });
            });

            // Animated counters
            const targets = [10.2, 300, 1000];
            numbersRef.current.forEach((el, i) => {
                if (!el) return;
                const obj = { val: 0 };
                gsap.to(obj, {
                    val: targets[i],
                    duration: 2.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 88%",
                    },
                    onUpdate: () => {
                        el.innerText =
                            i === 0
                                ? obj.val.toFixed(1) + "M+"
                                : Math.floor(obj.val) + "+";
                    },
                });
            });
        });

        return () => ctx.revert();
    }, []);

    // Split heading text into chars for animation
    const headingLines = ["Join a community", "of millions."];

    const splitLine = (line: string) =>
        line.split("").map((char, i) => (
            <span
                key={i}
                className="char"
                style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : undefined }}
            >
                {char}
            </span>
        ));

    const stats = [
        {
            label: "ACTIVE ACCOUNTS",
            suffix: "M+",
            idx: 0,
            accent: "from-violet-400 via-purple-300 to-fuchsia-400",
            bg: "from-violet-950/60 to-purple-900/30",
            border: "border-violet-500/20",
            glow: "shadow-violet-500/10",
        },
        {
            label: "PROJECTS",
            suffix: "+",
            idx: 1,
            accent: "from-emerald-400 via-teal-300 to-cyan-400",
            bg: "from-emerald-950/60 to-teal-900/30",
            border: "border-emerald-500/20",
            glow: "shadow-emerald-500/10",
        },
        {
            label: "TOPICS",
            suffix: "+",
            idx: 2,
            accent: "from-rose-400 via-pink-300 to-orange-400",
            bg: "from-rose-950/60 to-pink-900/30",
            border: "border-rose-500/20",
            glow: "shadow-rose-500/10",
        },
    ];

    return (
        <section
            ref={sectionRef}
            className="relative w-full flex items-center bg-black overflow-hidden py-28"
        >
            {/* ── Ambient background ─────────────────────────── */}

            {/* Noise grain overlay */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    backgroundSize: "200px",
                }}
            />

            {/* Subtle grid */}
            <div
                className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />

            {/* Pulsing rings */}
            {[0, 1, 2].map((i) => (
                <div
                    key={i}
                    ref={(el) => { if (el) ringRef.current[i] = el; }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-500/20"
                    style={{
                        width: `${280 + i * 120}px`,
                        height: `${280 + i * 120}px`,
                        opacity: 0.4 - i * 0.1,
                    }}
                />
            ))}

            {/* Main glow orb */}
            <div
                ref={orbRef}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{
                    width: "520px",
                    height: "520px",
                    background:
                        "radial-gradient(ellipse at center, rgba(139,92,246,0.18) 0%, rgba(109,40,217,0.08) 50%, transparent 70%)",
                    borderRadius: "50%",
                    filter: "blur(40px)",
                }}
            />
            {/* Secondary orb */}
            <div
                ref={orb2Ref}
                className="absolute top-1/4 right-1/4 pointer-events-none"
                style={{
                    width: "320px",
                    height: "320px",
                    background:
                        "radial-gradient(ellipse at center, rgba(16,185,129,0.10) 0%, transparent 70%)",
                    borderRadius: "50%",
                    filter: "blur(60px)",
                }}
            />

            {/* ── Content ─────────────────────────────────────── */}
            <div className="relative z-10 w-full max-w-[1200px] mx-auto px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left — Heading */}
                    <div>
                        {/* Eyebrow */}
                        <p
                            ref={subTextRef}
                            className="text-xl tracking-[0.3em] text-purple-400/80 uppercase mb-3 font-medium"
                        >
                            Our growing network
                        </p>

                        {/* Heading with char split */}
                        <div
                            ref={headingRef}
                            className="overflow-hidden"
                            style={{ perspective: "800px" }}
                        >
                            <h2 className="text-white font-light leading-[1.1]" style={{ fontSize: "clamp(3.6rem, 5vw, 4rem)" }}>
                                {headingLines.map((line, li) => (
                                    <span key={li} className="block">
                                        {splitLine(line)}
                                    </span>
                                ))}
                            </h2>
                        </div>

                        {/* Animated divider */}
                        <div
                            ref={dividerRef}
                            className="mt-8 h-px w-48 origin-left"
                            style={{
                                background:
                                    "linear-gradient(to right, rgba(139,92,246,0.8), rgba(16,185,129,0.4), transparent)",
                            }}
                        />

                        <p
                            className="mt-6 text-gray-500 text-sm leading-relaxed max-w-xs"
                            style={{ animationDelay: "0.6s" }}
                        >
                            Creators, builders, and thinkers — all working together on something remarkable.
                        </p>
                    </div>

                    {/* Right — Stats */}
                    <div className="flex flex-col gap-5">
                        {stats.map((item) => (
                            <div
                                key={item.idx}
                                ref={(el) => { if (el) statsRef.current[item.idx] = el; }}
                                className={`relative group rounded-2xl border ${item.border} bg-gradient-to-br ${item.bg} px-7 py-6 flex items-center justify-between overflow-hidden shadow-xl ${item.glow}`}
                                style={{ backdropFilter: "blur(12px)" }}
                            >
                                {/* Card inner glow */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl"
                                    style={{
                                        background:
                                            "radial-gradient(ellipse at 30% 50%, rgba(139,92,246,0.07) 0%, transparent 70%)",
                                    }}
                                />

                                {/* Label */}
                                <p className="text-gray-500 text-[11px] tracking-[0.2em] uppercase font-medium">
                                    {item.label}
                                </p>

                                {/* Number */}
                                <span
                                    ref={(el) => { if (el) numbersRef.current[item.idx] = el; }}
                                    className={`text-5xl font-semibold bg-gradient-to-r ${item.accent} bg-clip-text text-transparent tabular-nums`}
                                    style={{ fontVariantNumeric: "tabular-nums" }}
                                >
                                    0
                                </span>

                                {/* Decorative corner accent */}
                                <div
                                    className="absolute bottom-0 right-0 w-24 h-24 opacity-5 rounded-tl-full"
                                    style={{
                                        background: `linear-gradient(135deg, white, transparent)`,
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Community;