/**
 * Zero-dependency, ISO 32000-1 compliant PDF 1.4 vector writer.
 * Uses PDF Standard 14 Type1 fonts (Helvetica, Helvetica-Bold, Times-Roman)
 * with WinAnsiEncoding for crisp selectable ATS text, full Spanish accents,
 * vector hairlines, and clickable URI link annotations.
 */

export type PdfFontKey = "sans" | "sansBold" | "serif";

export interface PdfColor {
  r: number;
  g: number;
  b: number;
}

export interface PdfMetadata {
  title: string;
  author: string;
  subject: string;
  keywords: string[];
  creator: string;
}

interface LinkAnnot {
  rect: [number, number, number, number];
  url: string;
}

const FONT_RESOURCE: Record<PdfFontKey, string> = {
  sans: "/F1",
  sansBold: "/F2",
  serif: "/F3",
};

// Official Adobe Standard 14 AFM glyph widths (1/1000 em) for ASCII 32..126
const HELVETICA_ASCII: number[] = [
  278, 278, 355, 556, 556, 889, 667, 191, 333, 333, 389, 584, 278, 333, 278, 278,
  556, 556, 556, 556, 556, 556, 556, 556, 556, 556, 278, 278, 584, 584, 584, 556,
  1015, 667, 667, 722, 722, 667, 611, 778, 722, 278, 500, 667, 556, 833, 722, 778,
  667, 778, 722, 667, 611, 722, 667, 944, 667, 667, 611, 278, 278, 278, 469, 556,
  333, 556, 556, 500, 556, 556, 278, 556, 556, 222, 222, 500, 222, 833, 556, 556,
  556, 556, 333, 500, 278, 556, 500, 722, 500, 500, 500, 334, 260, 334, 584,
];

const HELVETICA_BOLD_ASCII: number[] = [
  278, 333, 474, 556, 556, 889, 722, 238, 333, 333, 389, 584, 278, 333, 278, 278,
  556, 556, 556, 556, 556, 556, 556, 556, 556, 556, 333, 333, 584, 584, 584, 611,
  975, 722, 722, 722, 722, 667, 611, 778, 722, 278, 556, 722, 611, 833, 722, 778,
  667, 778, 722, 667, 611, 722, 667, 944, 667, 667, 611, 333, 278, 333, 584, 556,
  333, 556, 611, 556, 611, 556, 333, 611, 611, 278, 278, 556, 278, 889, 611, 611,
  611, 611, 389, 556, 333, 611, 556, 778, 556, 556, 500, 389, 280, 389, 584,
];

const TIMES_ROMAN_ASCII: number[] = [
  250, 333, 408, 500, 500, 833, 778, 180, 333, 333, 500, 564, 250, 333, 250, 278,
  500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 278, 278, 564, 564, 564, 444,
  921, 722, 667, 667, 722, 611, 556, 722, 722, 333, 389, 722, 611, 889, 722, 722,
  556, 722, 667, 556, 611, 722, 722, 944, 722, 722, 611, 333, 278, 333, 469, 500,
  333, 444, 500, 444, 500, 444, 333, 500, 500, 278, 278, 500, 278, 778, 500, 500,
  500, 500, 333, 389, 278, 500, 500, 722, 500, 500, 444, 480, 200, 480, 541,
];

const ASCII_TABLES: Record<PdfFontKey, number[]> = {
  sans: HELVETICA_ASCII,
  sansBold: HELVETICA_BOLD_ASCII,
  serif: TIMES_ROMAN_ASCII,
};

// Map accented Latin-1 characters to their base ASCII char for exact AFM width lookup
const ACCENT_BASE: Record<string, string> = {
  "À": "A", "Á": "A", "Â": "A", "Ã": "A", "Ä": "A", "Å": "A",
  "Ç": "C",
  "È": "E", "É": "E", "Ê": "E", "Ë": "E",
  "Ì": "I", "Í": "I", "Î": "I", "Ï": "I",
  "Ñ": "N",
  "Ò": "O", "Ó": "O", "Ô": "O", "Õ": "O", "Ö": "O",
  "Ù": "U", "Ú": "U", "Û": "U", "Ü": "U",
  "Ý": "Y",
  "à": "a", "á": "a", "â": "a", "ã": "a", "ä": "a", "å": "a",
  "ç": "c",
  "è": "e", "é": "e", "ê": "e", "ë": "e",
  "ì": "i", "í": "i", "î": "i", "ï": "i",
  "ñ": "n",
  "ò": "o", "ó": "o", "ô": "o", "õ": "o", "ö": "o",
  "ù": "u", "ú": "u", "û": "u", "ü": "u",
  "ý": "y", "ÿ": "y",
};

const SPECIAL_WIDTHS: Record<PdfFontKey, Record<string, number>> = {
  sans: { "·": 278, "•": 350, "–": 556, "—": 1000, "¡": 333, "¿": 611, "°": 400, "©": 737 },
  sansBold: { "·": 278, "•": 350, "–": 556, "—": 1000, "¡": 333, "¿": 611, "°": 400, "©": 737 },
  serif: { "·": 250, "•": 350, "–": 500, "—": 1000, "¡": 333, "¿": 444, "°": 400, "©": 760 },
};

const WINANSI_SPECIAL_CODES: Record<number, number> = {
  0x2022: 0x95, // • bullet
  0x2013: 0x96, // – en dash
  0x2014: 0x97, // — em dash
};

/**
 * Normalizes text to strictly WinAnsi-safe characters while preserving Spanish accents,
 * middots, bullets, and em/en dashes.
 */
export function sanitizeWinAnsi(input: string): string {
  return input
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/\u2026/g, "...")
    .replace(/[\u2190-\u21FF]/g, "")
    .replace(/[^\x20-\x7E\xA0-\xFF\u2013\u2014\u2022]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Encodes a WinAnsi string into a pure 7-bit ASCII PDF literal string `(...)`.
 * Non-ASCII bytes are emitted as 3-digit octal escapes so byte offsets never drift.
 */
function encodePdfLiteral(raw: string): string {
  const clean = sanitizeWinAnsi(raw);
  let out = "(";

  for (let i = 0; i < clean.length; i += 1) {
    const code = clean.charCodeAt(i);
    if (code === 0x28 || code === 0x29 || code === 0x5c) {
      out += `\\${clean[i]}`;
    } else if (code >= 0x20 && code <= 0x7e) {
      out += clean[i];
    } else if (code >= 0xa0 && code <= 0xff) {
      out += `\\${code.toString(8).padStart(3, "0")}`;
    } else if (WINANSI_SPECIAL_CODES[code] !== undefined) {
      out += `\\${WINANSI_SPECIAL_CODES[code].toString(8).padStart(3, "0")}`;
    }
  }

  out += ")";
  return out;
}

function encodePdfAsciiUri(url: string): string {
  const safe = url
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
  return `(${safe})`;
}

function fmt(n: number): string {
  return Number.isInteger(n) ? String(n) : n.toFixed(2).replace(/\.?0+$/, "");
}

export function measureTextWidth(text: string, font: PdfFontKey, fontSize: number): number {
  const clean = sanitizeWinAnsi(text);
  const table = ASCII_TABLES[font];
  const specials = SPECIAL_WIDTHS[font];
  let units = 0;

  for (let i = 0; i < clean.length; i += 1) {
    const ch = clean[i];
    const code = ch.charCodeAt(0);
    if (code >= 32 && code <= 126) {
      units += table[code - 32];
    } else if (specials[ch] !== undefined) {
      units += specials[ch];
    } else if (ACCENT_BASE[ch]) {
      const baseCode = ACCENT_BASE[ch].charCodeAt(0);
      units += table[baseCode - 32];
    } else {
      units += 556;
    }
  }

  return (units / 1000) * fontSize;
}

export class SinglePagePdfWriter {
  private readonly width: number;
  private readonly height: number;
  private readonly ops: string[] = [];
  private readonly links: LinkAnnot[] = [];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  drawRect(x: number, y: number, w: number, h: number, color: PdfColor): void {
    this.ops.push(
      `q ${fmt(color.r)} ${fmt(color.g)} ${fmt(color.b)} rg ${fmt(x)} ${fmt(y)} ${fmt(w)} ${fmt(h)} re f Q`
    );
  }

  drawLine(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    thickness: number,
    color: PdfColor
  ): void {
    this.ops.push(
      `q ${fmt(color.r)} ${fmt(color.g)} ${fmt(color.b)} RG ${fmt(thickness)} w ${fmt(x1)} ${fmt(y1)} m ${fmt(x2)} ${fmt(y2)} l S Q`
    );
  }

  drawText(
    text: string,
    x: number,
    y: number,
    font: PdfFontKey,
    fontSize: number,
    color: PdfColor
  ): void {
    const literal = encodePdfLiteral(text);
    this.ops.push(
      `BT ${FONT_RESOURCE[font]} ${fmt(fontSize)} Tf ${fmt(color.r)} ${fmt(color.g)} ${fmt(color.b)} rg 1 0 0 1 ${fmt(x)} ${fmt(y)} Tm ${literal} Tj ET`
    );
  }

  addUriLink(
    x: number,
    y: number,
    width: number,
    height: number,
    url: string,
    underlineColor?: PdfColor
  ): void {
    this.links.push({
      rect: [x, y - 2, x + width, y + height + 1],
      url,
    });
    if (underlineColor) {
      this.drawLine(x, y - 1.6, x + width, y - 1.6, 0.45, underlineColor);
    }
  }

  save(metadata: PdfMetadata): Uint8Array {
    const contentStream = `${this.ops.join("\n")}\n`;
    const encoder = new TextEncoder();
    const contentBytesLength = encoder.encode(contentStream).byteLength;

    const firstAnnotObjNum = 9;
    const annotRefs = this.links.map((_, idx) => `${firstAnnotObjNum + idx} 0 R`).join(" ");
    const annotsEntry = annotRefs ? ` /Annots [${annotRefs}]` : "";

    const objects: string[] = [
      // 1: Catalog
      "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n",
      // 2: Pages
      "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n",
      // 3: Page
      `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${fmt(this.width)} ${fmt(this.height)}] /Resources << /Font << /F1 4 0 R /F2 5 0 R /F3 6 0 R >> >> /Contents 7 0 R${annotsEntry} >>\nendobj\n`,
      // 4: Helvetica
      "4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>\nendobj\n",
      // 5: Helvetica-Bold
      "5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>\nendobj\n",
      // 6: Times-Roman
      "6 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Times-Roman /Encoding /WinAnsiEncoding >>\nendobj\n",
      // 7: Page Content Stream
      `7 0 obj\n<< /Length ${contentBytesLength} >>\nstream\n${contentStream}endstream\nendobj\n`,
      // 8: Document Info
      `8 0 obj\n<< /Title ${encodePdfLiteral(metadata.title)} /Author ${encodePdfLiteral(metadata.author)} /Subject ${encodePdfLiteral(metadata.subject)} /Keywords ${encodePdfLiteral(metadata.keywords.join(", "))} /Creator ${encodePdfLiteral(metadata.creator)} /Producer (Editorial PDF 1.4 Writer) >>\nendobj\n`,
    ];

    // 9+: URI Link Annotations
    this.links.forEach((link, idx) => {
      const objNum = firstAnnotObjNum + idx;
      const [x1, y1, x2, y2] = link.rect;
      objects.push(
        `${objNum} 0 obj\n<< /Type /Annot /Subtype /Link /Rect [${fmt(x1)} ${fmt(y1)} ${fmt(x2)} ${fmt(y2)}] /Border [0 0 0] /A << /Type /Action /S /URI /URI ${encodePdfAsciiUri(link.url)} >> >>\nendobj\n`
      );
    });

    // Assemble final binary Uint8Array with exact byte-offset xref table
    const chunks: Uint8Array[] = [];
    let currentOffset = 0;

    const pushBytes = (bytes: Uint8Array) => {
      chunks.push(bytes);
      currentOffset += bytes.byteLength;
    };

    const pushAscii = (str: string) => {
      pushBytes(encoder.encode(str));
    };

    // PDF 1.4 header + recommended 4-byte binary marker comment
    pushBytes(
      new Uint8Array([
        0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x34, 0x0a, // %PDF-1.4\n
        0x25, 0xe2, 0xe3, 0xcf, 0xd3, 0x0a, // %âãÏÓ\n
      ])
    );

    const offsets: number[] = [];
    for (const objStr of objects) {
      offsets.push(currentOffset);
      pushAscii(objStr);
    }

    const xrefOffset = currentOffset;
    const totalObjects = objects.length + 1;
    let xref = `xref\n0 ${totalObjects}\n0000000000 65535 f \n`;
    for (const off of offsets) {
      xref += `${String(off).padStart(10, "0")} 00000 n \n`;
    }
    pushAscii(xref);

    pushAscii(
      `trailer\n<< /Size ${totalObjects} /Root 1 0 R /Info 8 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`
    );

    const output = new Uint8Array(currentOffset);
    let cursor = 0;
    for (const chunk of chunks) {
      output.set(chunk, cursor);
      cursor += chunk.byteLength;
    }

    return output;
  }
}
