// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getDatabase} from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkFlbuk1yUK79JjbjuEssiU71HOEuWPWw",
  authDomain: "testing-fb3fa.firebaseapp.com",
  projectId: "testing-fb3fa",
  storageBucket: "testing-fb3fa.appspot.com",
  messagingSenderId: "1011352025488",
  appId: "1:1011352025488:web:12f42df290a0553d735b15",
  measurementId: "G-CCX4HBQ5CJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const db =getDatabase(app);
const store = getFirestore(app);


export {auth,db, store}
