import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCjLOyDUHhfyQoXbKApy7fNUYgaXl-nY7Q",
  authDomain: "chat-app-61408.firebaseapp.com",
  projectId: "chat-app-61408",
  storageBucket: "chat-app-61408.appspot.com",
  messagingSenderId: "490599884098",
  appId: "1:490599884098:web:192af5bec6047ad68554db",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
