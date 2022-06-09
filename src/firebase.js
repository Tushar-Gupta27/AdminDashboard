import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: "dashboard-react-6eedf",
  storageBucket: process.env.REACT_APP_STORAGE,
  messagingSenderId: "43228292396",
  appId: "1:43228292396:web:ac94a5c74300274d56b889",
  measurementId: "G-49YZVWZGX6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
const analytics = getAnalytics(app);
export const auth = getAuth();
