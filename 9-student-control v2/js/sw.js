const CACHE_NAME = "c-students v-1";

self.addEventListener("install", (e) => {
     e.waitUntil(
          (async () => {
               const cache = await caches.open(CACHE_NAME);
               cache.addAll([
                    "/",
                    "/index.html",
                    "/js/controler.js",
                    "/css/style.css",
               ]);
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
