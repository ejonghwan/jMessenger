import React, { useState } from 'react';
import { authService } from 'fbase';
import { useHistory } from 'react-router-dom';

const Profile = ({ user, refreshUser }) => {

    const [newUserName, setNewUserName] = useState(user.displayName)

    const history = useHistory(); //히스토리 이동
    const handleLogout = () => {
        authService.signOut();
        history.push("/")
    } 

    // console.log(user)


    const handleNameChange = e => {
        const { target: { value } } = e;
        setNewUserName(value)
    }
    
    const onSubmit = async e => {
        e.preventDefault();
        await user.updateProfile({
            displayName: newUserName
        });
        refreshUser()
        
        // console.log('server : ', authService.currentUser.displayName)
    }

    // console.log(user.displayName)

    return (
        <div>
            profile
            <form onSubmit={onSubmit}>
                <input type="text" onChange={handleNameChange}/>
                <button type="submit">btm</button>
            </form>
            <button onClick={handleLogout}>logout</button>
        </div>
    );
};

export default Profile;