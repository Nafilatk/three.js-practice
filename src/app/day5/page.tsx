"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, Text3D } from "@react-three/drei";

export default function Text3DPage() {
  return (
    <div className="w-full h-screen">
      <Canvas camera={{ position: [3, 3, 5], fov: 60 }}>
        <OrbitControls enableZoom={true} />

        <Text3D
          font="/fonts/Roboto_Regular.json" 
          size={1}
          height={0.4}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.03}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          Hello Nafila ❤️
          <meshStandardMaterial color="#ff66aa" />
        </Text3D>

        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        <Environment preset="sunset" />
      </Canvas>
    </div>
  );
}
