import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Home.css';

export const Home = () => {
  const history = useHistory();
  const [mealPlan, setMealPlan] = useState(null);
  const [likes, setLikes] = useState({});

  const handleLoginClick = () => {
    history.push('/auth');
  };

  const handleMealPlanClick = async (days) => {
    const response = await fetch(`http://127.0.0.1:5000/gen${days}`);
    const data = await response.json();
    setMealPlan(data);
    setLikes({});  // Reset likes/dislikes when fetching new meal plan
  };

  const handleLike = (day) => {
    setLikes({...likes, [day]: 'like'});
  };

  const handleDislike = (day) => {
    setLikes({...likes, [day]: 'dislike'});
  };

  return (
    <div className="app-container">
      <div className="form-container">
        <h1>Welcome to Prepr</h1>
        <p>Your solution to easy meal planning!</p>

        <button className="submit-button" onClick={handleLoginClick}>Login/Sign Up</button>
        <p>Use the below options to generate your preferred number of meals:</p>
        <button onClick={() => handleMealPlanClick(1)}>Generate 1 Day Meal Plan</button>
        <button onClick={() => handleMealPlanClick(2)}>Generate 2 Day Meal Plan</button>
        <button onClick={() => handleMealPlanClick(3)}>Generate 3 Day Meal Plan</button>
        <button onClick={() => handleMealPlanClick(4)}>Generate 4 Day Meal Plan</button>
        <button onClick={() => handleMealPlanClick(5)}>Generate 5 Day Meal Plan</button>
        <button onClick={() => handleMealPlanClick(6)}>Generate 6 Day Meal Plan</button>
        <button onClick={() => handleMealPlanClick(7)}>Generate 7 Day Meal Plan</button>

        {mealPlan && <div className="meal-plan-container">
          <h2>Your Meal Plan</h2>
          {Object.keys(mealPlan).map((day) => (
            <div className={`meal-plan-day ${likes[day]}`} key={day}>
              <h3>{day}</h3>
              <p>{mealPlan[day]}</p>
              <div className="meal-plan-actions">
                <button onClick={() => handleLike(day)}>✔️</button>
                <button onClick={() => handleDislike(day)}>❌</button>
              </div>
            </div>
          ))}
        </div>}
      </div>
    </div>
  );
};

export default Home;
