import { NextRequest, NextResponse } from "next/server";
import type { Locale } from "@/components/providers/AppPreferencesProvider";
import { generateCvPdf } from "@/lib/generate-cv-pdf";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const langParam = request.nextUrl.searchParams.get("lang");
    const locale: Locale = langParam === "en" ? "en" : "es";

    const pdfBytes = await generateCvPdf(locale);
    const filename =
      locale === "en"
        ? "Alex-Fioquetti-CV-EN.pdf"
        : "Alex-Fioquetti-CV-ES.pdf";

    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Length": String(pdfBytes.byteLength),
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Failed to generate CV PDF:", error);
    return NextResponse.json(
      { error: "Unable to generate CV PDF" },
      { status: 500 }
    );
  }
}
