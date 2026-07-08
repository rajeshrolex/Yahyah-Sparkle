import React, { useState, useEffect } from 'react';
import api, { API_BASE_URL } from '../../utils/api';
import toast from 'react-hot-toast';
import { 
    HiOutlinePlus, 
    HiOutlineSearch, 
    HiOutlinePencil, 
    HiOutlineTrash, 
    HiOutlineFilter,
    HiOutlineX,
    HiOutlineCloudUpload
} from 'react-icons/hi';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [pagination, setPagination] = useState({ total_pages: 1, current_page: 1 });
    const [loading, setLoading] = useState(true);
    
    // Filters & Queries
    const [search, setSearch] = useState('');
    const [catFilter, setCatFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [page, setPage] = useState(1);

    // Modal / Form state
    const [formOpen, setFormOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [deleteConfirmId, setDeleteConfirmId] = useState(null);

    // Form inputs
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [isActive, setIsActive] = useState(true);
    const [imageFiles, setImageFiles] = useState([]);
    const [existingImages, setExistingImages] = useState([]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await api.get('/admin/products.php', {
                params: {
                    page,
                    limit: 8,
                    search,
                    category_id: catFilter,
                    status: statusFilter
                }
            });
            setProducts(response.data.products);
            setPagination(response.data.pagination);
        } catch (error) {
            console.error(error);
            toast.error('Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await api.get('/public/categories.php');
            setCategories(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [page, catFilter, statusFilter]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setPage(1);
        fetchProducts();
    };

    const openCreateForm = () => {
        setEditingProduct(null);
        setName('');
        setDescription('');
        setPrice('');
        setCategoryId('');
        setIsActive(true);
        setImageFiles([]);
        setExistingImages([]);
        setFormOpen(true);
    };

    const openEditForm = (prod) => {
        setEditingProduct(prod);
        setName(prod.name);
        setDescription(prod.description);
        setPrice(prod.price || '');
        setCategoryId(prod.category_id || '');
        setIsActive(prod.is_active === 1);
        setImageFiles([]);
        setExistingImages(JSON.parse(prod.images || '[]'));
        setFormOpen(true);
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setImageFiles(prev => [...prev, ...files]);
    };

    const removeNewImage = (index) => {
        setImageFiles(prev => prev.filter((_, i) => i !== index));
    };

    const removeExistingImage = (index) => {
        setExistingImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !description) {
            toast.error('Name and description are required.');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('category_id', categoryId);
        formData.append('is_active', isActive ? 1 : 0);

        imageFiles.forEach((file) => {
            formData.append('images[]', file);
        });

        const loadingToast = toast.loading(editingProduct ? 'Updating product...' : 'Creating product...');

        try {
            if (editingProduct) {
                formData.append('id', editingProduct.id);
                formData.append('existing_images', JSON.stringify(existingImages));
                // We use POST with action=update to bypass standard PHP PUT multipart form limitations
                await api.post('/admin/products.php?action=update', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                toast.success('Product updated successfully!', { id: loadingToast });
            } else {
                await api.post('/admin/products.php', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                toast.success('Product created successfully!', { id: loadingToast });
            }
            setFormOpen(false);
            fetchProducts();
        } catch (error) {
            console.error(error);
            const errMsg = error.response?.data?.error || 'Failed to save product';
            toast.error(errMsg, { id: loadingToast });
        }
    };

    const handleDelete = async () => {
        if (!deleteConfirmId) return;
        
        try {
            await api.delete(`/admin/products.php?id=${deleteConfirmId}`);
            toast.success('Product deleted successfully');
            setDeleteConfirmId(null);
            fetchProducts();
        } catch (error) {
            console.error(error);
            toast.error('Failed to delete product');
        }
    };

    // Calculate dynamic API media server base URL
    const getMediaUrl = (imgPath) => {
        if (!imgPath) return '';
        // If it starts with uploads, map to PHP backend base url path
        const serverRoot = API_BASE_URL.replace('/backend/api', '');
        return `${serverRoot}/${imgPath}`;
    };

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-wider">
                        Product Management
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Create, modify, and delete cleaning products catalog.
                    </p>
                </div>
                <button
                    onClick={openCreateForm}
                    className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary-600 hover:bg-primary-750 text-white font-bold transition-all shadow-sm self-start sm:self-auto"
                >
                    <HiOutlinePlus className="h-5 w-5" /> Add New Product
                </button>
            </div>

            {/* Filters Bar */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
                {/* Search Bar */}
                <form onSubmit={handleSearchSubmit} className="relative w-full md:w-96">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <HiOutlineSearch className="absolute left-3.5 top-3.5 text-gray-400 h-5 w-5" />
                    <button type="submit" className="hidden">Search</button>
                </form>

                {/* Dropdowns */}
                <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <HiOutlineFilter className="text-gray-400 h-5 w-5" />
                        <select
                            value={catFilter}
                            onChange={(e) => { setCatFilter(e.target.value); setPage(1); }}
                            className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                            <option value="">All Categories</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    <select
                        value={statusFilter}
                        onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                        className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                        <option value="">All Statuses</option>
                        <option value="active">Active Only</option>
                        <option value="inactive">Inactive Only</option>
                    </select>
                </div>
            </div>

            {/* Products Table/Grid view */}
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                        <div key={i} className="animate-pulse bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-5 space-y-4">
                            <div className="bg-gray-250 dark:bg-gray-700 h-48 rounded-2xl"></div>
                            <div className="h-6 bg-gray-250 dark:bg-gray-700 rounded-md w-3/4"></div>
                            <div className="h-4 bg-gray-250 dark:bg-gray-700 rounded-md w-1/2"></div>
                            <div className="h-10 bg-gray-250 dark:bg-gray-700 rounded-xl"></div>
                        </div>
                    ))}
                </div>
            ) : products.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-12 border border-gray-200 dark:border-gray-700 text-center max-w-xl mx-auto mt-10">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Products Found</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">There are no products in the catalog fitting your filter criteria.</p>
                    <button onClick={openCreateForm} className="px-5 py-3 bg-primary-600 hover:bg-primary-750 text-white font-bold rounded-xl transition-all shadow-sm">
                        Create First Product
                    </button>
                </div>
            ) : (
                <div className="space-y-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map(prod => {
                            const imgs = JSON.parse(prod.images || '[]');
                            const firstImg = imgs.length > 0 ? getMediaUrl(imgs[0]) : null;
                            return (
                                <div key={prod.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-5 flex flex-col shadow-sm group hover:shadow-md transition-shadow relative">
                                    <div className="absolute top-4 right-4 z-10">
                                        <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${
                                            prod.is_active === 1 
                                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-400' 
                                                : 'bg-red-100 text-red-800 dark:bg-red-950/30 dark:text-red-400'
                                        }`}>
                                            {prod.is_active === 1 ? 'Active' : 'Inactive'}
                                        </span>
                                    </div>
                                    
                                    <div className="h-44 rounded-2xl bg-gray-100 dark:bg-gray-900 flex items-center justify-center overflow-hidden mb-4">
                                        {firstImg ? (
                                            <img src={firstImg} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                        ) : (
                                            <span className="text-gray-400 text-sm font-semibold">No Image</span>
                                        )}
                                    </div>

                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <span className="text-xs font-semibold uppercase text-primary-600 dark:text-primary-400 tracking-wider">
                                                {prod.category_name || 'Uncategorized'}
                                            </span>
                                            <h3 className="font-bold text-gray-900 dark:text-white text-lg mt-1 line-clamp-1">{prod.name}</h3>
                                            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 line-clamp-2">{prod.description}</p>
                                        </div>

                                        <div className="mt-4 flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-4">
                                            <span className="text-lg font-black text-gray-950 dark:text-white">
                                                {prod.price ? `₹${parseFloat(prod.price).toFixed(2)}` : 'Free / Contact'}
                                            </span>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => openEditForm(prod)}
                                                    className="p-2 rounded-lg text-gray-500 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-950/20 dark:hover:text-primary-400 transition-colors"
                                                    title="Edit"
                                                >
                                                    <HiOutlinePencil className="h-5 w-5" />
                                                </button>
                                                <button
                                                    onClick={() => setDeleteConfirmId(prod.id)}
                                                    className="p-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 dark:hover:text-red-400 transition-colors"
                                                    title="Delete"
                                                >
                                                    <HiOutlineTrash className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Pagination Bar */}
                    {pagination.total_pages > 1 && (
                        <div className="flex justify-center items-center gap-4 mt-6">
                            <button
                                disabled={page === 1}
                                onClick={() => setPage(prev => Math.max(1, prev - 1))}
                                className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl disabled:opacity-50 dark:text-white text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                                Previous
                            </button>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Page {pagination.current_page} of {pagination.total_pages}
                            </span>
                            <button
                                disabled={page === pagination.total_pages}
                                onClick={() => setPage(prev => Math.min(pagination.total_pages, prev + 1))}
                                className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl disabled:opacity-50 dark:text-white text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Slide drawer / Modal Form Overlay */}
            {formOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex justify-end">
                    <div className="w-full max-w-2xl bg-white dark:bg-gray-800 min-h-screen p-6 md:p-8 flex flex-col shadow-2xl relative animate-slide-in">
                        <button
                            onClick={() => setFormOpen(false)}
                            className="absolute top-6 right-6 p-2 rounded-lg text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            <HiOutlineX className="h-6 w-6" />
                        </button>

                        <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-wide mb-6">
                            {editingProduct ? 'Edit Product' : 'Add New Product'}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6 flex-1 flex flex-col justify-between">
                            <div className="space-y-5">
                                <div>
                                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 block mb-2">Product Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-750 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                                        placeholder="e.g. Toilet Cleaner Red"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 block mb-2">Description</label>
                                    <textarea
                                        required
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        rows="4"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-750 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                                        placeholder="Formulate product description details..."
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 block mb-2">Price (₹)</label>
                                        <input
                                            type="number"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-750 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                                            placeholder="350.00"
                                            step="0.01"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 block mb-2">Category</label>
                                        <select
                                            value={categoryId}
                                            onChange={(e) => setCategoryId(e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-750 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                                        >
                                            <option value="">Select Category</option>
                                            {categories.map(cat => (
                                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Images Upload */}
                                <div>
                                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 block mb-2">Product Images</label>
                                    
                                    {/* Existing Images preview */}
                                    {existingImages.length > 0 && (
                                        <div className="mb-4">
                                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Existing Images</p>
                                            <div className="flex flex-wrap gap-3">
                                                {existingImages.map((img, index) => (
                                                    <div key={index} className="relative w-20 h-20 rounded-xl overflow-hidden border border-gray-200 bg-gray-50 dark:border-gray-700">
                                                        <img src={getMediaUrl(img)} alt="product" className="w-full h-full object-cover" />
                                                        <button
                                                            type="button"
                                                            onClick={() => removeExistingImage(index)}
                                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600 transition-colors"
                                                        >
                                                            <HiOutlineX className="h-3 w-3" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* New Images previews */}
                                    {imageFiles.length > 0 && (
                                        <div className="mb-4">
                                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">New Images to Upload</p>
                                            <div className="flex flex-wrap gap-3">
                                                {imageFiles.map((file, index) => {
                                                    const url = URL.createObjectURL(file);
                                                    return (
                                                        <div key={index} className="relative w-20 h-20 rounded-xl overflow-hidden border border-gray-205 bg-gray-55 dark:border-gray-700">
                                                            <img src={url} alt="upload preview" className="w-full h-full object-cover" />
                                                            <button
                                                                type="button"
                                                                onClick={() => removeNewImage(index)}
                                                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600 transition-colors"
                                                            >
                                                                <HiOutlineX className="h-3 w-3" />
                                                            </button>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex justify-center items-center w-full">
                                        <label className="flex flex-col justify-center items-center w-full h-32 bg-gray-50 dark:bg-gray-900 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-850 transition-colors">
                                            <div className="flex flex-col justify-center items-center pt-5 pb-6">
                                                <HiOutlineCloudUpload className="h-10 w-10 text-gray-400 mb-2" />
                                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                                </p>
                                                <p className="text-xs text-gray-400">PNG, JPG, JPEG or WEBP (Max 5MB)</p>
                                            </div>
                                            <input type="file" multiple onChange={handleFileChange} className="hidden" accept="image/*" />
                                        </label>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="is_active"
                                        checked={isActive}
                                        onChange={(e) => setIsActive(e.target.checked)}
                                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="is_active" className="ml-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        Make product visible to public (Active)
                                    </label>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-gray-200 dark:border-gray-700 flex gap-4 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setFormOpen(false)}
                                    className="flex-1 py-3 px-4 border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-850 rounded-xl transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-3 px-4 bg-primary-600 hover:bg-primary-750 text-sm font-bold text-white rounded-xl transition-colors shadow-sm"
                                >
                                    {editingProduct ? 'Save Changes' : 'Create Product'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Confirmation Dialog before Delete */}
            {deleteConfirmId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-3xl max-w-md w-full p-6 md:p-8 border border-gray-200 dark:border-gray-700 shadow-2xl relative">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Delete Product?</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6">Are you sure you want to delete this product? This action is permanent and cannot be undone.</p>
                        
                        <div className="flex gap-4">
                            <button
                                onClick={() => setDeleteConfirmId(null)}
                                className="flex-1 py-3 px-4 border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-850 rounded-xl transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="flex-1 py-3 px-4 bg-red-600 hover:bg-red-750 text-sm font-bold text-white rounded-xl transition-colors shadow-sm"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Products;
