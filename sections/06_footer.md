# Especificación de Sección: 06_footer
> **Ubicación en el sitio**: Cierre de la página  
> **Propósito**: Gran llamado a la acción editorial, canales directos de contacto profesional y créditos con estética Jordan Gilroy.

---

## 1. Distribución & Layout

```
┌────────────────────────────────────────────────────────────────────────┐
│ 05 / CONTACTO & CONEXIÓN DIRECTA                                       │
│                                                                        │
│ TITULAR MONUMENTAL:                                                    │
│ "Construyamos algo con sentido."                                       │
│                                                                        │
│ [Botón Enorme: alexgabrielfioquetti@gmail.com ↗]                       │
│                                                                        │
│ ENLACES HORIZONTALES (Líneas divisorias):                              │
│ [ WhatsApp ↗ ]   [ LinkedIn ↗ ]   [ Linktree ↗ ]   [ Behance ↗ ]       │
│                                                                        │
│ PIE DE PÁGINA (Micro-metadatos):                                       │
│ © 2025 Alex Gabriel Fioquetti · Mendoza, Argentina · Diseñado con rigor│
└────────────────────────────────────────────────────────────────────────┘
```

* **Contenedor:**
  * `max-width: 1280px; margin-inline: auto`
  * `padding-top: clamp(80px, 12vw, 140px)`
  * `padding-bottom: 48px; padding-inline: 24px`

---

## 2. Elementos & Enlaces Verificados

1. **Titular de Contacto:**
   * *"Construyamos algo con sentido."*
   * Tipografía: `clamp(32px, 5vw, 56px)`, peso `500`, interlineado compacto. Color `var(--color-ink)`.
2. **Botón Principal de Correo:**
   * Enlace: `mailto:alexgabrielfioquetti@gmail.com`
   * Texto visible: `alexgabrielfioquetti@gmail.com ↗`
   * Tipografía: `18px - 22px`, peso `500`, con subrayado animado al hover (`transition: text-decoration-color 0.2s`).
3. **Barra de Redes y Canales Profesionales:**
   * Contenedor horizontal con `gap: 24px; flex-wrap: wrap; margin-top: 40px; margin-bottom: 64px`.
   * Enlaces directos verificados:
     * **WhatsApp:** `https://wa.me/5492612535082` (formato con código de país).
     * **LinkedIn:** `https://www.linkedin.com/in/alex-fioquetti-ux-ui/`
     * **Linktree / Portfolio Hub:** `https://linktr.ee/Alekei`
     * **Behance:** `https://www.behance.net/`
   * Estilo de enlace: `14px`, peso `500`, color `var(--color-muted)`, que pasa a `var(--color-ink)` con flecha `↗` que se desplaza `translate(2px, -2px)` al hover.
4. **Créditos y Cierre:**
   * Divisor hairline horizontal `1px solid var(--color-hairline)`.
   * Texto: `© 2025 Alex Gabriel Fioquetti · Mendoza, Argentina (UTC-3)`. Tipografía monoespaciada `12px` en color gris tenue.
