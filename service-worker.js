var cacheName = "OLX-Pak ";
var filesToCache = [
  "/",
  "/index.html",
  "/css/bootstrap.min.css",
  "/css/bootstrap.css",
  "/js/bootstrap.js",
  "/app.js",
  "/style.css",
  "/loader.gif",
  "/Images/animals.png",
  "/Images/user.png",
  "/Images/mobile.jpg",
  "/fonts/font2.woff2",
  "/Login/login.css",
  "/Login/login.html",
  "/Login/login.js",
  "/Message/message.css",
  "/Message/message.html",
  "/Message/message.js",
  "/Message/messageMain.html",
  "/My account/account.css",
  "/My account/account.html",
  "/My account/account.js",
  "/Register/register.css",
  "/Register/register.html",
  "/Register/register.js",
  "/Submit Add/ad.css",
  "/Submit Add/ad.html",
  "/Submit Add/ad.js",
]

self.addEventListener("install", function(e) {
  console.log("[ServiceWorker] Install");
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log("[ServiceWorker] Caching app shell");
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener("activate", function(e) {
  console.log("[ServiceWorker] Activate");
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(
        keyList.map(function(key) {
          if (key !== cacheName) {
            console.log("[ServiceWorker] Removing old cache", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener("fetch", function(e) {
  console.log("[Service Worker] Fetch", e.request.url);
  var dataUrl = "https://query.yahooapis.com/v1/public/yql";
  /*
       * The app is asking for app shell files. In this scenario the app uses the
       * "Cache, falling back to the network" offline strategy:
       * https://jakearchibald.com/2014/offline-cookbook/#cache-falling-back-to-network
       */
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
