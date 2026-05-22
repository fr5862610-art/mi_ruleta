const botonGirar = document.getElementById('boton-girar'); 
const ruleta = document.getElementById('ruleta'); 
const cuadroPregunta = document.getElementById('cuadro-pregunta');
const textoPregunta = document.getElementById('texto-pregunta');
const botonCerrar = document.getElementById('boton-cerrar');

let bancoChoice = [
    "🔹 MÚLTIPLE CHOICE\n\n¿Qué tipo de sustantivo es “María”?\n\na) Común\nb) Propio\nc) Abstracto",
    "🔹 MÚLTIPLE CHOICE\n\n¿Cuál de estas palabras es un sustantivo común?\n\na) Córdoba\nb) perro\nc) Juan",
    "🔹 MÚLTIPLE CHOICE\n\n¿Qué tipo de sustantivo es “amor”?\n\na) Concreto\nb) Abstracto\nc) Colectivo",
    "🔹 MÚLTIPLE CHOICE\n\n¿Cuál de estas palabras es un sustantivo concreto?\n\na) felicidad\nb) tristeza\nc) silla",
    "🔹 MÚLTIPLE CHOICE\n\n¿Qué tipo de sustantivo es “agua”?\n\na) Contable\nb) Incontable\nc) Propio",
    "🔹 MÚLTIPLE CHOICE\n\n¿Cuál de estas palabras es un sustantivo contable?\n\na) arena\nb) leche\nc) libro",
    "🔹 MÚLTIPLE CHOICE\n\n¿Qué tipo de sustantivo es “manada”?\n\na) Individual\nb) Colectivo\nc) Abstracto",
    "🔹 MÚLTIPLE CHOICE\n\n¿Cuál es un sustantivo individual?\n\na) ejército\nb) abeja\nc) bosque",
    "🔹 MÚLTIPLE CHOICE\n\n¿Qué tipo de sustantivo es “Argentina”?\n\na) Propio\nb) Común\nc) Colectivo",
    "🔹 MÚLTIPLE CHOICE\n\n¿Cuál de estas palabras es un sustantivo abstracto?\n\na) amistad\nb) mesa\nc) perro"
];

let bancoVerbales = [
    "🗣️ RESPONDER VERBALMENTE\n\nNombra un sustantivo propio de una ciudad.",
    "🗣️ RESPONDER VERBALMENTE\n\nDi tres sustantivos comunes que encuentres en tu casa.",
    "🗣️ RESPONDER VERBALMENTE\n\nMenciona un sustantivo abstracto relacionado con las emociones.",
    "🗣️ RESPONDER VERBALMENTE\n\nNombra dos sustantivos concretos que puedas tocar.",
    "🗣️ RESPONDER VERBALMENTE\n\nDi un sustantivo contable relacionado con la escuela.",
    "🗣️ RESPONDER VERBALMENTE\n\nMenciona un sustantivo incontable que se pueda beber.",
    "🗣️ RESPONDER VERBALMENTE\n\nNombra un sustantivo colectivo de animales.",
    "🗣️ RESPONDER VERBALMENTE\n\nDi un sustantivo individual relacionado con una granja.",
    "🗣️ RESPONDER VERBALMENTE\n\nInventa una oración con un sustantivo propio.",
    "🗣️ RESPONDER VERBALMENTE\n\nInventa una oración usando un sustantivo abstracto y uno concreto."
];

let bancoVF = [
    "✅❌ VERDADERO O FALSO\n\nLos sustantivos propios comienzan con mayúscula.",
    "✅❌ VERDADERO O FALSO\n\n“Perro” es un sustantivo propio.",
    "✅❌ VERDADERO O FALSO\n\n“Alegría” es un sustantivo abstracto.",
    "✅❌ VERDADERO O FALSO\n\n“Mesa” es un sustantivo concreto.",
    "✅❌ VERDERO O FALSO\n\n“Leche” es un sustantivo contable.",
    "✅❌ VERDADERO O FALSO\n\nLos sustantivos incontables no se pueden contar fácilmente con números.",
    "✅❌ VERDADERO O FALSO\n\n“Ejército” es un sustantivo colectivo.",
    "✅❌ VERDADERO O FALSO\n\n“Jugador” es un sustantivo individual.",
    "✅❌ VERDADERO O FALSO\n\n“Brasil” es un sustantivo común.",
    "✅❌ VERDADERO O FALSO\n\nLos sustantivos abstractos nombran sentimientos, ideas o emociones."
];

const copiaChoice = [...bancoChoice];
const copiaVerbales = [...bancoVerbales];
const copiaVF = [...bancoVF];

let girando = false;

botonGirar.addEventListener('click', () => {
    if (girando) return;
    girando = true;
    
    // Elegimos un índice aleatorio: 0 para Choice, 1 para Verbal, 2 para V o F
    const indiceModalidad = Math.floor(Math.random() * 3);
    const vueltas = 5 * 360; 
    
    // CORRECCIÓN DE CAJA: Calculamos el giro exacto para que el color coincida físicamente con el indicador de arriba
    let gradosPorcion = 0;
    if (indiceModalidad === 0) gradosPorcion = 60;   // Rojo (Choice)
    if (indiceModalidad === 1) gradosPorcion = 180;  // Azul (Verbal)
    if (indiceModalidad === 2) gradosPorcion = 300;  // Amarillo (V o F)
    
    const gradosFinales = vueltas - gradosPorcion;

    ruleta.style.transition = 'transform 3.5s ease-out';
    ruleta.style.transform = `rotate(${gradosFinales}deg)`;

    setTimeout(() => {
        let preguntaElegida = "";

        if (indiceModalidad === 0) { 
            if (bancoChoice.length === 0) bancoChoice = [...copiaChoice]; 
            const index = Math.floor(Math.random() * bancoChoice.length);
            preguntaElegida = bancoChoice.splice(index, 1)[0];
        } 
        else if (indiceModalidad === 1) { 
            if (bancoVerbales.length === 0) bancoVerbales = [...copiaVerbales];
            const index = Math.floor(Math.random() * bancoVerbales.length);
            preguntaElegida = bancoVerbales.splice(index, 1)[0];
        } 
        else { 
            if (bancoVF.length === 0) bancoVF = [...copiaVF];
            const index = Math.floor(Math.random() * bancoVF.length);
            preguntaElegida = bancoVF.splice(index, 1)[0];
        }

        textoPregunta.innerText = preguntaElegida;
        cuadroPregunta.style.display = "flex";
        
        girando = false;
    }, 3500);
});

botonCerrar.addEventListener('click', () => {
    cuadroPregunta.style.display = "none";
});
