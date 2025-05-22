
import { Navigate } from 'react-router-dom';

export default function AdminRoute({ children }) {
    const admin = JSON.parse(localStorage.getItem('currentAdmin'));

    if (!admin || admin.role !== 'admin') {
        return <Navigate to="/admin-login" replace />;
    }

    return children;
}
