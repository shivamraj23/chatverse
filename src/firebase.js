import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDg6N88Mv38K2FaYZt_lXV3SU__IRG4pOc",
  authDomain: "chat-verse-9e4ba.firebaseapp.com",
  projectId: "chat-verse-9e4ba",
  storageBucket: "chat-verse-9e4ba.appspot.com",
  messagingSenderId: "370683359806",
  appId: "1:370683359806:web:ac0d677df490a592d8176f",
  measurementId: "G-TYDYW6LS30",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
