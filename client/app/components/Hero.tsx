"use client";

import Image from "next/image";
import { Inter } from "next/font/google";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react"; // Optional: For a modern touch
import { useAppContext } from "@/context/AppContext";

const inter = Inter({ subsets: ["latin"], weight: ["400", "600", "700", "800"] });

const Hero = () => {
    const { isLoggedIn, setShowAuthModal } = useAppContext();
    const router = useRouter();

    const titleRef = useRef(null);
    const badgeRef = useRef(null);
    const img1 = useRef(null);
    const img2 = useRef(null);
    const img3 = useRef(null);
    const img4 = useRef(null);
    const btnRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

        // Text Entrance Animation (Blur + Fade + Slide)
        tl.fromTo(
            [badgeRef.current, titleRef.current],
            { y: 60, opacity: 0, filter: "blur(10px)" },
            { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.2, stagger: 0.2 }
        )
            // Image animations (Keeping your original logic)
            .fromTo(
                img1.current,
                { x: -200, opacity: 0 },
                { x: 0, opacity: 1, duration: 1 },
                "-=0.8"
            )
            .fromTo(
                img2.current,
                { y: -150, opacity: 0 },
                { y: 0, opacity: 1, duration: 1 },
                "-=0.7"
            )
            .fromTo(
                img3.current,
                { x: 200, opacity: 0 },
                { x: 0, opacity: 1, duration: 1 },
                "-=0.7"
            )
            .fromTo(
                img4.current,
                { y: -120, opacity: 0 },
                { y: 0, opacity: 1, duration: 1 },
                "-=0.8"
            )
            .fromTo(
                btnRef.current,
                { scale: 0, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.7, ease: "back.out(1.7)" },
                "-=0.5"
            );
    }, []);

    return (
        <section className="relative max-w-6xl mx-auto px-6 pt-20 ">

            {/* --- TEXT AREA START --- */}
            <div className="flex flex-col items-center text-center mb-20">
                {/* Modern Badge */}
                <div
                    ref={badgeRef}
                    className="opacity-0 mb-6 flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-bold tracking-[0.2em] uppercase"
                >
                    <Sparkles size={14} />
                    The Future of Creativity
                </div>

                <div ref={titleRef} className="opacity-0">
                    <h1
                        className={`${inter.className} text-6xl md:text-7xl font-extrabold leading-[1.1] tracking-tight`}
                    >
                        <span className="text-white">Harnessing</span>{" "}
                        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
                            Artificial
                        </span>
                        <br />
                        <span className="text-white/90">Intelligence Tools for</span>
                        <br />
                        <span className="bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
                            Natural Image Generation
                        </span>
                    </h1>

                </div>
            </div>
            {/* --- TEXT AREA END --- */}


            <div className="relative w-full h-[500px]">
                {/* Image 1 */}
                <div ref={img1} className="opacity-0 absolute left-0 top-0">
                    <Image
                        src="/images/Subtract.png"
                        alt="ai generator"
                        width={500}
                        height={240}
                        className="ml-[-30px] object-contain"
                    />
                </div>

                {/* Image 2 */}
                <div ref={img2} className="opacity-0 absolute left-[260px] top-0">
                    <Image
                        src="/images/projects.png"
                        alt="projects"
                        width={250}
                        height={180}
                        className="ml-48 object-contain"
                    />
                </div>

                {/* Image 3 */}
                <div ref={img3} className="opacity-0 absolute right-[220px] top-20">
                    <Image
                        src="/images/reviews.png"
                        alt="reviews"
                        width={355}
                        height={120}
                        className="mt-14 mr-47 object-contain"
                    />
                </div>

                {/* Image 4 */}
                <div ref={img4} className="opacity-0 absolute right-0 top-0">
                    <Image
                        src="/images/shapes.png"
                        alt="shapes"
                        width={413}
                        height={200}
                        className="mt-[-10px] object-contain"
                    />
                </div>

                {/* Button */}
                <div
                    ref={btnRef}
                    className="opacity-0 absolute right-[42px] bottom-[220px] w-[350px] h-[80px]"
                >
                    <button
                        onClick={() => {
                            if (isLoggedIn) {
                                router.push("/generate");
                            } else {
                                setShowAuthModal(true);
                            }
                        }}
                        className="group relative w-full h-full flex items-center justify-center gap-2 
                            bg-lime-400 text-black font-bold rounded-2xl transition-all duration-300 hover:scale-105 shadow-[0_0_30px_rgba(163,230,53,0.3)] cursor-pointer"
                    >
                        <span className="text-2xl">Try for Free</span>
                        <Sparkles className="group-hover:rotate-12 transition-transform" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;