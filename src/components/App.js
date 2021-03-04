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
        // setUser(user)
        setUser({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: function(args) { return user.updateProfile(args) }
        })
        
      } else {
        setIsLoggedIn(false)
      }
      setInit(true)
    })
    
  }, [])
  console.log(user)

  const refreshUser = () => {
    const user = authService.currentUser;
    setUser({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args) 
    })
  }

 

  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} user={user} refreshUser={refreshUser}/> : "initializing..."}
      <footer>&copy; {new Date().getFullYear()}</footer>
    </>
  )
}

export default App;
