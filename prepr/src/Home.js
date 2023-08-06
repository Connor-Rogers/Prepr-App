import React, { useEffect, useState } from 'react';
import { useAuthState } from './firebase';

export const Home = () => {
  const { user } = useAuthState();
  const [recipes, setRecipes] = useState(null);

  const fetchRecipes = async () => {
    const idToken = await user.getIdToken();
    const response = await fetch(`http://127.0.0.1:5000/gen3`, { // call your endpoint
      method: 'POST', // use a POST request
      headers: {
        'Authorization': `Bearer ${idToken}`,
        'Content-Type': 'application/json'
      },
    });

    const data = await response.json();
    setRecipes(data);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className="home-container">
      <h1>Welcome to Prepr</h1>
      <p>Your solution to easy meal planning!</p>

      {recipes ? (
        <div className="recipe-grid">
          {recipes.map((recipe, index) => (
            <div className="recipe-card" key={index}>
              <h2>{recipe.title}</h2>
              <p>{recipe.instructions}</p>
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
