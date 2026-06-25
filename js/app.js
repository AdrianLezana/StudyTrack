// Calculadora de promedio

const btnAgregarEvaluacion = document.getElementById("btnAgregarEvaluacion");
const btnCalcularPromedio = document.getElementById("btnCalcularPromedio");
const tablaNotas = document.getElementById("tablaNotas");
const resultadoPromedio = document.getElementById("resultadoPromedio");

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

    // Crea un input para el porcentaje
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

    // Agrega un aviso al botón eliminar para eliminar la fila correspondiente
    btnEliminar.addEventListener("click", () => {
        if (confirm("¿Eliminar evaluación?")) {
            tablaNotas.removeChild(fila);
        }
    });

    // Agrega el botón eliminar a la celda de acción y la fila a la tabla
    tdAccion.appendChild(btnEliminar);
    fila.appendChild(tdNota);
    fila.appendChild(tdProcentaje);
    fila.appendChild(tdAccion);

    tablaNotas.appendChild(fila);
}

// Función para calcular el promedio
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
            porcentaje.focus();
            return;
        }

        // Validar porcentaje
        if (isNaN(porcentaje)) {
            alert("Debe ingresar un porcentaje válido.")
            porcentaje.focus();
            return;
        }

        // Validar nota dentro del rango
        if (nota < 1 || nota > 7) {
            alert("Las notas deben ser entre 1.0 y 7.0")
            nota.focus();
            return;
        }

        // Validar porcentaje
        if (porcentaje < 0 || porcentaje > 100) {
            alert("Los porcentajes deben estar entre 0% y 100%")
            porcentaje.focus();
            return;
        }

        sumaPonderada += nota * porcentaje;
        sumaPorcentajes += porcentaje;
    }

    // Validar que la suma de los porcentajes sea 100
    if (sumaPorcentajes !== 100) {
        alert("Los porcentajes no suman 100%. Por favor, corregirlo.")
        porcentaje.focus();
        return;
    }

    const promedio = sumaPonderada / 100; // Dividimos por 100 porque los porcentajes suman 100

    resultadoPromedio.textContent = promedio.toFixed(2); // Muestra el promedio con dos decimales
}

// Validador de que los elementos existan antes de agregar los event listeners
if (btnAgregarEvaluacion) {
    btnAgregarEvaluacion.addEventListener("click", agregarEvaluacion);
    btnCalcularPromedio.addEventListener("click", calcularPromedio);
    agregarEvaluacion();
}

// Planificador de tareas

const txtTarea = document.getElementById("txtTarea");
const btnAgregar = document.getElementById("btnAgregar");
const listaTareas = document.getElementById("listaTareas");

// Función para agregar una tarea a la lista
function agregarTarea() {

    // Validador de que el campo de texto no esté vacío
    const descripcion = txtTarea.value.trim();
    if (!descripcion) {
        alert("Ingresa una tarea para agregar.");
        txtTarea.focus();
        return;
    }

    // Crear elemento de lista para la tarea
    const item = document.createElement("li");
    item.classList.add("tareaItem");

    // Crear checkbox y label para la tarea
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("tareaCheckbox");
    checkbox.id = `tarea-${Date.now()}`;

    // Crear label para la tarea
    const label = document.createElement("label");
    label.htmlFor = checkbox.id;
    label.textContent = descripcion;
    label.classList.add("tareaLabel");

    // Agregar evento para marcar la tarea como completada
    checkbox.addEventListener("change", () => {
        label.classList.toggle("completada");
    });

    // Agregar botón para eliminar la tarea
    const btnEliminarTarea = document.createElement("button");
    btnEliminarTarea.type = "button";
    btnEliminarTarea.textContent = "Eliminar";
    btnEliminarTarea.classList.add("btnEliminarTarea");
    btnEliminarTarea.addEventListener("click", () => {
        listaTareas.removeChild(item);
    });

    // Agregar elementos al item de la lista
    item.appendChild(checkbox);
    item.appendChild(label);
    item.appendChild(btnEliminarTarea);
    listaTareas.appendChild(item);

    // Limpiar el campo de texto y enfocar nuevamente
    txtTarea.value = "";
    txtTarea.focus();
}

// Validador de que los elementos existan antes de agregar los event listeners
if (btnAgregar && txtTarea && listaTareas) {
    btnAgregar.addEventListener("click", agregarTarea);

    // Permitir agregar tarea al presionar Enter en el campo de texto
    txtTarea.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            agregarTarea();
        }
    });
}

const temporizador = document.getElementById("temporizador");
const btnIniciarPomodoro = document.getElementById("btnIniciarPomodoro");
const btnPausarPomodoro = document.getElementById("btnPausarPomodoro");
const btnReiniciarPomodoro = document.getElementById("btnReiniciarPomodoro");

let tiempoRestante = 1500; // 25 minutos = 1500 segundos

let intervalo = null; // Variable para almacenar el intervalo del temporizador

// Función para actualizar el temporizador en la interfaz
function actualizarTemporizador() {
    const minutos = Math.floor(tiempoRestante / 60);
    const segundos = tiempoRestante % 60;
    const TiempoFormateado = `${minutos.toString().padStart(2, "0")}:${segundos.toString().padStart(2, "0")}`;
    temporizador.textContent = TiempoFormateado;
}

// Función para iniciar el temporizador
function iniciarPomodoro() {
    if (intervalo !== null) {
        return; // Evita iniciar múltiples intervalos   
    }

    // Inicia el intervalo que decrementa el tiempo restante cada segundo
    intervalo = setInterval(() => {
        tiempoRestante--;
        actualizarTemporizador();

        if (tiempoRestante <= 0) {
            clearInterval(intervalo);
            intervalo = null;
            alert("¡Tiempo terminado!");
        }
    }, 1000);
}

// Función para pausar el temporizador
function pausarPomodoro() {
    if (intervalo !== null) {
        clearInterval(intervalo);
        intervalo = null;
    }
}

// Función para reiniciar el temporizador
function reiniciarPomodoro() {
    clearInterval(intervalo);
    intervalo = null;
    tiempoRestante = 1500;
    actualizarTemporizador();
}

// Validador de que los elementos existan antes de agregar los event listeners
if (
    btnIniciarPomodoro &&
    btnPausarPomodoro &&
    btnReiniciarPomodoro &&
    temporizador
) {
    btnIniciarPomodoro.addEventListener("click", iniciarPomodoro);
    btnPausarPomodoro.addEventListener("click", pausarPomodoro);
    btnReiniciarPomodoro.addEventListener("click", reiniciarPomodoro);
    actualizarTemporizador(); // Inicializa el temporizador en la interfaz
}