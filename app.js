class Persona {
    constructor(nombre, apellido, email, fechaNacimiento){
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.fechaNacimiento = fechaNacimiento;
    }
    
    //Para administrador
    crearUsuario(){

    }

    registrarse(usuarioRegular){
        let jsonUsuarioRegular = {
            nombre: usuarioRegular.nombre,
            apellido: usuarioRegular.apellido,
            email: usuarioRegular.fechaNacimiento,
            contraseña: usuarioRegular.contraseña
        }

        //Voy en este punto
        localStorage.setItem('user' , JSON.stringify(user));

    }

    crearReserva(){

    }
}


class UsuarioRegular extends Persona {
    constructor(nombre, apellido, email, fechaNacimiento,contraseña,idUsuario) {
        super(nombre,apellido,email,fechaNacimiento);
        this.idUsuario = idUsuario;
        this.contraseña = contraseña;
    }

    registrarse(){

    }

    crearReserva(){

    }
}


class Administrador extends Persona {
    constructor(nombre,apellido,email,fechaNacimiento,contraseña,idAdministrador){
        super(nombre,apellido,email,fechaNacimiento);
        this.idAdministrador = idAdministrador;
        this.contraseña = contraseña;
    }

    crearAdmin(){

    }

    crearReserva(){

    }

    eliminarReserva(){

    }

    actualizarReserva(){

    }
}


export { Persona, UsuarioRegular, Administrador };

