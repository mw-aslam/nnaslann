import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const IMAGE_MAP: Record<string, { src: string; destName: string; contentType: string }> = {
  coddyinsta: {
    src: "C:/Users/user/.gemini/antigravity/brain/a70e3abf-aff6-4fb2-ad2b-a82872078b37/.user_uploaded/media_1789395149931.jpg",
    destName: "coddyinsta.jpg",
    contentType: "image/jpeg",
  },
  coddycompiler: {
    src: "C:/Users/user/.gemini/antigravity/brain/a70e3abf-aff6-4fb2-ad2b-a82872078b37/.user_uploaded/media_1789395171899.png",
    destName: "coddycompiler.png",
    contentType: "image/png",
  },
  coddyreminder: {
    src: "C:/Users/user/.gemini/antigravity/brain/a70e3abf-aff6-4fb2-ad2b-a82872078b37/.user_uploaded/media_1789395699525.jpg",
    destName: "coddyreminder.jpg",
    contentType: "image/jpeg",
  },
  mwpizzashop: {
    src: "C:/Users/user/.gemini/antigravity/brain/a70e3abf-aff6-4fb2-ad2b-a82872078b37/.user_uploaded/media_1789395805587.jpg",
    destName: "mwpizzashop.jpg",
    contentType: "image/jpeg",
  },
  nexclutch: {
    src: "C:/Users/user/.gemini/antigravity/brain/a70e3abf-aff6-4fb2-ad2b-a82872078b37/.user_uploaded/media_1789405559149.jpg",
    destName: "nexclutch.jpg",
    contentType: "image/jpeg",
  },
  profile: {
    src: "C:/Users/user/.gemini/antigravity/brain/a70e3abf-aff6-4fb2-ad2b-a82872078b37/.user_uploaded/media_1789410577236.png",
    destName: "profile.png",
    contentType: "image/png",
  },
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");

  if (!name || !IMAGE_MAP[name]) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const { src, destName, contentType } = IMAGE_MAP[name];

  try {
    const isProfile = name === "profile" || destName.startsWith("profile");
    const targetDir = isProfile
      ? path.join(process.cwd(), "public", "images")
      : path.join(process.cwd(), "public", "images", "projects");
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    const targetPath = path.join(targetDir, destName);

    if (fs.existsSync(src)) {
      try {
        fs.copyFileSync(src, targetPath);
      } catch (err) {
        console.error("Failed to copy file to public dir:", err);
      }
      const buffer = fs.readFileSync(src);
      return new NextResponse(buffer, {
        headers: {
          "Content-Type": contentType,
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }

    if (fs.existsSync(targetPath)) {
      const buffer = fs.readFileSync(targetPath);
      return new NextResponse(buffer, {
        headers: {
          "Content-Type": contentType,
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }
  } catch (e) {
    console.error("Error serving project image:", e);
  }

  return new NextResponse("Image Not Found", { status: 404 });
}
