"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function RotatingCube() {
  const cubeRef = useRef<THREE.Mesh>(null);

  // Rotate cube every frame
  useFrame(() => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x += 0.01;
      cubeRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={cubeRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

export default function Day2() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 70 }}
      style={{ width: "100vw", height: "100vh", background: "#111" }}
    >
      {/* Lights */}
      <directionalLight color="white" intensity={2} position={[5, 5, 5]} />
      <ambientLight intensity={0.2} />

      {/* Cube */}
      <RotatingCube />

      {/* Orbit Controls from Drei */}
      <OrbitControls />
    </Canvas>
  );
}
