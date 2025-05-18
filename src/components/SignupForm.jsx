    import { useState } from 'react';

    export default function SignupForm () {
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

    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value
        });
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
        window.location.href = '/login';
        }
    };

    return (
        <div>
        {step === 1 && (
            <>
            <input type="text" name="name" placeholder="Name" onChange={handleChange} />
            <input type="text" name="username" placeholder="Username" onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} />
            <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} />
            </>
        )}

        {step === 2 && (
            <>
            <p>A verification code was sent to your phone or email.</p>
            <input type="text" name="verificationCode" placeholder="Verification Code" onChange={handleChange} />
            </>
        )}

        {step === 3 && (
            <>
            <input type="password" name="password" placeholder="Password" onChange={handleChange} />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} />
            </>
        )}

        <button onClick={handleNext}>Next</button>
        </div>
    );
    }


    async function sendVerificationCode(email, phone) {
    console.log(`Sending code to ${email || phone}`);
    return new Promise((resolve) => setTimeout(resolve, 1000));
    }

    async function verifyCode(code) {
    console.log(`Verifying code ${code}`);
    return new Promise((resolve) => setTimeout(() => resolve(code === '123456'), 1000));
    }

    async function submitSignup(data) {
    console.log('Final signup data:', data);
    return new Promise((resolve) => setTimeout(resolve, 1000));
}





