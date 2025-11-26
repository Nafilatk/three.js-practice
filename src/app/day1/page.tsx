"use client";

import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import type { Mesh } from "three";

function RotatingCube() {
    const cubeRef = useRef<Mesh>(null);

    return (
        <mesh
            ref={cubeRef}
            rotation={[0, 0, 0]}
            onBeforeRender={() => {
                if (cubeRef.current) {
                    cubeRef.current.rotation.x += 0.01;
                    cubeRef.current.rotation.y += 0.01;
                }
            }}
        >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="yellow" />
        </mesh>
    );
}

export default function CubeScene() {
    return (
        <Canvas
            camera={{ position: [0, 0, 4], fov: 75 }}
            style={{ width: "100%", height: "100vh" }}
        >
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <RotatingCube />
            <OrbitControls />
        </Canvas>
    );
}
