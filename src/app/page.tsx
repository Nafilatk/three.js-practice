"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Text3D,
  Center,
  Float,
  Environment,
  Sparkles,
  ContactShadows
} from "@react-three/drei";
import type { Group } from "three";

function ThreeDText() {
  const textRef = useRef<Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(t * 0.5) * 0.15;
    }
  });

  return (
    <Center position={[0, 0, 0]}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.6}>
        <group ref={textRef}>
          <Text3D
            font="/fonts/helvetiker_regular.typeface.json"
            size={0.6}
            height={0.15}
            position={[0, 1.5, 0]}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
            curveSegments={12}
          >
            Welcome to
            <meshStandardMaterial color="#4ade80" />
          </Text3D>
          

          
          <Text3D
            font="/fonts/helvetiker_regular.typeface.json"
            size={0.6}
            height={0.15}
            position={[0.5, -0.5, 0]}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
            curveSegments={12}
          >
            Three.js
            <meshStandardMaterial color="#4ade80" />
          </Text3D>
        </group>
      </Float>
    </Center>
  );
}

export default function Home() {
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
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ display: "block" }}
      >
        <color attach="background" args={["#0f0f23"]} />

        <ambientLight intensity={0.6} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1} 
          color="#ffffff"
        />
        <pointLight 
          position={[-10, -10, -10]} 
          intensity={0.5} 
          color="#36c66bff"
        />

        <Sparkles 
          count={100} 
          speed={0.3} 
          scale={50} 
          size={1.5} 
          color="#4ade80"
        />

        <ContactShadows
          position={[0, -3, 0]}
          opacity={0.6}
          scale={15}
          blur={2.5}
          far={10}
        />

        <ThreeDText />

        <OrbitControls 
          enableZoom={true}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minDistance={5}
          maxDistance={15}
        />

        <Environment preset="studio" />
      </Canvas>

      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          overflow: hidden;
          background: #0f0f23;
        }
        #__next {
          width: 100vw;
          height: 100vh;
        }
      `}</style>
    </div>
  );
}