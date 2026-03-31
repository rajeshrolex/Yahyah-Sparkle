import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSprayCan, FaHome, FaBath, FaCheckCircle, FaArrowRight, FaPhone, FaStar, FaShoppingCart, FaWhatsapp } from 'react-icons/fa';
import { MdCleaningServices, MdKitchen } from 'react-icons/md';

// Import product images
import redBottleImg from '../assets/red-cleaner.jpg';
import blueBottleImg from '../assets/blue-cleaner.jpg';

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
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900">
                {/* Animated Gradient Background */}
                <div className="absolute inset-0 gradient-bg-animated opacity-60" />

                {/* Decorative Elements */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse-slow" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl animate-pulse-slow" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary-500/10 rounded-full blur-3xl" />

                <div className="relative container-custom py-24 z-10">
                    <div className="text-center mb-12">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 uppercase tracking-wide drop-shadow-2xl">
                                Super Special <span className="text-yellow-400">Combo Offer</span>
                            </h1>
                            <div className="flex flex-wrap items-center justify-center gap-4 text-base md:text-lg text-white font-medium bg-white/10 inline-flex px-6 py-2 rounded-full backdrop-blur-sm border border-white/20 shadow-lg">
                                <span className="flex items-center gap-2">📅 Started date: <span className="font-bold">01/04/2026</span></span>
                                <span className="hidden md:inline">|</span>
                                <span className="flex items-center gap-2">📅 End date: <span className="font-bold">10/04/2026</span></span>
                            </div>
                        </motion.div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8 items-stretch max-w-6xl mx-auto">
                        {/* Offer 1 - 4 Litres */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="bg-black/40 backdrop-blur-xl rounded-3xl p-8 border border-white/20 relative flex flex-col hover:border-yellow-400/50 transition-all duration-300 shadow-2xl group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            
                            <div className="text-center mb-6 relative z-10">
                                <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-600 drop-shadow-lg mb-2 filter drop-shadow-[0_0_10px_rgba(250,204,21,0.3)]">
                                    Rs.1200
                                </h2>
                                <h3 className="text-2xl text-white font-bold tracking-wide">ki 4 litres</h3>
                            </div>

                            <div className="flex-grow flex flex-col justify-between relative z-10">
                                <div className="space-y-4 mb-8">
                                    <div className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors items-center">
                                        <img src={redBottleImg} alt="Red Liquid" className="w-12 h-16 object-contain drop-shadow-lg rounded-md mix-blend-screen" />
                                        <div>
                                            <p className="text-white font-bold text-lg leading-tight">2 Red yah yah Sparkle</p>
                                            <p className="text-gray-300 text-sm mt-1">(for Deep Clean)</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors items-center">
                                        <img src={blueBottleImg} alt="Blue Liquid" className="w-12 h-16 object-contain drop-shadow-lg rounded-md mix-blend-screen" />
                                        <div>
                                            <p className="text-white font-bold text-lg leading-tight">2 Blue yah yah Sparkle</p>
                                            <p className="text-gray-300 text-sm mt-1">(for Stubborn Stains)</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex justify-between items-center px-4 pt-4 border-t border-white/10 mt-6">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-6 bg-red-500 rounded-sm"></div>
                                            <span className="text-red-100 font-medium">Red liquid: <span className="text-yellow-400 font-bold">Rs.350/litre</span></span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-6 bg-blue-500 rounded-sm"></div>
                                            <span className="text-blue-100 font-medium">Blue liquid: <span className="text-yellow-400 font-bold">Rs.250/litre</span></span>
                                        </div>
                                    </div>
                                </div>

                                {/* Free Gifts Box */}
                                <div className="mt-auto relative">
                                    <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-b from-green-400 to-green-600 text-white px-8 py-1.5 rounded-full font-black text-xl shadow-[0_0_20px_rgba(34,197,94,0.4)] border-2 border-green-300 flex items-center gap-2 z-20">
                                        <span>★</span> FREE <span>★</span>
                                    </div>
                                    <div className="border border-green-500/50 bg-gradient-to-b from-green-900/40 to-green-900/10 rounded-2xl pt-8 pb-5 px-4 text-center shadow-inner relative overflow-hidden">
                                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-50"></div>
                                        <p className="text-emerald-50 font-medium flex flex-wrap justify-center gap-x-3 gap-y-2 text-sm">
                                            <span className="bg-green-500/20 px-3 py-1 rounded-full border border-green-500/30">Hand gloves</span>
                                            <span className="bg-green-500/20 px-3 py-1 rounded-full border border-green-500/30">Steel scrubber</span>
                                            <span className="bg-green-500/20 px-3 py-1 rounded-full border border-green-500/30">Handle blade</span>
                                            <span className="bg-green-500/20 px-3 py-1 rounded-full border border-green-500/30">Green scrubber</span>
                                            <span className="bg-green-500/20 px-3 py-1 rounded-full border border-green-500/30">Sand paper</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Offer 2 - 8 Litres */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="bg-black/40 backdrop-blur-xl rounded-3xl p-8 border border-white/20 relative flex flex-col hover:border-yellow-400/50 transition-all duration-300 shadow-2xl group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            
                            <div className="text-center mb-6 relative z-10">
                                <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-600 drop-shadow-lg mb-2 filter drop-shadow-[0_0_10px_rgba(250,204,21,0.3)]">
                                    Rs.1900
                                </h2>
                                <h3 className="text-2xl text-white font-bold tracking-wide">ki 8 litres</h3>
                            </div>

                            <div className="flex-grow flex flex-col justify-between relative z-10">
                                <div className="space-y-4 mb-8">
                                    <div className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors items-center">
                                        <img src={redBottleImg} alt="Red Liquid" className="w-12 h-16 object-contain drop-shadow-lg rounded-md mix-blend-screen" />
                                        <div>
                                            <p className="text-white font-bold text-lg leading-tight">4 Red yah yah Sparkle</p>
                                            <p className="text-gray-300 text-sm mt-1">(for Deep Clean)</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors items-center">
                                        <img src={blueBottleImg} alt="Blue Liquid" className="w-12 h-16 object-contain drop-shadow-lg rounded-md mix-blend-screen" />
                                        <div>
                                            <p className="text-white font-bold text-lg leading-tight">4 Blue yah yah Sparkle</p>
                                            <p className="text-gray-300 text-sm mt-1">(for Stubborn Stains)</p>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center px-4 pt-4 border-t border-white/10 mt-6">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-6 bg-red-500 rounded-sm"></div>
                                            <span className="text-red-100 font-medium">Red liquid: <span className="text-yellow-400 font-bold">Rs.350/litre</span></span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-6 bg-blue-500 rounded-sm"></div>
                                            <span className="text-blue-100 font-medium">Blue liquid: <span className="text-yellow-400 font-bold">Rs.250/litre</span></span>
                                        </div>
                                    </div>
                                </div>

                                {/* Free Gifts Box */}
                                <div className="mt-auto relative">
                                    <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-b from-green-400 to-green-600 text-white px-8 py-1.5 rounded-full font-black text-xl shadow-[0_0_20px_rgba(34,197,94,0.4)] border-2 border-green-300 flex items-center gap-2 z-20">
                                        <span>★★</span> FREE <span>★★</span>
                                    </div>
                                    <div className="border border-green-500/50 bg-gradient-to-b from-green-900/40 to-green-900/10 rounded-2xl pt-8 pb-5 px-4 text-center shadow-inner relative overflow-hidden">
                                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-50"></div>
                                        <p className="text-emerald-50 font-medium flex flex-wrap justify-center gap-x-3 gap-y-2 text-sm">
                                            <span className="bg-green-500/20 px-3 py-1 rounded-full border border-green-500/30">Hand gloves</span>
                                            <span className="bg-green-500/20 px-3 py-1 rounded-full border border-green-500/30">Steel scrubber</span>
                                            <span className="bg-green-500/20 px-3 py-1 rounded-full border border-green-500/30">Handle blade</span>
                                            <span className="bg-green-500/20 px-3 py-1 rounded-full border border-green-500/30">Green scrubber</span>
                                            <span className="bg-green-500/20 px-3 py-1 rounded-full border border-green-500/30">Sand paper</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Call Action */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center"
                    >
                        <a href="tel:+917671842007" className="btn-primary px-10 py-4 text-xl shadow-[0_0_20px_rgba(255,105,180,0.4)] animate-pulse rounded-full font-bold">
                            <FaPhone className="mr-3 inline-block" /> Call: 7671842007
                        </a>
                        <a
                            href="https://wa.me/917671842007?text=Hi,%20I%20am%20interested%20in%20the%20Super%20Special%20Combo%20Offers.%20Please%20confirm%20my%20booking."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-10 py-4 rounded-full bg-white/10 border-2 border-white text-white font-bold hover:bg-white hover:text-black transition-all shadow-lg flex items-center gap-2 text-xl"
                        >
                            <FaWhatsapp className="text-2xl text-green-400" /> WhatsApp Now
                        </a>
                    </motion.div>

                    {/* Scroll Indicator */}
                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="w-6 h-10 rounded-full border-2 border-white/50 flex items-start justify-center p-2"
                        >
                            <div className="w-1.5 h-3 bg-white/70 rounded-full" />
                        </motion.div>
                    </div>
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
