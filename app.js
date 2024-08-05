// Persona class
class Persona {
    constructor(nombre, apellido, email, fechaNacimiento) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.fechaNacimiento = fechaNacimiento;
    }
}

// UsuarioRegular class
class UsuarioRegular extends Persona {
    constructor(idUsuario, nombre, apellido, email, fechaNacimiento, contraseña) {
        super(nombre, apellido, email, fechaNacimiento);
        if(!idUsuario){
            this.idUsuario = Auth.generateId('userId');
        }     
        else{
            this.idUsuario = idUsuario;
        } 
          
        this.contraseña = contraseña;
    }

    registrarse() {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(this);
        localStorage.setItem('users', JSON.stringify(users));
        console.log('Usuario registrado exitosamente:', this);
    }

    crearReserva(reserva) {
        reserva.id = Auth.generateId('reservaId');
        reserva.usuarioId = this.idUsuario;
        const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
        reservas.push(reserva);
        localStorage.setItem('reservas', JSON.stringify(reservas));
        console.log('Reserva creada exitosamente:', reserva);
    }
}

// Administrador class
class Administrador extends Persona {
    constructor(idAdministrador, nombre, apellido, email, fechaNacimiento, contraseña) {
        super(nombre, apellido, email, fechaNacimiento);
        if(!idAdministrador){
            this.idAdministrador = Auth.generateId('adminId');
        }     
        else{
            this.idAdministrador = idAdministrador;
        }   

        this.contraseña = contraseña;
    }

    crearUsuarioAdmin(admin) {
        const admins = JSON.parse(localStorage.getItem('admins')) || [];
        admins.push(admin);
        localStorage.setItem('admins', JSON.stringify(admins));
        console.log('Administrador creado exitosamente:', admin);
    }

    crearReserva(reserva) {
        reserva.id = Auth.generateId('reservaId');
        const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
        reservas.push(reserva);
        localStorage.setItem('reservas', JSON.stringify(reservas));
        console.log('Reserva creada exitosamente:', reserva);
    }

    eliminarReserva(reservaId) {
        let reservas = JSON.parse(localStorage.getItem('reservas')) || [];
        reservas = reservas.filter(reserva => reserva.id !== reservaId);
        localStorage.setItem('reservas', JSON.stringify(reservas));
        console.log('Reserva eliminada exitosamente:', reservaId);
    }

    actualizarReserva(reservaId, nuevaReserva) {
        let reservas = JSON.parse(localStorage.getItem('reservas')) || [];
        reservas = reservas.map(reserva => reserva.id === reservaId ? nuevaReserva : reserva);
        localStorage.setItem('reservas', JSON.stringify(reservas));
        console.log('Reserva actualizada exitosamente:', nuevaReserva);
    }
}

// Auth class
class Auth {
    static login(user) {
        const token = Auth.generateToken();
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
    }

    static logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    static generateToken() {
        return Math.random().toString(36).substr(2);
    }

    static generateId(key) {
        let currentId = parseInt(localStorage.getItem(key)) || 0;
        localStorage.setItem(key, currentId + 1);
        return currentId + 1;
    }
}

export { Auth, UsuarioRegular, Administrador };