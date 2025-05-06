import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getAnalytics } from "firebase/analytics";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCm3KNxCfRUt-EcAONqyJMXgALxFPsrpEM",
  authDomain: "projects2025-732b3.firebaseapp.com",
  projectId: "projects2025-732b3",
  storageBucket: "projects2025-732b3.firebasestorage.app",
  messagingSenderId: "569399561627",
  appId: "1:569399561627:web:fbc3921d5a61278026253e",
  measurementId: "G-4DW0S9DDBE"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);

let auth;
if (getApps().length === 0) {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
} else {
  auth = getAuth(app);
}

export { auth };
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
export default app;
