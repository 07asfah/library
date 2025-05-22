import { useNavigate } from 'react-router-dom';
import SignupForm from '../components/SignupForm';

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

export default function SignUp() {
    const navigate = useNavigate();
    const { step, formData, handleChange, handleNext, handleResendCode } = SignupForm({
        onComplete: () => navigate('/login')
    });

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl">
            <div className="mb-6">
            </div>

            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            {step === 1 && 'Create Your Account'}
            {step === 2 && 'Verify Your Account'}
            {step === 3 && 'Set Your Password'}
            </h2>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {step === 1 && (
                <>
                <Input 
                    label="Full Name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    placeholder="Enter your full name"
                />
                <Input 
                    label="Username" 
                    name="username" 
                    value={formData.username} 
                    onChange={handleChange} 
                    placeholder="Choose a username"
                />
                <Input 
                    label="Email" 
                    name="email" 
                    type="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder="Your email address"
                />
                <Input 
                    label="Phone Number" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    placeholder="Your phone number"
                />
                </>
            )}

            {step === 2 && (
                <>
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <p className="text-gray-600">A verification code has been sent to your phone or email.</p>
                    <p className="text-xs text-gray-500 mt-2">You should receive a browser notification with your code.</p>
                </div>
                <Input 
                    label="Verification Code" 
                    name="verificationCode" 
                    value={formData.verificationCode} 
                    onChange={handleChange} 
                    placeholder="Enter the 6-digit code"
                />
                <p className="text-sm text-gray-500 mt-2">
                    Didn't receive the code? <button type="button" onClick={handleResendCode} className="text-teal-500 hover:underline">Resend</button>
                </p>
                </>
            )}

            {step === 3 && (
                <>
                <Input 
                    label="Password" 
                    name="password" 
                    type="password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    placeholder="Create a strong password"
                />
                <Input 
                    label="Confirm Password" 
                    name="confirmPassword" 
                    type="password" 
                    value={formData.confirmPassword} 
                    onChange={handleChange} 
                    placeholder="Confirm your password"
                />
                <div className="bg-gray-50 p-3 rounded-lg mt-2">
                    <p className="text-sm text-gray-600">Password must include:</p>
                    <ul className="text-xs text-gray-500 mt-1 space-y-1">
                    <li>• At least 8 characters</li>
                    <li>• At least one uppercase letter</li>
                    <li>• At least one number</li>
                    <li>• At least one special character</li>
                    </ul>
                </div>
                </>
            )}

            <div className="pt-4">
                <button
                type="button"
                onClick={handleNext}
                className="w-full py-3 bg-teal-500 text-white rounded-lg font-medium hover:bg-teal-600 transition shadow-md"
                >
                {step === 3 ? 'Create Account' : 'Continue'}
                </button>
            </div>

            {step === 1 && (
                <p className="text-center text-sm text-gray-600 mt-4">
                Already have an account? <a href="/login" className="text-teal-500 hover:underline">Sign in</a>
                </p>
            )}
            </form>
        </div>
        </div>
    );
}