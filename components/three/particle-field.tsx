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
    ctx.shadowBlur = 18;
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 44px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, 192, 96);
  }
  return new THREE.CanvasTexture(canvas);
}

function Floating3DSprite({
  item,
  idx,
  halfWidth,
  tex,
}: {
  item: any;
  idx: number;
  halfWidth: number;
  tex: THREE.CanvasTexture | null;
}) {
  const spriteRef = useRef<THREE.Sprite>(null);
  const scrollYRef = useRef(0);

  useEffect(() => {
    function handleScroll() {
      scrollYRef.current = window.scrollY;
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame(({ clock }) => {
    if (!spriteRef.current) return;
    const t = clock.getElapsedTime();
    const speed = 0.6 + (idx % 4) * 0.25;
    const floatY = Math.sin(t * speed + idx * 1.5) * 0.35;
    const floatX = Math.cos(t * (speed * 0.6) + idx * 2) * 0.2;
    const scrollOffsetY = scrollYRef.current * 0.0015;

    const baseKeyX = item.side * (halfWidth * item.xFactor);
    spriteRef.current.position.x = baseKeyX + floatX;
    spriteRef.current.position.y = item.y + floatY - (scrollOffsetY % 14);
  });

  if (!tex) return null;

  return (
    <sprite
      ref={spriteRef}
      position={[item.side * (halfWidth * item.xFactor), item.y, item.z]}
      scale={[item.scale * 3.6, item.scale * 1.8, 1]}
    >
      <spriteMaterial
        map={tex}
        transparent
        opacity={0.8}
        depthWrite={false}
      />
    </sprite>
  );
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
      groupRef.current.rotation.y = scrollYRef.current * 0.0004 + Math.sin(t * 0.15) * 0.08;
    }
  });

  const halfWidth = viewport.width / 2;

  return (
    <group ref={groupRef}>
      {items.map((item, idx) => {
        const tex = item.side === -1 ? leftTextures[item.texIndex] : rightTextures[item.texIndex];
        return (
          <Floating3DSprite
            key={idx}
            item={item}
            idx={idx}
            halfWidth={halfWidth}
            tex={tex}
          />
        );
      })}
    </group>
  );
}

export function ParticleField() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!mounted || isMobile) return null;

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
