import React from 'react';
import { useHistory } from 'react-router-dom';
import './Landing.css';
import logo from './Prepr-Green.png';  // Path to your logo

export const Landing = () => {
  const history = useHistory();

  const handleLoginClick = () => {
    history.push('/auth');
  };

  return (
    <div className="app-container">
      <div className="form-container">
        <img src={logo} alt="Prepr Logo" className="logo" style={{ height: '80px', margin: 'auto', width: 'auto' }} />  {/* Include the logo */}
        <h1>Welcome to Prepr</h1>
        <p>Your solution to easy meal planning!</p>

        <button className="submit-button" onClick={handleLoginClick}>Login/Sign Up</button>

      </div>
    </div>
  );
};

export default Landing;
