import { getAuth, signOut } from 'firebase/auth'
import { useAuthState } from './firebase'
import './App.css';
import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


export const Goals = () => {
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
      const response = await axios.post('http://127.0.0.1:5000/profile/goals', {
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
    }
    finally{
      history.push('/');
    }
  };

  return (
    <div className="app-container">
      <div className="form-container">
        <h1>Welcome {user?.email}</h1>
        <form onSubmit={handleSubmit}>
          <input type="number"  min="1" step="1" placeholder="Height(ft)" value={heightft} onChange={(e) => setHeightft(e.target.value)} />
          <input type="number" min="1" step="1" placeholder="Height(in)" value={heightin} onChange={(e) => setHeightin(e.target.value)} />
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
          <button type="submit">Submit</button>
        </form>
        <button className="submit-button" onClick={() => signOut(getAuth())}>Sign out</button>
      </div>
    </div>
  );
};
