# Especificación de Sección: 00_header_navbar
> **Ubicación en el sitio**: Posición superior fija (`sticky top-0`)  
> **Comportamiento**: Transparente inicialmente; adquiere desenfoque sutil (`backdrop-blur-md`) y borde inferior hairline (`border-b border-neutral-200/60`) al scrollear 20px.

---

## 1. Distribución & Autolayout (Flexbox)

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ [Alex Fioquetti / Diseñador UX/UI]   [Mendoza, ARG · 16:45 UTC-3]   [● Disponible] [CTA] │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

* **Contenedor Principal:**
  * `width: 100%`
  * `max-width: 1440px` (centrado con `margin-inline: auto`)
  * `padding: 16px 24px` (móvil: `14px 16px`)
  * `display: flex; justify-content: space-between; align-items: center`
  * `z-index: 50`

### Elementos Internos:
1. **Lado Izquierdo (Identidad):**
   * Contenedor vertical: `flex-direction: column; gap: 2px`
   * **Nombre:** "Alex Fioquetti", tamaño `14px`, peso `600` (SemiBold), color `var(--color-ink)`.
   * **Subtítulo:** "Diseñador Industrial · UX/UI", tamaño `12px`, peso `400` (Regular), color `var(--color-muted)`.
2. **Centro (Ubicación & Tiempo - Oculto en móvil `< 768px`):**
   * Contenedor horizontal: `display: flex; align-items: center; gap: 8px`
   * Tipografía: `12px`, monoespaciada (`var(--font-mono)`), color `var(--color-muted)`.
   * Texto dinámico: `Mendoza, Argentina (UTC-3) · HH:MM` (hora local actualizada).
3. **Lado Derecho (Disponibilidad & Contacto):**
   * Contenedor horizontal: `display: flex; align-items: center; gap: 12px`
   * **Status Pill:**
     * Fondo: `#ECFDF5` (Emerald-50), borde: `1px solid #A7F3D0` (Emerald-200), radio: `9999px`.
     * Padding: `4px 10px`.
     * Indicador: Círculo verde `#10B981` de `6px` con animación CSS de pulso sutil (*ping* cada 2s).
     * Texto: "Disponible" en `11px`, peso `500`, color `#065F46` (Emerald-800).
   * **Botón Secundario (Descargar CV):**
     * Texto: `"Descargar CV"` + icono sutil de descarga (`13px`), estilo outline pill (`1px solid var(--color-hairline)`, fondo `var(--color-surface)`, texto `var(--color-ink)`, hover `bg-mist`).
     * Conectado a `personalInfo.cvPdfUrl` en `src/data/cv-data.ts`: mientras sea `null`, al hacer clic muestra un feedback discreto inline (`"PDF próximamente"`) sin provocar error 404; al cargar el PDF en `web/public/cv/`, descarga directamente.
   * **Botón Acción (CTA):**
     * Texto: "Hablemos ↗", enlace a correo o WhatsApp.
     * Estilo: Botón pill compacto, texto `12px` peso `500`, fondo `var(--color-ink)`, texto `#FFFFFF`, hover invertido suave (`transition: opacity 0.2s`).

---

## 2. Parámetros de Responsive Breakpoints
* **Desktop (`>= 1024px`):** Se muestran las 3 columnas completas (Nombre + Ubicación + Status/CTA).
* **Tablet (`768px - 1023px`):** Se oculta la hora en tiempo real, se mantiene "Mendoza, ARG" + Status y CTA.
* **Mobile (`< 768px`):** Solo se muestra "Alex Fioquetti" a la izquierda y el pill compacto de contacto a la derecha.

---

## 3. Código de Referencia Tailwind CSS
```html
<header class="sticky top-0 z-50 w-full transition-all duration-200 bg-paper/80 backdrop-blur-md border-b border-hairline/60">
  <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
    <!-- Identidad -->
    <div class="flex flex-col">
      <span class="text-sm font-semibold tracking-tight text-ink">Alex Fioquetti</span>
      <span class="text-xs text-muted">Diseñador Industrial · Diseñador UX/UI</span>
    </div>
    <!-- Horario -->
    <div class="hidden md:flex items-center gap-2 font-mono text-xs text-muted">
      <span>Mendoza, Argentina (UTC-3)</span>
      <span class="opacity-50">/</span>
      <span id="live-clock">19:45</span>
    </div>
    <!-- Status & CTA -->
    <div class="flex items-center gap-3">
      <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-medium">
        <span class="relative flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        Disponible
      </div>
      <a href="mailto:alexgabrielfioquetti@gmail.com" class="hidden sm:inline-flex items-center justify-center px-3.5 py-1.5 text-xs font-medium text-white bg-ink rounded-full hover:opacity-90 transition-opacity">
        Hablemos ↗
      </a>
    </div>
  </div>
</header>
```
