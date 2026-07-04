"use client";

import { useState } from "react";

const faqs = [
    {
        q: "Can I cancel anytime?",
        a: "Yes, anytime.",
    },
    {
        q: "Do I own images?",
        a: "Yes for Pro users.",
    },
];

export default function FAQ() {
    const [open, setOpen] = useState<number | null>(null);

    return (
        <section className="max-w-4xl mx-auto px-6 pb-20">
            <h2 className="text-3xl text-white mb-6">FAQ</h2>

            {faqs.map((faq, i) => (
                <div key={faq.q} className="border-b border-white/10 py-4">
                    <button
                        onClick={() => setOpen(open === i ? null : i)}
                        className="text-left w-full text-white"
                    >
                        {faq.q}
                    </button>

                    {open === i && (
                        <p className="text-gray-400 mt-2">{faq.a}</p>
                    )}
                </div>
            ))}
        </section>
    );
}