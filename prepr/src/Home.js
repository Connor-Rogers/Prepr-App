import React from 'react';
import { useHistory } from 'react-router-dom';
import './Home.css';

export const Home = () => {
  const history = useHistory();

  const handleLoginClick = () => {
    history.push('/auth');
  };

  return (
    <div className="app-container">
  
      <div className="form-container">
        <h1>Welcome to Prepr</h1>
        <p>Your solution to easy meal planning!</p>

        <button className="submit-button" onClick={handleLoginClick}>Login/Sign Up</button>

      </div>
    </div>
  );
};
