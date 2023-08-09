import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import './EditModal.css';

const EditRecipeModal = ({ recipeData, user, document_id, handleUpdateData, modalIsOpen, setModalIsOpen, recipePhotos }) => {
    const [title, setTitle] = useState(recipeData.title);
    const [instructions, setInstructions] = useState(recipeData.instructions);
    const [calories, setCalories] = useState(recipeData.calories);
    const [fats, setFats] = useState(recipeData.fats);
    const [carbs, setCarbs] = useState(recipeData.carbs);
    const [proteins, setProteins] = useState(recipeData.proteins);
    const [ingredients, setIngredients] = useState(recipeData.ingredients);
    const [currentPhotos, setCurrentPhotos] = useState(recipePhotos || []);
    const [photosToAdd, setPhotosToAdd] = useState([]);
    const [photosToRemove, setPhotosToRemove] = useState([]);

    const handleRemoveCurrentPhoto = (indexToRemove) => {
        setCurrentPhotos(currentPhotos.filter((_, index) => index !== indexToRemove));
        setPhotosToRemove([...photosToRemove, currentPhotos[indexToRemove]]);
    };

    const handlePhotoUpload = (event) => {
        setPhotosToAdd([...photosToAdd, ...event.target.files]);
    };
    const handleCloseModal = () => {
        setModalIsOpen(false);
    };

    const handleAddIngredient = () => {
        setIngredients([...ingredients, { ingredient: "", quantity: "" }]);
    };

    const handleRemoveIngredient = (indexToRemove) => {
        setIngredients(ingredients.filter((_, index) => index !== indexToRemove));
    };


    const handleUpdateRecipe = async (event) => {
        event.preventDefault();
        const updatedRecipe = { ...recipeData, title, instructions, calories, fats, carbs, proteins, ingredients };

        const idToken = await user.getIdToken();
        await axios.put(`https://backend.prepr.app/recipe/${document_id}`, updatedRecipe, {
            headers: {
                'Authorization': `Bearer ${idToken}`,
                'Content-Type': 'multipart/form-data'
            }
        });

        if (photosToAdd.length > 0) {
            const formData = new FormData();
            photosToAdd.forEach((file) => {
                formData.append('photos', file);
            });

            await axios.post(`https://backend.prepr.app/recipe/${document_id}/photos`, formData, {
                headers: {
                    'Authorization': `Bearer ${idToken}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
        }

        if (photosToRemove.length > 0) {
            await axios.delete(`https://backend.prepr.app/recipe/${document_id}/photos`, {
                headers: {
                    'Authorization': `Bearer ${idToken}`
                },
                data: { photos: photosToRemove }
            });
        }

        handleUpdateData(updatedRecipe);
        setModalIsOpen(false); // Close the modal after updating the recipe
    };


    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={handleCloseModal}
            contentLabel="Edit Recipe"
            className="modal"
        >   <button onClick={handleCloseModal} className="close-button">X</button>
            <h2 className="edit-title">Edit Recipe</h2>
            <form onSubmit={handleUpdateRecipe} className="edit-form">
                <label htmlFor="title" className="label">Title</label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="input"
                />

                <label htmlFor="instructions" className="label">Instructions</label>
                <textarea
                    id="instructions"
                    value={instructions}
                    onChange={e => setInstructions(e.target.value)}
                    className="textarea"
                />

                <label htmlFor="calories" className="label">Calories</label>
                <input
                    id="calories"
                    type="number"
                    value={calories}
                    onChange={e => setCalories(e.target.value)}
                    className="input"
                />

                <label htmlFor="fats" className="label">Fats</label>
                <input
                    id="fats"
                    type="number"
                    value={fats}
                    onChange={e => setFats(e.target.value)}
                    className="input"
                />

                <label htmlFor="carbs" className="label">Carbs</label>
                <input
                    id="carbs"
                    type="number"
                    value={carbs}
                    onChange={e => setCarbs(e.target.value)}
                    className="input"
                />

                <label htmlFor="proteins" className="label">Proteins</label>
                <input
                    id="proteins"
                    type="number"
                    value={proteins}
                    onChange={e => setProteins(e.target.value)}
                    className="input"
                />

                <h3 className="ingredients-title">Ingredients:</h3>
                {ingredients.map((ingredient, index) => (
                    <div key={index} className="ingredient-item">
                        <label htmlFor={`ingredient-${index}`} className="label">Ingredient</label>
                        <input
                            id={`ingredient-${index}`}
                            type="text"
                            value={ingredient.ingredient}
                            onChange={e => {
                                const newIngredients = [...ingredients];
                                newIngredients[index].ingredient = e.target.value;
                                setIngredients(newIngredients);
                            }}
                            className="input"
                        />

                        <label htmlFor={`quantity-${index}`} className="label">Quantity</label>
                        <input
                            id={`quantity-${index}`}
                            type="text"
                            value={ingredient.quantity}
                            onChange={e => {
                                const newIngredients = [...ingredients];
                                newIngredients[index].quantity = e.target.value;
                                setIngredients(newIngredients);
                            }}
                            className="input"
                        />

                        <button onClick={() => handleRemoveIngredient(index)} className="remove-button">Remove Ingredient</button>
                    </div>
                ))}
                <button onClick={handleAddIngredient} className="add-button">Add Ingredient</button>

                <h3 className="photos-title">Current Photos:</h3>
                <div className="photos-container">
                    {currentPhotos.map((photoUrl, index) => (
                        <div key={index} className="photo-item">
                            <img src={photoUrl} alt={`Photo ${index}`} className="photo" />
                            <button onClick={() => handleRemoveCurrentPhoto(index)} className="remove-button">Remove Photo</button>
                        </div>
                    ))}
                </div>

                <h3 className="add-photos-title">Add Photos:</h3>
                <input type="file" multiple onChange={handlePhotoUpload} className="file-input" />

                <button type="submit" className="submit-button">Update Recipe</button>
            </form>
        </Modal>
    );

};

export default EditRecipeModal;