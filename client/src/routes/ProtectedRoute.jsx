import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.js";

function ProtectedRoute({ children, soloAdmin = false }) {
    const { usuario, cargandoSesion } = useAuth();
    const location = useLocation();

    if (cargandoSesion) {
        return <p>Verificando sesión...</p>;
    }

    if (!usuario) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    if (soloAdmin && usuario.rol !== "admin") {
        return <Navigate to="/" replace />;
    }

    return children ? children : <Outlet />;
}

export default ProtectedRoute;
