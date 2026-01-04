import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCheckCircle, FaExclamationTriangle, FaListUl, FaInfoCircle, FaShoppingCart } from 'react-icons/fa';

const ProductDetailsModal = ({ isOpen, onClose, product }) => {
    if (!product) return null;

    const whatsappNumber = '917671842007';
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi! I want to order ${product.name} (${product.price} / ${product.unit}). Please confirm availability.`)}`;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-gray-800 transition-colors"
                        >
                            <FaTimes size={20} />
                        </button>

                        <div className="overflow-y-auto flex-1">
                            <div className="grid md:grid-cols-2">
                                {/* Left Side - Image/Banner */}
                                <div className={`relative h-64 md:h-full bg-gradient-to-br ${product.bgColor} flex flex-col items-center justify-center p-4`}>
                                    {product.banner ? (
                                        <div className="w-full h-full flex flex-col gap-4 overflow-hidden">
                                            <img
                                                src={product.banner}
                                                alt={`${product.name} Banner`}
                                                className="w-full h-auto object-contain rounded-xl shadow-lg"
                                            />
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-32 h-32 object-contain mx-auto"
                                            />
                                        </div>
                                    ) : (
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-contain rounded-2xl"
                                        />
                                    )}
                                    {product.isBestValue && (
                                        <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                                            🔥 Best Value!
                                        </div>
                                    )}
                                </div>

                                {/* Right Side - Details */}
                                <div className="p-6 md:p-10">
                                    <div className="mb-6">
                                        <h2 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h2>
                                        <p className="text-accent-600 font-semibold">{product.subtitle}</p>
                                    </div>

                                    <p className="text-gray-600 mb-8 leading-relaxed">
                                        {product.description}
                                    </p>

                                    <div className="flex items-center gap-4 mb-8">
                                        <div className={`px-6 py-3 rounded-2xl bg-gradient-to-r ${product.color} text-white`}>
                                            <span className="text-2xl font-bold">{product.price}</span>
                                            <span className="text-white/80 text-sm ml-2">/ {product.unit}</span>
                                        </div>
                                    </div>

                                    {/* Freebies Section (for Bumper Offer) */}
                                    {product.freebies && (
                                        <div className="p-4 bg-green-50 rounded-2xl border border-green-100">
                                            <h4 className="flex items-center gap-2 text-lg font-bold text-green-700 mb-3">
                                                🎁 FREE Accessories Included
                                            </h4>
                                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-green-700 text-sm font-medium">
                                                {product.freebies.map((freebie, index) => (
                                                    <li key={index} className="flex items-center gap-2">
                                                        <FaCheckCircle className="text-green-500" />
                                                        {freebie}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Stock Limit Badge */}
                                    {product.stockLimit && (
                                        <div className="p-3 bg-orange-100 rounded-2xl border-2 border-orange-300 text-center">
                                            <span className="text-lg font-bold text-orange-700">⚡ {product.stockLimit}</span>
                                        </div>
                                    )}

                                    {/* Delivery Info Section (for Special Offer) */}
                                    {product.deliveryInfo && (
                                        <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                                            <h4 className="flex items-center gap-2 text-lg font-bold text-blue-700 mb-3">
                                                🚚 FREE Delivery Details
                                            </h4>
                                            <ul className="space-y-2 text-blue-700 text-sm font-medium">
                                                {product.deliveryInfo.map((info, index) => (
                                                    <li key={index} className="flex items-center gap-2">
                                                        {info}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Offer Period Badge */}
                                    {product.offerPeriod && (
                                        <div className="p-3 bg-purple-100 rounded-2xl border border-purple-200 text-center">
                                            <span className="text-sm font-bold text-purple-700">🗓️ Offer Valid: {product.offerPeriod}</span>
                                        </div>
                                    )}

                                    {/* Use Cases */}
                                    <div>
                                        <h4 className="flex items-center gap-2 text-lg font-bold text-gray-900 mb-3">
                                            <FaCheckCircle className="text-green-500" /> Use Cases
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {product.useCases.map((useCase, index) => (
                                                <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                                    {useCase}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Instructions */}
                                    <div>
                                        <h4 className="flex items-center gap-2 text-lg font-bold text-gray-900 mb-3">
                                            <FaListUl className="text-blue-500" /> Instructions
                                        </h4>
                                        <ul className="space-y-2">
                                            {product.instructions.map((instruction, index) => (
                                                <li key={index} className="flex gap-3 text-gray-600 text-sm">
                                                    <span className="font-bold text-blue-500">{index + 1}.</span>
                                                    {instruction}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Precautions */}
                                    <div className="p-4 bg-red-50 rounded-2xl border border-red-100">
                                        <h4 className="flex items-center gap-2 text-lg font-bold text-red-700 mb-3">
                                            <FaExclamationTriangle /> Precautions
                                        </h4>
                                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-red-600 text-xs font-medium">
                                            {product.precautions.map((precaution, index) => (
                                                <li key={index} className="flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                                                    {precaution}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer - Order Button */}
                        <div className="p-6 border-t border-gray-100 bg-gray-50 flex flex-col sm:flex-row gap-4 items-center justify-between">
                            <div className="text-sm text-gray-500 flex items-center gap-2">
                                <FaInfoCircle /> Professional grade cleaning solution
                            </div>
                            <a
                                href={whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`w-full sm:w-auto px-10 py-4 bg-gradient-to-r ${product.color} text-white font-bold rounded-full hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2`}
                            >
                                <FaShoppingCart /> Order on WhatsApp
                            </a>
                        </div>
                    </motion.div>
                </div >
            )}
        </AnimatePresence >
    );
};

export default ProductDetailsModal;
