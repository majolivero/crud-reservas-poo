import { Auth, Administrador } from '../app.js';

document.getElementById('botonLogin').addEventListener('click', login);

function login() {
    const email = document.getElementById('inputCorreo').value;
    const password = document.getElementById('inputContraseña').value;
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const admins = JSON.parse(localStorage.getItem('admins')) || [];

    const user = users.find(user => user.email === email && user.contraseña === password);
    const admin = admins.find(admin => admin.email === email && admin.contraseña === password);

    if (user) {
        Auth.login(user);
        alert('Usuario regular logueado exitosamente');
        window.location.href = '../crearReserva/index.html';
    } else if (admin) {
        Auth.login(admin);
        alert('Administrador logueado exitosamente');
        window.location.href = '../crearReserva/index.html';
    } else {
        alert('Credenciales incorrectas');
    }
}

if(!localStorage.getItem("admins")){
    const admin = new Administrador('','Admin', 'Majo', 'majo@riwi.com', '1995-01-12', 'majo');
    admin.crearUsuarioAdmin(admin);   
    alert("Admin creado!")
}