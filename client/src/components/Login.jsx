import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.js";

function Login() {
    const { iniciarSesion } = useAuth();
    const navigate = useNavigate();
    const [formulario, setFormulario] = useState({ email: "", password: "" });
    const [mostrarPassword, setMostrarPassword] = useState(false);
    const [enviando, setEnviando] = useState(false);
    const enviandoRef = useRef(false);
    const [error, setError] = useState("");

    function handleChange(e) {
        const { name, value } = e.target;
        setFormulario((actual) => ({ ...actual, [name]: value }));
        setError("");
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (enviandoRef.current) {
            return;
        }

        enviandoRef.current = true;
        setError("");
        setEnviando(true);

        try {
            await iniciarSesion(formulario.email.trim(), formulario.password);
            navigate("/", { replace: true });
        } catch (err) {
            setError(err instanceof Error ? err.message : "No se pudo iniciar sesión.");
        } finally {
            enviandoRef.current = false;
            setEnviando(false);
        }
    }

    return (
        <section className="login" aria-labelledby="login-titulo">
            <div className="login-formulario">
                <div className="login-contenido">
                    <header className="login-cabecera">
                        <p className="login-kicker">Bienvenido a</p>
                        <h1 id="login-titulo">Mueblería Jota</h1>
                        <p className="login-descripcion">
                            Accedé a tu espacio para gestionar productos, pedidos y novedades de la
                            mueblería.
                        </p>
                    </header>

                    <form className="login-form" onSubmit={handleSubmit}>
                        {error && (
                            <p className="mensaje-error login-mensaje" role="alert">
                                {error}
                            </p>
                        )}

                        <div className="campo">
                            <label htmlFor="login-email">Correo electrónico</label>
                            <input
                                id="login-email"
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
                            <label htmlFor="login-password">Contraseña</label>
                            <div className="login-input-con-icono">
                                <input
                                    id="login-password"
                                    name="password"
                                    type={mostrarPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    placeholder="Ingresá tu contraseña"
                                    value={formulario.password}
                                    onChange={handleChange}
                                    required
                                    disabled={enviando}
                                />
                                <button
                                    type="button"
                                    className="login-toggle"
                                    onClick={() => setMostrarPassword((visible) => !visible)}
                                    aria-label={
                                        mostrarPassword
                                            ? "Ocultar contraseña"
                                            : "Mostrar contraseña"
                                    }
                                    aria-pressed={mostrarPassword}
                                    disabled={enviando}
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        width="20"
                                        height="20"
                                        aria-hidden="true"
                                        focusable="false"
                                    >
                                        <path
                                            d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6S2 12 2 12Z"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.6"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <circle
                                            cx="12"
                                            cy="12"
                                            r="3"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.6"
                                        />
                                        {!mostrarPassword && (
                                            <path
                                                d="M4 20 20 4"
                                                stroke="currentColor"
                                                strokeWidth="1.6"
                                                strokeLinecap="round"
                                            />
                                        )}
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn login-boton"
                            disabled={enviando}
                            aria-busy={enviando}
                        >
                            {enviando ? "Iniciando sesión..." : "Iniciar sesión"}
                        </button>
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

export default Login;
