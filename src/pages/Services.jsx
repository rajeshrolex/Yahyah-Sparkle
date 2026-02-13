import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSprayCan, FaCheckCircle, FaArrowRight, FaPhone, FaStar } from 'react-icons/fa';
import { MdKitchen, MdCleaningServices } from 'react-icons/md';
import { FaBath, FaHome } from 'react-icons/fa';

// Import product images
import productBottles from '../assets/product-bottles.jpg';
import blueCleaner from '../assets/blue-cleaner.jpg';

// Import product data and components
import { products } from '../data/products';
import ProductDetailsModal from '../components/ProductDetailsModal';

const Services = () => {
    const services = [
        {
            icon: <FaBath className="text-5xl" />,
            title: 'Bathroom Specialist Cleaning',
            description: 'Advanced multipurpose cleaning liquid specially formulated for deep bathroom cleaning. Effectively removes stains from old buckets, taps, white marble, bathroom doors, and mirrors. Also suitable for water tank cleaning.',
            features: [
                'Old Bucket & Tap cleaning',
                'White Marble restoration',
                'Bathroom Door & Mirror clean',
                'Water Tank cleaning',
                'Multipurpose application',
            ],
            color: 'from-blue-400 to-indigo-500',
            bgColor: 'from-blue-50 to-indigo-50',
            image: blueCleaner,
            productNote: 'YahYah Sparkle - The Multipurpose Specialist',
        },
        {
            icon: <FaHome className="text-5xl" />,
            title: 'Floor Cleaning',
            description: 'Professional floor cleaning for all types of surfaces including marble, granite, tiles, and wooden floors. Our Advanced Blue Salt Cleaner tackles stubborn stains effectively.',
            features: [
                'All surface types',
                'Deep scrubbing & polishing',
                'Scratch removal',
                'Protective coating',
                'Long-lasting shine',
            ],
            color: 'from-blue-400 to-indigo-500',
            bgColor: 'from-blue-50 to-indigo-50',
            image: blueCleaner,
            productNote: 'YahYah Sparkle Blue - Advanced Salt Cleaner for Stubborn Stains',
        },
        {
            icon: <MdCleaningServices className="text-5xl" />,
            title: 'Deep Cleaning',
            description: 'Comprehensive deep cleaning service for your entire home using our full range of YahYah Sparkle cleaning solutions. We clean every corner, surface, and hard-to-reach area for a thorough transformation.',
            features: [
                'Whole house coverage',
                'Dust & allergen removal',
                'Furniture cleaning',
                'Window cleaning',
                'AC vent cleaning',
            ],
            color: 'from-purple-400 to-violet-500',
            bgColor: 'from-purple-50 to-violet-50',
            image: productBottles,
            productNote: 'Our full range of YahYah Sparkle cleaning solutions',
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

    const process = [
        { step: '01', title: 'Book Online or Call', description: 'Schedule your cleaning service via call or our contact form' },
        { step: '02', title: 'Get a Quote', description: 'We provide transparent pricing based on your requirements' },
        { step: '03', title: 'We Clean', description: 'Our professional team arrives and transforms your space' },
        { step: '04', title: 'You Enjoy', description: 'Sit back and enjoy your sparkling clean home' },
    ];

    return (
        <div className="overflow-hidden">
            {/* Hero Section */}
            <section className="relative py-32 overflow-hidden">
                <div className="absolute inset-0 gradient-bg" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl" />

                <div className="relative container-custom text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                            <FaSprayCan className="text-accent-400" />
                            <span className="text-white/90 text-sm font-medium">Our Services</span>
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                            Professional <span className="text-accent-400">Cleaning</span> Services
                        </h1>
                        <p className="text-lg text-white/80 max-w-2xl mx-auto">
                            Comprehensive cleaning solutions for every corner of your home
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="space-y-16">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                            >
                                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white mb-6`}>
                                        {service.icon}
                                    </div>
                                    <h3 className="text-3xl font-bold text-gray-900 mb-4">{service.title}</h3>
                                    <p className="text-gray-600 text-lg leading-relaxed mb-6">{service.description}</p>

                                    <div className="space-y-3 mb-8">
                                        {service.features.map((feature, fIndex) => (
                                            <div key={fIndex} className="flex items-center gap-3">
                                                <FaCheckCircle className="text-accent-500 flex-shrink-0" />
                                                <span className="text-gray-700">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <Link to="/contact" className="btn-primary inline-flex">
                                        Book This Service <FaArrowRight className="ml-2" />
                                    </Link>
                                </div>

                                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                                    <div className={`bg-gradient-to-br ${service.bgColor} rounded-3xl p-4 overflow-hidden`}>
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            className="w-full h-80 object-cover rounded-2xl shadow-lg"
                                        />
                                        <div className={`mt-4 p-4 bg-gradient-to-r ${service.color} rounded-xl`}>
                                            <p className="text-white text-center font-semibold text-sm">
                                                {service.productNote}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="section-padding bg-gray-50">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-2 rounded-full bg-primary-100 text-primary-700 font-semibold text-sm mb-4">
                            How It Works
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                            Simple <span className="gradient-text">Process</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        {process.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center relative"
                            >
                                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center text-white text-2xl font-bold mb-6">
                                    {item.step}
                                </div>
                                {index !== process.length - 1 && (
                                    <div className="hidden md:block absolute top-10 left-[60%] w-full h-0.5 bg-gradient-to-r from-primary-300 to-transparent" />
                                )}
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-gray-600">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Product Showcase */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="inline-block px-4 py-2 rounded-full bg-accent-100 text-accent-700 font-semibold text-sm mb-4">
                                Our Product
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                Yah Yah <span className="gradient-text">Sparkle</span> Cleaner
                            </h2>
                            <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                Our premium cleaning solution - Advanced Blue Salt Cleaner for stubborn stains.
                                This powerful yet eco-friendly formula is specially designed to tackle the toughest
                                cleaning challenges while being safe for your home and the environment.
                            </p>
                            <div className="flex items-center gap-4 mb-6">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <FaStar key={star} className="text-yellow-400 text-xl" />
                                ))}
                                <span className="text-gray-600 font-medium">5.0 Customer Rating</span>
                            </div>
                            <Link to="/contact" className="btn-primary inline-flex">
                                Order Now <FaArrowRight className="ml-2" />
                            </Link>
                        </div>

                        <div className="bg-gradient-to-br from-accent-100 to-cyan-100 rounded-3xl p-6 overflow-hidden">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {products.map((product, pIndex) => (
                                    <div key={pIndex} className="relative group cursor-pointer" onClick={() => openModal(product)}>
                                        <div className={`aspect-video bg-gradient-to-br ${product.bgColor} rounded-2xl overflow-hidden shadow-md mb-3`}>
                                            <img
                                                src={product.banner || product.image}
                                                alt={product.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                        <div className={`p-3 bg-white rounded-xl shadow-sm border border-gray-100 group-hover:border-accent-300 transition-colors`}>
                                            <p className="font-bold text-gray-900 text-sm truncate">{product.name}</p>
                                            <p className="text-accent-600 text-xs font-semibold">{product.price}</p>
                                        </div>
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10 rounded-2xl">
                                            <span className="bg-white text-gray-900 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                                                View Details
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <p className="text-accent-700 font-bold text-lg text-center mt-6 uppercase tracking-wider">YahYah Sparkle Premium Solutions</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding relative overflow-hidden">
                <div className="absolute inset-0 gradient-bg" />
                <div className="relative container-custom text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Ready to Book a Service?
                    </h2>
                    <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                        Get in touch with us today for a free quote and experience the YahyahSparkle difference.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-700 font-bold rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                            Book Now
                        </Link>
                        <a href="tel:+917671842007" className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-primary-700 transition-all duration-300">
                            <FaPhone className="mr-2" /> 7671842007
                        </a>
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

export default Services;
