import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSprayCan, FaHome, FaBath, FaCheckCircle, FaArrowRight, FaPhone, FaStar, FaShoppingCart, FaWhatsapp } from 'react-icons/fa';
import { MdCleaningServices, MdKitchen } from 'react-icons/md';

// Import product images
import festiveOffer from '../assets/festive-offer-2026.png';
import festiveReal from '../assets/festive-combo-real.png';
import bumperOffer from '../assets/bumper-offer.jpg';
import redCleaner from '../assets/red-cleaner.jpg';
import blueCleaner from '../assets/blue-cleaner.jpg';
import comboPack from '../assets/combo-pack.png';
import productBottles from '../assets/product-bottles.jpg';
import brandAmbassador from '../assets/brand-ambassador.png';

// Import product data and components
import { products } from '../data/products';
import ProductDetailsModal from '../components/ProductDetailsModal';

const Home = () => {
    const services = [
        {
            icon: <FaBath className="text-4xl" />,
            title: 'Bathroom Specialty Cleaning',
            description: 'Expert removal of hard water stains from tiles, taps, mirrors, washbasins, and water tanks.',
            color: 'from-blue-400 to-indigo-500',
        },
        {
            icon: <FaHome className="text-4xl" />,
            title: 'Floor Cleaning',
            description: 'Advanced scrubbing, polishing, and stain removal for marble, granite, tiles, and wooden floors.',
            color: 'from-cyan-400 to-teal-500',
        },
        {
            icon: <MdCleaningServices className="text-4xl" />,
            title: 'Full Home Deep Cleaning',
            description: 'Comprehensive cleaning solutions for a sparkling home.',
            color: 'from-purple-400 to-violet-500',
        },
    ];

    const [selectedProduct, setSelectedProduct] = React.useState(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const openModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const whyChooseUs = [
        'Professional & Trained Staff',
        'Eco-Friendly Cleaning Products',
        'Affordable Pricing',
        '100% Satisfaction Guarantee',
        'On-Time Service',
        'All Over Hyderabad Coverage',
    ];

    const whatsappNumber = '917671842007';
    const whatsappMessage = encodeURIComponent('Hi! I am interested in YahYah Sparkle cleaning products. Please share more details.');
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    return (
        <div className="overflow-hidden">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Animated Gradient Background */}
                <div className="absolute inset-0 gradient-bg-animated" />

                {/* Decorative Elements */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse-slow" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl animate-pulse-slow" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary-500/10 rounded-full blur-3xl" />

                <div className="relative container-custom py-20">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Side - Festive Text Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-center lg:text-left"
                        >
                            {/* Festive Header */}
                            <motion.div
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="mb-6 inline-block"
                            >
                                <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-400 drop-shadow-lg font-serif">
                                    Merry Christmas
                                </h2>
                                <h3 className="text-xl md:text-3xl font-bold text-white mt-2">
                                    & Happy New Year <span className="text-yellow-400">2026</span>
                                </h3>
                            </motion.div>

                            {/* Main Offer Title */}
                            <div className="mb-8">
                                <h1 className="text-4xl md:text-6xl font-black text-white mb-2 uppercase tracking-wide drop-shadow-2xl">
                                    Bumber Dhamaka <span className="text-accent-400">Offer</span>
                                </h1>
                                <p className="text-xl text-white/90 font-medium bg-white/10 inline-block px-4 py-1 rounded-lg backdrop-blur-sm border border-white/20">
                                    Cleaning Products Combo
                                </p>
                            </div>

                            {/* Offer Details */}
                            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 mb-8 max-w-lg mx-auto lg:mx-0">
                                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-4">
                                    <div className="text-left">
                                        <p className="text-white/80 text-lg mb-1">8 Litres Combo Pack</p>
                                        <div className="flex flex-col gap-1">
                                            <span className="flex items-center gap-2 text-white font-bold"><span className="w-3 h-3 rounded-full bg-red-500"></span> 4 Red Liquid Bottles</span>
                                            <span className="flex items-center gap-2 text-white font-bold"><span className="w-3 h-3 rounded-full bg-blue-500"></span> 4 Blue Liquid Bottles</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="bg-yellow-500 text-black font-black px-6 py-4 rounded-xl rotate-3 shadow-lg transform hover:rotate-6 transition-transform">
                                            <p className="text-xs uppercase font-bold">Only</p>
                                            <p className="text-4xl">₹1700</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-t border-white/20 pt-4 text-center md:text-left">
                                    <p className="text-yellow-300 font-medium">
                                        Offer Valid: <span className="text-white">23/12/2025 - 16/01/2026</span>
                                    </p>
                                </div>
                            </div>

                            {/* Call Action */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                                <a href="tel:+917671842007" className="btn-primary px-10 py-4 text-xl shadow-lg shadow-primary-600/30 animate-pulse">
                                    <FaPhone className="mr-3" /> Call: 7671842007
                                </a>
                                <a
                                    href="https://wa.me/917671842007?text=Hi,%20I%20am%20interested%20in%20the%20Bumper%20Dhamaka%20Offer%20(8%20Litres%20Combo%20-%20Rs.1700).%20Please%20confirm%20my%20booking."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-8 py-4 rounded-full bg-green-500/20 border border-green-500 text-green-400 font-bold hover:bg-green-500 hover:text-white transition-all backdrop-blur-sm flex items-center gap-2"
                                >
                                    <FaWhatsapp className="text-2xl" /> Book Now
                                </a>
                            </div>
                        </motion.div>

                        {/* Right Side - Brand Ambassador Image */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative mt-8 lg:mt-0"
                        >
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-primary-500/20 to-blue-600/20 rounded-3xl blur-3xl animate-pulse-slow"></div>
                                <img
                                    src={brandAmbassador}
                                    alt="YahYah Sparkle Brand Ambassador"
                                    className="relative w-full h-auto max-h-[600px] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500 rounded-2xl"
                                />
                                {/* Decorative Floating Elements */}
                                <div className="absolute -top-10 -right-10 text-6xl animate-bounce delay-100 hidden md:block">🎄</div>
                                <div className="absolute bottom-10 -left-10 text-6xl animate-bounce delay-300 hidden md:block">🎁</div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Scroll Indicator */}
                    <motion.div
                        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    >
                        <div className="w-6 h-10 rounded-full border-2 border-white/50 flex items-start justify-center p-2">
                            <div className="w-1.5 h-3 bg-white/70 rounded-full" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Products Section */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-2 rounded-full bg-accent-100 text-accent-700 font-semibold text-sm mb-4">
                            Our Products
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                            Premium <span className="gradient-text">Cleaning Liquids</span>
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                            Professional-grade cleaning solutions for every need
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map((product, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.15 }}
                                className="group"
                            >
                                <div className={`bg-gradient-to-br ${product.bgColor} rounded-3xl p-6 h-full hover:shadow-2xl transition-all duration-300 relative`}>
                                    {/* Bumper Offer Badge */}
                                    {product.isBumperOffer && (
                                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-red-600 via-green-600 to-red-600 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg z-10 animate-bounce">
                                            🎄 BUMPER OFFER 🎁
                                        </div>
                                    )}

                                    {/* Best Value Badge */}
                                    {product.isBestValue && !product.isBumperOffer && (
                                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg z-10">
                                            🔥 Best Value!
                                        </div>
                                    )}

                                    {/* Product Image */}
                                    <div className="relative mb-6 overflow-hidden rounded-2xl bg-white/50 h-64 flex items-center justify-center">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>

                                    {/* Product Info */}
                                    <div className="text-center">
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
                                        <p className="text-gray-600 text-sm mb-4">{product.subtitle}</p>

                                        {/* Price */}
                                        <div className={`inline-block px-6 py-3 rounded-xl bg-gradient-to-r ${product.color} mb-4`}>
                                            <span className="text-white text-2xl font-bold">{product.price}</span>
                                            <span className="text-white/80 text-sm ml-2">/ {product.unit}</span>
                                        </div>

                                        {/* Buttons */}
                                        <div className="space-y-3">
                                            <button
                                                onClick={() => openModal(product)}
                                                className={`inline-flex items-center justify-center w-full px-6 py-3 border-2 border-current text-gray-700 font-bold rounded-full hover:bg-white/50 transition-all duration-300 transform hover:scale-105`}
                                                style={{ color: product.color.includes('red') ? '#ef4444' : product.color.includes('blue') ? '#3b82f6' : product.color.includes('purple') ? '#a855f7' : '#16a34a' }}
                                            >
                                                View Details
                                            </button>
                                            <a
                                                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi! I want to order ${product.name} (${product.price} / ${product.unit}). Please confirm availability.`)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r ${product.color} text-white font-bold rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
                                            >
                                                <FaShoppingCart className="mr-2" /> Order Now
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="section-padding bg-gray-50">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-2 rounded-full bg-primary-100 text-primary-700 font-semibold text-sm mb-4">
                            Our Services
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                            What We <span className="gradient-text">Offer</span>
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                            Professional cleaning solutions tailored to your needs
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.15 }}
                                className="group"
                            >
                                <div className="card p-8 h-full hover:shadow-2xl transition-all duration-300">
                                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                        {service.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                                    <p className="text-gray-600 leading-relaxed mb-4">{service.description}</p>
                                    <Link to="/services" className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors">
                                        Learn More <FaArrowRight className="ml-2 text-sm" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="section-padding relative overflow-hidden">
                <div className="absolute inset-0 gradient-bg opacity-95" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />

                <div className="relative container-custom">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="inline-block px-4 py-2 rounded-full bg-white/10 text-white font-semibold text-sm mb-4">
                                Why Choose Us
                            </span>
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                                The Best Cleaning Service in Hyderabad
                            </h2>
                            <p className="text-white/80 text-lg mb-8 leading-relaxed">
                                With years of experience and a commitment to excellence, we deliver cleaning services
                                that transform your space into a spotless sanctuary.
                            </p>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {whyChooseUs.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-center gap-3"
                                    >
                                        <FaCheckCircle className="text-accent-400 text-xl flex-shrink-0" />
                                        <span className="text-white font-medium">{item}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="glass-card p-8 text-center">
                                <FaSprayCan className="text-6xl text-accent-400 mx-auto mb-6" />
                                <h3 className="text-2xl font-bold text-white mb-4">Get a Free Quote</h3>
                                <p className="text-white/70 mb-6">Contact us today for a personalized cleaning solution</p>
                                <Link to="/contact" className="btn-accent w-full">
                                    Contact Us Now
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-500 rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-black/10" />
                        <div className="relative">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Ready to Experience the Sparkle?
                            </h2>
                            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                                Book your cleaning service today and transform your home into a spotless haven.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-700 font-bold rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                                    Book Now
                                </Link>
                                <a href="tel:+917671842007" className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-primary-700 transition-all duration-300">
                                    <FaPhone className="mr-2" /> Call Now
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Product Details Modal */}
            <ProductDetailsModal
                isOpen={isModalOpen}
                onClose={closeModal}
                product={selectedProduct}
            />
        </div>
    );
};

export default Home;
