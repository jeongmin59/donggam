// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxjAgzEs8mAlKepOcCROhpRP1ftBvYXBk",
  authDomain: "donggam-4fe2a.firebaseapp.com",
  projectId: "donggam-4fe2a",
  storageBucket: "donggam-4fe2a.appspot.com",
  messagingSenderId: "507409637409",
  appId: "1:507409637409:web:00e98b8dee15ab13adc360",
  measurementId: "G-GHBCF2FTMT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);