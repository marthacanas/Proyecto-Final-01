const precioBase = 250;
const comision = precioBase * 0.30;
var recargos = 0;
var recargosConyugue = 0;
var recargosHijos = 0;

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

    if (siTieneConyugueInput && siTieneConyugueInput.checked && !siTieneConyugueInput.value) {
        mostrarError('Ingrese la fecha de nacimiento de su conyugue');
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
        calcularRecargoPorEdadConyugue(edadConyugue);
    }

    if (siTieneHijosInput && siTieneHijosInput.checked) {
        if (!cantidadHijosInput.value) {
            cantidadHijosInput.value = '0';
        }
        recargosPorCantidadDeHijos(parseInt(cantidadHijosInput.value));
    }

    var totalRecargos = recargos + recargosConyugue + recargosHijos;
    var totalPagar = precioBase + comision + totalRecargos;

    document.getElementById('resumen-nombre-cliente').innerHTML = nombreCompletoInput.value;
    document.getElementById('resumen-recargos-cliente').innerHTML = recargos.toFixed(2);
    document.getElementById('recargo-seguro-conyugue').innerHTML = recargosConyugue.toFixed(2);
    document.getElementById('recargo-seguro-hijos').innerHTML = recargosHijos.toFixed(2);
    document.getElementById('total-pagar').innerHTML = totalPagar.toFixed(2);

    document.getElementById('main-result-container').style.display = 'block';
    document.getElementById('main-form-container').style.display = 'none';
}

function calcularRecargosPorEdad(edad) {
    recargos = 0;

    if (edad >= 21 && edad <= 25) {
        recargos = (precioBase * 1) / 100;
    } else if (edad >= 25 && edad <= 30) {
        recargos = (precioBase * 2) / 100;
    } else if (edad >= 30 && edad <= 40) {
        recargos = (precioBase * 5) / 100;
    } else if (edad >= 40 && edad <= 50) {
        recargos = (precioBase * 8) / 100;
    } else if (edad >= 50 && edad <= 65) {
        recargos = (precioBase * 12) / 100;
    }
}

function calcularRecargoPorEdadConyugue(edad) {
    recargosConyugue = 0;

    if (edad < 30) {
        recargosConyugue = (precioBase * 1) / 100;
    } else if (edad >= 30 && edad < 40) {
        recargosConyugue = (precioBase * 2) / 100;
    } else if (edad >= 40 && edad < 50) {
        recargosConyugue = (precioBase * 3) / 100;
    } else if (edad >= 50 && edad < 70) {
        recargosConyugue = (precioBase * 5) / 100;
    }
}

function recargosPorCantidadDeHijos(cantidadHijos) {
    recargosHijos = (precioBase * cantidadHijos) / 100;
}

function getEdad(fechaNacimientoInput) {
    var fechaNacimiento = new Date(fechaNacimientoInput.value + 'T06:00:00Z');
    var fechaActual = new Date();
    var edadMilisegundos = fechaActual.getTime() - fechaNacimiento.getTime();

    return parseInt(edadMilisegundos / 1000 / 60 / 60 / 24 / 365);
}

function nueva(){
    document.getElementById('nombreCompleto').value = '';
    document.getElementById('fechaNacimiento').value = '';
    document.getElementById('noTieneConyugue').checked = true;
    document.getElementById('fechaNacimientoConyugue').value = '';
    document.getElementById('fechaNacimientoConyugue').disabled = true;
    document.getElementById('noTieneHijos').checked = true;
    document.getElementById('cantidadHijos').value = '';
    document.getElementById('cantidadHijos').disabled = true;

    recargos = 0;
    recargosConyugue = 0;
    recargosHijos = 0;
    
    document.getElementById('resumen-nombre-cliente').innerHTML = '';
    document.getElementById('recargo-seguro-conyugue').innerHTML = recargosConyugue.toFixed(2);
    document.getElementById('recargo-seguro-hijos').innerHTML = recargosHijos.toFixed(2);
    document.getElementById('total-pagar').innerHTML = '0.00';
    document.getElementById('main-result-container').style.display = 'none';
    document.getElementById('main-form-container').style.display = 'block';
}