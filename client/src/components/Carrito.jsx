function Carrito({ carrito, onEliminar, onComprar }) {
    const total = carrito.reduce(
        (acumulado, producto) => acumulado + producto.precio * producto.cantidad,
        0
    );

    if (carrito.length === 0) {
        return (
            <section className="carrito-pagina">
                <h1>Mi carrito</h1>

                <div className="carrito-vacio">
                    <p>Tu carrito está vacío.</p>
                    <p>Agregá algún mueble para verlo acá.</p>
                </div>
            </section>
        );
    }

    return (
        <section className="carrito-pagina">
            <h1>Mi carrito</h1>

            <div className="carrito-contenido">
                <div className="carrito-productos">
                    {carrito.map((producto) => (
                        <article className="carrito-producto" key={producto.id}>
                            <img src={`/${producto.imagen}`} alt={producto.nombre} />

                            <div className="carrito-producto-info">
                                <h2>{producto.nombre}</h2>

                                <p className="carrito-precio">
                                    ${producto.precio.toLocaleString("es-AR")}
                                </p>

                                <p>Cantidad: {producto.cantidad}</p>

                                <p>
                                    Subtotal: $
                                    {(producto.precio * producto.cantidad).toLocaleString("es-AR")}
                                </p>

                                <div className="carrito-acciones">
                                    <button
                                        className="btn-comprar"
                                        onClick={() => onComprar(producto)}
                                    >
                                        Comprar
                                    </button>

                                    <button
                                        className="btn-eliminar"
                                        onClick={() => onEliminar(producto.id)}
                                    >
                                        Eliminar del carrito
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                <aside className="carrito-resumen">
                    <h2>Resumen de compra</h2>

                    <p>
                        Productos:{" "}
                        {carrito.reduce((total, producto) => total + producto.cantidad, 0)}
                    </p>

                    <p className="carrito-total">Total: ${total.toLocaleString("es-AR")}</p>

                    <button className="btn-comprar-todo" onClick={() => onComprar(null)}>
                        Comprar todo
                    </button>
                </aside>
            </div>
        </section>
    );
}

export default Carrito;
