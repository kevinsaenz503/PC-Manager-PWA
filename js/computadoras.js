let pcs = JSON.parse(localStorage.getItem("pcs")) || [];

const form = document.getElementById("formPC");
const tabla = document.getElementById("tablaPC");
const buscar = document.getElementById("buscar");

let indiceEditar = -1;

function guardar(){

    localStorage.setItem("pcs", JSON.stringify(pcs));

}

function mostrar(lista = pcs){

    tabla.innerHTML = "";

    lista.forEach((pc, index)=>{

        let color = "green";

        if(pc.estado==="Prestada") color="orange";

        if(pc.estado==="Mantenimiento") color="red";

        tabla.innerHTML += `

        <tr>

            <td>${pc.codigo}</td>

            <td>${pc.marca}</td>

            <td>${pc.modelo}</td>

            <td>${pc.procesador}</td>

            <td>${pc.ram}</td>

            <td>${pc.disco}</td>

            <td>

                <span class="estado ${color}">

                    ${pc.estado}

                </span>

            </td>

            <td>

                <button class="editar"

                    onclick="editar(${index})">

                    ✏️

                </button>

                <button class="eliminar"

                    onclick="eliminar(${index})">

                    🗑️

                </button>

            </td>

        </tr>

        `;

    });

}

form.addEventListener("submit",(e)=>{

    e.preventDefault();

    const pc={

        codigo:codigo.value,
        marca:marca.value,
        modelo:modelo.value,
        procesador:procesador.value,
        ram:ram.value,
        disco:disco.value,
        estado:estado.value

    };

    if(indiceEditar==-1){

        pcs.push(pc);

    }else{

        pcs[indiceEditar]=pc;

        indiceEditar=-1;

    }

    guardar();

    form.reset();

    mostrar();

});

function editar(i){

    indiceEditar=i;

    const pc=pcs[i];

    codigo.value=pc.codigo;

    marca.value=pc.marca;

    modelo.value=pc.modelo;

    procesador.value=pc.procesador;

    ram.value=pc.ram;

    disco.value=pc.disco;

    estado.value=pc.estado;

}

function eliminar(i){

    if(confirm("¿Eliminar esta computadora?")){

        pcs.splice(i,1);

        guardar();

        mostrar();

    }

}

buscar.addEventListener("keyup",()=>{

    const texto=buscar.value.toLowerCase();

    const resultado=pcs.filter(pc=>

        pc.codigo.toLowerCase().includes(texto) ||

        pc.marca.toLowerCase().includes(texto) ||

        pc.modelo.toLowerCase().includes(texto)

    );

    mostrar(resultado);

});

mostrar();