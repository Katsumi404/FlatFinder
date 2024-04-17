import firebase from 'firebase/compat/app';
import { getDatabase } from 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyB-XiXPthjJPiH2ZBbhpW99CwOMhVCu624",
  authDomain: "realtimeexpo-5f9d6.firebaseapp.com",
  projectId: "realtimeexpo-5f9d6",
  storageBucket: "realtimeexpo-5f9d6.appspot.com",
  messagingSenderId: "1051563688547",
  appId: "1:1051563688547:web:1d68a578b3170f9f6fae56",
  measurementId: "G-P2880SRM6S"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const db = getDatabase();

export { db };