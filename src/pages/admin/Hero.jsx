import React, { useState, useEffect } from 'react';
import api, { API_BASE_URL } from '../../utils/api';
import toast from 'react-hot-toast';
import { HiOutlineCloudUpload } from 'react-icons/hi';

const Hero = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Form inputs
    const [heading, setHeading] = useState('');
    const [description, setDescription] = useState('');
    const [primaryText, setPrimaryText] = useState('');
    const [primaryLink, setPrimaryLink] = useState('');
    const [secondaryText, setSecondaryText] = useState('');
    const [secondaryLink, setSecondaryLink] = useState('');
    const [isEnabled, setIsEnabled] = useState(true);
    const [bgImageFile, setBgImageFile] = useState(null);
    const [existingBgImage, setExistingBgImage] = useState('');

    const fetchHeroDetails = async () => {
        setLoading(true);
        try {
            const response = await api.get('/admin/hero.php');
            const data = response.data;
            setHeading(data.heading || '');
            setDescription(data.description || '');
            setPrimaryText(data.primary_cta_text || '');
            setPrimaryLink(data.primary_cta_link || '');
            setSecondaryText(data.secondary_cta_text || '');
            setSecondaryLink(data.secondary_cta_link || '');
            setIsEnabled(data.is_enabled === 1);
            setExistingBgImage(data.background_image || '');
        } catch (error) {
            console.error(error);
            toast.error('Failed to load hero banner details');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHeroDetails();
    }, []);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setBgImageFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!heading || !description) {
            toast.error('Heading and description are required.');
            return;
        }

        setSaving(true);
        const formData = new FormData();
        formData.append('heading', heading);
        formData.append('description', description);
        formData.append('primary_cta_text', primaryText);
        formData.append('primary_cta_link', primaryLink);
        formData.append('secondary_cta_text', secondaryText);
        formData.append('secondary_cta_link', secondaryLink);
        formData.append('is_enabled', isEnabled ? 1 : 0);

        if (bgImageFile) {
            formData.append('background_image', bgImageFile);
        }

        try {
            await api.post('/admin/hero.php', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            toast.success('Hero section settings saved successfully');
            setBgImageFile(null);
            fetchHeroDetails();
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.error || 'Failed to update hero settings');
        } finally {
            setSaving(false);
        }
    };

    const getMediaUrl = (imgPath) => {
        if (!imgPath) return '';
        const serverRoot = API_BASE_URL.replace('/backend/api', '');
        return `${serverRoot}/${imgPath}`;
    };

    if (loading) {
        return (
            <div className="animate-pulse space-y-6 max-w-4xl mx-auto">
                <div className="h-10 bg-gray-250 dark:bg-gray-800 rounded-md w-1/4"></div>
                <div className="h-8 bg-gray-250 dark:bg-gray-800 rounded-md w-1/2"></div>
                <div className="h-96 bg-gray-250 dark:bg-gray-800 rounded-2xl"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-wider">
                    Hero Section settings
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Modify public home page hero promotion and banner configuration.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-6">
                
                {/* Enable toggle */}
                <div className="flex items-center justify-between pb-6 border-b border-gray-150 dark:border-gray-750">
                    <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">Enable Hero Promotion</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">When disabled, public homepage will hide the hero banner promo.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                            type="checkbox" 
                            checked={isEnabled} 
                            onChange={(e) => setIsEnabled(e.target.checked)} 
                            className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-650 peer-checked:bg-primary-600"></div>
                    </label>
                </div>

                {/* Banner background image */}
                <div>
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 block mb-2">Background Image</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        <div className="h-44 bg-gray-100 dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 flex items-center justify-center relative">
                            {bgImageFile ? (
                                <img src={URL.createObjectURL(bgImageFile)} alt="new background" className="w-full h-full object-cover" />
                            ) : existingBgImage ? (
                                <img src={getMediaUrl(existingBgImage)} alt="current background" className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-gray-400 font-semibold text-sm">No Background Image Set</span>
                            )}
                        </div>

                        <label className="flex flex-col justify-center items-center w-full h-44 bg-gray-50 dark:bg-gray-900 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-850 transition-colors">
                            <div className="flex flex-col justify-center items-center pt-5 pb-6">
                                <HiOutlineCloudUpload className="h-8 w-8 text-gray-400 mb-2" />
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="font-semibold">Upload background</span>
                                </p>
                                <p className="text-xs text-gray-450">Supports JPG, PNG, WEBP (Max 5MB)</p>
                            </div>
                            <input type="file" onChange={handleFileChange} className="hidden" accept="image/*" />
                        </label>
                    </div>
                </div>

                {/* Heading / Description */}
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 block mb-2">Heading Title</label>
                        <input
                            type="text"
                            required
                            value={heading}
                            onChange={(e) => setHeading(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-750 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="e.g. SUPER SALE DHAMAKA OFFER"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 block mb-2">Short Description</label>
                        <textarea
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="4"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-750 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="Festival offer description..."
                        />
                    </div>
                </div>

                {/* Call-to-action buttons configuration */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-4">Call-to-Action Buttons</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Primary Button */}
                        <div className="space-y-4 bg-gray-50 dark:bg-gray-900/50 p-5 rounded-2xl border border-gray-150 dark:border-gray-750">
                            <h4 className="text-sm font-bold text-primary-600 dark:text-primary-400">Primary Button</h4>
                            <div>
                                <label className="text-xs font-semibold text-gray-500 block mb-1">Button Text</label>
                                <input
                                    type="text"
                                    value={primaryText}
                                    onChange={(e) => setPrimaryText(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none text-sm"
                                    placeholder="e.g. Call Now"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-gray-500 block mb-1">Button Link</label>
                                <input
                                    type="text"
                                    value={primaryLink}
                                    onChange={(e) => setPrimaryLink(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none text-sm"
                                    placeholder="e.g. tel:+917671842007"
                                />
                            </div>
                        </div>

                        {/* Secondary Button */}
                        <div className="space-y-4 bg-gray-50 dark:bg-gray-900/50 p-5 rounded-2xl border border-gray-150 dark:border-gray-750">
                            <h4 className="text-sm font-bold text-gray-600 dark:text-gray-400">Secondary Button</h4>
                            <div>
                                <label className="text-xs font-semibold text-gray-500 block mb-1">Button Text</label>
                                <input
                                    type="text"
                                    value={secondaryText}
                                    onChange={(e) => setSecondaryText(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none text-sm"
                                    placeholder="e.g. WhatsApp Now"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-gray-500 block mb-1">Button Link</label>
                                <input
                                    type="text"
                                    value={secondaryLink}
                                    onChange={(e) => setSecondaryLink(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none text-sm"
                                    placeholder="e.g. https://wa.me/..."
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                        type="submit"
                        disabled={saving}
                        className="px-6 py-3.5 bg-primary-600 hover:bg-primary-750 text-white font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 min-w-44"
                    >
                        {saving ? 'Saving...' : 'Save Settings'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Hero;
