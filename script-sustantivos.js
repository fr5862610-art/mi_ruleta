const botonGirar = document.getElementById('boton-girar'); 
const ruleta = document.getElementById('ruleta'); 
const cuadroPregunta = document.getElementById('cuadro-pregunta');
const textoPregunta = document.getElementById('texto-pregunta');
const botonCerrar = document.getElementById('boton-cerrar');

let bancoChoice = [
    'MULTIPLE CHOICE\n\n¿Que tipo de sustantivo es Maria?\n\na) Comun\nb) Propio\nc) Abstracto',
    'MULTIPLE CHOICE\n\n¿Cual de estas palabras es un sustantivo comun?\n\na) Cordoba\nb) perro\nc) Juan',
    'MULTIPLE CHOICE\n\n¿Que tipo de sustantivo es amor?\n\na) Concreto\nb) Abstracto\nc) Colectivo',
    'MULTIPLE CHOICE\n\n¿Cual de estas palabras es un sustantivo concreto?\n\na) felicidad\nb) tristeza\nc) silla',
    'MULTIPLE CHOICE\n\n¿Que tipo de sustantivo es agua?\n\na) Contable\nb) Incontable\nc) Propio',
    'MULTIPLE CHOICE\n\n¿Cual de estas palabras es un sustantivo contable?\n\na) arena\nb) leche\nc) libro',
    'MULTIPLE CHOICE\n\n¿Que tipo de sustantivo es manada?\n\na) Individual\nb) Colectivo\nc) Abstracto',
    'MULTIPLE CHOICE\n\n¿Cual es un sustantivo individual?\n\na) ejercito\nb) abeja\nc) bosque',
    'MULTIPLE CHOICE\n\n¿Que tipo de sustantivo es Argentina?\n\na) Propio\nb) Comun\nc) Colectivo',
    'MULTIPLE CHOICE\n\n¿Cual de estas palabras es un sustantivo abstracto?\n\na) amistad\nb) mesa\nc) perro'
];

let bancoVerbales = [
    'RESPONDER VERBALMENTE\n\nNombra un sustantivo propio de una ciudad.',
    'RESPONDER VERBALMENTE\n\nDi tres sustantivos comunes que encuentres en tu casa.',
    'RESPONDER VERBALMENTE\n\nMenciona un sustantivo abstracto relacionado con las emociones.',
    'RESPONDER VERBALMENTE\n\nNombra dos sustantivos concretos que puedas tocar.',
    'RESPONDER VERBALMENTE\n\nDi un sustantivo contable relacionado con la escuela.',
    'RESPONDER VERBALMENTE\n\nMenciona un sustantivo incontable que se pueda beber.',
    'RESPONDER VERBALMENTE\n\nNombra un sustantivo colectivo de animales.',
    'RESPONDER VERBALMENTE\n\nDi un sustantivo individual relacionado con una granja.',
    'RESPONDER VERBALMENTE\n\nInventa una orden con un sustantivo propio.',
    'RESPONDER VERBALMENTE\n\nInventa una oracion usando un sustantivo abstracto y uno concreto.'
];

let bancoVF = [
    'VERDADERO O FALSO\n\nLos sustantivos propios comienzan con mayuscula.',
    'VERDADERO O FALSO\n\nPerro es un sustantivo propio.',
    'VERDADERO O FALSO\n\nAlegria es un sustantivo abstracto.',
    'VERDADERO O FALSO\n\nMesa es un sustantivo concreto.',
    'VERDADERO O FALSO\n\nLeche es un sustantivo contable.',
    'VERDADERO O FALSO\n\nLos sustantivos incontables no se pueden contar facilmente con numeros.',
    'VERDADERO O FALSO\n\nEjercito es un sustantivo colectivo.',
    'VERDADERO O FALSO\n\nJugador es un sustantivo individual.',
    'VERDADERO O FALSO\n\nBrasil es un sustantivo comun.',
    'VERDADERO O FALSO\n\nLos sustantivos abstractos nombran sentimientos, ideas o emociones.'
];

const copiaChoice = [...bancoChoice];
const copiaVerbales = [...bancoVerbales];
const copiaVF = [...bancoVF];

let girando = false;

botonGirar.addEventListener('click', () => {
    if (girando) return;
    girando = true;
    
    // 0 = Choice (Rojo), 1 = Verbal (Azul), 2 = V o F (Amarillo)
    const indiceModalidad = Math.floor(Math.random() * 3);
    const vueltas = 5 * 360; 
    
    let gradosPorcion = 0;
    if (indiceModalidad === 0) gradosPorcion = 60;   
    if (indiceModalidad === 1) gradosPorcion = 180;  
    if (indiceModalidad === 2) gradosPorcion = 300;  
    
    const gradosFinales = vueltas - gradosPorcion;

    ruleta.style.transition = 'transform 3.5s ease-out';
    ruleta.style.transform = 'rotate(' + gradosFinales + 'deg)';

    setTimeout(() => {
        let preguntaElegida = '';

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
        cuadroPregunta.style.display = 'flex';
        
        girando = false;
    }, 3500);
});

botonCerrar.addEventListener('click', () => {
    cuadroPregunta.style.display = 'none';
});
