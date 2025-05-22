import { Navigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

export default function ProtectedRoute({ children }) {
    const { isAdmin, loading } = useAdmin();

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-400"></div>
            </div>
        );
    }

    if (!isAdmin) {
        return <Navigate to="/admin/login" replace />;
    }

    return children;
} 