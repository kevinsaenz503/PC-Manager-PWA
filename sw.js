const CACHE_NAME = "pc-manager-v5";

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

                console.log(
                    "Instalando PC Manager PWA..."
                );

                for (const archivo of ARCHIVOS) {

                    try {

                        await cache.add(archivo);

                        console.log(
                            "✓ Guardado:",
                            archivo
                        );

                    } catch (error) {

                        console.warn(
                            "⚠ No se pudo guardar:",
                            archivo
                        );

                    }

                }

            })

            .then(() => {

                return self.skipWaiting();

            })

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

                            console.log(
                                "Eliminando caché antigua:",
                                key
                            );

                            return caches.delete(key);
                        }

                    })

                );

            })

            .then(() => {

                return self.clients.claim();

            })

    );

});


/* =====================================================
   PETICIONES
   ===================================================== */

self.addEventListener("fetch", event => {

    const request = event.request;

    // Solo peticiones GET
    if (request.method !== "GET") {
        return;
    }

    const url = new URL(request.url);

    // No interceptar páginas o recursos externos
    if (url.origin !== self.location.origin) {
        return;
    }

    event.respondWith(

        caches.match(request)

            .then(cachedResponse => {

                // Primero buscar en caché
                if (cachedResponse) {

                    return cachedResponse;

                }

                // Si no está en caché,
                // intentar obtenerlo de Internet
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

                    })

                    .catch(() => {

                        /*
                         * Si no hay Internet y el usuario
                         * está intentando abrir una página,
                         * mostrar el Dashboard.
                         */

                        if (
                            request.mode === "navigate"
                        ) {

                            return caches.match(
                                "./index.html"
                            );

                        }

                    });

            })

    );

});
