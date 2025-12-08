"use client"
import * as THREE from "three"
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Environment, OrbitControls, Sparkles, useTexture } from "@react-three/drei";

function RotatingSphere() {
  const ref = useRef<THREE.Mesh | null>(null);

  const  texture = useTexture("/image.png");

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y  += 0.01 ;
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1.1, 100, 100]} />
      <meshStandardMaterial color="white" map={texture} />
    </mesh>
  );
}

export default function App() {
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
      <Canvas
        style={{ display: "block" }}
        camera={{ position: [0, 0, 5] }}
      >
        <color attach="background" args={["#000000"]} />

        <Environment preset="sunset" />

        <ambientLight intensity={0.6} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow={true}
        />
        <Sparkles
          count={1000}
          speed={0.3}
          scale={10}
          size={1.5}
          color="#4ade80"
        />

        <RotatingSphere />
        <OrbitControls />
      </Canvas>

    </div>
  );
}