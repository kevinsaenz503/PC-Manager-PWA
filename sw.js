const VERSION = "2.0.0";
const CACHE_NAME = `pcmanager-${VERSION}`;

const APP_SHELL = [

    "./",

    "./index.html",

    "./computadoras.html",

    "./usuarios.html",

    "./prestamos.html",

    "./mantenimiento.html",

    "./perifericos.html",

    "./reportes.html",

    "./configuracion.html",

    "./offline.html",

    "./manifest.webmanifest",

    "./css/style.css",

    "./js/dashboard.js",
    "./js/computadoras.js",
    "./js/usuarios.js",
    "./js/prestamos.js",
    "./js/mantenimiento.js",
    "./js/perifericos.js",
    "./js/reportes.js",
    "./js/configuracion.js",
    "./js/tema.js",

    "./img/icon-192.png",
    "./img/icon-512.png"

];

self.addEventListener("install", event => {

    self.skipWaiting();

    event.waitUntil(

        caches.open(CACHE_NAME)

            .then(cache => {

                console.log("Cache creada");

                return cache.addAll(APP_SHELL);

            })

    );

});

self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys()

            .then(keys =>

                Promise.all(

                    keys.map(key => {

                        if(key !== CACHE_NAME){

                            return caches.delete(key);

                        }

                    })

                )

            )

            .then(() => self.clients.claim())

    );

});

self.addEventListener("fetch", event => {

    if(event.request.method !== "GET") return;

    event.respondWith(

        fetch(event.request)

            .then(response => {

                const copia = response.clone();

                caches.open(CACHE_NAME)

                    .then(cache => cache.put(event.request,copia));

                return response;

            })

            .catch(() => {

                return caches.match(event.request)

                    .then(cacheResponse => {

                        return cacheResponse ||

                        caches.match("./offline.html");

                    });

            })

    );

});