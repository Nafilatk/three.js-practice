// components/StreetLight.tsx
'use client';

import { useRef } from 'react';
import { Mesh, PointLight } from 'three';
import { useFrame } from '@react-three/fiber';

interface StreetLightProps {
  position: [number, number, number];
}

export default function StreetLight({ position }: StreetLightProps) {
  const lightRef = useRef<PointLight>(null);
  const poleRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (lightRef.current) {
      // Subtle light flicker
      lightRef.current.intensity = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.1;
    }
  });

  return (
    <group position={position}>
      {/* Pole */}
      <mesh ref={poleRef} castShadow>
        <cylinderGeometry args={[0.2, 0.3, 10]} />
        <meshStandardMaterial color="#444444" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Light fixture */}
      <mesh position={[0, 5, 0]} castShadow>
        <sphereGeometry args={[0.8]} />
        <meshStandardMaterial
          color="#ffffaa"
          emissive="#ffffaa"
          emissiveIntensity={0.5}
        />
      </mesh>
      
      {/* Arm */}
      <mesh position={[0, 5, -1]} rotation={[0, 0, -Math.PI / 4]}>
        <cylinderGeometry args={[0.1, 0.1, 2]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      
      {/* Light */}
      <pointLight
        ref={lightRef}
        position={[0, 5, -2]}
        intensity={1}
        distance={20}
        color="#ffffaa"
        castShadow
        shadow-mapSize={[256, 256]}
      />
    </group>
  );
}