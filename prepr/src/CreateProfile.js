import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from './firebase';  // adjust this import as necessary
import './UserProfileForm.css';

const UserProfileForm = () => {
  const { user } = useAuth();  // get the currently logged in user
  const [userName, setUserName] = useState("");
  const [userImg, setUserImg] = useState(null);

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
      
      const response = await axios.post('http://127.0.0.1:5000/profile', formData, {
        headers: {
          'Authorization': `Bearer ${idToken}`,
          'Content-Type': 'multipart/form-data'
        }
      });
  
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting profile data:", error);
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
        <input type="file" onChange={handleImageUpload} />
      </label>
      <input type="submit" value="Save" />
    </form>
  );
};

export default UserProfileForm;