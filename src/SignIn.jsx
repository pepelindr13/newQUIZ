import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css'; // Import the CSS file

const SignIn = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  
  const validateForm = () => {
    const errors = {};
    if (!userId) errors.userId = 'User ID is required';
    if (!password) errors.password = 'Password is required';
    return errors;
  };

  const handleSignIn = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const user = JSON.parse(localStorage.getItem(userId));

    if (user && user.password === password) {
      if (user.completed) {
        alert('You have already completed the test and cannot log in again.');
        return;
      }
      localStorage.setItem('currentUserId', userId); // Store current user ID
      navigate('/quiz');
    } else {
      alert('Invalid User ID or Password');
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign In</h2>
      <input
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      {errors.userId && <p className="error">{errors.userId}</p>}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {errors.password && <p className="error">{errors.password}</p>}
      <button className='mb-3 button' onClick={handleSignIn}>Sign In</button>
      <Link  style={{textDecoration:'none'}} to={'/signup'} className='text-center fw-bold mt-3 text-dark'>New user? <a href="/signup" className='text-decoration-none'>Sign Up</a></Link>
      
    </div>
  );
};

export default SignIn;
