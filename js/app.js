// Calculadora de promedio

const btnAgregarEvaluacion = document.getElementById("btnAgregarEvaluacion");
const btnCalcularPromedio = document.getElementById("btnCalcularPromedio");
const tablaNotas = document.getElementById("tablaNotas");
const resultadoPromedio = document.getElementById("resultadoPromedio");

// Cargar notas previas o array vacío
let notasGuardadas = JSON.parse(localStorage.getItem("evaluaciones")) || [];

// Funcion que nos permite guardar información en LocalStorage
function guardarNotasEnStorage() {
    const notasInputs = document.getElementsByClassName("nota");
    const porcentajesInputs = document.getElementsByClassName("porcentaje");
    
    const datosAGuardar = [];
    
    for (let i = 0; i < notasInputs.length; i++) {
        datosAGuardar.push({
            nota: notasInputs[i].value,
            porcentaje: porcentajesInputs[i].value
        });
    }
    localStorage.setItem("evaluaciones", JSON.stringify(datosAGuardar));
}

// Función para agregar una nueva evaluación a la tabla
function agregarEvaluacion(valorNota = "", valorPorcentaje = "") { // Permite pasar valores por defecto
    const fila = document.createElement("tr");

    // Nota
    const tdNota = document.createElement("td");
    const inputNota = document.createElement("input");
    inputNota.type = "number";
    inputNota.min = "1";
    inputNota.max = "7";
    inputNota.step = "0.1";
    inputNota.classList.add("nota");
    inputNota.value = valorNota; // Carga el valor si existe
    
    // Escucha cambios para guardar automáticamente
    inputNota.addEventListener("input", guardarNotasEnStorage);
    tdNota.appendChild(inputNota);

    // Porcentaje
    const tdProcentaje = document.createElement("td");
    const inputPorcentaje = document.createElement("input");
    inputPorcentaje.type = "number";
    inputPorcentaje.min = "0";
    inputPorcentaje.max = "100";
    inputPorcentaje.classList.add("porcentaje");
    inputPorcentaje.value = valorPorcentaje; // Carga el valor si existe
    
    // Escucha cambios para guardar automáticamente
    inputPorcentaje.addEventListener("input", guardarNotasEnStorage);
    tdProcentaje.appendChild(inputPorcentaje);

    // Botón eliminar
    const tdAccion = document.createElement("td");
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";

    // Evento del botón eliminar para confirmar
    btnEliminar.addEventListener("click", () => {
        if (confirm("¿Eliminar evaluación?")) {
            tablaNotas.removeChild(fila);
            guardarNotasEnStorage(); // Actualiza el storage al eliminar
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

    // Validación de notas y porcentajes
    for (let i = 0; i < notas.length; i++) {
        const nota = parseFloat(notas[i].value) || 0;
        const porcentaje = parseFloat(porcentajes[i].value) || 0;

        if (nota < 1 || nota > 7) {
            alert("Las notas deben ser entre 1.0 y 7.0");
            notas[i].focus();
            return;
        }

        if (porcentaje < 0 || porcentaje > 100) {
            alert("Los porcentajes deben estar entre 0% y 100%");
            porcentajes[i].focus();
            return;
        }

        sumaPonderada += nota * porcentaje;
        sumaPorcentajes += porcentaje;
    }

    // Si los porcentajes no suman 100, va a mostrar un mensaje de error.
    if (sumaPorcentajes !== 100) {
        alert("Los porcentajes no suman 100%. Por favor, corregirlo.");
        if (porcentajes.length > 0) {
            porcentajes[0].focus();
        }
        return;
    }

    const promedio = sumaPonderada / 100;
    resultadoPromedio.textContent = promedio.toFixed(2);
}

// Inicialización y carga de la calculadora
if (btnAgregarEvaluacion) {
    btnAgregarEvaluacion.addEventListener("click", () => agregarEvaluacion());
    btnCalcularPromedio.addEventListener("click", calcularPromedio);
    
    // Si había notas guardadas, las muestra todas
    if (notasGuardadas.length > 0) {
        notasGuardadas.forEach(evaluacion => {
            agregarEvaluacion(evaluacion.nota, evaluacion.porcentaje);
        });
    } else {
        // Si la app está limpia, agrega una fila vacía por defecto para empezar
        agregarEvaluacion();
    }
}

// Planificador de tareas

const txtTarea = document.getElementById("txtTarea");
const btnAgregar = document.getElementById("btnAgregar");
const listaTareas = document.getElementById("listaTareas");

// Cargar tareas previas o iniciar array vacío
let tareasGuardadas = JSON.parse(localStorage.getItem("tareas")) || [];

// Función para guardar el estado actual de las tareas en LocalStorage
function guardarTareasEnStorage() {
    localStorage.setItem("tareas", JSON.stringify(tareasGuardadas));
}

// Función para renderizar (dibujar) una tarea en el HTML
function renderizarTarea(tareaObj) {
    const item = document.createElement("li");
    item.classList.add("tareaItem");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("tareaCheckbox");
    checkbox.id = `tarea-${tareaObj.id}`; // Asignar un ID único basado en el timestamp, es decir, el momento en que se creó
    checkbox.checked = tareaObj.completada; // Mantiene el check si estaba completada

    // Crear la etiqueta para la tarea
    const label = document.createElement("label");
    label.htmlFor = checkbox.id;
    label.textContent = tareaObj.descripcion;
    label.classList.add("tareaLabel");
    
    // Si la tarea estaba completada, le agregamos la clase correspondiente
    if (tareaObj.completada) {
        label.classList.add("completada");
    }

    // Evento para cambiar estado completado
    checkbox.addEventListener("change", () => {
        label.classList.toggle("completada");
        // Buscar la tarea en nuestro array y actualizar su propiedad
        tareaObj.completada = checkbox.checked;
        guardarTareasEnStorage();
    });

    // Botón eliminar
    const btnEliminarTarea = document.createElement("button");
    btnEliminarTarea.type = "button";
    btnEliminarTarea.textContent = "Eliminar";
    btnEliminarTarea.classList.add("btnEliminarTarea");
    
    // Evento para eliminar la tarea
    btnEliminarTarea.addEventListener("click", () => {        
        tareasGuardadas = tareasGuardadas.filter(t => t.id !== tareaObj.id); // Filtrar el array para sacar la tarea eliminada
        guardarTareasEnStorage();
        listaTareas.removeChild(item);
    });

    // Agregar los elementos al item de la lista
    item.appendChild(checkbox);
    item.appendChild(label);
    item.appendChild(btnEliminarTarea);
    listaTareas.appendChild(item);
}

// Función que se ejecuta al presionar el botón "Agregar"
function agregarTarea() {
    const descripcion = txtTarea.value.trim();
    if (!descripcion) {
        alert("Ingresa una tarea para agregar.");
        txtTarea.focus();
        return;
    }

    // Crea el objeto de la nueva tarea
    const nuevaTarea = {
        id: Date.now(), // ID único basado en el tiempo milisegundo
        descripcion: descripcion,
        completada: false
    };

    // Actualizamos estado y storage
    tareasGuardadas.push(nuevaTarea);
    guardarTareasEnStorage();

    // Mostramos en pantalla
    renderizarTarea(nuevaTarea);

    txtTarea.value = "";
    txtTarea.focus();
}

// Cargar las tareas al iniciar la página
if (btnAgregar && txtTarea && listaTareas) {
    btnAgregar.addEventListener("click", agregarTarea);

    txtTarea.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            agregarTarea();
        }
    });

    // Muestra todas las tareas que estaban guardadas
    tareasGuardadas.forEach(tarea => renderizarTarea(tarea));
}

const temporizador = document.getElementById("temporizador");
const btnIniciarPomodoro = document.getElementById("btnIniciarPomodoro");
const btnPausarPomodoro = document.getElementById("btnPausarPomodoro");
const btnReiniciarPomodoro = document.getElementById("btnReiniciarPomodoro");

let tiempoRestante = 5; // 25 minutos = 1500 segundos

let intervalo = null; // Variable para almacenar el intervalo del temporizador

// Función para actualizar el temporizador en la interfaz
function actualizarTemporizador() {
    const minutos = Math.floor(tiempoRestante / 60); // Obtenemos los minutos restantes
    const segundos = tiempoRestante % 60; // Obtenemos los segundos restantes después de calcular los minutos
    const TiempoFormateado = `${minutos.toString().padStart(2, "0")}:${segundos.toString().padStart(2, "0")}`; // Formateamos el tiempo para que siempre tenga dos dígitos
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

        // Cuando el tiempo llega a cero, se detiene el temporizador y se muestra un mensaje de descanso
        if (tiempoRestante <= 0) {
            clearInterval(intervalo);
            intervalo = null;
            alert("¡Tiempo terminado! Toma un descanso y estira tu cuerpo.");
        }
    }, 1000); // Se ejecuta cada 1000 milisegundos (1 segundo)
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
    tiempoRestante = 5;
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
    // Math.random() genera un número entre 0 y 0.999
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
    
    document.body.classList.toggle("dark-mode"); // .classList.toggle() añade la clase si no existe, o la quita si ya existe
    
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