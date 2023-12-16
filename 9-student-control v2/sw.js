const staticCacheName = "site-static";
const assets = [
     "/",
     "/index.html",
     "/css/style.css",
     "/js/controler.js",
     "/js/helpers.js",
     "/js/model.js",
     "/js/views/viewApp.js",
     "/js/views/viewForm.js",
     "/js/views/viewInfo.js",
     "/js/views/viewPayments.js",
     "/js/views/viewPrint.js",
     "/img/stu-logo.png",
     "/img/stu-logo-large.png",
     "/img/svg/sprite.svg",
     "https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap",
     "https://fonts.gstatic.com/s/lato/v24/S6u9w4BMUTPHh7USSwaPGR_p.woff2",
];

// installin service worker
self.addEventListener("install", (evt) => {
     // console.log("service worker has been installed");

     evt.waitUntil(
          caches.open(staticCacheName).then((cache) => {
               cache.addAll(assets);
          })
     );
});

// activate event
self.addEventListener("active", (evt) => {
     // console.log('service worker has been activated');
});

// fetch event
self.addEventListener("fetch", (evt) => {
     evt.respondWith(
          caches.match(evt.request).then((cacheRes) => {
               return cacheRes || fetch(evt.request);
          })
     );
});
