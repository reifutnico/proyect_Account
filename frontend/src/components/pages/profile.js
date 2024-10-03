import React from 'react';
import '../../styles/Profile.css';

const Profile = () => {
    const userData = JSON.parse(localStorage.getItem('userData')) || {};

    return (
        <div className="profile-container">
            <h2 className="profile-title">User Profile</h2>
            <div className="profile-card">
                <h3 className="profile-username">{userData.username}</h3>
                <p className="profile-email">{userData.email}</p>
                <p className="profile-created-at">Created At: {new Date(userData.created_at).toLocaleString()}</p>
                <p className="profile-updated-at">Updated At: {new Date(userData.updated_at).toLocaleString()}</p>
                <p className="profile-role">Role ID: {userData.role_id}</p>
            </div>
        </div>
    );
};

export default Profile;

