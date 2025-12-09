// app/page.tsx
'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sky, Environment, Stats } from '@react-three/drei';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { Suspense } from 'react';
import CityScene from '@/app/components/CityScene';

export default function Home() {
  return (
    <div className="w-screen h-screen">
      <Canvas
        shadows
        camera={{ position: [100, 100, 100], fov: 50 }}
      >
        <Suspense fallback={null}>
          <CityScene />
          
          {/* Lighting */}
          <ambientLight intensity={0.3} />
          <directionalLight
            position={[100, 200, 100]}
            intensity={1}
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-camera-left={-200}
            shadow-camera-right={200}
            shadow-camera-top={200}
            shadow-camera-bottom={-200}
          />
          
          {/* Environment */}
          <Sky
            distance={450000}
            sunPosition={[100, 20, 100]}
            inclination={0}
            azimuth={0.25}
          />
          <Environment preset="city" />
          
          {/* Effects */}
          <EffectComposer>
            <Bloom intensity={0.5} luminanceThreshold={0.9} />
          </EffectComposer>
          
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            maxPolarAngle={Math.PI / 2}
            minDistance={20}
            maxDistance={300}
          />
          
          <Stats />
        </Suspense>
      </Canvas>
    </div>
  );
}