"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";
import { OrbitControls, useGLTF, useTexture, useProgress, Html } from "@react-three/drei";
import * as THREE from "three";

// Loader component
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

// Interactive and animated 3D model
function InteractiveCharacter({ position }: { position: [number, number, number] }) {
  const gltf = useGLTF("/models/character.glb");
  const texture = useTexture("/textures/character_diffuse.jpg");
  const normal = useTexture("/textures/character_normal.jpg");

  // Apply textures
  gltf.scene.traverse((child: any) => {
    if (child.isMesh) {
      child.material.map = texture;
      child.material.normalMap = normal;
      child.material.needsUpdate = true;
    }
  });

  const ref = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);

  // Animation: rotation + hover effect
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01;
      ref.current.position.y = hovered ? 1 : 0;
      ref.current.scale.setScalar(active ? 1.2 : 1);
    }
  });

  return (
    <primitive
      ref={ref}
      object={gltf.scene}
      position={position}
      scale={1.5}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setActive(!active)}
    />
  );
}

// Main Scene
export default function FinalProject() {
  return (
    <Canvas
      camera={{ position: [0, 2, 7], fov: 50 }}
      style={{ width: "100vw", height: "100vh", background: "#111" }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      <Suspense fallback={<Loader />}>
        {/* Multiple interactive models */}
        <InteractiveCharacter position={[-2, 0, 0]} />
        <InteractiveCharacter position={[0, 0, 0]} />
        <InteractiveCharacter position={[2, 0, 0]} />
      </Suspense>

      <OrbitControls />
    </Canvas>
  );
}
