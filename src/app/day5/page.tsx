"use client"
import * as THREE from "three"
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Environment, OrbitControls, Sky, useTexture } from "@react-three/drei";

function RotatingCube() {
   const ref = useRef<THREE.Mesh>(null!);


  const texture=useTexture("/globe.svg")
 
  useFrame(() => {
    ref.current.rotation.y += 0.01;
  });
  return (

    <mesh  ref={ref}>
      <sphereGeometry args={[1.1,64 ,64]} />
      <meshStandardMaterial color="white" map={texture} />
    </mesh>
    
  );
}

export default function App() {
  return (
    <div className=" w-screen  h-screen">
    <Canvas>
        <Sky sunPosition={[100, 10, 13]} />
        <Environment preset="sunset"/>
      <directionalLight />
      <RotatingCube />
      <OrbitControls/>
    </Canvas>
    </div>
  );
}


