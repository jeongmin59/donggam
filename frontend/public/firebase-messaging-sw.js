self.addEventListener("install", function (e) {
  // console.log("fcm sw install..");
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  // console.log("fcm sw activate..");
});

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

self.addEventListener("push", function (e) {
  if (!e.data.json()) return;

  const resultData = e.data.json().notification;
  const notificationTitle = resultData.title;
  const notificationOptions = {
      body: resultData.body,
  };
  
  // console.log("push: ", { resultData, notificationTitle, notificationOptions });

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", function (event) {
  // console.log("notification click");
  const url = "/";
  event.notification.close();
  event.waitUntil(clients.openWindow(url));
});