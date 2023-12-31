import { useAuthState } from './firebase';
import './App.css';
import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './Goals.css'
import { useParams } from 'react-router-dom';

export const Goals = () => {
  const { text } = useParams();
  const { user } = useAuthState();
  const [heightft, setHeightft] = useState('');
  const [heightin, setHeightin] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [goal, setGoal] = useState('');
  const [age, setAge] = useState('');

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const idToken = await user.getIdToken();
      const response = await axios.post('https://backend.prepr.app/profile/goals', {
        heightin,
        heightft,
        weight,
        age,
        gender,
        activityLevel,
        goal
      }, {
        headers: {
          'Authorization': `Bearer ${idToken}`
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting profile data:", error);
    } finally {
      history.push('/home');
    }
  };

  return (
    <div className="app-container">
      <div className="form-container">
        <h1>{text}</h1>
        <h2>Create Goal Specific Recipes</h2>
        <form onSubmit={handleSubmit} className="form-style">
          <div className="height-input-container">
            <input type="number" min="1" step="1" placeholder="Height(ft)" value={heightft} onChange={(e) => setHeightft(e.target.value)} className="height-input" />
            <input type="number" min="1" step="1" placeholder="Height(in)" value={heightin} onChange={(e) => setHeightin(e.target.value)} className="height-input" />
          </div>
          <input type="number" min="1" step="1" placeholder="Weight" value={weight} onChange={(e) => setWeight(e.target.value)} />
          <input type="number" min="1" step="1" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="non-binary">Non-Binary</option>
          </select>
          <select value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)}>
            <option value="">Select Activity Level</option>
            <option value="sedentary">Sedentary</option>
            <option value="light">Light</option>
            <option value="moderate">Moderate</option>
            <option value="active">Active</option>
            <option value="very active">Very Active</option>
          </select>
          <select value={goal} onChange={(e) => setGoal(e.target.value)}>
            <option value="">Select Goal</option>
            <option value="lose">Lose Weight</option>
            <option value="gain">Gain Weight</option>
          </select>
          <div className="center-button">
            <button type="submit" className="submit-button">Update My Goals</button>
          </div>

        </form>
      </div>
    </div>
  );
};
