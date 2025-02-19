// Import Firebase modules
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase config (Replace with your actual Firebase credentials)
const firebaseConfig = {
    apiKey: "AIzaSyD5ktch5mWZbEZJS4YyWvcQoPmgWmFMK0o",
    authDomain: "construction-crm-98d14.firebaseapp.com",
    databaseURL: "https://construction-crm-98d14-default-rtdb.firebaseio.com",
    projectId: "construction-crm-98d14",
    storageBucket: "construction-crm-98d14.firebasestorage.app",
    messagingSenderId: "810004838891",
    appId: "1:810004838891:web:60216b1d85bcbcc77e01ae",
    measurementId: "G-XSJ0VXYMTK"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore (for storing text and numbers)
const db = getFirestore(app);

export { db };
