import React, { useState, useEffect } from 'react'
import AppRouter from 'components/Router';
import { authService } from 'fbase'

function App() {
  // console.log(authService.currentUser)
  // const auth = fbase.auth();

  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user) {
        setIsLoggedIn(true)
        setUser(user)
      } else {
        setIsLoggedIn(false)
      }
      setInit(true)
    })
  }, [])

  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} user={user} /> : "initializing..."}
      <footer>&copy; {new Date().getFullYear()}</footer>
    </>
  )
}

export default App;
