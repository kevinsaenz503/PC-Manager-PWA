/* ==========================================
   PC MANAGER
   REPORTES DEL SISTEMA
   ========================================== */


/* ==========================================
   OBTENER DATOS
   ========================================== */

function obtenerDatos(nombre) {

    try {

        const datos = localStorage.getItem(nombre);

        if (!datos) {
            return [];
        }

        const resultado = JSON.parse(datos);

        return Array.isArray(resultado)
            ? resultado
            : [];

    } catch (error) {

        console.error(
            "Error al obtener:",
            nombre,
            error
        );

        return [];

    }

}


/* ==========================================
   DATOS DEL SISTEMA
   ========================================== */

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


/* ==========================================
   CONTADORES
   ========================================== */

document.getElementById(
    "totalComputadoras"
).textContent = computadoras.length;


document.getElementById(
    "totalUsuarios"
).textContent = usuarios.length;


document.getElementById(
    "totalPrestamos"
).textContent = prestamos.length;


document.getElementById(
    "totalMantenimientos"
).textContent =
    mantenimientos.length;


document.getElementById(
    "totalPerifericos"
).textContent =
    perifericos.length;


/* ==========================================
   ESTADO DE COMPUTADORAS
   ========================================== */

let disponibles = 0;
let prestadas = 0;
let mantenimiento = 0;


computadoras.forEach(computadora => {

    const estado =
        String(
            computadora.estado ||
            computadora.disponibilidad ||
            "Disponible"
        ).toLowerCase();


    if (
        estado.includes("prest")
    ) {

        prestadas++;

    } else if (
        estado.includes("manten")
    ) {

        mantenimiento++;

    } else {

        disponibles++;

    }

});


/* ==========================================
   GRÁFICO DE ESTADO
   ========================================== */

const canvasEstado =
    document.getElementById(
        "graficoEstado"
    );


if (canvasEstado) {

    new Chart(canvasEstado, {

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
                    mantenimiento
                ],

                backgroundColor: [
                    "#2196F3",
                    "#FF6384",
                    "#FF9800"
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

    });

}


/* ==========================================
   GRÁFICO DE INVENTARIO
   ========================================== */

const canvasInventario =
    document.getElementById(
        "graficoInventario"
    );


if (canvasInventario) {

    new Chart(canvasInventario, {

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

    });

}


/* ==========================================
   EXPORTAR CSV
   ========================================== */

document
    .getElementById("btnExportarCSV")
    .addEventListener(
        "click",
        exportarCSV
    );


function exportarCSV() {

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


    const blob = new Blob(
        [csv],
        {
            type:
                "text/csv;charset=utf-8;"
        }
    );


    const url =
        URL.createObjectURL(blob);


    const enlace =
        document.createElement("a");


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


/* ==========================================
   IMPRIMIR
   ========================================== */

document
    .getElementById("btnImprimir")
    .addEventListener(
        "click",
        () => {

            window.print();

        }
    );
