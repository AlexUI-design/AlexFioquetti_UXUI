# Componentes de Diseño: 04_components_buttons_pills
> **Filosofía**: Componentes interactivos sobrios con radios sutiles o cápsula completa (*pill*), con micro-animaciones en hover que confirman la interacción sin distraer.

---

## 1. Botones (Buttons)

### A. Botón Primario (Primary Pill)
* **Uso:** CTA principal ("Hablemos ↗", "Descargar CV").
* **Estructura Visual:**
  * Fondo: `var(--color-ink)` (`#171717`).
  * Texto: `#FFFFFF`, tamaño `13px`, peso `500` (Medium).
  * Borde: Ninguno.
  * Radio de esquina: `9999px` (Pill completa).
  * Padding: `8px 18px`.
* **Hover State:** Opacidad pasa a `0.9` y ligera escala a `1.02` con transición de `150ms ease`.

### B. Botón Secundario / Outline
* **Uso:** "Explorar caso de estudio ▾", enlaces de proyectos.
* **Estructura Visual:**
  * Fondo: `transparent` o `var(--color-surface)`.
  * Texto: `var(--color-ink)`, tamaño `13px`, peso `500`.
  * Borde: `1px solid var(--color-hairline)` (`#E5E7EB`).
  * Radio de esquina: `6px` o `9999px`.
  * Padding: `8px 16px`.
* **Hover State:** Fondo pasa a `var(--color-mist)` (`#F3F4F6`) y el borde a `#D1D5DB`.

---

## 2. Badges de Estado (Status Badges)

### Badge de Disponibilidad ("Available for work")
* **Estructura:**
  * Fondo: `#ECFDF5` (Emerald-50).
  * Borde: `1px solid #A7F3D0` (Emerald-200).
  * Radio: `9999px`.
  * Padding: `4px 10px`.
  * Punto de estado (*Dot*): Círculo verde `#10B981` de `6px` de diámetro con animación `ping` (pulso suave cada 2.5s).
  * Tipografía: `11px`, peso `500`, color `#065F46` (Emerald-800).

---

## 3. Chips de Tecnologías & Metadatos (Tags)

* **Uso:** Etiquetas de herramientas (`Figma`, `Atomic Design`, `Jira`, `UX Writing`).
* **Estructura:**
  * Fondo: `var(--color-mist)` (`#F3F4F6`).
  * Borde: `1px solid rgba(0, 0, 0, 0.05)`.
  * Radio: `4px` (radio angular minimalista).
  * Padding: `4px 8px`.
  * Tipografía: Monoespaciada (`var(--font-mono)`), `11px`, color `var(--color-muted)`.
