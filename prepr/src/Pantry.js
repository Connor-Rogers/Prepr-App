import React, { useState } from 'react';
import { useAuthState } from './firebase';
import './Pantry.css';


export const Pantry = () => {
  const { user } = useAuthState();
  const [newPantryItem, setNewPantryItem] = useState('');
  const [pantryItems, setPantryItems] = useState([]);
  const [days, setDays] = useState('');
  const [mealPlan, setMealPlan] = useState(null);
  const [likes, setLikes] = useState({});

  const handlePantryItemSubmit = () => {
    setPantryItems([...pantryItems, newPantryItem]);
    setNewPantryItem('');
  };

  const handleMealPlanSubmit = async () => {
    const pantryItemsData = {
      pantryItems,
      days,
    };

    // Get the id token
    const idToken = await user.getIdToken();

    const response = await fetch(`http://127.0.0.1:5000/gen3`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${idToken}`, // Include the Authorization header
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pantryItemsData),
    });

    const data = await response.json();
    setMealPlan(data);
    setLikes({});  // Reset likes/dislikes when fetching new meal plan
  };

  const handleGenerateNewRecipe = async (day) => {
    const pantryItemsData = {
      pantryItems,
    };
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
  };

  const handleDislike = (day) => {
    setLikes({ ...likes, [day]: 'dislike' });
    handleGenerateNewRecipe(day);
  };

  const handleLike = (day) => {
    setLikes({ ...likes, [day]: 'like' });
    handleGenerateNewRecipe(day);
  };
//  const handleAddToMealPlan = async (recipeId) => {
//    const idToken = await user.getIdToken();
//    const recipeId = '123'; // Replace with the actual recipe ID
//    const response = await fetch(`http://127.0.0.1:5000/meal_plan/${user.uid}/recipe/${recipeId}`, {
//      method: 'POST',
//      headers: {
//        'Authorization': `Bearer ${idToken}`,
//        'Content-Type': 'application/json'
//      },
//    });
  
 //   const data = await response.json();
//    if (response.ok) {
//      // Update the state or do something else with the data
//    } else {
//      console.error(data.error);
//    }
//  };
  

  return (
    <div>
      <h3>Meal Plan Options</h3>
      <input type="number" value={days} onChange={(e) => setDays(e.target.value)} min="1" max="7" placeholder="Number of days" />

      <h3>Pantry Items</h3>
      <input type="text" value={newPantryItem} onChange={(e) => setNewPantryItem(e.target.value)} />
      <button onClick={handlePantryItemSubmit}>+</button>

      <ul>
        {pantryItems.map((item, index) => <li key={index}>{item}</li>)}
      </ul>

      <button onClick={handleMealPlanSubmit}>Submit</button>

      {mealPlan && <div className="meal-plan-container">
        <h2>Your Meal Plan</h2>
        {Object.keys(mealPlan).map((day) => (
        <div className={`meal-plan-day ${likes[day]}`} key={day}>
          <h3>{day}</h3>
          <p>{mealPlan[day]}</p>
          <div className="meal-plan-actions">
            <button onClick={() => handleLike(day)}>✔️</button>
            <button onClick={() => handleDislike(day)}>❌</button>
            {/*<button onClick={() => handleAddToMealPlan(recipeId)}>Add to Meal Plan</button> {/* Replace recipeId with the actual ID */}
      </div>
    </div>
  ))}
</div>}

    </div>
  );
};

export default Pantry;
