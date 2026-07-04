"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, X, Minus, Sparkles, ChevronDown, Infinity as InfinityIcon } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

interface PricingTier {
  name: string;
  desc: string;
  monthlyPrice: number;
  annualPrice: number;
  noteMonthly: string;
  noteAnnual: string;
  features: string[];
  ctaText: string;
  highlighted: boolean;
  hasInfinity?: boolean;
}

export default function PricingPage() {
  const { isLoggedIn, setShowAuthModal } = useAppContext();
  const router = useRouter();
  const [isAnnual, setIsAnnual] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const pricingTiers: PricingTier[] = [
    {
      name: "Free",
      desc: "For individuals exploring AI art.",
      monthlyPrice: 0,
      annualPrice: 0,
      noteMonthly: "Free forever",
      noteAnnual: "Free forever",
      features: [
        "50 generations/day",
        "1024 px max resolution",
        "Standard models (10 styles)",
        "Community support",
        "Personal use license",
      ],
      ctaText: "Get started free",
      highlighted: false,
    },
    {
      name: "Pro",
      desc: "For creators and freelancers doing serious work.",
      monthlyPrice: 24,
      annualPrice: 19,
      noteMonthly: "Billed monthly",
      noteAnnual: "Billed annually ($228/yr)",
      features: [
        "Unlimited generations",
        "4K ultra-HD resolution",
        "All 100+ premium styles",
        "No watermark",
        "Priority GPU queue",
        "API access (5k req/mo)",
        "Commercial license",
      ],
      ctaText: "Start 7-day free trial",
      highlighted: true,
      hasInfinity: true,
    },
    {
      name: "Enterprise",
      desc: "For teams and studios at scale.",
      monthlyPrice: 149,
      annualPrice: 119,
      noteMonthly: "Billed monthly",
      noteAnnual: "Billed annually ($1,428/yr)",
      features: [
        "Everything in Pro",
        "Custom model fine-tuning",
        "Unlimited API requests",
        "Team seats (up to 50)",
        "White-label options",
        "99.99% SLA + phone support",
        "Dedicated success manager",
      ],
      ctaText: "Contact sales",
      highlighted: false,
    },
  ];

  const faqs = [
    {
      q: "Can I cancel anytime?",
      a: "Yes, cancel with one click from account settings. No fees, no questions asked.",
    },
    {
      q: "What counts as one generation?",
      a: "Each image generated uses 1 credit. Upscaling to 4K uses 2 credits.",
    },
    {
      q: "Do I own the images I create?",
      a: "Pro and Enterprise users get full commercial rights. Free users may use images for personal, non-commercial purposes only.",
    },
    {
      q: "Is there a free trial for Pro?",
      a: "Yes — start a 7-day free trial with no credit card required. Upgrade or cancel any time.",
    },
    {
      q: "How fast is generation?",
      a: "Images typically render in 1–3 seconds. Pro users get priority GPU access for the fastest speeds.",
    },
    {
      q: "Can I use the API commercially?",
      a: "API access starts from the Pro plan. Enterprise customers get unlimited API requests and custom rate limits.",
    },
  ];

  const handleCta = (tier: string) => {
    if (tier === "Enterprise") {
      // Direct action or scroll to contact
      alert("Redirecting to sales contact form...");
      return;
    }
    if (isLoggedIn) {
      router.push("/generate");
    } else {
      setShowAuthModal(true);
    }
  };

  return (
    <div className={`${inter.className} min-h-screen text-white bg-transparent relative z-10 py-16 px-4 sm:px-6 lg:px-8`}>
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-bold tracking-[0.2em] uppercase mb-6">
          <Sparkles size={12} />
          Pricing Plans
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          One plan for every creator.
          <span className="block mt-2 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
            Scale when you're ready.
          </span>
        </h1>
        <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
          Start for free. No card required. Cancel any time.
        </p>

        {/* Toggle Switch */}
        <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full p-1">
          <button
            onClick={() => setIsAnnual(false)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              !isAnnual ? "bg-purple-600 text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              isAnnual ? "bg-purple-600 text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            Annual
            <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] px-1.5 py-0.5 rounded-full font-bold">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-24">
        {pricingTiers.map((tier) => {
          const currentPrice = isAnnual ? tier.annualPrice : tier.monthlyPrice;
          const currentNote = isAnnual ? tier.noteAnnual : tier.noteMonthly;

          return (
            <div
              key={tier.name}
              className={`flex flex-col h-full rounded-3xl p-8 transition-all duration-300 relative ${
                tier.highlighted
                  ? "bg-gradient-to-b from-[#180f2d] to-[#0c051a] border-2 border-purple-500 shadow-[0_0_40px_rgba(147,51,234,0.25)] md:-translate-y-4"
                  : "bg-white/5 border border-white/10 hover:border-white/20"
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[10px] font-bold tracking-wider uppercase px-4 py-1 rounded-full shadow-lg">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className={`text-xl font-bold ${tier.highlighted ? "text-purple-400" : "text-white"}`}>
                  {tier.name}
                </h3>
                <p className="text-gray-400 text-xs mt-2 min-h-[32px]">{tier.desc}</p>
                <div className="flex items-baseline mt-4">
                  <span className="text-4xl font-extrabold tracking-tight">${currentPrice}</span>
                  <span className="text-gray-400 text-sm ml-1">/mo</span>
                </div>
                <p className="text-gray-500 text-[11px] mt-1">{currentNote}</p>
              </div>

              <button
                onClick={() => handleCta(tier.name)}
                className={`w-full py-3 rounded-2xl text-sm font-semibold transition-all duration-300 mb-8 cursor-pointer ${
                  tier.highlighted
                    ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg shadow-purple-600/20 hover:opacity-95 hover:scale-[1.02]"
                    : "bg-white/10 text-white hover:bg-white/25 hover:scale-[1.02]"
                }`}
              >
                {tier.ctaText}
              </button>

              <ul className="space-y-4 flex-1">
                {tier.features.map((feature, idx) => {
                  const isInfinity = tier.hasInfinity && idx === 0;

                  return (
                    <li key={idx} className="flex items-start text-xs text-gray-300">
                      {isInfinity ? (
                        <InfinityIcon size={14} className="text-purple-400 mr-2.5 mt-0.5 shrink-0" />
                      ) : (
                        <Check size={14} className={`${tier.highlighted ? "text-purple-400" : "text-gray-400"} mr-2.5 mt-0.5 shrink-0`} />
                      )}
                      <span>{feature}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Comparison Table */}
      <div className="max-w-4xl mx-auto mb-24">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold">Compare plans</h2>
          <p className="text-gray-400 text-sm mt-2">Full breakdown of what's included.</p>
        </div>

        <div className="overflow-x-auto border border-white/10 rounded-2xl bg-white/5">
          <table className="w-full min-w-[600px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="px-6 py-4 text-left font-semibold text-gray-300 w-[40%]">Feature</th>
                <th className="px-6 py-4 text-center font-semibold text-gray-300">Free</th>
                <th className="px-6 py-4 text-center font-semibold text-purple-400 bg-purple-500/5">Pro</th>
                <th className="px-6 py-4 text-center font-semibold text-gray-300">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {/* Category: Generation */}
              <tr className="bg-white/5">
                <td colSpan={4} className="px-6 py-2.5 text-xs font-bold text-purple-300 uppercase tracking-wider">
                  Generation
                </td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="px-6 py-3.5 text-gray-300">Daily limit</td>
                <td className="px-6 py-3.5 text-center text-gray-400">50</td>
                <td className="px-6 py-3.5 text-center text-purple-300 font-medium bg-purple-500/5">Unlimited</td>
                <td className="px-6 py-3.5 text-center text-gray-400">Unlimited</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="px-6 py-3.5 text-gray-300">Max resolution</td>
                <td className="px-6 py-3.5 text-center text-gray-400">1024 px</td>
                <td className="px-6 py-3.5 text-center text-purple-300 font-medium bg-purple-500/5">4K</td>
                <td className="px-6 py-3.5 text-center text-gray-400">8K</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="px-6 py-3.5 text-gray-300">Watermark</td>
                <td className="px-6 py-3.5 text-center text-gray-400">Yes</td>
                <td className="px-6 py-3.5 text-center bg-purple-500/5">
                  <Minus className="text-gray-500 w-4 h-4 mx-auto" />
                </td>
                <td className="px-6 py-3.5 text-center">
                  <Minus className="text-gray-500 w-4 h-4 mx-auto" />
                </td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="px-6 py-3.5 text-gray-300">Style library</td>
                <td className="px-6 py-3.5 text-center text-gray-400">10 styles</td>
                <td className="px-6 py-3.5 text-center text-purple-300 font-medium bg-purple-500/5">100+ premium</td>
                <td className="px-6 py-3.5 text-center text-gray-400">100+ + custom</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="px-6 py-3.5 text-gray-300">Batch generate</td>
                <td className="px-6 py-3.5 text-center">
                  <X className="text-gray-600 w-4 h-4 mx-auto" />
                </td>
                <td className="px-6 py-3.5 text-center bg-purple-500/5">
                  <Check className="text-purple-400 w-4 h-4 mx-auto" />
                </td>
                <td className="px-6 py-3.5 text-center">
                  <Check className="text-purple-400 w-4 h-4 mx-auto" />
                </td>
              </tr>

              {/* Category: Export */}
              <tr className="bg-white/5">
                <td colSpan={4} className="px-6 py-2.5 text-xs font-bold text-purple-300 uppercase tracking-wider">
                  Export
                </td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="px-6 py-3.5 text-gray-300">File formats</td>
                <td className="px-6 py-3.5 text-center text-gray-400">JPG</td>
                <td className="px-6 py-3.5 text-center text-purple-300 font-medium bg-purple-500/5">JPG, PNG, WebP</td>
                <td className="px-6 py-3.5 text-center text-gray-400">All + TIFF</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="px-6 py-3.5 text-gray-300">RAW export</td>
                <td className="px-6 py-3.5 text-center">
                  <X className="text-gray-600 w-4 h-4 mx-auto" />
                </td>
                <td className="px-6 py-3.5 text-center bg-purple-500/5">
                  <Check className="text-purple-400 w-4 h-4 mx-auto" />
                </td>
                <td className="px-6 py-3.5 text-center">
                  <Check className="text-purple-400 w-4 h-4 mx-auto" />
                </td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="px-6 py-3.5 text-gray-300">Video frames</td>
                <td className="px-6 py-3.5 text-center">
                  <X className="text-gray-600 w-4 h-4 mx-auto" />
                </td>
                <td className="px-6 py-3.5 text-center bg-purple-500/5">
                  <X className="text-gray-600 w-4 h-4 mx-auto" />
                </td>
                <td className="px-6 py-3.5 text-center">
                  <Check className="text-purple-400 w-4 h-4 mx-auto" />
                </td>
              </tr>

              {/* Category: API */}
              <tr className="bg-white/5">
                <td colSpan={4} className="px-6 py-2.5 text-xs font-bold text-purple-300 uppercase tracking-wider">
                  API
                </td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="px-6 py-3.5 text-gray-300">Monthly requests</td>
                <td className="px-6 py-3.5 text-center">
                  <X className="text-gray-600 w-4 h-4 mx-auto" />
                </td>
                <td className="px-6 py-3.5 text-center text-purple-300 font-medium bg-purple-500/5">5,000</td>
                <td className="px-6 py-3.5 text-center text-gray-400">Unlimited</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="px-6 py-3.5 text-gray-300">Rate limit</td>
                <td className="px-6 py-3.5 text-center text-gray-400">—</td>
                <td className="px-6 py-3.5 text-center text-purple-300 font-medium bg-purple-500/5">60/min</td>
                <td className="px-6 py-3.5 text-center text-gray-400">1,000/min</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="px-6 py-3.5 text-gray-300">Webhooks</td>
                <td className="px-6 py-3.5 text-center">
                  <X className="text-gray-600 w-4 h-4 mx-auto" />
                </td>
                <td className="px-6 py-3.5 text-center bg-purple-500/5">
                  <Check className="text-purple-400 w-4 h-4 mx-auto" />
                </td>
                <td className="px-6 py-3.5 text-center">
                  <Check className="text-purple-400 w-4 h-4 mx-auto" />
                </td>
              </tr>

              {/* Category: Support */}
              <tr className="bg-white/5">
                <td colSpan={4} className="px-6 py-2.5 text-xs font-bold text-purple-300 uppercase tracking-wider">
                  Support
                </td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="px-6 py-3.5 text-gray-300">Channel</td>
                <td className="px-6 py-3.5 text-center text-gray-400">Community</td>
                <td className="px-6 py-3.5 text-center text-purple-300 font-medium bg-purple-500/5">Email</td>
                <td className="px-6 py-3.5 text-center text-gray-400">24/7 phone + email</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="px-6 py-3.5 text-gray-300">Response time</td>
                <td className="px-6 py-3.5 text-center text-gray-400">—</td>
                <td className="px-6 py-3.5 text-center text-purple-300 font-medium bg-purple-500/5">&lt; 24 hours</td>
                <td className="px-6 py-3.5 text-center text-gray-400">&lt; 1 hour</td>
              </tr>
              <tr>
                <td className="px-6 py-3.5 text-gray-300">Dedicated manager</td>
                <td className="px-6 py-3.5 text-center">
                  <X className="text-gray-600 w-4 h-4 mx-auto" />
                </td>
                <td className="px-6 py-3.5 text-center bg-purple-500/5">
                  <X className="text-gray-600 w-4 h-4 mx-auto" />
                </td>
                <td className="px-6 py-3.5 text-center">
                  <Check className="text-purple-400 w-4 h-4 mx-auto" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="max-w-3xl mx-auto mb-24">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold">Common questions</h2>
          <p className="text-gray-400 text-sm mt-2">Everything you need to know about billing and features.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openFAQ === index;

            return (
              <div
                key={index}
                className="border border-white/10 rounded-2xl bg-white/5 overflow-hidden transition-colors hover:bg-white/10"
              >
                <button
                  onClick={() => setOpenFAQ(isOpen ? null : index)}
                  className="w-full flex items-center justify-between text-left px-6 py-4 font-semibold text-sm transition-colors text-white focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={16}
                    className={`text-gray-400 transition-transform duration-200 shrink-0 ml-4 ${
                      isOpen ? "rotate-180 text-white" : ""
                    }`}
                  />
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[500px] border-t border-white/5 py-4 px-6" : "max-h-0 overflow-hidden"
                  }`}
                >
                  <p className="text-gray-400 text-xs leading-relaxed">{faq.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA Box */}
      <div className="max-w-4xl mx-auto">
        <div className="rounded-3xl p-8 sm:p-12 text-center bg-gradient-to-b from-[#180f2d] to-[#0c051a] border border-purple-500/30 relative overflow-hidden shadow-2xl">
          {/* Subtle glow inside the CTA */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-pink-500/20 rounded-full blur-3xl pointer-events-none"></div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Start creating today
          </h2>
          <p className="text-gray-400 text-sm mb-8 max-w-md mx-auto">
            No credit card required &middot; 50 free generations/day &middot; Cancel any time
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => handleCta("Free")}
              className="w-full sm:w-auto px-8 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold text-sm hover:opacity-95 hover:scale-105 transition-all shadow-lg shadow-purple-600/20 cursor-pointer"
            >
              Get started free
            </button>
            <button
              onClick={() => handleCta("Enterprise")}
              className="w-full sm:w-auto px-8 py-3 rounded-2xl bg-white/10 text-white hover:bg-white/20 font-semibold text-sm border border-white/10 hover:scale-105 transition-all cursor-pointer"
            >
              Talk to sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}