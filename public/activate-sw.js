const cacheName = "my-cache-v3.0.1";
const newCacheUrls = ["/manifest.json"];

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .delete(cacheName)
      .then(() => {
        console.log(`Old cache "${cacheName}" has been deleted.`);
        return caches.open(cacheName);
      })
      .then((cache) => {
        return cache.addAll(newCacheUrls);
      })
      .then(() => {
        console.log(`New cache "${cacheName}" has been set.`);
      })
      .catch((error) => {
        console.error("Cache update error:", error);
      })
  );
});
