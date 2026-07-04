import React from "react";

import {
    FaYoutube,
    FaTwitter,
    FaDiscord,
    FaGithub,
    FaTelegramPlane,
} from "react-icons/fa";
import { Space_Grotesk } from "next/font/google";

const logoFont = Space_Grotesk({
    subsets: ["latin"],
    weight: ["500", "600", "700"],
});

const Footer = () => {
    return (
        <footer className="bg-[#0b0b0b] text-gray-400 py-18">
            <div className="max-w-[1200px] mx-auto flex justify-between">

                {/* LEFT SIDE */}
                <div className="space-y-6">
                    <div>
                        <h2 className={`text-white text-3xl font-light ${logoFont.className} tracking-wide`}>
                            Imagen
                        </h2>

                        <p className="text-sm text-gray-500 mt-2">
                            Managed by Artificial Intelligence
                        </p>
                    </div>

                    {/* SOCIAL ICONS */}
                    <div className="flex gap-3">
                        <div className="bg-[#1a1a1a] p-2 rounded-sm hover:bg-gray-700 cursor-pointer">
                            <FaYoutube size={14} />
                        </div>

                        <div className="bg-[#1a1a1a] p-2 rounded-sm hover:bg-gray-700 cursor-pointer">
                            <FaTwitter size={14} />
                        </div>

                        <div className="bg-[#1a1a1a] p-2 rounded-sm hover:bg-gray-700 cursor-pointer">
                            <FaDiscord size={14} />
                        </div>

                        <div className="bg-[#1a1a1a] p-2 rounded-sm hover:bg-gray-700 cursor-pointer">
                            <FaGithub size={14} />
                        </div>

                        <div className="bg-[#1a1a1a] p-2 rounded-sm hover:bg-gray-700 cursor-pointer">
                            <FaTelegramPlane size={14} />
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex gap-32">

                    {/* COLUMN 1 */}
                    <div>
                        <h4 className="text-white text-sm mb-6 tracking-widest">
                            ETHER
                        </h4>

                        <ul className="space-y-4 text-sm">
                            <li className="hover:text-white cursor-pointer">Grants</li>
                            <li className="hover:text-white cursor-pointer">Generator</li>
                            <li className="hover:text-white cursor-pointer">Careers</li>
                            <li className="hover:text-white cursor-pointer">Disclaimer</li>
                        </ul>
                    </div>

                    {/* COLUMN 2 */}
                    <div>
                        <h4 className="text-white text-sm mb-6 tracking-widest">
                            GET CONNECTED
                        </h4>

                        <ul className="space-y-4 text-sm">
                            <li className="hover:text-white cursor-pointer">Services</li>
                            <li className="hover:text-white cursor-pointer">Blog</li>
                            <li className="hover:text-white cursor-pointer">Newsletter</li>
                        </ul>
                    </div>

                </div>

            </div>
        </footer>
    );
};

export default Footer;