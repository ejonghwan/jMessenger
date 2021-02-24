import React, { useState, useEffect } from 'react';
import { authService, FirebaseInstance } from 'fbase';


const Auth = () => {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [newAccount, setNewAccount] = useState(true)
    const [error, setError] = useState("")
  

    const handleChange = (e) => {
        const { target: { name, value } } = e //e가 객체라서 target안에 name value 비구조화할당
        if(name === "email") {
            setEmail(value)
        } else if (name === "password") {
            setPassword(value)
        }
      
     }

    const handleSubmit = async (e) => {
        e.preventDefault();
       
        try {
            let data;
            if(newAccount) {
                // setNewAccount(true)
                 data = await authService.createUserWithEmailAndPassword(email, password)
            } else {
                // setNewAccount(false)
                 data = await authService.signInWithEmailAndPassword(email, password)
            }
            console.log(data)
        } catch (err) {
            setError(err.message)
        }
    }

    
    const handleToggle = () => setNewAccount(prev => !prev)
    const onSocialClickHandle = async (e) => {
        // console.log(e.target.name)

        const { target: {name, value} } = e
        let provider; 
        if(name === "google") {
            console.log('google set')
            provider = new FirebaseInstance.auth.GoogleAuthProvider()
        } else if (name === "github") {
            console.log('github set')
            provider = new FirebaseInstance.auth.GithubAuthProvider()
        }
        const data = await authService.signInWithPopup(provider)
        console.log(data)

    }




    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input  
                    type="email" 
                    name="email" 
                    placeholder="email" 
                    value={email} 
                    onChange={handleChange} 
                    required
                    />
                <input  
                    type="password" 
                    name="password" 
                    placeholder="password" 
                    value={password} 
                    onChange={handleChange} 
                    required
                    />
                <input type="submit" value={newAccount ? "create Account" : "login"} />

            </form>
            <div>{error}</div>
            <div onClick={handleToggle}>
                {newAccount ? "login" : "create Account"}
            </div>
            <div>
                <button name="google" onClick={onSocialClickHandle}>continue with google</button>
                <button name="github" onClick={onSocialClickHandle}>continue with github</button>

            </div>
        </div>
    );
};

export default Auth;