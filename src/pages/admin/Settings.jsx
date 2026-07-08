import React, { useState } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';

const Settings = () => {
    const currentUser = JSON.parse(localStorage.getItem('admin_user') || '{}');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        
        if (!newPassword || !confirmNewPassword) {
            toast.error('Please enter all new password fields.');
            return;
        }

        if (newPassword.length < 6) {
            toast.error('New password must be at least 6 characters.');
            return;
        }

        if (newPassword !== confirmNewPassword) {
            toast.error('New passwords do not match.');
            return;
        }

        setLoading(true);
        try {
            // Update using current user's endpoint
            const payload = {
                id: currentUser.id,
                username: currentUser.username,
                role: currentUser.role,
                password: newPassword
            };
            await api.put('/admin/users.php', payload);
            toast.success('Password updated successfully!');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.error || 'Failed to update password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-wider">
                    Panel Settings
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Manage security settings and review system information.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Security change password card */}
                <div className="md:col-span-2 bg-white dark:bg-gray-800 p-6 md:p-8 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-150 dark:border-gray-750 pb-4">
                        Change Password
                    </h3>

                    <form onSubmit={handlePasswordChange} className="space-y-4">
                        <div>
                            <label className="text-sm font-bold text-gray-750 dark:text-gray-300 block mb-2">New Password</label>
                            <input
                                type="password"
                                required
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-750 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                                placeholder="••••••••"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-bold text-gray-755 dark:text-gray-300 block mb-2">Confirm New Password</label>
                            <input
                                type="password"
                                required
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-750 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                                placeholder="••••••••"
                            />
                        </div>

                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-6 py-3 bg-primary-600 hover:bg-primary-750 text-white font-bold rounded-xl transition-all shadow-sm flex items-center justify-center min-w-44"
                            >
                                {loading ? 'Saving...' : 'Update Password'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* System Info card */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-4 self-start">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-150 dark:border-gray-750 pb-3">
                        System Details
                    </h3>
                    
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-500 dark:text-gray-400">Environment:</span>
                            <span className="font-semibold text-gray-900 dark:text-white">Production</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500 dark:text-gray-400">Framework:</span>
                            <span className="font-semibold text-gray-900 dark:text-white">React 18.3 (Vite)</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500 dark:text-gray-400">Backend API:</span>
                            <span className="font-semibold text-gray-900 dark:text-white">PHP 8.2 (PDO)</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500 dark:text-gray-400">Database Driver:</span>
                            <span className="font-semibold text-gray-900 dark:text-white">MySQL (InnoDB)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
