# Especificación Maestra de Proyecto: CV Web Minimalista & Editorial
> **Candidato**: Alex Gabriel Fioquetti — Diseñador Industrial · Diseñador UX/UI  
> **Estilo Referencia**: Jordan Gilroy ([jordangilroy.com](https://www.jordangilroy.com/))  
> **Estructura**: One-Page interactivo con animaciones scroll-driven y apilado de tarjetas (*Sticky Card Stacking*)

---

## 1. Visión y Filosofía Proyectual

Este proyecto consiste en el diseño y desarrollo del sitio web personal y portafolio interactivo de Alex Fioquetti.
La web responde a una estética **minimalista editorial**, con fondos planos (color sólido sin gradientes ruidosos), una tipografía nítida y jerárquica con alto contraste, y un sistema de **micro-animaciones vinculadas al scroll** que dotan al sitio de peso, elegancia y dinamismo.

### Pilares Fundamentales:
1. **Rigor Proyectual (Herencia del Diseño Industrial):** Cada espacio, tipografía y línea divisoria responde a una función lógica. Cero adornos superfluos o elementos decorativos que entorpezcan la legibilidad.
2. **Scroll Continuo e Inmersivo:** Formato *One-Page* estricto donde el scroll vertical actúa como hilo conductor del relato profesional.
3. **Mecánica Sticky Card Stacking:** Los proyectos profesionales en producción se apilan sucesivamente como un mazo de cartas al descender en la página, permitiendo desplegar su caso de estudio *in-situ* sin cambiar de URL ni usar ventanas modales invasivas.
4. **Separación Estratégica:**
   - **Proyectos:** Obras en producción real en squads ágiles corporativos (Flock IT).
   - **Portfolio:** Casos de estudio integrales de UX/UI, UX Writing y diseño tridimensional con evidencia de proceso metodológico (Coderhouse & UNCuyo).

---

## 2. Stack Tecnológico Oficial

| Capa | Tecnología | Justificación Técnica |
| :--- | :--- | :--- |
| **Framework** | **Next.js 15+ (App Router)** / **React 19** | Server Components para carga instantánea, SEO óptimo y arquitectura de componentes limpia. |
| **Lenguaje** | **TypeScript** | Tipado estricto para garantizar consistencia en datos de proyectos y propiedades de diseño. |
| **Estilos** | **Tailwind CSS v4** | Configuración basada en variables CSS nativas (`@theme`), velocidad y cero CSS redundante. |
| **Smooth Scroll** | **Lenis** (`lenis.darkroom.engineering`) | Inercia de scroll pesada y elegante idéntica a Jordan Gilroy, preservando la accesibilidad y el teclado. |
| **Animaciones & Motion** | **Framer Motion (Motion)** | Control de *scroll-linked transforms*, máscaras de texto (*split-text*), estados de hover y acordeones in-situ. |
| **Primitivas UI** | **Radix UI** / **Lucide Icons** | Primitivas de accesibilidad (WAI-ARIA) e iconografía minimalista de trazo fino (1.5px). |

---

## 3. Arquitectura de Secciones (Estructura One-Page)

El sitio se compone de una secuencia de 7 bloques continuos sobre lienzo de papel mineral cálido (`#F3F4EF`, contenedor `max-w-[1520px]`):

1. **`00_header_navbar`**: Barra superior minimalista edge-to-edge con nombre y cargo, coordenadas de Mendoza con reloj tabular (`MENDOZA, AR / 32°53'S 68°51'W · HORA`), anclas monoespaciadas (`[ 01 TRABAJO ]`..`[ 04 CONTACTO ]`), punto esmeralda pulsante (`DISPONIBLE PARA PROYECTOS`) sin pastilla invasiva, botón hairline de CV y contacto directo.
2. **`01_hero`**: Puesta en escena a pantalla completa (`min-h-[90vh] sm:min-h-screen`) con marca de agua tipográfica `AF` con parallax suave, declaración editorial monumental en Serif (*Cormorant Garamond*) revelada mediante máscara (*split-text*), bio concisa e índice rápido de proyectos.
3. **`02_proyectos_sticky`**: Bloque central de alto impacto. 3 proyectos de gran envergadura (Flock IT: Advanta, Syngenta, Scalter) sobre tarjetas tonales `#EBECE5` con borde hairline de 1px, portadas cinematográficas (`~66vh`), física de apilamiento (`scale 1 → 0.96`, `opacity 1 → 0.45`), *scroll-scrub parallax* y tabs con indicador inferior ultrafino.
4. **`03_portfolio`**: Showcase editorial abierto directamente sobre el lienzo (sin tarjeta contenedora) en grilla asimétrica 60/40 (*Bodega Tierras Altas — Rediseño Web & Experiencia Digital Vitivinícola*), con Lightbox full-page y enlace directo a Behance.
5. **`04_experiencia`**: Línea de tiempo profesional en tabla editorial de 3 columnas (*editorial ledger*) con divisiones hairline de 1px y micro-interacción tonal al hover.
6. **`05_educacion_stack`**: Bloque abierto con divisiones hairline de 1px que sintetiza la doble titulación (UNCuyo y Coderhouse) y el inventario técnico de herramientas en grilla limpia de 4 columnas.
7. **`06_footer`**: Colofón monumental en Editorial Serif (*"Construyamos algo con sentido."*), enlace de correo con subrayado expansivo de 1.5px, enlaces monoespaciados (`[ WHATSAPP ↗ ]`, `[ LINKEDIN ↗ ]`, `[ BEHANCE ↗ ]`, `[ LINKTREE ↗ ]`) y créditos disciplinares.

---

## 4. Directorio de Documentación del Proyecto

```
./
├── PROJECT_OVERVIEW.md                   # Este documento maestro
├── sections/
│   ├── 00_header_navbar.md              # Layout y especificaciones del Header
│   ├── 01_hero.md                       # Layout y especificaciones del Hero
│   ├── 02_proyectos_sticky.md           # Mecánica y layout de Sticky Card Stacking
│   ├── 03_portfolio.md                  # Layout de la grilla de Portfolio / Casos
│   ├── 04_experiencia.md                # Layout de la tabla de Experiencia laboral
│   ├── 05_educacion_stack.md            # Layout de Formación y Habilidades
│   └── 06_footer.md                     # Layout del Footer y llamadas de contacto
├── elements/
│   ├── 01_tokens_colors.md              # Paleta cromática, roles y variables
│   ├── 02_tokens_typography.md          # Escala tipográfica, pesos y fuentes
│   ├── 03_tokens_spacing_grid.md        # Grilla de 12 columnas, padding y z-index
│   ├── 04_components_buttons_pills.md   # Botones, badges de status y tags
│   ├── 05_components_cards.md           # Tarjetas sticky, cards de portfolio y filas
│   └── 06_motion_rules.md               # Parámetros Lenis, curvas Bézier y split-text
└── skills/
    └── cv-builder-agent/
        └── SKILL.md                     # Manual operativo de desarrollo para el agente IA
```

---

## 5. Reglas de Inmutabilidad del Proyecto

1. **Sin Redirecciones Externas Invasivas**: La navegación de proyectos y experiencia ocurre en la misma página para preservar la inmersión.
2. **Respeto a la Identidad Factual**: Los cargos se expresan con rigurosa exactitud documental (*Diseñador Industrial · Diseñador UX/UI*), sin títulos inflados.
3. **Escala de Grises Dominante**: El color se reserva para el estado de disponibilidad (verde esmeralda), acentos interactivos mínimos y las imágenes reales de los proyectos.
