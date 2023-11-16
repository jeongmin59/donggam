self.addEventListener("install", () => {
  console.log("fcm sw install..");
  self.skipWaiting();
});

self.addEventListener("activate", () => {
  console.log("fcm sw activate..");
});

self.addEventListener("push", event => {
  if (!event.data.json()) return;

  const resultData = event.data.json().notification;

  const notificationTitle = resultData.title;
  const notificationOptions = {
      body: resultData.content,
      image: '/icons/android-chrome-192x192.png'
  }
  // console.log("push: ", { resultData, notificationTitle, notificationOptions });
  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", event => {
  console.log("notification click");
  const url = "/";
  event.notification.close();
  event.waitUntil(clients.openWindow(url));
});