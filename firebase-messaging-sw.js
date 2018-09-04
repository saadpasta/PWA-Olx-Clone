self.addEventListener('push', function (event) {
    console.log('Received a push message', event);
  
    var notification = event.data.json().notification
    console.log(notification)
    var title = notification.title || 'Yay a message.';
    var body = notification.body || 'We have received a push message.';
    var icon = notification.icon
    // var tag = 'simple-push-demo-notification-tag';
  
    event.waitUntil(
      self.registration.showNotification(title, {
        body: body,
        icon : icon,
        vibrate: [200, 100, 200, 100, 200, 100, 200]
        // tag: tag
      })
    );
  
  });




  // on Notification Click do whatever you want...
  self.addEventListener('notificationclick', function(event) {
    var notification = event.notification;
    var action = event.action;
  
    console.log(notification);
  
    if (action === 'confirm') {
      console.log('Confirm was chosen');
      notification.close();
    } else {
      console.log(action);
      event.waitUntil(
        clients.matchAll()
          .then(function(clis) {
            var client = clis.find(function(c) {
              return c.visibilityState === 'visible';
            });
  
            if (client !== undefined) {
              client.navigate("https://pakistan-olx-1.firebaseapp.com/Message/messageMain.html");
              client.focus();
            } else {
              clients.openWindow("https://pakistan-olx-1.firebaseapp.com/Message/messageMain.html");
            }
            notification.close();
          })
      );
    }
  });



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
  "/Images/logo.png",
  "/fonts/font.woff2",
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

