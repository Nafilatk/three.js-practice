"use client";

import React, { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { Points } from "@react-three/drei";
import gsap from "gsap";

/**
 * Galaxy parameters - tweak to change look
 */
const PARAMS = {
  count: 12000,         // total stars
  arms: 4,              // spiral arms
  radius: 28,           // galaxy radius
  armSpread: 0.6,       // how wide arms are
  spin: 1.8,            // spin amount (how tight the spiral is)
  randomness: 0.8,      // scatter of stars
  randomnessPower: 3,   // distribution of randomness
  insideColor: "#ffd07a",
  outsideColor: "#7aa7ff",
  starSize: 0.12,
};

export default function Galaxy() {
  const pointsRef = useRef<THREE.Points | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const { camera } = useThree();

  // create positions, colors and sizes once
  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(PARAMS.count * 3);
    const colors = new Float32Array(PARAMS.count * 3);
    const sizes = new Float32Array(PARAMS.count);

    const colorInside = new THREE.Color(PARAMS.insideColor);
    const colorOutside = new THREE.Color(PARAMS.outsideColor);

    for (let i = 0; i < PARAMS.count; i++) {
      const i3 = i * 3;

      // radial distance (0..radius)
      const radius = Math.random() ** 0.7 * PARAMS.radius;

      // which arm
      const arm = i % PARAMS.arms;
      const armAngle = ((arm / PARAMS.arms) * Math.PI * 2);

      // spin factor based on radius
      const spinAngle = radius * PARAMS.spin * 0.1;

      // base angle for this star around center
      const angle = armAngle + spinAngle;

      // randomness offsets
      const randomX = (Math.random() ** PARAMS.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * PARAMS.randomness * (radius / PARAMS.radius);
      const randomY = (Math.random() ** PARAMS.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * PARAMS.randomness * 0.6;
      const randomZ = (Math.random() ** PARAMS.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * PARAMS.randomness * (radius / PARAMS.radius);

      const x = Math.cos(angle) * radius + randomX;
      const y = randomY * (radius / PARAMS.radius); // slightly flatten the galaxy
      const z = Math.sin(angle) * radius + randomZ;

      positions[i3 + 0] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      // mix color by radius
      const t = radius / PARAMS.radius;
      const mixed = colorInside.clone().lerp(colorOutside, t);
      colors[i3 + 0] = mixed.r;
      colors[i3 + 1] = mixed.g;
      colors[i3 + 2] = mixed.b;

      // size variation
      sizes[i] = PARAMS.starSize * (0.6 + Math.random() * 1.4);
    }

    return { positions, colors, sizes };
  }, []);

  // create buffer attributes once
  useEffect(() => {
    const pts = pointsRef.current;
    if (!pts) return;
    const geom = pts.geometry as THREE.BufferGeometry;
    geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geom.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geom.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    geom.attributes.position.needsUpdate = true;
  }, [positions, colors, sizes]);

  // GSAP animations: camera fly-around + galaxy pulse + twinkle
  useEffect(() => {
    // camera initial orbit animation
    const tl = gsap.timeline({ defaults: { duration: 2, ease: "power2.inOut" } });

    // move camera in slightly, rotate around Y
    tl.to(camera.position, { x: 0, y: 10, z: 40, duration: 1.2 }, 0);

    // slow continuous rotation of galaxy group
    if (groupRef.current) {
      gsap.to(groupRef.current.rotation, { y: "+=6.283", duration: 120, repeat: -1, ease: "none" }); // one rev every 120s
      // breathing scale pulse
      gsap.to(groupRef.current.scale, { x: 1.04, y: 1.04, z: 1.04, duration: 8, yoyo: true, repeat: -1, ease: "sine.inOut" });
    }

    // twinkle: animate material size or opacity via timeline
    const pts = pointsRef.current as any;
    if (pts?.material) {
      // animate a custom uniform if we had a shader; fallback: animate rotation and material size slightly
      gsap.to(pts.rotation, { z: 0.02, duration: 1.2, yoyo: true, repeat: -1, ease: "sine.inOut" });
    }

    return () => {
      tl.kill();
    };
  }, [camera]);

  // small per-frame updates: twinkle via modifying colors slightly
  useFrame((state, delta) => {
    const geom = pointsRef.current?.geometry as THREE.BufferGeometry | undefined;
    if (!geom) return;

    // simple twinkle: change alpha via material size/scale or small jitter to colors
    const colorAttr = geom.getAttribute("color") as THREE.BufferAttribute;
    // mutate a few random stars each frame for twinkle effect
    for (let k = 0; k < 10; k++) {
      const idx = Math.floor(Math.random() * PARAMS.count);
      const i3 = idx * 3;
      // gently modulate color brightness
      const r = colorAttr.array[i3 + 0];
      const g = colorAttr.array[i3 + 1];
      const b = colorAttr.array[i3 + 2];
      const boost = 1 + (Math.sin(state.clock.elapsedTime * (0.5 + (idx % 7) * 0.01) + idx) + 1) * 0.02;
      colorAttr.array[i3 + 0] = Math.min(1, r * boost);
      colorAttr.array[i3 + 1] = Math.min(1, g * boost);
      colorAttr.array[i3 + 2] = Math.min(1, b * boost);
    }
    colorAttr.needsUpdate = true;
  });

  return (
    <group ref={groupRef}>
      {/* optional faint central bulge */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[2.4, 32, 16]} />
        <meshStandardMaterial color={"#ffd07a"} emissive={"#442200"} emissiveIntensity={0.2} transparent opacity={0.25} />
      </mesh>

      {/* Points (particles) */}
      <points ref={pointsRef}>
        <bufferGeometry />
        {/* PointsMaterial with vertexColors and size attenuation */}
        <pointsMaterial
          vertexColors
          size={PARAMS.starSize}
          sizeAttenuation
          // map to sprite if you added public/sprites/star.png
          map={null}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          transparent
        />
      </points>
    </group>
  );
}
