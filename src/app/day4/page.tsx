"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { OrbitControls, useGLTF, useTexture, useProgress, Html } from "@react-three/drei";
import * as THREE from "three";

// Loader component showing progress
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{ color: "white", fontSize: "2rem" }}>
        {progress.toFixed(0)} % loaded
      </div>
    </Html>
  );
}

// 3D Character component with textures
function Character() {
  const gltf = useGLTF("/models/character.glb"); // Replace with your model
  const texture = useTexture("/textures/character_diffuse.jpg"); // Diffuse / color texture
  const normal = useTexture("/textures/character_normal.jpg");   // Normal map

  // Apply textures to all meshes
  gltf.scene.traverse((child: any) => {
    if (child.isMesh) {
      child.material.map = texture;
      child.material.normalMap = normal;
      child.material.needsUpdate = true;
    }
  });

  const ref = useRef<THREE.Group>(null);

  // Rotate character slowly
  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.005;
  });

  return <primitive ref={ref} object={gltf.scene} scale={2} />;
}

// Main Scene
export default function Day4Practice() {
  return (
    <Canvas
      camera={{ position: [0, 1, 5], fov: 50 }}
      style={{ width: "100vw", height: "100vh", background: "#111" }}
    >
      {/* Lights */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      {/* Suspense handles async loading */}
      <Suspense fallback={<Loader />}>
        <Character />
      </Suspense>

      {/* Camera controls */}
      <OrbitControls />
    </Canvas>
  );
}
