import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';

export default function CentralStar() {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.scale.x = 1 + Math.sin(t * 1.5) * 0.05;
      meshRef.current.scale.y = 1 + Math.sin(t * 1.5) * 0.05;
      meshRef.current.scale.z = 1 + Math.sin(t * 1.5) * 0.05;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Outer Glow */}
      <mesh scale={[1.2, 1.2, 1.2]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial color="#FACC15" transparent opacity={0.1} />
      </mesh>
      
      {/* Inner Star */}
      <Sphere ref={meshRef} args={[1, 64, 64]}>
        <MeshDistortMaterial
          color="#FACC15"
          emissive="#FACC15"
          emissiveIntensity={2}
          distort={0.4}
          speed={2}
          roughness={0.1}
          metalness={1}
        />
      </Sphere>
      
      <pointLight color="#FACC15" intensity={10} distance={10} decay={2} />
    </group>
  );
}
