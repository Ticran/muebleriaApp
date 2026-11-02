import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:3000").replace(/\/$/, "");

const formularioInicial = {
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "0",
    imagenUrl: ""
};

function ProductForm({ onCreated, onUpdated }) {
    const { id } = useParams();
    const modoEdicion = Boolean(id);
    const [formulario, setFormulario] = useState(formularioInicial);
    const [cargando, setCargando] = useState(false);
    const [cargandoProducto, setCargandoProducto] = useState(modoEdicion);
    const [productoCargado, setProductoCargado] = useState(!modoEdicion);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) {
            return undefined;
        }

        const controller = new AbortController();

        async function cargarProducto() {
            try {
                const respuesta = await fetch(
                    `${API_URL}/api/productos/${encodeURIComponent(id)}`,
                    { signal: controller.signal }
                );
                const producto = await respuesta.json();

                if (!respuesta.ok) {
                    throw new Error(producto.error?.mensaje || "No se pudo cargar el producto.");
                }

                setFormulario({
                    nombre: producto.nombre ?? "",
                    descripcion: producto.descripcion ?? "",
                    precio: String(producto.precio ?? ""),
                    stock: String(producto.stock ?? 0),
                    imagenUrl: producto.imagenUrl ?? producto.imagen ?? ""
                });
                setProductoCargado(true);
            } catch (err) {
                if (!controller.signal.aborted) {
                    setError(err instanceof Error ? err.message : "No se pudo cargar el producto.");
                }
            } finally {
                if (!controller.signal.aborted) {
                    setCargandoProducto(false);
                }
            }
        }

        cargarProducto();

        return () => controller.abort();
    }, [id]);

    function handleChange(e) {
        const { name, value } = e.target;
        setFormulario((actual) => ({ ...actual, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        if (cargandoProducto || (modoEdicion && !productoCargado)) {
            return;
        }

        const precio = Number(formulario.precio);
        const stock = formulario.stock.trim() === "" ? 0 : Number(formulario.stock);

        if (!formulario.nombre.trim()) {
            setError("El nombre es obligatorio.");
            return;
        }

        if (!formulario.precio.trim() || !Number.isFinite(precio) || precio < 0) {
            setError("Ingresá un precio válido, mayor o igual a cero.");
            return;
        }

        if (!Number.isFinite(stock) || stock < 0) {
            setError("Ingresá un stock válido, mayor o igual a cero.");
            return;
        }

        setCargando(true);

        try {
            const respuesta = await fetch(
                modoEdicion
                    ? `${API_URL}/api/productos/${encodeURIComponent(id)}`
                    : `${API_URL}/api/productos`,
                {
                    method: modoEdicion ? "PUT" : "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        nombre: formulario.nombre.trim(),
                        descripcion: formulario.descripcion.trim(),
                        precio,
                        stock,
                        imagenUrl: formulario.imagenUrl.trim()
                    })
                }
            );
            const productoGuardado = await respuesta.json();

            if (!respuesta.ok) {
                throw new Error(
                    productoGuardado.error?.mensaje ||
                        `No se pudo ${modoEdicion ? "actualizar" : "crear"} el producto.`
                );
            }

            if (modoEdicion) {
                onUpdated(productoGuardado);
            } else {
                onCreated(productoGuardado);
            }

            navigate("/productos", {
                state: {
                    mensaje: `Producto ${modoEdicion ? "actualizado" : "creado"} correctamente.`
                }
            });
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : `No se pudo ${modoEdicion ? "actualizar" : "crear"} el producto.`
            );
        } finally {
            setCargando(false);
        }
    }

    return (
        <section className="contacto">
            <div className="contenedor">
                <h1>{modoEdicion ? "Editar producto" : "Crear producto"}</h1>
                <p>
                    {modoEdicion
                        ? "Modificá los datos del mueble."
                        : "Completá los datos del mueble para agregarlo al catálogo."}
                </p>

                <form id="form-producto" onSubmit={handleSubmit}>
                    <fieldset
                        disabled={cargando || cargandoProducto || (modoEdicion && !productoCargado)}
                    >
                        {cargandoProducto && (
                            <p className="mensaje-carga" role="status">
                                Cargando producto...
                            </p>
                        )}

                        <div className="campo">
                            <label htmlFor="producto-nombre">Nombre</label>
                            <input
                                type="text"
                                id="producto-nombre"
                                name="nombre"
                                value={formulario.nombre}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="campo">
                            <label htmlFor="producto-descripcion">Descripción</label>
                            <textarea
                                id="producto-descripcion"
                                name="descripcion"
                                rows="4"
                                value={formulario.descripcion}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="campo">
                            <label htmlFor="producto-precio">Precio</label>
                            <input
                                type="number"
                                id="producto-precio"
                                name="precio"
                                min="0"
                                step="any"
                                value={formulario.precio}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="campo">
                            <label htmlFor="producto-stock">Stock</label>
                            <input
                                type="number"
                                id="producto-stock"
                                name="stock"
                                min="0"
                                step="1"
                                value={formulario.stock}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="campo">
                            <label htmlFor="producto-imagen-url">URL de imagen</label>
                            <input
                                type="text"
                                id="producto-imagen-url"
                                name="imagenUrl"
                                value={formulario.imagenUrl}
                                onChange={handleChange}
                            />
                        </div>

                        <button
                            className="btn"
                            type="submit"
                            disabled={
                                cargando || cargandoProducto || (modoEdicion && !productoCargado)
                            }
                        >
                            {cargando
                                ? modoEdicion
                                    ? "Guardando cambios..."
                                    : "Creando producto..."
                                : modoEdicion
                                  ? "Guardar cambios"
                                  : "Crear producto"}
                        </button>
                    </fieldset>

                    {error && (
                        <p className="mensaje-error" role="alert">
                            {error}
                        </p>
                    )}
                </form>
            </div>
        </section>
    );
}

export default ProductForm;
