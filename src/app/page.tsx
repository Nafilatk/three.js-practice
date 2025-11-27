"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text3D, Center, Float, Environment } from "@react-three/drei";

function ThreeDText() {
  const textRef = useRef<any>(null);

  useFrame(({ clock }) => {
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  return (
    <Center position={[0, 1, 0]}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Text3D
          ref={textRef}
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.8}
          height={0.2}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
        >
          welcome
          to
          Three.js
          <meshStandardMaterial color="green" />
        </Text3D>
      </Float>
    </Center>
  );
}




export default function Home() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [5, 3, 5], fov: 60 }}>
        <color attach="background" args={['#1a1a2e']} />

        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />



        <ThreeDText />

        <OrbitControls />
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}