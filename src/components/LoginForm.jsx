import { useState } from 'react';

export default function LoginForm({ onComplete }) {
    const [formData, setFormData] = useState({
        emailOrUsername: '',
        password: '',
        rememberMe: false
    });
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        
        setFormData({
            ...formData,
            [e.target.name]: value
        });
        if (error) setError('');
    };
    const authenticateUser = async (credentials) => {
        console.log('Authenticating user:', credentials);
        const storedUsers = JSON.parse(localStorage.getItem('signupUsers') || '[]');
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const user = storedUsers.find(user => 
                    (user.email === credentials.emailOrUsername || 
                    user.username === credentials.emailOrUsername) && 
                    user.password === credentials.password
                );
                
                if (user) {
                    resolve({ success: true, user: { name: user.name, email: user.email } });
                } else {
                    reject(new Error('Invalid credentials. Please try again.'));
                }
            }, 1000);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const result = await authenticateUser(formData);
            if (result.success) {
                console.log('Login successful:', result.user);
                if (formData.rememberMe) {
                    localStorage.setItem('userToken', 'sample-token-would-come-from-backend');
                } else {
                    sessionStorage.setItem('userToken', 'sample-token-would-come-from-backend');
                }
                localStorage.setItem('currentUser', JSON.stringify(result.user));
                
                if (onComplete) {
                    onComplete(result.user);
                } else {
                    window.location.href = '/';
                }
            }
        } catch (err) {
            console.error('Login error:', err);
            setError(err.message || 'Failed to login. Please try again.');
            setFormData({
                ...formData,
                password: ''
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleForgotPassword = () => {
        console.log('Forgot password clicked');
    };

    return {
        formData,
        isLoading,
        error,
        handleChange,
        handleSubmit,
        handleForgotPassword
    };
}