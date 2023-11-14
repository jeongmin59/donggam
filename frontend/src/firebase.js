// firebase를 초기화하고 firebase 앱 객체를 만듦
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';
import { getAnalytics } from "firebase/analytics";
import { transmitFCMToken } from '../src/api/transmitFCMToken.jsx'

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
const messaging = getMessaging(app);

// 알림이 가능한 브라우저라면 알림 허용 및 fcm토큰 발급
if (Notification) {
  try {
    Notification.requestPermission().then(permission => {
      if (permission !== 'granted') return;
      else {
        getToken(messaging).then(async (currentToken) => {
          if (currentToken) {
            const res = await transmitFCMToken(currentToken);
          } else {
            // console.log('FCM Token Unavailable');
          }
        }).catch(error => {
          console.log(error);
        }) 
      }
    })
  } catch (error) {
    if (error instanceof TypeError) {
      Notificaion.requestPermission().then(permission => {
        if (permission !== 'granted') return;
      });
    } else {
      // console.log(error);
    }
  }
}

