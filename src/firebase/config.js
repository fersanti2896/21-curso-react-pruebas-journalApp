import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite'

// Pruducción
// const firebaseConfig = {
//   apiKey: "AIzaSyBHeJisgoW7IJXrAyMiM6_VzHimmPXEJoQ",
//   authDomain: "react-curso-redux-1e2c0.firebaseapp.com",
//   projectId: "react-curso-redux-1e2c0",
//   storageBucket: "react-curso-redux-1e2c0.appspot.com",
//   messagingSenderId: "1070029701562",
//   appId: "1:1070029701562:web:c233ef2335a99bd1985d83"
// };

// Testing
const firebaseConfig = {
  apiKey: "AIzaSyBoLELo6Qqpt9xfiuzq5JMtuDuy5L8Gdyg",
  authDomain: "react-journal-pruebas-1f688.firebaseapp.com",
  projectId: "react-journal-pruebas-1f688",
  storageBucket: "react-journal-pruebas-1f688.appspot.com",
  messagingSenderId: "52575820962",
  appId: "1:52575820962:web:fa1e53f8708c78b263cbfb"
};

export const FrebaseApp   = initializeApp( firebaseConfig );
export const FirebaseAuth = getAuth( FrebaseApp );
export const FirebaseDB   = getFirestore( FrebaseApp );