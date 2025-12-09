// components/Building.tsx
'use client';

import { useRef } from 'react';
import { Mesh } from 'three';
import { useFrame } from '@react-three/fiber';

interface BuildingProps {
  position: [number, number, number];
  height: number;
  width: number;
  depth: number;
  color: string;
}

export default function Building({ position, height, width, depth, color }: BuildingProps) {
  const meshRef = useRef<Mesh>(null);
  const windowsRef = useRef<Mesh>(null);
  
  // Create windows
  const windows = [];
  const numFloors = Math.floor(height / 3);
  const numWindowsPerFloor = Math.floor(width / 2);
  
  for (let floor = 0; floor < numFloors; floor++) {
    for (let window = 0; window < numWindowsPerFloor; window++) {
      const x = (window - numWindowsPerFloor / 2) * 1.8 + 0.9;
      const y = floor * 3 + 1.5;
      const z = depth / 2 + 0.1;
      
      windows.push(
        <mesh
          key={`${floor}-${window}`}
          position={[x, y, z]}
          castShadow
        >
          <planeGeometry args={[1.2, 1.5]} />
          <meshStandardMaterial
            color={Math.random() > 0.7 ? '#ffffaa' : '#333344'}
            emissive={Math.random() > 0.7 ? '#ffffaa' : '#000000'}
            emissiveIntensity={Math.random() > 0.7 ? 0.5 : 0}
          />
        </mesh>
      );
    }
  }

  return (
    <group position={position} castShadow>
      {/* Main building structure */}
      <mesh ref={meshRef} castShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
      
      {/* Rooftop */}
      <mesh position={[0, height / 2 + 0.5, 0]} castShadow>
        <boxGeometry args={[width + 1, 1, depth + 1]} />
        <meshStandardMaterial color="#555566" />
      </mesh>
      
      {/* Windows */}
      <group position={[0, 0, 0]}>
        {windows}
      </group>
      
      {/* Back windows */}
      <group position={[0, 0, 0]} rotation={[0, Math.PI, 0]}>
        {windows}
      </group>
    </group>
  );
}