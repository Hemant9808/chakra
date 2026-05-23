const CACHE_NAME = "ayucan-cache-v1";

// Cache static UI assets on Service Worker installation
const PRECACHE_ASSETS = [
  "/",
  "/index.html",
  "/favicon.png",
  "/manifest.json"
];

// 1. Installation Phase
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[PWA Service Worker] Pre-caching core layout assets");
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
  // Force active immediately
  self.skipWaiting();
});

// 2. Activation Phase (Cleanup older caches)
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("[PWA Service Worker] Clearing expired cache: ", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// 3. Fetching / Caching Strategy
self.addEventListener("fetch", (event) => {
  const requestUrl = new URL(event.request.url);

  // A. ALWAYS BYPASS Service Worker Cache for Dynamic e-commerce API requests, OTPs, or Payments
  if (
    requestUrl.pathname.startsWith("/product/") ||
    requestUrl.pathname.startsWith("/order/") ||
    requestUrl.pathname.startsWith("/cart/") ||
    requestUrl.pathname.startsWith("/auth/") ||
    requestUrl.pathname.startsWith("/payment/") ||
    requestUrl.pathname.startsWith("/reviews/") ||
    event.request.method !== "GET"
  ) {
    return; // Bypass completely - fall back to native network fetching
  }

  // B. HYBRID Strategy: Cache-First for static assets (CSS, JS, Fonts, Images, Icons)
  const isStaticAsset = 
    event.request.destination === "style" ||
    event.request.destination === "script" ||
    event.request.destination === "image" ||
    event.request.destination === "font" ||
    requestUrl.pathname.includes("/ResourseImages/");

  if (isStaticAsset) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse; // Return cache immediately
        }

        // Otherwise fetch over network, cache it for future visits, and return it
        return fetch(event.request).then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200) {
            return networkResponse;
          }
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          return networkResponse;
        });
      })
    );
    return;
  }

  // C. Network-First / Cache Fallback for general navigation/document requests (HTML pages)
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        // Cache the updated page response
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return networkResponse;
      })
      .catch(() => {
        // Fall back to cached response if network goes offline
        return caches.match(event.request);
      })
  );
});
