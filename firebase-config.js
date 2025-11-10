// Firebase Configuration for Portfolio Comments

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
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
const auth = firebase.auth();

auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);