// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIuCtZ-3AFVy7G1BVpQFD8GkxUhx-g_0Y",
  authDomain: "portfolio-comment-system.firebaseapp.com",
  projectId: "portfolio-comment-system",
  storageBucket: "portfolio-comment-system.firebasestorage.app",
  messagingSenderId: "171683622595",
  appId: "1:171683622595:web:2f6e8f7637aa31ab097c76",
  measurementId: "G-GPKV2549TK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);