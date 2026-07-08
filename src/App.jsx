import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Contact from './pages/Contact'

// Admin Views
import Login from './pages/admin/Login'
import AdminLayout from './components/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import Products from './pages/admin/Products'
import Categories from './pages/admin/Categories'
import Hero from './pages/admin/Hero'
import Users from './pages/admin/Users'
import Settings from './pages/admin/Settings'

// Route Guard Component
const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('admin_token');
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  return <AdminLayout>{children}</AdminLayout>;
};

function App() {
  return (
    <div className="App">
      <ScrollToTop />
      <Toaster position="top-right" reverseOrder={false} />
      
      <Routes>
        {/* Public Website Routes */}
        <Route path="/*" element={
          <>
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
            <Footer />
            <WhatsAppButton />
          </>
        } />

        {/* Secure Admin Authentication */}
        <Route path="/admin/login" element={<Login />} />

        {/* Protected Dashboard Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminRoute><Dashboard /></AdminRoute>} />
        <Route path="/admin/products" element={<AdminRoute><Products /></AdminRoute>} />
        <Route path="/admin/categories" element={<AdminRoute><Categories /></AdminRoute>} />
        <Route path="/admin/hero" element={<AdminRoute><Hero /></AdminRoute>} />
        <Route path="/admin/users" element={<AdminRoute><Users /></AdminRoute>} />
        <Route path="/admin/settings" element={<AdminRoute><Settings /></AdminRoute>} />
      </Routes>
    </div>
  )
}

export default App
