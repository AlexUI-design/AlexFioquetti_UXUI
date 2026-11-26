import type { Locale } from "@/components/providers/AppPreferencesProvider";
import { getLocalizedCvData } from "@/data/cv-data-en";
import {
  SinglePagePdfWriter,
  measureTextWidth,
  sanitizeWinAnsi,
  type PdfColor,
  type PdfFontKey,
} from "@/lib/pdf-writer";

const A4_WIDTH = 595.28;
const A4_HEIGHT = 841.89;
const MARGIN_X = 36;
const CONTENT_WIDTH = A4_WIDTH - MARGIN_X * 2;

const COLOR_WHITE: PdfColor = { r: 1, g: 1, b: 1 };
const COLOR_INK: PdfColor = { r: 0.09, g: 0.09, b: 0.082 }; // #171715
const COLOR_BODY: PdfColor = { r: 0.18, g: 0.184, b: 0.169 }; // #2E2F2B
const COLOR_MUTED: PdfColor = { r: 0.337, g: 0.341, b: 0.314 }; // #565750
const COLOR_HAIRLINE: PdfColor = { r: 0.82, g: 0.824, b: 0.79 }; // #D1D2C9
const COLOR_ACCENT_RULE: PdfColor = { r: 0.16, g: 0.165, b: 0.15 }; // #292A26

interface PdfLabels {
  docTitle: string;
  docSubject: string;
  docKeywords: string[];
  sectionProfile: string;
  sectionProjects: string;
  sectionExperience: string;
  sectionEducation: string;
  sectionStack: string;
  portfolioPrefix: string;
  viewBehance: string;
  stackPrefix: string;
  footerNote: string;
  projectSummaries: Record<string, { title: string; meta: string; description: string }>;
  experienceSummaries: Record<string, string>;
  coderhouseShortItems: string[];
}

const PDF_LABELS: Record<Locale, PdfLabels> = {
  es: {
    docTitle: "Alex Gabriel Fioquetti — CV Diseñador UX/UI & Diseñador Industrial",
    docSubject: "Currículum Vitae de Alex Gabriel Fioquetti (UX/UI Designer & Industrial Designer)",
    docKeywords: [
      "UX/UI Designer",
      "Diseñador Industrial",
      "Design Systems",
      "Figma",
      "Atomic Design",
      "UX Research",
      "UX Writing",
      "Scrum",
      "Product Design",
    ],
    sectionProfile: "01 / PERFIL PROFESIONAL",
    sectionProjects: "02 / PROYECTOS CLAVE EN PRODUCCIÓN",
    sectionExperience: "03 / EXPERIENCIA PROFESIONAL",
    sectionEducation: "04 / FORMACIÓN",
    sectionStack: "05 / STACK & HERRAMIENTAS",
    portfolioPrefix: "Portfolio destacado — Bodega Tierras Altas:",
    viewBehance: "Ver caso en Behance",
    stackPrefix: "Stack:",
    footerNote: "Portfolio interactivo completo y galerías en alta resolución:",
    projectSummaries: {
      advanta: {
        title: "Advanta — Ecosistema Digital Multiproducto (Club Loyalty, Biblioteca y Bot)",
        meta: "Flock IT · MVP 2 (1 Año) · Core Pod",
        description:
          "Único UX/UI en Core Pod (5 personas, Scrum). Diseño punta a punta y gobernanza Atomic Design en Figma para 5 productos integrados: Club de Fidelización, Backoffice ABM, Biblioteca Documental con roles y Chatbot.",
      },
      syngenta: {
        title: "Syngenta — Informes Interactivos por Zonas & Relevamiento en Campo",
        meta: "Flock IT · Web & Mobile Nativo",
        description:
          "Entrevistas a técnicos y discovery junto a PM. Arquitectura de paneles analíticos con mapa satelital zonificado, KPIs de siembra/malezas y app móvil por pestañas con fotos y audios georreferenciados.",
      },
      scalter: {
        title: "Scalter — Portal B2B de Pedidos, Validación CUIT y Bot de WhatsApp",
        meta: "Flock IT · Web Responsive & Bot",
        description:
          "Portal comercial B2B con validación por CUIT, tabla técnica responsive, alertas preventivas de stock y flujo conversacional en WhatsApp con derivación inteligente al Asistente Web en pedidos de +3 ítems.",
      },
    },
    experienceSummaries: {
      "flock-it":
        "Diseño de producto end-to-end en Core Pods multidisciplinarios (FE, BE, QA, PM). Co-creación con Product Management, estimaciones en Jira, ceremonias Scrum, Design Systems en Figma y discovery directo con clientes.",
      freelance:
        "Desarrollo de productos físicos, mobiliario custom a medida, modelado CAD 3D paramétrico e identidad visual (logotipos, manuales de marca y piezas digitales/impresas) para clientes e instituciones.",
      "casino-arena":
        "Más de una década en atención cara a cara en escenarios de alta presión. Arqueo de valores con cero error, liderazgo operativo de turnos, resolución inmediata de conflictos y fidelización de clientes VIP.",
    },
    coderhouseShortItems: [
      "UX/UI Avanzado (10/10) — Design Systems, Variables, Handoff",
      "UX/UI (9.5/10) — Ciclo completo de producto, Flows, Figma",
      "UX Writing (9.0/10) — Microcopy, Tone & Voice, Bots",
      "UX Research (8.5/10) — Entrevistas, Discovery, Triangulación",
    ],
  },
  en: {
    docTitle: "Alex Gabriel Fioquetti — UX/UI & Industrial Designer Resume",
    docSubject: "Resume of Alex Gabriel Fioquetti (UX/UI Designer & Industrial Designer)",
    docKeywords: [
      "UX/UI Designer",
      "Industrial Designer",
      "Design Systems",
      "Figma",
      "Atomic Design",
      "UX Research",
      "UX Writing",
      "Scrum",
      "Product Design",
    ],
    sectionProfile: "01 / PROFESSIONAL PROFILE",
    sectionProjects: "02 / KEY PRODUCTION PROJECTS",
    sectionExperience: "03 / PROFESSIONAL EXPERIENCE",
    sectionEducation: "04 / EDUCATION",
    sectionStack: "05 / STACK & TOOLS",
    portfolioPrefix: "Featured Portfolio — Bodega Tierras Altas:",
    viewBehance: "View case on Behance",
    stackPrefix: "Stack:",
    footerNote: "Full interactive portfolio & high-resolution case galleries:",
    projectSummaries: {
      advanta: {
        title: "Advanta — Multi-Product Digital Ecosystem (Loyalty Club, Library & Bot)",
        meta: "Flock IT · MVP 2 (1 Yr) · Core Pod",
        description:
          "Sole UX/UI designer in a 5-person Scrum Core Pod. End-to-end design and Atomic Design governance in Figma across 5 connected products: Loyalty Club, Admin CRUD Backoffice, role-based Library, and Chatbot.",
      },
      syngenta: {
        title: "Syngenta — Zone-Based Interactive Reports & Multimodal Field Scouting",
        meta: "Flock IT · Web & Native Mobile",
        description:
          "Led user interviews and PM-paired discovery. Architected analytics dashboards with zoned satellite maps, planting/weed KPIs, and a tabbed mobile experience for geotagged photos and voice notes.",
      },
      scalter: {
        title: "Scalter — B2B Ordering Portal, Tax ID Validation & WhatsApp Bot",
        meta: "Flock IT · Responsive Web & Bot",
        description:
          "Self-service B2B portal with verified Tax ID access, responsive technical ordering table, preventive out-of-stock alerts, and WhatsApp Bot routing 3+ item orders smoothly into the Web Assistant.",
      },
    },
    experienceSummaries: {
      "flock-it":
        "End-to-end product design across multidisciplinary Core Pods (FE, BE, QA, PM). Close PM collaboration, Jira story-point estimation, Scrum rituals, Figma Design Systems, and direct client discovery.",
      freelance:
        "Physical product development, bespoke custom furniture, parametric 3D CAD modeling, and visual identity systems (logos, brand guidelines, digital/print collateral) for private clients and institutions.",
      "casino-arena":
        "Over a decade of face-to-face service in high-pressure environments. Zero-error cash reconciliation, shift leadership, immediate conflict resolution, and VIP guest retention.",
    },
    coderhouseShortItems: [
      "Advanced UX/UI (10/10) — Design Systems, Variables, Handoff",
      "UX/UI Design (9.5/10) — Product Cycle, User Flows, Figma",
      "UX Writing (9.0/10) — Microcopy, Tone & Voice, Bots",
      "UX Research (8.5/10) — Interviews, Discovery, Triangulation",
    ],
  },
};

function wrapText(
  text: string,
  font: PdfFontKey,
  fontSize: number,
  maxWidth: number,
  maxLines?: number
): string[] {
  const clean = sanitizeWinAnsi(text);
  if (!clean) return [];

  const words = clean.split(" ");
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (measureTextWidth(candidate, font, fontSize) <= maxWidth) {
      current = candidate;
    } else {
      if (current) {
        lines.push(current);
      }
      current = word;
    }
  }

  if (current) {
    lines.push(current);
  }

  if (maxLines && lines.length > maxLines) {
    const clipped = lines.slice(0, maxLines);
    let lastLine = clipped[maxLines - 1];
    while (
      lastLine.length > 4 &&
      measureTextWidth(`${lastLine}...`, font, fontSize) > maxWidth
    ) {
      lastLine = lastLine.slice(0, -1).trimEnd();
    }
    clipped[maxLines - 1] = `${lastLine}...`;
    return clipped;
  }

  return lines;
}

export async function generateCvPdf(locale: Locale): Promise<Uint8Array> {
  const {
    personalInfo,
    heroData,
    stickyProjects,
    portfolioCases,
    experienceList,
    educationData,
    stackCategories,
  } = getLocalizedCvData(locale);
  const labels = PDF_LABELS[locale];

  const pdf = new SinglePagePdfWriter(A4_WIDTH, A4_HEIGHT);

  // Crisp pure white A4 background for printing & ATS readability
  pdf.drawRect(0, 0, A4_WIDTH, A4_HEIGHT, COLOR_WHITE);

  const drawSectionHeader = (title: string, x: number, y: number, width: number): number => {
    const cleanTitle = sanitizeWinAnsi(title);
    pdf.drawText(cleanTitle, x, y, "sansBold", 7.5, COLOR_MUTED);
    const textW = measureTextWidth(cleanTitle, "sansBold", 7.5);
    const lineStartX = x + textW + 8;
    if (lineStartX < x + width) {
      pdf.drawLine(lineStartX, y + 2.5, x + width, y + 2.5, 0.55, COLOR_HAIRLINE);
    }
    return y - 14.5;
  };

  let y = A4_HEIGHT - 44;

  // =========================================================================
  // HEADER BLOCK (Name, Role, Location, Clickable Contact Bar)
  // =========================================================================
  pdf.drawText(personalInfo.fullName, MARGIN_X, y, "serif", 25, COLOR_INK);

  const pdfLocation = personalInfo.locationLabel.replace(/\s*\([^)]*UTC[^)]*\)/gi, "").trim();
  const locText = sanitizeWinAnsi(pdfLocation.toUpperCase());
  const locWidth = measureTextWidth(locText, "sans", 7.6);
  pdf.drawText(locText, A4_WIDTH - MARGIN_X - locWidth, y + 11, "sans", 7.6, COLOR_MUTED);

  const availText = sanitizeWinAnsi(personalInfo.availability.toUpperCase());
  const availWidth = measureTextWidth(availText, "sansBold", 7.4);
  pdf.drawText(availText, A4_WIDTH - MARGIN_X - availWidth, y - 1, "sansBold", 7.4, COLOR_INK);

  y -= 17;
  pdf.drawText(personalInfo.roleTitle, MARGIN_X, y, "sansBold", 10.4, COLOR_BODY);

  y -= 16;
  const contactItems = [
    { label: personalInfo.email, url: `mailto:${personalInfo.email}` },
    { label: "LinkedIn", url: personalInfo.linkedinUrl },
    { label: "Behance", url: personalInfo.behanceUrl },
    { label: "WhatsApp", url: personalInfo.whatsappUrl },
    { label: "linktr.ee/Alekei", url: personalInfo.linktreeUrl },
  ];

  let contactX = MARGIN_X;
  const contactFontSize = 8.4;
  const sepChar = "·";
  const sepW = measureTextWidth(sepChar, "sans", contactFontSize);
  const sepPad = 7;

  contactItems.forEach((item, idx) => {
    const labelText = sanitizeWinAnsi(item.label);
    const labelW = measureTextWidth(labelText, "sans", contactFontSize);
    pdf.drawText(labelText, contactX, y, "sans", contactFontSize, COLOR_INK);
    pdf.addUriLink(contactX, y, labelW, contactFontSize, item.url, COLOR_HAIRLINE);
    contactX += labelW;

    if (idx < contactItems.length - 1) {
      contactX += sepPad;
      pdf.drawText(sepChar, contactX, y, "sans", contactFontSize, COLOR_MUTED);
      contactX += sepW + sepPad;
    }
  });

  y -= 11;
  pdf.drawLine(MARGIN_X, y, A4_WIDTH - MARGIN_X, y, 1.0, COLOR_ACCENT_RULE);

  // =========================================================================
  // 01 / PROFILE
  // =========================================================================
  y -= 20;
  y = drawSectionHeader(labels.sectionProfile, MARGIN_X, y, CONTENT_WIDTH);

  const bioLines = wrapText(heroData.bio, "sans", 8.7, CONTENT_WIDTH, 3);
  for (const line of bioLines) {
    pdf.drawText(line, MARGIN_X, y, "sans", 8.7, COLOR_BODY);
    y -= 12.6;
  }

  const specialtiesLine = sanitizeWinAnsi(heroData.specialtyChips.join(" · "));
  const specLines = wrapText(specialtiesLine, "sansBold", 7.7, CONTENT_WIDTH, 2);
  y -= 3;
  for (const line of specLines) {
    pdf.drawText(line, MARGIN_X, y, "sansBold", 7.7, COLOR_MUTED);
    y -= 11.2;
  }

  // =========================================================================
  // 02 / KEY PROJECTS
  // =========================================================================
  y -= 10;
  y = drawSectionHeader(labels.sectionProjects, MARGIN_X, y, CONTENT_WIDTH);

  for (const project of stickyProjects) {
    const custom = labels.projectSummaries[project.id];
    const projTitle = sanitizeWinAnsi(custom?.title ?? project.title);
    const projMeta = sanitizeWinAnsi(custom?.meta ?? project.metadata);
    const projDesc = custom?.description ?? project.summary;
    const projStack = sanitizeWinAnsi(`${labels.stackPrefix} ${project.designStack.join(" · ")}`);

    const metaW = measureTextWidth(projMeta, "sans", 7.6);
    const titleMaxW = CONTENT_WIDTH - metaW - 12;
    const titleLine = wrapText(projTitle, "sansBold", 9.1, titleMaxW, 1)[0] ?? projTitle;

    pdf.drawText(titleLine, MARGIN_X, y, "sansBold", 9.1, COLOR_INK);
    pdf.drawText(projMeta, A4_WIDTH - MARGIN_X - metaW, y + 0.5, "sans", 7.6, COLOR_MUTED);
    y -= 12.2;

    const descLines = wrapText(projDesc, "sans", 8.3, CONTENT_WIDTH, 3);
    for (const line of descLines) {
      pdf.drawText(line, MARGIN_X, y, "sans", 8.3, COLOR_BODY);
      y -= 11.6;
    }

    pdf.drawText(projStack, MARGIN_X, y + 0.4, "sans", 7.4, COLOR_MUTED);
    y -= 15.5;
  }

  // Portfolio Featured Case (1-line executive callout + clickable Behance link)
  const featuredCase = portfolioCases[0];
  if (featuredCase) {
    const prefixText = sanitizeWinAnsi(labels.portfolioPrefix);
    const behanceLabel = sanitizeWinAnsi(labels.viewBehance);
    const behanceW = measureTextWidth(behanceLabel, "sansBold", 7.7);
    const portfolioSummary =
      locale === "en"
        ? "Web Redesign & Editorial Art Direction (Wine tourism & bookings)"
        : "Rediseño Web & Dirección de Arte Editorial (enoturismo y reservas)";

    pdf.drawText(prefixText, MARGIN_X, y, "sansBold", 8.1, COLOR_INK);
    const prefixW = measureTextWidth(prefixText, "sansBold", 8.1);
    const availableDescW = CONTENT_WIDTH - prefixW - behanceW - 14;
    const clippedPortfolioDesc = wrapText(portfolioSummary, "sans", 8.0, availableDescW, 1)[0] ?? "";
    pdf.drawText(clippedPortfolioDesc, MARGIN_X + prefixW + 4, y, "sans", 8.0, COLOR_BODY);

    const linkX = A4_WIDTH - MARGIN_X - behanceW;
    pdf.drawText(behanceLabel, linkX, y, "sansBold", 7.7, COLOR_INK);
    pdf.addUriLink(linkX, y, behanceW, 7.7, featuredCase.behanceUrl, COLOR_HAIRLINE);
    y -= 16;
  }

  // =========================================================================
  // 03 / EXPERIENCE
  // =========================================================================
  y -= 8;
  y = drawSectionHeader(labels.sectionExperience, MARGIN_X, y, CONTENT_WIDTH);

  for (const exp of experienceList) {
    const companyText = sanitizeWinAnsi(exp.company);
    const roleText = sanitizeWinAnsi(`— ${exp.role}`);
    const periodText = sanitizeWinAnsi(exp.period);
    const periodW = measureTextWidth(periodText, "sansBold", 7.9);

    pdf.drawText(companyText, MARGIN_X, y, "sansBold", 9.1, COLOR_INK);
    const companyW = measureTextWidth(companyText, "sansBold", 9.1);
    const roleOffsetX = MARGIN_X + companyW + 5;
    const maxRoleW = A4_WIDTH - MARGIN_X - periodW - roleOffsetX - 10;
    const clippedRole = wrapText(roleText, "sans", 8.5, maxRoleW, 1)[0] ?? "";
    pdf.drawText(clippedRole, roleOffsetX, y, "sans", 8.5, COLOR_BODY);

    pdf.drawText(periodText, A4_WIDTH - MARGIN_X - periodW, y + 0.5, "sansBold", 7.9, COLOR_MUTED);
    y -= 11.4;

    pdf.drawText(exp.subtitle, MARGIN_X, y, "sans", 7.5, COLOR_MUTED);
    y -= 11.8;

    const expDesc = labels.experienceSummaries[exp.id] ?? exp.description;
    const descLines = wrapText(expDesc, "sans", 8.3, CONTENT_WIDTH, 3);
    for (const line of descLines) {
      pdf.drawText(line, MARGIN_X, y, "sans", 8.3, COLOR_BODY);
      y -= 11.6;
    }

    y -= 7;
  }

  // =========================================================================
  // 04 / EDUCATION (Left) + 05 / STACK & TOOLS (Right)
  // =========================================================================
  y -= 7;
  const colGap = 24;
  const leftColWidth = Math.floor((CONTENT_WIDTH - colGap) * 0.5);
  const rightColWidth = CONTENT_WIDTH - leftColWidth - colGap;
  const rightColX = MARGIN_X + leftColWidth + colGap;

  const twoColTopY = y;

  // Left Column: Education
  let leftY = drawSectionHeader(labels.sectionEducation, MARGIN_X, twoColTopY, leftColWidth);

  for (const edu of educationData) {
    const instText = sanitizeWinAnsi(edu.institution);
    const periodText = sanitizeWinAnsi(edu.period);
    const periodW = measureTextWidth(periodText, "sansBold", 7.5);
    const instLine = wrapText(instText, "sansBold", 8.7, leftColWidth - periodW - 8, 1)[0] ?? instText;

    pdf.drawText(instLine, MARGIN_X, leftY, "sansBold", 8.7, COLOR_INK);
    pdf.drawText(periodText, MARGIN_X + leftColWidth - periodW, leftY + 0.4, "sansBold", 7.5, COLOR_MUTED);
    leftY -= 11.8;

    const degLines = wrapText(edu.degree, "sans", 8.1, leftColWidth, 2);
    for (const line of degLines) {
      pdf.drawText(line, MARGIN_X, leftY, "sans", 8.1, COLOR_BODY);
      leftY -= 10.8;
    }

    pdf.drawText(edu.highlight, MARGIN_X, leftY, "sansBold", 7.6, COLOR_MUTED);
    leftY -= 12;

    if (edu.id === "coderhouse") {
      for (const course of labels.coderhouseShortItems) {
        const cLines = wrapText(`• ${course}`, "sans", 7.5, leftColWidth, 2);
        for (const cLine of cLines) {
          pdf.drawText(cLine, MARGIN_X, leftY, "sans", 7.5, COLOR_BODY);
          leftY -= 10.4;
        }
      }
    } else if (edu.details[0]) {
      const detLines = wrapText(edu.details[0], "sans", 7.6, leftColWidth, 2);
      for (const dLine of detLines) {
        pdf.drawText(dLine, MARGIN_X, leftY, "sans", 7.6, COLOR_BODY);
        leftY -= 10.4;
      }
    }

    leftY -= 9;
  }

  // Right Column: Stack & Tools
  let rightY = drawSectionHeader(labels.sectionStack, rightColX, twoColTopY, rightColWidth);

  for (const category of stackCategories) {
    pdf.drawText(category.title, rightColX, rightY, "sansBold", 8.4, COLOR_INK);
    rightY -= 11.4;

    const itemsText = category.items.join(" · ");
    const itemLines = wrapText(itemsText, "sans", 7.9, rightColWidth, 3);
    for (const line of itemLines) {
      pdf.drawText(line, rightColX, rightY, "sans", 7.9, COLOR_BODY);
      rightY -= 10.8;
    }

    rightY -= 8.5;
  }

  // Subtle vertical hairline between bottom two columns
  const dividerBottomY = Math.max(Math.min(leftY, rightY) + 8, 44);
  pdf.drawLine(
    MARGIN_X + leftColWidth + colGap / 2,
    twoColTopY - 12,
    MARGIN_X + leftColWidth + colGap / 2,
    dividerBottomY,
    0.45,
    COLOR_HAIRLINE
  );

  // =========================================================================
  // FOOTER (Portfolio Link + Page Indicator)
  // =========================================================================
  const footerRuleY = 32;
  pdf.drawLine(MARGIN_X, footerRuleY, A4_WIDTH - MARGIN_X, footerRuleY, 0.5, COLOR_HAIRLINE);

  const footerY = 20;
  const noteText = sanitizeWinAnsi(labels.footerNote);
  pdf.drawText(noteText, MARGIN_X, footerY, "sans", 7.3, COLOR_MUTED);
  const noteW = measureTextWidth(noteText, "sans", 7.3);
  const linkLabel = "linktr.ee/Alekei";
  const linkX = MARGIN_X + noteW + 5;
  const linkW = measureTextWidth(linkLabel, "sansBold", 7.3);
  pdf.drawText(linkLabel, linkX, footerY, "sansBold", 7.3, COLOR_INK);
  pdf.addUriLink(linkX, footerY, linkW, 7.3, personalInfo.linktreeUrl, COLOR_HAIRLINE);

  const pageNumText = "A4 · 1 / 1";
  const pageNumW = measureTextWidth(pageNumText, "sans", 7.3);
  pdf.drawText(pageNumText, A4_WIDTH - MARGIN_X - pageNumW, footerY, "sans", 7.3, COLOR_MUTED);

  return pdf.save({
    title: labels.docTitle,
    author: personalInfo.fullName,
    subject: labels.docSubject,
    keywords: labels.docKeywords,
    creator: `${personalInfo.shortName} Portfolio`,
  });
}
