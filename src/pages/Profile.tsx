import React from 'react';
import { ProfileProps } from '../types';

const Profile: React.FC<ProfileProps> = ({ user, onBack }) => {
  return (
    <div className="profile">
      <h2>User Profile</h2>
      <p>Email: {user.email}</p>
      <button onClick={onBack} className="btn">Back to Home</button>
    </div>
  );
};

export default Profile;