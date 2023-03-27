const PWA = "PWA"
const GHPATH = '/pwa';
const assets = [
  `${GHPATH}/`,
  `${GHPATH}/index.html`,
  `${GHPATH}/map.html`,
  `${GHPATH}/sos.html`,
]


self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(PWA).then(cache => {
      cache.addAll(assets)
    })
  )
})

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request)
      })
    )
})

  