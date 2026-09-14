"use client";

import { useMemo, useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const CODE_SYMBOLS_LEFT = [
  "</>",
  "{ }",
  "const",
  "=>",
  "async",
  "0101",
  "API",
  "[ ]",
  "import",
  "Node.js",
];

const CODE_SYMBOLS_RIGHT = [
  "React",
  "Python",
  "await",
  "fn()",
  "git",
  "SQL",
  "JSON",
  "Next.js",
  "REST",
  "npm",
];

function createCodeTexture(text: string) {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 384;
  canvas.height = 192;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.clearRect(0, 0, 384, 192);
    ctx.shadowColor = "rgba(255, 255, 255, 0.95)";
    ctx.shadowBlur = 16;
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 44px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, 192, 96);
  }
  return new THREE.CanvasTexture(canvas);
}

function CodeMatrixField() {
  const groupRef = useRef<THREE.Group>(null);
  const scrollYRef = useRef(0);
  const { viewport } = useThree();

  useEffect(() => {
    function handleScroll() {
      scrollYRef.current = window.scrollY;
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const leftTextures = useMemo(() => CODE_SYMBOLS_LEFT.map(createCodeTexture), []);
  const rightTextures = useMemo(() => CODE_SYMBOLS_RIGHT.map(createCodeTexture), []);

  const items = useMemo(() => {
    const list = [];
    const countPerSide = 8;

    for (let i = 0; i < countPerSide; i++) {
      const yFrac = (i / (countPerSide - 1)) * 2 - 1;
      list.push({
        side: -1,
        xFactor: 0.52 + Math.random() * 0.35,
        y: yFrac * 6.5 + (Math.random() - 0.5) * 0.8,
        z: (Math.random() - 0.5) * 4,
        scale: 0.55 + Math.random() * 0.25,
        texIndex: i % CODE_SYMBOLS_LEFT.length,
      });
    }

    for (let i = 0; i < countPerSide; i++) {
      const yFrac = (i / (countPerSide - 1)) * 2 - 1;
      list.push({
        side: 1,
        xFactor: 0.52 + Math.random() * 0.35,
        y: yFrac * 6.5 + (Math.random() - 0.5) * 0.8,
        z: (Math.random() - 0.5) * 4,
        scale: 0.55 + Math.random() * 0.25,
        texIndex: i % CODE_SYMBOLS_RIGHT.length,
      });
    }

    return list;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = scrollYRef.current * 0.0003 + Math.sin(t * 0.12) * 0.05;
      groupRef.current.position.y = scrollYRef.current * 0.001;
    }
  });

  const halfWidth = viewport.width / 2;

  return (
    <group ref={groupRef}>
      {items.map((item, idx) => {
        const tex = item.side === -1 ? leftTextures[item.texIndex] : rightTextures[item.texIndex];
        if (!tex) return null;

        const posX = item.side * (halfWidth * item.xFactor);

        return (
          <sprite
            key={idx}
            position={[
              posX + Math.sin(idx + scrollYRef.current * 0.0005) * 0.15,
              item.y,
              item.z,
            ]}
            scale={[item.scale * 3.6, item.scale * 1.8, 1]}
          >
            <spriteMaterial
              map={tex}
              transparent
              opacity={0.88}
              depthWrite={false}
            />
          </sprite>
        );
      })}
    </group>
  );
}

export function ParticleField() {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) return null;

  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      className="!absolute inset-0"
    >
      <ambientLight intensity={1} />
      <CodeMatrixField />
    </Canvas>
  );
}
