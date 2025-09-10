"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Environment } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

// This is the crystal mesh component inside Canvas
function CrystalMesh() {
  const crystalRef = useRef<THREE.Mesh>(null);

  // Rotate crystal slowly inside Canvas
  useFrame((state) => {
    if (crystalRef.current) {
      crystalRef.current.rotation.y += 0.005;
      crystalRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={crystalRef}>
        <icosahedronGeometry args={[1.2, 0]} />
        <meshStandardMaterial
          color="#FFD580"
          metalness={0.6}
          roughness={0.1}
          transparent
          opacity={0.85}
          emissive="#FFA500"
          emissiveIntensity={0.3}
        />
      </mesh>
    </Float>
  );
}

export default function CrystalAvatar() {
  return (
    <div className="w-full h-[400px] md:h-[500px]">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        {/* Crystal Mesh */}
        <CrystalMesh />

        <OrbitControls enableZoom={false} enablePan={false} />
        <Environment preset="sunset" />
      </Canvas>
    </div>
  );
}
