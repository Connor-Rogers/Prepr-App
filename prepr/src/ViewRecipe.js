// RecipeView.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuthState } from './firebase';
import './ViewRecipe.css';
import EditRecipeModal from './EditModal'; // import the new component

const RecipeView = () => {
    const { document_id } = useParams();
    const [recipeData, setRecipeData] = useState(null);
    const [recipePhotos, setRecipePhotos] = useState([]);
    const [username, setUsername] = useState("");
    const { user } = useAuthState();
    const [showEditModal, setShowEditModal] = useState(false);
    const [isAuthor, setIsAuthor] = useState(false);


    useEffect(() => {
        const fetchRecipeData = async () => {
            try {
                const idToken = await user.getIdToken();
                console.log(user);
                console.log(user.uid);
                const response = await axios.get(`http://127.0.0.1:5000/recipe/${document_id}`, {
                    headers: {
                        'Authorization': `Bearer ${idToken}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });
                setRecipeData(response.data);
                const photosResponse = await axios.get(`http://127.0.0.1:5000/recipe/${document_id}/photos`, {
                    headers: {
                        'Authorization': `Bearer ${idToken}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });

                setRecipePhotos(photosResponse.data.photos);

                const usernameResponse = await axios.get(`http://127.0.0.1:5000/profile/get/username`, {
                    headers: {
                        'Authorization': `Bearer ${idToken}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });

                setUsername(usernameResponse.data.username);
            } catch (error) {
                console.error('Error fetching recipe data:', error);
            }
        };
        fetchRecipeData();
    }, [document_id, user]);

    useEffect(() => {
        if (recipeData && user) {
            setIsAuthor(recipeData.author === user.uid);
        }
    }, [recipeData, user]);

    const handleUpdateData = (updatedRecipe) => {
        setRecipeData(updatedRecipe);
    };

    if (!recipeData || !username) {
        return <div>Loading...</div>;
    }

    return (
        <div className="recipe-view">
            {isAuthor && (
                <button onClick={() => setShowEditModal(true)}>
                    Edit
                </button>
            )}
            {showEditModal && (
                <EditRecipeModal
                    recipeData={recipeData}
                    user={user}
                    document_id={document_id}
                    recipePhotos={recipePhotos}
                    handleUpdateData={handleUpdateData}
                    modalIsOpen={showEditModal}
                    setModalIsOpen={setShowEditModal}
                />
            )}
            <h2>{recipeData.title}</h2>
            <h3>Submitted by: {username}</h3>
            <p>Calories: {recipeData.calories}</p>
            <p>Fats: {recipeData.fats}</p>
            <p>Carbs: {recipeData.carbs}</p>
            <p>Proteins: {recipeData.proteins}</p>
            <h3>Ingredients:</h3>
            <ul className="ingredients">
                {recipeData.ingredients.map((ingredient, index) => (
                    <li key={index}>
                        {ingredient.ingredient} - {ingredient.quantity}
                    </li>
                ))}
            </ul>
            <h3>Instructions:</h3>
            <p>{recipeData.instructions}</p>
            <h3>Photos:</h3>
            <div className="photos-container">
                {recipePhotos.map((photo, index) => (
                    <div key={index}>
                        <img src={photo} alt={`Photo ${index}`} />
                    </div>
                ))}
            </div>


        </div>
    );
};

export default RecipeView;
