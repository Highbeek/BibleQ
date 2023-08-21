import * as firebase from "firebase/app";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";



const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "bibleq-83630.firebaseapp.com",
  projectId: "bibleq-83630",
  storageBucket: "bibleq-83630.appspot.com",
  messagingSenderId: "1097813079814",
  appId: "1:1097813079814:web:d102317f1e1dba92ac1087",
  measurementId: "G-L9EPV7H07F",
};


export
// Initialize Firebase

let app;
try {
  app = firebase.app();
} catch (error) {
  app = firebase.initializeApp(firebaseConfig);
}

const auth = getAuth(app);

export const registerWithEmailAndPassword = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password); 
};

export const signIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export { auth };
