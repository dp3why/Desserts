
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDYOKys_CMrgs5pnTBbm2SgTWmmzCV-4zA",
  authDomain: "hooray-816e2.firebaseapp.com",
  projectId: "hooray-816e2",
  storageBucket: "hooray-816e2.appspot.com",
  messagingSenderId: "343720935683",
  appId: "1:343720935683:web:f3e10f007e9843f6f62936",
  measurementId: "G-NRB0VN1DDB"
};

// Initialize Firebase
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage } 
