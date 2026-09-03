document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form-contacto");
    // Referencias a los campos
    const nombre = document.getElementById("nombre");
    const email = document.getElementById("email");
    const mensaje = document.getElementById("mensaje");
    // Referencias a los spans de error
    const errorNombre = document.getElementById("error-nombre");
    const errorEmail = document.getElementById("error-email");
    const errorMensaje = document.getElementById("error-mensaje");
    // Referencia al div de éxito
    const mensajeExito = document.getElementById("mensaje-exito");

    // Valida nombre: no vacío y mínimo 3 caracteres
    function validarNombre() {
        if (nombre.value.trim() === "") {
            errorNombre.textContent = "El nombre es obligatorio.";
            return false;
        }
        if (nombre.value.trim().length < 3) {
            errorNombre.textContent = "El nombre debe tener al menos 3 caracteres.";
            return false;
        }
        errorNombre.textContent = "";
        return true;
    }
    // Valida email: no vacío y formato válido
    function validarEmail() {
        const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar el email
        if (email.value.trim() === "") {
            errorEmail.textContent = "El email es obligatorio.";
            return false;
        }
        if (!formatoEmail.test(email.value.trim())) {
            errorEmail.textContent = "Ingresá un email válido.";
            return false;
        }
        errorEmail.textContent = "";
        return true;
    }
    // Valida mensaje: no vacío y mínimo 10 caracteres
    function validarMensaje() {
        if (mensaje.value.trim() === "") {
            errorMensaje.textContent = "El mensaje es obligatorio.";
            return false;
        }
        if (mensaje.value.trim().length < 10) {
            errorMensaje.textContent = "El mensaje debe tener al menos 10 caracteres.";
            return false;
        }
        errorMensaje.textContent = "";
        return true;
    }
    // Validación en tiempo real al salir de cada campo
    nombre.addEventListener("blur", validarNombre);
    email.addEventListener("blur", validarEmail);
    mensaje.addEventListener("blur", validarMensaje);
    // Escuchamos el envío del formulario
    form.addEventListener("submit", function (evento) {
        evento.preventDefault(); // evita que la página se recargue
        const nombreValido = validarNombre();
        const emailValido = validarEmail();
        const mensajeValido = validarMensaje();
        // Si todo es válido, mostramos el mensaje de éxito en el DOM
        if (nombreValido && emailValido && mensajeValido) {
            mensajeExito.innerHTML = `
                <p>
                    ✅ ¡Gracias, ${nombre.value.trim()}! Tu mensaje fue enviado.
                    Te respondemos a <strong>${email.value.trim()}</strong> a la brevedad.
                </p>
            `;
            form.reset(); // limpia los campos
        }
    });
});