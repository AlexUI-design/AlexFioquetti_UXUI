import {
  PDFDocument,
  PDFName,
  PDFString,
  StandardFonts,
  rgb,
  type PDFFont,
  type PDFPage,
} from "pdf-lib";
import type { Locale } from "@/components/providers/AppPreferencesProvider";
import { getLocalizedCvData } from "@/data/cv-data-en";

const A4_WIDTH = 595.28;
const A4_HEIGHT = 841.89;
const MARGIN_X = 36;
const CONTENT_WIDTH = A4_WIDTH - MARGIN_X * 2;

const COLOR_INK = rgb(0.09, 0.09, 0.082); // #171715
const COLOR_BODY = rgb(0.18, 0.184, 0.169); // #2E2F2B
const COLOR_MUTED = rgb(0.337, 0.341, 0.314); // #565750
const COLOR_HAIRLINE = rgb(0.82, 0.824, 0.79); // #D1D2C9
const COLOR_ACCENT_RULE = rgb(0.16, 0.165, 0.15); // #292A26

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

/**
 * Ensures all text is strictly WinAnsi-safe for pdf-lib StandardFonts
 * while preserving Spanish accents (á é í ó ú ü ñ), em/en dashes, bullets, and middots.
 */
function sanitizeWinAnsi(input: string): string {
  return input
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/\u2026/g, "...")
    .replace(/[\u2190-\u21FF]/g, "")
    .replace(/[^\x20-\x7E\xA0-\xFF\u2013\u2014\u2022]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function wrapText(
  text: string,
  font: PDFFont,
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
    if (font.widthOfTextAtSize(candidate, fontSize) <= maxWidth) {
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
      font.widthOfTextAtSize(`${lastLine}...`, fontSize) > maxWidth
    ) {
      lastLine = lastLine.slice(0, -1).trimEnd();
    }
    clipped[maxLines - 1] = `${lastLine}...`;
    return clipped;
  }

  return lines;
}

export async function generateCvPdf(locale: Locale): Promise<Uint8Array> {
  const { personalInfo, heroData, stickyProjects, portfolioCases, experienceList, educationData, stackCategories } =
    getLocalizedCvData(locale);
  const labels = PDF_LABELS[locale];

  const pdfDoc = await PDFDocument.create();
  pdfDoc.setTitle(sanitizeWinAnsi(labels.docTitle));
  pdfDoc.setAuthor(sanitizeWinAnsi(personalInfo.fullName));
  pdfDoc.setSubject(sanitizeWinAnsi(labels.docSubject));
  pdfDoc.setKeywords(labels.docKeywords.map(sanitizeWinAnsi));
  pdfDoc.setCreator(sanitizeWinAnsi(`${personalInfo.shortName} Portfolio`));
  pdfDoc.setProducer("pdf-lib");

  const page = pdfDoc.addPage([A4_WIDTH, A4_HEIGHT]);

  // Crisp pure white A4 background for printing & ATS readability
  page.drawRectangle({
    x: 0,
    y: 0,
    width: A4_WIDTH,
    height: A4_HEIGHT,
    color: rgb(1, 1, 1),
  });

  const fontSerif = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const fontSans = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontSansBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const linkAnnotations: ReturnType<typeof pdfDoc.context.register>[] = [];

  const addUriLink = (
    targetPage: PDFPage,
    x: number,
    y: number,
    width: number,
    height: number,
    url: string
  ) => {
    const annotRef = pdfDoc.context.register(
      pdfDoc.context.obj({
        Type: PDFName.of("Annot"),
        Subtype: PDFName.of("Link"),
        Rect: [x, y - 2, x + width, y + height + 1],
        Border: [0, 0, 0],
        A: {
          Type: PDFName.of("Action"),
          S: PDFName.of("URI"),
          URI: PDFString.of(url),
        },
      })
    );
    linkAnnotations.push(annotRef);
    // Subtle editorial hairline underline indicating clickability
    targetPage.drawLine({
      start: { x, y: y - 1.6 },
      end: { x: x + width, y: y - 1.6 },
      thickness: 0.45,
      color: COLOR_HAIRLINE,
    });
  };

  const drawSectionHeader = (title: string, x: number, y: number, width: number): number => {
    const cleanTitle = sanitizeWinAnsi(title);
    page.drawText(cleanTitle, {
      x,
      y,
      size: 7.5,
      font: fontSansBold,
      color: COLOR_MUTED,
    });
    const textW = fontSansBold.widthOfTextAtSize(cleanTitle, 7.5);
    const lineStartX = x + textW + 8;
    if (lineStartX < x + width) {
      page.drawLine({
        start: { x: lineStartX, y: y + 2.5 },
        end: { x: x + width, y: y + 2.5 },
        thickness: 0.55,
        color: COLOR_HAIRLINE,
      });
    }
    return y - 14.5;
  };

  let y = A4_HEIGHT - 44;

  // =========================================================================
  // HEADER BLOCK (Name, Role, Location, Clickable Contact Bar)
  // =========================================================================
  const nameText = sanitizeWinAnsi(personalInfo.fullName);
  page.drawText(nameText, {
    x: MARGIN_X,
    y,
    size: 25,
    font: fontSerif,
    color: COLOR_INK,
  });

  const locText = sanitizeWinAnsi(personalInfo.locationLabel.toUpperCase());
  const locWidth = fontSans.widthOfTextAtSize(locText, 7.6);
  page.drawText(locText, {
    x: A4_WIDTH - MARGIN_X - locWidth,
    y: y + 11,
    size: 7.6,
    font: fontSans,
    color: COLOR_MUTED,
  });

  const availText = sanitizeWinAnsi(personalInfo.availability.toUpperCase());
  const availWidth = fontSansBold.widthOfTextAtSize(availText, 7.4);
  page.drawText(availText, {
    x: A4_WIDTH - MARGIN_X - availWidth,
    y: y - 1,
    size: 7.4,
    font: fontSansBold,
    color: COLOR_INK,
  });

  y -= 17;
  page.drawText(sanitizeWinAnsi(personalInfo.roleTitle), {
    x: MARGIN_X,
    y,
    size: 10.4,
    font: fontSansBold,
    color: COLOR_BODY,
  });

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
  const sepChar = sanitizeWinAnsi("·");
  const sepW = fontSans.widthOfTextAtSize(sepChar, contactFontSize);
  const sepPad = 7;

  contactItems.forEach((item, idx) => {
    const labelText = sanitizeWinAnsi(item.label);
    const labelW = fontSans.widthOfTextAtSize(labelText, contactFontSize);
    page.drawText(labelText, {
      x: contactX,
      y,
      size: contactFontSize,
      font: fontSans,
      color: COLOR_INK,
    });
    addUriLink(page, contactX, y, labelW, contactFontSize, item.url);
    contactX += labelW;

    if (idx < contactItems.length - 1) {
      contactX += sepPad;
      page.drawText(sepChar, {
        x: contactX,
        y,
        size: contactFontSize,
        font: fontSans,
        color: COLOR_MUTED,
      });
      contactX += sepW + sepPad;
    }
  });

  y -= 11;
  page.drawLine({
    start: { x: MARGIN_X, y },
    end: { x: A4_WIDTH - MARGIN_X, y },
    thickness: 1.0,
    color: COLOR_ACCENT_RULE,
  });

  // =========================================================================
  // 01 / PROFILE
  // =========================================================================
  y -= 20;
  y = drawSectionHeader(labels.sectionProfile, MARGIN_X, y, CONTENT_WIDTH);

  const bioLines = wrapText(heroData.bio, fontSans, 8.7, CONTENT_WIDTH, 3);
  for (const line of bioLines) {
    page.drawText(line, {
      x: MARGIN_X,
      y,
      size: 8.7,
      font: fontSans,
      color: COLOR_BODY,
    });
    y -= 12.6;
  }

  const specialtiesLine = sanitizeWinAnsi(heroData.specialtyChips.join("  ·  "));
  const specLines = wrapText(specialtiesLine, fontSansBold, 7.7, CONTENT_WIDTH, 2);
  y -= 3;
  for (const line of specLines) {
    page.drawText(line, {
      x: MARGIN_X,
      y,
      size: 7.7,
      font: fontSansBold,
      color: COLOR_MUTED,
    });
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
    const projStack = sanitizeWinAnsi(
      `${labels.stackPrefix} ${project.designStack.join(" · ")}`
    );

    const metaW = fontSans.widthOfTextAtSize(projMeta, 7.6);
    const titleMaxW = CONTENT_WIDTH - metaW - 12;
    const titleLine = wrapText(projTitle, fontSansBold, 9.1, titleMaxW, 1)[0] ?? projTitle;

    page.drawText(titleLine, {
      x: MARGIN_X,
      y,
      size: 9.1,
      font: fontSansBold,
      color: COLOR_INK,
    });
    page.drawText(projMeta, {
      x: A4_WIDTH - MARGIN_X - metaW,
      y: y + 0.5,
      size: 7.6,
      font: fontSans,
      color: COLOR_MUTED,
    });
    y -= 12.2;

    const descLines = wrapText(projDesc, fontSans, 8.3, CONTENT_WIDTH, 3);
    for (const line of descLines) {
      page.drawText(line, {
        x: MARGIN_X,
        y,
        size: 8.3,
        font: fontSans,
        color: COLOR_BODY,
      });
      y -= 11.6;
    }

    page.drawText(projStack, {
      x: MARGIN_X,
      y: y + 0.4,
      size: 7.4,
      font: fontSans,
      color: COLOR_MUTED,
    });
    y -= 15.5;
  }

  // Portfolio Featured Case (1-line executive callout + clickable Behance link)
  const featuredCase = portfolioCases[0];
  if (featuredCase) {
    const prefixText = sanitizeWinAnsi(labels.portfolioPrefix);
    const behanceLabel = sanitizeWinAnsi(labels.viewBehance);
    const behanceW = fontSansBold.widthOfTextAtSize(behanceLabel, 7.7);
    const portfolioSummary =
      locale === "en"
        ? "Web Redesign & Editorial Art Direction (Wine tourism & bookings)"
        : "Rediseño Web & Dirección de Arte Editorial (enoturismo y reservas)";

    page.drawText(prefixText, {
      x: MARGIN_X,
      y,
      size: 8.1,
      font: fontSansBold,
      color: COLOR_INK,
    });
    const prefixW = fontSansBold.widthOfTextAtSize(prefixText, 8.1);
    const availableDescW = CONTENT_WIDTH - prefixW - behanceW - 14;
    const clippedPortfolioDesc =
      wrapText(portfolioSummary, fontSans, 8.0, availableDescW, 1)[0] ?? "";
    page.drawText(clippedPortfolioDesc, {
      x: MARGIN_X + prefixW + 4,
      y,
      size: 8.0,
      font: fontSans,
      color: COLOR_BODY,
    });

    const linkX = A4_WIDTH - MARGIN_X - behanceW;
    page.drawText(behanceLabel, {
      x: linkX,
      y,
      size: 7.7,
      font: fontSansBold,
      color: COLOR_INK,
    });
    addUriLink(page, linkX, y, behanceW, 7.7, featuredCase.behanceUrl);
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
    const periodW = fontSansBold.widthOfTextAtSize(periodText, 7.9);

    page.drawText(companyText, {
      x: MARGIN_X,
      y,
      size: 9.1,
      font: fontSansBold,
      color: COLOR_INK,
    });
    const companyW = fontSansBold.widthOfTextAtSize(companyText, 9.1);
    const roleOffsetX = MARGIN_X + companyW + 5;
    const maxRoleW = A4_WIDTH - MARGIN_X - periodW - roleOffsetX - 10;
    const clippedRole = wrapText(roleText, fontSans, 8.5, maxRoleW, 1)[0] ?? "";
    page.drawText(clippedRole, {
      x: roleOffsetX,
      y,
      size: 8.5,
      font: fontSans,
      color: COLOR_BODY,
    });

    page.drawText(periodText, {
      x: A4_WIDTH - MARGIN_X - periodW,
      y: y + 0.5,
      size: 7.9,
      font: fontSansBold,
      color: COLOR_MUTED,
    });
    y -= 11.4;

    page.drawText(sanitizeWinAnsi(exp.subtitle), {
      x: MARGIN_X,
      y,
      size: 7.5,
      font: fontSans,
      color: COLOR_MUTED,
    });
    y -= 11.8;

    const expDesc = labels.experienceSummaries[exp.id] ?? exp.description;
    const descLines = wrapText(expDesc, fontSans, 8.3, CONTENT_WIDTH, 3);
    for (const line of descLines) {
      page.drawText(line, {
        x: MARGIN_X,
        y,
        size: 8.3,
        font: fontSans,
        color: COLOR_BODY,
      });
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
    const periodW = fontSansBold.widthOfTextAtSize(periodText, 7.5);
    const instLine =
      wrapText(instText, fontSansBold, 8.7, leftColWidth - periodW - 8, 1)[0] ?? instText;

    page.drawText(instLine, {
      x: MARGIN_X,
      y: leftY,
      size: 8.7,
      font: fontSansBold,
      color: COLOR_INK,
    });
    page.drawText(periodText, {
      x: MARGIN_X + leftColWidth - periodW,
      y: leftY + 0.4,
      size: 7.5,
      font: fontSansBold,
      color: COLOR_MUTED,
    });
    leftY -= 11.8;

    const degLines = wrapText(edu.degree, fontSans, 8.1, leftColWidth, 2);
    for (const line of degLines) {
      page.drawText(line, {
        x: MARGIN_X,
        y: leftY,
        size: 8.1,
        font: fontSans,
        color: COLOR_BODY,
      });
      leftY -= 10.8;
    }

    page.drawText(sanitizeWinAnsi(edu.highlight), {
      x: MARGIN_X,
      y: leftY,
      size: 7.6,
      font: fontSansBold,
      color: COLOR_MUTED,
    });
    leftY -= 12;

    if (edu.id === "coderhouse") {
      for (const course of labels.coderhouseShortItems) {
        const cLines = wrapText(`• ${course}`, fontSans, 7.5, leftColWidth, 2);
        for (const cLine of cLines) {
          page.drawText(cLine, {
            x: MARGIN_X,
            y: leftY,
            size: 7.5,
            font: fontSans,
            color: COLOR_BODY,
          });
          leftY -= 10.4;
        }
      }
    } else if (edu.details[0]) {
      const detLines = wrapText(edu.details[0], fontSans, 7.6, leftColWidth, 2);
      for (const dLine of detLines) {
        page.drawText(dLine, {
          x: MARGIN_X,
          y: leftY,
          size: 7.6,
          font: fontSans,
          color: COLOR_BODY,
        });
        leftY -= 10.4;
      }
    }

    leftY -= 9;
  }

  // Right Column: Stack & Tools
  let rightY = drawSectionHeader(labels.sectionStack, rightColX, twoColTopY, rightColWidth);

  for (const category of stackCategories) {
    page.drawText(sanitizeWinAnsi(category.title), {
      x: rightColX,
      y: rightY,
      size: 8.4,
      font: fontSansBold,
      color: COLOR_INK,
    });
    rightY -= 11.4;

    const itemsText = category.items.join(" · ");
    const itemLines = wrapText(itemsText, fontSans, 7.9, rightColWidth, 3);
    for (const line of itemLines) {
      page.drawText(line, {
        x: rightColX,
        y: rightY,
        size: 7.9,
        font: fontSans,
        color: COLOR_BODY,
      });
      rightY -= 10.8;
    }

    rightY -= 8.5;
  }

  // Subtle vertical hairline between bottom two columns
  const dividerBottomY = Math.max(Math.min(leftY, rightY) + 8, 44);
  page.drawLine({
    start: { x: MARGIN_X + leftColWidth + colGap / 2, y: twoColTopY - 12 },
    end: { x: MARGIN_X + leftColWidth + colGap / 2, y: dividerBottomY },
    thickness: 0.45,
    color: COLOR_HAIRLINE,
  });

  // =========================================================================
  // FOOTER (Portfolio Link + Page Indicator)
  // =========================================================================
  const footerRuleY = 32;
  page.drawLine({
    start: { x: MARGIN_X, y: footerRuleY },
    end: { x: A4_WIDTH - MARGIN_X, y: footerRuleY },
    thickness: 0.5,
    color: COLOR_HAIRLINE,
  });

  const footerY = 20;
  const noteText = sanitizeWinAnsi(labels.footerNote);
  page.drawText(noteText, {
    x: MARGIN_X,
    y: footerY,
    size: 7.3,
    font: fontSans,
    color: COLOR_MUTED,
  });
  const noteW = fontSans.widthOfTextAtSize(noteText, 7.3);
  const linkLabel = "linktr.ee/Alekei";
  const linkX = MARGIN_X + noteW + 5;
  const linkW = fontSansBold.widthOfTextAtSize(linkLabel, 7.3);
  page.drawText(linkLabel, {
    x: linkX,
    y: footerY,
    size: 7.3,
    font: fontSansBold,
    color: COLOR_INK,
  });
  addUriLink(page, linkX, footerY, linkW, 7.3, personalInfo.linktreeUrl);

  const pageNumText = "A4 · 1 / 1";
  const pageNumW = fontSans.widthOfTextAtSize(pageNumText, 7.3);
  page.drawText(pageNumText, {
    x: A4_WIDTH - MARGIN_X - pageNumW,
    y: footerY,
    size: 7.3,
    font: fontSans,
    color: COLOR_MUTED,
  });

  if (linkAnnotations.length > 0) {
    page.node.set(PDFName.of("Annots"), pdfDoc.context.obj(linkAnnotations));
  }

  return pdfDoc.save({ useObjectStreams: false });
}
