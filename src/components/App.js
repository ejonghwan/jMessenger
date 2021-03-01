import React, { useState, useEffect } from 'react'
import AppRouter from 'components/Router';
import { authService } from 'fbase'

function App() {
  // console.log(authService.currentUser)
  // const auth = fbase.auth();

  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  const [user, setUser] = useState(null);
  

  // *onAuthStateChanged 로그인 로그아웃할때 앱이 초기화할때 이벤트 일어남
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
