// ================================================================
// datos.js
// Catálogo de productos de la mueblería.
// Los productos están almacenados como un array de objetos dentro
// de un archivo .js, tal como exige la consigna del Sprint.
// ================================================================

const PRODUCTOS = [
    {
        id: 1,
        nombre: "Aparador Uspallata",
        precio: 450000,
        imagen: "imagenes/Aparador Uspallata.png",
        descripcion: "Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón. Su silueta minimalista realza el veteado natural de la madera, creando una pieza que combina funcionalidad y elegancia atemporal para espacios contemporáneos.",
        material: "Nogal macizo FSC®, herrajes de latón",
        medidas: "180 × 45 × 75 cm",
        acabado: "Aceite natural ecológico",
        peso: "68 kg",
        capacidad: "6 compartimentos interiores",
        destacado: true
    },
    {
        id: 2,
        nombre: "Mesa Comedor Pampa",
        precio: 280000,
        imagen: "imagenes/Mesa Comedor Pampa.png",
        descripcion: "Mesa extensible de roble macizo con tablero biselado y sistema de apertura suave. Su diseño robusto y elegante se adapta perfectamente a reuniones íntimas o grandes celebraciones familiares, extendiéndose de 6 a 10 comensales.",
        material: "Roble macizo FSC®, mecanismo alemán",
        medidas: "160-240 × 90 × 75 cm",
        acabado: "Aceite-cera natural",
        capacidad: "6-10 comensales",
        extension: "Sistema de mariposa central",
        destacado: true
    },
    {
        id: 3,
        nombre: "Sillón Copacabana",
        precio: 195000,
        imagen: "imagenes/Sillón Copacabana.png",
        descripcion: "Sillón lounge en cuero cognac con base giratoria en acero Burnt Sienna. Inspirado en la estética brasilera moderna de los 60, combina comodidad excepcional con un diseño icónico que trasciende tendencias y épocas.",
        material: "Cuero curtido vegetal, acero pintado",
        medidas: "90 × 85 × 95 cm",
        acabado: "Cuero anilina premium",
        rotacion: "360° silenciosa y suave",
        garantia: "10 años en estructura",
        destacado: true
    },
    {
        id: 4,
        nombre: "Escritorio Costa",
        precio: 320000,
        imagen: "imagenes/Escritorio Costa.png",
        descripcion: "Escritorio compacto con cajón organizado y tapa pasacables integrada en bambú laminado. Ideal para espacios de trabajo en casa, combina funcionalidad moderna con estética minimalista y sostenible, perfecto para el trabajo remoto.",
        material: "Bambú laminado, herrajes ocultos",
        medidas: "120 × 60 × 75 cm",
        acabado: "Laca mate resistente",
        almacenamiento: "1 cajón con organizador",
        cables: "Pasacables integrado",
        destacado: true
    },
    {
        id: 5,
        nombre: "Biblioteca Recoleta",
        precio: 550000,
        imagen: "imagenes/Biblioteca Recoleta.png",
        descripcion: "Sistema modular de estantes abierto que combina estructura de acero Sage Green y repisas en roble claro. Perfecta para colecciones y objetos de diseño, su diseño versátil se adapta a cualquier espacio contemporáneo con elegancia funcional.",
        material: "Estructura de acero, estantes de roble",
        medidas: "100 × 35 × 200 cm",
        acabado: "Laca mate ecológica",
        capacidad: "45 kg por estante",
        modulares: "5 estantes ajustables",
        destacado: false
    },
    {
        id: 6,
        nombre: "Butaca Mendoza",
        precio: 20000,
        imagen: "imagenes/Butaca Mendoza.png",
        descripcion: "Butaca tapizada en bouclé Dusty Rose con base de madera de guatambú. El respaldo curvo abraza el cuerpo y ofrece máximo confort, mientras que su diseño orgánico aporta calidez y sofisticación a cualquier ambiente contemporáneo.",
        material: "Guatambú macizo, tela bouclé",
        medidas: "80 × 75 × 85 cm",
        acabado: "Cera vegetal, tapizado premium",
        tapizado: "Repelente al agua y manchas",
        confort: "Espuma alta densidad",
        destacado: false
    },
    {
        id: 7,
        nombre: "Mesa de Centro Araucaria",
        precio: 230000,
        imagen: "imagenes/Mesa de Centro Araucaria.png",
        descripcion: "Mesa de centro con sobre circular de mármol Patagonia y base de tres patas en madera de nogal. Su diseño minimalista se convierte en el punto focal perfecto para cualquier sala de estar contemporánea, combinando la frialdad del mármol con la calidez de la madera.",
        material: "Sobre de mármol Patagonia, patas de nogal",
        medidas: "90 × 90 × 45 cm",
        acabado: "Mármol pulido, aceite natural en madera",
        peso: "42 kg",
        carga_maxima: "25 kg distribuidos",
        destacado: false
    },
    {
        id: 8,
        nombre: "Mesa de Noche Aconcagua",
        precio: 150000,
        imagen: "imagenes/Mesa de Noche Aconcagua.png",
        descripcion: "Mesa de noche con cajón oculto y repisa inferior en roble certificado FSC®. Su diseño limpio y funcional permite convivir con diferentes estilos de dormitorio, ofreciendo almacenamiento discreto y elegante para objetos personales.",
        material: "Roble macizo FSC®, herrajes soft-close",
        medidas: "45 × 35 × 60 cm",
        acabado: "Barniz mate de poliuretano",
        almacenamiento: "1 cajón + repisa inferior",
        caracteristicas: "Cajón con cierre suave",
        destacado: false
    },
    {
        id: 9,
        nombre: "Sofá Patagonia",
        precio: 380000,
        imagen: "imagenes/Sofá Patagonia.png",
        descripcion: "Sofá de tres cuerpos tapizado en lino Warm Alabaster con patas cónicas de madera. Los cojines combinan espuma de alta resiliencia con plumón reciclado, ofreciendo comodidad duradera y sostenible para el hogar moderno.",
        material: "Madera de eucalipto certificada FSC®",
        medidas: "220 × 90 × 80 cm",
        estructura: "Madera de eucalipto certificada FSC®",
        tapizado: "Lino 100% natural premium",
        relleno: "Espuma HR + plumón reciclado",
        sostenibilidad: "Materiales 100% reciclables",
        destacado: false
    },
    {
        id: 10,
        nombre: "Silla de Trabajo Belgrano",
        precio: 250000,
        imagen: "imagenes/Silla de Trabajo Belgrano.png",
        descripcion: "Silla ergonómica regulable en altura con respaldo de malla transpirable y asiento tapizado en tejido reciclado. Diseñada para largas jornadas de trabajo con máximo confort y apoyo lumbar, ideal para oficinas en casa y espacios de coworking.",
        material: "Malla técnica, tejido reciclado",
        medidas: "60 × 60 × 90-100 cm",
        acabado: "Base cromada, tapizado premium",
        regulacion: "Altura + inclinación respaldo",
        certificacion: "Ergonomía europea EN 1335",
        destacado: false
    },
    {
        id: 11,
        nombre: "Sillas Córdoba",
        precio: 220000,
        imagen: "imagenes/Sillas Córdoba.png",
        descripcion: "Set de cuatro sillas apilables en contrachapado moldeado de nogal y estructura tubular pintada en Sage Green. Su diseño ergonómico y materiales de calidad garantizan comodidad y durabilidad en el uso diario, perfectas para comedores contemporáneos.",
        material: "Contrachapado nogal, tubo de acero",
        medidas: "45 × 52 × 80 cm (cada una)",
        acabado: "Laca mate, pintura epoxi",
        apilables: "Hasta 6 sillas",
        incluye: "Set de 4 sillas",
        destacado: false
    }
];

// ================================================================
// Simulación de carga asíncrona del catálogo.
//
// Devuelve una Promise que resuelve con el array de productos
// después de un pequeño retraso (setTimeout), simulando una
// respuesta de red. Se consume con async/await en otros archivos:
//   const productos = await cargarProductosAsync();
// ================================================================
function cargarProductosAsync() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(PRODUCTOS);
        }, 750);
    });
}
