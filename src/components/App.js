import React, { useState, useEffect } from 'react'
import AppRouter from 'components/Router';
import { authService } from 'fbase'

function App() {
  // console.log(authService.currentUser)
  // const auth = fbase.auth();

  const [init, setInit] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
      setInit(true)
    })
  }, [])

  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "initializing..."}
      <footer>&copy; {new Date().getFullYear()}</footer>
    </>
  )
}

export default App;
