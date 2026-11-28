import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:3000").replace(/\/$/, "");

function Registro() {
    const navigate = useNavigate();

    const [formulario, setFormulario] = useState({
        nombre: "",
        email: "",
        password: ""
    });

    const [enviando, setEnviando] = useState(false);
    const [error, setError] = useState("");

    function handleChange(e) {
        const { name, value } = e.target;

        setFormulario((actual) => ({
            ...actual,
            [name]: value
        }));

        setError("");
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        if (formulario.nombre.trim().length < 2) {
            setError("El nombre debe tener al menos 2 caracteres.");
            return;
        }

        if (formulario.password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres.");
            return;
        }

        setEnviando(true);

        try {
            const respuesta = await fetch(`${API_URL}/api/usuarios/registro`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nombre: formulario.nombre.trim(),
                    email: formulario.email.trim().toLowerCase(),
                    password: formulario.password
                })
            });

            const datos = await respuesta.json();

            if (!respuesta.ok) {
                throw new Error(
                    typeof datos.error === "string"
                        ? datos.error
                        : "No se pudo completar el registro."
                );
            }

            navigate("/login", {
                replace: true,
                state: {
                    mensaje: "¡Registro exitoso! Ya podés iniciar sesión."
                }
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : "Ocurrió un error al registrarse.");
        } finally {
            setEnviando(false);
        }
    }

    return (
        <section className="login" aria-labelledby="registro-titulo">
            <div className="login-formulario">
                <div className="login-contenido">
                    <header className="login-cabecera">
                        <p className="login-kicker">Creá tu cuenta</p>
                        <h1 id="registro-titulo">Registrarse</h1>
                        <p className="login-descripcion">
                            Completá tus datos para formar parte de Mueblería Hermanos Jota.
                        </p>
                    </header>

                    <form className="login-form" onSubmit={handleSubmit}>
                        {error && (
                            <p className="mensaje-error login-mensaje" role="alert">
                                {error}
                            </p>
                        )}

                        <div className="campo">
                            <label htmlFor="registro-nombre">Nombre</label>
                            <input
                                id="registro-nombre"
                                name="nombre"
                                type="text"
                                autoComplete="name"
                                placeholder="Ingresá tu nombre"
                                value={formulario.nombre}
                                onChange={handleChange}
                                required
                                minLength={2}
                                disabled={enviando}
                            />
                        </div>

                        <div className="campo">
                            <label htmlFor="registro-email">Correo electrónico</label>
                            <input
                                id="registro-email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                placeholder="tu@email.com"
                                value={formulario.email}
                                onChange={handleChange}
                                required
                                disabled={enviando}
                            />
                        </div>

                        <div className="campo">
                            <label htmlFor="registro-password">Contraseña</label>
                            <input
                                id="registro-password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                placeholder="Creá una contraseña"
                                value={formulario.password}
                                onChange={handleChange}
                                required
                                minLength={6}
                                disabled={enviando}
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn login-boton"
                            disabled={enviando}
                            aria-busy={enviando}
                        >
                            {enviando ? "Registrando..." : "Crear cuenta"}
                        </button>

                        <p>
                            ¿Ya tenés una cuenta? <Link to="/login">Iniciá sesión</Link>
                        </p>
                    </form>
                </div>
            </div>

            <aside className="login-panel">
                <div className="login-panel-contenido">
                    <div className="login-logo">
                        <img src="/imagenes/logo.svg" alt="Logo Hermanos Jota" />
                    </div>
                    <p className="login-panel-kicker">Diseño para vivir</p>
                    <blockquote>Transformamos espacios en lugares para disfrutar.</blockquote>
                    <p className="login-panel-texto">
                        Muebles pensados para trascender el tiempo, con materiales nobles y diseño
                        consciente.
                    </p>
                </div>
            </aside>
        </section>
    );
}

export default Registro;
