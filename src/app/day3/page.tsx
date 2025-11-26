"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [5, 3, 5], fov: 60 }}
      onCreated={({ scene }) => {
        scene.fog = new THREE.FogExp2(0xcccccc, 0.02);
      }}
      style={{ height: "100vh", width: "100vw" }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#79804D" />
      </mesh>

      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#69573B" />
      </mesh>

      <mesh position={[2, 0.5, -2]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#3E482A" />
      </mesh>

      <mesh position={[-2, 0.5, 2]}>
        <coneGeometry args={[0.5, 1, 32]} />
        <meshStandardMaterial color="#2D2920" />
      </mesh>

      <Environment preset="sunset" />

      <OrbitControls />
    </Canvas>
  );
}
