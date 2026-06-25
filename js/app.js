// Calculadora de promedio

const btnAgregarEvaluacion = document.getElementById("btnAgregarEvaluacion");
const btnCalcularPromedio = document.getElementById("btnCalcularPromedio");
const tablaNotas = document.getElementById("tablaNotas");
const resultadoPromedio = document.getElementById("resultadoPromedio");

//btnAgregarEvaluacion.addEventListener("click", agregarEvaluacion);
//btnCalcularPromedio.addEventListener("click", calcularPromedio);

function agregarEvaluacion() {
    const fila = document.createElement("tr"); // Crea table row o fila

    // Nota
    const tdNota = document.createElement("td"); // Crea table data

    const inputNota = document.createElement("input"); // Crea un elemento de tipo input
    inputNota.type = "number"; // El input es de tipo number (números)
    inputNota.min = "1"; // El valor mínimo es 1
    inputNota.max = "7"; // El valor máximo es 7
    inputNota.step = "0.1"; // El salto numérico es de 0.1

    inputNota.classList.add("nota"); // La clase del input es "nota"

    tdNota.appendChild(inputNota); // Agrega un table data con lo especificado anteriormente

    // Porcentaje
    const tdProcentaje = document.createElement("td");

    const inputPorcentaje = document.createElement("input");
    inputPorcentaje.type = "number";
    inputPorcentaje.min = "0";
    inputPorcentaje.max = "100";

    inputPorcentaje.classList.add("porcentaje");

    tdProcentaje.appendChild(inputPorcentaje);

    // Botón eliminar
    const tdAccion = document.createElement("td");

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";

    btnEliminar.addEventListener("click", () => {
        if (confirm("¿Eliminar evaluación?")) {
            tablaNotas.removeChild(fila);
        }
    });

    tdAccion.appendChild(btnEliminar);

    fila.appendChild(tdNota);
    fila.appendChild(tdProcentaje);
    fila.appendChild(tdAccion);

    tablaNotas.appendChild(fila);
}

function calcularPromedio() {

    const notas = document.getElementsByClassName("nota");
    const porcentajes = document.getElementsByClassName("porcentaje");

    let sumaPonderada = 0;
    let sumaPorcentajes = 0;

    for (let i = 0; i < notas.length; i++) {

        const nota = parseFloat(notas[i].value) || 0;
        const porcentaje = parseFloat(porcentajes[i].value) || 0;

        // Validar nota 
        if (isNaN(nota)) {
            alert("Debe ingresar una nota válida.")
            return;
        }

        // Validar porcentaje
        if (isNaN(nota)) {
            alert("Debe ingresar un procentaje válido.")
            return;
        }

        // Validar nota dentro del rango
        if (nota < 1 || nota > 7) {
            alert("Las notas deben ser entre 1.0 y 7.0")
            return;
        }

        // Validar porcentaje
        if (porcentaje < 0 || porcentaje > 100) {
            alert("Los porcentajes deben estar entre 0% y 100%")
            return;
        }

        sumaPonderada += nota * porcentaje;
        sumaPorcentajes += porcentaje;
    }

    if (sumaPorcentajes !== 100) {
        alert("Los porcentajes no suman 100%. Por favor, corregirlo.")
        return;
    }

    const promedio = sumaPonderada / 100;

    resultadoPromedio.textContent = promedio.toFixed(2);
}

if (btnAgregarEvaluacion) {
    btnAgregarEvaluacion.addEventListener("click", agregarEvaluacion);
    btnCalcularPromedio.addEventListener("click", calcularPromedio);
    agregarEvaluacion();
}