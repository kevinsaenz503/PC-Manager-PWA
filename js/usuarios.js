let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

const form = document.getElementById("formUsuario");
const tabla = document.getElementById("tablaUsuarios");
const buscar = document.getElementById("buscar");

let editar = -1;

function guardar() {

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

}

function listar(lista = usuarios) {

    tabla.innerHTML = "";

    lista.forEach((u, i) => {

        tabla.innerHTML += `

<tr>

<td>${u.codigo}</td>

<td>${u.nombre}</td>

<td>${u.cargo}</td>

<td>${u.departamento}</td>

<td>${u.correo}</td>

<td>${u.telefono}</td>

<td>

<button class="editar"
onclick="editarUsuario(${i})">

✏

</button>

<button class="eliminar"
onclick="eliminarUsuario(${i})">

🗑

</button>

</td>

</tr>

`;

    });

}

form.addEventListener("submit", e => {

    e.preventDefault();

    const usuario = {

        codigo: codigo.value,
        nombre: nombre.value,
        cargo: cargo.value,
        departamento: departamento.value,
        correo: correo.value,
        telefono: telefono.value

    };

    if (editar == -1) {

        usuarios.push(usuario);

    } else {

        usuarios[editar] = usuario;

        editar = -1;

    }

    guardar();

    form.reset();

    listar();

});

function editarUsuario(i) {

    editar = i;

    const u = usuarios[i];

    codigo.value = u.codigo;
    nombre.value = u.nombre;
    cargo.value = u.cargo;
    departamento.value = u.departamento;
    correo.value = u.correo;
    telefono.value = u.telefono;

}

function eliminarUsuario(i) {

    if (confirm("¿Eliminar usuario?")) {

        usuarios.splice(i, 1);

        guardar();

        listar();

    }

}

buscar.addEventListener("keyup", () => {

    const txt = buscar.value.toLowerCase();

    listar(

        usuarios.filter(u =>

            u.codigo.toLowerCase().includes(txt) ||

            u.nombre.toLowerCase().includes(txt) ||

            u.departamento.toLowerCase().includes(txt)

        )

    );

});

listar();