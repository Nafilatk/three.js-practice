"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import Galaxy from "@/app/components/Galaxy";

export default function GalaxyPage() {
  return (
    <div className="w-full h-screen">
      <Canvas camera={{ position: [0, 10, 40], fov: 60 }} shadows>
        <color attach="background" args={["#000011"]} />
        <ambientLight intensity={0.6} />
        <pointLight position={[50, 50, 50]} intensity={1} />

        <Galaxy />

        <OrbitControls enablePan={false} minDistance={10} maxDistance={150} />

        {/* optional overlay */}
        <Html center style={{ pointerEvents: "none", color: "white", fontFamily: "Inter, sans-serif" }}>
          <div style={{ textAlign: "center", opacity: 0.6 }}>
            <h2 style={{ margin: 0 }}>Galaxy Generator</h2>
            <div style={{ fontSize: 12 }}>GSAP camera & twinkle animations</div>
          </div>
        </Html>
      </Canvas>
    </div>
  );
}
