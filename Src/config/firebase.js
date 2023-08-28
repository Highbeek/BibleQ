import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {EXPO_FIREBASE_API_KEY} from "@env"



const firebaseConfig = {
  apiKey: EXPO_FIREBASE_API_KEY,
  authDomain: "bibleq-83630.firebaseapp.com",
  projectId: "bibleq-83630",
  storageBucket: "bibleq-83630.appspot.com",
  messagingSenderId: "1097813079814",
  appId: "1:1097813079814:web:d102317f1e1dba92ac1087",
  measurementId: "G-L9EPV7H07F",
};


const app = initializeApp(firebaseConfig);

export const FIREBASE_AUTH = getAuth(app);

export const FIREBASE_DB = getFirestore(app);
