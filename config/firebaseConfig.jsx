// Import necessary Firebase modules
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics"; // Optional, only for web
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCm3KNxCfRUt-EcAONqyJMXgALxFPsrpEM",
  authDomain: "projects2025-732b3.firebaseapp.com",
  projectId: "projects2025-732b3",
  storageBucket: "projects2025-732b3.firebasestorage.app",
  messagingSenderId: "569399561627",
  appId: "1:569399561627:web:fbc3921d5a61278026253e",
  measurementId: "G-4DW0S9DDBE",
};

// ✅ Ensure Firebase is initialized only once
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// ✅ Initialize Firestore
export const db = getFirestore(app);

// ✅ Initialize Firebase Auth only once
let auth;
if (getApps().length === 0) {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
} else {
  auth = initializeAuth(app);
}

export { auth };

// ✅ Optional: Initialize Firebase Analytics (only for web)
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

export default app;
