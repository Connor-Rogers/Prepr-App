// MealPlanPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthState } from './firebase';
import './MealPlanner.css';

const MealPlanPage = () => {
    const { user } = useAuthState();

    const [mealPlan, setMealPlan] = useState({});
    const [selectedDay, setSelectedDay] = useState(1);

    const fetchMealPlan = async () => {
        try {
            const idToken = await user.getIdToken();
            const response = await axios.get(`http://127.0.0.1:5000/meal_plan/${user.uid}`, {
                headers: {
                    'Authorization': `Bearer ${idToken}`,
                },
            });
            setMealPlan(response.data);
        } catch (error) {
            console.error('Error fetching meal plan:', error);
        }
    };

    const handleAddMeal = async () => {
        const idToken = await user.getIdToken();
        const meals = mealPlan[selectedDay] ? mealPlan[selectedDay].length + 1 : 1;
        await axios.put(`http://127.0.0.1:5000/meal_plan/${user.uid}/day/${selectedDay}`, { num_meals: meals }, {
            headers: {
                'Authorization': `Bearer ${idToken}`,
                'Content-Type': 'application/json',
            },
        });
        fetchMealPlan();
    }

    const handleRemoveMeal = async () => {
        const idToken = await user.getIdToken();
        const meals = mealPlan[selectedDay] && mealPlan[selectedDay].length > 0 ? mealPlan[selectedDay].length - 1 : 0;
        await axios.put(`http://127.0.0.1:5000/meal_plan/${user.uid}/day/${selectedDay}`, { num_meals: meals }, {
            headers: {
                'Authorization': `Bearer ${idToken}`,
                'Content-Type': 'application/json',
            },
        });
        fetchMealPlan();
    }

    useEffect(() => {
        fetchMealPlan();
    }, [selectedDay, user]); // Call fetchMealPlan whenever selectedDay or user changes

    return (
        <div className="meal-plan">
            <h2>Meal Plan</h2>
            <div className="meal-plan-day">
                {mealPlan[selectedDay] && mealPlan[selectedDay].length ? mealPlan[selectedDay].map((meal, i) => (
                    <div key={i} className="meal-plan-meal">
                        {meal.title || 'No recipe for this meal'}
                    </div>
                )) : <div>No meals for this day</div>}
                <button onClick={handleAddMeal}>
                    Add meal
                </button>
                <button onClick={handleRemoveMeal}>
                    Remove meal
                </button>
            </div>
        </div>
    );
};

export default MealPlanPage;
