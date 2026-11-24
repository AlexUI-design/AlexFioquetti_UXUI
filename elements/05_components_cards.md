# Componentes de Diseño: 05_components_cards
> **Filosofía**: Láminas editoriales de papel piedra y trazos hairline de 1px sin sombras difusas. Radios milimétricos (`2px` a `4px`) para preservar la estética arquitectónica e impresa.

---

## 1. Tarjeta Sticky de Proyecto (Sticky Project Card)

* **Uso:** Las 3 tarjetas de proyectos de Flock IT en el escenario `max-w-[1520px]`.
* **Geometría & Superficie:**
  * Fondo: `var(--color-card-stage)` (`#EBECE5`).
  * Borde: `1px solid var(--color-hairline)` (`#D8D9D0`).
  * Radio de esquina: `4px`.
  * Padding interno: `32px` (móvil: `20px`).
  * Sombra: Ninguna (`box-shadow: none`).
* **Comportamiento en Scroll y Física de Mazo:**
  * `position: sticky` con `z-index` creciente (`z-10`, `z-20`, `z-30`).
  * `baseTop`: `calc(80px + (index * 16px))` ajustado dinámicamente con `ResizeObserver`.
  * **Stacking Physics (`useScroll` + `useTransform`):** Las tarjetas cubiertas por las siguientes escalan progresivamente de `1` a `0.96` (`STACK_SCALE_RANGE`) y atenúan su opacidad de `1` a `0.45` (`STACK_OPACITY_RANGE`).
  * **Parallax Scrub:** La imagen interna de portada se desplaza suavemente de `-25px` a `+25px` (`PARALLAX_OFFSET_RANGE`).
* **Contenedor Visual Interno (Gran Escala):**
  * Ancho: `100%`, relación `aspect-[16/10]`, altura `45vh` en móvil y `66vh` (`max-h-[760px]`) en desktop.
  * Radio de la imagen: `2px`, borde `1px solid var(--color-hairline)`, fondo `var(--color-paper)`.
  * Encuadre por defecto: `object-cover object-top`.
  * Hover: La imagen escala a `1.015` en `300ms` con curva `[0.16, 1, 0.3, 1]`.

---

## 2. Caso de Estudio Portfolio (Layout Abierto 60/40)

* **Uso:** Presentación protagonista del caso *Bodega Tierras Altas* directamente sobre el lienzo de papel cálido (`#F3F4EF`), **sin caja contenedora ni sombra**.
* **Composición:**
  * Grilla asimétrica `grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center`.
  * Columna izquierda (7 cols): vitrina visual `aspect-[16/10]` con micro-etiqueta `[ AMPLIAR LANDING COMPLETA ]`.
  * Columna derecha (5 cols): overline mono, título Serif, subtítulo Serif itálico, narrativa factual, tags mono en línea (`·`) y acciones (botón sólido en tinta a Behance + botón hairline para Lightbox full-page).

---

## 3. Fila de Línea de Tiempo (Editorial Ledger Row)

* **Uso:** Cada entrada de la sección Experiencia en 3 columnas (`3 / 4 / 5` en desktop).
* **Geometría & Superficie:**
  * Borde superior: `1px solid var(--color-hairline)` (y borde inferior en la última fila).
  * Padding vertical: `32px 16px`.
  * Hover State: `hover:bg-ink/[0.02]` con transición `200ms`.

---

## 4. Subcomponentes de Galería In-Situ (Tabs, Image Frames y Lightbox)

### A. Selector de Tabs por Producto / Módulo
* **Geometría:**
  * Barra horizontal con scroll táctil en móvil (`flex-nowrap overflow-x-auto border-b border-hairline`) sin fondo ni cápsula gris.
  * Tab button: `py-2 font-mono text-xs tracking-wider`.
  * Indicador activo: línea inferior ultrafina `h-[1.5px] bg-ink`.
* **Animación:** Transición cruzada sutil (`opacity: 0 -> 1`, `y: 6px -> 0`, `250ms` con curva `[0.16, 1, 0.3, 1]`).

### B. Marco de Imagen en Galería (*Desktop Frame* y *Mobile Frame*)
* **Desktop Frame (`16:10`):**
  * Botón interactivo `cursor-zoom-in`, `aspect-[16/10] rounded-[2px] border border-hairline bg-paper overflow-hidden`.
* **Mobile Frame (`393:852`):**
  * Relación nativa `aspect-[393/852]`, radio `12px`, borde `1px solid var(--color-hairline)`, fondo `var(--color-paper)`, sin sombras plásticas.
* **Badge Flotante:** `rounded-[2px] bg-paper/90 backdrop-blur-sm border border-hairline text-[11px] font-mono text-ink`.

### C. Lightbox Minimalista de Inspección (`z-100`)
* **Backdrop:** `fixed inset-0 z-[100] bg-ink/85 backdrop-blur-sm`.
* **Contenedor Modal:** `max-h-[90vh] w-full max-w-5xl rounded-[4px] border border-hairline bg-paper`.
* **Cabecera Sticky:** `border-b border-hairline bg-paper/95 backdrop-blur-md` con título en Editorial Serif y botón de cierre hairline.
* **Cuerpo Scrollable:** `overscroll-contain overflow-y-auto bg-card-stage/60` pausando Lenis (`lenis.stop()`) mientras el visor está abierto.
