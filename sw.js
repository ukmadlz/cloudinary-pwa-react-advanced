(function () {
  "use strict";

  var cacheNameStatic = 'cloudinary-pwa-react-v2';

  var currentCacheNames = [ cacheNameStatic ];

  var cachedUrls = [
    // 3rd party CDN
    'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.2/css/materialize.min.css',
    // Local assets
    '/dist/bundle.js',
    '/style.css',
    // Fake API
    '/images.json'
  ];

  // A new ServiceWorker has been registered
  self.addEventListener("install", function (event) {
    event.waitUntil(
      caches.delete(cacheNameStatic).then(function() {
        return caches.open(cacheNameStatic);
      }).then(function (cache) {
        return cache.addAll(cachedUrls);
      }).catch(function(e) {
      })
    );
  });

  // A new ServiceWorker is now active
  self.addEventListener("activate", function (event) {
    event.waitUntil(
      caches.keys()
        .then(function (cacheNames) {
          return Promise.all(
            cacheNames.map(function (cacheName) {
              if (currentCacheNames.indexOf(cacheName) === -1) {
                return caches.delete(cacheName);
              }
            })
          );
        })
    );
  });

  // Save thing to cache in process of use
  self.addEventListener("fetch", function (event) {
    event.respondWith(
      caches.open(cacheNameStatic).then(function(cache) {
        return cache.match(event.request).then(function(response) {
          var fetchPromise = fetch(event.request).then(function(networkResponse) {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          })
          return response || fetchPromise;
        })
      })
    );
  });

})();
