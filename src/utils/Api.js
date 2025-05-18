async function sendVerificationCode(email, phone) {
    console.log("Sending code to:", email || phone);

    return new Promise(resolve => setTimeout(resolve, 1000));
}

async function verifyCode(code) {
    console.log("Verifying code:", code);
    // Simulate always successful for now
    return new Promise(resolve => setTimeout(() => resolve(code === '123456'), 1000));
}

async function submitSignup(data) {
    console.log("Signing up:", data);
    // Simulate API call
    return new Promise(resolve => setTimeout(resolve, 1000));
}
