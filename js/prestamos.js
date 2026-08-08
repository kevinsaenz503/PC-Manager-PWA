let prestamos = JSON.parse(localStorage.getItem("prestamos")) || [];

let pcs = JSON.parse(localStorage.getItem("pcs")) || [];

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

const form = document.getElementById("formPrestamo");

const tabla = document.getElementById("tablaPrestamos");

const selectPC = document.getElementById("pc");

const selectUsuario = document.getElementById("usuario");

function cargarDatos(){

    selectPC.innerHTML="";

    pcs.forEach(pc=>{

        if(pc.estado==="Prestada"){

            selectPC.innerHTML +=
            `<option value="${pc.codigo}">
                ${pc.codigo} - ${pc.marca} ${pc.modelo}
            </option>`;

        }

    });

    selectUsuario.innerHTML="";

    usuarios.forEach(u=>{

        selectUsuario.innerHTML +=
        `<option value="${u.nombre}">
            ${u.nombre}
        </option>`;

    });

}

function mostrar(){

    tabla.innerHTML="";

    prestamos.forEach((p,i)=>{

        tabla.innerHTML += `

<tr>

<td>${p.pc}</td>

<td>${p.usuario}</td>

<td>${p.fechaPrestamo}</td>

<td>${p.fechaDevolucion}</td>

<td>${p.observacion}</td>

<td>

<button class="eliminar"
onclick="eliminar(${i})">

🗑

</button>

</td>

</tr>

`;

    });

}

form.addEventListener("submit",e=>{

    e.preventDefault();

    prestamos.push({

        pc:pc.value,

        usuario:usuario.value,

        fechaPrestamo:fechaPrestamo.value,

        fechaDevolucion:fechaDevolucion.value,

        observacion:observacion.value

    });

    pcs.forEach(pc=>{

        if(pc.codigo===pc.value){

            pc.estado="Prestada";

        }

    });

    localStorage.setItem("prestamos",
    JSON.stringify(prestamos));

    localStorage.setItem("pcs",
    JSON.stringify(pcs));

    form.reset();

    cargarDatos();

    mostrar();

});

function eliminar(i){

    const codigo = prestamos[i].pc;

    pcs.forEach(pc=>{

        if(pc.codigo===codigo){

            pc.estado="Prestada";

        }

    });

    prestamos.splice(i,1);

    localStorage.setItem("prestamos",
    JSON.stringify(prestamos));

    localStorage.setItem("pcs",
    JSON.stringify(pcs));

    cargarDatos();

    mostrar();

}

cargarDatos();

mostrar();