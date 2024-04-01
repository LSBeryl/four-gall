import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, initializeFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAMlWVWK14Ka5kInPMNlus-NBP7umilTMk",
//   authDomain: "dimi-twofour.firebaseapp.com",
//   projectId: "dimi-twofour",
//   storageBucket: "dimi-twofour.appspot.com",
//   messagingSenderId: "813817203036",
//   appId: "1:813817203036:web:3b1da59e03377d4b825999",
//   measurementId: "G-GZ0KQLDFJQ"
// };
const firebaseConfig = {
  apiKey:  import.meta.env.VITE_API_KEY,
  authDomain:  import.meta.env.VITE_AUTH_DOMAIN,
  projectId:  import.meta.env.VITE_PROJECT_ID,
  storageBucket:  import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId:  import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId:  import.meta.env.VITE_APP_ID,
  measurementId:  import.meta.env.VITE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const db = getFirestore(app);
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true, // this line
  useFetchStreams: false // and this line
})

export { db };