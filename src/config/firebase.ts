import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyApYNokBJ8USaQgngyHp3jswXXu0NM1VNg",
  authDomain: "koko-app-e9b11.firebaseapp.com",
  projectId: "koko-app-e9b11",
  storageBucket: "koko-app-e9b11.firebasestorage.app",
  messagingSenderId: "969606795117",
  appId: "1:969606795117:web:8ba00dfdbb479c49399464",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
