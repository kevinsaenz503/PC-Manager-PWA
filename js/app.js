if("serviceWorker" in navigator){

window.addEventListener("load",()=>{

navigator.serviceWorker.register("/sw.js")

.then(()=>{

console.log("Service Worker registrado");

})

.catch(error=>{

console.log(error);

});

});

}

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       MODO OSCURO
       ========================================= */

    const botonModo = document.getElementById("modoOscuro");

    // Aplicar el modo guardado en todas las páginas
    if (localStorage.getItem("modo") === "oscuro") {
        document.body.classList.add("dark");
    }

    // El botón solamente existe en Configuración
    if (botonModo) {

        actualizarBoton();

        botonModo.addEventListener("click", () => {

            document.body.classList.toggle("dark");

            const oscuro =
                document.body.classList.contains("dark");

            localStorage.setItem(
                "modo",
                oscuro ? "oscuro" : "claro"
            );

            actualizarBoton();

        });

    }


    function actualizarBoton() {

        if (!botonModo) return;

        if (document.body.classList.contains("dark")) {

            botonModo.textContent = "☀️";
            botonModo.title = "Cambiar a modo claro";

        } else {

            botonModo.textContent = "🌙";
            botonModo.title = "Cambiar a modo oscuro";

        }

    }

});
