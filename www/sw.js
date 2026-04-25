const CACHE = 'lima-v9'
const ASSETS = [
  '/',
  '/img/lima_frente.png',
  '/img/lima_brillante.png',
  '/img/lima_izquierda.png',
  '/img/lima_derecha.png',
  '/img/lima_blink.png',
]

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', e => {
  // API calls: always network
  if (e.request.url.includes('/api/') || e.request.url.includes('/comando') || e.request.url.includes('/estado')) {
    return
  }
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).then(res => {
      if (res.ok && e.request.method === 'GET') {
        const clone = res.clone()
        caches.open(CACHE).then(c => c.put(e.request, clone))
      }
      return res
    }))
  )
})
