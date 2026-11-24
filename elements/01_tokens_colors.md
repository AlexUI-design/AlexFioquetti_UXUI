# Tokens de Diseño: 01_tokens_colors
> **Filosofía**: Paleta editorial monocromática cálida de papel mineral, inspirada en Jordan Gilroy y diseño suizo contemporáneo. Se eliminan los fondos blancos puros (`#FFFFFF`) y las sombras difusas; el contraste se construye mediante sustratos tonales cálidos y líneas hairline de 1px. El color funcional se reserva estrictamente para el punto de disponibilidad (`#10B981`) y las capturas reales de los proyectos.

---

## 1. Tabla Maestra de Colores y Roles

| Nombre de Token | Variable CSS | Hex / Valor | Rol en la Interfaz |
| :--- | :--- | :--- | :--- |
| **Warm Paper Canvas** | `--color-paper` | `#F3F4EF` | Lienzo continuo base de la página (papel mineral cálido). |
| **Card Stage** | `--color-card-stage` | `#EBECE5` | Superficie tonal para tarjetas sticky y contenedores de vitrina. |
| **Ink Charcoal** | `--color-ink` | `#171715` | Titulares principales, textos de alto impacto, líneas activas y botones sólidos. |
| **Body Charcoal** | `--color-body` | `#3A3B36` | Texto de lectura de párrafos y descripciones. |
| **Muted Mineral** | `--color-muted` | `#84857E` | Metadatos, etiquetas secundarias, fechas, coordenadas y números monoespaciados. |
| **Hairline Border** | `--color-hairline` | `#D8D9D0` | Líneas divisorias de 1px y bordes estructurales sin sombra. |
| **Ghost Watermark** | `--color-ghost` | `#E5E6DF` | Monograma tipográfico `AF` en fondo del Hero y detalles fantasma. |
| **Emerald Status** | `--color-status-green` | `#10B981` | Punto pulsante de disponibilidad inmediata (*Available for work*). |

---

## 2. Definición en CSS / Tailwind v4

```css
@theme inline {
  --color-paper: #f3f4ef;
  --color-card-stage: #ebece5;
  --color-ink: #171715;
  --color-body: #3a3b36;
  --color-muted: #84857e;
  --color-hairline: #d8d9d0;
  --color-ghost: #e5e6df;
  --color-status-green: #10b981;
}
```

---

## 3. Reglas de Uso para el Agente (Do's & Don'ts)

* ✅ **HACER:** Usar `var(--color-paper)` como lienzo continuo global y `var(--color-card-stage)` únicamente para las láminas sticky y fondos de visor.
* ✅ **HACER:** Mantener todos los divisores y bordes en `1px solid var(--color-hairline)`.
* ❌ **NO HACER:** Usar fondos blancos `#FFFFFF`, grises fríos (`bg-gray-100`) ni valores hexadecimales en línea dentro de los componentes.
* ❌ **NO HACER:** Usar sombras flotantes tipo SaaS (`box-shadow`). La profundidad se logra mediante contraste tonal, líneas de 1px y física de apilamiento (`scale` + `opacity`).
