"use client";

import { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";

function Planet({ size, distance, orbitSpeed, spinSpeed, textureUrl }: {
  size: number;
  distance: number;
  orbitSpeed: number;
  spinSpeed: number;
  textureUrl: string;
}) {
  const orbitRef = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Mesh>(null);

  const texture = useLoader(THREE.TextureLoader, textureUrl);

  useFrame((_, delta) => {
    if (orbitRef.current) {
      orbitRef.current.rotation.y += orbitSpeed * delta;

    }
    if (planetRef.current) {
      planetRef.current.rotation.y += spinSpeed * delta;
    }
  });

  return (
    <group ref={orbitRef}>
      <mesh ref={planetRef} position={[distance, 0, 0]}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial
          map={texture}
          emissive="#222222"
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  );
}
