# Carlos Sanz · Portfolio

Portfolio estático publicado en [raclosdev.github.io](https://raclosdev.github.io/). Presenta Ascension, LoopDeck, PorrApp y Portfolio Tracker con sus funcionalidades, capturas y enlaces a la implementación.

## Desarrollo

No necesita compilación ni dependencias de ejecución. Sirve esta carpeta con un servidor HTTP:

```bash
python -m http.server 5185 --bind 127.0.0.1
```

- `index.html`: contenido, enlaces y metadatos; los proyectos se pueden consultar sin JavaScript.
- `style.css`: diseño responsive, composición de móviles y preferencia de movimiento reducido.
- `site.js`: selector de vista previa y galería con navegación por teclado, Escape y restitución del foco.
- `assets/screens`: capturas en WebP de las interfaces reales. Los datos son de demostración; Portfolio Tracker no ofrece acceso público a su cuenta.

## Actualizar las capturas

Los scripts y datos para reproducir las pantallas están en `docs/screenshots` de cada aplicación. Las portadas compartidas del perfil y los README se generan en [RaclosDev/scripts](https://github.com/RaclosDev/RaclosDev/tree/main/scripts).

1. Regenera las capturas en el repositorio de la aplicación y revisa sus fuentes, estados y datos.
2. Convierte las imágenes a WebP sin alterar su contenido, conservando su resolución, y sustituye las correspondientes en `assets/screens`.
3. Actualiza los textos y enlaces de `index.html` si cambió el producto; los títulos del selector están en `site.js`.
4. Comprueba la página a 360, 390, 768 y 1440 px, sin desbordamiento, con imágenes cargadas y galería operativa. Revisa también navegación por teclado, movimiento reducido y lectura sin JavaScript.

GitHub Pages publica la rama `main`. No hay analítica ni formularios que envíen datos; el contacto utiliza enlaces a correo y LinkedIn. Las fuentes Anton e Inter se cargan desde Google Fonts.
