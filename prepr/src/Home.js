import React, { useEffect, useState } from 'react';
import { useAuthState } from './firebase';
import { useHistory } from 'react-router-dom';

export const Home = () => {
  const { user } = useAuthState();
  const [recipes, setRecipes] = useState(null);
  const history = useHistory();
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
      // Handle the success case if needed
    }
  }
  const fetchRecipes = async () => {
    const idToken = await user.getIdToken();
    const response = await fetch(`http://127.0.0.1:5000/gen3`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${idToken}`,
        'Content-Type': 'application/json'
      },
    });


    const data = await response.json();
    setRecipes(Object.values(data));  // Convert the object values into a list
  };
  useEffect(() => {
    fetchRecipes();
  },);


  return (
    <div className="home-container">
      <h1>Welcome to Prepr</h1>
      <p>Your solution to easy meal planning!</p>

      {recipes ? (
        <div className="recipe-grid">
          {recipes.map((recipe, index) => (
            <div className="recipe-card" key={index}>
              <h2>{recipe.title}</h2>
              <p>Calories: {recipe.calories}</p>
              <p>Fats: {recipe.fats}</p>
              <p>Protein: {recipe.proteins}</p>
              <p> Carbohydates: {recipe.carbs}</p>
              <button onClick={() => addRecipe(recipe)}>Add to Recipe</button>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading recipes...</p>
      )}
    </div>
  );
};

export default Home;
