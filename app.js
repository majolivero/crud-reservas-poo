class Persona {
    constructor(nombre, apellido, email, fechaNacimiento){
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.fechaNacimiento = fechaNacimiento;
    }
    
    crearUsuario(){

    }

    registrarse(){

    }

    crearReserva(){

    }
}


class UsuarioRegular extends Persona {
    constructor(nombre, apellido, email, fechaNacimiento,idUsuario) {
        super(nombre,apellido,email,fechaNacimiento);
        this.idUsuario = idUsuario;
    }

    registrarse(){

    }

    crearReserva(){

    }
}


class Administrador extends Persona {
    constructor(nombre,apellido,email,fechaNacimiento,idAdministrador){
        super(nombre,apellido,email,fechaNacimiento);
        this.idAdministrador = idAdministrador;
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