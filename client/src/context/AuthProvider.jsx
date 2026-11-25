import { useCallback, useEffect, useMemo, useState } from "react";
import { AuthContext } from "./AuthContext.js";
import { guardarSesion, leerSesionGuardada, limpiarSesion } from "./authStorage.js";

const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:3000").replace(/\/$/, "");

function AuthProvider({ children }) {
    const [sesion, setSesion] = useState(leerSesionGuardada);
    const [cargandoSesion, setCargandoSesion] = useState(() => Boolean(sesion.token));

    // Al recargar, se valida el token guardado contra el perfil del usuario.
    useEffect(() => {
        const tokenGuardado = sesion.token;

        if (!tokenGuardado) {
            return undefined;
        }

        const controller = new AbortController();
        let activo = true;

        async function validarSesion() {
            try {
                const respuesta = await fetch(`${API_URL}/api/usuarios/perfil`, {
                    headers: { Authorization: `Bearer ${tokenGuardado}` },
                    signal: controller.signal
                });

                if (!respuesta.ok) {
                    if (respuesta.status === 401 && activo) {
                        limpiarSesion();
                        setSesion({ token: null, usuario: null });
                    }
                    return;
                }

                const usuario = await respuesta.json();
                if (activo) {
                    guardarSesion(tokenGuardado, usuario);
                    setSesion({ token: tokenGuardado, usuario });
                }
            } catch (err) {
                if (!controller.signal.aborted) {
                    console.error("No se pudo validar la sesión guardada:", err);
                }
            } finally {
                if (activo) {
                    setCargandoSesion(false);
                }
            }
        }

        validarSesion();

        return () => {
            activo = false;
            controller.abort();
        };
    }, [sesion.token]);

    const iniciarSesion = useCallback(async (email, password) => {
        const respuesta = await fetch(`${API_URL}/api/usuarios/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });
        const datos = await respuesta.json().catch(() => ({}));

        if (!respuesta.ok) {
            throw new Error(datos.error || "No se pudo iniciar sesión.");
        }

        if (!datos.token || !datos.usuario) {
            throw new Error("La respuesta del servidor no incluyó la sesión.");
        }

        guardarSesion(datos.token, datos.usuario);
        setSesion({ token: datos.token, usuario: datos.usuario });
        setCargandoSesion(false);

        return datos.usuario;
    }, []);

    const cerrarSesion = useCallback(() => {
        limpiarSesion();
        setSesion({ token: null, usuario: null });
        setCargandoSesion(false);
    }, []);

    const valor = useMemo(
        () => ({
            usuario: sesion.usuario,
            token: sesion.token,
            cargandoSesion,
            iniciarSesion,
            cerrarSesion
        }),
        [sesion, cargandoSesion, iniciarSesion, cerrarSesion]
    );

    return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
