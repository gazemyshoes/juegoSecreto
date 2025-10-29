/**
 * The secret number that the user needs to guess.
 * @type {number}
 */
let numeroSecreto = 0;

/**
 * The number of attempts the user has made.
 * @type {number}
 */
let intentos = 0;

/**
 * A list of numbers that have already been drawn.
 * @type {number[]}
 */
let listaNumerosSorteados = [];

/**
 * The maximum number that can be generated.
 * @type {number}
 */
let numeroMaximo = 10;

console.log(numeroSecreto);

/**
 * Assigns text to an HTML element.
 * @param {string} elemento - The HTML element selector.
 * @param {string} texto - The text to assign to the element.
 * @returns {void}
 */
function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

/**
 * Verifies the user's attempt to guess the secret number.
 * @returns {void}
 */
function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);

    if (numeroDeUsuario === numeroSecreto){
        asignarTextoElemento('p',`Acertaste el número en ${intentos} ${intentos == 1 ? 'vez' : 'veces'}`)
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        //El usuario no acertó
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p','El número secreto es menor!');
        } else {
            asignarTextoElemento('p','El número secreto es mayor!');
        }
        intentos++;
        limpiarCaja();
    }
    return;
}

/**
 * Clears the input box where the user enters their guess.
 * @returns {void}
 */
function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

/**
 * Generates a new secret number.
 * @returns {number|undefined} The generated secret number, or undefined if all numbers have been drawn.
 */
function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;

    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);
    //Si ya sorteamos todos los números
    if (listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('p','Ya se sortearon todos los números posibles');
    } else {
    //si el número generado está en la lista,
        if (listaNumerosSorteados.includes(numeroGenerado)) {
        return generarNumeroSecreto();
         } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
         }
    }
}

/**
 * Sets the initial conditions for the game.
 * @returns {void}
 */
function condicionesIniciales() {
    asignarTextoElemento('h1','Juego del Número Secreto!');
    asignarTextoElemento('p',`Indica un número del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}

/**
 * Resets the game to its initial state.
 * @returns {void}
 */
function reiniciarJuego() {
    //Limpiar Caja
    limpiarCaja();
    //Indicar intervalo de números
    //Generar el número aleatorio
    //Inicializar el número de intentos
    condicionesIniciales();
    //Deshabilitar el botón de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled','true');
}

condicionesIniciales();
