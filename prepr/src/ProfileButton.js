import React, { useState } from 'react';
import { useAuthState } from './firebase';  // adjust this import as necessary
import { useHistory } from 'react-router-dom';
import './App.css';

const ProfileButton = () => {
  const { user } = useAuthState();  // get the currently logged in user
  const history = useHistory();

  const [modalOpen, setModalOpen] = useState(false);

  const handleLogout = () => {
    // Implement your logout functionality here
    // then redirect to the desired page
    history.push('/auth');
  }

  const handleAccountRedirect = () => {
    history.push('/account');
  }

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  }

  return (
    <div className="profile-container">
      <button onClick={toggleModal} className="profile-button">
        <img src={user?.photoURL} alt="Profile" />
        <span>{user?.displayName}</span>
      </button>

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