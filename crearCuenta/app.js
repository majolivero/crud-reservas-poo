import { UsuarioRegular, Administrador } from '../app.js';

document.getElementById('botonCrearCuenta').addEventListener('click', createUser);

function createUser(event) {
    event.preventDefault();
    const nombre = document.getElementById('inputNombre').value;
    const apellido = document.getElementById('inputApellido').value;
    const email = document.getElementById('inputEmail').value;
    const fechaNacimiento = document.getElementById('fechaNacimiento').value;
    const contraseña = document.getElementById('inputContraseña').value;

    const newUser = new UsuarioRegular('', nombre, apellido, email, fechaNacimiento, contraseña);
    newUser.registrarse();
    alert('Usuario creado exitosamente!');
    window.location.href = '../crearReserva/index.html';
    // Optionally redirect or clear form
}