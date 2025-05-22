import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext(null);

export const useAdmin = () => {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error('useAdmin must be used within an AdminProvider');
    }
    return context;
};

export const AdminProvider = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const adminToken = localStorage.getItem('adminToken');
        setIsAdmin(!!adminToken);
        setLoading(false);
    }, []);

    const login = (credentials) => {
        if (credentials.username === 'admin' && credentials.password === 'admin123') {
            localStorage.setItem('adminToken', 'admin-token');
            setIsAdmin(true);
            return true;
        }
        return false;
    };

    const logout = () => {
        localStorage.removeItem('adminToken');
        setIsAdmin(false);
    };

    return (
        <AdminContext.Provider value={{ isAdmin, loading, login, logout }}>
            {children}
        </AdminContext.Provider>
    );
}; 