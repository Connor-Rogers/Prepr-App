import React, { useState } from 'react';
import axios from 'axios';
import { useAuthState } from './firebase';
import { Link } from 'react-router-dom';
import './SearchRecipe.css';

const SearchRecipe = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [recipes, setRecipes] = useState([]);
    const { user } = useAuthState();

    const handleSearch = async (event) => {
        event.preventDefault();

        const idToken = await user.getIdToken();
        const response = await axios.post(
            `http://127.0.0.1:5000/recipe/search`,
            {
                search_term: searchTerm
            },
            {
                headers: {
                    'Authorization': `Bearer ${idToken}`,
                    'Content-Type': 'application/json',
                }
            }
        );

        setRecipes(response.data);
    };

    return (
        <div className="search-recipe">
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search for recipes"
                    value={searchTerm}
                    onChange={event => setSearchTerm(event.target.value)}
                />
                <button type="submit">Search</button>
            </form>
            <div className="recipe-results">
                {recipes.map(recipe => (
                    <Link key={recipe.id} to={`/recipe/${recipe.id}`}>
                        {recipe.title}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SearchRecipe;
