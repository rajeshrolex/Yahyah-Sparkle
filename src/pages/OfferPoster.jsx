import React from 'react';
import { motion } from 'framer-motion';
import { FaPhoneAlt, FaSnowflake, FaStar, FaGift } from 'react-icons/fa';
import bumperOffer from '../assets/bumper-offer.jpg';
import comboPack from '../assets/combo-pack.png';
import productBottles from '../assets/product-bottles.jpg';

const OfferPoster = () => {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-0 md:p-4 overflow-hidden relative">
            {/* Download/Instruction Hint - Hidden in screenshot if cropped */}
            <div className="absolute top-0 left-0 right-0 bg-yellow-500 text-black text-center py-1 text-xs font-bold z-50 print:hidden">
                SCREENSHOT THIS PAGE TO SAVE YOUR POSTER
            </div>

            {/* Main Poster Container - Aspect Ratio for Mobile/Story */}
            <div className="relative w-full max-w-md aspect-[9/16] md:aspect-auto md:h-[850px] bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] overflow-hidden shadow-2xl border-4 border-yellow-500/50">

                {/* Background Decorations */}
                <div className="absolute inset-0">
                    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[30%] bg-red-600/30 blur-[100px] rounded-full"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[30%] bg-blue-600/30 blur-[100px] rounded-full"></div>
                    <div className="absolute top-[20%] right-[-20%] w-[40%] h-[40%] bg-yellow-400/10 blur-[80px] rounded-full"></div>
                </div>

                {/* Snow Pattern */}
                <div className="absolute inset-0 opacity-30">
                    {[...Array(15)].map((_, i) => (
                        <FaSnowflake key={i} className="absolute text-white animate-pulse"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                fontSize: `${Math.random() * 15 + 5}px`,
                                opacity: Math.random()
                            }}
                        />
                    ))}
                </div>

                {/* Content Wrapper */}
                <div className="relative h-full flex flex-col items-center pt-12 pb-8 px-6 text-center">

                    {/* Header Section */}
                    <div className="mb-6 relative">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="relative z-10"
                        >
                            <h2 className="text-yellow-400 font-serif text-3xl font-bold tracking-wider drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                                Merry Christmas
                            </h2>
                            <p className="text-white font-serif text-xl mt-1 uppercase tracking-widest">
                                & Happy New Year
                            </p>
                            <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 drop-shadow-xl mt-2">
                                2026
                            </h1>
                        </motion.div>
                        {/* Decorative line */}
                        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mt-4"></div>
                    </div>

                    {/* Main Offer Text */}
                    <div className="mb-4 relative w-full">
                        <div className="absolute inset-0 bg-red-600 blur-xl opacity-20"></div>
                        <h2 className="relative text-4xl font-black text-white uppercase italic transform -skew-x-6 drop-shadow-[0_4px_0_rgba(255,0,0,0.8)]">
                            Bumper Dhamaka <br /><span className="text-yellow-400 text-5xl">OFFER</span>
                        </h2>
                    </div>

                    {/* Central Image Area */}
                    <div className="relative flex-grow flex items-center justify-center w-full my-2">
                        {/* Glowing Ring */}
                        <div className="absolute w-64 h-64 border-2 border-white/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
                        <div className="absolute w-60 h-60 border border-yellow-500/20 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>

                        {/* Selected Image */}
                        <img
                            src={bumperOffer} // Using bumper-offer.jpg
                            alt="Offer Products"
                            className="relative z-10 w-full max-w-[320px] object-contain drop-shadow-[0_0_25px_rgba(255,255,255,0.3)] transform hover:scale-105 transition-transform duration-500"
                            onError={(e) => { e.target.src = productBottles; }}
                        />

                        {/* Price Graphic */}
                        <div className="absolute bottom-0 right-0 md:right-4 transform rotate-[-10deg] z-20">
                            <div className="relative bg-yellow-500 text-black font-black p-4 rounded-xl border-4 border-white shadow-2xl flex flex-col items-center justify-center w-32 h-32">
                                <span className="text-xs uppercase tracking-bold">Combo Pack</span>
                                <span className="text-4xl leading-none">₹1700</span>
                                <span className="text-xs font-bold bg-black text-white px-2 py-0.5 rounded mt-1">ONLY</span>
                            </div>
                        </div>
                    </div>

                    {/* Details Box */}
                    <div className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 mt-4">
                        <h3 className="text-2xl font-bold text-green-400 mb-2 uppercase">8 Litres Combo Pack</h3>

                        <div className="grid grid-cols-2 gap-4 text-left">
                            <div className="flex items-center gap-2 bg-black/30 p-2 rounded-lg border border-red-500/30">
                                <div className="p-2 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)]">
                                    <FaStar className="text-white text-xs" />
                                </div>
                                <div>
                                    <div className="text-xl font-bold text-white">4</div>
                                    <div className="text-[10px] text-gray-300 uppercase">Red Liquid</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 bg-black/30 p-2 rounded-lg border border-blue-500/30">
                                <div className="p-2 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                                    <FaStar className="text-white text-xs" />
                                </div>
                                <div>
                                    <div className="text-xl font-bold text-white">4</div>
                                    <div className="text-[10px] text-gray-300 uppercase">Blue Liquid</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Info */}
                    <div className="mt-4 w-full">
                        <div className="flex justify-between items-center text-xs text-gray-400 mb-2">
                            <span>Start: 23/12/2025</span>
                            <span>End: 16/01/2026</span>
                        </div>
                        <div className="bg-gradient-to-r from-red-600 to-red-800 text-white py-3 rounded-xl shadow-lg border-t border-white/20">
                            <a href="tel:7671842007" className="flex items-center justify-center gap-2 text-2xl font-black">
                                <FaPhoneAlt className="text-lg" /> 7671842007
                            </a>
                        </div>
                    </div>

                    {/* Brand Watermark */}
                    <div className="absolute bottom-2 text-[10px] text-white/20 uppercase tracking-[0.5em]">
                        Yahyah Sparkle Premium
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OfferPoster;
