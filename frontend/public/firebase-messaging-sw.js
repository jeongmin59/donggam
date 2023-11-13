self.addEventListener("install", function (e) {
  console.log("fcm sw install..");
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  console.log("fcm sw activate..");
});

self.addEventListener("push", function (e) {
  // console.log("push하면 오는 데이터: ", e.data.json());
  if (!e.data.json()) return;

  const resultData = e.data.json().data;
  // const notificationTitle = resultData.title;
  // const notificationOptions = {
  //     body: resultData.body,
  //     icon: resultData.image,
  //     tag: resultData.tag,
  //     ...resultData,
  // };
  const notificationTitle = resultData.title;
  const notificationOptions = {
      body: resultData.content
  }
  
  console.log("push: ", { resultData, notificationTitle, notificationOptions });

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", function (event) {
  console.log("notification click");
  const url = "/";
  event.notification.close();
  event.waitUntil(clients.openWindow(url));
});