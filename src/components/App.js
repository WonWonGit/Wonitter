import React, { useEffect, useState } from 'react';
import AppRouter from 'components/Router';
import {authService} from 'fbInstance';

function App() {
  //초기화가 됐는지 안됐는지 알려주는 state이다.
  const[init, setInit] = useState(false);
  // 로그인이 됐는지 안됐는지 알려주는 state이다.
  const [userObj,setUserObj] = useState(null);
  useEffect(()=>{
    authService.onAuthStateChanged((user)=>{
      if(user){
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),

        });
      }else{
        setUserObj(null);
      }
      setInit(true);
    });
    
  },[]);
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
       
    });
  };
  return (
  <>
    {init ? <AppRouter refreshUser={refreshUser} isLoggedIn={Boolean(userObj)} userObj={userObj}/> : "Initializing..."}
    
  </>)
}

export default App;
