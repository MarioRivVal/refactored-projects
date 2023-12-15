const CACHE_NAME = "c-students v-1";
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

self.addEventListener("install", (e) => {
     e.waitUntil(
          (async () => {
               const cache = await caches.open(CACHE_NAME);
               cache.addAll(assets);
          })()
     );
});

self.addEventListener("fetch", (e) => {
     e.respondWith(
          (async () => {
               const cache = await caches.open(CACHE_NAME);
               const cacheResponse = await cache.match(e.request);

               if (cacheResponse) {
                    return cacheResponse;
               } else {
                    try {
                         const fetchResponse = await fetch(e.request);

                         cache.put(e.request, fetchResponse.clone());
                         return fetchResponse;
                    } catch (e) {
                         console.log(e);
                    }
               }
          })()
     );
});
