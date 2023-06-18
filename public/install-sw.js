let cacheName = "my-cache-v3.0.1";
let urlsToCache = ["/manifest.json"];

self.addEventListener("install", function (event) {
  // Perform install steps
  event.waitUntil(
    caches
      .delete(cacheName)
      .then(() => {
        console.log(`Old cache "${cacheName}" has been deleted.`);
        return caches.open(cacheName);
      })
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log(`New cache "${cacheName}" has been set.`);
      })
      .catch((error) => {
        console.error("Cache update error:", error);
      })
  );
});
