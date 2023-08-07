import React, { useState, useEffect, useRef } from 'react';
import { useAuthState } from './firebase';
import { useHistory } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import axios from 'axios';
import './ProfileButton.css';

const ProfileButton = () => {
  const { user } = useAuthState();
  const history = useHistory();
  const [profileOpen, setProfileOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [navMenuOpen, setNavMenuOpen] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);

  const modalRef = useRef(null);
  const navMenuRef = useRef(null);

  // Fetch profile data
  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        setProfileLoading(true);
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
        } finally {
          setProfileLoading(false); // Ensure that the loading state is set to false in all cases
        }
      }
    };

    fetchData();
  }, [user]);

  // Logout handler
  const handleLogout = async () => {
    try {
      await signOut(getAuth());
      history.push('/');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }
  const handleAccountRedirect = () => {
    history.push('/profile');
  }

  const handleHomeRedirect = () => {
    history.push('/home');
  }
  const handleSearchRedirect = () => {
    history.push('/search');
  }
  const handlePlannerRedirect = () => {
    history.push('/meal-plan');
  }
  const handleCreateRedirect = () => {
    history.push('/new-recipe');
  }
  const handlePantryRedirect = () => {
    history.push('/pantry');
  }


  const toggleProfile = () => {
    setProfileOpen(!profileOpen);
  }


  const toggleNavMenu = () => {
    setNavMenuOpen(!navMenuOpen);
  }

  // Handler for click outside of navigation menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navMenuRef.current && !navMenuRef.current.contains(event.target)) {
        setNavMenuOpen(false);
      }
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setProfileOpen(false);
        setModalOpen(false);
      }
    };

    // Attach the listeners to the document
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Detach the listeners from the document
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);



  return (
    <div className="profile-container">
      <button onClick={toggleNavMenu} className="nav-button">
        ☰
      </button>
      <div className="prepr-title-container">
        <div className="prepr-title" onClick={handleHomeRedirect}>Prepr</div>
      </div>
      <div className="profile-button-container" ref={modalRef}>
        {user ? (
          profileLoading ? (
            <div>Loading...</div>
          ) : (
            <button onClick={toggleProfile} className="profile-button">
              <img src={profileData?.imageUrl || user?.photoURL} alt="Profile" />
              <span>{profileData?.name || user?.displayName}</span>
            </button>
          )
        ) : (
          <div></div>
        )}
        {profileOpen && (
          <div className={`profile-modal ${profileOpen ? 'show' : ''}`}>
            <button onClick={handleAccountRedirect}>Account</button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
        {modalOpen && (
          <div className="navigation-modal">
            <button onClick={handleAccountRedirect}>Account</button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
      <div className={`nav-menu ${navMenuOpen ? 'show' : ''}`} ref={navMenuRef}>
        <button onClick={handleHomeRedirect}>Discover</button>
        <button onClick={handlePlannerRedirect}>Meal Plan</button>
        <button onClick={handleSearchRedirect}>Search</button>
        <button onClick={handleCreateRedirect}>Create</button>
        <button onClick={handlePantryRedirect}>Pantry</button>
      </div>
    </div>
  );
}

export default ProfileButton;
