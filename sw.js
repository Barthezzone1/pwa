const PWA = "PWA"
const GHPATH = '/pwa';
const assets = [
  `${GHPATH}/`,
  `${GHPATH}/index.html`,
  `${GHPATH}/map.html`,
  `${GHPATH}/sos.html`,
  `${GHPATH}/sos.js`,
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

  window.addEventListener('load', function() {
    window.history.pushState({ noBackExitsApp: true }, '')
  })
  
  window.addEventListener('popstate', function(event) {
    if (event.state && event.state.noBackExitsApp) {
      window.history.pushState({ noBackExitsApp: true }, '')
    }
  })