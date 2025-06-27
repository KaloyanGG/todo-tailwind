import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAmgoxLx4rHV65np-BjZV_Fvh0Cpdn4gQA",
  authDomain: "todo-tailwind-c75ac.firebaseapp.com",
  databaseURL: "https://todo-tailwind-c75ac-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "todo-tailwind-c75ac",
  storageBucket: "todo-tailwind-c75ac.firebasestorage.app",
  messagingSenderId: "459795594912",
  appId: "1:459795594912:web:9684c82e72d910577993c5"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
// export const messaging = getMessaging(app);
