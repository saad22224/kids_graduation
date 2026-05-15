const CACHE_NAME = 'bedayet-hayah-v2';
const ASSETS_TO_CACHE = [
  './',
  'index.html',
  'breastfeeding.html',
  'formula.html',
  'care.html',
  'vaccination.html',
  'safety.html',
  'growth.html',
  'diseases.html',
  'followup.html',
  'js/i18n.js',
  'local/ar.json',
  'local/en.json',
  'icon-192.png',
  'icon-512.png'
];


// Install Event
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('PWA: Caching assets');
      return cache.addAll(ASSETS_TO_CACHE)
        .then(() => console.log('PWA: All assets cached successfully'))
        .catch(err => console.error('PWA: Cache addAll failed:', err));
    })
  );
});

// Activate Event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      self.clients.claim(), // Become the active service worker for all clients
      caches.keys().then((keys) => {
        return Promise.all(
          keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
        );
      })
    ])
  );
});

// Fetch Event
self.addEventListener('fetch', (event) => {
  // Skip non-http/https requests (like chrome-extension://)
  if (!(event.request.url.indexOf('http') === 0)) return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((fetchResponse) => {
        // Don't cache external assets or non-GET requests
        if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic' || event.request.method !== 'GET') {
          return fetchResponse;
        }
        
        const responseToCache = fetchResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        
        return fetchResponse;
      });
    })
  );
});
