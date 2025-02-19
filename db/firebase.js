// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD5ktch5mWZbEZJS4YyWvcQoPmgWmFMK0o",
  authDomain: "construction-crm-98d14.firebaseapp.com",
  projectId: "construction-crm-98d14",
  storageBucket: "construction-crm-98d14.firebasestorage.app",
  messagingSenderId: "810004838891",
  appId: "1:810004838891:web:60216b1d85bcbcc77e01ae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
