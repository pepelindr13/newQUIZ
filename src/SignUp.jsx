import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css'; // Import the CSS file

const SignUp = () => {
    const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const generateUserId = () => {
    const randomNum = Math.floor(100 + Math.random() * 900);
    return `FS${randomNum}`;
  };

  const emailExists = (email) => {
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        try {
          const user = JSON.parse(localStorage.getItem(key));
          if (user && user.email === email) {
            return true;
          }
        } catch (error) {
          console.error(`Error parsing JSON for key ${key}:`, error);
        }
      }
    }
    return false;
  };

  const validateForm = () => {
    const errors = {};
    if (!firstName) errors.firstName = 'First Name is required';
    if (!lastName) errors.lastName = 'Last Name is required';
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email address is invalid';
    }
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    return errors;
  };

  const handleSignUp = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (emailExists(email)) {
      alert('Email already exists. Please use a different email.');
      return;
    }

    const userId = generateUserId();
    const user = {
      firstName,
      lastName,
      email,
      password,
      userId,
    };
    localStorage.setItem(userId, JSON.stringify(user));
    alert(`Sign up successful! Your User ID is: ${userId} it is important! to write down your USER ID`);
    navigate('/SignIn');
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
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {errors.email && <p className="error">{errors.email}</p>}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {errors.password && <p className="error">{errors.password}</p>}
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
};

export default SignUp;
