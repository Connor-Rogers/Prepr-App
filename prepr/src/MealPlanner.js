// MealPlanPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthState } from './firebase';
import './MealPlanner.css';

const MealPlanPage = () => {
    const { user } = useAuthState();
    const [mealPlan, setMealPlan] = useState({});

    const fetchMealPlan = async (currentUser) => {
        if (currentUser) {
            console.log("User in fetchMealPlan: ", currentUser);
            const idToken = currentUser.getIdToken ? await currentUser.getIdToken() : null;
            if (idToken) {
                const response = await axios.get(`https://backend.prepr.app/meal_plan/${currentUser.uid}`, {
                    headers: {
                        'Authorization': `Bearer ${idToken}`,
                        'Content-Type': 'application/json',
                    },
                });

                const newMealPlan = { ...response.data };

                for (let day in newMealPlan) {
                    for (let i = 0; i < newMealPlan[day].length; i++) {
                        if (newMealPlan[day][i].id) {
                            const photoResponse = await axios.get(`https://backend.prepr.app/recipe/${newMealPlan[day][i].id}/photos`, {
                                headers: {
                                    'Authorization': `Bearer ${idToken}`,
                                    'Content-Type': 'application/json',
                                },
                            });

                            newMealPlan[day][i].photos = photoResponse.data;
                        }
                    }
                }

                setMealPlan(newMealPlan);
            }
        }
    };

    useEffect(() => {
        fetchMealPlan(user);
    }, [user]);

    const handleRemoveSpecificMeal = async (index, mealIndex) => {
        try {
            if (user) {
                const idToken = await user.getIdToken();
                await axios.delete(`https://backend.prepr.app/meal_plan/${user.uid}/day/remove/${index}/${mealIndex}`, {
                    headers: {
                        'Authorization': `Bearer ${idToken}`,
                        'Content-Type': 'application/json',
                    },
                });
                fetchMealPlan(user);
            }
        } catch (error) {
            console.error('Error removing meal:', error.response ? error.response.data : error);
        }
    };

    return (
        <div className="meal-plan">
            <h2>Meal Plan</h2>
            {Object.keys(mealPlan).map((day, i) => (
                <div key={i} className="meal-plan-day">
                    {mealPlan[day].map((meal, j) => {
                        return (
                            <div key={j} className="meal-plan-meal">
                                {meal.title && <h4>{meal.title}</h4>}
                                {meal.photos.photos[0] && <img src={meal.photos.photos[0]} alt={meal.title} />}
                                {meal.calories && <p>Calories: {meal.calories}</p>}
                                {meal.proteins && <p>Protein: {meal.proteins}</p>}
                                {meal.fats && <p>Fat: {meal.fats}</p>}
                                <button onClick={() => handleRemoveSpecificMeal(i, j)}>Remove this meal</button>
                            </div>
                        )
                    })}
                </div>
            ))}
        </div>
    );
};

export default MealPlanPage;
