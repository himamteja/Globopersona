import { useState } from 'react';
import './AuthModal.css';

export default function AuthModal({ onClose, onLogin, onRegister }) {
    const [activeTab, setActiveTab] = useState('login');
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    // Login form state
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: '',
    });

    // Register form state
    const [registerForm, setRegisterForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    // Forgot password state
    const [forgotEmail, setForgotEmail] = useState('');

    const handleLoginChange = (e) => {
        setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
    };

    const handleRegisterChange = (e) => {
        setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();

        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');

        // Find user
        const user = users.find(
            (u) => u.email === loginForm.email && u.password === loginForm.password
        );

        if (user) {
            // Update last login time and ensure missing fields are populated
            const updatedUser = {
                ...user,
                id: user.id || Date.now(),
                registeredAt: user.registeredAt || user.lastLogin || new Date().toISOString(),
                lastLogin: new Date().toISOString()
            };

            // Update in localStorage users array
            const updatedUsers = users.map(u => (u.email === user.email ? updatedUser : u));
            localStorage.setItem('users', JSON.stringify(updatedUsers));

            // Login successful
            onLogin(updatedUser);
            onClose();
        } else {
            // Login failed
            setErrorMessage('Invalid email or password. Please try again.');
            setShowError(true);
        }
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();

        // Validation
        if (registerForm.password !== registerForm.confirmPassword) {
            setErrorMessage('Passwords do not match!');
            setShowError(true);
            return;
        }

        if (registerForm.password.length < 6) {
            setErrorMessage('Password must be at least 6 characters long!');
            setShowError(true);
            return;
        }

        // Get existing users
        const users = JSON.parse(localStorage.getItem('users') || '[]');

        // Check if email already exists
        if (users.some((u) => u.email === registerForm.email)) {
            setErrorMessage('Email already registered. Please login instead.');
            setShowError(true);
            return;
        }

        // Create new user
        const newUser = {
            id: Date.now(),
            name: registerForm.name,
            email: registerForm.email,
            password: registerForm.password,
            registeredAt: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
        };

        // Save to localStorage
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // Show success message
        setSuccessMessage('Your registration has been successful!');
        setShowSuccess(true);
    };

    const handleForgotPasswordSubmit = (e) => {
        e.preventDefault();

        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find((u) => u.email === forgotEmail);

        if (user) {
            setSuccessMessage(`Password reset link has been sent to ${forgotEmail}`);
            setShowSuccess(true);
            setShowForgotPassword(false);
        } else {
            setErrorMessage('Email not found. Please check and try again.');
            setShowError(true);
        }
    };

    const handleSuccessClose = () => {
        setShowSuccess(false);
        if (successMessage.includes('registration')) {
            // Redirect to login tab
            setActiveTab('login');
            setRegisterForm({ name: '', email: '', password: '', confirmPassword: '' });
        }
    };

    const handleErrorClose = () => {
        setShowError(false);
        setErrorMessage('');
    };

    // Success Modal
    if (showSuccess) {
        return (
            <div className="auth-overlay" onClick={handleSuccessClose}>
                <div className="auth-modal success-modal" onClick={(e) => e.stopPropagation()}>
                    <div className="success-icon">✓</div>
                    <h2 className="success-title">Success!</h2>
                    <p className="success-message">{successMessage}</p>
                    <button className="btn btn-primary" onClick={handleSuccessClose}>
                        OK
                    </button>
                </div>
            </div>
        );
    }

    // Error Modal
    if (showError) {
        return (
            <div className="auth-overlay" onClick={handleErrorClose}>
                <div className="auth-modal error-modal" onClick={(e) => e.stopPropagation()}>
                    <div className="error-icon">✕</div>
                    <h2 className="success-title">Error</h2>
                    <p className="success-message">{errorMessage}</p>
                    <button className="btn btn-primary" onClick={handleErrorClose}>
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    // Forgot Password Modal
    if (showForgotPassword) {
        return (
            <div className="auth-overlay" onClick={() => setShowForgotPassword(false)}>
                <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
                    <button className="auth-modal-close" onClick={() => setShowForgotPassword(false)}>
                        ✕
                    </button>
                    <div className="auth-modal-header">
                        <div className="auth-modal-icon">🔒</div>
                        <h2 className="auth-modal-title">Forgot Password?</h2>
                        <p className="auth-modal-subtitle">
                            Enter your email address and we'll send you a reset link
                        </p>
                    </div>

                    <form className="auth-form" onSubmit={handleForgotPasswordSubmit}>
                        <div className="form-group">
                            <label className="form-label">Email Address</label>
                            <input
                                type="email"
                                className="form-input"
                                placeholder="Enter your email"
                                value={forgotEmail}
                                onChange={(e) => setForgotEmail(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                            Send Reset Link
                        </button>
                    </form>

                    <div className="auth-link">
                        <button onClick={() => setShowForgotPassword(false)}>
                            Back to Login
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Main Auth Modal (Login/Register)
    return (
        <div className="auth-overlay" onClick={onClose}>
            <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
                <button className="auth-modal-close" onClick={onClose}>
                    ✕
                </button>

                <div className="auth-modal-header">
                    <div className="auth-modal-icon">🚀</div>
                    <h2 className="auth-modal-title">Welcome to Globopersona</h2>
                    <p className="auth-modal-subtitle">Marketing Automation Platform</p>
                </div>

                {/* Tabs */}
                <div className="auth-tabs">
                    <button
                        className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
                        onClick={() => setActiveTab('login')}
                    >
                        Login
                    </button>
                    <button
                        className={`auth-tab ${activeTab === 'register' ? 'active' : ''}`}
                        onClick={() => setActiveTab('register')}
                    >
                        Register
                    </button>
                </div>

                {/* Login Form */}
                {activeTab === 'login' && (
                    <form className="auth-form" onSubmit={handleLoginSubmit}>
                        <div className="form-group">
                            <label className="form-label">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                className="form-input"
                                placeholder="Enter your email"
                                value={loginForm.email}
                                onChange={handleLoginChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                name="password"
                                className="form-input"
                                placeholder="Enter your password"
                                value={loginForm.password}
                                onChange={handleLoginChange}
                                required
                            />
                        </div>

                        <div className="forgot-password">
                            <button type="button" onClick={() => setShowForgotPassword(true)}>
                                Forgot Password?
                            </button>
                        </div>

                        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 'var(--spacing-md)' }}>
                            Login to Account
                        </button>

                        <div className="auth-link">
                            Don't have an account?{' '}
                            <button type="button" onClick={() => setActiveTab('register')}>
                                Click here to register
                            </button>
                        </div>
                    </form>
                )}

                {/* Register Form */}
                {activeTab === 'register' && (
                    <form className="auth-form" onSubmit={handleRegisterSubmit}>
                        <div className="form-group">
                            <label className="form-label">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                className="form-input"
                                placeholder="Enter your full name"
                                value={registerForm.name}
                                onChange={handleRegisterChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                className="form-input"
                                placeholder="Enter your email"
                                value={registerForm.email}
                                onChange={handleRegisterChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                name="password"
                                className="form-input"
                                placeholder="Create a password (min 6 characters)"
                                value={registerForm.password}
                                onChange={handleRegisterChange}
                                required
                                minLength={6}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                className="form-input"
                                placeholder="Confirm your password"
                                value={registerForm.confirmPassword}
                                onChange={handleRegisterChange}
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                            Create Account
                        </button>

                        <div className="auth-link">
                            Already have an account?{' '}
                            <button type="button" onClick={() => setActiveTab('login')}>
                                Click here to login
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
