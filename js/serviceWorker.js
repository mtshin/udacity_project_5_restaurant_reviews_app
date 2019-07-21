const cachedFiles = [
    '/',
    '/index.html',
    '/restaurant.html',
    '/css/styles.css',
    '/data/restaurants.json',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('restaurantReviewStatic').then((cache) => {
            return cache.addAll(cachedFiles);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                console.log('Found ', event.request, ' in cache');
                return response;
            } else {
                console.log(event.request, ' not found in cache, fetching!');
                return fetch(event.request)
                    .then((response) => {
                        let responseCopy = response.clone();
                        caches.open('restaurantReviewStatic').then((cache) => {
                            cache.put(event.request, responseCopy);
                        })
                        return response;
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            }
        })
    );
});