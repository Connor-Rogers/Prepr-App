import React, { useState, useEffect } from 'react';
import { useAuthState } from './firebase';
import { useHistory } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import axios from 'axios';
import './ProfileButton.css';

const ProfileButton = () => {
  const { user } = useAuthState();
  const history = useHistory();

  const [modalOpen, setModalOpen] = useState(false);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const idToken = await user.getIdToken();

          const profileDataResponse = await axios.get(`http://127.0.0.1:5000/profile/get`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${idToken}`
            }
          });

          const profilePhotoResponse = await axios.get(`http://127.0.0.1:5000/profile/get/photo`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${idToken}`
            }
          });

          setProfileData({
            ...profileDataResponse.data,
            imageUrl: profilePhotoResponse.data.image_url,
          });
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      }
    };

    fetchData();
  }, [user]); 

  const handleLogout = async () => {
    try {
      await signOut(getAuth());
      history.push('/auth');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }

  const handleAccountRedirect = () => {
    history.push('/account');
  }
  const handleHomeRedirect = () => {
    history.push('/');
    }


  const toggleModal = () => {
    setModalOpen(!modalOpen);
  }

  return (
    <div className="profile-container">
      <div></div>
      <div className="prepr-title" onClick={handleHomeRedirect}>Prepr</div>
      {user ? (
        <button onClick={toggleModal} className="profile-button" style={{justifySelf: 'end'}}>
          <img src={profileData?.imageUrl || user?.photoURL} alt="Profile" />
          <span>{profileData?.name || user?.displayName}</span>
        </button>
      ) : (
        <div style={{justifySelf: 'end'}}></div>  // Empty div for when the user is not logged in
      )}
      {modalOpen && (
        <div className="profile-modal">
          <button onClick={handleAccountRedirect}>Account</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default ProfileButton;
