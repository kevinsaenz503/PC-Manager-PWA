let mantenimientos =
JSON.parse(localStorage.getItem("mantenimientos")) || [];

let pcs =
JSON.parse(localStorage.getItem("pcs")) || [];

const form = document.getElementById("formMantenimiento");
const tabla = document.getElementById("tablaMantenimiento");
const combo = document.getElementById("computadora");

function cargarEquipos(){

    combo.innerHTML="";

    pcs.forEach(pc=>{

        if(pc.estado==="Mantenimiento"){

            combo.innerHTML+=`
            <option value="${pc.codigo}">
                ${pc.codigo} - ${pc.marca} ${pc.modelo}
            </option>`;

        }

    });

}

function listar(){

    tabla.innerHTML="";

    mantenimientos.forEach((m,i)=>{

        tabla.innerHTML+=`

<tr>

<td>${m.pc}</td>

<td>${m.tipo}</td>

<td>${m.tecnico}</td>

<td>${m.ingreso}</td>

<td>${m.salida}</td>

<td>$${m.costo}</td>

<td>${m.estado}</td>

<td>

<button onclick="finalizar(${i})">

Finalizar

</button>

</td>

</tr>

`;

    });

}

form.addEventListener("submit",e=>{

    e.preventDefault();

    mantenimientos.push({

        pc:computadora.value,

        tipo:tipo.value,

        tecnico:tecnico.value,

        ingreso:fechaIngreso.value,

        salida:fechaSalida.value,

        costo:costo.value,

        estado:"En mantenimiento"

    });

    pcs.forEach(pc=>{

        if(pc.codigo===computadora.value){

            pc.estado="Mantenimiento";

        }

    });

    localStorage.setItem("pcs",
    JSON.stringify(pcs));

    localStorage.setItem("mantenimientos",
    JSON.stringify(mantenimientos));

    form.reset();

    cargarEquipos();

    listar();

});

function finalizar(i){

    let codigo = mantenimientos[i].pc;

    pcs.forEach(pc=>{

        if(pc.codigo===codigo){

            pc.estado="Mantenimiento";

        }

    });

    mantenimientos.splice(i,1);

    localStorage.setItem("pcs",
    JSON.stringify(pcs));

    localStorage.setItem("mantenimientos",
    JSON.stringify(mantenimientos));

    cargarEquipos();

    listar();

}

cargarEquipos();

listar();