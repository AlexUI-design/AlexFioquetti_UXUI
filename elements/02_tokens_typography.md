# Tokens de Diseño: 02_tokens_typography
> **Filosofía**: Jerarquía tipográfica de alto contraste basada en la **Tríada Tipográfica Editorial**: Serif monumental para titulares y colofón, Monospace técnico para índices, coordenadas y metadatos, y Grotesque Sans neutral para lectura de cuerpos (fórmula Jordan Gilroy).

---

## 1. Familias Tipográficas Oficiales

1. **Editorial Serif (`--font-serif`):**
   * Familia: **Cormorant Garamond** (pesos `400, 500, 600, 700`, estilos `normal, italic`).
   * Uso: Titular monumental del Hero, títulos de sección, títulos de tarjetas de proyectos, caso Bodega Tierras Altas, cargos en experiencia, instituciones y colofón del Footer.
2. **Technical Monospace (`--font-mono`):**
   * Familia: **IBM Plex Mono** (pesos `400, 500, 600`).
   * Uso: Índices de sección (`01 / ...`), anclas del Header (`[ 01 TRABAJO ]`), coordenadas y reloj tabular (`tabular-nums`), períodos, tags inline, pestañas de producto y botones técnicos.
3. **Grotesque Sans (`--font-sans`):**
   * Familia: **Geist Sans**.
   * Uso: Bio del Hero, resúmenes ejecutivos, descripciones de casos de estudio, listas de aportes e ítems de stack.

---

## 2. Escala Tipográfica (Fluid Type Scale)

| Nivel | Tamaño (Desktop / Mobile) | Familia / Peso | Interlineado | Tracking (Letter-spacing) | Rol de Uso |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display / Hero** | `clamp(44px, 7vw, 92px)` | Serif · 400 | `1.02` | `-0.03em` | Titular monumental del Hero con máscara de corte. |
| **Footer Monumental** | `clamp(40px, 7vw, 84px)` | Serif · 400 | `1.04` | `-0.025em` | Titular de cierre (*"Construyamos algo con sentido."*). |
| **Section / Card Title** | `clamp(28px, 4.5vw, 52px)` | Serif · 400 | `1.08` | `-0.02em` | Títulos de sección y proyectos sticky. |
| **Portfolio Title** | `clamp(32px, 4vw, 48px)` | Serif · 400 | `1.08` | `-0.02em` | Título protagonista de Bodega Tierras Altas. |
| **Body Large** | `17px` | Sans · 400 | `1.62` | `0` | Bio del Hero. |
| **Body Regular** | `15px - 16px` | Sans · 400 | `1.6` | `0` | Párrafos de casos de estudio y experiencia. |
| **Mono Label** | `11px - 12px` | Mono · 400/500 | `1.3` | `+0.05em` | Índices, tags separados por `·`, coordenadas y tabs. |

---

## 3. Implementación CSS / Tailwind v4

```css
@theme inline {
  --font-serif: var(--font-serif), "Cormorant Garamond", Georgia, serif;
  --font-mono: var(--font-mono), "IBM Plex Mono", monospace;
  --font-sans: var(--font-sans), "Geist", -apple-system, sans-serif;
}

/* Reglas de corte para Split-Text */
.line-mask {
  overflow: hidden;
  display: block;
}

.line-mask > span {
  display: inline-block;
  will-change: transform;
}
```
