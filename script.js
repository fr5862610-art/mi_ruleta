// 1. Intentamos cargar los datos guardados, si no hay, usamos los de por defecto
let datosGuardados = localStorage.getItem("misCategorias");
let opciones = datosGuardados ? JSON.parse(datosGuardados) : [
    { titulo: "HISTORIA", preguntas: ["¿Quién fue San Martín?", "¿Cuándo fue la Revolución de Mayo?"] },
    { titulo: "MATEMÁTICA", preguntas: ["¿Cuánto es 15 x 10?", "¿Qué es un ángulo recto?"] }
];

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const spinBtn = document.getElementById("spin");

let startAngle = 0;
let arc = Math.PI / (opciones.length / 2);
let spinTimeout = null;
let spinAngleStart = 10;
let spinTime = 0;
let spinTimeTotal = 0;

function dibujarRuleta() {
    ctx.clearRect(0, 0, 400, 400);
    opciones.forEach((opcion, i) => {
        const angle = startAngle + i * arc;
        ctx.fillStyle = i % 2 === 0 ? "#e94560" : "#0f3460"; 
        
        ctx.beginPath();
        ctx.arc(200, 200, 190, angle, angle + arc, false);
        ctx.lineTo(200, 200);
        ctx.fill();
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.save();
        ctx.fillStyle = "white";
        ctx.font = "bold 14px Arial";
        ctx.translate(200 + Math.cos(angle + arc / 2) * 130, 200 + Math.sin(angle + arc / 2) * 130);
        ctx.rotate(angle + arc / 2 + Math.PI / 2);
        ctx.fillText(opcion.titulo, -ctx.measureText(opcion.titulo).width / 2, 0);
        ctx.restore();
    });
}

function agregarCategoria() {
    const nombreCat = document.getElementById("nueva-categoria").value;
    const preguntasTexto = document.getElementById("nuevas-preguntas").value;

    if (nombreCat && preguntasTexto) {
        const listaPreguntas = preguntasTexto.split(",").map(p => p.trim());
        opciones.push({
            titulo: nombreCat.toUpperCase(),
            preguntas: listaPreguntas
        });

        // --- ESTO ES LO NUEVO: GUARDAR EN LA MEMORIA ---
        localStorage.setItem("misCategorias", JSON.stringify(opciones));
        // -----------------------------------------------

        document.getElementById("nueva-categoria").value = "";
        document.getElementById("nuevas-preguntas").value = "";
        arc = Math.PI / (opciones.length / 2); 
        dibujarRuleta();
        alert("¡Guardado permanentemente!");
    } else {
        alert("Completa todos los campos");
    }
}

// El resto de las funciones (spin, rotarRuleta, detenerRuleta, etc.) se mantienen igual
spinBtn.addEventListener("click", () => {
    spinAngleStart = Math.random() * 10 + 10;
    spinTime = 0;
    spinTimeTotal = Math.random() * 3000 + 4000;
    rotarRuleta();
});

function rotarRuleta() {
    spinTime += 30;
    if (spinTime >= spinTimeTotal) {
        detenerRuleta();
        return;
    }
    const spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
    startAngle += (spinAngle * Math.PI / 180);
    dibujarRuleta();
    spinTimeout = setTimeout(rotarRuleta, 30);
}

function detenerRuleta() {
    const degrees = startAngle * 180 / Math.PI + 90;
    const arcd = arc * 180 / Math.PI;
    const index = Math.floor((360 - degrees % 360) / arcd);
    const seleccionada = opciones[index];
    const randomPregunta = seleccionada.preguntas[Math.floor(Math.random() * seleccionada.preguntas.length)];
    
    document.getElementById("categoria-nombre").innerText = seleccionada.titulo;
    document.getElementById("pregunta-texto").innerText = randomPregunta;
    document.getElementById("pregunta-overlay").classList.remove("hidden");
}

function easeOut(t, b, c, d) {
    const ts = (t /= d) * t;
    const tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
}

function cerrarPregunta() {
    document.getElementById("pregunta-overlay").classList.add("hidden");
}

dibujarRuleta();