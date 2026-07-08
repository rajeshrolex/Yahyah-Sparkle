import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { 
    HiOutlinePlus, 
    HiOutlinePencil, 
    HiOutlineTrash, 
    HiOutlineX 
} from 'react-icons/hi';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const currentUser = JSON.parse(localStorage.getItem('admin_user') || '{}');

    // Form modal state
    const [formOpen, setFormOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('admin');

    // Delete confirm state
    const [deleteConfirmId, setDeleteConfirmId] = useState(null);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await api.get('/admin/users.php');
            setUsers(response.data);
        } catch (error) {
            console.error(error);
            toast.error('Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const openCreateForm = () => {
        setEditingUser(null);
        setUsername('');
        setPassword('');
        setRole('admin');
        setFormOpen(true);
    };

    const openEditForm = (usr) => {
        setEditingUser(usr);
        setUsername(usr.username);
        setPassword(''); // Leave blank to not change password
        setRole(usr.role);
        setFormOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username) {
            toast.error('Username is required.');
            return;
        }

        if (!editingUser && !password) {
            toast.error('Password is required for new users.');
            return;
        }

        if (password && password.length < 6) {
            toast.error('Password must be at least 6 characters.');
            return;
        }

        const formData = new FormData();
        formData.append('username', username);
        formData.append('role', role);
        if (password) {
            formData.append('password', password);
        }

        try {
            if (editingUser) {
                formData.append('id', editingUser.id);
                // POST or PUT (Standard urlencoded fields since we don't have files here)
                const payload = {
                    id: editingUser.id,
                    username,
                    role,
                    password
                };
                await api.put('/admin/users.php', payload);
                toast.success('User updated successfully');
            } else {
                const payload = {
                    username,
                    role,
                    password
                };
                await api.post('/admin/users.php', payload);
                toast.success('User created successfully');
            }
            setFormOpen(false);
            fetchUsers();
        } catch (error) {
            console.error(error);
            const errMsg = error.response?.data?.error || 'Failed to save user';
            toast.error(errMsg);
        }
    };

    const handleDelete = async () => {
        if (!deleteConfirmId) return;

        try {
            await api.delete(`/admin/users.php?id=${deleteConfirmId}`);
            toast.success('User deleted successfully');
            setDeleteConfirmId(null);
            fetchUsers();
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.error || 'Failed to delete user');
        }
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-wider">
                        User Management
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Create and manage administrators for the dashboard.
                    </p>
                </div>
                <button
                    onClick={openCreateForm}
                    className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary-600 hover:bg-primary-750 text-white font-bold transition-all shadow-sm self-start sm:self-auto"
                >
                    <HiOutlinePlus className="h-5 w-5" /> Add New User
                </button>
            </div>

            {/* List */}
            {loading ? (
                <div className="space-y-4">
                    {[1, 2].map(i => (
                        <div key={i} className="animate-pulse bg-white dark:bg-gray-800 h-16 rounded-xl"></div>
                    ))}
                </div>
            ) : (
                <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Username</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Role</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Created At</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-150 dark:divide-gray-750">
                                {users.map(usr => (
                                    <tr key={usr.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/20 transition-colors">
                                        <td className="px-6 py-4 text-sm font-semibold text-gray-950 dark:text-white flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center font-bold text-gray-700 dark:text-gray-300 text-xs">
                                                {usr.username[0].toUpperCase()}
                                            </div>
                                            {usr.username} {currentUser.sub == usr.id && <span className="text-[10px] bg-primary-100 text-primary-850 px-2 py-0.5 rounded-full font-bold ml-2">You</span>}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 capitalize">{usr.role}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                            {new Date(usr.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-right">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => openEditForm(usr)}
                                                    className="p-2 rounded-lg text-gray-500 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-950/20 dark:hover:text-primary-400 transition-colors"
                                                    title="Edit"
                                                >
                                                    <HiOutlinePencil className="h-5 w-5" />
                                                </button>
                                                {currentUser.sub != usr.id && (
                                                    <button
                                                        onClick={() => setDeleteConfirmId(usr.id)}
                                                        className="p-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 dark:hover:text-red-400 transition-colors"
                                                        title="Delete"
                                                    >
                                                        <HiOutlineTrash className="h-5 w-5" />
                                                    </button>
                                                )}
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
                            {editingUser ? 'Edit User details' : 'Add New User'}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 block mb-2">Username</label>
                                <input
                                    type="text"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-750 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    placeholder="Enter username"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 block mb-2">
                                    {editingUser ? 'New Password (leave blank to keep unchanged)' : 'Password'}
                                </label>
                                <input
                                    type="password"
                                    required={!editingUser}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-750 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    placeholder="••••••••"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 block mb-2">User Role</label>
                                <select
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-750 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                                >
                                    <option value="admin">Administrator</option>
                                    <option value="user">User / Viewer</option>
                                </select>
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
                                    {editingUser ? 'Save Changes' : 'Create User'}
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
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Delete Admin Account?</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6">Are you sure you want to remove this administrator? This action is permanent and cannot be undone.</p>
                        
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

export default Users;
