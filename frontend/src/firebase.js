// firebase를 초기화하고 firebase 앱 객체를 만듦
import {initializeApp} from 'firebase/app';
import {getMessaging} from 'firebase/messaging';
import { getAnalytics } from "firebase/analytics";

//firebase 구성객체
const firebaseConfig = {
  apiKey: "AIzaSyDxjAgzEs8mAlKepOcCROhpRP1ftBvYXBk",
  authDomain: "donggam-4fe2a.firebaseapp.com",
  projectId: "donggam-4fe2a",
  storageBucket: "donggam-4fe2a.appspot.com",
  messagingSenderId: "507409637409",
  appId: "1:507409637409:web:00e98b8dee15ab13adc360",
  measurementId: "G-GHBCF2FTMT"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const messaging = getMessaging(app);