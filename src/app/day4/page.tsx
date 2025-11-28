"use client";

import React, { useRef, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars, useTexture } from "@react-three/drei";
import * as THREE from "three";

type PlanetProps = {
  name: string;
  size: number;
  distance: number;
  orbitSpeed: number;
  spinSpeed: number;
  textureUrl: string;
};

function Planet({ name, size, distance, orbitSpeed, spinSpeed, textureUrl }: PlanetProps) {
  const orbit = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Mesh>(null);

  const texture = useLoader(THREE.TextureLoader, textureUrl);

  useFrame((_, delta) => {
    if (orbit.current) orbit.current.rotation.y += orbitSpeed * delta;
    if (spin.current) spin.current.rotation.y += spinSpeed * delta;
  });

  return (
    <group ref={orbit}>
      <mesh ref={spin} position={[distance, 0, 0]} castShadow receiveShadow>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial map={texture} />
      </mesh>
    </group>
  );
}

function Sun() {
  const sunTexture = useTexture("/sun.jpg");

  return (
    <group>
      <mesh>
        <sphereGeometry args={[2.6, 64, 64]} />
        <meshPhongMaterial
          emissive="#ff8800"
          emissiveIntensity={1}
          color="#ad6d14"
          map={sunTexture}
        />
      </mesh>
      <pointLight position={[0, 0, 0]} intensity={50} distance={100} castShadow />
    </group>
  );
}

export default function SolarSystem() {
  const planets: PlanetProps[] = [
    { name: "Mercury", size: 0.5, distance: 3.3, orbitSpeed: 0.8, spinSpeed: 0.02, textureUrl: "/mercury.webp" },
    { name: "Venus",   size: 0.35, distance: 4.4, orbitSpeed: 0.6, spinSpeed: 0.015, textureUrl: "/venus.jpg" },
    { name: "Earth",   size: 0.38, distance: 5.2, orbitSpeed: 0.5, spinSpeed: 0.02, textureUrl: "/image.png" },
    { name: "Mars",    size: 0.32, distance: 6.3, orbitSpeed: 0.4, spinSpeed: 0.03, textureUrl: "/mars.jpeg" },
    { name: "Jupiter", size: 0.9, distance: 8.2, orbitSpeed: 0.2, spinSpeed: 0.08, textureUrl: "/jupiter.png" },
    { name: "Saturn",  size: 0.75, distance: 10.2, orbitSpeed: 0.15, spinSpeed: 0.06, textureUrl: "/saturn.jpg" },
    { name: "Uranus",  size: 0.6, distance: 11, orbitSpeed: 0.1, spinSpeed: 0.04, textureUrl: "/uranus.jpg" },
    { name: "Neptune", size: 0.55, distance: 12.5, orbitSpeed: 0.08, spinSpeed: 0.05, textureUrl: "/neptune.jpg" },
  ];

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas shadows camera={{ position: [0, 8, 20], fov: 50 }}>
        <ambientLight intensity={0.1} />
        <Suspense fallback={null}>
          <Sun />
          {planets.map((p) => (
            <Planet key={p.name} {...p} />
          ))}
        </Suspense>
        <Stars radius={100} depth={50} count={30000} factor={0.4} fade />
        <OrbitControls />
      </Canvas>
    </div>
  );
}