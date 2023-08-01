// RecipeView.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuthState } from './firebase';
import './ViewRecipe.css';
import EditRecipeModal from './EditModal'; // import the new component
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RecipeView = () => {
    const { document_id } = useParams();
    const [recipeData, setRecipeData] = useState(null);
    const [recipePhotos, setRecipePhotos] = useState([]);
    const [username, setUsername] = useState("");
    const { user } = useAuthState();
    const [showEditModal, setShowEditModal] = useState(false);
    const [isAuthor, setIsAuthor] = useState(false);
    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    useEffect(() => {
        // Fetch likes for the recipe
        const fetchLikes = async () => {

            try {
                const idToken = await user.getIdToken();
                const response = await axios.get(
                    `http://127.0.0.1:5000/recipe/${document_id}/like`,
                    {
                        headers: {
                            'Authorization': `Bearer ${idToken}`,
                        },
                    }
                );
                const likesData = response.data;
                setLikesCount(likesData.likes.length);
                setLiked(likesData.likes.includes(user.uid));
            } catch (error) {
                console.error('Error fetching likes:', error);
            }
        };
        fetchLikes();
    }, [document_id, user]);
    const handleAddToMealPlan = async () => {
        try {
            const idToken = await user.getIdToken();
            const response = await axios.post(
                `http://127.0.0.1:5000/meal_plan/${user.uid}/recipe/${document_id}`,
                {},
                {
                    headers: {
                        'Authorization': `Bearer ${idToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            // Show a success message
            toast.success(response.data.message);
        } catch (error) {
            // Show an error message
            toast.error('Error adding recipe to meal plan: ' + error.message);
        }
    };
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

    const handleLike = async () => {
        try {
            const idToken = await user.getIdToken();
            const likeStatus = !liked; // Toggle the like status
            const response = await axios.post(
                `http://127.0.0.1:5000/recipe/${document_id}/like`,
                { like: likeStatus },
                {
                    headers: {
                        'Authorization': `Bearer ${idToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            setLiked(likeStatus);
            setLikesCount(prevCount => likeStatus ? prevCount + 1 : prevCount - 1);
            // Handle the response or update the 'likes' count as needed
        } catch (error) {
            console.error('Error updating like status:', error);
        }
    };


    useEffect(() => {
        if (recipeData && user) {
            setIsAuthor(recipeData.author === user.uid);
        }
    }, [recipeData, user]);

    const handleUpdateData = (updatedRecipe) => {
        setRecipeData(updatedRecipe);
    };
    const handleDeleteRecipe = async () => {
        try {
            const idToken = await user.getIdToken();
            await axios.delete(`http://127.0.0.1:5000/recipe/${document_id}`, {
                headers: {
                    'Authorization': `Bearer ${idToken}`,
                },
            });
            // Redirect or show a success message after successful deletion
        } catch (error) {
            console.error('Error deleting recipe:', error);
            // Show an error message if deletion fails
        }
    };

    if (!recipeData || !username) {
        return <div>Loading...</div>;
    }

    return (
        <div className="recipe-view">
            <ToastContainer />
            {isAuthor && (
                <div className="Button-Container">
                    <button onClick={() => setShowEditModal(true)}>
                        Edit
                    </button>
                    <button onClick={handleDeleteRecipe}>Delete</button>
                </div>

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
            <button onClick={handleLike}>{liked ? 'Unlike' : 'Like'}</button>
            <p>{likesCount} {likesCount === 1 ? 'Like' : 'Likes'}</p>
            <button onClick={handleAddToMealPlan}>Add to Meal Plan</button>


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
