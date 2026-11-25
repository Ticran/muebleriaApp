const CLAVE_TOKEN = "auth:jwt";
const CLAVE_USUARIO = "auth:usuario";

export function leerSesionGuardada() {
    try {
        const token = window.localStorage.getItem(CLAVE_TOKEN);
        const usuarioGuardado = window.localStorage.getItem(CLAVE_USUARIO);

        if (!token || !usuarioGuardado) {
            return { token: null, usuario: null };
        }

        const usuario = JSON.parse(usuarioGuardado);
        if (!usuario || typeof usuario !== "object" || Array.isArray(usuario)) {
            limpiarSesion();
            return { token: null, usuario: null };
        }

        return { token, usuario };
    } catch {
        limpiarSesion();
        return { token: null, usuario: null };
    }
}

export function guardarSesion(token, usuario) {
    try {
        window.localStorage.setItem(CLAVE_TOKEN, token);
        window.localStorage.setItem(CLAVE_USUARIO, JSON.stringify(usuario));
    } catch {
        // Si el almacenamiento no está disponible, la sesión sigue viva en memoria.
    }
}

export function limpiarSesion() {
    try {
        window.localStorage.removeItem(CLAVE_TOKEN);
        window.localStorage.removeItem(CLAVE_USUARIO);
    } catch {
        // No hay nada que limpiar si el almacenamiento no está disponible.
    }
}
