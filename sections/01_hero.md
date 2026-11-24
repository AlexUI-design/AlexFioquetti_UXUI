# Especificación de Sección: 01_hero
> **Ubicación en el sitio**: Primera sección visible tras el header  
> **Propósito**: Declaración editorial de alto impacto con animación Split-Text que establece la identidad del candidato sin ruido visual.

---

## 1. Distribución & Grilla

```
┌────────────────────────────────────────────────────────────────────────┐
│ [Tag superior]: 00 / FILOSOFÍA & ENFOQUE                               │
│                                                                        │
│ TITULAR MONUMENTAL (Líneas con máscara de corte):                      │
│ "Diseño interfaces y ecosistemas digitales con la precisión morfológica│
│ del diseño industrial y el rigor del Design Thinking."                 │
│                                                                        │
│ BAJADA EXPLICATIVA (2 columnas en desktop):                            │
│ [ Columna Izq: 2-3 líneas de bio ]   [ Columna Der: Micro-especialidades│
│   Flock IT, Squads ágiles,             Atomic Design, Research, UX     │
│   co-creación con PMs.                 Writing, Sistemas Complejos ]   │
│                                                                        │
│ [Divisor Hairline horizontal 1px]                                      │
└────────────────────────────────────────────────────────────────────────┘
```

* **Contenedor:**
  * `max-width: 1280px; margin-inline: auto`
  * `padding-top: clamp(64px, 10vw, 120px)`
  * `padding-bottom: clamp(48px, 8vw, 96px)`
  * `padding-inline: 24px`

---

## 2. Tipografía & Contenidos Específicos

1. **Overline (Etiqueta superior):**
   * Texto: `00 / ENFOQUE PROYECTUAL & PRODUCTO`
   * Tipografía: `12px`, Monoespaciada (`var(--font-mono)`), color `var(--color-muted)`, `letter-spacing: 0.05em`.
   * Margen inferior: `24px`.

2. **Titular Monumental (Split-Text Animation):**
   * Texto:
     > *"Diseño interfaces y ecosistemas digitales con la precisión morfológica del diseño industrial y el rigor del Design Thinking."*
   * Tipografía: `clamp(36px, 5.5vw, 64px)`, interlineado `1.08`, peso `500` (Medium), `tracking: -0.03em`. Color `var(--color-ink)`.
   * Estructura HTML: Cada línea envuelta en un contenedor `.line-mask` con `overflow: hidden`. El texto interno sube de `translateY(110%)` a `translateY(0%)` con retardo escalonado de 0.08s entre líneas.

3. **Bajada Editorial (Distribución a 2 Columnas en Desktop):**
   * Margen superior: `48px`.
   * **Columna Izquierda (Bio de impacto):**
     * Tamaño `18px`, interlineado `1.6`, color `#555555`.
     * *"Diseñador UX/UI graduado en Diseño Industrial por la UNCuyo. Lidero el diseño de punta a punta en squads ágiles: desde la investigación con usuarios y discovery con clientes hasta la arquitectura de sistemas de diseño escalables."*
   * **Columna Derecha (Chips de especialidades y datos clave):**
     * Grid de 2x2 o lista de pills:
       * `● Atomic Design & Design Systems en Figma`
       * `● Ecosistemas multiproducto y consolas ABM`
       * `● UX Research & UX Writing conversacional`
       * `● Metodologías ágiles Scrum en Core Pods`
     * Tipografía: `13px`, fondo `var(--color-mist)`, borde `1px solid var(--color-hairline)`, radio `6px`, padding `8px 14px`.

---

## 3. Comportamiento Responsive
* **Desktop (`>= 1024px`):** Titular en tamaño máximo (56px-64px) a ancho completo; bajada dividida 60% / 40% entre texto descriptivo y badges de especialidad.
* **Mobile (`< 768px`):** Titular escala fluidamente a ~36px; las dos columnas de la bajada se apilan verticalmente con un espaciado de `24px`.
