import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Modal from 'react-modal'; // If you're using react-modal
import { useAuthState } from './firebase';

import './Home.css';

export const Home = () => {
  const { user } = useAuthState();
  const history = useHistory();

  // States
  const [mealPlan, setMealPlan] = useState(null);
  const [likes, setLikes] = useState({});
  const [pantryItems, setPantryItems] = useState([]);
  const [newPantryItem, setNewPantryItem] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [days, setDays] = useState('');

  // Functions
  const handleGenerateMealPlanClick = () => {
    setShowModal(true);
  };

  const handleMealPlanSubmit = async () => {
    try {
      if (!days) {
        alert("Please specify the number of days.");
        return;
      }
      const pantryItemsData = { pantryItems, days };
      const idToken = await user.getIdToken();
      const response = await fetch(`http://127.0.0.1:5000/gen`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${idToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pantryItemsData),
      });
      const data = await response.json();
      setMealPlan(data);
      setLikes({});
      setShowModal(false);
    } catch (error) {
      console.error("Error fetching meal plan:", error);
    }
  };

  const handleGenerateNewRecipe = async (day) => {
    try {
      const pantryItemsData = { pantryItems };
      const idToken = await user.getIdToken();
      const response = await fetch(`http://127.0.0.1:5000/genSingle`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${idToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pantryItemsData),
      });
      const data = await response.json();
      setMealPlan(prevMealPlan => ({ ...prevMealPlan, [day]: data }));
    } catch (error) {
      console.error("Error fetching new recipe:", error);
    }
  };

  const handlePantryItemSubmit = () => {
    if (newPantryItem.trim() === '' || pantryItems.includes(newPantryItem)) {
      alert("Please enter a valid pantry item.");
      return;
    }
    setPantryItems([...pantryItems, newPantryItem]);
    setNewPantryItem('');
  };

  const handleLike = (day) => {
    setLikes({ ...likes, [day]: 'like' });
  };

  const handleDislike = (day) => {
    setLikes({ ...likes, [day]: 'dislike' });
    handleGenerateNewRecipe(day);
  };

  return (
    <div className="app-container">
      <div className="form-container">
        <h1>Welcome to Prepr</h1>
        <p>Your solution to easy meal planning!</p>
        <button onClick={handleGenerateMealPlanClick}>Generate Meal Plan</button>

        {showModal && (
          <Modal isOpen={showModal}>
            <h3>Meal Plan Options</h3>
            <input
              type="number"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              min="1"
              max="7"
              placeholder="Number of days" />
            <h3>Pantry Items</h3>
            <input
              type="text"
              value={newPantryItem}
              onChange={(e) => setNewPantryItem(e.target.value)} />
            <button onClick={handlePantryItemSubmit}>+</button>
            <ul>
              {pantryItems.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
            <button onClick={handleMealPlanSubmit}>Submit</button>
          </Modal>
        )}

        {mealPlan && (
          <div className="meal-plan-container">
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
