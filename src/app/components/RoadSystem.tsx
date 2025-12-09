// components/RoadSystem.tsx
'use client';

interface RoadSystemProps {
  citySize: number;
  streetSpacing: number;
}

export default function RoadSystem({ citySize, streetSpacing }: RoadSystemProps) {
  const roads = [];
  const halfSize = citySize / 2;
  
  // Create horizontal roads
  for (let z = -halfSize; z <= halfSize; z += streetSpacing) {
    roads.push(
      <mesh
        key={`road-h-${z}`}
        position={[0, 0.01, z]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[citySize, streetSpacing - 2]} />
        <meshStandardMaterial
          color="#333344"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>
    );
  }
  
  // Create vertical roads
  for (let x = -halfSize; x <= halfSize; x += streetSpacing) {
    roads.push(
      <mesh
        key={`road-v-${x}`}
        position={[x, 0.01, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[streetSpacing - 2, citySize]} />
        <meshStandardMaterial
          color="#333344"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>
    );
  }
  
  // Road markings
  const markings = [];
  for (let z = -halfSize; z <= halfSize; z += streetSpacing) {
    for (let x = -halfSize; x <= halfSize; x += 5) {
      if (Math.abs(x) % streetSpacing < 2) continue;
      
      markings.push(
        <mesh
          key={`marking-${x}-${z}`}
          position={[x, 0.02, z]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[0.5, 0.1]} />
          <meshStandardMaterial color="#ffff00" emissive="#ffff00" emissiveIntensity={0.2} />
        </mesh>
      );
    }
  }

  return (
    <group>
      {roads}
      {markings}
    </group>
  );
}