import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { 
    HiOutlineCube, 
    HiOutlineFolderOpen, 
    HiOutlineUsers,
    HiOutlineEye,
    HiOutlineEyeOff
} from 'react-icons/hi';
import { Link } from 'react-router-dom';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get('/admin/stats.php');
                setStats(response.data);
            } catch (error) {
                console.error(error);
                toast.error('Failed to fetch dashboard statistics.');
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-pulse space-y-4 w-full max-w-4xl">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-32 bg-gray-250 dark:bg-gray-800 rounded-2xl"></div>
                        ))}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                        <div className="h-80 bg-gray-255 dark:bg-gray-800 rounded-2xl"></div>
                        <div className="h-80 bg-gray-255 dark:bg-gray-800 rounded-2xl"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!stats) return <div className="text-gray-500 text-center">Failed to load statistics.</div>;

    const counts = stats.counts;
    
    // Prepare data for products by category chart
    const categoryLabels = stats.products_by_category?.map(item => item.category_name || 'Uncategorized') || [];
    const categoryData = stats.products_by_category?.map(item => item.product_count) || [];

    const pieData = {
        labels: categoryLabels,
        datasets: [
            {
                label: '# of Products',
                data: categoryData,
                backgroundColor: [
                    'rgba(59, 130, 246, 0.7)',  // Blue
                    'rgba(16, 185, 129, 0.7)',  // Green
                    'rgba(245, 158, 11, 0.7)',  // Amber
                    'rgba(239, 68, 68, 0.7)',   // Red
                    'rgba(139, 92, 246, 0.7)',  // Purple
                ],
                borderColor: [
                    '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'
                ],
                borderWidth: 1,
            },
        ],
    };

    const activeInactiveData = {
        labels: ['Active Products', 'Inactive Products'],
        datasets: [
            {
                label: 'Products Count',
                data: [counts.active_products, counts.inactive_products],
                backgroundColor: ['rgba(16, 185, 129, 0.7)', 'rgba(239, 68, 68, 0.7)'],
                borderColor: ['#10b981', '#ef4444'],
                borderWidth: 1,
            }
        ]
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-wider">
                    Dashboard Overview
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Real-time monitoring and management metrics for Yahyah Sparkle.
                </p>
            </div>

            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Products Card */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center gap-5">
                    <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl text-blue-600 dark:text-blue-400">
                        <HiOutlineCube className="h-7 w-7" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Products</p>
                        <h3 className="text-2xl font-black text-gray-950 dark:text-white mt-1">{counts.total_products}</h3>
                    </div>
                </div>

                {/* Active Products Card */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center gap-5">
                    <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl text-emerald-600 dark:text-emerald-400">
                        <HiOutlineEye className="h-7 w-7" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Products</p>
                        <h3 className="text-2xl font-black text-gray-950 dark:text-white mt-1">{counts.active_products}</h3>
                    </div>
                </div>

                {/* Total Categories Card */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center gap-5">
                    <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-xl text-amber-600 dark:text-amber-400">
                        <HiOutlineFolderOpen className="h-7 w-7" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Categories</p>
                        <h3 className="text-2xl font-black text-gray-950 dark:text-white mt-1">{counts.total_categories}</h3>
                    </div>
                </div>

                {/* Admin Users Card */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center gap-5">
                    <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-xl text-purple-600 dark:text-purple-400">
                        <HiOutlineUsers className="h-7 w-7" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Admin Users</p>
                        <h3 className="text-2xl font-black text-gray-950 dark:text-white mt-1">{counts.total_users}</h3>
                    </div>
                </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Products by Category Chart */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-950 dark:text-white mb-4">Products by Category</h3>
                    {categoryData.length > 0 ? (
                        <div className="h-72 flex justify-center items-center">
                            <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: false }} />
                        </div>
                    ) : (
                        <div className="h-72 flex items-center justify-center text-gray-500">
                            No categories or products found.
                        </div>
                    )}
                </div>

                {/* Active vs Inactive Chart */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-950 dark:text-white mb-4">Product Status</h3>
                    <div className="h-72 flex justify-center items-center">
                        <Bar 
                            data={activeInactiveData} 
                            options={{ 
                                responsive: true, 
                                maintainAspectRatio: false,
                                plugins: { legend: { display: false } } 
                            }} 
                        />
                    </div>
                </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <h3 className="text-lg font-bold text-gray-950 dark:text-white mb-4">Quick Management Actions</h3>
                <div className="flex flex-wrap gap-4">
                    <Link to="/admin/products" className="px-5 py-3 rounded-xl bg-primary-600 hover:bg-primary-750 text-white font-bold transition-all shadow-sm">
                        Add New Product
                    </Link>
                    <Link to="/admin/categories" className="px-5 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-650 dark:text-white font-bold transition-all">
                        Manage Categories
                    </Link>
                    <Link to="/admin/hero" className="px-5 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-650 dark:text-white font-bold transition-all">
                        Customize Hero Banner
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
