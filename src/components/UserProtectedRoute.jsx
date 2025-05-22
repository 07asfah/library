import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

export default function UserProtectedRoute({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in
        const userToken = localStorage.getItem('userToken') || sessionStorage.getItem('userToken');
        const currentUser = localStorage.getItem('currentUser');
        setIsAuthenticated(!!(userToken && currentUser));
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
} 