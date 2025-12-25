import React from 'react';
import { Link } from 'react-router-dom';
import { FaSprayCan, FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaFacebook, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/about' },
        { name: 'Services', path: '/services' },
        { name: 'Contact', path: '/contact' },
    ];

    const services = [
        'Kitchen Tiles Cleaning',
        'Floor Cleaning',
        'Bathroom Cleaning',
        'Deep Cleaning',
    ];

    return (
        <footer className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900" />
            <div className="absolute top-0 left-0 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

            <div className="relative container-custom py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Company Info */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm">
                                <FaSprayCan className="text-2xl text-accent-400" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">YahyahSparkle</h3>
                                <p className="text-sm text-white/60">Cleaning Services</p>
                            </div>
                        </div>
                        <p className="text-white/70 mb-6 leading-relaxed">
                            Bring Sparkle To Your Home! Professional cleaning services that transform your space.
                        </p>
                        <div className="flex gap-3">
                            <a href="https://wa.me/917671842007" target="_blank" rel="noopener noreferrer"
                                className="p-3 rounded-xl bg-white/10 hover:bg-green-500 text-white transition-all duration-300 hover:scale-110">
                                <FaWhatsapp size={20} />
                            </a>
                            <a href="#" className="p-3 rounded-xl bg-white/10 hover:bg-blue-600 text-white transition-all duration-300 hover:scale-110">
                                <FaFacebook size={20} />
                            </a>
                            <a href="https://www.instagram.com/yahyahsparkle?utm_source=qr&igsh=MXN3OGIwNHE2MG5lZg==" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-white/10 hover:bg-pink-500 text-white transition-all duration-300 hover:scale-110">
                                <FaInstagram size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                            <span className="w-8 h-0.5 bg-accent-400 rounded-full" />
                            Quick Links
                        </h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link to={link.path} className="text-white/70 hover:text-accent-400 transition-colors duration-300">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                            <span className="w-8 h-0.5 bg-accent-400 rounded-full" />
                            Our Services
                        </h4>
                        <ul className="space-y-3">
                            {services.map((service) => (
                                <li key={service}>
                                    <Link to="/services" className="text-white/70 hover:text-accent-400 transition-colors duration-300">
                                        {service}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                            <span className="w-8 h-0.5 bg-accent-400 rounded-full" />
                            Contact Us
                        </h4>
                        <ul className="space-y-4">
                            <li>
                                <a href="tel:+917671842007" className="flex items-center gap-3 text-white/70 hover:text-accent-400 transition-colors">
                                    <div className="p-2 rounded-lg bg-white/10"><FaPhone size={14} /></div>
                                    +91 7671842007
                                </a>
                            </li>
                            <li>
                                <a href="mailto:yahyahsparkle@gmail.com" className="flex items-center gap-3 text-white/70 hover:text-accent-400 transition-colors">
                                    <div className="p-2 rounded-lg bg-white/10"><FaEnvelope size={14} /></div>
                                    yahyahsparkle@gmail.com
                                </a>
                            </li>
                            <li>
                                <div className="flex items-start gap-3 text-white/70">
                                    <div className="p-2 rounded-lg bg-white/10 mt-0.5"><FaMapMarkerAlt size={14} /></div>
                                    <span>All over Hyderabad, Telangana</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/10 text-center">
                    <p className="text-white/60 text-sm">© {currentYear} YahyahSparkle. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
