// firebase를 초기화하고 firebase 앱 객체를 만듦
import { initializeApp } from 'firebase/app';

//firebase 구성객체
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIRE_BASE_API_KEY,
  authDomain: "donggam-4fe2a.firebaseapp.com",
  projectId: "donggam-4fe2a",
  storageBucket: "donggam-4fe2a.appspot.com",
  messagingSenderId: "507409637409",
  appId: "1:507409637409:web:00e98b8dee15ab13adc360",
  measurementId: "G-GHBCF2FTMT"
};

// Firebase 초기화
export const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const messaging = getMessaging(app);


// 알림이 가능한 브라우저라면 알림 허용 신청
if (Notification) {
  try {
    Notification.requestPermission().then(permission => {
      if (permission !== 'granted') return;
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