import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyA2HrMDOAhbdy01ceY6oYs4tRd2EDRHbcE",
  authDomain: "flatfinder-f1f62.firebaseapp.com",
  databaseURL: "https://flatfinder-f1f62-default-rtdb.firebaseio.com",
  projectId: "flatfinder-f1f62",
  storageBucket: "flatfinder-f1f62.appspot.com",
  messagingSenderId: "305766468407",
  appId: "1:305766468407:web:7b765efd38ffeb267768b2",
  measurementId: "G-80K8EN5VNH"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export {
  auth,
  db
}