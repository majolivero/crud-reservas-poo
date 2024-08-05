import { Auth, UsuarioRegular, Administrador } from "../app.js";

const currentUser = JSON.parse(localStorage.getItem("user"));
const crearUsuarioBtn = document.getElementById("crearUsuarioBtn");
const adminOptions = document.getElementById("adminOptions");
const usuarioSelect = document.getElementById("usuarioSelect");
const crearReservaBtn = document.getElementById("crearReservaBtn");
const reservasLista = document.getElementById("reservasLista");
const cerrarSesionBtn = document.getElementById("cerrarSesionBtn");

// Verifica si hay un usuario logueado.
if (currentUser) {
  if (currentUser.idAdministrador) {
    crearUsuarioBtn.style.display = "block";
    adminOptions.style.display = "block";
    crearUsuarioBtn.addEventListener("click", () => {
      window.location.href = "../crearCuenta/index.html";
    });

    // Carga usuarios en la lista.
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.forEach((user) => {
      const option = document.createElement("option");
      option.value = user.idUsuario;
      option.textContent = `${user.nombre} ${user.apellido}`;
      usuarioSelect.appendChild(option);
    });

    // Crea la reserva la reserva asociada a al usuario seleccionado en la lista.
    crearReservaBtn.addEventListener("click", () => {
      const usuarioId = usuarioSelect.value;
      const fechaReserva = document.getElementById("reservaFecha").value;

      if (usuarioId && fechaReserva) {
        const reserva = { fecha: fechaReserva, usuarioId: parseInt(usuarioId) };
        const admin = new Administrador(
          currentUser.idAdministrador,
          currentUser.nombre,
          currentUser.apellido,
          currentUser.email,
          currentUser.fechaNacimiento,
          currentUser.contraseña
        );
        admin.crearReserva(reserva);
        alert("Reserva creada exitosamente para el usuario seleccionado.");
        // Recarga la lista de reservas después de crear la reserva.
        cargarReservas();
      } else {
        alert("Por favor seleccione un usuario y una fecha de reserva.");
      }
    });

    // Función para cargar reservas en la lista.
function cargarReservas() {
    // Limpia la lista antes de cargarla nuevamente.
    reservasLista.innerHTML = "";
    const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
    const usuarioId = usuarioSelect.value;

    if (usuarioId) {
        const reservasFiltradas = reservas.filter(
            (reserva) => reserva.usuarioId == parseInt(usuarioId)
        );
        reservasFiltradas.forEach((reserva) => {
            const li = document.createElement("li");
            li.textContent = `Fecha: ${reserva.fecha}`;

            // Crear botón de actualizar
            const actualizarBtn = document.createElement("button");
            actualizarBtn.textContent = "Actualizar";
            actualizarBtn.addEventListener("click", () => {
                // Acción para actualizar la reserva
                const nuevaFecha = prompt("Ingrese la nueva fecha de reserva (YYYY-MM-DD):", reserva.fecha);
                if (nuevaFecha) {
                    actualizarReserva(reserva.id, nuevaFecha);
                }
            });

            // Crear botón de eliminar
            const eliminarBtn = document.createElement("button");
            eliminarBtn.textContent = "Eliminar";
            eliminarBtn.addEventListener("click", () => {
                // Acción para eliminar la reserva
                if (confirm("¿Está seguro de que desea eliminar esta reserva?")) {
                    eliminarReserva(reserva.id);
                }
            });

            // Añadir botones al elemento de lista
            li.appendChild(actualizarBtn);
            li.appendChild(eliminarBtn);

            // Añadir el elemento de lista a la lista de reservas
            reservasLista.appendChild(li);
        });
    }
}

        function actualizarReserva(reservaId, nuevaFecha) {
            let reservas = JSON.parse(localStorage.getItem('reservas')) || [];
            reservas = reservas.map(reserva => reserva.id === reservaId ? { ...reserva, fecha: nuevaFecha } : reserva);
            localStorage.setItem('reservas', JSON.stringify(reservas));
            cargarReservas();
        }

        function eliminarReserva(reservaId) {
            let reservas = JSON.parse(localStorage.getItem('reservas')) || [];
            reservas = reservas.filter(reserva => reserva.id !== reservaId);
            localStorage.setItem('reservas', JSON.stringify(reservas));
            cargarReservas();
        }

    // Carga las reservas por defecto para el primer usuario en la lista.
    if (usuarioSelect.options.length > 0) {
      usuarioSelect.selectedIndex = 0;
      cargarReservas();
    }

    // Evento de cambio en la lista para actualizar la lista de reservas.
    usuarioSelect.addEventListener("change", cargarReservas);
  } else {
    crearReservaBtn.addEventListener("click", () => {
      const fechaReserva = document.getElementById("reservaFecha").value;
      if (fechaReserva) {
        const reserva = {
          fecha: fechaReserva,
          usuarioId: currentUser.idUsuario,
        };
        const usuario = new UsuarioRegular(
          currentUser.idUsuario,
          currentUser.nombre,
          currentUser.apellido,
          currentUser.email,
          currentUser.fechaNacimiento,
          currentUser.contraseña
        );
        usuario.crearReserva(reserva);
        alert("Reserva creada exitosamente.");
        // Recarga la lista de reservas
        cargarReservas();
      } else {
        alert("Por favor seleccione una fecha de reserva.");
      }
    });

    // Función para cargar las reservas del usuario regular logueado
    function cargarReservas() {
        reservasLista.innerHTML = ""; // Limpiar la lista antes de cargar
      const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
      const reservasFiltradas = reservas.filter(
        (reserva) => reserva.usuarioId === currentUser.idUsuario
      );

      reservasFiltradas.forEach((reserva) => {
        const li = document.createElement("li");
        li.textContent = `Fecha: ${reserva.fecha}`;
    
        // Añadir el elemento de lista a la lista de reservas
        reservasLista.appendChild(li);
    });
    }

    // Carga reservas al cargar la página
    cargarReservas();
  }

  // Maneja el cierre de sesión
  cerrarSesionBtn.addEventListener("click", () => {
    Auth.logout();
    window.location.href = "../login/index.html";
  });
} else {
  alert("Por favor inicie sesión.");
  window.location.href = "../login/index.html";
}

