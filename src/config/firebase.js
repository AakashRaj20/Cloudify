import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAblkAy3m7W9CykCVKoBZ5UjUztcbCP4eY",
  authDomain: "cloudsify-59854.firebaseapp.com",
  projectId: "cloudsify-59854",
  storageBucket: "cloudsify-59854.appspot.com",
  messagingSenderId: "910481987485",
  appId: "1:910481987485:web:2e105c069cb1235942c174",
  measurementId: "G-NTNC28EQ0N",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();

export const db = getFirestore(app);


