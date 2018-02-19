/*
var nombreCompleto = prompt("Por favor ingrese el nombre completo:", "Nombres y apellidos");
var diaNacimiento = prompt("Ingrese el día de nacimiento", "Ejemplo: Si nació el 22 de enero, solamente ingresar 22");
var mesNacimiento = prompt("Ingrese el mes de nacimiento", "Ejemplo: Si nació en enero, solamente ingresar 1 porque es el mes 1");
var anioNacimiento = prompt("Ingrese el año de nacimiento", "Ejemplo: Si nació el 22 de enero de 1987, solamente ingresar 1987");

var conyuge = prompt("¿Tiene cónyuge?", "SI/NO");
var hijos = prompt("¿Tiene hijos?", "SI/NO");
var cantidadHijos = prompt("Ingrese la cantidad de hijos menores de 21 años:", "Por favor ingrese únicamente números");

const precioBase = 250;


comision = precioBase * 0.30;
*/
// El siguiente es un comentario.
// Por favor no elimine los caracteres // que se encuentran al inicio.

// En la siguiente variable usted debe calcular los cargos correspondientes.
// Puede crear la cantidad de variables necesarias para calcular cada uno
// de los recargos que sean necesarios
/*
recargos = 0;


totalPagar = precioBase + comision + recargos;
document.write(totalPagar);
*/

const precioBase = 250;
const comision = precioBase * 0.30;
var recargos = 0;

function validarSiTieneHijos() {
    var siTieneHijosInput = document.getElementById('siTieneHijos');
    var cantidadHijosInput = document.getElementById('cantidadHijos');

    if (siTieneHijosInput && siTieneHijosInput.checked) {
        cantidadHijosInput.disabled = false;
    } else {
        cantidadHijosInput.disabled = true;
    }

    cantidadHijosInput.value = '';
}

function validarSiTieneConyugue() {
    var siTieneConyugueInput = document.getElementById('siTieneConyugue');
    var fechaNacimientoConyugueInput = document.getElementById('fechaNacimientoConyugue');

    if (siTieneConyugueInput && siTieneConyugueInput.checked) {
        fechaNacimientoConyugueInput.disabled = false;
    } else {
        fechaNacimientoConyugueInput.disabled = true;
    }

    fechaNacimientoConyugueInput.value = '';
}

function mostrarError(mensaje) {
    var divError = document.getElementById('error-alert');

    if (divError) {
        divError.innerHTML = mensaje;
        divError.style.display = 'block';
        setTimeout(function () {
            divError.style.display = 'none';
            divError.innerHTML = '';
        }, 4000)
    }
}

function cotizar() {
    var nombreCompletoInput = document.getElementById('nombreCompleto');
    var fechaNacimientoInput = document.getElementById('fechaNacimiento');
    var siTieneConyugueInput = document.getElementById('siTieneConyugue');
    var fechaNacimientoConyugueInput = document.getElementById('fechaNacimientoConyugue');
    var siTieneHijosInput = document.getElementById('siTieneHijos');
    var cantidadHijosInput = document.getElementById('cantidadHijos');

    if (!nombreCompletoInput.value) {
        mostrarError('Ingrese su nombre completo');
        return null;
    }

    if (!fechaNacimientoInput.value) {
        mostrarError('Ingrese su fecha de nacimiento');
        return null;
    }

    if (siTieneHijosInput && siTieneHijosInput.checked && !cantidadHijosInput.value) {
        mostrarError('Ingrese la cantidad de hijos menores a 21 años');
        return null;
    }

    var edad = getEdad(fechaNacimientoInput);

    if (edad < 18) {
        mostrarError('Debe ser mayor de 18 años, de lo contrario no se le puede asegurar.');
        return null;
    } else if (edad > 65) {
        mostrarError('Debe ser menor de 66 años, de lo contrario no se le puede asegurar.');
        return null;
    }

    //CALCULAR LOS REGARGOS POR EDAD:
    calcularRecargosPorEdad(edad);

    //CALCULAR RECARGOS POR EDAD DEL CONYUGUE
    if (siTieneConyugueInput && siTieneConyugueInput.checked) {
        var edadConyugue = getEdad(fechaNacimientoConyugueInput);

    }

    console.log(recargos);

    var totalPagar = precioBase + comision + recargos;
}

function calcularRecargosPorEdad(edad) {
    recargos = 0;

    if (edad >= 21 && edad <= 25) {
        recargos += (precioBase * 1) / 100;
    } else if (edad >= 25 && edad <= 30) {
        recargos += (precioBase * 2) / 100;
    } else if (edad >= 30 && edad <= 40) {
        recargos += (precioBase * 5) / 100;
    } else if (edad >= 40 && edad <= 50) {
        recargos += (precioBase * 8) / 100;
    } else if (edad >= 50 && edad <= 65) {
        recargos += (precioBase * 12) / 100;
    }
}

function getEdad(fechaNacimientoInput) {
    var fechaNacimiento = new Date(fechaNacimientoInput.value + 'T06:00:00Z');
    var fechaActual = new Date();
    var edadMilisegundos = fechaActual.getTime() - fechaNacimiento.getTime();

    return parseInt(edadMilisegundos / 1000 / 60 / 60 / 24 / 365);
}