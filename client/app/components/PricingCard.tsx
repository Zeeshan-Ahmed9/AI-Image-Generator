import { Check } from "lucide-react";

interface Props {
    title: string;
    price: number;
    features: string[];
    highlight?: boolean;
}

export default function PricingCard({
    title,
    price,
    features,
    highlight,
}: Props) {
    return (
        <div
            className={`p-6 rounded-2xl border ${highlight ? "border-purple-500 bg-purple-900/20" : "border-white/10"
                }`}
        >
            <h2 className="text-2xl text-white">{title}</h2>

            <p className="text-4xl text-white mt-4">${price}</p>

            <ul className="mt-6 space-y-2">
                {features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                        <Check size={16} />
                        {f}
                    </li>
                ))}
            </ul>

            <button className="mt-6 w-full bg-purple-600 py-2 rounded">
                Get Started
            </button>
        </div>
    );
}