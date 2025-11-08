// Firebase Configuration for Portfolio Comments
// Using compat version for simplicity

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
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

// Initialize Auth
const auth = firebase.auth();