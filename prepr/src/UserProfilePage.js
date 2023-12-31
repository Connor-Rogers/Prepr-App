import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthState } from './firebase';
import UserProfileForm from './UserProfileForm';

const UserProfilePage = () => {
    const { user } = useAuthState(); // get the currently logged in user
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const idToken = await user.getIdToken();
                const response = await axios.get('https://backend.prepr.app/profile/get', {
                    headers: {
                        'Authorization': `Bearer ${idToken}`,
                    },
                });
                setProfileData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching profile data:', error);
                setLoading(false);
            }
        };
        fetchProfileData();
    }, [user]);

    return (
        <div className="user-profile-page">
            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <h2>Edit Profile Information</h2>
                    <UserProfileForm
                        profileData={profileData}
                        setProfileData={setProfileData}
                    />
                </>
            )}
        </div>
    );
};

export default UserProfilePage;