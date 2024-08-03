import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Import the CSS file
import Logo from '../src/Images/logofire.png'
const Home = () => {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate('/loader');
  };

  return (
    <div className="home-container shadow-lg">
      <h1>Welcome to 
        <span className='d-flex' style={{alignItems:"center"}}>
        <span><img style={{height:"70px"}} src={Logo} alt="" /></span>
        <div style={{fontSize:"3.0rem", fontWeight:"bolder"}}>BEELVEED</div>
        </span></h1>
      <p>Get ready to test your knowledge with our fire service quiz test.</p>
      <div class="container">
  <button className="button" onClick={handleStartQuiz}>START QUIZ</button>
</div>


    </div>
  );
};

export default Home;
