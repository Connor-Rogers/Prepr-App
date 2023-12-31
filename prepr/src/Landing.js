import React from 'react';
import { useHistory } from 'react-router-dom';
import './Landing.css';
import logo from './Prepr-Green.png';

export const Landing = () => {
  const history = useHistory();

  const handleLoginClick = () => {
    history.push('/auth');
  };

  return (
    <div className="app-container">
      <div className="form-container">
        <img src={logo} alt="Prepr Logo" className="logo" style={{ height: '200px', margin: 'auto', width: 'auto' }} />  {/* Include the logo */}
        <p className='welcome-msg'>Your solution to easy meal planning!</p>

        <button className="submit-button" onClick={handleLoginClick}>Login/Sign Up</button>

      </div>
    </div>
  );
};

export default Landing;
