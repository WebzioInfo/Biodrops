"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { useScroll, useSpring } from "framer-motion";

function Jar() {
  const groupRef = useRef<THREE.Group>(null!);
  
  // Track scroll progress for the whole page
  const { scrollYProgress } = useScroll();
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001
  });

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    const scroll = smoothScroll.get(); // 0 to 1

    // Rotation narrative based on scroll depth
    groupRef.current.rotation.y = scroll * Math.PI * 4; // Rotate twice over the page
    
    // Position narrative (Moves slightly down/up to feel parallax)
    // Starts center, moves slightly up, then center
    groupRef.current.position.y = Math.sin(scroll * Math.PI) * 0.5;

    // Scale narrative
    const scale = 1 + Math.sin(scroll * Math.PI) * 0.15;
    groupRef.current.scale.set(scale, scale, scale);

    // Subtle float independent of scroll
    const time = state.clock.getElapsedTime();
    groupRef.current.position.y += Math.sin(time * 1.5) * 0.05;
  });

  return (
    <group ref={groupRef}>
      {/* Main body of jar */}
      <mesh castShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[0.9, 0.85, 2.8, 64, 1, true]} />
        <meshPhysicalMaterial
          side={THREE.DoubleSide}
          transmission={0.98}
          thickness={0.5}
          roughness={0.02}
          metalness={0.1}
          ior={1.5}
          envMapIntensity={1.5}
          color="#f0f8ff"
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Water fill */}
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[0.84, 0.80, 2.1, 64]} />
        <meshPhysicalMaterial
          transmission={0.95}
          thickness={2}
          roughness={0}
          metalness={0}
          ior={1.33}
          color="#B9F3F8"
          transparent
          opacity={0.8}
          envMapIntensity={1.2}
        />
      </mesh>

      {/* Top cap */}
      <mesh position={[0, 1.4, 0]}>
        <cylinderGeometry args={[0.9, 0.9, 0.05, 64]} />
        <meshPhysicalMaterial
          transmission={0.8}
          roughness={0.05}
          metalness={0.1}
          color="#E0F7FA"
        />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 1.6, 0]}>
        <cylinderGeometry args={[0.35, 0.55, 0.4, 32]} />
        <meshPhysicalMaterial
          transmission={0.9}
          roughness={0.02}
          metalness={0.05}
          color="#E0F7FA"
        />
      </mesh>

      {/* Cap/lid */}
      <mesh position={[0, 1.85, 0]}>
        <cylinderGeometry args={[0.38, 0.38, 0.12, 32]} />
        <meshStandardMaterial
          color="#FFFFFF"
          metalness={0.1}
          roughness={0.2}
        />
      </mesh>

      {/* Bottom cap */}
      <mesh position={[0, -1.42, 0]}>
        <cylinderGeometry args={[0.85, 0.85, 0.08, 64]} />
        <meshPhysicalMaterial
          transmission={0.8}
          roughness={0.05}
          metalness={0.1}
          color="#E0F7FA"
        />
      </mesh>
    </group>
  );
}

function SceneLights() {
  return (
    <>
      <ambientLight intensity={1.5} color="#ffffff" />
      <directionalLight position={[5, 10, 5]} intensity={1.5} color="#ffffff" castShadow />
      <pointLight position={[-5, 5, -5]} intensity={1} color="#B9F3F8" />
      <pointLight position={[0, -5, 5]} intensity={0.5} color="#56C7D9" />
    </>
  );
}

export default function JarScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 6.5], fov: 35 }}
      gl={{
        antialias: true,
        alpha: true,
        toneMapping: THREE.ACESFilmicToneMapping,
      }}
      style={{ background: "transparent" }}
    >
      <SceneLights />
      <Environment preset="studio" environmentIntensity={0.8} />
      <Jar />
      {/* Global shadow floor */}
      <ContactShadows
        position={[0, -2.5, 0]}
        opacity={0.1}
        scale={6}
        blur={3}
        color="#070D0E"
      />
    </Canvas>
  );
}
