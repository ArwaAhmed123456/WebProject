import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import Header from './Header';
import './Login.css';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const isLoggedIn = await login(username, password);
        if (isLoggedIn) {
            navigate('/');
        } else {
            setError('Invalid username or password');
        }
    };

    const loginWithGoogle = () => {
        window.open("http://localhost:5000/auth/google/callback", "_self");
    };

    return (
        <div className="login-page">
            <Header />
            <div className="login-form">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Login</button>
                    {error && <p className="error">{error}</p>}
                </form>
                <div className="extra-links">
                    <Link to="/signup" className="link">Sign Up</Link>
                </div>
                <div className="google-signin">
                    <h6>Or Sign In Using</h6>
                    <button onClick={loginWithGoogle} className="google-btn">
                        Sign In With Google
                    </button>
                </div>
            </div>
        </div>
    );
}