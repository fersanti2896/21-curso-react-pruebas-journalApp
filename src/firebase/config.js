import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHeJisgoW7IJXrAyMiM6_VzHimmPXEJoQ",
  authDomain: "react-curso-redux-1e2c0.firebaseapp.com",
  projectId: "react-curso-redux-1e2c0",
  storageBucket: "react-curso-redux-1e2c0.appspot.com",
  messagingSenderId: "1070029701562",
  appId: "1:1070029701562:web:c233ef2335a99bd1985d83"
};

export const FrebaseApp   = initializeApp( firebaseConfig );
export const FirebaseAuth = getAuth( FrebaseApp );
export const FirebaseDB   = getFirestore( FrebaseApp );