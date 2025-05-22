import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('currentAdmin');
        navigate('/admin-login');
    };

    return (
        <div>
        <h1>Admin Dashboard</h1>
        <p>Here you can add or modify books...</p>
        <button onClick={handleLogout}>Logout</button>
        </div>
    );
}
