"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text3D, Center, Float, Environment } from "@react-three/drei";

// 3D Text Component
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
          HELLO 3D
          <meshStandardMaterial color="orange" />
        </Text3D>
      </Float>
    </Center>
  );
}

// Floating Cube
function FloatingCube() {
  const cubeRef = useRef<any>(null);

  useFrame(({ clock }) => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x += 0.01;
      cubeRef.current.rotation.y += 0.01;
      cubeRef.current.position.y = Math.sin(clock.getElapsedTime()) * 0.3;
    }
  });
  return (
    <mesh ref={cubeRef} position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
}

// Main Scene
export default function Home() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [5, 3, 5], fov: 60 }}>
        {/* Background */}
        <color attach="background" args={['#1a1a2e']} />
        
        {/* Lights */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        {/* Floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial color="#333" />
        </mesh>

        {/* 3D Objects */}
        <ThreeDText />
        <FloatingCube />
        
        {/* Controls */}
        <OrbitControls />
        <Environment preset="sunset" />
      </Canvas>
    </div>
  );
}