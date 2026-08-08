const institucion = document.getElementById("institucion");
const administrador = document.getElementById("administrador");

institucion.value =
localStorage.getItem("institucion") || "";

administrador.value =
localStorage.getItem("administrador") || "";

document.getElementById("guardar").onclick = () => {

    localStorage.setItem(
        "institucion",
        institucion.value
    );

    localStorage.setItem(
        "administrador",
        administrador.value
    );

    alert("Configuración guardada.");

};

document.getElementById("backup").onclick = () => {

    const datos = {};

    for (let i = 0; i < localStorage.length; i++) {

        const clave = localStorage.key(i);

        datos[clave] = localStorage.getItem(clave);

    }

    const blob = new Blob(
        [JSON.stringify(datos, null, 2)],
        { type: "application/json" }
    );

    const enlace = document.createElement("a");

    enlace.href = URL.createObjectURL(blob);

    enlace.download = "PCManager_Backup.json";

    enlace.click();

};

document.getElementById("restaurar").addEventListener("change", e => {

    const archivo = e.target.files[0];

    if (!archivo) return;

    const lector = new FileReader();

    lector.onload = evento => {

        const datos = JSON.parse(evento.target.result);

        for (const clave in datos) {

            localStorage.setItem(clave, datos[clave]);

        }

        alert("Respaldo restaurado correctamente.");

        location.reload();

    };

    lector.readAsText(archivo);

});

document.getElementById("reiniciar").onclick = () => {

    if (confirm("¿Eliminar toda la información del sistema?")) {

        localStorage.clear();

        alert("Todos los datos fueron eliminados.");

        location.reload();

    }

};