import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
    FaSprayCan, 
    FaHome, 
    FaBath, 
    FaCheckCircle, 
    FaArrowRight, 
    FaPhone, 
    FaStar, 
    FaShoppingCart, 
    FaWhatsapp,
    FaSearch,
    FaRegFolderOpen
} from 'react-icons/fa';
import { MdCleaningServices, MdKitchen } from 'react-icons/md';
import api, { API_BASE_URL } from '../utils/api';
import ProductDetailsModal from '../components/ProductDetailsModal';

const Home = () => {
    // Services
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

    const whyChooseUs = [
        'Professional & Trained Staff',
        'Eco-Friendly Cleaning Products',
        'Affordable Pricing',
        '100% Satisfaction Guarantee',
        'On-Time Service',
        'All Over Hyderabad Coverage',
    ];

    const whatsappNumber = '917671842007';

    // Dynamic states
    const [heroData, setHeroData] = useState(null);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);
    
    // Filters & Pagination
    const [search, setSearch] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Modal
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch Hero Section Promo Settings
    useEffect(() => {
        const fetchHero = async () => {
            try {
                const response = await api.get('/public/hero.php');
                setHeroData(response.data);
            } catch (error) {
                console.error("Failed to load hero banner:", error);
            }
        };
        fetchHero();
    }, []);

    // Fetch Categories
    useEffect(() => {
        const fetchCats = async () => {
            try {
                const response = await api.get('/public/categories.php');
                setCategories(response.data);
            } catch (error) {
                console.error("Failed to load categories:", error);
            }
        };
        fetchCats();
    }, []);

    // Fetch Products with filters
    const fetchProducts = async () => {
        setLoadingProducts(true);
        try {
            const response = await api.get('/public/products.php', {
                params: {
                    page,
                    limit: 8,
                    search,
                    category_id: categoryFilter
                }
            });
            setProducts(response.data.products);
            setTotalPages(response.data.pagination.total_pages);
        } catch (error) {
            console.error("Failed to load products:", error);
        } finally {
            setLoadingProducts(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [page, categoryFilter]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setPage(1);
        fetchProducts();
    };

    const openModal = (product) => {
        // Adapt schema keys for details modal compatibility
        const adaptedProduct = {
            ...product,
            subtitle: product.category_name || 'Cleaning Liquid',
            // convert images array/string
            image: getMediaUrl(JSON.parse(product.images || '[]')[0]),
            features: [
                'Formulated for deep cleaning',
                'Strong on stains, safe on skin',
                'Pleasant after-wash fragrance'
            ],
            instructions: [
                'Apply liquid onto surfaces',
                'Scrub gently with scrubber',
                'Rinse thoroughly with clean water'
            ]
        };
        setSelectedProduct(adaptedProduct);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Calculate dynamic API media server base URL
    const getMediaUrl = (imgPath) => {
        if (!imgPath) return '';
        const serverRoot = API_BASE_URL.replace('/backend/api', '');
        return `${serverRoot}/${imgPath}`;
    };

    // Hero helper
    const hasHero = heroData && heroData.is_enabled === 1;

    return (
        <div className="overflow-hidden">
            {/* Dynamic Hero Section */}
            {hasHero ? (
                <section 
                    className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900"
                    style={{
                        backgroundImage: heroData.background_image ? `linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.75)), url(${getMediaUrl(heroData.background_image)})` : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                >
                    {!heroData.background_image && (
                        <div className="absolute inset-0 gradient-bg-animated opacity-60" />
                    )}

                    {/* Decorative Elements */}
                    <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse-slow" />
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl animate-pulse-slow" />

                    <div className="relative container-custom py-12 z-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="max-w-4xl mx-auto"
                        >
                            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-wide drop-shadow-2xl leading-tight">
                                {heroData.heading}
                            </h1>
                            <p className="text-xl md:text-2xl font-bold text-yellow-200 mb-8 max-w-2xl mx-auto drop-shadow-lg leading-relaxed">
                                {heroData.description}
                            </p>

                            {/* Buttons */}
                            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                                {heroData.primary_cta_text && (
                                    <a 
                                        href={heroData.primary_cta_link || '#'} 
                                        className="btn-primary px-10 py-4 text-xl shadow-[0_0_20px_rgba(255,105,180,0.4)] animate-pulse rounded-full font-bold inline-flex items-center gap-2"
                                    >
                                        <FaPhone /> {heroData.primary_cta_text}
                                    </a>
                                )}
                                {heroData.secondary_cta_text && (
                                    <a
                                        href={heroData.secondary_cta_link || '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-10 py-4 rounded-full bg-white/10 border-2 border-white text-white font-bold hover:bg-white hover:text-black transition-all shadow-lg flex items-center gap-2 text-xl"
                                    >
                                        <FaWhatsapp className="text-2xl text-green-400" /> {heroData.secondary_cta_text}
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </section>
            ) : (
                <section className="relative h-64 flex items-center justify-center bg-slate-900">
                    <div className="absolute inset-0 gradient-bg-animated opacity-60" />
                    <div className="relative text-center z-10">
                        <h1 className="text-3xl md:text-5xl font-black text-white">YAHYAH SPARKLE</h1>
                    </div>
                </section>
            )}

            {/* Products Section */}
            <section className="section-padding bg-white" id="products">
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

                    {/* Search & Category Filter */}
                    <div className="max-w-4xl mx-auto mb-10 flex flex-col md:flex-row gap-4 items-center justify-between bg-gray-50 p-4 rounded-3xl border border-gray-100">
                        <form onSubmit={handleSearchSubmit} className="relative w-full md:w-96">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                            />
                            <FaSearch className="absolute left-3.5 top-3.5 text-gray-400 h-4 w-4" />
                            <button type="submit" className="hidden">Search</button>
                        </form>

                        <div className="flex items-center gap-2 w-full md:w-auto">
                            <FaRegFolderOpen className="text-gray-400" />
                            <select
                                value={categoryFilter}
                                onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }}
                                className="w-full md:w-auto px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                            >
                                <option value="">All Categories</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Dynamic Product Grid */}
                    {loadingProducts ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="animate-pulse bg-slate-50 border border-gray-100 rounded-3xl p-6 space-y-4">
                                    <div className="bg-gray-200 h-48 rounded-2xl"></div>
                                    <div className="h-6 bg-gray-200 rounded-md w-3/4"></div>
                                    <div className="h-4 bg-gray-200 rounded-md w-1/2"></div>
                                    <div className="h-10 bg-gray-200 rounded-xl"></div>
                                </div>
                            ))}
                        </div>
                    ) : products.length === 0 ? (
                        <div className="text-center py-16 max-w-md mx-auto bg-gray-50 rounded-3xl border border-gray-100 p-8">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">No Products Available</h3>
                            <p className="text-gray-500 text-sm">Please check back later or reset search keywords.</p>
                        </div>
                    ) : (
                        <div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {products.map((product, index) => {
                                    const imgs = JSON.parse(product.images || '[]');
                                    const firstImg = imgs.length > 0 ? getMediaUrl(imgs[0]) : null;
                                    const prodPrice = product.price ? `₹${parseFloat(product.price).toFixed(0)}` : '₹350';

                                    return (
                                        <motion.div
                                            key={product.id}
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="group"
                                        >
                                            <div className="bg-slate-50 hover:bg-gradient-to-br hover:from-blue-50 hover:to-white border border-gray-100 hover:border-blue-200 rounded-3xl p-6 h-full hover:shadow-xl transition-all duration-300 relative flex flex-col justify-between">
                                                
                                                {/* Product Image */}
                                                <div className="relative mb-6 overflow-hidden rounded-2xl bg-white h-52 flex items-center justify-center border border-gray-100">
                                                    {firstImg ? (
                                                        <img
                                                            src={firstImg}
                                                            alt={product.name}
                                                            className="max-h-full max-w-full object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                                                        />
                                                    ) : (
                                                        <span className="text-gray-400 text-sm font-semibold">No Image</span>
                                                    )}
                                                </div>

                                                {/* Product Info */}
                                                <div className="text-center flex-1 flex flex-col justify-between">
                                                    <div>
                                                        <span className="text-xs font-bold text-primary-600 uppercase tracking-wider">{product.category_name || 'Cleaning Liquid'}</span>
                                                        <h3 className="text-lg font-bold text-gray-900 mb-2 mt-1 line-clamp-1">{product.name}</h3>
                                                        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>
                                                    </div>

                                                    {/* Price */}
                                                    <div className="mb-4">
                                                        <span className="text-gray-900 text-2xl font-black">{prodPrice}</span>
                                                        <span className="text-gray-500 text-sm ml-1">/ 1 Litre</span>
                                                    </div>

                                                    {/* Buttons */}
                                                    <div className="space-y-3">
                                                        <button
                                                            onClick={() => openModal(product)}
                                                            className="inline-flex items-center justify-center w-full px-6 py-2.5 border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 text-sm"
                                                        >
                                                            View Details
                                                        </button>
                                                        <a
                                                            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi! I want to order ${product.name} (${prodPrice} / 1L). Please confirm availability.`)}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center justify-center w-full px-6 py-2.5 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-bold rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-sm"
                                                        >
                                                            <FaShoppingCart className="mr-2" /> Order Now
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center gap-4 mt-12">
                                    <button
                                        disabled={page === 1}
                                        onClick={() => setPage(prev => Math.max(1, prev - 1))}
                                        className="px-4 py-2 border border-gray-200 rounded-xl disabled:opacity-50 text-sm font-semibold hover:bg-gray-100 transition-colors"
                                    >
                                        Previous
                                    </button>
                                    <span className="text-sm font-medium text-gray-700">
                                        Page {page} of {totalPages}
                                    </span>
                                    <button
                                        disabled={page === totalPages}
                                        onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
                                        className="px-4 py-2 border border-gray-200 rounded-xl disabled:opacity-50 text-sm font-semibold hover:bg-gray-100 transition-colors"
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
