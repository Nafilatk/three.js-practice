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

function Sun() {
  const sunRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(THREE.TextureLoader, "/sun.jpg");

  useFrame((_, delta) => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.10 * delta;
    }
  });

  return (
    <mesh ref={sunRef}>
      <sphereGeometry args={[2, 32, 32]} />
      <meshBasicMaterial
        map={texture}
        toneMapped={false}
      />
      <pointLight intensity={80} color="#ffffaa" />
    </mesh>
  );
}

export default function SolarSystem() {
  const planets = [
    {
      name: "Mercury",
      size: 0.60,
      distance: 4,
      orbitSpeed: 0.8,
      spinSpeed: 0.02,
      textureUrl: "/mercury.webp"
    },
    {
      name: "Venus",
      size: 0.70,
      distance: 6,
      orbitSpeed: 0.7,
      spinSpeed: 0.015,
      textureUrl: "/venus.jpg"
    },
    {
      name: "Earth",
      size: 0.80,
      distance: 8,
      orbitSpeed: 0.6,
      spinSpeed: 0.02,
      textureUrl: "/earth.jpg"
    },
    {
      name: "Mars",
      size: 0.90,
      distance: 10,
      orbitSpeed: 0.5,
      spinSpeed: 0.03,
      textureUrl: "/mars.jpeg"
    },
    {
      name: "Jupiter",
      size: 0.90,
      distance: 13,
      orbitSpeed: 0.4,
      spinSpeed: 0.08,
      textureUrl: "/jupiter.png"
    },
    {
      name: "Saturn",
      size: 0.95,
      distance: 16,
      orbitSpeed: 0.3,
      spinSpeed: 0.06,
      textureUrl: "/saturn.jpg"
    },
    {
      name: "Uranus",
      size: 0.95,
      distance: 19,
      orbitSpeed: 0.2,
      spinSpeed: 0.04,
      textureUrl: "/uranus.jpg"
    },
    {
      name: "Neptune",
      size: 1,
      distance: 22,
      orbitSpeed: 0.13,
      spinSpeed: 0.05,
      textureUrl: "/neptune.jpg"
    },
  ];

  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      margin: 0,
      padding: 0,
      overflow: "hidden",
      position: "fixed",
      top: 0,
      left: 0
    }}>
      <Canvas camera={{ position: [0, 10, 25] }}>
        <color attach="background" args={["#000011"]} />

        <ambientLight intensity={0.8} color="#ffffff" />

        <directionalLight
          position={[10, 10, 5]}
          intensity={1.5}
          color="#ffffff"
          castShadow
        />

        <pointLight
          intensity={0.8}
          distance={50}
          color="#ffffff"
        />

        <Sun />

        {planets.map((planet) => (
          <Planet
            key={planet.name}
            size={planet.size}
            distance={planet.distance}
            orbitSpeed={planet.orbitSpeed}
            spinSpeed={planet.spinSpeed}
            textureUrl={planet.textureUrl}
          />
        ))}

        <Stars />
        <OrbitControls />
      </Canvas>
    </div>
  );
}