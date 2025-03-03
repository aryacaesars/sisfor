self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("info-system-v1").then((cache) => {
      return cache.addAll([
        "/",
        "/index.html",
        "/globals.css",
        "/icons/icon-192x192.png",
        "/icons/icon-512x512.png",
        "/icons/apple-touch-icon.png",
        "/favicon.ico",
      ])
    }),
  )
})

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        return (
          response ||
          fetch(event.request).then((fetchResponse) => {
            // For navigation requests, cache the response for offline use
            if (event.request.mode === "navigate") {
              return caches.open("info-system-v1").then((cache) => {
                cache.put(event.request, fetchResponse.clone())
                return fetchResponse
              })
            }
            return fetchResponse
          })
        )
      })
      .catch(() => {
        // If both cache and network fail, show offline page
        if (event.request.mode === "navigate") {
          return caches.match("/offline.html")
        }
      }),
  )
})

// Clean up old caches when a new service worker is activated
self.addEventListener("activate", (event) => {
  const cacheWhitelist = ["info-system-v1"]
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName)
          }
        }),
      )
    }),
  )
})

