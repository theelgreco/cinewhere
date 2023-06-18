// self.addEventListener("fetch", function (event) {
//   event.respondWith(
//     caches.match(event.request).then(function (response) {
//       // Cache hit - return response
//       if (response) {
//         return response;
//       }
//       return fetch(event.request);
//     })
//   );
// });

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        // Cached version found, compare with the current version
        return fetch(event.request).then(function (networkResponse) {
          if (
            networkResponse.headers.get("ETag") !== response.headers.get("ETag")
          ) {
            // Update the cache with the current version
            caches.open(CACHE_NAME).then(function (cache) {
              cache.put(event.request, networkResponse.clone());
            });
          }
          return response; // Return the cached version
        });
      } else {
        // No cached version found, fetch from the network
        return fetch(event.request);
      }
    })
  );
});
