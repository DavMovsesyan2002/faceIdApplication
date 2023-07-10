import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBAaw-xnr4queg5X3fPvNkL8XnYgOSCdQA",
    authDomain: "linear-theater-387705.firebaseapp.com",
    projectId: "linear-theater-387705",
    storageBucket: "linear-theater-387705.appspot.com",
    messagingSenderId: "590973308495",
    appId: "1:590973308495:web:00241ca2dcfa0bd039643a",
    measurementId: "G-HBP7JX1SXB"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
