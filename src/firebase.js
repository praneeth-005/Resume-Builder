import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAVnWpXOrbkwUzpeqXFedQ8gIzu_1gt1mI",
  authDomain: "resume-builder-4c4a6.firebaseapp.com",
  projectId: "resume-builder-4c4a6",
  storageBucket: "resume-builder-4c4a6.firebasestorage.app",
  messagingSenderId: "46993541688",
  appId: "1:46993541688:web:d73fe289c0f14db7d474cd",
  measurementId: "G-3DVKFSV6VX"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
