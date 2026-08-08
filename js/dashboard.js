const pcs = JSON.parse(localStorage.getItem("pcs")) || [];
const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
const prestamos = JSON.parse(localStorage.getItem("prestamos")) || [];
const mantenimientos = JSON.parse(localStorage.getItem("mantenimientos")) || [];

document.getElementById("totalPC").textContent = pcs.length;
document.getElementById("totalUsuarios").textContent = usuarios.length;
document.getElementById("totalPrestamos").textContent = prestamos.length;
document.getElementById("totalMant").textContent = mantenimientos.length;


// Fecha y hora

function actualizarHora(){

    const ahora = new Date();

    const opciones = {

        weekday:"long",
        year:"numeric",
        month:"long",
        day:"numeric",
        hour:"2-digit",
        minute:"2-digit",
        second:"2-digit"

    };

    const texto = ahora.toLocaleDateString("es-ES", opciones);

    document.getElementById("horaActual").textContent = texto;

    document.getElementById("horaEvento").textContent =
    ahora.toLocaleTimeString();

}

setInterval(actualizarHora,1000);

actualizarHora();

// Estado de conexión

const conexion = document.getElementById("conexion");

function estadoConexion(){

    conexion.textContent = navigator.onLine
        ? "🟢 En línea"
        : "🔴 Sin conexión";

}

window.addEventListener("online",estadoConexion);

window.addEventListener("offline",estadoConexion);

estadoConexion();



const menu=document.querySelector(".sidebar");

document.getElementById("menuBtn").onclick=()=>{

menu.classList.toggle("active");

}