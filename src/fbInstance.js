  import firebase from "firebase/app";
  import "firebase/auth";
  import "firebase/firestore";

  var firebaseConfig = {
    apiKey: "AIzaSyC4vFS9thWw_FuJolmcsPlM-zTWAd_aArQ",
    authDomain: "wonwitter-e7621.firebaseapp.com",
    projectId: "wonwitter-e7621",
    storageBucket: "wonwitter-e7621.appspot.com",
    messagingSenderId: "109231183569",
    appId: "1:109231183569:web:b32623014cf699732697f0",
    measurementId: "G-DTJEP34BEH"
  };

firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;
export const authService = firebase.auth();
export const dbService = firebase.firestore();