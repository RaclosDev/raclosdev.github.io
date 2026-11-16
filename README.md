# Carlos Sanz · Portfolio

Portfolio estático publicado en [raclosdev.github.io](https://raclosdev.github.io/). Presenta Ascension, LoopDeck, PorrApp y Portfolio Tracker con sus funcionalidades, capturas y enlaces a la implementación.

## Desarrollo

No necesita compilación ni dependencias de ejecución. Sirve esta carpeta con un servidor HTTP:

```bash
python -m http.server 5185 --bind 127.0.0.1
```

- `index.html`: contenido, enlaces y metadatos; los proyectos se pueden consultar sin JavaScript.
- `style.css`: diseño responsive, composición de móviles y preferencia de movimiento reducido.
- `site.js`: selector de vista previa, galería con navegación por teclado, deslizamiento táctil, Escape y restitución del foco, y marca de la sección actual en la cabecera fija.
- `motion.js`: capa de movimiento sin dependencias (aparición al hacer scroll, títulos por líneas, banda en bucle, parallax de los móviles, inclinación 3D, foco de luz y botones magnéticos). Solo se activa con JavaScript y sin `prefers-reduced-motion`; sin ella la página queda completa y estática.
- `404.html`, `robots.txt` y `sitemap.xml`: página de ruta inexistente e indicaciones para buscadores. Los datos estructurados (`Person`) van en `index.html`.
- `assets/screens`: capturas en WebP de las interfaces reales. Los datos son de demostración; Portfolio Tracker no ofrece acceso público a su cuenta.

## Actualizar las capturas

Los scripts y datos para reproducir las pantallas están en `docs/screenshots` de cada aplicación. Las portadas compartidas del perfil y los README se generan en [RaclosDev/scripts](https://github.com/RaclosDev/RaclosDev/tree/main/scripts).

1. Regenera las capturas en el repositorio de la aplicación y revisa sus fuentes, estados y datos.
2. Convierte las imágenes a WebP sin alterar su contenido, conservando su resolución, y sustituye las correspondientes en `assets/screens`.
3. Actualiza los textos y enlaces de `index.html` si cambió el producto; los títulos del selector están en `site.js`.
4. Comprueba la página a 360, 390, 768 y 1440 px, sin desbordamiento, con imágenes cargadas y galería operativa. Revisa también navegación por teclado, movimiento reducido, lectura sin JavaScript y la vista de impresión.

GitHub Pages publica la rama `main`. No hay analítica ni formularios que envíen datos; el contacto utiliza enlaces a correo y LinkedIn. Las fuentes Anton e Inter se cargan desde Google Fonts.
