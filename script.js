const opciones = [
    { titulo: "ROBERT DREEBEN", preguntas: ["¿Qué plantea Dreeben sobre el currículum oculto?", "¿Qué aprendizajes adquieren los estudiantes además de los contenidos?"], color: "#e94560" }, // Rojo
    { titulo: "CURRÍCULUM OCULTO", preguntas: ["¿Qué enseña el currículum oculto?", "¿El currículum oculto está escrito o no?"], color: "#0f3460" }, // Azul Oscuro
    { titulo: "PARADIGMA", preguntas: ["¿Qué es un paradigma?", "¿Qué entiendes por cambio de paradigma?"], color: "#22a6b3" }, // Turquesa
    { titulo: "CURRÍCULUM FORMAL", preguntas: ["¿Dónde se encuentra establecido oficialmente?", "¿Quién lo diseña?"], color: "#f0932b" }, // Naranja
    { titulo: "CURRÍCULUM REAL", preguntas: ["¿Por qué puede diferenciarse del formal?", "¿Qué factores influyen en su aplicación?"], color: "#6ab04c" }, // Verde
    { titulo: "CURRÍCULUM IMPLÍCITO", preguntas: ["¿Cómo se transmite?", "¿Qué relación tiene con los valores?"], color: "#be2edd" }, // Violeta
    { titulo: "CURRÍCULUM EXPLÍCITO", preguntas: ["¿Qué contenidos incluye?", "¿Cómo se planifica?"], color: "#4834d4" }, // Azul Real
    { titulo: "CURRÍCULUM NULO", preguntas: ["¿Qué significa?", "¿Por qué ciertos contenidos se excluyen?"], color: "#eb4d4b" }, // Carmesí
    { titulo: "JACKSON", preguntas: ["¿Qué analiza en la vida escolar?", "¿Qué son las experiencias cotidianas escolares?"], color: "#f9ca24" }  // Amarillo
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
        
        // --- AQUÍ USAMOS EL COLOR ÚNICO DE CADA CATEGORÍA ---
        ctx.fillStyle = opcion.color; 
        
        ctx.beginPath();
        ctx.arc(200, 200, 190, angle, angle + arc, false);
        ctx.lineTo(200, 200);
        ctx.fill();
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.save();
        ctx.fillStyle = "white";
        ctx.font = "bold 11px sans-serif"; 
        ctx.translate(200 + Math.cos(angle + arc / 2) * 125, 200 + Math.sin(angle + arc / 2) * 125);
        ctx.rotate(angle + arc / 2 + Math.PI / 2);
        
        const palabras = opcion.titulo.split(" ");
        if(palabras.length > 1 && opcion.titulo.length > 12) {
            ctx.fillText(palabras[0], -ctx.measureText(palabras[0]).width / 2, -5);
            if(palabras[1]) ctx.fillText(palabras[1], -ctx.measureText(palabras[1]).width / 2, 10);
        } else {
            ctx.fillText(opcion.titulo, -ctx.measureText(opcion.titulo).width / 2, 0);
        }
        ctx.restore();
    });
}

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
