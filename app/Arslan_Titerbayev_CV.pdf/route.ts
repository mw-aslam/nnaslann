import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const PDF_SRC = "C:/Users/user/.gemini/antigravity/brain/a70e3abf-aff6-4fb2-ad2b-a82872078b37/.user_uploaded/media_1789408115183.pdf";

export async function GET() {
  try {
    const publicDir = path.join(process.cwd(), "public");
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    const targetPath = path.join(publicDir, "Arslan_Titerbayev_CV.pdf");

    if (fs.existsSync(PDF_SRC)) {
      try {
        fs.copyFileSync(PDF_SRC, targetPath);
      } catch (err) {
        console.error("Failed to copy PDF to public directory:", err);
      }

      const buffer = fs.readFileSync(PDF_SRC);
      return new NextResponse(buffer, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": 'attachment; filename="Arslan_Titerbayev_CV.pdf"',
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }

    if (fs.existsSync(targetPath)) {
      const buffer = fs.readFileSync(targetPath);
      return new NextResponse(buffer, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": 'attachment; filename="Arslan_Titerbayev_CV.pdf"',
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }
  } catch (error) {
    console.error("Error serving resume PDF:", error);
  }

  return new NextResponse("Resume file not found", { status: 404 });
}
