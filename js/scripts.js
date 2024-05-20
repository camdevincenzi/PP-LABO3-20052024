import { Planeta } from "./Planeta.js";
import { leer, escribir, limpiar, objectToJson, jsonToObject } from "./localStorage.js";
import { mostrarSpinner, ocultarSpinner } from "./spinner.js";

document.addEventListener("DOMContentLoaded", onInit);

const KEY_STORAGE = "planetas";
let planetas = [];

function onInit() {
    cargarPlaneta();
    onSubmit();
    eliminarPlanetas();
}

async function cargarPlaneta() {
    mostrarSpinner();
    let str = await leer(KEY_STORAGE);
    console.log("Contenido de str:", str); // Verifica el contenido de str
    const objetos = jsonToObject(str) || [];

    if (!Array.isArray(objetos)) {
        console.error("La variable 'objetos' no es un arreglo:", objetos);
        return;
    }

    objetos.forEach(obj => {
        const planeta = new Planeta(
            obj.id,
            obj.nombre,
            obj.tamaño,
            obj.masa,
            obj.tipo,
            obj.distanciaAlSol,
            obj.tieneVida,
            obj.tieneAnillo,
            obj.compAtmosferica
        );

        planetas.push(planeta);
        agregarPlanetaATabla(planeta);
    });
    ocultarSpinner();
}

function onSubmit() {
    const form = document.getElementById("form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const id = Date.now();
        const nombre = form.querySelector("#nombre").value;
        const tamaño = form.querySelector("#tamaño").value;
        const masa = form.querySelector("#masa").value;
        const tipo = getSelectedValue();
        const distanciaAlSol = form.querySelector("#distanciaAlSol").value;
        const tieneVida = obtenerCheckbox("tieneVida");
        const tieneAnillo = obtenerCheckbox("tieneAnillo");
        const compAtmosferica = form.querySelector("#composicion-atm").value;

        if (!nombre || !tamaño || !masa || !tipo || !distanciaAlSol || !compAtmosferica) {
            alert("Todos los campos son obligatorios");
            return;
        }

        const planeta = new Planeta(
            id,
            nombre,
            tamaño,
            masa,
            tipo,
            distanciaAlSol,
            tieneVida,
            tieneAnillo,
            compAtmosferica
        );

        planetas.push(planeta);

        console.log(planeta);

        mostrarSpinner();
        await escribir(KEY_STORAGE, objectToJson(planetas));
        agregarPlanetaATabla(planeta);
        form.reset();
        ocultarSpinner();
    });
}

function getSelectedValue() {
    const select = document.getElementById('tipo');
    return select.value;
}

function obtenerCheckbox(checkbox) {
    const ch = document.getElementById(checkbox);
    return ch.checked;
}

function agregarPlanetaATabla(planeta) {
    const tabla = document.getElementById("planetas-tabla");
    let tbody = tabla.getElementsByTagName('tbody')[0];
    let fila = tbody.insertRow();

    fila.insertCell().textContent = planeta.id;
    fila.insertCell().textContent = planeta.nombre;
    fila.insertCell().textContent = planeta.tamaño;
    fila.insertCell().textContent = planeta.masa;
    fila.insertCell().textContent = planeta.tipo;
    fila.insertCell().textContent = planeta.distanciaAlSol;
    fila.insertCell().textContent = planeta.tieneVida;
    fila.insertCell().textContent = planeta.tieneAnillo;
    fila.insertCell().textContent = planeta.compAtmosferica;
}

function eliminarPlanetas() {
    const btn = document.getElementById("limpiar-btn");

    btn.addEventListener("click", async (e) => {
        const rta = confirm('Desea eliminar todos los Items?');

        if (rta) {
            planetas.splice(0, planetas.length);

            mostrarSpinner();
            await limpiar(KEY_STORAGE);
            limpiarTabla();
            ocultarSpinner();
        }
    });
}

function limpiarTabla() {
    const tabla = document.getElementById("planetas-tabla");
    let tbody = tabla.getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
}