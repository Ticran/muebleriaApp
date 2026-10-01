
function Footer() {
    return (
        <footer className="footer">
            <div className="contenedor footer-grid">

                {/* Información general de la mueblería */}
                <div>
                    <p>Más de 30 años ofreciendo muebles de calidad para cada hogar.</p>
                </div>

                {/* Enlaces rápidos del sitio */}
                <div>
                    <h3>Enlaces</h3>

                    <ul>
                        <li>
                            <a href="/">Inicio</a>
                        </li>

                        <li>
                            <a href="/productos">Productos</a>
                        </li>

                        <li>
                            <a href="/contacto">Contacto</a>
                        </li>
                    </ul>
                </div>

                {/* Datos de contacto */}
                <div>
                    <h3>Contacto</h3>

                    <p>📍 Av. San Juan 2847</p>
                    <p>C1232AAB</p>
                    <p>Barrio de San Cristóbal</p>
                    <p>Ciudad Autónoma de Buenos Aires</p>

                    <p>📞 +54 11 4567-8900</p>
                    <p>✉ info@hermanosjota.com.ar</p>

                    <p><strong>Horarios:</strong></p>
                    <p>Lun a Vie: 10:00 - 19:00</p>
                    <p>Sáb: 10:00 - 14:00</p>
                </div>

                {/* Redes sociales */}
                <div>
                    <h3>Seguinos</h3>

                    <ul>
                        <li>
                            <a
                                href="https://instagram.com/hermanosjota_ba"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Instagram (@hermanosjota_ba)
                            </a>
                        </li>

                        <li>
                            <a
                                href="https://wa.me/541145678900"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                WhatsApp (+54 11 4567-8900)
                            </a>
                        </li>
                    </ul>
                </div>

            </div>

            {/* Derechos de autor */}
            <div className="copyright">
                <p>© 2026 Hermanos Jota. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
}

export default Footer;
