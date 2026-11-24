---
name: cv-builder-agent
description: Manual operativo y protocolo estricto para construir, maquetar, estilizar e iterar sobre el CV Web minimalista de Alex Fioquetti sin romper la arquitectura de diseño definida para el proyecto.
---

# Skill: CV Builder Agent (Alex Fioquetti Web CV)

Esta skill define el protocolo de construcción y modificación que cualquier agente o desarrollador debe seguir para trabajar sobre el CV web minimalista de Alex Fioquetti.

## 1. Directorio Canónico de Referencia

Antes de crear o modificar cualquier componente o archivo de código, el agente **debe consultar las especificaciones exactas** ubicadas en:
* **Especificación Maestra:** `./PROJECT_OVERVIEW.md`
* **Especificaciones de Secciones:** `./sections/`
  - `00_header_navbar.md`: Header fijo, live clock y status pill.
  - `01_hero.md`: Titular monumental con Split-Text y bio.
  - `02_proyectos_sticky.md`: Mecánica de Sticky Card Stacking y proyectos Flock IT.
  - `03_portfolio.md`: Grilla de 2 columnas de casos Coderhouse y UNCuyo.
  - `04_experiencia.md`: Tabla editorial hairline de trayectoria.
  - `05_educacion_stack.md`: Doble titulación y stack técnico.
  - `06_footer.md`: Cierre, llamada a la acción y enlaces.
* **Tokens y Componentes:** `./elements/`
  - `01_tokens_colors.md`: Paleta, variables y roles de color.
  - `02_tokens_typography.md`: Escala tipográfica y fuentes.
  - `03_tokens_spacing_grid.md`: Grilla de 12 columnas y padding.
  - `04_components_buttons_pills.md`: Botones y badges.
  - `05_components_cards.md`: Tarjetas y filas.
  - `06_motion_rules.md`: Configuración de Lenis y curvas de animación.
* **Manifiesto de Imágenes y Capturas:** `./ASSETS_MANIFEST.md` (mapeo exacto de cada archivo de `assets/` a su proyecto, sección y slot en la UI).

---

## 2. Protocolo de Modificación Segura ("Qué Tocar y Qué No Romper")

### Regla 1: Modificaciones de Contenido (Textos, Fechas, Proyectos)
* **Dónde se toca:** Exclusivamente en el archivo de datos tipados del proyecto (ej. `src/data/cv-data.ts`).
* **Qué NO se debe tocar:** No alterar las clases de Tailwind de los contenedores (`max-w-6xl`, `px-6`, `py-20`) ni los valores de z-index de las tarjetas sticky.

### Regla 2: Modificaciones en las Tarjetas Sticky (Sección Proyectos)
* **Dónde se toca:** En el componente de tarjeta individual.
* **Qué NO se debe tocar:**
  - El contenedor padre debe conservar `position: relative` y un espaciado vertical suficiente para permitir el recorrido del scroll.
  - Cada tarjeta debe mantener su valor escalonado de `top` (`top-20`, `top-24`, `top-28`) y z-index creciente (`z-10`, `z-20`, `z-30`), respetando el ajuste dinámico de `ResizeObserver` cuando está expandida.
  - La expansión del acordeón in-situ debe estar controlada por `overflow: hidden` para no provocar desbordamientos horizontales en el scroll.
  - **Imágenes y Galerías:** Consumir exclusivamente los assets curados registrados en `./ASSETS_MANIFEST.md` (nunca leer archivos crudos de `imagenes/`), preservando la estructura de Tabs por producto, los 4 patrones de grilla definidos en `02_proyectos_sticky.md` y el Lightbox descrito en `05_components_cards.md`.

### Regla 3: Modificaciones de Estilo y Color
* **Dónde se toca:** En las variables CSS del archivo global (`globals.css` bajo `@theme`).
* **Qué NO se debe tocar:**
  - No usar clases de color arbitrarias como `bg-blue-500` o gradientes morados/rosas.
  - Mantener la paleta monocromática estricta (`--color-paper`, `--color-ink`, `--color-hairline`). El único color cromático permitido en la UI es el verde esmeralda del estado de disponibilidad (`#10B981`).

### Regla 4: Modificaciones de Animación (Motion & Scroll)
* **Dónde se toca:** En las constantes de animación de Framer Motion (`src/lib/motion.ts`).
* **Qué NO se debe tocar:**
  - La curva de aceleración estándar debe ser siempre `cubic-bezier(0.16, 1, 0.3, 1)`.
  - La duración de entrada de textos debe permanecer entre `0.5s` y `0.7s`.
  - No añadir animaciones continuas de rebote o giros 3D innecesarios.

---

## 3. Checklist de Verificación Post-Edición

Cada vez que el agente aplique un cambio, debe verificar:
1. `[ ]` ¿Se mantiene la fluidez del scroll con Lenis sin tirones o saltos?
2. `[ ]` ¿Las tarjetas de Proyectos siguen apilándose correctamente sin solaparse de forma errática?
3. `[ ]` ¿La grilla de Portfolio responde adecuadamente a 1 columna en móvil y 2 en desktop?
4. `[ ]` ¿Los textos respetan la verdad factual del perfil (Diseñador Industrial · Diseñador UX/UI)?
5. `[ ]` ¿Todos los enlaces de contacto (WhatsApp, LinkedIn, Email) siguen apuntando a las URLs verificadas de Alex?
