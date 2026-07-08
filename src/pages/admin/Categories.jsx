import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { 
    HiOutlinePlus, 
    HiOutlinePencil, 
    HiOutlineTrash, 
    HiOutlineX 
} from 'react-icons/hi';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    // Form modal state
    const [formOpen, setFormOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    
    // Delete confirm modal
    const [deleteConfirmId, setDeleteConfirmId] = useState(null);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await api.get('/admin/categories.php');
            setCategories(response.data);
        } catch (error) {
            console.error(error);
            toast.error('Failed to load categories');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const openCreateForm = () => {
        setEditingCategory(null);
        setName('');
        setDescription('');
        setFormOpen(true);
    };

    const openEditForm = (cat) => {
        setEditingCategory(cat);
        setName(cat.name);
        setDescription(cat.description || '');
        setFormOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name) {
            toast.error('Category name is required.');
            return;
        }

        const payload = { name, description };

        try {
            if (editingCategory) {
                payload.id = editingCategory.id;
                await api.put('/admin/categories.php', payload);
                toast.success('Category updated successfully');
            } else {
                await api.post('/admin/categories.php', payload);
                toast.success('Category created successfully');
            }
            setFormOpen(false);
            fetchCategories();
        } catch (error) {
            console.error(error);
            const errMsg = error.response?.data?.error || 'Failed to save category';
            toast.error(errMsg);
        }
    };

    const handleDelete = async () => {
        if (!deleteConfirmId) return;

        try {
            await api.delete(`/admin/categories.php?id=${deleteConfirmId}`);
            toast.success('Category deleted successfully');
            setDeleteConfirmId(null);
            fetchCategories();
        } catch (error) {
            console.error(error);
            toast.error('Failed to delete category');
        }
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-wider">
                        Category Management
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Organize products into distinct categories.
                    </p>
                </div>
                <button
                    onClick={openCreateForm}
                    className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary-600 hover:bg-primary-750 text-white font-bold transition-all shadow-sm self-start sm:self-auto"
                >
                    <HiOutlinePlus className="h-5 w-5" /> Add New Category
                </button>
            </div>

            {/* List */}
            {loading ? (
                <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="animate-pulse bg-white dark:bg-gray-800 h-16 rounded-xl"></div>
                    ))}
                </div>
            ) : categories.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-12 border border-gray-200 dark:border-gray-700 text-center max-w-xl mx-auto">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Categories Found</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">Create categories to assign products to.</p>
                    <button onClick={openCreateForm} className="px-5 py-3 bg-primary-600 hover:bg-primary-750 text-white font-bold rounded-xl transition-all shadow-sm">
                        Create Category
                    </button>
                </div>
            ) : (
                <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Name</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 font-bold">Description</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 text-center font-bold">Products Linked</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 text-right font-bold">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-150 dark:divide-gray-750">
                                {categories.map(cat => (
                                    <tr key={cat.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/20 transition-colors">
                                        <td className="px-6 py-4 text-sm font-semibold text-gray-950 dark:text-white">{cat.name}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">{cat.description || 'No description'}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white text-center font-bold">{cat.product_count}</td>
                                        <td className="px-6 py-4 text-sm text-right">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => openEditForm(cat)}
                                                    className="p-2 rounded-lg text-gray-500 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-950/20 dark:hover:text-primary-400 transition-colors"
                                                    title="Edit"
                                                >
                                                    <HiOutlinePencil className="h-5 w-5" />
                                                </button>
                                                <button
                                                    onClick={() => setDeleteConfirmId(cat.id)}
                                                    className="p-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 dark:hover:text-red-400 transition-colors"
                                                    title="Delete"
                                                >
                                                    <HiOutlineTrash className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Modal Form */}
            {formOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-3xl max-w-lg w-full p-6 md:p-8 border border-gray-200 dark:border-gray-700 shadow-2xl relative">
                        <button
                            onClick={() => setFormOpen(false)}
                            className="absolute top-6 right-6 p-2 rounded-lg text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors"
                        >
                            <HiOutlineX className="h-6 w-6" />
                        </button>

                        <h2 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-wide mb-6">
                            {editingCategory ? 'Edit Category' : 'Add New Category'}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 block mb-2">Category Name</label>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-750 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    placeholder="e.g. Liquids"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 block mb-2">Description</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows="3"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-750 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    placeholder="Brief description of the category category..."
                                />
                            </div>

                            <div className="flex gap-4 pt-4">
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
                                    {editingCategory ? 'Save Changes' : 'Create Category'}
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
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Delete Category?</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6">Are you sure you want to delete this category? Products belonging to this category will be marked as uncategorized. This action cannot be undone.</p>
                        
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

export default Categories;
