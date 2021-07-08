import React, { useState } from "react";
import { authService, firebaseInstance } from "../fbInstance";
import AuthForm from "../components/AuthForm";

const Auth = () => {
  const onSocailClick = async (event) => {
      const {target:{name}} = event;
      let provider;
      if(name === "google"){
          provider = new firebaseInstance.auth.GoogleAuthProvider();
      }else if(name === "github"){
          provider = new firebaseInstance.auth.GithubAuthProvider();
      }
      const data = await authService.signInWithPopup(provider);
      console.log(data);
  };
  return (
    <div>
    <AuthForm />
        <div>
        <button onClick={onSocailClick} name="google">Continue with Google</button>
        <button onClick={onSocailClick} name="github">Continue with Github</button>
      </div>
    </div>
  );
};
export default Auth;
