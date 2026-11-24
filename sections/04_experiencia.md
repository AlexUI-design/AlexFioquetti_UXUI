# Especificación de Sección: 04_experiencia
> **Ubicación en el sitio**: Posterior a Portfolio  
> **Propósito**: Cronología laboral estructurada como tabla editorial de lectura limpia, con líneas divisorias de 1px (*hairlines*) y micro-interacciones de hover que iluminan la fila.

---

## 1. Distribución & Grilla

```
┌────────────────────────────────────────────────────────────────────────┐
│ 03 / TRAYECTORIA PROFESIONAL                                           │
│ "Experiencia en squads ágiles, consultoría independiente y operaciones" │
│                                                                        │
│ [Línea Hairline 1px #E5E7EB]                                           │
│  2023 — Actualidad  ·  Flock IT                                       │
│  Diseñador UX/UI · UX Researcher · UX Writer (Remoto)                  │
│  [Tags: Core Pods, Atomic Design, Scrum, Discovery Clientes]           │
│ [Línea Hairline 1px #E5E7EB]                                           │
│  2016 — 2023        ·  Profesional Independiente                      │
│  Diseñador Industrial & Gráfico                                        │
│  [Tags: Modelado 3D, Mobiliario a Medida, Branding, Identidad Visual]  │
│ [Línea Hairline 1px #E5E7EB]                                           │
│  2013 — 2024 (11a)  ·  Casino Arena Maipú                             │
│  Operaciones de Salón, Manejo de Caja & Fidelización VIP               │
│  [Tags: Comprensión Cara a Cara, Templanza bajo Presión, Arqueo Caudales]│
│ [Línea Hairline 1px #E5E7EB]                                           │
└────────────────────────────────────────────────────────────────────────┘
```

* **Contenedor:**
  * `max-width: 1280px; margin-inline: auto`
  * `padding-inline: 24px`
  * `margin-top: 80px; margin-bottom: 96px`

---

## 2. Especificación de Fila de Experiencia (*Timeline Row*)

Cada fila adopta un layout horizontal en desktop y se apila en móvil:

### Fila 1: Flock IT (Contractor — Remoto)
* **Periodo:** `2023 — Actualidad` (monoespaciado `13px`, ancho fijo en desktop `160px`).
* **Empresa & Rol:**
  * Empresa: **Flock IT** (*Laboratorio de innovación tecnológica*).
  * Cargo: **Diseñador UX/UI · UX Researcher · UX Writer**.
* **Descripción Sintética (2 líneas):**
  * Diseñador a cargo en squads multidisciplinarios (*Core Pods* de 5 integrantes: Frontend, Backend, UX/UI, QA y PM).
  * Liderazgo de diseño en estrecha co-creación con Product Management, estimación en Jira y facilitación de discovery directo con clientes.
* **Pills de Competencias:**
  * `Atomic Design` · `Scrum Dailies` · `Discovery Clientes` · `Consolas ABM`

### Fila 2: Profesional Independiente / Freelance
* **Periodo:** `2016 — 2023`
* **Empresa & Rol:**
  * Empresa: **Consultoría Independiente**.
  * Cargo: **Diseñador Industrial & Comunicación Visual**.
* **Descripción Sintética:**
  * Desarrollo de productos físicos, mobiliario custom a medida (escritorios, librerías), modelado CAD paramétrico tridimensional y desarrollo de identidad visual (logotipos, manuales y piezas gráficas) para clientes particulares e instituciones.
* **Pills de Competencias:**
  * `Modelado 3D` · `SolidWorks` · `Ergonomía` · `Branding` · `Illustrator`

### Fila 3: Casino Arena Maipú
* **Periodo:** `2013 — 2024 (11 años)`
* **Empresa & Rol:**
  * Empresa: **Casino Arena Maipú** (*Complejo Hotelero y de Entretenimiento*).
  * Cargo: **Operaciones de Salón · Manejo de Caja & Fidelización VIP**.
* **Descripción Sintética (El origen empírico de la empatía con usuarios):**
  * Más de una década interactuando diariamente cara a cara con miles de perfiles en escenarios de alta carga emocional y ritmo acelerado.
  * Gestión de caja de alta velocidad con exactitud matemática y custodia de caudales; resolución asertiva de controversias y desescalamiento en el punto de contacto.
* **Pills de Competencias:**
  * `Empatía Cara a Cara` · `Templanza bajo Presión` · `Resolución de Conflictos` · `Cero Error en Caja`

---

## 3. Micro-interacción de Fila
* **Hover de Fila:**
  * La fila completa cambia de fondo a `rgba(0, 0, 0, 0.02)` o `#FAFAFA` con transición de 200ms.
  * El texto del rol adquiere un ligero desplazamiento horizontal de `4px` hacia la derecha (`transform: translateX(4px); transition: transform 0.2s ease`).
