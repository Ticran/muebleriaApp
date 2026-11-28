import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.js";

const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:3000").replace(/\/$/, "");

function Perfil() {
    const { token } = useAuth();

    const [usuario, setUsuario] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        async function obtenerPerfil() {
            try {
                const respuesta = await fetch(`${API_URL}/api/usuarios/perfil`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    signal: controller.signal
                });

                const datos = await respuesta.json();

                if (!respuesta.ok) {
                    throw new Error(datos.error || "No se pudo obtener el perfil.");
                }

                setUsuario(datos);
            } catch (err) {
                if (!controller.signal.aborted) {
                    setError(err.message);
                }
            } finally {
                if (!controller.signal.aborted) {
                    setCargando(false);
                }
            }
        }

        obtenerPerfil();

        return () => controller.abort();
    }, [token]);

    if (cargando) {
        return (
            <section className="catalogo">
                <p>Cargando perfil...</p>
            </section>
        );
    }

    if (error) {
        return (
            <section className="catalogo">
                <p className="mensaje-error">{error}</p>
            </section>
        );
    }

    return (
        <section className="catalogo">
            <h1>Mi perfil</h1>

            {usuario && (
                <div>
                    <p>
                        <strong>Nombre:</strong> {usuario.nombre}
                    </p>
                    <p>
                        <strong>Correo electrónico:</strong> {usuario.email}
                    </p>
                    <p>
                        <strong>Rol:</strong> {usuario.rol}
                    </p>
                </div>
            )}
        </section>
    );
}

export default Perfil;
