// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBT1WeHbsHlAus_M0aAcIAJTb-JMf7_0NM",
  authDomain: "maintenancebook-edad8.firebaseapp.com",
  projectId: "maintenancebook-edad8",
  storageBucket: "maintenancebook-edad8.firebasestorage.app",
  messagingSenderId: "581148836558",
  appId: "1:581148836558:web:828aa7f631b2e23b96869f",
  measurementId: "G-JX85W3LDSK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app)