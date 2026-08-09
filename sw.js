const CACHE_NAME = "pc-manager-v3";

const ARCHIVOS = [
    "./",
    "./index.html",

    "./computadoras.html",
    "./usuarios.html",
    "./prestamos.html",
    "./mantenimiento.html",
    "./perifericos.html",
    "./reportes.html",
    "./configuracion.html",

    "./css/style.css",

    "./js/app.js",
    "./js/dashboard.js",
    "./js/computadoras.js",
    "./js/usuarios.js",
    "./js/prestamos.js",
    "./js/mantenimiento.js",
    "./js/perifericos.js",
    "./js/reportes.js",
    "./js/configuracion.js",
    "./js/pwa.js",

    "./manifest.webmanifest",

    "./img/icon-192.png",
    "./img/icon-512.png"
];


// INSTALACIÓN
self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME)
            .then(cache => {

                console.log("Creando caché de PC Manager");

                return cache.addAll(ARCHIVOS);

            })
            .then(() => {

                return self.skipWaiting();

            })

    );

});


// ACTIVACIÓN
self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys()
            .then(keys => {

                return Promise.all(

                    keys
                        .filter(key => key !== CACHE_NAME)
                        .map(key => caches.delete(key))

                );

            })
            .then(() => self.clients.claim())

    );

});


// PETICIONES
self.addEventListener("fetch", event => {

    const request = event.request;

    // Solo manejar peticiones GET
    if (request.method !== "GET") {
        return;
    }

    // No interceptar peticiones externas
    if (!request.url.startsWith(self.location.origin)) {
        return;
    }

    event.respondWith(

        caches.match(request)
            .then(cachedResponse => {

                // Si existe en caché, usarlo
                if (cachedResponse) {
                    return cachedResponse;
                }

                // Si no existe, intentar Internet
                return fetch(request)
                    .then(networkResponse => {

                        // Guardar solamente respuestas válidas
                        if (
                            networkResponse &&
                            networkResponse.status === 200 &&
                            networkResponse.type === "basic"
                        ) {

                            const responseClone =
                                networkResponse.clone();

                            caches.open(CACHE_NAME)
                                .then(cache => {
                                    cache.put(request, responseClone);
                                });

                        }

                        return networkResponse;

                    })
                    .catch(() => {

                        // Si es una página y no hay Internet
                        if (request.mode === "navigate") {

                            return caches.match("./index.html");

                        }

                    });

            })

    );

});
