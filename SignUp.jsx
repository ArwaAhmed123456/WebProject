import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import './SignUp.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const validatePassword = (password) => {
    const PasswordVal = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return PasswordVal.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must contain at least 8 characters, including uppercase, lowercase, number, and special character.');
      return;
    }

    setError(''); // Reset any previous errors

    try {
      // Send a POST request to the backend signup route
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        username,
        email,
        password,
      });

      // If the request is successful, navigate to the login page
      console.log(response.data.message); // Log the success message
      navigate('/login'); // Redirect to login page after successful sign-up
    } catch (err) {
      // Handle any errors
      setError(err.response?.data?.error || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="sign-up-page">
      <Header />
      <div className="sign-up-form"> 
        <src img="../images/1.jpg" />
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div>
            <input
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
              required
            />
            <button type="button" onClick={togglePasswordVisibility}>
              <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
            </button>
          </div>
          <div>
            <input
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {isPasswordFocused && (
            <div className="password-requirements">
              <ul>
                <li>
                  <FontAwesomeIcon icon={validatePassword(password) ? faCheckCircle : faExclamationCircle} className={validatePassword(password) ? 'text-success' : 'text-danger'} />
                  <span>At least 8 characters, including uppercase, lowercase, number, and special character</span>
                </li>
              </ul>
            </div>
          )}
          <button type="submit">Sign Up</button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}