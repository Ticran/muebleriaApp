import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.js";
import { useCart } from "../context/useCart";

function Navbar() {
    
    // Estado del menú mobile (hamburguesa)
    const { cantidadCarrito } = useCart();
    const [menuAbierto, setMenuAbierto] = useState(false);
    const { usuario, cerrarSesion } = useAuth();
    const navigate = useNavigate();

    const esAdmin = usuario?.rol === "admin";

    function handleCerrarSesion() {
        cerrarSesion();
        setMenuAbierto(false);
        navigate("/login", { replace: true });
    }

    function cerrarMenu() {
        setMenuAbierto(false);
    }

    return (
        <header className="header">
            <div className="contenedor">
                <div className="marca">
                    <Link to={esAdmin ? "/admin" : "/"} className="logo" onClick={cerrarMenu}>
                        <img src="/imagenes/logo.svg" alt="Logo Hermanos Jota" />
                    </Link>

                    <div className="nombre-marca">
                        <h2>Hermanos Jota</h2>
                        <span>{esAdmin ? "Administración" : "Mueblería"}</span>
                    </div>
                </div>

                <nav className={`menu${menuAbierto ? " menu-abierto" : ""}`} id="menu-principal">
                    <ul>
                        <li>
                            <Link to="/" onClick={cerrarMenu}>
                                Inicio
                            </Link>
                        </li>

                        {!esAdmin && (
                            <>
                                <li>
                                    <Link to="/productos" onClick={cerrarMenu}>
                                        Catálogo
                                    </Link>
                                </li>

                                <li>
                                    <Link to="/contacto" onClick={cerrarMenu}>
                                        Contacto
                                    </Link>
                                </li>
                            </>
                        )}

                        {!usuario && (
                            <>
                                <li>
                                    <Link to="/login" onClick={cerrarMenu}>
                                        Acceder
                                    </Link>
                                </li>

                                <li>
                                    <Link to="/registro" onClick={cerrarMenu}>
                                        Registrarse
                                    </Link>
                                </li>
                            </>
                        )}

                        {usuario && (
                            <>
                                {esAdmin && (
                                    <li>
                                        <Link to="/admin" onClick={cerrarMenu}>
                                            Panel
                                        </Link>
                                    </li>
                                )}

                                <li>
                                    <Link to="/perfil" onClick={cerrarMenu}>
                                        Mi perfil
                                    </Link>
                                </li>

                                {!esAdmin && (
                                    <li>
                                        <Link to="/mis-pedidos" onClick={cerrarMenu}>
                                            Mis pedidos
                                        </Link>
                                    </li>
                                )}

                                <li>
                                    <button
                                        type="button"
                                        className="btn-cerrar-sesion"
                                        onClick={handleCerrarSesion}
                                    >
                                        Cerrar sesión
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>

                {!esAdmin && (
                    <div className="carrito">
                        <Link
                            to="/carrito"
                            id="carrito-link"
                            aria-label="Ver carrito"
                            onClick={cerrarMenu}
                        >
                            <img src="/imagenes/shopping-cart.svg" alt="Carrito de compras" />
                            <span id="carrito-contador">{cantidadCarrito}</span>
                        </Link>
                    </div>
                )}

                <button
                    type="button"
                    className="btn-menu"
                    aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
                    aria-expanded={menuAbierto}
                    aria-controls="menu-principal"
                    onClick={() => setMenuAbierto((abierto) => !abierto)}
                >
                    <span className="barra"></span>
                    <span className="barra"></span>
                    <span className="barra"></span>
                </button>
            </div>
        </header>
    );
}

export default Navbar;
