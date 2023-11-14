self.addEventListener("install", () => {
  console.log("fcm sw install..");
  self.skipWaiting();
});

self.addEventListener("activate", () => {
  console.log("fcm sw activate..");
});

self.addEventListener("push", e => {
  if (!e.data.json()) return;

  const resultData = e.data.json().notification;
  const notificationTitle = resultData.title;
  const notificationOptions = {
      body: resultData.body,
  };
  
  // console.log("push: ", { resultData, notificationTitle, notificationOptions });


  // 백그라운드 알림
  e.waitUntil(
    self.registration.showNotification(notificationTitle, notificationOptions)
  );

  // 포그라운드 알림
  self.clients.matchAll({
    includeUncontrolled: true,
    type: 'window'
  }).then(clientList => {
    clientList.forEach(client => {
      client.postMessage({
        type: 'showNotification',
        payload: {title: notificationTitle, options: notificationOptions},
      });
    });
  });
});

// 백그라운드 알림 표시
self.addEventListener("notificationclick", event => {
  // console.log("notification click");
  const url = "/";
  event.notification.close();
  event.waitUntil(clients.openWindow(url));
});

// 포그라운드 알림 표시
self.addEventListener('message', event => {
  if (event.data.type === 'showNotification') {
    self.registration.showNotification(event.data.payload.title, event.data.payload.options);
  }
})