// components/CityScene.tsx
'use client';

import { useMemo, useRef } from 'react';
import { Grid } from '@react-three/drei';
import Building from './Building';
import StreetLight from './StreetLights';
import Car from './Cars';
import RoadSystem from './RoadSystem';

const CITY_SIZE = 200;
const STREET_SPACING = 20;
const NUM_BUILDINGS = 50;
const NUM_STREET_LIGHTS = 40;
const NUM_CARS = 15;

export default function CityScene() {
  const buildingPositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < NUM_BUILDINGS; i++) {
      const x = Math.floor(Math.random() * CITY_SIZE) - CITY_SIZE / 2;
      const z = Math.floor(Math.random() * CITY_SIZE) - CITY_SIZE / 2;
      
      // Avoid placing buildings in road areas
      if (x % STREET_SPACING < 5 && z % STREET_SPACING < 5) continue;
      
      positions.push({
        position: [x, 0, z] as [number, number, number],
        height: Math.random() * 20 + 5,
        width: Math.random() * 8 + 4,
        depth: Math.random() * 8 + 4,
        color: `hsl(${Math.random() * 30 + 200}, 30%, ${Math.random() * 20 + 40}%)`
      });
    }
    return positions;
  }, []);

  const streetLightPositions = useMemo(() => {
    const positions = [];
    const halfSize = CITY_SIZE / 2;
    
    for (let i = -halfSize; i <= halfSize; i += STREET_SPACING) {
      for (let j = -halfSize; j <= halfSize; j += STREET_SPACING) {
        if (Math.random() > 0.7) {
          positions.push([
            i + (Math.random() - 0.5) * 4,
            0,
            j + (Math.random() - 0.5) * 4
          ] as [number, number, number]);
        }
      }
    }
    return positions;
  }, []);

  const carRoutes = useMemo(() => {
    const routes = [];
    const roadPoints = [];
    const halfSize = CITY_SIZE / 2;
    
    // Create road grid points
    for (let x = -halfSize; x <= halfSize; x += STREET_SPACING) {
      for (let z = -halfSize; z <= halfSize; z += STREET_SPACING) {
        roadPoints.push([x, 0, z]);
      }
    }
    
    // Create car routes
    for (let i = 0; i < NUM_CARS; i++) {
      const routeLength = Math.floor(Math.random() * 10) + 5;
      const route = [];
      
      // Start at random road point
      let currentPoint = Math.floor(Math.random() * roadPoints.length);
      
      for (let j = 0; j < routeLength; j++) {
        route.push(roadPoints[currentPoint]);
        
        // Move to adjacent road point
        const direction = Math.floor(Math.random() * 4);
        switch (direction) {
          case 0: currentPoint += 1; break; // right
          case 1: currentPoint -= 1; break; // left
          case 2: currentPoint += Math.sqrt(roadPoints.length); break; // forward
          case 3: currentPoint -= Math.sqrt(roadPoints.length); break; // backward
        }
        
        // Clamp to valid range
        currentPoint = Math.max(0, Math.min(roadPoints.length - 1, currentPoint));
      }
      
      routes.push({
        route: route as [number, number, number][],
        color: `hsl(${Math.random() * 360}, 70%, 50%)`,
        speed: Math.random() * 0.5 + 0.3
      });
    }
    
    return routes;
  }, []);

  return (
    <group>
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[CITY_SIZE * 2, CITY_SIZE * 2]} />
        <meshStandardMaterial color="#222233" />
      </mesh>
      
      {/* Road Grid */}
      <Grid
        args={[CITY_SIZE, CITY_SIZE]}
        cellSize={STREET_SPACING}
        cellThickness={1}
        cellColor="#444455"
        sectionSize={STREET_SPACING * 5}
        sectionThickness={1.5}
        sectionColor="#666677"
        fadeDistance={CITY_SIZE}
        fadeStrength={1}
      />
      
      {/* Road System */}
      <RoadSystem citySize={CITY_SIZE} streetSpacing={STREET_SPACING} />
      
      {/* Buildings */}
      {buildingPositions.map((building, index) => (
        <Building key={index} {...building} />
      ))}
      
      {/* Street Lights */}
      {streetLightPositions.map((position, index) => (
        <StreetLight key={index} position={position} />
      ))}
      
      {/* Cars */}
      {carRoutes.map((car, index) => (
        <Car key={index} {...car} />
      ))}
    </group>
  );
}