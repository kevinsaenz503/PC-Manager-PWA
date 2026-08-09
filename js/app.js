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

    const botonModo = document.getElementById("modoOscuro");

    if (!botonModo) {
        return;
    }

    // Recuperar configuración guardada
    const modoGuardado = localStorage.getItem("pcmanager-modo");

    if (modoGuardado === "oscuro") {
        document.body.classList.add("dark");
        botonModo.textContent = "☀️";
    } else {
        botonModo.textContent = "🌙";
    }

    // Cambiar modo
    botonModo.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        const oscuro = document.body.classList.contains("dark");

        if (oscuro) {
            localStorage.setItem("pcmanager-modo", "oscuro");
            botonModo.textContent = "☀️";
        } else {
            localStorage.setItem("pcmanager-modo", "claro");
            botonModo.textContent = "🌙";
        }

    });

});
