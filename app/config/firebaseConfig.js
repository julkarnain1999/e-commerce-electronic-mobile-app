
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { useState, useEffect } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyAGKSFo_reHjSc7256dZlV-93inXM-dbco",
  authDomain: "e-commerce-julkar.firebaseapp.com",
  projectId: "e-commerce-julkar",
  storageBucket: "e-commerce-julkar.firebasestorage.app",
  messagingSenderId: "308784150329",
  appId: "1:308784150329:web:691d365ede4b581cd35ae8",
  measurementId: "G-M2SYEW6108",
};

// 🔥 Initialize Firebase App
const app = initializeApp(firebaseConfig);

// 🔥 Initialize Firestore
const db = getFirestore(app);

// 🔥 Initialize Firebase Authentication
const auth = getAuth(app);
const storage = getStorage(app);

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  return { user, loading };
};

export { db, auth, storage };

