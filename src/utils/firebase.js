// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFiL3kNTAjK8Hlf9MUhzaWMSFCnQsi0LQ",
  authDomain: "netflix-ai-d922e.firebaseapp.com",
  projectId: "netflix-ai-d922e",
  storageBucket: "netflix-ai-d922e.firebasestorage.app",
  messagingSenderId: "899605377054",
  appId: "1:899605377054:web:f946e14b4de8ccc8997e0f",
  measurementId: "G-DS4JZ2F7YZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
