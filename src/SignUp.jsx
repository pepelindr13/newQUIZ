import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css'; // Import the CSS file

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    if (!firstName) errors.firstName = 'First name is required';
    if (!lastName) errors.lastName = 'Last name is required';
    if (!phoneNumber) errors.phoneNumber = 'Phone number is required';
    if (!password) errors.password = 'Password is required';

    // Phone number validation
    const phoneRegex = /^(081|080|090|070)\d{8}$/;
    if (!phoneRegex.test(phoneNumber)) {
      errors.phoneNumber = 'Phone number must be 11 digits and start with 081, 080, 090, or 070';
    }

    // Password validation
    if (password.length < 6) {
      errors.password = 'Password must be at least six characters long';
    }

    return errors;
  };

  const handleSignup = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Check for existing phone number
    const allUsers = Object.keys(localStorage).map((key) => {
      try {
        return JSON.parse(localStorage.getItem(key));
      } catch (e) {
        return null;
      }
    }).filter(user => user !== null);

    const phoneExists = allUsers.some(user => user.phoneNumber === phoneNumber);
    if (phoneExists) {
      alert('This phone number is already registered');
      return;
    }

    const userId = `FS${Math.floor(Math.random() * 900) + 100}`;
    const user = { firstName, lastName, phoneNumber, password, userId, completed: false };

    localStorage.setItem(userId, JSON.stringify(user));

    alert(`Signup successful! Your User ID is: ${userId}`);
    navigate('/signin');
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      {errors.firstName && <p className="error">{errors.firstName}</p>}
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      {errors.lastName && <p className="error">{errors.lastName}</p>}
      <input
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {errors.password && <p className="error">{errors.password}</p>}
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
};

export default Signup;
