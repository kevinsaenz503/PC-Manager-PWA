const pcs = JSON.parse(localStorage.getItem("pcs")) || [];
const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
const prestamos = JSON.parse(localStorage.getItem("prestamos")) || [];
const mantenimientos = JSON.parse(localStorage.getItem("mantenimientos")) || [];
const perifericos = JSON.parse(localStorage.getItem("perifericos")) || [];

document.getElementById("pcTotal").textContent = pcs.length;
document.getElementById("usuariosTotal").textContent = usuarios.length;
document.getElementById("prestamosTotal").textContent = prestamos.length;
document.getElementById("mantenimientosTotal").textContent = mantenimientos.length;
document.getElementById("perifericosTotal").textContent = perifericos.length;

const disponibles = pcs.filter(p => p.estado === "Disponible").length;
const prestadas = pcs.filter(p => p.estado === "Prestada").length;
const mantenimiento = pcs.filter(p => p.estado === "Mantenimiento").length;

new Chart(document.getElementById("graficaEstado"), {

type: "pie",

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

]

}]

}

});

new Chart(document.getElementById("graficaInventario"), {

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

pcs.length,

usuarios.length,

prestamos.length,

mantenimientos.length,

perifericos.length

]

}]

}

});

document.getElementById("exportarCSV").addEventListener("click", ()=>{

let csv="Modulo,Cantidad\n";

csv+="Computadoras,"+pcs.length+"\n";

csv+="Usuarios,"+usuarios.length+"\n";

csv+="Prestamos,"+prestamos.length+"\n";

csv+="Mantenimientos,"+mantenimientos.length+"\n";

csv+="Perifericos,"+perifericos.length+"\n";

const blob = new Blob([csv],{type:"text/csv"});

const a=document.createElement("a");

a.href=URL.createObjectURL(blob);

a.download="reporte.csv";

a.click();

});
