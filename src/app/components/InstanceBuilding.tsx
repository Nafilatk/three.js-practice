// components/InstancedBuildings.tsx
'use client';

import { useRef, useMemo } from 'react';
import { InstancedMesh, Matrix4, Color } from 'three';
import { useFrame } from '@react-three/fiber';

const NUM_INSTANCES = 200;

export default function InstancedBuildings() {
  const meshRef = useRef<InstancedMesh>(null);
  
  const { matrices, colors } = useMemo(() => {
    const matrices = [];
    const colors = [];
    const matrix = new Matrix4();
    const color = new Color();
    
    for (let i = 0; i < NUM_INSTANCES; i++) {
      const x = Math.random() * 200 - 100;
      const z = Math.random() * 200 - 100;
      const height = Math.random() * 20 + 5;
      const width = Math.random() * 8 + 4;
      const depth = Math.random() * 8 + 4;
      
      // Position and scale
      matrix.compose(
        { x, y: height / 2, z, isVector3: true } as any,
        { x: 0, y: 0, z: 0, w: 1, isQuaternion: true } as any,
        { x: width, y: height, z: depth, isVector3: true } as any
      );
      matrices.push(matrix.clone());
      
      // Color
      colors.push(
        color.setHSL(
          Math.random() * 0.1 + 0.6,
          Math.random() * 0.2 + 0.2,
          Math.random() * 0.2 + 0.3
        )
      );
    }
    
    return { matrices, colors };
  }, []);

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, NUM_INSTANCES]}
      castShadow
    >
      <boxGeometry>
        <instancedBufferAttribute
          attach="attributes-color"
          args={[new Float32Array(colors.flatMap(c => [c.r, c.g, c.b])), 3]}
        />
      </boxGeometry>
      <meshStandardMaterial vertexColors />
    </instancedMesh>
  );
}