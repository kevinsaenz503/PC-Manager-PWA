const CACHE_NAME = "pc-manager-v6";

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

    "./manifest.webmanifest",

    "./img/icon-192.png",
    "./img/icon-512.png"
];


/* =====================================================
   INSTALACIÓN
   ===================================================== */

self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME)

            .then(async cache => {

                for (const archivo of ARCHIVOS) {

                    try {

                        await cache.add(archivo);

                        console.log(
                            "Guardado:",
                            archivo
                        );

                    } catch (error) {

                        console.warn(
                            "No se pudo guardar:",
                            archivo
                        );

                    }

                }

            })

            .then(() => self.skipWaiting())

    );

});


/* =====================================================
   ACTIVACIÓN
   ===================================================== */

self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys()
            .then(keys => {

                return Promise.all(

                    keys.map(key => {

                        if (key !== CACHE_NAME) {
                            return caches.delete(key);
                        }

                    })

                );

            })

            .then(() => self.clients.claim())

    );

});


/* =====================================================
   PETICIONES
   ===================================================== */

self.addEventListener("fetch", event => {

    const request = event.request;

    if (request.method !== "GET") {
        return;
    }

    const url = new URL(request.url);

    // No controlar recursos externos
    if (url.origin !== self.location.origin) {
        return;
    }

    event.respondWith(

        caches.match(request)

            .then(cachedResponse => {

                // Si está guardado, devolver exactamente
                // el archivo solicitado.
                if (cachedResponse) {
                    return cachedResponse;
                }

                // Si no está guardado, intentar Internet.
                return fetch(request)

                    .then(networkResponse => {

                        if (
                            networkResponse &&
                            networkResponse.status === 200
                        ) {

                            const copia =
                                networkResponse.clone();

                            caches.open(CACHE_NAME)
                                .then(cache => {

                                    cache.put(
                                        request,
                                        copia
                                    );

                                });

                        }

                        return networkResponse;

                    });

            })

    );

});
