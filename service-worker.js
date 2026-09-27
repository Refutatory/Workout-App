const CACHE = 'form-fuel-shell-v3';
const SHELL = ['./', './index.html', './styles.css', './app.js?v=3', './manifest.json', './icon-192.svg', './icon-512.svg'];
const NETWORK_FIRST = new Set(['/', '/index.html', '/app.js?v=3', '/styles.css', '/manifest.json', '/service-worker.js?v=3']);

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const requestUrl = new URL(event.request.url);
  const isAppShellRequest = requestUrl.origin === self.location.origin
    && NETWORK_FIRST.has(requestUrl.pathname + requestUrl.search);

  if (isAppShellRequest) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE).then(cache => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match(event.request).then(cached => cached || caches.match('./index.html')))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(cached => cached || fetch(event.request).then(response => {
        const copy = response.clone();
        caches.open(CACHE).then(cache => cache.put(event.request, copy));
        return response;
      }))
      .catch(() => caches.match('./index.html'))
  );
});
