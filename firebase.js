
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'


const firebaseConfig = {
  apiKey: `${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
  authDomain: `${process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}`,
  projectId: "hoorayapp-0001",
  storageBucket: "hoorayapp-0001.appspot.com",
  messagingSenderId: `${process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID}`,
  appId: `${process.env.NEXT_PUBLIC_FIREBASE_API_ID}`
};

// Initialize Firebase
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage } 
