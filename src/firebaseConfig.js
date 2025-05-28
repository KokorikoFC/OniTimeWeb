import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAF1BmIC_EniekU-6yjRd3UAkAJJyAyqy4",
    authDomain: "tfgonitime.firebaseapp.com",
    projectId: "tfgonitime",
    storageBucket: "tfgonitime.firebasestorage.app",
    messagingSenderId: "54972464273",
    appId: "1:54972464273:web:79e441165b9afae4575330",
    measurementId: "G-ZL5N1HMBFX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Export auth instance
export const auth = getAuth(app);
// Export Firestore instance
export const db = getFirestore(app);
