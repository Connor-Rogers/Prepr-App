import { getAuth, signOut } from 'firebase/auth'
import { useAuthState } from './firebase'
import './App.css';
import { useState } from 'react';
import axios from 'axios';


export const Home = () => {
  const { user } = useAuthState();
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [goal, setGoal] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const idToken = await user.getIdToken();
      const response = await axios.post('http://127.0.0.1:5000/profile', {
        height,
        weight,
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
    }
  };

  return (
    <div className="app-container">
      <div className="form-container">
        <h1>Welcome {user?.email}</h1>
        <form onSubmit={handleSubmit}>
          <input type="number" placeholder="Height" value={height} onChange={(e) => setHeight(e.target.value)} />
          <input type="number" placeholder="Weight" value={weight} onChange={(e) => setWeight(e.target.value)} />
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
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
          <button type="submit">Submit</button>
        </form>
        <button className="submit-button" onClick={() => signOut(getAuth())}>Sign out</button>
      </div>
    </div>
  );
};
