import React from 'react';
import { authService } from 'fbase';
import { useHistory } from 'react-router-dom';

const Profile = () => {
    // const history = useHistory(); //히스토리 이동
    const handleLogout = () => {
        authService.signOut();
        // history.push("/")
    } 
    return (
        <div>
            profile
            <button onClick={handleLogout}>logout</button>
        </div>
    );
};

export default Profile;