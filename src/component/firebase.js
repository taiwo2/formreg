// import { initializeApp } from 'firebase/app'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCfkbi9LsZuqOTnh4pr7EtJcH9-93OJ9Vw",
  authDomain: "quiz-app-e589b.firebaseapp.com",
  projectId: "quiz-app-e589b",
  storageBucket: "quiz-app-e589b.appspot.com",
  messagingSenderId: "728462383985",
  appId: "1:728462383985:web:286bc997453ad5acec34d0"
};

// Initialize Firebase and Firebase Authentication
firebase.initializeApp(firebaseConfig)
const auth = firebase.auth();
export const firestore = firebase.firestore();
const GoogleProvider = new firebase.auth.GoogleAuthProvider();
GoogleProvider.setCustomParameters({prompt: 'select_account'});
const signInWithGoogle = () => auth.signInWithPopup(GoogleProvider);

export const handleUserProfile = async ({userAuth, additionalData}) => {
  if (!userAuth) return;
  const {uid} = userAuth;
  const useRef = firestore.doc(`users/${uid}`)
  const snapshot = await useRef.get();
  console.log(snapshot)
  if (!snapshot.exists) {
    const {userName,email} = userAuth;
    const timestamp = new Date();

    try{
     await useRef.set({
       userName,
       email,
       createdDate : timestamp,
       ...additionalData
     })
    }catch(err) {
     //  console.log(err)
    }
  }
  return useRef;
}



export {auth ,signInWithGoogle}
