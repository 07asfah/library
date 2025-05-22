import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

function Input({ label, name, value, onChange, type = 'text', placeholder }) {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                required
            />
        </div>
    );
}

export default function Login() {
    const [credentials, setCredentials] = useState({ emailOrUsername: '', password: '', rememberMe: false });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAdmin();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            if (credentials.emailOrUsername === 'admin' && credentials.password === 'admin123') {
                login(credentials);
                navigate('/BookDetail');
                return;
            }

            const storedUsers = JSON.parse(localStorage.getItem('signupUsers') || '[]');
            const user = storedUsers.find(user => 
                (user.email === credentials.emailOrUsername || 
                user.username === credentials.emailOrUsername) && 
                user.password === credentials.password
            );

            if (user) {
                if (credentials.rememberMe) {
                    localStorage.setItem('userToken', 'user-token');
                } else {
                    sessionStorage.setItem('userToken', 'user-token');
                }
                localStorage.setItem('currentUser', JSON.stringify({ 
                    name: user.name, 
                    email: user.email 
                }));
                navigate('/library');
            } else {
                setError('Invalid email/username or password');
            }
        } catch (error) {
            setError('An error occurred during login');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCredentials(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        setError('');
    };

    const handleForgotPassword = () => {
        console.log('Forgot password clicked');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl">
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Welcome Back</h2>
                
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <Input 
                        label="Email or Username" 
                        name="emailOrUsername" 
                        value={credentials.emailOrUsername} 
                        onChange={handleChange}
                        placeholder="Enter your email or username"
                    />
                    
                    <div className="mb-4">
                        <div className="flex items-center justify-between">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <button 
                                type="button" 
                                onClick={handleForgotPassword}
                                className="text-xs text-teal-500 hover:underline"
                            >
                                Forgot Password?
                            </button>
                        </div>
                        <input
                            type="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            required
                        />
                    </div>

                    <div className="flex items-center mb-4">
                        <input
                            id="rememberMe"
                            name="rememberMe"
                            type="checkbox"
                            checked={credentials.rememberMe}
                            onChange={handleChange}
                            className="h-4 w-4 text-teal-500 border-gray-300 rounded focus:ring-teal-400"
                        />
                        <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                            Remember me
                        </label>
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 bg-teal-500 text-white rounded-lg font-medium hover:bg-teal-600 transition shadow-md disabled:bg-teal-300 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Logging in...' : 'Log In'}
                        </button>
                    </div>

                    <p className="text-center text-sm text-gray-600 mt-4">
                        Don't have an account? <a href="/signup" className="text-teal-500 hover:underline">Sign up</a>
                    </p>
                </form>
            </div>
        </div>
    );
}