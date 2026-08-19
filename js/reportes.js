/* =====================================================
   PC MANAGER
   REPORTES
   ===================================================== */


/* =====================================================
   OBTENER DATOS DEL LOCALSTORAGE
   ===================================================== */

function obtenerDatos(clave) {

    try {

        const datos = localStorage.getItem(clave);

        if (!datos) {
            return [];
        }

        const resultado = JSON.parse(datos);

        if (Array.isArray(resultado)) {
            return resultado;
        }

        return [];

    } catch (error) {

        console.error(
            "Error leyendo " + clave,
            error
        );

        return [];

    }

}


/* =====================================================
   DATOS
   ===================================================== */

const computadoras =
    obtenerDatos("computadoras");

const usuarios =
    obtenerDatos("usuarios");

const prestamos =
    obtenerDatos("prestamos");

const mantenimientos =
    obtenerDatos("mantenimientos");

const perifericos =
    obtenerDatos("perifericos");


console.log("Computadoras:", computadoras);
console.log("Usuarios:", usuarios);
console.log("Préstamos:", prestamos);
console.log("Mantenimientos:", mantenimientos);
console.log("Periféricos:", perifericos);


/* =====================================================
   MOSTRAR CANTIDADES
   ===================================================== */

const pcTotal =
    document.getElementById("pcTotal");

const usuariosTotal =
    document.getElementById("usuariosTotal");

const prestamosTotal =
    document.getElementById("prestamosTotal");

const mantenimientosTotal =
    document.getElementById("mantenimientosTotal");

const perifericosTotal =
    document.getElementById("perifericosTotal");


if (pcTotal) {

    pcTotal.textContent =
        computadoras.length;

}


if (usuariosTotal) {

    usuariosTotal.textContent =
        usuarios.length;

}


if (prestamosTotal) {

    prestamosTotal.textContent =
        prestamos.length;

}


if (mantenimientosTotal) {

    mantenimientosTotal.textContent =
        mantenimientos.length;

}


if (perifericosTotal) {

    perifericosTotal.textContent =
        perifericos.length;

}


/* =====================================================
   ESTADO DE COMPUTADORAS
   ===================================================== */

let disponibles = 0;

let prestadas = 0;

let enMantenimiento = 0;


computadoras.forEach(computadora => {

    const estado = String(

        computadora.estado ??
        computadora.disponibilidad ??
        computadora.status ??
        "Disponible"

    ).toLowerCase().trim();


    if (
        estado.includes("prest")
    ) {

        prestadas++;

    }

    else if (
        estado.includes("manten")
    ) {

        enMantenimiento++;

    }

    else {

        disponibles++;

    }

});


console.log(
    "Estados:",
    disponibles,
    prestadas,
    enMantenimiento
);


/* =====================================================
   GRÁFICA ESTADO
   ===================================================== */

const canvasEstado =
    document.getElementById(
        "graficaEstado"
    );


if (
    canvasEstado &&
    typeof Chart !== "undefined"
) {

    new Chart(
        canvasEstado,
        {

            type: "doughnut",

            data: {

                labels: [

                    "Disponible",

                    "Prestada",

                    "Mantenimiento"

                ],

                datasets: [{

                    data: [

                        disponibles,

                        prestadas,

                        enMantenimiento

                    ],

                    backgroundColor: [

                        "#42A5F5",

                        "#FF6384",

                        "#FF9F40"

                    ],

                    borderColor: "#ffffff",

                    borderWidth: 2

                }]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {

                        position: "top"

                    }

                }

            }

        }
    );

}


/* =====================================================
   GRÁFICA INVENTARIO
   ===================================================== */

const canvasInventario =
    document.getElementById(
        "graficaInventario"
    );


if (
    canvasInventario &&
    typeof Chart !== "undefined"
) {

    new Chart(
        canvasInventario,
        {

            type: "bar",

            data: {

                labels: [

                    "PC",

                    "Usuarios",

                    "Préstamos",

                    "Mantenimiento",

                    "Periféricos"

                ],

                datasets: [{

                    label: "Cantidad",

                    data: [

                        computadoras.length,

                        usuarios.length,

                        prestamos.length,

                        mantenimientos.length,

                        perifericos.length

                    ],

                    backgroundColor:
                        "#42A5F5",

                    borderColor:
                        "#1565C0",

                    borderWidth: 1,

                    borderRadius: 6

                }]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                scales: {

                    y: {

                        beginAtZero: true,

                        ticks: {

                            precision: 0

                        }

                    }

                },

                plugins: {

                    legend: {

                        display: true

                    }

                }

            }

        }
    );

}


/* =====================================================
   EXPORTAR CSV
   ===================================================== */

const botonCSV =
    document.getElementById(
        "exportarCSV"
    );


if (botonCSV) {

    botonCSV.addEventListener(
        "click",
        () => {

            const filas = [

                [
                    "Categoría",
                    "Cantidad"
                ],

                [
                    "Computadoras",
                    computadoras.length
                ],

                [
                    "Usuarios",
                    usuarios.length
                ],

                [
                    "Préstamos",
                    prestamos.length
                ],

                [
                    "Mantenimientos",
                    mantenimientos.length
                ],

                [
                    "Periféricos",
                    perifericos.length
                ]

            ];


            const csv = filas
                .map(fila =>
                    fila.join(",")
                )
                .join("\n");


            const blob =
                new Blob(
                    [csv],
                    {
                        type:
                            "text/csv;charset=utf-8;"
                    }
                );


            const url =
                URL.createObjectURL(
                    blob
                );


            const enlace =
                document.createElement(
                    "a"
                );


            enlace.href = url;

            enlace.download =
                "reporte-pc-manager.csv";


            document.body.appendChild(
                enlace
            );


            enlace.click();


            document.body.removeChild(
                enlace
            );


            URL.revokeObjectURL(url);

        }
    );

}
