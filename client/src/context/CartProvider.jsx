import {  useState } from "react";
import { CartContext } from "./CartContext";

export function CartProvider({ children }) {
    const [carrito, setCarrito] = useState([]);

    function agregarAlCarrito(producto) {
        setCarrito((actual) => {
            const idProducto = producto._id ?? producto.id;

            const existente = actual.find(
                (item) => (item._id ?? item.id) === idProducto
            );

            if (existente) {
                return actual.map((item) =>
                    (item._id ?? item.id) === idProducto
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                );
            }

            return [...actual, { ...producto, cantidad: 1 }];
        });
    }

    function eliminarDelCarrito(id) {
        setCarrito((actual) =>
            actual.filter(
                (producto) => (producto._id ?? producto.id) !== id
            )
        );
    }

    function comprarProducto(producto) {
        if (producto) {
            eliminarDelCarrito(producto._id ?? producto.id);
            return;
        }

        setCarrito([]);
    }

    function vaciarCarrito() {
        setCarrito([]);
    }

    const cantidadCarrito = carrito.reduce(
        (total, producto) => total + producto.cantidad,
        0
    );

    return (
        <CartContext.Provider
            value={{
                carrito,
                agregarAlCarrito,
                eliminarDelCarrito,
                comprarProducto,
                vaciarCarrito,
                cantidadCarrito
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

