// components/Car.tsx
'use client';

import { useRef, useState } from 'react';
import { Mesh, Vector3 } from 'three';
import { useFrame } from '@react-three/fiber';

interface CarProps {
  route: [number, number, number][];
  color: string;
  speed: number;
}

export default function Car({ route, color, speed }: CarProps) {
  const meshRef = useRef<Mesh>(null);
  const [currentNode, setCurrentNode] = useState(0);
  const [progress, setProgress] = useState(0);
  
  useFrame((state) => {
    if (route.length < 2 || !meshRef.current) return;
    
    const currentPos = new Vector3(...route[currentNode]);
    const nextPos = new Vector3(...route[(currentNode + 1) % route.length]);
    
    // Calculate direction
    const direction = new Vector3().subVectors(nextPos, currentPos).normalize();
    
    // Update progress
    const deltaProgress = speed * state.clock.getDelta();
    let newProgress = progress + deltaProgress;
    
    // Move to next node if progress exceeds 1
    if (newProgress >= 1) {
      newProgress = 0;
      setCurrentNode((currentNode + 1) % route.length);
    }
    
    setProgress(newProgress);
    
    // Calculate position
    const position = new Vector3().lerpVectors(currentPos, nextPos, newProgress);
    position.y = 0.5; // Keep car above ground
    
    // Update car position and rotation
    meshRef.current.position.copy(position);
    meshRef.current.lookAt(nextPos);
    
    // Add slight bounce animation
    meshRef.current.position.y = 0.5 + Math.sin(state.clock.elapsedTime * 5) * 0.05;
  });

  return (
    <group ref={meshRef} castShadow>
      {/* Car body */}
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[2, 0.6, 4]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.7} />
      </mesh>
      
      {/* Car top */}
      <mesh position={[0, 0.7, 0]}>
        <boxGeometry args={[1.8, 0.4, 2.5]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.7} />
      </mesh>
      
      {/* Wheels */}
      {[[-0.8, -0.8], [0.8, -0.8], [-0.8, 0.8], [0.8, 0.8]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.1, z]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.2]} />
          <meshStandardMaterial color="#111111" roughness={0.8} />
        </mesh>
      ))}
      
      {/* Headlights */}
      <pointLight
        position={[0, 0.5, -2]}
        intensity={0.5}
        distance={10}
        color="#ffffcc"
      />
      
      {/* Taillights */}
      <mesh position={[0, 0.3, 2]}>
        <boxGeometry args={[1.6, 0.2, 0.1]} />
        <meshStandardMaterial
          color="#ff0000"
          emissive="#ff0000"
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  );
}