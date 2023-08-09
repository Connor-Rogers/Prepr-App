import React, { useState } from 'react';
import axios from 'axios';
import { useAuthState } from './firebase';
import './CreateProfile.css';

const UserProfileForm = ({ profileData, setProfileData }) => {
    const { user } = useAuthState();
    const [userName, setUserName] = useState(profileData?.name || '');
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

            const response = await axios.post(
                'https://backend.prepr.app/profile/insert',
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${idToken}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            setProfileData({ ...profileData, name: userName });

            console.log(response.data);
        } catch (error) {
            console.error('Error submitting profile data:', error);
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
