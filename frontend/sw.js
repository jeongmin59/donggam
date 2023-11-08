// install event
self.addEventListener("install", (e) => {
  // console.log("[Service Worker] installed");
});

// activate event
self.addEventListener("activate", (e) => {
  // console.log("[Service Worker] actived", e);
});

// fetch event
self.addEventListener("fetch", (e) => {
  // console.log("[Service Worker] fetched resource " + e.request.url);
});

// 서비스 워커 등록
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      })
      .catch(error => {
        console.log('ServiceWorker registration failed: ', error);
      });
  });
}