import React, { useState } from 'react';
import axios from 'axios';
import { useAuthState } from './firebase';
import './CreateProfile.css';
import { useHistory } from 'react-router-dom';


const UserProfileForm = () => {
  const { user } = useAuthState();  // get the currently logged in user
  const [userName, setUserName] = useState("");
  const [userImg, setUserImg] = useState(null);
  const history = useHistory();

  const handleNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleImageUpload = (event) => {
    setUserImg(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const idToken = await user.getIdToken();
      const formData = new FormData();
      formData.append('name', userName);
      formData.append('image', userImg);

      const response = await axios.post('http://127.0.0.1:5000/profile/insert', formData, {
        headers: {
          'Authorization': `Bearer ${idToken}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(response.data);
    } catch (error) {
      console.error("Error submitting profile data:", error);
    } finally {
      history.push('/new-goals/Signup');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="user-profile-form">
      <label>
        Name:
        <input type="text" value={userName} onChange={handleNameChange} />
      </label>
      <label>
        Profile picture:
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </label>
      <input type="submit" value="Save" />
    </form>
  );
};

export default UserProfileForm;