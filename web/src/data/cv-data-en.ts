import type { Locale } from "@/components/providers/AppPreferencesProvider";
import {
  educationData as educationDataEs,
  experienceList as experienceListEs,
  heroData as heroDataEs,
  personalInfo as personalInfoEs,
  portfolioCases as portfolioCasesEs,
  stackCategories as stackCategoriesEs,
  stickyProjects as stickyProjectsEs,
  type EducationEntry,
  type ExperienceEntry,
  type PortfolioCase,
  type StackCategory,
  type StickyProject,
} from "@/data/cv-data";

const personalInfoEn = {
  ...personalInfoEs,
  roleTitle: "Industrial Designer · UX/UI Designer",
  availability: "Available",
};

const heroDataEn = {
  overline: "00 / DESIGN APPROACH & PRODUCT",
  headlineLines: [
    "UX/UI & Digital",
    "Product Design.",
  ],
  bio: "UX/UI Designer holding a degree in Industrial Design from UNCuyo. I lead end-to-end product design within agile squads—from user research and direct client discovery to scalable design system architecture.",
  specialtyChips: [
    "Atomic Design & Design Systems in Figma",
    "Multi-product ecosystems & CRUD consoles",
    "UX Research & Conversational UX Writing",
    "Agile Scrum workflows in Core Pods",
  ],
};

const stickyProjectsEn: StickyProject[] = [
  {
    id: "advanta",
    tag: "01 / FLOCK IT · ADVANTA",
    metadata: "MVP Phase 2 (1 Year) · 5-Person Squad (Core Pod) · Daily Scrum",
    title: "Multi-Product Digital Ecosystem for Loyalty, Document Management & Assistance",
    summary:
      "End-to-end UX/UI design leadership orchestrating Advanta's digital ecosystem: Loyalty Club (web loyalty, self-service & backoffice), anti-silo Document Library, Conversational Chatbot, and its administrative console.",
    chips: ["MVP Phase 2 (1 Year)", "5-Person Squad (Core Pod)", "Daily Scrum"],
    cover: {
      id: "p01-club-loyalty-desktop",
      src: "/images/proyecto-01-advanta/club-advanta/club-advanta-loyalty-desktop.png",
      alt: "Club Advanta Web Loyalty Landing — Plant Advanta, Harvest Benefits",
      title: "Club Advanta — Web Loyalty Landing",
      caption:
        "Growers' first touchpoint with the ecosystem: value proposition, membership tiers, and registration form.",
      width: 1282,
      height: 5098,
      productLabel: "Advanta · Club Advanta",
      isLong: true,
    },
    challenge:
      "Unify multiple independent products under a single brand and permissions architecture serving different user tiers (Growers, Distributors, and Administrators), eliminating information silos and operational friction across invoice uploads, reward redemption, and technical inquiries.",
    roleContributions: [
      "Sole UX/UI designer inside a multidisciplinary Core Pod (Frontend, Backend, QA, and PM), participating in daily standups, technical refinements, and Jira estimations.",
      "Design System governance using Atomic Design in Figma, bridging Club Advanta's dark mode with the high tabular density of Document Library and Backoffice.",
      "Designed hierarchical role & permission matrices, conversational flows for the assisted chatbot, and actionable microcopy across validations and modals.",
    ],
    impact:
      "Sustained engagement across a ~1-year continuous cycle leading to the MVP Phase 2 launch, with five interconnected solutions operating in visual and functional harmony.",
    designStack: ["Figma", "Atomic Design", "Jira", "Scrum", "UX Writing", "Role Architecture"],
    tabs: [
      {
        id: "club-advanta",
        label: "Club Advanta",
        description:
          "Loyalty portal for growers (entry landing, Black-tier self-service profile, and unified login flow) alongside the complete backoffice for users, rewards, and communication metrics.",
        blocks: [
          {
            type: "responsive-showcase",
            desktop: {
              id: "p01-club-loyalty-desktop-showcase",
              src: "/images/proyecto-01-advanta/club-advanta/club-advanta-loyalty-desktop.png",
              alt: "Club Advanta Loyalty Landing on Desktop",
              title: "Club Advanta — Desktop Loyalty Landing",
              caption:
                "Growers' first touchpoint with the ecosystem: value proposition, membership tiers, and registration form.",
              width: 1282,
              height: 5098,
              productLabel: "Advanta · Club Advanta",
              isLong: true,
            },
            mobile: {
              id: "p01-club-loyalty-mobile",
              src: "/images/proyecto-01-advanta/club-advanta/club-advanta-loyalty-mobile.png",
              alt: "Club Advanta Loyalty Landing on Mobile",
              title: "Club Advanta — Mobile Loyalty Landing",
              caption: "Mobile version tailored for quick field registration.",
              width: 393,
              height: 7397,
              productLabel: "Advanta · Club Advanta",
              isMobile: true,
              isLong: true,
            },
            caption:
              "Web & Mobile Loyalty Landing — First touchpoint, membership tiers, and sign-up form (\"Join the Club\").",
          },
          {
            type: "pair",
            images: [
              {
                id: "p01-club-login",
                src: "/images/proyecto-01-advanta/club-advanta/club-advanta-login.png",
                alt: "Shared login screen for growers and administrators",
                title: "Unified Login & Password Recovery",
                caption:
                  "Shared authentication and password recovery spanning grower accounts and admin consoles.",
                width: 2560,
                height: 1600,
                productLabel: "Advanta · Club Advanta",
              },
              {
                id: "p01-club-perfil-black",
                src: "/images/proyecto-01-advanta/club-advanta/club-advanta-perfil-black.png",
                alt: "Black-tier grower profile with bag progress and invoice history",
                title: "Grower Profile (Black Tier)",
                caption:
                  "Grower self-service view tracking validated seed bags and invoice history.",
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
              alt: "Admin user backoffice with KPIs and registration table",
              title: "Admin Console — Users & Metrics",
              caption:
                "User backoffice with tier KPIs (Member, Partner, Silver, Black), filters, and bulk credential resend.",
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
                alt: "Rewards management CRUD table in Club Advanta Backoffice",
                title: "Benefits Center (CRUD)",
                caption: "CRUD benefits table tracking stock, validity dates, segment, and status.",
                width: 2560,
                height: 1604,
                productLabel: "Advanta · Club Advanta",
              },
              {
                id: "p01-club-admin-beneficio-preview",
                src: "/images/proyecto-01-advanta/club-advanta/club-advanta-admin-beneficio-preview.png",
                alt: "Front and back preview of a new benefit campaign",
                title: "Benefit Card Preview (Front / Back)",
                caption: "Interactive preview before publishing to the loyalty web portal.",
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
              alt: "Campaign analytics and communications sent by segment",
              title: "Communications Metrics",
              caption:
                "Delivery breakdown by segment, traceability logs, and error detection.",
              width: 2560,
              height: 1744,
              productLabel: "Advanta · Club Advanta",
            },
          },
        ],
      },
      {
        id: "biblioteca-advanta",
        label: "Advanta Library",
        description:
          "Corporate document manager engineered to eliminate departmental silos: folder hierarchy, integrated technical sheet viewer, Public/Private controls, and role-based filtering.",
        blocks: [
          {
            type: "hero",
            image: {
              id: "p01-biblio-explorador",
              src: "/images/proyecto-01-advanta/biblioteca/biblioteca-explorador.png",
              alt: "Hierarchical folder and file explorer in Advanta Library",
              title: "Hierarchical Explorer & Privacy",
              caption: "Season/crop directory tree with Public or Private visibility controls.",
              width: 2600,
              height: 1612,
              productLabel: "Advanta · Document Library",
            },
          },
          {
            type: "pair",
            images: [
              {
                id: "p01-biblio-filtros-roles",
                src: "/images/proyecto-01-advanta/biblioteca/biblioteca-filtros-roles.png",
                alt: "Quick filters by Distributor or Grower role and tags",
                title: "Quick Role Filters & Tags",
                caption:
                  "Fast segmentation by access level (Distributor / Grower) and technical taxonomy.",
                width: 2600,
                height: 1612,
                productLabel: "Advanta · Document Library",
              },
              {
                id: "p01-biblio-visor-pdf",
                src: "/images/proyecto-01-advanta/biblioteca/biblioteca-visor-pdf.png",
                alt: "Embedded technical document viewer inside Advanta Library",
                title: "Integrated Document Viewer",
                caption:
                  "Direct reading of manuals and agronomy notes with tags, link sharing, and download.",
                width: 2600,
                height: 1612,
                productLabel: "Advanta · Document Library",
              },
            ],
          },
        ],
      },
      {
        id: "bo-del-bot",
        label: "Bot Backoffice",
        description:
          "Backoffice console for managing authorized distributors, advisors, and administrators within the conversational assistant, alongside the WhatsApp Campaigns module to track metrics, configure campaigns with conditional validations, and import approved recipients with transparent cost estimates.",
        blocks: [
          {
            type: "hero",
            image: {
              id: "p01-bobot-distribuidores",
              src: "/images/proyecto-01-advanta/bo-del-bot/bo-bot-distribuidores.png",
              alt: "CRUD table of 300 distributors in Bot Backoffice",
              title: "Distributor CRUD Console",
              caption:
                "Management of 300 distributors by tax ID and region with Active/Inactive states and CSV export.",
              width: 2600,
              height: 1764,
              productLabel: "Advanta · Bot Backoffice",
            },
          },
          {
            type: "pair",
            images: [
              {
                id: "p01-bobot-administradores",
                src: "/images/proyecto-01-advanta/bo-del-bot/bo-bot-administradores.png",
                alt: "Table of authorized administrators in Bot Backoffice",
                title: "Administrator Management",
                caption: "Directory, email search, and administrative access control.",
                width: 2600,
                height: 1616,
                productLabel: "Advanta · Bot Backoffice",
              },
              {
                id: "p01-bobot-nuevo-admin",
                src: "/images/proyecto-01-advanta/bo-del-bot/bo-bot-nuevo-admin.png",
                alt: "Modal for adding a new administrator with password rules",
                title: "Guided Admin Creation",
                caption: "Modal form with real-time password policy validation.",
                width: 2600,
                height: 1612,
                productLabel: "Advanta · Bot Backoffice",
              },
            ],
          },
          {
            type: "hero",
            image: {
              id: "p01-bobot-campanas-listado",
              src: "/images/proyecto-01-advanta/bo-del-bot/bo-bot-campanas-listado.png",
              alt: "WhatsApp Campaigns overview dashboard with balance KPIs, sent messages, active campaigns, and status table",
              title: "WhatsApp Campaigns — Overview & Metrics",
              caption:
                "Main dashboard tracking available balance, messages sent, \"Yes\" response rate, global opt-out list, filters, and a table spanning 7 lifecycle states.",
              width: 2600,
              height: 1572,
              productLabel: "Advanta · Bot Backoffice · WhatsApp Campaigns",
            },
          },
          {
            type: "pair",
            images: [
              {
                id: "p01-bobot-campana-crear-base",
                src: "/images/proyecto-01-advanta/bo-del-bot/bo-bot-campana-crear-base.png",
                alt: "Create new WhatsApp campaign form with interactive Yes/No bot reply configuration",
                title: "Campaign Creation (Interactive Flow)",
                caption:
                  "Four-section form covering basic details, optional flyer upload, 1024-character message composer, and automated Yes/No bot responses.",
                width: 2560,
                height: 2774,
                isLong: true,
                productLabel: "Advanta · Bot Backoffice · WhatsApp Campaigns",
              },
              {
                id: "p01-bobot-campana-error-flyer",
                src: "/images/proyecto-01-advanta/bo-del-bot/bo-bot-campana-error-flyer.png",
                alt: "Validation error state when uploading an invalid flyer and optional fallback email input",
                title: "File Validation & Fallback Routing",
                caption:
                  "Preventive upload error for unsupported formats or sizes over 5 MB (JPG/PNG) paired with an optional fallback email when no sales rep covers a zone.",
                width: 2560,
                height: 2958,
                isLong: true,
                productLabel: "Advanta · Bot Backoffice · WhatsApp Campaigns",
              },
            ],
          },
          {
            type: "pair",
            images: [
              {
                id: "p01-bobot-campana-informativa",
                src: "/images/proyecto-01-advanta/bo-del-bot/bo-bot-campana-informativa.png",
                alt: "Informative campaign variant showing uploaded flyer preview and disabled bot section",
                title: "Informative Variant & Flyer Preview",
                caption:
                  "Attached asset preview with replace/remove controls and conditional logic that disables bot auto-replies for purely informative campaigns.",
                width: 2560,
                height: 2922,
                isLong: true,
                productLabel: "Advanta · Bot Backoffice · WhatsApp Campaigns",
              },
              {
                id: "p01-bobot-campana-modal-borrador",
                src: "/images/proyecto-01-advanta/bo-del-bot/bo-bot-campana-modal-borrador.png",
                alt: "Confirmation modal to save a WhatsApp campaign as draft",
                title: "Save Draft Confirmation Modal",
                caption:
                  "Safeguard modal letting admins pause creation and resume editing, upload recipients, or submit for approval later.",
                width: 2560,
                height: 2922,
                isLong: true,
                productLabel: "Advanta · Bot Backoffice · WhatsApp Campaigns",
              },
            ],
          },
          {
            type: "pair",
            images: [
              {
                id: "p01-bobot-campana-carga-destinatarios",
                src: "/images/proyecto-01-advanta/bo-del-bot/bo-bot-campana-carga-destinatarios.png",
                alt: "Step 1 recipient upload for an approved campaign with Excel template and CSV dropzone",
                title: "Approved Campaign — Recipient Upload",
                caption:
                  "Step 1 after commercial approval with a downloadable .xlsx template, .xlsx/.csv upload up to 10 MB, and prefix normalization / opt-out notice.",
                width: 2560,
                height: 2276,
                isLong: true,
                productLabel: "Advanta · Bot Backoffice · WhatsApp Campaigns",
              },
              {
                id: "p01-bobot-campana-revision-costos",
                src: "/images/proyecto-01-advanta/bo-del-bot/bo-bot-campana-revision-costos.png",
                alt: "Step 2 validation summary with excluded numbers export, batch sending policy, and Meta/Twilio cost estimator",
                title: "Validation, Cost Estimate & Confirmation",
                caption:
                  "Step 2 summarizing valid, opted-out, and invalid rows with CSV export, batched sending policy to protect Meta quality rating, and Meta + Twilio cost breakdown.",
                width: 2560,
                height: 2642,
                isLong: true,
                productLabel: "Advanta · Bot Backoffice · WhatsApp Campaigns",
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
    metadata: "Native Mobile (iOS/Android) · Responsive Web · Data Visualization",
    title: "Zone-Based Interactive Reports, Multimodal Field Scouting & Grower Delivery",
    summary:
      "Web and mobile solution for agricultural technicians and growers focused on zone-based weed scouting (geotagged photos, audio notes, and comments), real-time agronomy analysis, and interactive report sharing.",
    chips: ["Native Mobile (iOS/Android)", "Responsive Web", "Data Visualization"],
    cover: {
      id: "p02-syngenta-web-malezas",
      src: "/images/proyecto-02-syngenta/web/syngenta-web-informe-malezas.png",
      alt: "Syngenta interactive report with zoned satellite map and weed metrics",
      title: "Syngenta — Zoned Interactive Web Report",
      caption:
        "Zoned satellite map with sampling points, circular KPIs, and weed & pest cards.",
      width: 3024,
      height: 1964,
      productLabel: "Syngenta · Web Platform",
    },
    challenge:
      "Translate dense agronomic field measurements (achieved density, spatial/temporal non-uniformity, weeds, and pests per zone) into actionable visual reports technicians can assemble quickly and growers can review on their phone right in the field.",
    roleContributions: [
      "Conducted end-user interviews and discovery paired directly with the Product Manager to map field technicians' pain points.",
      "Designed information architecture for high-density web analytics combining an interactive satellite map, sampling pins, notes, photo galleries, and audio clips.",
      "Crafted a tab-optimized mobile experience for reviewing planting sheets, zone tables, photos, and voice notes recorded per sampling point.",
    ],
    impact:
      "Significantly reduced cognitive load when interpreting planting deviations and weed pressure, streamlining selective delivery of complete field visits to growers.",
    designStack: ["Figma", "PM Discovery", "Data Visualization", "Responsive UI", "Mobile UX"],
    tabs: [
      {
        id: "syngenta-web",
        label: "Web Platform",
        description:
          "Split view pairing a satellite map with an analytics panel featuring circular gauges, multimedia field logging, and a visit selection flow for report sharing.",
        blocks: [
          {
            type: "hero",
            image: {
              id: "p02-syngenta-web-malezas-hero",
              src: "/images/proyecto-02-syngenta/web/syngenta-web-informe-malezas.png",
              alt: "Syngenta web report with field heatmap, sampling points 1-2-3, and KPIs",
              title: "Zoned Map & Agronomic Analytics",
              caption:
                "Satellite map with sampling pins (1, 2, 3), circular KPIs (98% Target, 32% CV), and weed & pest cards.",
              width: 3024,
              height: 1964,
              productLabel: "Syngenta · Web Platform",
            },
          },
          {
            type: "pair",
            images: [
              {
                id: "p02-syngenta-web-comentarios-fotos",
                src: "/images/proyecto-02-syngenta/web/syngenta-web-comentarios-fotos.png",
                alt: "Field visit comments, photo gallery, and scouting audio recordings",
                title: "Multimodal Field Scouting",
                caption:
                  "Technical visit log uniting field notes, plot photo gallery, and audio tracks.",
                width: 3024,
                height: 1964,
                productLabel: "Syngenta · Web Platform",
              },
              {
                id: "p02-syngenta-web-compartir-lotes",
                src: "/images/proyecto-02-syngenta/web/syngenta-web-compartir-lotes.png",
                alt: "Modal to select plots and visits to share the report with the grower",
                title: "Report Selection & Delivery",
                caption:
                  "Guided flow to pick completed field visits per plot and share them with growers.",
                width: 3024,
                height: 1964,
                productLabel: "Syngenta · Web Platform",
              },
            ],
          },
        ],
      },
      {
        id: "syngenta-mobile",
        label: "Mobile Experience",
        description:
          "Mobile sequence built for on-site lookup: plot technical sheet, comparative metrics table by zone, photo evidence, and geotagged voice notes per point.",
        blocks: [
          {
            type: "mobile-strip",
            images: [
              {
                id: "p02-syngenta-mobile-mapa-lote",
                src: "/images/proyecto-02-syngenta/mobile/syngenta-mobile-mapa-lote.png",
                alt: "Mobile satellite map and plot technical sheet",
                title: "Satellite Map & Plot Sheet",
                caption: "Crop, hectares, row spacing, and density.",
                width: 786,
                height: 1704,
                productLabel: "Syngenta · Mobile Experience",
                isMobile: true,
              },
              {
                id: "p02-syngenta-mobile-metricas",
                src: "/images/proyecto-02-syngenta/mobile/syngenta-mobile-metricas.png",
                alt: "Mobile table of variable density and spatial non-uniformity by zone",
                title: "Metrics by Zone",
                caption: "Standard deviation, mode, and CV % per zone.",
                width: 786,
                height: 1704,
                productLabel: "Syngenta · Mobile Experience",
                isMobile: true,
              },
              {
                id: "p02-syngenta-mobile-fotos",
                src: "/images/proyecto-02-syngenta/mobile/syngenta-mobile-fotos.png",
                alt: "Mobile photo gallery filterable by sampling point 1, 2, 3",
                title: "Photos by Point",
                caption: "Visual evidence filtered by sampling point (1, 2, 3).",
                width: 786,
                height: 1704,
                productLabel: "Syngenta · Mobile Experience",
                isMobile: true,
              },
              {
                id: "p02-syngenta-mobile-audios",
                src: "/images/proyecto-02-syngenta/mobile/syngenta-mobile-audios.png",
                alt: "Mobile audio player for voice notes recorded by the technician",
                title: "Scouting Voice Notes",
                caption: "Contextual voice notes organized by plot and point.",
                width: 786,
                height: 1704,
                productLabel: "Syngenta · Mobile Experience",
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
    metadata: "Responsive Web · WhatsApp Bot · B2B Commerce",
    title: "B2B Ordering Portal with Tax ID Validation, Stock Alerts & WhatsApp Bot",
    summary:
      "Responsive web interface and conversational WhatsApp flow allowing Scalter's B2B customers to sign in with verified Tax ID (CUIT), manage orders on a technical table, get instant out-of-stock alerts, and check live order status.",
    chips: ["Responsive Web", "WhatsApp Bot", "B2B Commerce"],
    cover: {
      id: "p03-scalter-web-panel",
      src: "/images/proyecto-03-scalter/web/scalter-web-panel-pedidos.png",
      alt: "Scalter B2B Order Management Dashboard",
      title: "Scalter — B2B Order Management",
      caption:
        "Responsive item table with technical specs (Color, Width, GSM, Length, Rolls).",
      width: 2560,
      height: 1600,
      productLabel: "Scalter · B2B Web Portal",
    },
    challenge:
      "Replace manual intake of industrial orders involving multiple technical parameters (type, SKU, color, GSM, width, and roll count) with a fast Tax ID-gated portal that prevents stock mismatches and seamlessly bridges WhatsApp.",
    roleContributions: [
      "Designed secure login and Tax ID (CUIT) validation flow granting verified customers access to the commercial ordering table.",
      "Crafted quick-add modals with live total calculation and clear preventive alerts whenever a selected SKU or color is out of stock.",
      "Designed WhatsApp Bot conversational flows for stock checks, production tracking, and automatic handoff to the Web Assistant on 3+ item orders.",
    ],
    impact:
      "Standardized B2B order intake with zero cross-channel friction, eliminating back-and-forth over stock shortages before order confirmation.",
    designStack: ["Figma", "Responsive Design", "Conversational UX", "UX Writing", "B2B Flows"],
    tabs: [
      {
        id: "scalter-web",
        label: "B2B Web Portal",
        description:
          "Responsive B2B self-service portal: verified Tax ID validation, order table, live total calculation, out-of-stock alerts, and final checkout confirmation.",
        blocks: [
          {
            type: "pair",
            images: [
              {
                id: "p03-scalter-web-cuit",
                src: "/images/proyecto-03-scalter/web/scalter-web-validacion-cuit.png",
                alt: "Customer portal with authorized Tax ID validation",
                title: "Authorized Tax ID Validation",
                caption: "Immediate check for invalid or unregistered Tax IDs before ordering.",
                width: 2560,
                height: 1600,
                productLabel: "Scalter · B2B Web Portal",
              },
              {
                id: "p03-scalter-web-panel-hero",
                src: "/images/proyecto-03-scalter/web/scalter-web-panel-pedidos.png",
                alt: "Scalter Order Management table with roll specifications",
                title: "Main Order Management Table",
                caption:
                  "Clean overview of added items with technical parameters (Color, Width, GSM, Length, Rolls).",
                width: 2560,
                height: 1600,
                productLabel: "Scalter · B2B Web Portal",
              },
            ],
          },
          {
            type: "pair",
            images: [
              {
                id: "p03-scalter-web-cargar",
                src: "/images/proyecto-03-scalter/web/scalter-web-cargar-articulo.png",
                alt: "Modal to add a new item with dynamic total calculation",
                title: "Item Entry & Live Total",
                caption:
                  "Selection by type, SKU, color, and weight with real-time total updates.",
                width: 2560,
                height: 1942,
                productLabel: "Scalter · B2B Web Portal",
              },
              {
                id: "p03-scalter-web-sin-stock",
                src: "/images/proyecto-03-scalter/web/scalter-web-error-sin-stock.png",
                alt: "Alert banner when the selected product variant is unavailable",
                title: "Preventive Stock Alert",
                caption:
                  "Clear feedback and submission guard when the chosen variant is out of stock.",
                width: 2560,
                height: 1942,
                productLabel: "Scalter · B2B Web Portal",
              },
            ],
          },
          {
            type: "hero",
            image: {
              id: "p03-scalter-web-finalizar",
              src: "/images/proyecto-03-scalter/web/scalter-web-finalizar-pedido.png",
              alt: "Order confirmation modal with optional notes field",
              title: "Order Confirmation",
              caption: "Direct checkout confirmation with an optional commercial notes field.",
              width: 2560,
              height: 1600,
              productLabel: "Scalter · B2B Web Portal",
            },
          },
        ],
      },
      {
        id: "scalter-bot-mobile",
        label: "WhatsApp Bot & Mobile",
        description:
          "Omnichannel ecosystem connecting Tax ID verification in WhatsApp, smart routing to the Web Assistant for bulk orders, and the responsive mobile experience.",
        blocks: [
          {
            type: "mobile-strip",
            images: [
              {
                id: "p03-scalter-bot-menu",
                src: "/images/proyecto-03-scalter/mobile-bot/scalter-bot-menu-cuit.png",
                alt: "WhatsApp bot validating Tax ID and showing a 4-option menu",
                title: "In-Chat Tax ID Check",
                caption: "Guided menu for orders, stock, and status.",
                width: 780,
                height: 1688,
                productLabel: "Scalter · WhatsApp Bot",
                isMobile: true,
              },
              {
                id: "p03-scalter-bot-web-link",
                src: "/images/proyecto-03-scalter/mobile-bot/scalter-bot-derivacion-web.png",
                alt: "Automatic handoff from WhatsApp to the web portal for 3+ item orders",
                title: "Web Assistant Bridge",
                caption: "Direct portal handoff for 3+ item orders.",
                width: 780,
                height: 1688,
                productLabel: "Scalter · WhatsApp Bot",
                isMobile: true,
              },
              {
                id: "p03-scalter-mobile-cargar",
                src: "/images/proyecto-03-scalter/mobile-bot/scalter-mobile-cargar-articulo.png",
                alt: "Mobile responsive adaptation of the order table and item form",
                title: "Mobile Web Portal",
                caption: "Stacked card table and item form with live totals.",
                width: 750,
                height: 3212,
                productLabel: "Scalter · Mobile Web",
                isMobile: true,
                isLong: true,
              },
              {
                id: "p03-scalter-bot-estado",
                src: "/images/proyecto-03-scalter/mobile-bot/scalter-bot-estado-pedido.png",
                alt: "Checking in-production order status from WhatsApp",
                title: "Real-Time Tracking",
                caption: "Instant lookup of orders currently in production.",
                width: 780,
                height: 1688,
                productLabel: "Scalter · WhatsApp Bot",
                isMobile: true,
              },
            ],
          },
        ],
      },
    ],
  },
];

const portfolioCasesEn: PortfolioCase[] = [
  {
    id: "bodega-tierras-altas",
    overline: "CASE STUDY · UX/UI & ART DIRECTION",
    title: "Bodega Tierras Altas — Web Redesign & Digital Experience",
    description:
      "Complete digital redesign for a high-end Mendoza wine tourism estate. Architecture centered on guided tour and lunch bookings (Juana María Restaurant), an interactive wine catalog (Insignia 2018), visitor reviews, and high-contrast editorial art direction.",
    tags: ["#Web_Redesign", "#Wine_Tourism", "#Editorial_UI", "#IA_Architecture", "#Figma"],
    cover: {
      id: "pf01-bodega-cover",
      src: "/images/portfolio-01-bodega/bodega-tierras-altas-cover.jpg",
      alt: "Cover of Bodega Tierras Altas web redesign — Winery Experience",
      title: "Bodega Tierras Altas — Cover",
      caption: "Primary hero focused on wine tourism and direct experience booking.",
      width: 1600,
      height: 1000,
      productLabel: "Portfolio · Bodega Tierras Altas",
    },
    fullpage: {
      id: "pf01-bodega-fullpage",
      src: "/images/portfolio-01-bodega/bodega-tierras-altas-fullpage.jpg",
      alt: "Full landing page of the Bodega Tierras Altas web redesign",
      title: "Bodega Tierras Altas — Full Landing Page",
      caption:
        "Complete walkthrough: Winery Experience, Winemaking Heritage, Tours & Restaurant, Wine Catalog, and Guest Reviews.",
      width: 1440,
      height: 5829,
      productLabel: "Portfolio · Bodega Tierras Altas",
      isLong: true,
    },
    behanceUrl: "https://www.behance.net/gallery/258217419/Caso-Rediseno-Web-Experiencia-Digital",
  },
];

const experienceListEn: ExperienceEntry[] = [
  {
    id: "flock-it",
    period: "2023 — Present",
    company: "Flock IT",
    subtitle: "Technology innovation lab · Remote",
    role: "UX/UI Designer · UX Researcher · UX Writer",
    description:
      "Lead designer across multidisciplinary squads (5-person Core Pods: Frontend, Backend, UX/UI, QA, and PM). Design ownership in close partnership with Product Management, Jira story-point estimation, Scrum ceremonies, and direct client discovery facilitation.",
    tags: ["Atomic Design", "Scrum Dailies", "Client Discovery", "CRUD Consoles"],
  },
  {
    id: "freelance",
    period: "2016 — 2023",
    company: "Independent Consultancy",
    subtitle: "Independent Designer / Freelance",
    role: "Industrial Designer & Visual Communication",
    description:
      "Physical product development, bespoke custom furniture (desks, shelving, bookcases), parametric 3D CAD modeling, and visual identity systems (logos, brand guidelines, and digital/print collateral) for private clients and institutions.",
    tags: ["3D Modeling", "SolidWorks", "Ergonomics", "Branding", "Illustrator"],
  },
  {
    id: "casino-arena",
    period: "2013 — 2024 (11 years)",
    company: "Casino Arena Maipú",
    subtitle: "Hotel & Entertainment Complex · Mendoza",
    role: "Floor Operations · Cage Management & VIP Loyalty",
    description:
      "Over a decade engaging face-to-face with thousands of guests in high-pressure, emotionally charged environments. Precision cash reconciliation, shift leadership, immediate conflict resolution, and VIP guest retention.",
    tags: [
      "Face-to-Face Empathy",
      "Composure Under Pressure",
      "Conflict Resolution",
      "Zero-Error Reconciliation",
    ],
  },
];

const educationDataEn: EducationEntry[] = [
  {
    id: "uncuyo",
    institution: "Universidad Nacional de Cuyo (UNCuyo)",
    degree: "Industrial Designer (Bachelor's Degree)",
    period: "2009 — 2018",
    highlight: "GPA: 8.46 / 10 · Graduated with Honors",
    details: [
      "Design methodology, empirical field research, physical and cognitive ergonomics, morphological analysis, and manufacturing feasibility.",
    ],
  },
  {
    id: "coderhouse",
    institution: "Coderhouse",
    degree: "Comprehensive UX/UI Specialization Track",
    period: "2024 — 2025",
    highlight: "Grades: 8.5 to 10",
    details: [
      "Advanced UX/UI Design — Score: 10 / 10 (Design Systems, Variables, Developer Handoff)",
      "UX Writing Course — Score: 9.0 / 10 (Microcopy, Tone & Voice, Conversational Design)",
      "UX Research — Score: 8.5 / 10 (Interviews, Data Triangulation, Discovery)",
      "UX/UI Design — Score: 9.5 / 10 (End-to-End Product Cycle, User Flows, Figma)",
    ],
  },
];

const stackCategoriesEn: StackCategory[] = [
  {
    id: "design-systems",
    title: "Digital Design & Systems",
    items: [
      "Figma",
      "FigJam",
      "Atomic Design",
      "Design Tokens",
      "Wireframing",
      "Interactive Prototyping",
      "UX Writing",
      "Design Thinking",
    ],
  },
  {
    id: "agile",
    title: "Agile & Delivery",
    items: [
      "Jira (Story points)",
      "Scrum Dailies & Sprints",
      "Technical Refinement",
      "Sprint Reviews",
      "Notion",
      "Slack",
    ],
  },
  {
    id: "ai",
    title: "Applied AI",
    items: ["Claude", "ChatGPT", "Google Gemini", "NotebookLM"],
  },
  {
    id: "industrial-graphics",
    title: "Industrial Design, 3D & Graphics",
    items: [
      "SolidWorks",
      "Autodesk Inventor",
      "AutoCAD",
      "KeyShot",
      "Adobe Illustrator",
      "Adobe Photoshop",
      "3D Printing",
    ],
  },
];

export function getLocalizedCvData(locale: Locale) {
  if (locale === "en") {
    return {
      personalInfo: personalInfoEn,
      heroData: heroDataEn,
      stickyProjects: stickyProjectsEn,
      portfolioCases: portfolioCasesEn,
      experienceList: experienceListEn,
      educationData: educationDataEn,
      stackCategories: stackCategoriesEn,
    };
  }

  return {
    personalInfo: personalInfoEs,
    heroData: heroDataEs,
    stickyProjects: stickyProjectsEs,
    portfolioCases: portfolioCasesEs,
    experienceList: experienceListEs,
    educationData: educationDataEs,
    stackCategories: stackCategoriesEs,
  };
}
