import type { Locale } from "@/components/providers/AppPreferencesProvider";

export const uiCopy = {
  es: {
    nav: {
      ariaLabel: "Navegación principal",
      locationAriaLabel: "Ubicación de Mendoza",
      items: [
        { label: "[ 01 TRABAJO ]", mobileLabel: "01 / TRABAJO", href: "#proyectos" },
        { label: "[ 02 CASO ]", mobileLabel: "02 / CASO", href: "#portfolio" },
        { label: "[ 03 TRAYECTORIA ]", mobileLabel: "03 / TRAYECTORIA", href: "#experiencia" },
        { label: "[ 04 CONTACTO ]", mobileLabel: "04 / CONTACTO", href: "#contacto" },
      ],
      downloadCv: "Descargar CV",
      downloadingCv: "Generando PDF...",
      cvDownloaded: "CV descargado",
      cvError: "Error al descargar",
      letsTalk: "Hablemos",
      openMenu: "Abrir menú",
      closeMenu: "Cerrar menú",
      menuLabel: "Menú de navegación",
      themeLabel: "Apariencia",
      switchToDark: "Cambiar a tema oscuro",
      switchToLight: "Cambiar a tema claro",
      lightName: "Claro",
      darkName: "Oscuro",
      languageLabel: "Idioma",
      switchLanguageAria: "Cambiar idioma entre Español e Inglés",
    },
    hero: {
      quickNavTitle: "Índice de proyectos",
      quickNavAria: "Índice rápido de proyectos",
      pipelineLabels: ["ESTRATEGIA", "DISEÑO", "ENTREGA"] as const,
      pipelineTitle: "Proceso de producto: Estrategia, Diseño y Entrega",
      pipelineDesc:
        "Diagrama isométrico animado que recorre tres etapas en línea: estrategia, diseño y entrega.",
    },
    projects: {
      sectionOverline: "01 / PROYECTOS SELECCIONADOS",
      sectionTitle: "Trabajo en Producción",
      expandPreview: "Ampliar vista",
      expandCoverAria: (title: string) => `Ampliar portada de ${title}`,
      exploreCase: "Explorar caso de estudio",
      hideCase: "Ocultar caso de estudio",
      hideCaseAria: (title: string) => `Ocultar caso de estudio de ${title}`,
      challengeHeading: "El Desafío",
      roleHeading: "Aportes y Rol de Alex",
      impactHeading: "Impacto y Resultado",
      stackHeading: "Stack de Diseño",
      galleryHeading: "Galería del Ecosistema",
      tabsAria: (title: string) => `Pantallas de ${title}`,
    },
    portfolio: {
      overline: "02 / PORTFOLIO · CASO DESTACADO",
      title: "Bodega Tierras Altas",
      subtitle: "Rediseño Web & Experiencia Digital Vitivinícola",
      expandPreview: "Ampliar vista",
      expandLandingAria: (title: string) => `Ver landing completa de ${title}`,
      viewBehance: "Ver caso completo en Behance",
      exploreFullLanding: "Explorar landing completa",
    },
    experience: {
      overline: "03 / TRAYECTORIA PROFESIONAL",
      title: "Experiencia",
      subtitle:
        "Experiencia en squads ágiles, consultoría independiente y operaciones de alto ritmo.",
    },
    education: {
      overline: "04 / FORMACIÓN ACADÉMICA & STACK TÉCNICO",
      title: "Formación & Herramientas",
    },
    footer: {
      overline: "05 / CONTACTO & CONEXIÓN DIRECTA",
      headline: "Construyamos algo con sentido.",
    },
    lightbox: {
      prevAria: "Captura anterior",
      nextAria: "Siguiente captura",
      prevLabel: "Anterior",
      nextLabel: "Siguiente",
      closeAria: "Cerrar vista ampliada",
    },
    gallery: {
      expandAria: (title: string) => `Ampliar ${title}`,
    },
    scrollTop: {
      ariaLabel: "Volver al inicio",
    },
  },
  en: {
    nav: {
      ariaLabel: "Primary navigation",
      locationAriaLabel: "Mendoza location",
      items: [
        { label: "[ 01 WORK ]", mobileLabel: "01 / WORK", href: "#proyectos" },
        { label: "[ 02 CASE ]", mobileLabel: "02 / CASE", href: "#portfolio" },
        { label: "[ 03 EXPERIENCE ]", mobileLabel: "03 / EXPERIENCE", href: "#experiencia" },
        { label: "[ 04 CONTACT ]", mobileLabel: "04 / CONTACT", href: "#contacto" },
      ],
      downloadCv: "Download CV",
      downloadingCv: "Generating PDF...",
      cvDownloaded: "CV downloaded",
      cvError: "Download failed",
      letsTalk: "Let's talk",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      menuLabel: "Navigation menu",
      themeLabel: "Appearance",
      switchToDark: "Switch to dark theme",
      switchToLight: "Switch to light theme",
      lightName: "Light",
      darkName: "Dark",
      languageLabel: "Language",
      switchLanguageAria: "Switch language between Spanish and English",
    },
    hero: {
      quickNavTitle: "Project Index",
      quickNavAria: "Quick project index",
      pipelineLabels: ["STRATEGY", "DESIGN", "DELIVERY"] as const,
      pipelineTitle: "Product workflow: Strategy, Design, and Delivery",
      pipelineDesc:
        "Animated isometric diagram moving across three connected stages: strategy, design, and delivery.",
    },
    projects: {
      sectionOverline: "01 / SELECTED PROJECTS",
      sectionTitle: "Production Work",
      expandPreview: "Expand view",
      expandCoverAria: (title: string) => `Expand cover of ${title}`,
      exploreCase: "Explore case study",
      hideCase: "Hide case study",
      hideCaseAria: (title: string) => `Hide case study for ${title}`,
      challengeHeading: "The Challenge",
      roleHeading: "Alex's Role & Contributions",
      impactHeading: "Impact & Outcome",
      stackHeading: "Design Stack",
      galleryHeading: "Ecosystem Gallery",
      tabsAria: (title: string) => `Screens for ${title}`,
    },
    portfolio: {
      overline: "02 / PORTFOLIO · FEATURED CASE",
      title: "Bodega Tierras Altas",
      subtitle: "Web Redesign & Digital Wine Tourism Experience",
      expandPreview: "Expand view",
      expandLandingAria: (title: string) => `View full landing page for ${title}`,
      viewBehance: "View full case on Behance",
      exploreFullLanding: "Explore full landing",
    },
    experience: {
      overline: "03 / CAREER PATH",
      title: "Experience",
      subtitle:
        "Experience across agile product squads, independent consulting, and fast-paced operations.",
    },
    education: {
      overline: "04 / ACADEMIC BACKGROUND & TECH STACK",
      title: "Education & Tools",
    },
    footer: {
      overline: "05 / CONTACT & DIRECT REACH",
      headline: "Let's build something meaningful.",
    },
    lightbox: {
      prevAria: "Previous capture",
      nextAria: "Next capture",
      prevLabel: "Previous",
      nextLabel: "Next",
      closeAria: "Close expanded view",
    },
    gallery: {
      expandAria: (title: string) => `Expand ${title}`,
    },
    scrollTop: {
      ariaLabel: "Back to top",
    },
  },
} as const;

export function getUiCopy(locale: Locale) {
  return uiCopy[locale];
}
