importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
if (workbox){
    console.log(`Workbox berhasil dimuat`);
    workbox.precaching.precacheAndRoute([
        { url: '/index.html', revision: '1' },
        { url: '/nav.html', revision: '1' },
        { url: '/manifest.json', revision: '1' },
        { url: '/push.js', revision: '1' },
        { url: '/css/materialize.min.css', revision: '1' },
        { url: '/images/icon-192x192.png', revision: '1' },
        { url: '/images/icon-512x512.png', revision: '1' },
        { url: '/images/logo.png', revision: '1' },
        { url: '/js/materialize.min.js', revision: '1' },
        { url: '/js/main/api.js', revision: '1' },
        { url: '/js/main/db.js', revision: '1' },
        { url: '/js/main/idb.js', revision: '1' },
        { url: '/js/main/jadwal.js', revision: '1' },
        { url: '/js/main/klasemen.js', revision: '1' },
        { url: '/js/main/main.js', revision: '1' },
        { url: '/js/main/nav.js', revision: '1' },
        { url: '/js/main/tim.js', revision: '1' },
        { url: '/pages/favorit.html', revision: '1' },
        { url: '/pages/jadwal.html', revision: '1' },
        { url: '/pages/klasemen.html', revision: '1' },
        { url: '/pages/tim.html', revision: '1' },
    ]);
    workbox.routing.registerRoute(
        /\.(?:png|gif|jpg|jpeg|svg)$/,
        workbox.strategies.cacheFirst({
            cacheName: `cache-images`,
            plugins: [
                new workbox.expiration.Plugin({
                    maxEntries: 100,
                    maxAgeSeconds: 60 * 60 * 24 * 30,
                }),
            ]
        })
    );
    workbox.routing.registerRoute(
        /\.(?:css|js)$/,
        workbox.strategies.cacheFirst({
            cacheName: `cache-resources`
        })
    )
    workbox.routing.registerRoute(
        new RegExp('/pages/'),
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'pages'
        })
    );
    workbox.routing.registerRoute(
        new RegExp(`https://api.football-data.org/v2/`),
        workbox.strategies.staleWhileRevalidate()
    );
}else{
    console.log(`Workbox gagal dimuat`);
}

self.addEventListener('push', event => {
    let body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    let options = {
        body: body,
        icon: 'img/notification.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});