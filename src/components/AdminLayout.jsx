import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
    HiOutlineHome, 
    HiOutlineCube, 
    HiOutlineFolderOpen, 
    HiOutlinePhotograph, 
    HiOutlineUsers, 
    HiOutlineCog, 
    HiOutlineLogout,
    HiMenuAlt2,
    HiX,
    HiOutlineSun,
    HiOutlineMoon
} from 'react-icons/hi';
import logo from '../assets/logo.png';

const AdminLayout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
    );

    const user = JSON.parse(localStorage.getItem('admin_user') || '{}');

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    const handleLogout = () => {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        navigate('/admin/login');
    };

    const navigation = [
        { name: 'Dashboard', href: '/admin/dashboard', icon: HiOutlineHome },
        { name: 'Products', href: '/admin/products', icon: HiOutlineCube },
        { name: 'Categories', href: '/admin/categories', icon: HiOutlineFolderOpen },
        { name: 'Hero Section', href: '/admin/hero', icon: HiOutlinePhotograph },
        { name: 'Users', href: '/admin/users', icon: HiOutlineUsers },
        { name: 'Settings', href: '/admin/settings', icon: HiOutlineCog },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 flex`}>
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 transition-opacity lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar for Desktop & Mobile */}
            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:flex lg:flex-col ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>
                {/* Logo Section */}
                <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200 dark:border-gray-700">
                    <Link to="/" className="flex items-center gap-2">
                        <img src={logo} alt="YahYah Sparkle" className="h-10 w-auto object-contain" />
                        <span className="font-bold text-gray-900 dark:text-white">Admin Panel</span>
                    </Link>
                    <button 
                        onClick={() => setSidebarOpen(false)} 
                        className="p-1 rounded-md text-gray-500 hover:text-gray-900 dark:hover:text-white lg:hidden"
                    >
                        <HiX className="h-6 w-6" />
                    </button>
                </div>

                {/* Nav Links */}
                <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                    {navigation.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.href);
                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                                    active 
                                        ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400' 
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700/50 dark:hover:text-white'
                                }`}
                                onClick={() => setSidebarOpen(false)}
                            >
                                <Icon className={`h-5 w-5 ${active ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400 dark:text-gray-500'}`} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer / User Profile & Logout */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                    <div className="flex items-center gap-3 px-4 py-2">
                        <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-950 flex items-center justify-center font-bold text-primary-700 dark:text-primary-300">
                            {user.username ? user.username[0].toUpperCase() : 'A'}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user.username || 'Admin'}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate capitalize">{user.role || 'Administrator'}</p>
                        </div>
                    </div>
                    
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/20 rounded-xl transition-all"
                    >
                        <HiOutlineLogout className="h-5 w-5" />
                        Sign Out
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Header */}
                <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6 z-10 transition-colors duration-200">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setSidebarOpen(true)} 
                            className="p-1 rounded-md text-gray-500 hover:text-gray-900 dark:hover:text-white lg:hidden"
                        >
                            <HiMenuAlt2 className="h-6 w-6" />
                        </button>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white lg:block hidden">
                            Welcome back, {user.username || 'Admin'}
                        </h2>
                    </div>

                    {/* Dark/Light Mode toggle */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                            aria-label="Toggle Dark Mode"
                        >
                            {darkMode ? <HiOutlineSun className="h-5 w-5" /> : <HiOutlineMoon className="h-5 w-5" />}
                        </button>
                    </div>
                </header>

                {/* Dashboard Page Wrapper */}
                <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-gray-50 dark:bg-gray-950">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
