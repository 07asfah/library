import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

    const adminUsers = [
    { username: 'hafsa', password: 'hafsa123', role: 'admin' }
    ];

    export default function AdminLogin() {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError('');
    };

    const handleSubmit = e => {
        e.preventDefault();
        const admin = adminUsers.find(
        user => user.username === formData.username && user.password === formData.password
        );

        if (admin) {
        localStorage.setItem('currentAdmin', JSON.stringify(admin));
        navigate('/admin');
        } else {
        setError('Invalid admin credentials');
        }
    };

    return (
        <div>
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
            <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            required
            />
            <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            />
            <button type="submit">Login</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
    }
