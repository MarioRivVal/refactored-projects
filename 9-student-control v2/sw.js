// const CACHE_NAME = "c-students v-1";

// self.addEventListener("install", (e) => {
//      e.waitUntil(
//           (async () => {
//                const cache = await caches.open(CACHE_NAME);
//                cache.addAll([
//                     "/",
//                     "/index.html",
//                     "/js/controler.js",
//                     "/css/style.css",
//                ]);
//           })()
//      );
// });

// self.addEventListener("fetch", (e) => {
//      e.respondWith(
//           (async () => {
//                const cache = await caches.open(CACHE_NAME);
//                const cacheResponse = await cache.match(e.request);

//                if (cacheResponse) {
//                     return cacheResponse;
//                } else {
//                     try {
//                          const fetchResponse = await fetch(e.request);

//                          cache.put(e.request, fetchResponse.clone());
//                          return fetchResponse;
//                     } catch (e) {
//                          console.log(e);
//                     }
//                }
//           })()
//      );
// });
///////////////////////////////////////////////////
// self.addEventListener("install", function (event) {
//      event.waitUntil(
//           caches.open("my-cache").then(function (cache) {
//                return cache.addAll([
//                     "/",
//                     "/index.html",
//                     "/css/styles.css",
//                     "/js/controler.js",
//                     "/js/helpers.js",
//                     "/js/model.js",
//                     "/js/views/viewApp.js",
//                     "/js/views/viewForm.js",
//                     "/js/views/viewInfo.js",
//                     "/js/views/viewPayments.js",
//                     "/js/views/viewPrint.js",
//                     "/img/svg/stu-logo.png",
//                     "/img/svg/stu-logo-large.png",

//                     // etc
//                ]);
//           })
//      );
// });
////////////////////////////////////////////
// self.addEventListener("install", function (event) {
//      event.waitUntil(
//           caches.open("my-cache").then(function (cache) {
//                return Promise.all(
//                     [
//                          "/",
//                          "/index.html",
//                          "/css/style.css",
//                          "/js/controler.js",
//                          "/js/helpers.js",
//                          "/js/model.js",
//                          "/js/views/viewApp.js",
//                          "/js/views/viewForm.js",
//                          "/js/views/viewInfo.js",
//                          "/js/views/viewPayments.js",
//                          "/js/views/viewPrint.js",
//                          "/img/stu-logo.png",
//                          "/img/stu-logo-large.png",
//                          "/img/svg/sprite.svg",
//                     ].map((url) =>
//                          cache
//                               .add(url)
//                               .catch((error) =>
//                                    console.log(
//                                         `Failed to cache ${url}: ${error}`
//                                    )
//                               )
//                     )
//                );
//           })
//      );
// });

// self.addEventListener("fetch", function (event) {
//      event.respondWith(
//           caches.match(event.request).then(function (response) {
//                return response || fetch(event.request);
//           })
//      );
// });

////////////////////////////
////////////////////////////////
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
     console.log("service worker has been installed");

     evt.waitUntil(
          caches.open(staticCacheName).then((cache) => {
               console.log("caching all assets"); // CONSOLE
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
