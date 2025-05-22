import { useState } from 'react';

export default function SignupForm({ onComplete }) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        phone: '',
        verificationCode: '',
        password: '',
        confirmPassword: ''
    });
    
    const [generatedCode, setGeneratedCode] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const generateVerificationCode = () => {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        return code;
    };

    const sendVerificationCode = async (email, phone) => {
        const newCode = generateVerificationCode();
        setGeneratedCode(newCode);
        
        console.log(`CODE GENERATED: ${newCode}`);
        console.log(`[Development Only] Your verification code is: ${newCode}`);
        
        try {
            if ('Notification' in window) {
                if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
                    await Notification.requestPermission();
                }
                if (Notification.permission === 'granted') {
                    new Notification('Verification Code', {
                        body: `Your verification code is: ${newCode}`,
                    });
                } else {
                    console.warn('Notification permission not granted. Code is in console.');
                }
            } else {
                console.warn('Browser does not support notifications. Code is in console.');
            }
        } catch (error) {
            console.error('Error showing notification:', error);
        }
        
        return new Promise((resolve) => setTimeout(resolve, 1000));
    };

    const verifyCode = async (enteredCode) => {
        console.log(`Verifying code: ${enteredCode} against ${generatedCode}`);
        return enteredCode === generatedCode;
    };

    const submitSignup = async (data) => {
        console.log('Final signup data:', data);
        
        const user = {
            name: data.name,
            username: data.username,
            email: data.email,
            phone: data.phone,
            password: data.password
        };
        
        const existingUsers = JSON.parse(localStorage.getItem('signupUsers') || '[]');
        existingUsers.push(user);
        localStorage.setItem('signupUsers', JSON.stringify(existingUsers));
        
        localStorage.setItem('currentUser', JSON.stringify({ 
            name: user.name, 
            email: user.email 
        }));
        
        return new Promise((resolve) => setTimeout(resolve, 1000));
    };

    const handleNext = async () => {
        if (step === 1) {
            await sendVerificationCode(formData.email, formData.phone);
            setStep(2);
        } else if (step === 2) {
            const isValid = await verifyCode(formData.verificationCode);
            if (isValid) {
                setStep(3);
            } else {
                alert('Invalid code. Please try again.');
            }
        } else if (step === 3) {
            if (formData.password !== formData.confirmPassword) {
                alert("Passwords don't match.");
                return;
            }
            await submitSignup(formData);
            if (onComplete) {
                onComplete();
            } else {
                window.location.href = '/login';
            }
        }
    };

    const handleResendCode = async () => {
        await sendVerificationCode(formData.email, formData.phone);
        console.log(`A new verification code has been sent to ${formData.email || formData.phone}`);
    };

    return { 
        step, 
        formData, 
        handleChange, 
        handleNext,
        handleResendCode
    };
}