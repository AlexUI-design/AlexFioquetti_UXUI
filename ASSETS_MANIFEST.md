# Manifiesto de Imágenes y Capturas (`ASSETS_MANIFEST`)
> **Propósito**: Registro canónico de capturas curadas y normalizadas para el CV Web minimalista de Alex Fioquetti, incluyendo rutas exactas, dimensiones verificadas, patrón de contenedor y asignación a cada sección y slot de UI.

---

## 1. Convención de Rutas y Uso para el Agente

* **Carpeta fuente curada:** `assets/` *(el agente solo consume archivos de aquí; nunca lee capturas crudas desde `imagenes/`, que queda intacta como archivo histórico).*
* **Destino en proyecto Next.js:** Al construir o actualizar la aplicación web en `web/`, los archivos de `assets/` deben copiarse bajo `web/public/images/` respetando la misma estructura de subcarpetas (`web/public/images/<proyecto>/<subcarpeta>/<archivo>`).
* **Vinculación en código:** Cada recurso se referencia por su ruta relativa (`/images/...`) dentro de `src/data/cv-data.ts`, sin hardcodear rutas directamente en los componentes de sección.
* **Regla de encuadre:** Todas las pantallas utilizan `object-cover object-top` en vista miniatura (`16:10` desktop o `9:19.5` mobile). Las pantallas con altura `> 2000 px` o tablas densas incluyen el disparador **Lightbox** (`Ver pantalla completa ↗`) para lectura completa con scroll interno.

---

## 2. Índice Maestro de Assets Curados (32 Capturas Verificadas)

| ID | Archivo (`assets/...`) | Producto / Tab | Formato & Dimensiones (px) | Peso | Patrón UI | Slot exacto en UI |
| :--- | :--- | :--- | :--- | :---: | :--- | :--- |
| `p01-club-loyalty-desktop` | `proyecto-01-advanta/club-advanta/club-advanta-loyalty-desktop.png` | Tarjeta 01 · Tab 1 (*Club Advanta*) | Desktop Full-Page `1282 × 5098` | `3.3M` | **Portada** + **Patrón C/D** | **Portada principal Tarjeta 01** (`object-cover object-top`) + Desktop Fila 1 en Tab 1 + Lightbox |
| `p01-club-loyalty-mobile` | `proyecto-01-advanta/club-advanta/club-advanta-loyalty-mobile.png` | Tarjeta 01 · Tab 1 (*Club Advanta*) | Mobile Full-Page `393 × 7397` *(recortada a 393px)* | `2.4M` | **Patrón C/D** | Mobile Fila 1 en Tab 1 (junto a Desktop) + Lightbox |
| `p01-club-admin-usuarios` | `proyecto-01-advanta/club-advanta/club-advanta-admin-usuarios.png` | Tarjeta 01 · Tab 1 (*Club Advanta*) | Desktop `2560 × 2455` | `1.1M` | **Patrón A/D** | Ancho completo Fila 2 en Tab 1 (KPIs, filtros y tabla de usuarios) + Lightbox |
| `p01-club-admin-beneficios` | `proyecto-01-advanta/club-advanta/club-advanta-admin-beneficios.png` | Tarjeta 01 · Tab 1 (*Club Advanta*) | Desktop `2560 × 1604` (`16:10`) | `1.3M` | **Patrón B** | Par 2-col Fila 3 (Izq): Centro de Beneficios ABM + Lightbox |
| `p01-club-admin-beneficio-preview` | `proyecto-01-advanta/club-advanta/club-advanta-admin-beneficio-preview.png` | Tarjeta 01 · Tab 1 (*Club Advanta*) | Desktop `2560 × 1926` | `1.9M` | **Patrón B** | Par 2-col Fila 3 (Der): Vista previa frente/dorso de campaña + Lightbox |
| `p01-club-perfil-black` | `proyecto-01-advanta/club-advanta/club-advanta-perfil-black.png` | Tarjeta 01 · Tab 1 (*Club Advanta*) | Desktop Full-Page `2560 × 2936` | `2.9M` | **Patrón B/D** | Par 2-col Fila 4 (Izq): Perfil Productor Black e historial + Lightbox |
| `p01-club-comunicaciones-metricas` | `proyecto-01-advanta/club-advanta/club-advanta-comunicaciones-metricas.png` | Tarjeta 01 · Tab 1 (*Club Advanta*) | Desktop `2560 × 1744` | `1.7M` | **Patrón B** | Par 2-col Fila 4 (Der): Métricas de comunicaciones enviadas + Lightbox |
| `p01-club-login` | `proyecto-01-advanta/club-advanta/club-advanta-login.png` | Tarjeta 01 · Tab 1 (*Club Advanta*) | Desktop `2560 × 1600` (`16:10`) | `1.9M` | **Patrón A** | Bloque Fila 5 en Tab 1: Flujo unificado Login y recuperación de contraseña + Lightbox |
| `p01-biblio-visor-pdf` | `proyecto-01-advanta/biblioteca/biblioteca-visor-pdf.png` | Tarjeta 01 · Tab 2 (*Biblioteca Advanta*) | Desktop `2600 × 1612` (`16:10`) | `1.1M` | **Patrón A** | Hero ancho completo Fila 1 en Tab 2: Visor técnico PDF integrado + Lightbox |
| `p01-biblio-explorador` | `proyecto-01-advanta/biblioteca/biblioteca-explorador.png` | Tarjeta 01 · Tab 2 (*Biblioteca Advanta*) | Desktop `2600 × 1612` (`16:10`) | `120K` | **Patrón B** | Par 2-col Fila 2 (Izq): Explorador jerárquico y privacidad Público/Privado + Lightbox |
| `p01-biblio-filtros-roles` | `proyecto-01-advanta/biblioteca/biblioteca-filtros-roles.png` | Tarjeta 01 · Tab 2 (*Biblioteca Advanta*) | Desktop `2600 × 1612` (`16:10`) | `190K` | **Patrón B** | Par 2-col Fila 2 (Der): Filtros rápidos por rol (`Distribuidor`/`Productor`) y etiquetas + Lightbox |
| `p01-bobot-distribuidores` | `proyecto-01-advanta/bo-del-bot/bo-bot-distribuidores.png` | Tarjeta 01 · Tab 3 (*BO del Bot*) | Desktop `2600 × 1764` | `212K` | **Patrón A** | Hero ancho completo Fila 1 en Tab 3: Tabla ABM de 300 distribuidores + Lightbox |
| `p01-bobot-administradores` | `proyecto-01-advanta/bo-del-bot/bo-bot-administradores.png` | Tarjeta 01 · Tab 3 (*BO del Bot*) | Desktop `2600 × 1616` (`16:10`) | `151K` | **Patrón B** | Par 2-col Fila 2 (Izq): Tabla de administradores de plataforma + Lightbox |
| `p01-bobot-nuevo-admin` | `proyecto-01-advanta/bo-del-bot/bo-bot-nuevo-admin.png` | Tarjeta 01 · Tab 3 (*BO del Bot*) | Desktop `2600 × 1612` (`16:10`) | `190K` | **Patrón B** | Par 2-col Fila 2 (Der): Modal de alta ABM con validación + Lightbox |
| `p02-syngenta-web-malezas` | `proyecto-02-syngenta/web/syngenta-web-informe-malezas.png` | Tarjeta 02 · Tab 1 (*Plataforma Web*) | Desktop `3024 × 1964` (`1.54`) | `1.8M` | **Portada** + **Patrón A** | **Portada principal Tarjeta 02** (`object-cover object-top`) + Hero ancho completo Fila 1 en Tab 1 + Lightbox |
| `p02-syngenta-web-comentarios-fotos` | `proyecto-02-syngenta/web/syngenta-web-comentarios-fotos.png` | Tarjeta 02 · Tab 1 (*Plataforma Web*) | Desktop `3024 × 1964` (`1.54`) | `1.7M` | **Patrón B** | Par 2-col Fila 2 (Izq): Comentarios de campo, fotos del lote y audios + Lightbox |
| `p02-syngenta-web-compartir-lotes` | `proyecto-02-syngenta/web/syngenta-web-compartir-lotes.png` | Tarjeta 02 · Tab 1 (*Plataforma Web*) | Desktop `3024 × 1964` (`1.54`) | `1.6M` | **Patrón B** | Par 2-col Fila 2 (Der): Selección de lotes y visitas para compartir el informe + Lightbox |
| `p02-syngenta-mobile-mapa-lote` | `proyecto-02-syngenta/mobile/syngenta-mobile-mapa-lote.png` | Tarjeta 02 · Tab 2 (*Experiencia Mobile*) | Mobile `786 × 1704` (`9:19.5`) | `558K` | **Patrón E** | Tira 4-col Frame 1: Mapa satelital del lote y ficha técnica + Lightbox |
| `p02-syngenta-mobile-metricas` | `proyecto-02-syngenta/mobile/syngenta-mobile-metricas.png` | Tarjeta 02 · Tab 2 (*Experiencia Mobile*) | Mobile `786 × 1704` (`9:19.5`) | `252K` | **Patrón E** | Tira 4-col Frame 2: Tabla de densidad variable y CV % por ambiente + Lightbox |
| `p02-syngenta-mobile-fotos` | `proyecto-02-syngenta/mobile/syngenta-mobile-fotos.png` | Tarjeta 02 · Tab 2 (*Experiencia Mobile*) | Mobile `786 × 1704` (`9:19.5`) | `461K` | **Patrón E** | Tira 4-col Frame 3: Galería de fotos de campo filtrable por punto `1, 2, 3` + Lightbox |
| `p02-syngenta-mobile-audios` | `proyecto-02-syngenta/mobile/syngenta-mobile-audios.png` | Tarjeta 02 · Tab 2 (*Experiencia Mobile*) | Mobile `786 × 1704` (`9:19.5`) | `155K` | **Patrón E** | Tira 4-col Frame 4: Reproductor de audios de campo por punto + Lightbox |
| `p03-scalter-web-panel` | `proyecto-03-scalter/web/scalter-web-panel-pedidos.png` | Tarjeta 03 · Tab 1 (*Portal Web B2B*) | Desktop `2560 × 1600` (`16:10`) | `105K` | **Portada** + **Patrón A** | **Portada principal Tarjeta 03** (`object-cover object-top`) + Hero ancho completo Fila 1 en Tab 1 + Lightbox |
| `p03-scalter-web-cuit` | `proyecto-03-scalter/web/scalter-web-validacion-cuit.png` | Tarjeta 03 · Tab 1 (*Portal Web B2B*) | Desktop `2560 × 1600` (`16:10`) | `56K` | **Patrón B** | Par 2-col Fila 2 (Izq): Validación de acceso por CUIT habilitado + Lightbox |
| `p03-scalter-web-cargar` | `proyecto-03-scalter/web/scalter-web-cargar-articulo.png` | Tarjeta 03 · Tab 1 (*Portal Web B2B*) | Desktop `2560 × 1942` (`1.32`) | `177K` | **Patrón B** | Par 2-col Fila 2 (Der): Carga de artículo con cálculo dinámico de total + Lightbox |
| `p03-scalter-web-sin-stock` | `proyecto-03-scalter/web/scalter-web-error-sin-stock.png` | Tarjeta 03 · Tab 1 (*Portal Web B2B*) | Desktop `2560 × 1942` (`1.32`) | `188K` | **Patrón B** | Par 2-col Fila 3 (Izq): Alerta de artículo no disponible en stock + Lightbox |
| `p03-scalter-web-finalizar` | `proyecto-03-scalter/web/scalter-web-finalizar-pedido.png` | Tarjeta 03 · Tab 1 (*Portal Web B2B*) | Desktop `2560 × 1600` (`16:10`) | `111K` | **Patrón B** | Par 2-col Fila 3 (Der): Modal de cierre con comentario opcional + Lightbox |
| `p03-scalter-bot-menu` | `proyecto-03-scalter/mobile-bot/scalter-bot-menu-cuit.png` | Tarjeta 03 · Tab 2 (*Bot WhatsApp & Mobile*) | Mobile `780 × 1688` (`9:19.5`) | `85K` | **Patrón E** | Tira 4-col Frame 1: Validación CUIT y menú interactivo en WhatsApp + Lightbox |
| `p03-scalter-bot-web-link` | `proyecto-03-scalter/mobile-bot/scalter-bot-derivacion-web.png` | Tarjeta 03 · Tab 2 (*Bot WhatsApp & Mobile*) | Mobile `780 × 1688` (`9:19.5`) | `71K` | **Patrón E** | Tira 4-col Frame 2: Derivación omnicanal desde bot al Asistente Web + Lightbox |
| `p03-scalter-bot-estado` | `proyecto-03-scalter/mobile-bot/scalter-bot-estado-pedido.png` | Tarjeta 03 · Tab 2 (*Bot WhatsApp & Mobile*) | Mobile `780 × 1688` (`9:19.5`) | `56K` | **Patrón E** | Tira 4-col Frame 3: Consulta de estado de orden (`#SCA-251 · En producción`) + Lightbox |
| `p03-scalter-mobile-cargar` | `proyecto-03-scalter/mobile-bot/scalter-mobile-cargar-articulo.png` | Tarjeta 03 · Tab 2 (*Bot WhatsApp & Mobile*) | Mobile Full-Page `750 × 3212` | `148K` | **Patrón E/D** | Tira 4-col Frame 4: Adaptación mobile responsive de tabla y alta + Lightbox |
| `pf01-bodega-cover` | `portfolio-01-bodega/bodega-tierras-altas-cover.jpg` | Portfolio · Caso 01 (*Bodega Tierras Altas*) | Desktop `1600 × 1000` (`16:10`) | `168K` | **Portada Portfolio** | Portada principal de la tarjeta protagonista en `03_portfolio.md` + disparador de Lightbox |
| `pf01-bodega-fullpage` | `portfolio-01-bodega/bodega-tierras-altas-fullpage.jpg` | Portfolio · Caso 01 (*Bodega Tierras Altas*) | Desktop Full-Page `1440 × 5829` | `1.4M` | **Lightbox** | Vista completa scrollable dentro del Lightbox `z-[100]` desde `03_portfolio.md` |

---

## 3. Reglas de Curaduría y Normalización Aplicadas

### Proyecto 01 — Advanta
1. **Separación archivo bruto vs. curado:** Las 59 capturas originales en `imagenes/Advanta/` y las 2 exportaciones previas en `assets/proyecto-01-club-advanta/` permanecen intactas como respaldo. Solo las **14 piezas curadas** de `assets/proyecto-01-advanta/` se publicarán en la web.
2. **Exclusiones explícitas aprobadas:**
   * Se excluyeron `biblioteca advanta/Lateral de información.png` y `biblioteca advanta/Carga de archivos-definir rol y descripción.png` por contener texto de relleno *Lorem ipsum*.
   * Se excluyeron `BO DEL BOT/01`, `02` y `03` (login/recuperación) por replicar el mismo flujo unificado ya representado en `p01-club-login`.
   * Se excluyeron modales repetitivos de confirmación de borrado/descarga y pantallas intermedias redundantes para mantener una lectura editorial concisa.
   * Se excluyó el archivo crudo `Club Advanta-Design system.png` (`3200 × 18070`, `9.0M`) por su altura extrema para no penalizar el peso de carga.
3. **Normalización del frame mobile (`p01-club-loyalty-mobile`):** Se recortó exactamente al ancho base del dispositivo (`393 × 7397 px`, origen `0,0`) para eliminar el desbordamiento lateral del carrusel *"Canjeá tus puntos"* presente en la captura cruda de `723 px`.

### Proyecto 02 — Syngenta
1. **Separación archivo bruto vs. curado:** Las 13 capturas originales en `imagenes/Syngenta/` permanecen intactas como respaldo. Solo las **7 piezas curadas** de `assets/proyecto-02-syngenta/` se publicarán en la web.
2. **Exclusiones explícitas aprobadas:**
   * Se excluyeron 6 capturas redundantes o intermedias (`lote sin puntos.png`, `compartir informe.png` —aviso previo—, `interfaz.png` —reemplazada por `interfaz-malezas.png` que suma el mapa de calor y puntos—, `comentarios de informe.png`, `comentarios feedback.png` y `calificacion.png`) para mantener el foco en el flujo completo sin repeticiones.
3. **Proporciones nativas:** Las capturas web (`3024 × 1964`, ratio `1.54`) y mobile (`786 × 1704`, ratio `9:19.5` `@2x`) ya tienen encuadre limpio y no requirieron recorte.

### Proyecto 03 — Scalter
1. **Separación archivo bruto vs. curado:** Las 23 capturas originales en `imagenes/Scalter/` permanecen intactas como respaldo. Solo las **9 piezas curadas** de `assets/proyecto-03-scalter/` se publicarán en la web.
2. **Exclusiones explícitas aprobadas:**
   * Se excluyeron 14 capturas redundantes o con inconsistencias de copy evitables (estado vacío, modales de borrado web/mobile, confirmación con contradicción *"PDF/Descargar Excel"*, variantes repetidas de alta sin precio y mensajes de WhatsApp con *"Cantidad de de rollos"*).
3. **Microcopy en estudio (`"Cancear"`):** Por decisión expresa del candidato, `scalter-web-cargar-articulo.png` y `scalter-web-error-sin-stock.png` se mantienen tal cual por ahora (pueden reemplazarse en el mismo nombre de archivo sin tocar código).

### Portfolio 01 — Bodega Tierras Altas
1. **Optimización de peso y formato:** A partir de la captura maestra cruda `imagenes/Caso bodega.png` (`2560 × 10362`, `13M`), que permanece intacta como respaldo, se generaron dos derivados web optimizados en JPEG de alta calidad bajo `assets/portfolio-01-bodega/`:
   * `bodega-tierras-altas-cover.jpg` (`1600 × 1000`, `168K`, recorte superior `16:10` enfocado en *"Experiencia en Bodega"*) para carga instantánea de la portada.
   * `bodega-tierras-altas-fullpage.jpg` (`1440 × 5829`, `1.4M`) para lectura completa con scroll interno en el Lightbox.
2. **Enlace externo verificado:** `https://www.behance.net/gallery/258217419/Caso-Rediseno-Web-Experiencia-Digital`.

---

## 4. Estado de Cobertura Visual y Expansiones Futuras

* **Cobertura actual al 100 %:** Todas las secciones activas de la web (**Proyecto 01 Advanta**, **Proyecto 02 Syngenta**, **Proyecto 03 Scalter** y **Portfolio Caso 01 Bodega Tierras Altas**) cuentan con sus **32 assets curados y verificados**.
* **Expansiones futuras opcionales para Portfolio (si se pasan a grilla 2 columnas):**
  * **Aki Manga App (Coderhouse)** · **Rediseño Web Cinépolis (Coderhouse)** · **Cóctel UX Writing (Coderhouse)** · **Colección de Diseño Industrial (UNCuyo / Behance)**.
