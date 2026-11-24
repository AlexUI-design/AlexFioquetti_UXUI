# Tokens de Diseño: 03_tokens_spacing_grid
> **Filosofía**: Sistema de espaciado basado en una unidad raíz de **4px / 8px** que garantiza ritmo vertical uniforme y orden matemático.

---

## 1. Escala de Espaciado (Spacing Scale)

| Token | Valor en px | Uso Principal |
| :--- | :--- | :--- |
| `space-1` | `4px` | Separación mínima entre icono y texto en badges o botones. |
| `space-2` | `8px` | Gap interno en pills de tags y paddings compactos. |
| `space-3` | `12px` | Separación entre elementos adyacentes en navegación. |
| `space-4` | `16px` | Padding interno de tarjetas secundarias y márgenes móviles. |
| `space-6` | `24px` | Padding lateral estándar de contenedor en pantallas grandes. |
| `space-8` | `32px` | Separación entre columnas en la grilla de Portfolio. |
| `space-12`| `48px` | Separación entre bloques de texto en el Hero y tarjetas. |
| `space-16`| `64px` | Padding vertical estándar entre secciones en móvil. |
| `space-24`| `96px` | Padding vertical estándar entre secciones en desktop. |
| `space-32`| `128px`| Espaciado mayor antes del Footer o en el Hero monumental. |

---

## 2. Contenedores y Grilla de 12 Columnas

* **Max Width Contenedor Global:** `1280px` (ancho de lectura y tarjetas) y `1440px` (barra de navegación superior).
* **Márgenes Laterales:** `24px` fijos en desktop; `16px` en móvil.
* **Sistema de Grilla (Grid System):**
  * Desktop (`>= 1024px`): Grilla de 12 columnas con gutters de `32px`.
  * Tablet (`768px - 1023px`): Grilla de 8 columnas con gutters de `24px`.
  * Mobile (`< 768px`): Grilla de 4 columnas con gutters de `16px`.

---

## 3. Escala de Z-Index (Z-Index Hierarchy)

| Nivel | Valor Z | Elemento |
| :--- | :--- | :--- |
| **Base Canvas** | `z-0` | Fondos de página y líneas estructurales. |
| **Content Cards** | `z-10` a `z-30` | Tarjetas de proyectos (incrementa progresivamente en el sticky stack: Card 1 = z-10, Card 2 = z-20, Card 3 = z-30). |
| **Floating Badges** | `z-40` | Píldoras flotantes de cursor o etiquetas sobre imágenes. |
| **Sticky Header** | `z-50` | Barra de navegación superior fija. |
| **Modals / Drawers**| `z-100` | Si se despliega un panel lateral o visor de imágenes en alta resolución. |
