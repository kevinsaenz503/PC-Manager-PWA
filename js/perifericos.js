let perifericos = JSON.parse(localStorage.getItem("perifericos")) || [];

const form = document.getElementById("formPeriferico");
const tabla = document.getElementById("tablaPerifericos");
const buscar = document.getElementById("buscar");

let indiceEditar = -1;

function guardarDatos() {
    localStorage.setItem("perifericos", JSON.stringify(perifericos));
}

function listar(lista = perifericos) {

    tabla.innerHTML = "";

    lista.forEach((p, i) => {

        let color = "#2E7D32";

        if (p.estado === "Asignado") color = "#F9A825";
        if (p.estado === "Mantenimiento") color = "#C62828";

        tabla.innerHTML += `

<tr>

<td>${p.codigo}</td>

<td>${p.tipo}</td>

<td>${p.marca}</td>

<td>${p.modelo}</td>

<td>${p.serie}</td>

<td>

<span style="color:white;background:${color};
padding:6px 12px;border-radius:20px;">

${p.estado}

</span>

</td>

<td>${p.ubicacion}</td>

<td>

<button class="editar"
onclick="editar(${i})">

✏️

</button>

<button class="eliminar"
onclick="eliminar(${i})">

🗑️

</button>

</td>

</tr>

`;

    });

}

form.addEventListener("submit", e => {

    e.preventDefault();

    const dato = {

        codigo: codigo.value,
        tipo: tipo.value,
        marca: marca.value,
        modelo: modelo.value,
        serie: serie.value,
        estado: estado.value,
        ubicacion: ubicacion.value

    };

    if (indiceEditar === -1) {

        perifericos.push(dato);

    } else {

        perifericos[indiceEditar] = dato;

        indiceEditar = -1;

    }

    guardarDatos();

    form.reset();

    listar();

});

function editar(i) {

    indiceEditar = i;

    const p = perifericos[i];

    codigo.value = p.codigo;
    tipo.value = p.tipo;
    marca.value = p.marca;
    modelo.value = p.modelo;
    serie.value = p.serie;
    estado.value = p.estado;
    ubicacion.value = p.ubicacion;

}

function eliminar(i) {

    if (confirm("¿Eliminar este periférico?")) {

        perifericos.splice(i, 1);

        guardarDatos();

        listar();

    }

}

buscar.addEventListener("keyup", () => {

    const texto = buscar.value.toLowerCase();

    listar(

        perifericos.filter(p =>

            p.codigo.toLowerCase().includes(texto) ||
            p.tipo.toLowerCase().includes(texto) ||
            p.marca.toLowerCase().includes(texto)

        )

    );

});

listar();