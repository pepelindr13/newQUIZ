// src/components/Loader.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Loader = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/signup');
    }, 4000); // 10 seconds

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [navigate]);

  return (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
