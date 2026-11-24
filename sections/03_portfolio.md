# Especificación de Sección: 03_portfolio
> **Ubicación en el sitio**: Inmediatamente posterior al bloque de Proyectos Sticky  
> **Propósito**: Presentar casos de estudio integrales de diseño y dirección de arte digital, comenzando con un **Showcase Editorial Protagonista** (Bodega Tierras Altas) y preparado para escalar a grilla de 2 columnas si se incorporan nuevos casos en el futuro.

---

## 1. Distribución & Grilla (Showcase Protagonista a Ancho Completo)

Dado que actualmente el portfolio activo cuenta con **1 caso curado** (**Bodega Tierras Altas**), se utiliza un formato editorial protagonista a ancho completo (`60% / 40%`) para darle jerarquía visual real sin dejar tarjetas vacías ni *placeholders*:

```
┌────────────────────────────────────────────────────────────────────────────┐
│ 02 / PORTFOLIO · CASO DE ESTUDIO DESTACADO                                 │
│ Portfolio                                                                  │
│                                                                            │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ [ 7 cols (~60%) — Imagen 16:10 ]   │ [ 5 cols (~40%) — Ficha Técnica ] │ │
│ │                                    │                                   │ │
│ │ bodega-tierras-altas-cover.jpg     │ CASO DE ESTUDIO · UX/UI EDITORIAL │ │
│ │ (Hero "Experiencia en Bodega")     │ Bodega Tierras Altas — Rediseño   │ │
│ │                                    │ Web & Experiencia Digital         │ │
│ │                                    │                                   │ │
│ │            [Ver pantalla completa ↗] │ Síntesis editorial + Tags         │ │
│ │                                    │ [Ver caso en Behance ↗]           │ │
│ │                                    │ [Explorar landing completa ↗]     │ │
│ └────────────────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────────┘
```

* **Contenedor de Sección:**
  * `max-w-6xl mx-auto px-6 py-20` *(mismo ancho maestro y padding lateral que `02_proyectos_sticky.md` para alinear el eje vertical de lectura)*.
* **Tarjeta Protagonista:**
  * Superficie `bg-surface` (`#FFFFFF`), borde hairline `border border-hairline` (`#E5E7EB`), radio `12px`, padding `p-6 md:p-8`, sombra sutil `shadow-sm`.
  * Grilla interna: `grid grid-cols-1 lg:grid-cols-12 gap-8 items-center`.
    * **Columna Visual (`lg:col-span-7`):** Marco interactivo `16:10` con `bodega-tierras-altas-cover.jpg` (`1600 × 1000`), `rounded-[8px]`, `border border-hairline`, `overflow-hidden`, hover `scale-[1.015]` en `300ms` y badge flotante `"Ver pantalla completa ↗"` que dispara el **Lightbox `z-[100]`** con `bodega-tierras-altas-fullpage.jpg` (`1440 × 5829`) para recorrer la landing completa con scroll interno.
    * **Columna de Contenido (`lg:col-span-5`):** Layout vertical `flex flex-col gap-5`.

### Regla de Escalabilidad Futura (Grilla 2 Columnas)
* Cuando `portfolioCases.length >= 2` en `src/data/cv-data.ts`, el contenedor cambia automáticamente a `grid-cols-1 md:grid-cols-2 gap-8` conservando la misma tarjeta vertical (`imagen 16:10 arriba + ficha, tags y acciones abajo`).

---

## 2. Especificación del Caso Activo

### Caso 01: Bodega Tierras Altas — Rediseño Web & Experiencia Digital
* **Etiqueta Superior (*Overline*):** `CASO DE ESTUDIO · UX/UI & DIRECCIÓN DE ARTE` (Monoespaciada `11px`, color `var(--color-muted)`).
* **Título:** `Bodega Tierras Altas — Rediseño Web & Experiencia Digital` (`clamp(22px, 2.6vw, 28px)`, peso `600`, interlineado `1.2`).
* **Descripción Editorial (3–4 líneas):**
  > *"Rediseño integral de la experiencia digital para una bodega mendocina de enoturismo y alta gama. Arquitectura enfocada en la reserva de visitas guiadas y almuerzos (Restaurante Juana María), catálogo interactivo de vinos (Insignia 2018), testimonios de visitantes y dirección de arte editorial de alto contraste."*
* **Tags Monoespaciados (`11px`, radio `4px`):**
  * `#Rediseño_Web` · `#Enoturismo` · `#UI_Editorial` · `#Arquitectura_IA` · `#Figma`
* **Acciones (2 botones en fila `flex flex-wrap gap-3`):**
  1. **CTA Primario (Externo):** `Ver caso completo en Behance ↗` → `https://www.behance.net/gallery/258217419/Caso-Rediseno-Web-Experiencia-Digital` (`target="_blank" rel="noopener noreferrer"`).
  2. **CTA Secundario (In-Situ):** `Explorar landing completa ↗` → Abre el **Lightbox** (`pf01-bodega-fullpage`) para inspeccionar las secciones completas sin salir del CV web.

---

## 3. Micro-interacciones de la Tarjeta
* **Hover sobre la imagen / tarjeta:** El borde de la tarjeta transiciona suavemente a `#D1D5DB`, la imagen escala a `1.015` en `300ms` (`cubic-bezier(0.16, 1, 0.3, 1)`), y el badge `"Ver pantalla completa ↗"` refuerza el contraste.
* **Flecha del botón externo:** Se traslada diagonalmente `translate(2px, -2px)` al hacer hover.
