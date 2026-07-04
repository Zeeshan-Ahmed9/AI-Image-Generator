"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LOGOS = [
    {
        name: "Google",
        svg: (
            <svg viewBox="0 0 74 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-auto">
                <path d="M9.24 8.19v2.46h5.88c-.18 1.38-.64 2.39-1.34 3.1-.86.86-2.2 1.8-4.54 1.8-3.62 0-6.45-2.92-6.45-6.54s2.83-6.54 6.45-6.54c1.95 0 3.38.77 4.43 1.76L15.4 2.5C13.94 1.08 11.98 0 9.24 0 4.28 0 .11 4.04.11 9s4.17 9 9.13 9c2.68 0 4.7-.88 6.28-2.52 1.62-1.62 2.13-3.91 2.13-5.75 0-.57-.04-1.1-.13-1.54H9.24z" fill="currentColor" />
                <path d="M25 6.19c-3.21 0-5.83 2.44-5.83 5.81 0 3.34 2.62 5.81 5.83 5.81s5.83-2.46 5.83-5.81c0-3.37-2.62-5.81-5.83-5.81zm0 9.33c-1.76 0-3.28-1.45-3.28-3.52s1.52-3.52 3.28-3.52 3.28 1.46 3.28 3.52-1.52 3.52-3.28 3.52z" fill="currentColor" />
                <path d="M53.58 7.49h-.09c-.57-.68-1.67-1.3-3.06-1.3C47.53 6.19 45 8.72 45 12c0 3.26 2.53 5.81 5.43 5.81 1.39 0 2.49-.62 3.06-1.32h.09v.81c0 2.22-1.19 3.41-3.1 3.41-1.56 0-2.53-1.12-2.93-2.07l-2.22.92c.64 1.54 2.33 3.43 5.15 3.43 2.99 0 5.52-1.76 5.52-6.05V6.49h-2.42v1zm-2.93 7.03c-1.76 0-3.1-1.5-3.1-3.52s1.34-3.52 3.1-3.52c1.74 0 3.1 1.5 3.1 3.54s-1.36 3.5-3.1 3.5z" fill="currentColor" />
                <path d="M38 6.19c-3.21 0-5.83 2.44-5.83 5.81 0 3.34 2.62 5.81 5.83 5.81s5.83-2.46 5.83-5.81c0-3.37-2.62-5.81-5.83-5.81zm0 9.33c-1.76 0-3.28-1.45-3.28-3.52s1.52-3.52 3.28-3.52 3.28 1.46 3.28 3.52-1.52 3.52-3.28 3.52z" fill="currentColor" />
                <path d="M58 .24h2.51v17.57H58z" fill="currentColor" />
                <path d="M65.54 15.52c-1.3 0-2.22-.59-2.82-1.76l7.77-3.21-.26-.66c-.48-1.3-1.96-3.7-4.97-3.7-2.99 0-5.48 2.35-5.48 5.81 0 3.26 2.46 5.81 5.76 5.81 2.66 0 4.2-1.63 4.84-2.57l-1.98-1.32c-.66.96-1.56 1.6-2.86 1.6zm-.18-7.15c1.03 0 1.91.53 2.2 1.28l-5.25 2.17c-.07-2.36 1.7-3.45 3.05-3.45z" fill="currentColor" />
            </svg>
        ),
    },
    {
        name: "Discord",
        svg: (
            <svg viewBox="0 0 71 55" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-auto">
                <path d="M60.1 4.9A58.5 58.5 0 0 0 45.6.5a.2.2 0 0 0-.2.1 40.8 40.8 0 0 0-1.8 3.7 54 54 0 0 0-16.2 0A37.7 37.7 0 0 0 25.5.6a.2.2 0 0 0-.2-.1A58.3 58.3 0 0 0 10.8 4.9a.2.2 0 0 0-.1.1C1.6 18.1-.9 31 .3 43.7a.2.2 0 0 0 .1.2 58.8 58.8 0 0 0 17.7 9 .2.2 0 0 0 .2-.1 42 42 0 0 0 3.6-5.9.2.2 0 0 0-.1-.3 38.7 38.7 0 0 1-5.5-2.6.2.2 0 0 1 0-.4l1.1-.8a.2.2 0 0 1 .2 0c11.5 5.3 24 5.3 35.4 0a.2.2 0 0 1 .2 0l1.1.8a.2.2 0 0 1 0 .4 36.1 36.1 0 0 1-5.5 2.6.2.2 0 0 0-.1.3 47.1 47.1 0 0 0 3.6 5.9.2.2 0 0 0 .2.1 58.6 58.6 0 0 0 17.8-9 .2.2 0 0 0 .1-.2C71.5 29 68 16.3 60.2 5a.2.2 0 0 0-.1-.1zM23.7 36.3c-3.5 0-6.4-3.2-6.4-7.2s2.8-7.2 6.4-7.2c3.6 0 6.5 3.3 6.4 7.2 0 3.9-2.8 7.2-6.4 7.2zm23.7 0c-3.5 0-6.4-3.2-6.4-7.2s2.8-7.2 6.4-7.2c3.6 0 6.5 3.3 6.4 7.2 0 3.9-2.8 7.2-6.4 7.2z" fill="currentColor" />
            </svg>
        ),
    },
    {
        name: "Vercel",
        svg: (
            <svg viewBox="0 0 4438 1000" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-auto">
                <path d="M2221.7 0L4437 1000H6.4L2221.7 0z" fill="currentColor" />
                <path d="M539 155h185.5l205 525.5L1134 155h185.5L1059 735h-178.5L539 155zM1393 735V155h579.5v155h-395v84.5h377.5v142h-377.5V580h395v155H1393zM2100.5 735V310h-222V155h629.5v155h-222V735h-185.5zM2584 735V155h185.5v580H2584zM2836.5 155h185.5v425.5l316-425.5h185.5L3293 735h-185.5l-271-371V735h-185.5V155h185.5V155zM3576 735V155h579.5v155h-395v84.5h377.5v142h-377.5V580h395v155H3576z" fill="currentColor" />
            </svg>
        ),
    },
    {
        name: "Stripe",
        svg: (
            <svg viewBox="0 0 60 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-auto">
                <path d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.32a10.8 10.8 0 0 1-4.56.948c-4.01 0-6.83-2.5-6.83-7.48 0-4.19 2.39-7.52 6.3-7.52 3.92 0 5.96 3.28 5.96 7.5 0 .4-.04 1.26-.06 1.63zm-5.92-5.15c-1.03 0-2.17.73-2.17 2.58h4.25c0-1.85-1.07-2.58-2.08-2.58zM40.95 20.24c1.12 0 1.97-.5 2.4-1.36l.12 1.36h4.26V5.76h-4.44v14.48h-2.34zm0-10.31c.4 0 .73.15 1 .4v5.06c-.27.25-.6.4-1 .4-1.4 0-2.03-1.4-2.03-2.94 0-1.55.63-2.92 2.03-2.92zm-13.06-.57c1.03 0 1.53.35 1.97 1.03v-5.06H34v15.1h-3.35c-.4-.42-.85-1.03-1.03-1.61-.97 1.26-2.35 1.82-3.69 1.82-3.16 0-5.38-2.62-5.38-7.36 0-4.86 2.03-7.64 5.38-7.64h.04-.01zm.69 11.01c1.38 0 1.97-1.2 1.97-2.94 0-1.74-.6-2.97-1.97-2.97s-1.97 1.23-1.97 2.97c0 1.74.6 2.94 1.97 2.94zm-11.15 0c1.39 0 1.98-1.2 1.98-2.94 0-1.74-.6-2.97-1.98-2.97s-1.97 1.23-1.97 2.97c0 1.74.59 2.94 1.97 2.94zm-.42-11.14c1.31 0 2.72.56 3.69 1.82.18-.58.63-1.19 1.03-1.61h3.35V20.24h-4.13v-14.48h-2.34v.06l-.05-.06c-1.43 0-2.64.8-3.28 1.97-.36-.68-1.1-1.97-2.97-1.97l.7.01zm-5.5-.01c.73 0 1.47.14 2.08.42v3.56a3.7 3.7 0 0 0-2.08-.62c-.78 0-1.38.35-1.38 1.03 0 1.82 4.86.95 4.86 5.6 0 2.95-2.25 4.12-4.86 4.12-1.47 0-2.97-.4-3.97-.98v-3.6c.97.56 2.1.94 3.05.94.89 0 1.42-.31 1.42-1.03 0-2-4.86-.97-4.86-5.6 0-2.77 1.97-3.84 4.74-3.84zm-11.98.2h4.44V20.24H-.47V9.42zm2.22-1.97c-1.42 0-2.56-1.14-2.56-2.56 0-1.43 1.14-2.57 2.56-2.57 1.43 0 2.57 1.14 2.57 2.57 0 1.42-1.14 2.56-2.57 2.56z" fill="currentColor" />
            </svg>
        ),
    },
    {
        name: "Brave",
        svg: (
            <svg viewBox="0 0 192 209" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-auto">
                <path d="M189.3 68.7l-6-14.2-6.5-15.2-9.1 5.5a91.7 91.7 0 0 1-15.4 7.4 37.7 37.7 0 0 0 3.7-12.8 37.3 37.3 0 0 0-2.2-15.8A37.5 37.5 0 0 0 145 14a37.6 37.6 0 0 0-12-8.4A37.7 37.7 0 0 0 119.1 3a37.7 37.7 0 0 0-13.8 1.2A23.1 23.1 0 0 0 96 0a23.1 23.1 0 0 0-9.3 4.2A37.7 37.7 0 0 0 72.9 3a37.7 37.7 0 0 0-13.8 2.6 37.6 37.6 0 0 0-12 8.4 37.5 37.5 0 0 0-8.8 9.6 37.3 37.3 0 0 0-2.2 15.8 37.7 37.7 0 0 0 3.7 12.8 91.7 91.7 0 0 1-15.4-7.4L15.2 39.3 9 54.5l-6.3 14-2.7 6 5.3 4.3C7.4 80.6 9 83 10 85.4l19.4 38.5-.5 2.1C24.6 141 27 156.1 36.6 169a102.3 102.3 0 0 0 18.9 19.8l9.7 7.5 9.7 7.5 3.1 2.4 3 2.3 2.6 1.8 2.6 1.8 2.1 1.4 2.1 1.3 3.6 2.3 3.6 2.4.1.1.1-.1 3.6-2.4 3.6-2.3 2.1-1.3 2.1-1.4 2.6-1.8 2.6-1.8 3-2.3 3.1-2.4 9.7-7.5 9.7-7.5A102.3 102.3 0 0 0 155.4 169c9.6-12.9 12-28 7.7-43l-.5-2.1L182 85.4c1-2.4 2.6-4.8 4.7-6.6l5.3-4.3-2.7-5.8z" fill="currentColor" />
            </svg>
        ),
    },
    {
        name: "Linear",
        svg: (
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-auto">
                <path d="M1.22 51.3L48.7 98.78a50.2 50.2 0 0 1-47.48-47.48zM0 42.26L57.74 100A50.03 50.03 0 0 0 100 57.74L42.26 0A50.03 50.03 0 0 0 0 42.26zM64.37 2.08L97.92 35.63A50.1 50.1 0 0 0 64.37 2.08z" fill="currentColor" />
            </svg>
        ),
    },
    {
        name: "Notion",
        svg: (
            <svg viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-auto">
                <path d="M145 119l487-36c60-4 75 2 113 30l155 112c25 19 33 24 33 45V928c0 38-13 60-60 63L205 1000c-34 2-50-4-67-28L45 824C27 799 20 779 20 754V182c0-31 13-56 50-63h75zm503 22L269 174v-1l-1 1v1l1-1h-1c-1 0-4 1-6 4l-3 9v542c0 23 8 33 26 34l576-35c22-1 24-13 24-29V177c0-23-11-36-33-36h-4z" fill="currentColor" />
                <path d="M640 207l-394 29c-23 2-30 14-30 32v438c0 19 7 29 29 28l398-23c21-1 27-10 27-28V238c0-22-9-32-30-31z" fill="white" />
                <path d="M541 303l-237 18c-7 1-9 5-9 10v9c0 5 2 8 9 7l237-17c7-1 9-4 9-10v-9c0-5-2-9-9-8z" fill="currentColor" />
                <path d="M541 389l-237 14c-7 0-9 4-9 9v9c0 5 2 8 9 8l237-14c7 0 9-4 9-9v-9c0-5-2-8-9-8z" fill="currentColor" />
            </svg>
        ),
    },
    {
        name: "Figma",
        svg: (
            <svg viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-auto">
                <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="currentColor" />
                <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 0 1-19 0z" fill="currentColor" />
                <path d="M19 0v19h9.5a9.5 9.5 0 0 0 0-19H19z" fill="currentColor" />
                <path d="M0 9.5A9.5 9.5 0 0 1 9.5 0H19v19H9.5A9.5 9.5 0 0 1 0 9.5z" fill="currentColor" />
                <path d="M0 28.5A9.5 9.5 0 0 1 9.5 19H19v19H9.5A9.5 9.5 0 0 1 0 28.5z" fill="currentColor" />
            </svg>
        ),
    },
    {
        name: "GitHub",
        svg: (
            <svg viewBox="0 0 98 96" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-auto">
                <path fillRule="evenodd" clipRule="evenodd" d="M49 0C21.9 0 0 22 0 49.2c0 21.8 14.1 40.2 33.6 46.7 2.5.4 3.4-1 3.4-2.4v-8.4c-13.8 3-16.7-6.7-16.7-6.7-2.3-5.7-5.6-7.2-5.6-7.2-4.5-3.1.3-3 .3-3 5 .3 7.7 5.2 7.7 5.2 4.5 7.6 11.7 5.4 14.6 4.2.4-3.2 1.7-5.4 3.2-6.7-11-1.3-22.6-5.6-22.6-24.7 0-5.5 1.9-10 5.1-13.5-.5-1.3-2.2-6.4.5-13.3 0 0 4.1-1.3 13.5 5.1a47 47 0 0 1 24.6 0C78.3 18 82.4 19.3 82.4 19.3c2.7 6.9 1 12 .5 13.3 3.1 3.5 5 8 5 13.5 0 19.2-11.6 23.4-22.7 24.6 1.8 1.5 3.4 4.6 3.4 9.3v13.8c0 1.3.9 2.9 3.5 2.4C83.9 89.4 98 71 98 49.2 98 22 76.1 0 49 0z" fill="currentColor" />
            </svg>
        ),
    },
];

const STATS = [
    {
        value: "300+",
        label: "Projects Created",
        icon: (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
            </svg>
        ),
        gradient: "from-violet-500 to-purple-600",
        glow: "shadow-violet-500/20",
    },
    {
        value: "10M+",
        label: "Images Generated",
        icon: (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
        ),
        gradient: "from-cyan-500 to-blue-600",
        glow: "shadow-cyan-500/20",
    },
    {
        value: "99.9%",
        label: "Uptime",
        icon: (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
        ),
        gradient: "from-emerald-500 to-green-600",
        glow: "shadow-emerald-500/20",
    },
];

// Duplicate for seamless infinite loop
const MARQUEE_LOGOS = [...LOGOS, ...LOGOS];

export default function TrustedBy() {
    const sectionRef = useRef<HTMLElement>(null);
    const badgeRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);
    const marqueeRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const floatingRefs = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Section fade up
            gsap.from(sectionRef.current, {
                opacity: 0,
                y: 60,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%",
                    toggleActions: "play none none none",
                },
            });

            // Badge
            gsap.from(badgeRef.current, {
                opacity: 0,
                y: 20,
                duration: 0.7,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: badgeRef.current,
                    start: "top 88%",
                },
            });

            // Heading slide in
            gsap.from(headingRef.current, {
                opacity: 0,
                y: 30,
                duration: 0.9,
                delay: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: headingRef.current,
                    start: "top 88%",
                },
            });

            // Description
            gsap.from(descRef.current, {
                opacity: 0,
                y: 20,
                duration: 0.8,
                delay: 0.25,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: descRef.current,
                    start: "top 90%",
                },
            });

            // Marquee fade in
            gsap.from(marqueeRef.current, {
                opacity: 0,
                y: 24,
                duration: 0.9,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: marqueeRef.current,
                    start: "top 90%",
                },
            });

            // Stats stagger
            const statCards = statsRef.current?.querySelectorAll(".stat-card");
            if (statCards) {
                gsap.from(statCards, {
                    opacity: 0,
                    y: 40,
                    duration: 0.7,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: statsRef.current,
                        start: "top 88%",
                    },
                });
            }

            // Floating elements subtle drift
            floatingRefs.current.forEach((el, i) => {
                if (!el) return;
                gsap.to(el, {
                    y: i % 2 === 0 ? -18 : 18,
                    x: i % 3 === 0 ? 10 : -10,
                    duration: 4 + i * 0.7,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: i * 0.5,
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full overflow-hidden py-7 mb-16 md:py-32"
        >
            {/* ── Background decorative layer ── */}
            <div aria-hidden className="pointer-events-none absolute inset-0">

                {/* Subtle grid */}
                <div
                    className="absolute inset-0 opacity-[0.025]"
                    style={{
                        backgroundImage:
                            "(transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
                        backgroundSize: "72px 72px",
                    }}
                />

                {/* Floating circles */}
                {[
                    { top: "8%", left: "5%", size: 90, opacity: 0.06 },
                    { top: "60%", right: "4%", size: 120, opacity: 0.05 },
                    { bottom: "5%", left: "15%", size: 60, opacity: 0.07 },
                    { top: "30%", right: "20%", size: 45, opacity: 0.05 },
                ].map((c, i) => (
                    <div
                        key={i}
                        ref={(el) => { if (el) floatingRefs.current[i] = el; }}
                        className="absolute rounded-full border border-white/[0.04]"
                        style={{
                            top: c.top,
                            left: (c as any).left,
                            right: (c as any).right,
                            bottom: (c as any).bottom,
                            width: c.size,
                            height: c.size,
                            background: `radial-gradient(circle, rgba(139,92,246,${c.opacity}) 0%, transparent 70%)`,
                        }}
                    />
                ))}

                {/* Glowing particles */}
                {[
                    { top: "20%", left: "12%", color: "bg-violet-400" },
                    { top: "70%", left: "80%", color: "bg-cyan-400" },
                    { top: "45%", left: "55%", color: "bg-purple-300" },
                    { top: "15%", left: "70%", color: "bg-blue-400" },
                    { top: "80%", left: "30%", color: "bg-violet-300" },
                ].map((p, i) => (
                    <div
                        key={i}
                        ref={(el) => { if (el) floatingRefs.current[4 + i] = el; }}
                        className={`absolute w-1 h-1 rounded-full ${p.color} opacity-50 blur-[1px]`}
                        style={{ top: p.top, left: p.left }}
                    />
                ))}

                {/* Gradient accent lines */}
            </div>

            {/* ── Content ── */}
            <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

                {/* Badge */}
                <div ref={badgeRef} className="flex justify-center mb-6">
                    <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-violet-300 backdrop-blur-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-violet-400 shadow-[0_0_6px_2px_rgba(167,139,250,0.6)]" />
                        Trusted Worldwide
                    </span>
                </div>

                {/* Heading */}
                <h2
                    ref={headingRef}
                    className="mx-auto mb-5 max-w-3xl text-center text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
                    style={{ textShadow: "0 0 60px rgba(139,92,246,0.2)" }}
                >
                    Trusted by creators and companies{" "}
                    <span className="bg-gradient-to-r from-violet-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
                        building with AI
                    </span>
                </h2>

                {/* Description */}
                <p
                    ref={descRef}
                    className="mx-auto mb-8 max-w-2xl text-center text-base leading-relaxed text-white/50 sm:text-lg"
                >
                    More than{" "}
                    <span className="font-medium text-white/75">300+ startups, agencies and enterprises</span>{" "}
                    trust our AI platform to generate millions of images every month.
                </p>

                {/* ── Marquee container ── */}
                <div ref={marqueeRef} className="relative mb-10">
                    {/* Glass pill */}
                    <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] shadow-[0_8px_60px_rgba(0,0,0,0.5)] backdrop-blur-md">
                        {/* Top gradient shimmer */}
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

                        {/* Left & right fade masks */}
                        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[#080810] to-transparent" />
                        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[#080810] to-transparent" />

                        {/* Inner glow */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-violet-600/5 via-transparent to-cyan-600/5 pointer-events-none" />

                        {/* Scrolling track */}
                        <div
                            className="flex items-center py-7 marquee-track gap-0"
                            style={{ width: "max-content" }}
                        >
                            {MARQUEE_LOGOS.map((logo, i) => (
                                <div
                                    key={`${logo.name}-${i}`}
                                    className="
                    logo-item
                    mx-10 flex items-center justify-center
                    text-white/30 grayscale
                    transition-all duration-300 ease-out
                    hover:text-white hover:grayscale-0 hover:scale-110
                    cursor-default select-none
                  "
                                    title={logo.name}
                                >
                                    {logo.svg}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Stats ── */}
                <div ref={statsRef} className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-4">
                    {STATS.map((stat) => (
                        <div
                            key={stat.label}
                            className="
                stat-card group relative overflow-hidden rounded-2xl
                border border-white/[0.07]
                bg-white/[0.03] backdrop-blur-md
                p-7 text-center
                shadow-[0_4px_40px_rgba(0,0,0,0.4)]
                transition-all duration-500 ease-out
                hover:-translate-y-2 hover:shadow-[0_16px_60px_rgba(0,0,0,0.5)]
                hover:border-white/[0.12]
                cursor-default
              "
                        >
                            {/* Gradient border glow on hover */}
                            <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${stat.gradient} blur-xl -z-10`} style={{ opacity: 0 }}
                                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.08")}
                                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0")}
                            />
                            <div className={`absolute inset-0 rounded-2xl border border-transparent group-hover:border-white/10 transition-all duration-500`} />

                            {/* Top shimmer line */}
                            <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                            {/* Icon */}
                            <div className={`mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${stat.gradient} text-white shadow-lg ${stat.glow} transition-transform duration-300 group-hover:scale-110`}>
                                {stat.icon}
                            </div>

                            {/* Value */}
                            <div className={`mb-1 bg-gradient-to-br ${stat.gradient} bg-clip-text text-4xl font-bold text-transparent sm:text-5xl`}>
                                {stat.value}
                            </div>

                            {/* Label */}
                            <p className="text-sm font-medium tracking-wide text-white/45 group-hover:text-white/60 transition-colors duration-300">
                                {stat.label}
                            </p>

                            {/* Subtle inner glow */}
                            <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-24 w-24 rounded-full bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-[0.07] blur-2xl transition-opacity duration-500`} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Marquee CSS */}
            <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee 28s linear infinite;
          will-change: transform;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>
        </section>
    );
}