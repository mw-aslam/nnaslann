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
  woodendot: {
    src: "C:/Users/user/.gemini/antigravity/brain/a70e3abf-aff6-4fb2-ad2b-a82872078b37/.user_uploaded/media_1789415849893.jpg",
    destName: "woodendot.jpg",
    contentType: "image/jpeg",
  },
  starbucks: {
    src: "C:/Users/user/.gemini/antigravity/brain/a70e3abf-aff6-4fb2-ad2b-a82872078b37/.user_uploaded/media_1789416804623.jpg",
    destName: "starbucks.jpg",
    contentType: "image/jpeg",
  },
  logo: {
    src: "C:/Users/user/.gemini/antigravity/brain/a70e3abf-aff6-4fb2-ad2b-a82872078b37/.user_uploaded/media_1789416625177.png",
    destName: "logo.png",
    contentType: "image/png",
  },
};

const LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <circle cx="256" cy="256" r="250" fill="#FFFFFF"/>
  <g fill="#000000">
    <path d="M 125,180 L 330,180 L 330,230 L 255,230 L 255,340 L 195,340 L 195,230 L 125,230 Z" />
    <path d="M 230,340 L 305,180 L 375,180 L 440,340 L 375,340 L 355,285 L 285,285 L 260,340 Z M 302,240 L 338,240 L 320,195 Z" />
  </g>
</svg>`;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");

  if (name === "logo" || name === "icon" || name === "favicon") {
    try {
      const publicDir = path.join(process.cwd(), "public");
      fs.writeFileSync(path.join(publicDir, "icon.svg"), LOGO_SVG, "utf-8");
      fs.writeFileSync(path.join(publicDir, "favicon.svg"), LOGO_SVG, "utf-8");
    } catch (err) {
      console.error("Failed to write public icon SVG:", err);
    }
    return new NextResponse(LOGO_SVG, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

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
