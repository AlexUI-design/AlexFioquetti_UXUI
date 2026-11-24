# Especificación de Sección: 02_proyectos_sticky
> **Ubicación en el sitio**: Sección central principal (inmediatamente después del Hero)  
> **Propósito**: Presentación de los 3 macro-proyectos en producción real en Flock IT mediante la mecánica de tarjetas apilables fijas (*Sticky Card Stacking*).

---

## 1. La Mecánica de Sticky Card Stacking (Cómo Funciona el Scroll)

Cada proyecto vive en un contenedor alto. A medida que el usuario hace scroll hacia abajo:
1. La **Tarjeta 01** sube y se ancla (*sticky*) en la parte superior con un offset base de `top: 80px`.
2. Al continuar scrolleando, la **Tarjeta 02** sube desde abajo (`top: 96px`) y se superpone sobre la Tarjeta 01 con un ligero efecto de sombra y escala progresiva (`scale: 0.97` en la tarjeta que queda debajo).
3. La **Tarjeta 03** (`top: 112px`) repite el proceso, cubriendo a la Tarjeta 02.
4. Una vez superada la Tarjeta 03, el scroll se libera de forma natural hacia la siguiente sección (*Portfolio*).

### Salvaguarda de Altura Dinámica (`ResizeObserver`)
Cuando el usuario abre el acordeón *in-situ* de una tarjeta y su altura total supera la del viewport (por ejemplo en pantallas de 13"/14"), el componente mide la altura real de la tarjeta mediante `ResizeObserver` y calcula dinámicamente:
```ts
top = Math.min(baseTop, window.innerHeight - cardHeight - 24)
```
De este modo, la tarjeta sigue permitiendo desplazarse suavemente hasta su última línea antes de que la tarjeta siguiente se apile encima.

```
┌──────────────────────────────────────────────────────────────────┐
│ STACK CONTAINER                                                  │
│                                                                  │
│ [ Tarjeta 01: Advanta — Macro-Ecosistema ]       (Sticky top: 80px)
│   ┌────────────────────────────────────────────────────────────┐ │
│   │ 01 / FLOCK IT · ADVANTA · 1 AÑO (FASE MVP 2) · CORE POD    │ │
│   │ Ecosistema Digital Multiproducto (Club · Biblioteca · Bot) │ │
│   │ [ Portada 16:10 — Club Advanta Loyalty Hero (object-top) ] │ │
│   │ [ Botón: "Explorar caso de estudio ▾" ]                    │ │
│   │ [ Acordeón in-situ: Texto + Tabs (3 productos) + Lightbox ]│ │
│   └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│ [ Tarjeta 02: Syngenta — Informe Agropecuario Web/Mobile ] (Sube encima)
│                                                                  │
│ [ Tarjeta 03: Scalter — Portal B2B Web & Bot WhatsApp ] (Sube encima)
└──────────────────────────────────────────────────────────────────┘
```

---

## 2. Estructura de Cada Tarjeta de Proyecto

Cada tarjeta es una superficie sólida blanca (`#FFFFFF`) sobre el lienzo `#F9F9FB`, con borde hairline `1px solid #E5E7EB` y radio de `12px`.

### Componentes Internos (Estado Colapsado):
1. **Header de la Tarjeta:**
   * **Tag Numerado:** `01 / FLOCK IT` (Tipografía monoespaciada `12px`, color `var(--color-muted)`).
   * **Metadatos:** `Duración: 1 año (Fase MVP 2) · Squad: 5 personas (Core Pod)`.
2. **Título del Proyecto:**
   * Tipografía: `clamp(24px, 3vw, 34px)`, peso `600` (SemiBold), interlineado compacto (`1.2`).
3. **Portada Visual Principal (Contenedor `16:10`):**
   * Ancho `100%` del interior de la tarjeta (`max-w-[1088px]`), proporción `aspect-[16/10]`, `max-h-[440px]`.
   * Superficie placeholder neutra `var(--color-mist)` (`#F3F4F6`), borde `1px solid var(--color-hairline)`, radio `8px`, `overflow: hidden`.
   * Encuadre `object-cover object-top` para que las capturas full-page muestren limpio el *above the fold*.
   * Al pasar el ratón (*hover*): Micro-zoom a `scale: 1.015` en `300ms`.
4. **Resumen Ejecutivo (2 líneas):**
   * Explicación breve del valor del proyecto para negocio y usuarios.
5. **Botón Interactivo In-Situ ("Explorar caso de estudio ▾"):**
   * Al hacer clic, **despliega el acordeón hacia abajo dentro de la misma tarjeta** mediante animación fluida de Framer Motion (`height: 0 <-> auto`, duración `0.4s`, curva `[0.16, 1, 0.3, 1]`).
   * **Bloque Narrativo Revelado In-Situ:**
     * **El Desafío** · **Aportes y Rol de Alex** · **Impacto y Métricas** · **Stack de Diseño** (chips `Figma`, `Atomic Design`, `Jira`, `User Flows`, `UX Writing`).
   * **Bloque de Galería Visual In-Situ (cuando el proyecto cuenta con capturas):**
     * Selector segmentado por **Tabs** de producto/módulo + grillas de capturas con **Lightbox** para inspección en pantalla completa.

---

## 3. Arquitectura Visual, Tamaños y Distribución de Imágenes (Galería In-Situ)

Para mantener una lectura ordenada y evitar que las capturas extensas rompan el ritmo del scroll, todas las pantallas dentro de la vista expandida siguen **5 patrones normalizados**:

### A. Reglas de Portada (Tarjeta Colapsada)
* **Tarjeta 01 (Advanta):** Usa `club-advanta-loyalty-desktop.png` (ID `p01-club-loyalty-desktop`), enfocando el hero *"Sembrá Advanta, Cosechá Beneficios"* mediante `object-cover object-top` en el contenedor `16:10` (`max-h-[440px]`).
* **Tarjeta 02 (Syngenta):** Usa `syngenta-web-informe-malezas.png` (ID `p02-syngenta-web-malezas`), mostrando el mapa satelital zonificado con puntos `1, 2, 3`, KPIs circulares y tarjetas de malezas y plagas en el contenedor `16:10` (`max-h-[440px]`, `object-cover object-top`).
* **Tarjeta 03 (Scalter):** Usa `scalter-web-panel-pedidos.png` (ID `p03-scalter-web-panel`), mostrando la interfaz de *Gestión de Pedidos* B2B en el contenedor `16:10` (`max-h-[440px]`, `object-cover object-top`).

### B. Sistema de Tabs por Producto o Plataforma
Dentro del acordeón expandido, las galerías multi-módulo se organizan en pestañas segmentadas:
* **Tarjeta 01 (Advanta — 3 Tabs):** `Club Advanta` · `Biblioteca Advanta` · `BO del Bot`
* **Tarjeta 02 (Syngenta — 2 Tabs):** `Plataforma Web` · `Experiencia Mobile`
* **Tarjeta 03 (Scalter — 2 Tabs):** `Portal Web B2B` · `Bot WhatsApp & Mobile`

### C. Los 5 Patrones Normalizados de Contenedor Visual

| Patrón | Distribución CSS / Grid | Ratio y Altura | Uso |
| :--- | :--- | :--- | :--- |
| **Patrón A — Hero de Tab** | Ancho completo `w-full` (`max-w-[1088px]`) | `aspect-[16/10]`, `rounded-[8px]`, `border border-hairline` | Pantalla protagonista que abre cada tab + pie de foto monoespaciado de 1 línea. |
| **Patrón B — Par Comparativo (2 Cols)** | `grid-cols-1 md:grid-cols-2 gap-4` | Cada celda `aspect-[16/10]`, `object-cover object-top` | Pares de pantallas relacionadas (ej. tabla + modal de preview, o explorador + filtros). |
| **Patrón C — Showcase Responsive (Desktop + Mobile)** | `grid-cols-1 md:grid-cols-12 gap-4` (`md:col-span-9` Desktop + `md:col-span-3` Mobile) | Desktop `aspect-[16/10]` · Mobile centrado `max-w-[220px] aspect-[9/19.5] rounded-[16px] overflow-hidden object-cover object-top` | Mostrar la adaptación responsiva real entre versión escritorio y teléfono (con frame mobile recortado al ancho base `393px`). |
| **Patrón D — Pantalla Full-Page Larga (`> 2000 px`)** | Encuadre dentro de Patrón A, B o C | `object-cover object-top` + badge flotante `"Ver pantalla completa ↗"` (`bg-surface/90 backdrop-blur-sm`) | Permite mantener compacta la tarjeta sticky y abrir la captura completa con scroll vertical interno al hacer clic (Lightbox `z-100`). |
| **Patrón E — Tira de 4 Marcos Mobile** | `grid-cols-2 lg:grid-cols-4 gap-4` | Cada marco `aspect-[9/19.5] rounded-[16px] border border-hairline overflow-hidden` | Mostrar secuencias de pantallas mobile nativas (`786×1704`) lado a lado con pie de foto monoespaciado y clic a Lightbox. |

### D. Mapa Exacto de Slots Visuales — Tarjeta 01 (Advanta)

> **Criterio de curaduría aplicado:** Se utilizan **14 capturas curadas** alojadas en `assets/proyecto-01-advanta/` (y referenciadas en [`ASSETS_MANIFEST.md`](../ASSETS_MANIFEST.md)). Se excluyen expresamente las 2 pantallas de Biblioteca con texto *Lorem ipsum*, los flujos de login duplicados en BO del Bot y modales redundantes de descarga/eliminación.

#### Tab 1 — Club Advanta (8 capturas)
1. **Fila 1 — Patrón C + D (`Desktop + Mobile`):**
   * Izquierda (`9 cols`): `p01-club-loyalty-desktop` (`club-advanta-loyalty-desktop.png`, `1282×5098`) — Landing Loyalty Web (primer contacto y registro de productores).
   * Derecha (`3 cols`): `p01-club-loyalty-mobile` (`club-advanta-loyalty-mobile.png`, `393×7397`) — Versión Mobile (recortada al ancho base `393px`, Lightbox full-page al clic).
   * *Caption:* `Landing Loyalty Web y Mobile — Primer contacto, categorías y formulario de registro ("Sumate al Club").`
2. **Fila 2 — Patrón A + D (`Ancho completo`):**
   * `p01-club-admin-usuarios` (`club-advanta-admin-usuarios.png`, `2560×2455`) — Consola de Usuarios con KPIs por categoría (`Miembro`, `Socio`, `Silver`, `Black`), tabla de registros y reenvío de emails.
3. **Fila 3 — Patrón B (`2 columnas 50/50`):**
   * Columna 1: `p01-club-admin-beneficios` (`club-advanta-admin-beneficios.png`, `2560×1604`) — Centro de Beneficios ABM (tabla, stock, vigencia y estado).
   * Columna 2: `p01-club-admin-beneficio-preview` (`club-advanta-admin-beneficio-preview.png`, `2560×1926`) — Vista previa interactiva (frente/dorso) al crear campaña.
4. **Fila 4 — Patrón B + D (`2 columnas 50/50`):**
   * Columna 1: `p01-club-perfil-black` (`club-advanta-perfil-black.png`, `2560×2936`) — Portal de autogestión de Productor (categoría Black, progreso de bolsas validadas e historial — Lightbox full-page).
   * Columna 2: `p01-club-comunicaciones-metricas` (`club-advanta-comunicaciones-metricas.png`, `2560×1744`) — Analítica de comunicaciones enviadas por segmento.
5. **Fila 5 — Patrón A compacto o bloque lateral (`16:10`):**
   * `p01-club-login` (`club-advanta-login.png`, `2560×1600`) — Flujo unificado de acceso y recuperación de contraseña (compartido entre perfiles de usuario y administradores del ecosistema).

#### Tab 2 — Biblioteca Advanta (3 capturas, todas `16:10` nativo `2600×1612`)
1. **Fila 1 — Patrón A (`Ancho completo 16:10`):**
   * `p01-biblio-visor-pdf` (`biblioteca-visor-pdf.png`) — Visor integrado de documentos técnicos con etiquetas y acciones de descarga/compartir.
2. **Fila 2 — Patrón B (`2 columnas 50/50`):**
   * Columna 1: `p01-biblio-explorador` (`biblioteca-explorador.png`) — Explorador jerárquico por carpetas (`Semillas / Girasol`), privacidad Público/Privado y búsqueda.
   * Columna 2: `p01-biblio-filtros-roles` (`biblioteca-filtros-roles.png`) — Filtros rápidos por rol (`Distribuidor` / `Productor`) y etiquetas técnicas.

#### Tab 3 — BO del Bot (3 capturas, todas `16:10` nativo)
1. **Fila 1 — Patrón A (`Ancho completo 16:10`):**
   * `p01-bobot-distribuidores` (`bo-bot-distribuidores.png`, `2600×1764`) — Consola ABM de 300 distribuidores con estados (`Activo`/`Baja`), filtros por CUIT/zona y exportación CSV.
2. **Fila 2 — Patrón B (`2 columnas 50/50`):**
   * Columna 1: `p01-bobot-administradores` (`bo-bot-administradores.png`, `2600×1616`) — Gestión de administradores habilitados para operar la plataforma y el bot.
   * Columna 2: `p01-bobot-nuevo-admin` (`bo-bot-nuevo-admin.png`, `2600×1612`) — Modal de alta ABM con reglas de validación en tiempo real.

### E. Mapa Exacto de Slots Visuales — Tarjeta 02 (Syngenta)

> **Criterio de curaduría aplicado:** Se utilizan **7 capturas curadas** alojadas en `assets/proyecto-02-syngenta/` (y referenciadas en [`ASSETS_MANIFEST.md`](../ASSETS_MANIFEST.md)). Se excluyen 6 pantallas repetitivas o de confirmación intermedia para priorizar el recorrido completo: mapa por zonas → registro multimodal (fotos, audios, comentarios) → envío al productor → consulta móvil.

#### Tab 1 — Plataforma Web (3 capturas Desktop `3024 × 1964`)
1. **Fila 1 — Patrón A (`Ancho completo 16:10`):**
   * `p02-syngenta-web-malezas` (`syngenta-web-informe-malezas.png`) — Mapa satelital zonificado con puntos `1, 2, 3`, KPIs circulares (`98% Logro`, `32% CV`), malezas (*Yuyo colorado*) y plagas.
2. **Fila 2 — Patrón B (`2 columnas 50/50`):**
   * Columna 1: `p02-syngenta-web-comentarios-fotos` (`syngenta-web-comentarios-fotos.png`) — Registro de campo con notas de visita, galería de fotos del lote y audios.
   * Columna 2: `p02-syngenta-web-compartir-lotes` (`syngenta-web-compartir-lotes.png`) — Flujo de selección de lotes y visitas completas para compartir el informe al productor.

#### Tab 2 — Experiencia Mobile (4 capturas Mobile `786 × 1704`, Patrón E)
1. **Tira 4 columnas (`grid-cols-2 lg:grid-cols-4 gap-4`, clic a Lightbox):**
   * Frame 1: `p02-syngenta-mobile-mapa-lote` (`syngenta-mobile-mapa-lote.png`) — Mapa satelital del lote y ficha técnica de siembra (`Maíz`, `540 ha`, `7 pl/m²`).
   * Frame 2: `p02-syngenta-mobile-metricas` (`syngenta-mobile-metricas.png`) — Tabla de densidad variable y desuniformidad espacial por ambiente (`CV %`).
   * Frame 3: `p02-syngenta-mobile-fotos` (`syngenta-mobile-fotos.png`) — Galería de fotos registradas en campo filtrable por punto (`Lote A · 1 · 2 · 3`).
   * Frame 4: `p02-syngenta-mobile-audios` (`syngenta-mobile-audios.png`) — Reproductor de notas de voz de relevamiento grabadas por punto.

### F. Mapa Exacto de Slots Visuales — Tarjeta 03 (Scalter)

> **Criterio de curaduría aplicado:** Se utilizan **9 capturas curadas** alojadas en `assets/proyecto-03-scalter/` (y referenciadas en [`ASSETS_MANIFEST.md`](../ASSETS_MANIFEST.md)). Se excluyen 14 pantallas repetitivas o con errores tipográficos evitables, priorizando el recorrido omnicanal completo: validación de CUIT → carga en tabla con alertas de stock → bot de WhatsApp → adaptación mobile. *(Nota: el microcopy `"Cancear"` en los modales de carga/sin stock se conserva tal cual por ahora y puede reemplazarse en el mismo archivo sin tocar código).*

#### Tab 1 — Portal Web B2B (5 capturas Desktop)
1. **Fila 1 — Patrón A (`Ancho completo 16:10`):**
   * `p03-scalter-web-panel` (`scalter-web-panel-pedidos.png`, `2560 × 1600`) — Tabla principal de *Gestión de Pedidos* (`Color`, `Ancho`, `Gramaje`, `Largo`, `Rollos`) y acciones rápidas.
2. **Fila 2 — Patrón B (`2 columnas 50/50`):**
   * Columna 1: `p03-scalter-web-cuit` (`scalter-web-validacion-cuit.png`, `2560 × 1600`) — Portal de Clientes con validación de acceso por CUIT habilitado.
   * Columna 2: `p03-scalter-web-cargar` (`scalter-web-cargar-articulo.png`, `2560 × 1942`) — Modal de alta de artículo con cálculo dinámico del total del pedido.
3. **Fila 3 — Patrón B (`2 columnas 50/50`):**
   * Columna 1: `p03-scalter-web-sin-stock` (`scalter-web-error-sin-stock.png`, `2560 × 1942`) — Alerta clara cuando un producto seleccionado no está disponible en stock.
   * Columna 2: `p03-scalter-web-finalizar` (`scalter-web-finalizar-pedido.png`, `2560 × 1600`) — Confirmación final del pedido con comentario opcional.

#### Tab 2 — Bot WhatsApp & Mobile (4 capturas, Patrón E)
1. **Tira 4 columnas (`grid-cols-2 lg:grid-cols-4 gap-4`, clic a Lightbox):**
   * Frame 1: `p03-scalter-bot-menu` (`scalter-bot-menu-cuit.png`, `780 × 1688`) — Validación de CUIT en WhatsApp y menú interactivo de 4 opciones (*Pedido 1–2*, *Pedido +3*, *Consultar stock*, *Estado de pedido*).
   * Frame 2: `p03-scalter-bot-web-link` (`scalter-bot-derivacion-web.png`, `780 × 1688`) — Derivación omnicanal desde el chat hacia el Asistente Web para pedidos de mayor volumen (+3 artículos).
   * Frame 3: `p03-scalter-bot-estado` (`scalter-bot-estado-pedido.png`, `780 × 1688`) — Seguimiento de orden en tiempo real desde WhatsApp (`#SCA-251 · En producción`).
   * Frame 4: `p03-scalter-mobile-cargar` (`scalter-mobile-cargar-articulo.png`, `750 × 3212`, `Patrón D` Lightbox full-page) — Vista mobile responsive de la tabla y alta de artículos con precios.

---

## 4. Contenido de las 3 Tarjetas Oficiales

### Tarjeta 01: Advanta — Macro-Ecosistema Multiproducto (Flock IT)
* **Número y Cliente:** `01 / FLOCK IT · ADVANTA`
* **Título:** Ecosistema Digital Multiproducto para Fidelización, Gestión Documental y Asistencia
* **Chips de Metadatos:** `Fase MVP 2 (1 Año)` · `Squad 5 Personas (Core Pod)` · `Scrum Diario`
* **Portada:** `club-advanta-loyalty-desktop.png` (`object-cover object-top`).
* **Descripción:** Liderazgo integral de diseño UX/UI de punta a punta en squad ágil para orquestar un ecosistema interconectado para Advanta: Club de Fidelización (web loyalty, autogestión de productores, login unificado y backoffice admin), Biblioteca Documental anti-silos, Chatbot conversacional y su Consola Backoffice (BO del Bot).
* **Detalle In-Situ:**
  * *Gobernanza de Atomic Design:* Creación y documentación de un sistema atómico compartido en Figma entre los productos del ecosistema para asegurar coherencia visual (modo oscuro en Club Advanta y entorno limpio de alta densidad en Biblioteca/BO) y acelerar el handoff a ingeniería.
  * *UX Writing & Arquitectura de Roles:* Diseño de flujos conversacionales para el chatbot, matrices de permisos por rol (`Admin`, `Distribuidor`, `Productor`) y redacción estratégica de microcopy en tablas, modales y validaciones.
  * *Galería Visual:* 3 Tabs (`Club Advanta` · `Biblioteca Advanta` · `BO del Bot`) con las 14 capturas verificadas y Lightbox de inspección completa.

### Tarjeta 02: Syngenta — Informe Interactivo Agropecuario Web & Mobile (Flock IT)
* **Número y Cliente:** `02 / FLOCK IT · SYNGENTA`
* **Título:** Informes Interactivos por Zonas, Relevamiento Multimodal en Campo y Envío a Productores
* **Chips de Metadatos:** `Mobile Nativo (iOS/Android)` · `Web Responsive` · `Data Visualization`
* **Portada:** `syngenta-web-informe-malezas.png` (`object-cover object-top`).
* **Descripción:** Solución web y móvil para técnicos y productores agropecuarios orientada al relevamiento de malezas en lotes por zonas (fotos, audios y comentarios georreferenciados), análisis agronómico en tiempo real y envío de informes interactivos personalizados a cada productor.
* **Detalle In-Situ:**
  * *Discovery de Campo:* Conducción de entrevistas a usuarios finales en dupla con el Product Manager para mapear dolores de técnicos y productores y formular matrices de oportunidad.
  * *Diseño Multiplataforma:* Maquetado de pantallas de alta densidad analítica en web (mapa satelital con puntos, KPIs circulares y selector de visitas a compartir) y flujo móvil adaptado para consulta en el lote.
  * *Galería Visual:* 2 Tabs (`Plataforma Web` · `Experiencia Mobile`) con las 7 capturas verificadas y Lightbox de inspección completa.

### Tarjeta 03: Scalter — Plataforma de Pedidos B2B Web Responsive & Bot WhatsApp (Flock IT)
* **Número y Cliente:** `03 / FLOCK IT · SCALTER`
* **Título:** Portal B2B de Pedidos con Validación de CUIT, Alertas de Stock y Bot de WhatsApp
* **Chips de Metadatos:** `Web Responsive` · `Bot WhatsApp` · `Comercio B2B`
* **Portada:** `scalter-web-panel-pedidos.png` (`object-cover object-top`).
* **Descripción:** Diseño de interfaz web responsive y flujo conversacional en WhatsApp para que clientes B2B de Scalter ingresen con sus credenciales y CUIT habilitante, gestionen pedidos sobre tabla de especificaciones técnicas, reciban alertas claras cuando falta stock y consulten estados en tiempo real.
* **Detalle In-Situ:**
  * *Validación de Acceso y Autoservicio:* Diseño de flujo de ingreso por credenciales y CUIT habilitante, búsqueda y carga de artículos con cálculo dinámico del total y mensajes preventivos ante falta de disponibilidad.
  * *Puente Omnicanal WhatsApp ↔ Web:* Flujo conversacional en WhatsApp para consulta de stock, seguimiento de órdenes en producción y derivación automática al portal web para pedidos de mayor volumen (+3 artículos).
  * *Galería Visual:* 2 Tabs (`Portal Web B2B` · `Bot WhatsApp & Mobile`) con las 9 capturas verificadas y Lightbox de inspección completa.

---

## 5. Implementación Técnica en CSS / Tailwind
```html
<section class="relative max-w-6xl mx-auto px-6 py-20">
  <div class="mb-12">
    <span class="font-mono text-xs text-muted tracking-wider">01 / PROYECTOS SELECCIONADOS</span>
    <h2 class="text-3xl sm:text-4xl font-semibold tracking-tight text-ink mt-2">Trabajo en Producción</h2>
  </div>

  <!-- Contenedor Sticky Stacking (padding inferior suficiente para la lectura del último card) -->
  <div class="flex flex-col gap-12">
    <!-- Card 1 (z-10, top dinámico min(80px, vh - h - 24)) -->
    <article class="sticky z-10 bg-surface border border-hairline rounded-xl p-6 md:p-8 shadow-sm">
      <!-- Header + Portada 16:10 + Acordeón In-Situ con Tabs & Lightbox -->
    </article>
    <!-- Card 2 (z-20, top dinámico base 96px) -->
    <article class="sticky z-20 bg-surface border border-hairline rounded-xl p-6 md:p-8 shadow-sm">
      <!-- Contenido Card 2 -->
    </article>
    <!-- Card 3 (z-30, top dinámico base 112px) -->
    <article class="sticky z-30 bg-surface border border-hairline rounded-xl p-6 md:p-8 shadow-sm">
      <!-- Contenido Card 3 -->
    </article>
  </div>
</section>
```
* **Regla de apilamiento:** Cada tarjeta consecutiva aumenta ligeramente su `baseTop` (`80px`, `96px`, `112px`) y su `z-index` (`z-10`, `z-20`, `z-30`) para dejar visible una solapa superior de la tarjeta anterior que refuerza la sensación física de mazo apilado.
