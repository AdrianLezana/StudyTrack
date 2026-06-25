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

        // Validar nota dentro del rango
        if (nota < 1 || nota > 7) {
            alert("Las notas deben ser entre 1.0 y 7.0")
            notas[i].focus();
            return;
        }

        // Validar porcentaje
        if (porcentaje < 0 || porcentaje > 100) {
            alert("Los porcentajes deben estar entre 0% y 100%")
            porcentajes[i].focus();
            return;
        }

        sumaPonderada += nota * porcentaje;
        sumaPorcentajes += porcentaje;
    }

    // Validar que la suma de los porcentajes sea 100
    if (sumaPorcentajes !== 100) {
        alert("Los porcentajes no suman 100%. Por favor, corregirlo.")
        if (porcentajes.length > 0) {
            porcentajes[0].focus(); // Enfoca el primer campo de porcentaje para que el usuario pueda corregirlo
        }
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

// Consejo del día

const pConsejo = document.getElementById("consejo");
const btnConsejo = document.getElementById("btnConsejo");

// Lista con los consejos de estudio
const consejos = [
    "Prueba la técnica Feynman: explica el tema que estás estudiando con tus propias palabras como si le enseñaras a un niño.",
    "Toma descansos activos. Camina o estírate durante tus pausas de Pomodoro para reactivar tu circulación.",
    "Estudia primero la materia más difícil o compleja cuando tu energía y concentración estén al máximo.",
    "Elimina las distracciones digitales: pon tu teléfono en otra habitación o usa aplicaciones que bloqueen redes sociales.",
    "El cerebro recuerda mejor lo que intenta evocar activamente. Ponte mini-baches o hazte preguntas a ti mismo en lugar de solo releer.",
    "Mantén tu espacio de estudio limpio y ordenado; un entorno caótico distrae la mente de forma inconsciente."
];

// Función para seleccionar y mostrar un consejo aleatorio
function mostrarConsejoAleatorio() {
    // Math.random() genera un número entre 0 y 0.999...
    // Lo multiplicamos por el largo del array y Math.floor() lo redondea hacia abajo
    const indiceAleatorio = Math.floor(Math.random() * consejos.length);
    
    // Cambiamos el texto del párrafo en el HTML
    pConsejo.textContent = consejos[indiceAleatorio];
}

// Se asigna el evento si los elementos están en la página actual
if (btnConsejo && pConsejo) {
    btnConsejo.addEventListener("click", mostrarConsejoAleatorio);
}

// Modo oscuro

const btnTema = document.getElementById("btnTema");

// Función para alternar la clase en el body
function alternarTema() {
    // .classList.toggle() añade la clase si no existe, o la quita si ya existe
    document.body.classList.toggle("dark-mode");
    
    // Guardar la preferencia en el navegador del usuario (LocalStorage)
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("tema", "oscuro");
    } else {
        localStorage.setItem("tema", "claro");
    }
}

// 3. Validador de existencia y recuperación de preferencia al cargar la página
if (btnTema) {
    btnTema.addEventListener("click", alternarTema);
    
    // Al cargar la página, verificamos si el usuario ya había elegido el modo oscuro antes
    const temaGuardado = localStorage.getItem("tema");
    if (temaGuardado === "oscuro") {
        document.body.classList.add("dark-mode");
    }
}