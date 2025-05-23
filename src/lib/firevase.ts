// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASzbUtdquwtQjPNyZZVUR_Lb8N-mztTuw",
  authDomain: "dekoboko-eb4ea.firebaseapp.com",
  projectId: "dekoboko-eb4ea",
  storageBucket: "dekoboko-eb4ea.firebasestorage.app",
  messagingSenderId: "775874897631",
  appId: "1:775874897631:web:89500b9792923f5092ab6a",
  measurementId: "G-HH0D657NHJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);