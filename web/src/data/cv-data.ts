export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title: string;
  caption: string;
  width: number;
  height: number;
  productLabel: string;
  isMobile?: boolean;
  isLong?: boolean;
}

export type GalleryBlock =
  | {
      type: "hero";
      image: GalleryImage;
    }
  | {
      type: "pair";
      images: [GalleryImage, GalleryImage];
    }
  | {
      type: "responsive-showcase";
      desktop: GalleryImage;
      mobile: GalleryImage;
      caption: string;
    }
  | {
      type: "mobile-strip";
      images: GalleryImage[];
    };

export interface ProjectTab {
  id: string;
  label: string;
  description: string;
  blocks: GalleryBlock[];
}

export interface StickyProject {
  id: string;
  tag: string;
  metadata: string;
  title: string;
  summary: string;
  chips: string[];
  cover: GalleryImage;
  challenge: string;
  roleContributions: string[];
  impact: string;
  designStack: string[];
  tabs: ProjectTab[];
}

export interface PortfolioCase {
  id: string;
  overline: string;
  title: string;
  description: string;
  tags: string[];
  cover: GalleryImage;
  fullpage: GalleryImage;
  behanceUrl: string;
}

export interface ExperienceEntry {
  id: string;
  period: string;
  company: string;
  subtitle: string;
  role: string;
  description: string;
  tags: string[];
}

export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  period: string;
  highlight: string;
  details: string[];
}

export interface StackCategory {
  id: string;
  title: string;
  items: string[];
}

export const personalInfo = {
  fullName: "Alex Gabriel Fioquetti",
  shortName: "Alex Fioquetti",
  roleTitle: "Diseñador Industrial · Diseñador UX/UI",
  locationLabel: "Mendoza, Argentina (UTC-3)",
  timezone: "America/Argentina/Mendoza",
  availability: "Disponible",
  email: "alexgabrielfioquetti@gmail.com",
  whatsappUrl: "https://wa.me/5492612535082",
  linkedinUrl: "https://www.linkedin.com/in/alex-fioquetti-ux-ui/",
  linktreeUrl: "https://linktr.ee/Alekei",
  behanceUrl: "https://www.behance.net/AlexFioquetti",
  cvPdfUrl: null as string | null,
};

export const heroData = {
  overline: "00 / ENFOQUE PROYECTUAL & PRODUCTO",
  headlineLines: [
    "Diseño UX/UI y",
    "Producto Digital.",
  ],
  bio: "Diseñador UX/UI graduado en Diseño Industrial por la UNCuyo. Lidero el diseño de producto de punta a punta en squads ágiles: desde la investigación con usuarios y discovery directo con clientes hasta la arquitectura de sistemas de diseño escalables.",
  specialtyChips: [
    "Atomic Design & Design Systems en Figma",
    "Ecosistemas multiproducto y consolas ABM",
    "UX Research & UX Writing conversacional",
    "Metodologías ágiles Scrum en Core Pods",
  ],
};

export const stickyProjects: StickyProject[] = [
  {
    id: "advanta",
    tag: "01 / FLOCK IT · ADVANTA",
    metadata: "Fase MVP 2 (1 Año) · Squad 5 Personas (Core Pod) · Scrum Diario",
    title: "Ecosistema Digital Multiproducto para Fidelización, Gestión Documental y Asistencia",
    summary:
      "Liderazgo integral de diseño UX/UI de punta a punta para orquestar el ecosistema digital de Advanta: Club de Fidelización (web loyalty, autogestión y backoffice), Biblioteca Documental anti-silos, Chatbot conversacional y su consola administrativa.",
    chips: ["Fase MVP 2 (1 Año)", "Squad 5 Personas (Core Pod)", "Scrum Diario"],
    cover: {
      id: "p01-bobot-campanas-listado",
      src: "/images/proyecto-01-advanta/bo-del-bot/bo-bot-campanas-listado.png",
      alt: "Panel general de Campañas WhatsApp con KPIs de saldo, envíos, campañas activas y tabla de estados",
      title: "Campañas WhatsApp — Panel General y Métricas",
      caption:
        "Vista principal con saldo disponible, envíos realizados, tasa de respuestas \"Sí\", lista global de bajas, filtros y tabla con 7 estados de ciclo de vida.",
      width: 2600,
      height: 1572,
      productLabel: "Advanta · BO del Bot · Campañas WhatsApp",
    },
    challenge:
      "Unificar bajo una misma arquitectura de marca y permisos múltiples productos independientes con distintos niveles de usuario (Productores, Distribuidores y Administradores), evitando silos de información y fricción operativa en la carga de facturas, canje de beneficios y consulta técnica.",
    roleContributions: [
      "Único diseñador UX/UI a cargo dentro de un Core Pod multidisciplinario (Frontend, Backend, QA y PM), participando en dailies, refinamientos técnicos y estimaciones en Jira.",
      "Gobernanza de Design System bajo metodología Atomic Design en Figma, articulando el modo oscuro de Club Advanta y la alta densidad tabular de Biblioteca y Backoffice.",
      "Diseño de matrices jerárquicas de roles y permisos, flujos conversacionales para el chatbot asistido y microcopy resolutivo en validaciones y modales.",
    ],
    impact:
      "Continuidad extendida durante un ciclo continuo de ~1 año hasta el lanzamiento de la Fase MVP 2 con cinco soluciones interconectadas operando en coherencia visual y funcional.",
    designStack: ["Figma", "Atomic Design", "Jira", "Scrum", "UX Writing", "Arquitectura de Roles"],
    tabs: [
      {
        id: "bo-del-bot",
        label: "BO del Bot",
        description:
          "Consola backoffice del asistente conversacional: módulo de Campañas WhatsApp para monitorear métricas, configurar envíos con validaciones condicionales y gestionar destinatarios aprobados con estimación de costos, junto a la administración ABM de distribuidores, asesores y administradores.",
        blocks: [
          {
            type: "hero",
            image: {
              id: "p01-bobot-campanas-listado",
              src: "/images/proyecto-01-advanta/bo-del-bot/bo-bot-campanas-listado.png",
              alt: "Panel general de Campañas WhatsApp con KPIs de saldo, envíos, campañas activas y tabla de estados",
              title: "Campañas WhatsApp — Panel General y Métricas",
              caption:
                "Vista principal con saldo disponible, envíos realizados, tasa de respuestas \"Sí\", lista global de bajas, filtros y tabla con 7 estados de ciclo de vida.",
              width: 2600,
              height: 1572,
              productLabel: "Advanta · BO del Bot · Campañas WhatsApp",
            },
          },
          {
            type: "pair",
            images: [
              {
                id: "p01-bobot-campana-crear-base",
                src: "/images/proyecto-01-advanta/bo-del-bot/bo-bot-campana-crear-base.png",
                alt: "Formulario de creación de nueva campaña de WhatsApp con configuración de respuestas del bot",
                title: "Creación de Campaña (Flujo Interactivo)",
                caption:
                  "Formulario en 4 bloques para definir datos básicos, flyer opcional, mensaje de hasta 1024 caracteres y respuestas automáticas para botones Sí/No.",
                width: 2560,
                height: 2774,
                isLong: true,
                productLabel: "Advanta · BO del Bot · Campañas WhatsApp",
              },
              {
                id: "p01-bobot-campana-error-flyer",
                src: "/images/proyecto-01-advanta/bo-del-bot/bo-bot-campana-error-flyer.png",
                alt: "Estado de error de validación al cargar un flyer inválido y campo de email de derivación",
                title: "Validación de Archivo y Derivación",
                caption:
                  "Alerta preventiva ante archivos fuera de formato o peso límite (JPG/PNG hasta 5 MB) y configuración opcional de email sin cobertura comercial.",
                width: 2560,
                height: 2958,
                isLong: true,
                productLabel: "Advanta · BO del Bot · Campañas WhatsApp",
              },
            ],
          },
          {
            type: "pair",
            images: [
              {
                id: "p01-bobot-campana-informativa",
                src: "/images/proyecto-01-advanta/bo-del-bot/bo-bot-campana-informativa.png",
                alt: "Variante de campaña informativa con flyer cargado y bloque de bot deshabilitado",
                title: "Variante Informativa y Flyer Cargado",
                caption:
                  "Previsualización de la pieza adjunta con acciones de reemplazo y lógica condicional que deshabilita respuestas automáticas en campañas informativas.",
                width: 2560,
                height: 2922,
                isLong: true,
                productLabel: "Advanta · BO del Bot · Campañas WhatsApp",
              },
              {
                id: "p01-bobot-campana-modal-borrador",
                src: "/images/proyecto-01-advanta/bo-del-bot/bo-bot-campana-modal-borrador.png",
                alt: "Modal de confirmación para guardar una campaña de WhatsApp como borrador",
                title: "Resguardo de Progreso en Borrador",
                caption:
                  "Modal de confirmación que asegura continuidad para retomar la edición, cargar destinatarios o enviar a aprobación más adelante.",
                width: 2560,
                height: 2922,
                isLong: true,
                productLabel: "Advanta · BO del Bot · Campañas WhatsApp",
              },
            ],
          },
          {
            type: "pair",
            images: [
              {
                id: "p01-bobot-campana-carga-destinatarios",
                src: "/images/proyecto-01-advanta/bo-del-bot/bo-bot-campana-carga-destinatarios.png",
                alt: "Paso 1 de carga de destinatarios en una campaña aprobada con plantilla Excel y dropzone CSV",
                title: "Campaña Aprobada — Carga de Destinatarios",
                caption:
                  "Paso 1 tras la aprobación comercial con plantilla descargable .xlsx, carga de archivos hasta 10 MB y aviso de normalización de prefijos y bajas.",
                width: 2560,
                height: 2276,
                isLong: true,
                productLabel: "Advanta · BO del Bot · Campañas WhatsApp",
              },
              {
                id: "p01-bobot-campana-revision-costos",
                src: "/images/proyecto-01-advanta/bo-del-bot/bo-bot-campana-revision-costos.png",
                alt: "Paso 2 con resumen de validación de destinatarios, política de envío escalonado y estimación de costos Meta y Twilio",
                title: "Validación, Costos y Confirmación",
                caption:
                  "Paso 2 con métricas de válidos, bajas y errores exportables en CSV, política de envío responsable en lotes y estimación transparente Meta + Twilio.",
                width: 2560,
                height: 2642,
                isLong: true,
                productLabel: "Advanta · BO del Bot · Campañas WhatsApp",
              },
            ],
          },
          {
            type: "hero",
            image: {
              id: "p01-bobot-distribuidores",
              src: "/images/proyecto-01-advanta/bo-del-bot/bo-bot-distribuidores.png",
              alt: "Tabla ABM de 300 distribuidores en Backoffice del Bot",
              title: "Consola ABM de Distribuidores",
              caption:
                "Gestión de 300 distribuidores por CUIT y zona con estados Activo/Baja y exportación CSV.",
              width: 2600,
              height: 1764,
              productLabel: "Advanta · BO del Bot",
            },
          },
          {
            type: "pair",
            images: [
              {
                id: "p01-bobot-administradores",
                src: "/images/proyecto-01-advanta/bo-del-bot/bo-bot-administradores.png",
                alt: "Tabla de administradores habilitados en BO del Bot",
                title: "Gestión de Administradores",
                caption: "Listado, búsqueda por correo y control de accesos administrativos.",
                width: 2600,
                height: 1616,
                productLabel: "Advanta · BO del Bot",
              },
              {
                id: "p01-bobot-nuevo-admin",
                src: "/images/proyecto-01-advanta/bo-del-bot/bo-bot-nuevo-admin.png",
                alt: "Modal de alta de nuevo usuario administrador con reglas de contraseña",
                title: "Alta ABM con Validación Guiada",
                caption: "Formulario modal con requisitos de contraseña verificados en vivo.",
                width: 2600,
                height: 1612,
                productLabel: "Advanta · BO del Bot",
              },
            ],
          },
        ],
      },
      {
        id: "club-advanta",
        label: "Club Advanta",
        description:
          "Portal de fidelización para productores (landing de ingreso, autogestión de perfil Black y flujo unificado de acceso) junto al backoffice completo de usuarios, beneficios y métricas de comunicación.",
        blocks: [
          {
            type: "responsive-showcase",
            desktop: {
              id: "p01-club-loyalty-desktop-showcase",
              src: "/images/proyecto-01-advanta/club-advanta/club-advanta-loyalty-desktop.png",
              alt: "Club Advanta Landing Loyalty en versión Desktop",
              title: "Club Advanta — Landing Loyalty Desktop",
              caption:
                "Primer contacto de productores con el ecosistema: propuesta de valor, categorías y formulario de registro.",
              width: 1282,
              height: 5098,
              productLabel: "Advanta · Club Advanta",
              isLong: true,
            },
            mobile: {
              id: "p01-club-loyalty-mobile",
              src: "/images/proyecto-01-advanta/club-advanta/club-advanta-loyalty-mobile.png",
              alt: "Club Advanta Landing Loyalty en versión Mobile",
              title: "Club Advanta — Landing Loyalty Mobile",
              caption: "Versión Mobile adaptada para registro rápido en campo.",
              width: 393,
              height: 7397,
              productLabel: "Advanta · Club Advanta",
              isMobile: true,
              isLong: true,
            },
            caption:
              "Landing Loyalty Web y Mobile — Primer contacto, categorías de membresía y formulario de registro (\"Sumate al Club\").",
          },
          {
            type: "pair",
            images: [
              {
                id: "p01-club-login",
                src: "/images/proyecto-01-advanta/club-advanta/club-advanta-login.png",
                alt: "Pantalla de inicio de sesión compartida para productores y administradores",
                title: "Flujo Unificado de Acceso y Recuperación",
                caption:
                  "Login y recuperación de contraseña compartido entre perfiles de productores y consolas administrativas.",
                width: 2560,
                height: 1600,
                productLabel: "Advanta · Club Advanta",
              },
              {
                id: "p01-club-perfil-black",
                src: "/images/proyecto-01-advanta/club-advanta/club-advanta-perfil-black.png",
                alt: "Perfil de productor categoría Black con progreso de bolsas e historial",
                title: "Perfil de Productor (Categoría Black)",
                caption:
                  "Autogestión de productor con seguimiento de bolsas validadas e historial de facturas.",
                width: 2560,
                height: 2936,
                productLabel: "Advanta · Club Advanta",
                isLong: true,
              },
            ],
          },
          {
            type: "hero",
            image: {
              id: "p01-club-admin-usuarios",
              src: "/images/proyecto-01-advanta/club-advanta/club-advanta-admin-usuarios.png",
              alt: "Backoffice administrativo de usuarios con métricas y tabla de registros",
              title: "Consola Admin — Usuarios y Métricas",
              caption:
                "Backoffice de usuarios con KPIs por categoría (Miembro, Socio, Silver, Black), filtros y reenvío masivo de credenciales.",
              width: 2560,
              height: 2455,
              productLabel: "Advanta · Club Advanta",
              isLong: true,
            },
          },
          {
            type: "pair",
            images: [
              {
                id: "p01-club-admin-beneficios",
                src: "/images/proyecto-01-advanta/club-advanta/club-advanta-admin-beneficios.png",
                alt: "Centro de beneficios ABM en Backoffice Club Advanta",
                title: "Centro de Beneficios (ABM)",
                caption: "Tabla ABM de beneficios con stock, vigencia, segmento y estado.",
                width: 2560,
                height: 1604,
                productLabel: "Advanta · Club Advanta",
              },
              {
                id: "p01-club-admin-beneficio-preview",
                src: "/images/proyecto-01-advanta/club-advanta/club-advanta-admin-beneficio-preview.png",
                alt: "Vista previa frente y dorso de nueva campaña de beneficio",
                title: "Vista Previa de Beneficio (Frente / Dorso)",
                caption: "Previsualización interactiva antes de publicar en la web del club.",
                width: 2560,
                height: 1926,
                productLabel: "Advanta · Club Advanta",
              },
            ],
          },
          {
            type: "hero",
            image: {
              id: "p01-club-comunicaciones-metricas",
              src: "/images/proyecto-01-advanta/club-advanta/club-advanta-comunicaciones-metricas.png",
              alt: "Analítica de campañas y comunicaciones enviadas por segmento",
              title: "Métricas de Comunicaciones",
              caption:
                "Detalle de envíos por segmento, trazabilidad de entrega y detección de errores.",
              width: 2560,
              height: 1744,
              productLabel: "Advanta · Club Advanta",
            },
          },
        ],
      },
      {
        id: "biblioteca-advanta",
        label: "Biblioteca Advanta",
        description:
          "Gestor documental corporativo diseñado para eliminar silos departamentales: jerarquía por carpetas, visor integrado de fichas técnicas, control Público/Privado y filtrado por rol.",
        blocks: [
          {
            type: "hero",
            image: {
              id: "p01-biblio-explorador",
              src: "/images/proyecto-01-advanta/biblioteca/biblioteca-explorador.png",
              alt: "Explorador jerárquico de carpetas y archivos en Biblioteca Advanta",
              title: "Explorador Jerárquico & Privacidad",
              caption: "Árbol por campaña/cultivo con control de visibilidad Público o Privado.",
              width: 2600,
              height: 1612,
              productLabel: "Advanta · Biblioteca Documental",
            },
          },
          {
            type: "pair",
            images: [
              {
                id: "p01-biblio-filtros-roles",
                src: "/images/proyecto-01-advanta/biblioteca/biblioteca-filtros-roles.png",
                alt: "Filtros rápidos por rol Distribuidor o Productor y etiquetas",
                title: "Filtros Rápidos por Rol & Etiquetas",
                caption:
                  "Segmentación ágil por acceso (Distribuidor / Productor) y taxonomía técnica.",
                width: 2600,
                height: 1612,
                productLabel: "Advanta · Biblioteca Documental",
              },
              {
                id: "p01-biblio-visor-pdf",
                src: "/images/proyecto-01-advanta/biblioteca/biblioteca-visor-pdf.png",
                alt: "Visor técnico integrado dentro de Biblioteca Advanta",
                title: "Visor Documental Integrado",
                caption:
                  "Lectura directa de manuales y notas agronómicas con etiquetas, compartir por enlace y descarga.",
                width: 2600,
                height: 1612,
                productLabel: "Advanta · Biblioteca Documental",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "syngenta",
    tag: "02 / FLOCK IT · SYNGENTA",
    metadata: "Mobile Nativo (iOS/Android) · Web Responsive · Data Visualization",
    title: "Informes Interactivos por Zonas, Relevamiento Multimodal en Campo y Envío a Productores",
    summary:
      "Solución web y móvil para técnicos y productores agropecuarios orientada al relevamiento de malezas en lotes por zonas (fotos, audios y comentarios georreferenciados), análisis agronómico en tiempo real y envío de informes interactivos.",
    chips: ["Mobile Nativo (iOS/Android)", "Web Responsive", "Data Visualization"],
    cover: {
      id: "p02-syngenta-web-malezas",
      src: "/images/proyecto-02-syngenta/web/syngenta-web-informe-malezas.png",
      alt: "Informe interactivo Syngenta con mapa satelital por zonas y métricas de malezas",
      title: "Syngenta — Informe Interactivo Web por Zonas",
      caption:
        "Mapa satelital zonificado con puntos de muestreo, KPIs circulares y tarjetas de malezas y plagas.",
      width: 3024,
      height: 1964,
      productLabel: "Syngenta · Plataforma Web",
    },
    challenge:
      "Traducir grandes volúmenes de mediciones agronómicas de campo (densidad lograda, desuniformidad espacial/temporal, malezas y plagas por ambiente) en informes visuales accionables que el técnico pueda armar con rapidez y el productor pueda leer desde el teléfono en pleno lote.",
    roleContributions: [
      "Conducción de entrevistas a usuarios finales y discovery en dupla operativa directa con el Product Manager para mapear dolores de técnicos en campo.",
      "Arquitectura de información de pantallas web de alta densidad analítica integrando mapa satelital interactivo, puntos de muestreo, notas, galería de fotos y audios.",
      "Diseño de experiencia móvil optimizada por pestañas para consultar fichas de siembra, tablas por ambiente, fotos y notas de voz grabadas por punto.",
    ],
    impact:
      "Reducción significativa de la fricción cognitiva al interpretar desvíos de siembra y malezas, agilizando el envío selectivo de visitas completas al productor.",
    designStack: ["Figma", "Discovery con PM", "Data Visualization", "Responsive UI", "Mobile UX"],
    tabs: [
      {
        id: "syngenta-web",
        label: "Plataforma Web",
        description:
          "Vista dividida mapa satelital + panel analítico con indicadores circulares, registro multimedia en lote y flujo de selección de visitas para compartir el informe.",
        blocks: [
          {
            type: "hero",
            image: {
              id: "p02-syngenta-web-malezas-hero",
              src: "/images/proyecto-02-syngenta/web/syngenta-web-informe-malezas.png",
              alt: "Informe web Syngenta con mapa de calor de lote, puntos 1-2-3 y KPIs",
              title: "Mapa Zonificado & Analítica Agronómica",
              caption:
                "Mapa satelital con puntos de muestreo (1, 2, 3), KPIs circulares (98% Logro, 32% CV) y tarjetas de malezas y plagas.",
              width: 3024,
              height: 1964,
              productLabel: "Syngenta · Plataforma Web",
            },
          },
          {
            type: "pair",
            images: [
              {
                id: "p02-syngenta-web-comentarios-fotos",
                src: "/images/proyecto-02-syngenta/web/syngenta-web-comentarios-fotos.png",
                alt: "Comentarios de visita, galería de imágenes y audios de relevamiento",
                title: "Relevamiento Multimodal en Campo",
                caption:
                  "Registro técnico de visita con notas, galería fotográfica del lote y pistas de audio.",
                width: 3024,
                height: 1964,
                productLabel: "Syngenta · Plataforma Web",
              },
              {
                id: "p02-syngenta-web-compartir-lotes",
                src: "/images/proyecto-02-syngenta/web/syngenta-web-compartir-lotes.png",
                alt: "Modal de selección de lotes y visitas para compartir el informe al productor",
                title: "Selección y Envío de Informes",
                caption:
                  "Flujo guiado para elegir visitas completas por lote y compartirlas con el productor.",
                width: 3024,
                height: 1964,
                productLabel: "Syngenta · Plataforma Web",
              },
            ],
          },
        ],
      },
      {
        id: "syngenta-mobile",
        label: "Experiencia Mobile",
        description:
          "Secuencia móvil pensada para consulta directa en el campo: ficha técnica de lote, tabla comparativa por ambiente, evidencia fotográfica y audios georreferenciados por punto.",
        blocks: [
          {
            type: "mobile-strip",
            images: [
              {
                id: "p02-syngenta-mobile-mapa-lote",
                src: "/images/proyecto-02-syngenta/mobile/syngenta-mobile-mapa-lote.png",
                alt: "Vista móvil de mapa satelital y ficha técnica del lote",
                title: "Mapa Satelital & Ficha",
                caption: "Cultivo, hectáreas, distancia y densidad.",
                width: 786,
                height: 1704,
                productLabel: "Syngenta · Experiencia Mobile",
                isMobile: true,
              },
              {
                id: "p02-syngenta-mobile-metricas",
                src: "/images/proyecto-02-syngenta/mobile/syngenta-mobile-metricas.png",
                alt: "Tabla móvil de densidad variable y desuniformidad espacial por ambiente",
                title: "Métricas por Ambiente",
                caption: "Desvío estándar, moda y CV % por zona.",
                width: 786,
                height: 1704,
                productLabel: "Syngenta · Experiencia Mobile",
                isMobile: true,
              },
              {
                id: "p02-syngenta-mobile-fotos",
                src: "/images/proyecto-02-syngenta/mobile/syngenta-mobile-fotos.png",
                alt: "Galería móvil de fotos filtrable por punto 1, 2, 3",
                title: "Fotos por Punto",
                caption: "Evidencia visual filtrada por punto (1, 2, 3).",
                width: 786,
                height: 1704,
                productLabel: "Syngenta · Experiencia Mobile",
                isMobile: true,
              },
              {
                id: "p02-syngenta-mobile-audios",
                src: "/images/proyecto-02-syngenta/mobile/syngenta-mobile-audios.png",
                alt: "Reproductor móvil de audios grabados por el técnico en campo",
                title: "Audios de Relevamiento",
                caption: "Notas de voz contextualizadas por lote y punto.",
                width: 786,
                height: 1704,
                productLabel: "Syngenta · Experiencia Mobile",
                isMobile: true,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "scalter",
    tag: "03 / FLOCK IT · SCALTER",
    metadata: "Web Responsive · Bot WhatsApp · Comercio B2B",
    title: "Portal B2B de Pedidos con Validación de CUIT, Alertas de Stock y Bot de WhatsApp",
    summary:
      "Diseño de interfaz web responsive y flujo conversacional en WhatsApp para que clientes B2B de Scalter ingresen con sus credenciales y CUIT habilitante, gestionen pedidos sobre tabla técnica, reciban alertas cuando falta stock y consulten estados en vivo.",
    chips: ["Web Responsive", "Bot WhatsApp", "Comercio B2B"],
    cover: {
      id: "p03-scalter-web-panel",
      src: "/images/proyecto-03-scalter/web/scalter-web-panel-pedidos.png",
      alt: "Panel de Gestión de Pedidos B2B en Scalter",
      title: "Scalter — Gestión de Pedidos B2B",
      caption:
        "Tabla responsive de artículos con especificaciones técnicas (Color, Ancho, Gramaje, Largo, Rollos).",
      width: 2560,
      height: 1600,
      productLabel: "Scalter · Portal Web B2B",
    },
    challenge:
      "Reemplazar la toma manual de pedidos industriales con múltiples variables técnicas (tipo, código, color, gramaje, ancho y rollos) mediante un portal ágil habilitado por CUIT que previene errores de disponibilidad y convive fluidamente con el canal de WhatsApp.",
    roleContributions: [
      "Diseño del flujo de ingreso seguro con credenciales y validación de CUIT habilitante para operar sobre la tabla comercial de pedidos.",
      "Diseño de modales de carga rápida con cálculo dinámico del total y mensajes preventivos claros cuando un artículo o color seleccionado no cuenta con stock disponible.",
      "Diseño conversacional del Bot de WhatsApp para consulta de stock, seguimiento en producción y derivación automática al Asistente Web en pedidos de +3 artículos.",
    ],
    impact:
      "Estandarización de la carga de pedidos B2B sin fricción entre canales, eliminando idas y vueltas por falta de stock antes de confirmar la orden.",
    designStack: ["Figma", "Responsive Design", "Conversational UX", "UX Writing", "Flujos B2B"],
    tabs: [
      {
        id: "scalter-web",
        label: "Portal Web B2B",
        description:
          "Portal responsive de autoservicio comercial: validación por CUIT habilitado, tabla de pedidos, cálculo de importes, alertas de stock no disponible y confirmación final.",
        blocks: [
          {
            type: "pair",
            images: [
              {
                id: "p03-scalter-web-cuit",
                src: "/images/proyecto-03-scalter/web/scalter-web-validacion-cuit.png",
                alt: "Portal de clientes con validación de CUIT habilitado",
                title: "Validación de CUIT Habilitante",
                caption: "Control inmediato de CUIT inválido o no registrado antes de operar.",
                width: 2560,
                height: 1600,
                productLabel: "Scalter · Portal Web B2B",
              },
              {
                id: "p03-scalter-web-panel-hero",
                src: "/images/proyecto-03-scalter/web/scalter-web-panel-pedidos.png",
                alt: "Tabla de Gestión de Pedidos Scalter con especificaciones de rollos",
                title: "Tabla Principal de Gestión de Pedidos",
                caption:
                  "Vista limpia de artículos cargados con parámetros técnicos (Color, Ancho, Gramaje, Largo, Rollos).",
                width: 2560,
                height: 1600,
                productLabel: "Scalter · Portal Web B2B",
              },
            ],
          },
          {
            type: "pair",
            images: [
              {
                id: "p03-scalter-web-cargar",
                src: "/images/proyecto-03-scalter/web/scalter-web-cargar-articulo.png",
                alt: "Modal para cargar nuevo artículo con cálculo dinámico del total",
                title: "Carga de Artículo & Cálculo Total",
                caption:
                  "Selección por tipo, código, color y kilos con actualización de total en vivo.",
                width: 2560,
                height: 1942,
                productLabel: "Scalter · Portal Web B2B",
              },
              {
                id: "p03-scalter-web-sin-stock",
                src: "/images/proyecto-03-scalter/web/scalter-web-error-sin-stock.png",
                alt: "Mensaje de alerta cuando el producto elegido no está disponible",
                title: "Alerta Preventiva de Stock",
                caption:
                  "Feedback claro y bloqueo de carga cuando la variante elegida no está disponible.",
                width: 2560,
                height: 1942,
                productLabel: "Scalter · Portal Web B2B",
              },
            ],
          },
          {
            type: "hero",
            image: {
              id: "p03-scalter-web-finalizar",
              src: "/images/proyecto-03-scalter/web/scalter-web-finalizar-pedido.png",
              alt: "Modal de cierre de pedido con campo de comentario opcional",
              title: "Finalización de Pedido",
              caption: "Confirmación directa con campo opcional de observaciones comerciales.",
              width: 2560,
              height: 1600,
              productLabel: "Scalter · Portal Web B2B",
            },
          },
        ],
      },
      {
        id: "scalter-bot-mobile",
        label: "Bot WhatsApp & Mobile",
        description:
          "Ecosistema omnicanal que conecta la validación de CUIT en WhatsApp, la derivación inteligente al Asistente Web para pedidos masivos y la experiencia móvil responsive.",
        blocks: [
          {
            type: "mobile-strip",
            images: [
              {
                id: "p03-scalter-bot-menu",
                src: "/images/proyecto-03-scalter/mobile-bot/scalter-bot-menu-cuit.png",
                alt: "Bot de WhatsApp validando CUIT y mostrando menú de 4 opciones",
                title: "Validación CUIT en Chat",
                caption: "Menú guiado para pedidos, stock y estado.",
                width: 780,
                height: 1688,
                productLabel: "Scalter · Bot WhatsApp",
                isMobile: true,
              },
              {
                id: "p03-scalter-bot-web-link",
                src: "/images/proyecto-03-scalter/mobile-bot/scalter-bot-derivacion-web.png",
                alt: "Derivación automática desde WhatsApp hacia el portal web para +3 artículos",
                title: "Puente a Asistente Web",
                caption: "Derivación directa al portal en pedidos +3 ítems.",
                width: 780,
                height: 1688,
                productLabel: "Scalter · Bot WhatsApp",
                isMobile: true,
              },
              {
                id: "p03-scalter-mobile-cargar",
                src: "/images/proyecto-03-scalter/mobile-bot/scalter-mobile-cargar-articulo.png",
                alt: "Adaptación móvil responsive de la tabla de pedidos y alta de artículo",
                title: "Portal Web en Mobile",
                caption: "Tabla en tarjetas apiladas y alta con totales.",
                width: 750,
                height: 3212,
                productLabel: "Scalter · Web Mobile",
                isMobile: true,
                isLong: true,
              },
              {
                id: "p03-scalter-bot-estado",
                src: "/images/proyecto-03-scalter/mobile-bot/scalter-bot-estado-pedido.png",
                alt: "Consulta del estado de pedido en producción desde WhatsApp",
                title: "Seguimiento en Tiempo Real",
                caption: "Consulta instantánea de orden en producción.",
                width: 780,
                height: 1688,
                productLabel: "Scalter · Bot WhatsApp",
                isMobile: true,
              },
            ],
          },
        ],
      },
    ],
  },
];

export const portfolioCases: PortfolioCase[] = [
  {
    id: "bodega-tierras-altas",
    overline: "CASO DE ESTUDIO · UX/UI & DIRECCIÓN DE ARTE",
    title: "Bodega Tierras Altas — Rediseño Web & Experiencia Digital",
    description:
      "Rediseño integral de la experiencia digital para una bodega mendocina de enoturismo y alta gama. Arquitectura enfocada en la reserva de visitas guiadas y almuerzos (Restaurante Juana María), catálogo interactivo de vinos (Insignia 2018), testimonios de visitantes y dirección de arte editorial de alto contraste.",
    tags: ["#Rediseño_Web", "#Enoturismo", "#UI_Editorial", "#Arquitectura_IA", "#Figma"],
    cover: {
      id: "pf01-bodega-cover",
      src: "/images/portfolio-01-bodega/bodega-tierras-altas-cover.jpg",
      alt: "Portada del rediseño web de Bodega Tierras Altas — Experiencia en Bodega",
      title: "Bodega Tierras Altas — Portada",
      caption: "Hero principal enfocado en enoturismo y reserva directa de experiencias.",
      width: 1600,
      height: 1000,
      productLabel: "Portfolio · Bodega Tierras Altas",
    },
    fullpage: {
      id: "pf01-bodega-fullpage",
      src: "/images/portfolio-01-bodega/bodega-tierras-altas-fullpage.jpg",
      alt: "Landing completa del rediseño web de Bodega Tierras Altas",
      title: "Bodega Tierras Altas — Landing Completa",
      caption:
        "Recorrido completo: Experiencia en Bodega, Legado Vitivinícola, Visitas y Restaurante, Catálogo de Vinos y Reseñas.",
      width: 1440,
      height: 5829,
      productLabel: "Portfolio · Bodega Tierras Altas",
      isLong: true,
    },
    behanceUrl: "https://www.behance.net/gallery/258217419/Caso-Rediseno-Web-Experiencia-Digital",
  },
];

export const experienceList: ExperienceEntry[] = [
  {
    id: "flock-it",
    period: "2023 — Actualidad",
    company: "Flock IT",
    subtitle: "Laboratorio de innovación tecnológica · Remoto",
    role: "Diseñador UX/UI · UX Researcher · UX Writer",
    description:
      "Diseñador a cargo en squads multidisciplinarios (Core Pods de 5 integrantes: Frontend, Backend, UX/UI, QA y PM). Liderazgo de diseño en estrecha co-creación con Product Management, estimación de tareas en Jira, ceremonias Scrum y facilitación de discovery directo con clientes.",
    tags: ["Atomic Design", "Scrum Dailies", "Discovery Clientes", "Consolas ABM"],
  },
  {
    id: "freelance",
    period: "2016 — 2023",
    company: "Consultoría Independiente",
    subtitle: "Profesional Independiente / Freelance",
    role: "Diseñador Industrial & Comunicación Visual",
    description:
      "Desarrollo de productos físicos, mobiliario custom a medida (escritorios, librerías, repisas), modelado CAD paramétrico tridimensional y desarrollo de identidad visual (logotipos, manuales de marca y piezas gráficas digitales e impresas) para clientes particulares e instituciones.",
    tags: ["Modelado 3D", "SolidWorks", "Ergonomía", "Branding", "Illustrator"],
  },
  {
    id: "casino-arena",
    period: "2013 — 2024 (11 años)",
    company: "Casino Arena Maipú",
    subtitle: "Complejo Hotelero y de Entretenimiento · Mendoza",
    role: "Operaciones de Salón · Manejo de Caja & Fidelización VIP",
    description:
      "Más de una década interactuando cara a cara con miles de perfiles en escenarios de alta carga emocional y ritmo exigente. Arqueo y custodia de valores con exactitud matemática, liderazgo operativo de turnos, resolución inmediata de conflictos y fidelización de clientes VIP.",
    tags: [
      "Empatía Cara a Cara",
      "Templanza bajo Presión",
      "Resolución de Conflictos",
      "Cero Error en Caja",
    ],
  },
];

export const educationData: EducationEntry[] = [
  {
    id: "uncuyo",
    institution: "Universidad Nacional de Cuyo (UNCuyo)",
    degree: "Diseñador Industrial (Título Universitario de Grado)",
    period: "2009 — 2018",
    highlight: "Graduado con Diploma",
    details: [
      "Metodología proyectual, investigación empírica de campo, ergonomía física y cognitiva, análisis morfológico y viabilidad constructiva.",
    ],
  },
  {
    id: "coderhouse",
    institution: "Coderhouse",
    degree: "Ciclo Integral de Especialización UX/UI",
    period: "2024 — 2025",
    highlight: "",
    details: [
      "Diseñador UX/UI Avanzado (Design Systems, Variables, Developer Handoff)",
      "Curso de UX Writing (Microcopy, Tone & Voice, Diseño Conversacional)",
      "UX Research (Entrevistas, Triangulación de datos, Discovery)",
      "Diseñador UX/UI (Ciclo completo de producto, User Flows, Figma)",
    ],
  },
];

export const stackCategories: StackCategory[] = [
  {
    id: "design-systems",
    title: "Diseño Digital & Sistemas",
    items: [
      "Figma",
      "FigJam",
      "Atomic Design",
      "Design Tokens",
      "Wireframing",
      "Prototipado Interactivo",
      "UX Writing",
      "Design Thinking",
    ],
  },
  {
    id: "agile",
    title: "Metodologías Ágiles & Gestión",
    items: [
      "Jira (Story points)",
      "Scrum Dailies & Sprints",
      "Refinamiento Técnico",
      "Sprint Reviews",
      "Notion",
      "Slack",
    ],
  },
  {
    id: "ai",
    title: "Inteligencia Artificial",
    items: [
      "Claude",
      "ChatGPT",
      "Gemini",
      "NotebookLM",
      "Antigravity Agente",
      "Antigravity IDE",
      "MCP",
      "Skills",
      "Agentes",
    ],
  },
  {
    id: "industrial-graphics",
    title: "Diseño Industrial, 3D & Gráfica",
    items: [
      "SolidWorks",
      "Autodesk Inventor",
      "AutoCAD",
      "KeyShot",
      "Adobe Illustrator",
      "Adobe Photoshop",
      "Impresión 3D",
    ],
  },
];
