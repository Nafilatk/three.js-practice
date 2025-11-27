"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

export default function GalaxyScene() {
  return (
    <Canvas
      camera={{ position: [4, 2, 5], fov: 50 }}
      gl={{ antialias: true }}
      style={{ width: "100vw", height: "100vh", background: "#201919" }}
    >
      <OrbitControls enableDamping minDistance={0.1} maxDistance={50} />
      <Galaxy />
    </Canvas>
  );
}

function Galaxy() {
  const count = 20000;
  const branches = 3;
  const radius = 5;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const colorInside = new THREE.Color("#ffa575");
    const colorOutside = new THREE.Color("#311599");

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      const rRatio = Math.random();
      const r = Math.pow(rRatio, 1.5) * radius;

      const branch = i % branches;
      const angle = branch * ((2 * Math.PI) / branches) + rRatio * 4;

      pos[i3] = Math.cos(angle) * r;
      pos[i3 + 1] = 0;
      pos[i3 + 2] = Math.sin(angle) * r;

      pos[i3] += (Math.random() - 0.5) * rRatio * 2;
      pos[i3 + 1] += (Math.random() - 0.5) * rRatio * 2;
      pos[i3 + 2] += (Math.random() - 0.5) * rRatio * 2;

      const mixed = colorInside.clone().lerp(colorOutside, 1 - rRatio);
      colors[i3] = mixed.r;
      colors[i3 + 1] = mixed.g;
      colors[i3 + 2] = mixed.b;
    }

    return { pos, colors };
  }, []);

  const points = useRef();

  useFrame(({ clock }) => {
    if (points.current) {
      points.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes.position"
          array={positions.pos}
          count={positions.pos.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes.color"
          array={positions.colors}
          count={positions.colors.length / 3}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        size={0.08}
        sizeAttenuation
        vertexColors
        depthWrite={false}
        transparent
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
