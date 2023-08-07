import React, { useState } from 'react';
import { useAuthState } from './firebase';
import './Pantry.css';
import { useHistory } from 'react-router-dom';

export const Pantry = () => {
  const history = useHistory();
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

    const idToken = await user.getIdToken();

    const response = await fetch(`http://127.0.0.1:5000/gen3`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${idToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pantryItemsData),
    });

    const data = await response.json();
    setMealPlan(data);
    setLikes({});  // Reset likes/dislikes when fetching new meal plan
  };

  const addRecipe = async (recipe) => {
    const idToken = await user.getIdToken();
    const response = await fetch(`http://127.0.0.1:5000/gen/add`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${idToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: recipe.title,
        instructions: recipe.instructions,
        calories: recipe.calories,
        fats: recipe.fats,
        carbs: recipe.carbs,
        proteins: recipe.proteins,
        ingredients: recipe.ingredients
      }),
    });

    const data = await response.json();
    if (data.message === "Recipe created successfully") {
      history.push(`/recipe/${data.recipe_id}`);
    }
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

  return (
    <div className="pantry-body">
      <h3 className="pantry-h3">Meal Plan Options</h3>
      <input className="pantry-input" type="number" value={days} onChange={(e) => setDays(e.target.value)} min="1" max="7" placeholder="Number of days" />

      <h3 className="pantry-h3">Pantry Items</h3>
      <input className="pantry-input" type="text" value={newPantryItem} onChange={(e) => setNewPantryItem(e.target.value)} />
      <button className="pantry-button" onClick={handlePantryItemSubmit}>+</button>

      <ul className="pantry-ul">
        {pantryItems.map((item, index) => <li className="pantry-li" key={index}>{item}</li>)}
      </ul>

      <button className="pantry-button" onClick={handleMealPlanSubmit}>Submit</button>

      {mealPlan && <div className="pantry-meal-plan-container">
        <h2>Your Meal Plan</h2>
        {Object.keys(mealPlan).map((day) => (
          <div className={`pantry-meal-plan-day ${likes[day]}`} key={day}>
            <h3>{day}</h3>
            <h4>{mealPlan[day].title}</h4>
            <p>Ingredients: {mealPlan[day].ingredients.join(', ')}</p>
            <p>Instructions: {mealPlan[day].instructions}</p>
            <p>Calories: {mealPlan[day].calories}</p>
            <p>Fats: {mealPlan[day].fats}</p>
            <p>Carbs: {mealPlan[day].carbs}</p>
            <p>Proteins: {mealPlan[day].proteins}</p>
            <div className="pantry-meal-plan-actions">
                <button onClick={() => handleLike(day)}>✔️</button>
                <button onClick={() => handleDislike(day)}>❌</button>
                <button onClick={() => addRecipe(mealPlan[day])}>Add to Recipe</button>
            </div>
          </div>
        ))}
      </div>}
    </div>
 );
};

export default Pantry;
