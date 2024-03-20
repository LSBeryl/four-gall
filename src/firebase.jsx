// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMlWVWK14Ka5kInPMNlus-NBP7umilTMk",
  authDomain: "dimi-twofour.firebaseapp.com",
  projectId: "dimi-twofour",
  storageBucket: "dimi-twofour.appspot.com",
  messagingSenderId: "813817203036",
  appId: "1:813817203036:web:3b1da59e03377d4b825999",
  measurementId: "G-GZ0KQLDFJQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);

export { db };