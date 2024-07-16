import { Persona, UsuarioRegular, Administrador} from '../app.js';

const inputNombre = document.getElementById('inputNombre');
const inputApellido = document.getElementById('inputApellido');
const inputEmail = document.getElementById('inputEmail');
const inputFechaNacimiento = document.getElementById('fechaNacimiento');
const inputContraseña = document.getElementById('inputContraseña');
const botonCrearCuenta = document.getElementById('botonCrearCuenta');

botonCrearCuenta.addEventListener('click', (e) => {
    const valorNombre = inputNombre.value();
    const valorApellido = inputApellido.value();
    const valorEmail = inputEmail.value();
    const valorFechaNacimiento = inputFechaNacimiento.value();
    const valorContraseña = inputContraseña.value();

    if(valorNombre == '' || valorApellido == '' || valorEmail == '' || valorFechaNacimiento == '' || valorContraseña == ''){
        alert("Todos los campos son requeridos");
    }
    else{
        
    }


})