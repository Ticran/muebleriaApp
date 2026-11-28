import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
            <section className="perfil-pagina contenedor">
                <p className="mensaje-carga">Cargando perfil...</p>
            </section>
        );
    }

    if (error) {
        return (
            <section className="perfil-pagina contenedor">
                <p className="mensaje-error">{error}</p>
            </section>
        );
    }

    const esAdmin = usuario?.rol === "admin";

    return (
        <section className="perfil-pagina contenedor">
            <div className="perfil-card">
                <p className="admin-kicker">Mi Cuenta</p>
                <div className="perfil-cabecera">
                    <h1>{usuario?.nombre || "Mi perfil"}</h1>
                    <span className={`perfil-rol-badge${esAdmin ? " rol-admin" : ""}`}>
                        {esAdmin ? "Administrador" : "Cliente"}
                    </span>
                </div>

                {usuario && (
                    <dl className="perfil-datos">
                        <div>
                            <dt>Nombre</dt>
                            <dd>{usuario.nombre}</dd>
                        </div>
                        <div>
                            <dt>Correo electrónico</dt>
                            <dd>{usuario.email}</dd>
                        </div>
                        <div>
                            <dt>Tipo de cuenta</dt>
                            <dd>{esAdmin ? "Administrador del catálogo" : "Cliente"}</dd>
                        </div>
                    </dl>
                )}

                <div className="perfil-acciones">
                    {esAdmin ? (
                        <>
                            <Link to="/admin" className="btn">
                                Ir al Panel
                            </Link>
                            <Link to="/admin/crear-producto" className="btn-volver">
                                + Nuevo producto
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/mis-pedidos" className="btn-volver">
                                Ver mis pedidos
                            </Link>
                            <Link to="/productos" className="btn-volver">
                                Ir al catálogo
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}

export default Perfil;
