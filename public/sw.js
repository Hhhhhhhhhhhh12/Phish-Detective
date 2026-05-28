// Phish Detective Simple PWA Service Worker
self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  // Let everything go straight through the network normally
  event.respondWith(fetch(event.request));
});
