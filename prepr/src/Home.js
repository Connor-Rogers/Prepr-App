import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import reactModal from 'react-modal';
import './Home.css';


export const Home = () => {
  const history = useHistory();
  const [mealPlan, setMealPlan] = useState(null);
  const [likes, setLikes] = useState({});

  const handleMealPlanClick = async (days) => {
    const response = await fetch(`http://127.0.0.1:5000/gen${days}`);
    const data = await response.json();
    setMealPlan(data);
    setLikes({});  // Reset likes/dislikes when fetching new meal plan
  };

  const handleMealCardClick = (meal) => {
    history.push(`/meal/${meal.id}`);  // assuming your meals have an 'id' field
  };

  const handleDislike = (day) => {
    setLikes({ ...likes, [day]: 'dislike' });
  };

  return (
    <div className="app-container">
      <button onClick={() => handleMealPlanClick()}>Generate Meal Plan</button>
      {mealPlan && <div className="meal-plan-container">
        <h2>Your Meal Plan</h2>
        {mealPlan.map((meal) => (
          <div className="meal-card" key={meal.id} onClick={() => handleMealCardClick(meal)}>
            <h3>{meal.title}</h3>
            <p>Calories: {meal.calories}</p>
            <p>Fats: {meal.fats}</p>
            <p>Carbs: {meal.carbs}</p>
            <p>Proteins: {meal.proteins}</p>
            <div className="meal-card-actions">
            </div>
          </div>
        ))}
      </div>}
    </div>
  );

};

export default Home;
