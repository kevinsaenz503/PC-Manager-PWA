const CACHE_NAME = "pc-manager-v4";

const ARCHIVOS = [
    "./",
    "./index.html",
    "./css/style.css",
    "./manifest.webmanifest"
];


// =====================================================
// INSTALACIÓN
// =====================================================

self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME)
            .then(async cache => {

                console.log("Instalando PC Manager PWA");

                for (const archivo of ARCHIVOS) {

                    try {

                        await cache.add(archivo);

                        console.log(
                            "Guardado en caché:",
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


// =====================================================
// ACTIVACIÓN
// =====================================================

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


// =====================================================
// PETICIONES
// =====================================================

self.addEventListener("fetch", event => {

    if (event.request.method !== "GET") {
        return;
    }

    const url = new URL(event.request.url);

    // No controlar páginas externas
    if (url.origin !== location.origin) {
        return;
    }

    event.respondWith(

        caches.match(event.request)
            .then(cached => {

                if (cached) {
                    return cached;
                }

                return fetch(event.request)
                    .then(response => {

                        if (
                            response &&
                            response.status === 200
                        ) {

                            const copia =
                                response.clone();

                            caches.open(CACHE_NAME)
                                .then(cache => {

                                    cache.put(
                                        event.request,
                                        copia
                                    );

                                });

                        }

                        return response;

                    })
                    .catch(() => {

                        // Si está offline y es una navegación,
                        // regresar al inicio.

                        if (
                            event.request.mode === "navigate"
                        ) {

                            return caches.match(
                                "./index.html"
                            );

                        }

                    });

            })

    );

});
