import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { FaSprayCan, FaWhatsapp } from 'react-icons/fa';
import logo from '../assets/logo.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Services', path: '/services' },
        { name: 'Contact', path: '/contact' },
    ];

    const isActive = (path) => location.pathname === path;

    const whatsappNumber = '917671842007';
    const whatsappMessage = encodeURIComponent('Hi! I am interested in YahYah Sparkle cleaning products. Please share more details.');
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-white/95 backdrop-blur-md shadow-lg'
                : 'bg-transparent'
                }`}
        >
            <div className="container-custom">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <img
                            src={logo}
                            alt="YahYah Sparkle"
                            className="h-24 md:h-14 w-auto object-contain"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`relative font-medium transition-all duration-300 py-2 ${isActive(link.path)
                                    ? scrolled
                                        ? 'text-primary-600'
                                        : 'text-white'
                                    : scrolled
                                        ? 'text-gray-600 hover:text-primary-600'
                                        : 'text-white/80 hover:text-white'
                                    }`}
                            >
                                {link.name}
                                {isActive(link.path) && (
                                    <span className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${scrolled ? 'bg-primary-600' : 'bg-white'
                                        }`} />
                                )}
                            </Link>
                        ))}
                        <a
                            href="https://wa.me/917671842007?text=Hi,%20I%20am%20interested%20in%20the%20Bumper%20Dhamaka%20Offer%20(8%20Litres%20Combo%20-%20Rs.1700).%20Please%20confirm%20my%20booking."
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2 ${scrolled
                                ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg hover:shadow-xl'
                                : 'bg-white text-primary-700 hover:bg-white/90'
                                }`}
                        >
                            <FaWhatsapp className="text-xl" /> Book Now
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`md:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                            }`}
                    >
                        {isOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                <div
                    className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-6' : 'max-h-0'
                        }`}
                >
                    <div className={`rounded-2xl p-4 mt-2 ${scrolled ? 'bg-gray-50' : 'bg-white/10 backdrop-blur-lg'
                        }`}>
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={`block py-3 px-4 rounded-xl font-medium transition-all duration-300 ${isActive(link.path)
                                    ? scrolled
                                        ? 'bg-primary-100 text-primary-700'
                                        : 'bg-white/20 text-white'
                                    : scrolled
                                        ? 'text-gray-600 hover:bg-gray-100'
                                        : 'text-white/80 hover:bg-white/10'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <a
                            href="https://wa.me/917671842007?text=Hi,%20I%20am%20interested%20in%20the%20Bumper%20Dhamaka%20Offer%20(8%20Litres%20Combo%20-%20Rs.1700).%20Please%20confirm%20my%20booking."
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setIsOpen(false)}
                            className="block mt-3 py-3 px-4 rounded-xl font-semibold text-center text-white bg-gradient-to-r from-primary-600 to-secondary-600 flex items-center justify-center gap-2"
                        >
                            <FaWhatsapp className="text-xl" /> Book Now
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
