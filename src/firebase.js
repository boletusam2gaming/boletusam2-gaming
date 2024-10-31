// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDh1eYfXSLd8dOrRUQskpiXnOSJtmTSK9M",
  authDomain: "boletusam2-gaming-web.firebaseapp.com",
  projectId: "boletusam2-gaming-web",
  storageBucket: "boletusam2-gaming-web.appspot.com",
  messagingSenderId: "414758700336",
  appId: "1:414758700336:web:506863446d7f08effcb4f5",
  measurementId: "G-CCZL1P1HJY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
const db = getFirestore(app);


export { db, analytics, firestore };