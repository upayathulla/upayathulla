import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Html, Text, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export default function Planet({ 
  position, 
  color, 
  name, 
  onClick, 
  isActive, 
  distort = 0.3, 
  children 
}) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
        meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group position={position}>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Sphere
          ref={meshRef}
          args={[0.8, 64, 64]}
          onClick={onClick}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <MeshDistortMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hovered || isActive ? 1.5 : 0.5}
            distort={distort}
            speed={2}
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={0.9}
          />
        </Sphere>
        
        {/* Planet Name Label */}
        <Text
          position={[0, 1.4, 0]}
          fontSize={0.25}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor={color}
          outlineOpacity={0.2}
        >
          {name}
        </Text>

        {/* Glow effect */}
        <pointLight color={color} intensity={isActive ? 15 : 5} distance={3} decay={2} />
        
        {children}
      </Float>
    </group>
  );
}
