import { useState } from "react";

function ContactForm() {
    const [formulario, setFormulario] = useState({
        nombre: "",
        email: "",
        mensaje: ""
    });

    const [enviado, setEnviado] = useState(false);

    // Actualiza el estado cuando el usuario escribe en cualquier campo
    function handleChange(e) {
        const { name, value } = e.target;
        setFormulario({
            ...formulario,
            [name]: value
        });
    }

    // Maneja el envío del formulario
    function handleSubmit(e) {
        e.preventDefault(); // Evita que la página se recargue
        console.log("Formulario enviado con éxito:", formulario);
        setEnviado(true);
        // Limpiamos los campos
        setFormulario({
            nombre: "",
            email: "",
            mensaje: ""
        });
    }

    return (
        <section id="contacto-formulario" className="contacto">
            <div className="contenedor">
                <h1>Contacto</h1>
                <p>
                    ¿Tenés dudas sobre nuestros productos o querés hacer un pedido especial?
                    Escribinos y te respondemos a la brevedad.
                </p>

                <form id="form-contacto" onSubmit={handleSubmit}>
                    <div className="campo">
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={formulario.nombre}
                            onChange={handleChange}
                            placeholder="Ingresá tu nombre completo"
                            required
                        />
                    </div>

                    <div className="campo">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formulario.email}
                            onChange={handleChange}
                            placeholder="Ingresá tu email"
                            required
                        />
                    </div>

                    <div className="campo">
                        <label htmlFor="mensaje">Mensaje</label>
                        <textarea
                            id="mensaje"
                            name="mensaje"
                            rows="5"
                            value={formulario.mensaje}
                            onChange={handleChange}
                            placeholder="Contanos qué necesitás"
                            required
                        ></textarea>
                    </div>

                    <button type="submit" className="btn">
                        Enviar mensaje
                    </button>

                    {enviado && (
                        <p style={{ marginTop: "1rem", color: "#2e7d32", fontWeight: 600 }}>
                            ✅ ¡Gracias! Tu mensaje fue enviado con éxito.
                        </p>
                    )}
                </form>
            </div>
        </section>
    );
}

export default ContactForm;
