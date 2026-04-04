import React, { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sphere, Text, Environment, Sparkles } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, ChromaticAberration, Noise } from '@react-three/postprocessing';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';

import StarField from './StarField';
import CentralStar from './CentralStar';
import Planet from './Planet';

const SECTIONS = [
  { id: 'about', name: 'About', color: '#38BDF8', angle: 0, distance: 7 },
  { id: 'skills', name: 'Skills', color: '#8B5CF6', angle: (Math.PI * 2) / 5, distance: 8 },
  { id: 'projects', name: 'Projects', color: '#F472B6', angle: (Math.PI * 4) / 5, distance: 9 },
  { id: 'experience', name: 'Experience', color: '#FACC15', angle: (Math.PI * 6) / 5, distance: 7 },
  { id: 'contact', name: 'Contact', color: '#10B981', angle: (Math.PI * 8) / 5, distance: 6 },
];

function CameraRig({ activeSection }) {
  const { camera, mouse } = useThree();
  const vec = new THREE.Vector3();

  useFrame((state, delta) => {
    if (activeSection) {
      const section = SECTIONS.find(s => s.id === activeSection);
      if (section) {
        const x = Math.cos(section.angle) * section.distance;
        const z = Math.sin(section.angle) * section.distance;
        vec.set(x, 1, z + 3);
        camera.position.lerp(vec, 0.04);
        state.camera.lookAt(x, 0, z);
      }
    } else {
      vec.set(0, 2, 12);
      camera.position.lerp(vec, 0.04);
      state.camera.lookAt(0, 0, 0);
    }

    // Smooth camera mouse float
    camera.position.x += (mouse.x * 0.8 - (camera.position.x - vec.x)) * 0.02;
    camera.position.y += (-mouse.y * 0.8 - (camera.position.y - vec.y)) * 0.02;
  });

  return null;
}

export default function GalaxyScene({ activeSection, onPlanetClick }) {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 bg-bg-deep">
      <Canvas
        shadows
        gl={{ antialias: true, stencil: false, depth: true }}
        camera={{ position: [0, 5, 20], fov: 45 }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#020617']} />

        {/* Lights */}
        <ambientLight intensity={0.4} />
        <PointLightRig />

        {/* Post-Processing - Makes it GLOW */}
        <EffectComposer disableNormalPass>
          <Bloom
            intensity={1.0}
            luminanceThreshold={0.9}
            mipmapBlur
          />
          <Noise opacity={0.02} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>

        <Suspense fallback={null}>
          <Environment preset="night" />
          <StarField />
          <Sparkles count={200} scale={20} size={2} speed={0.4} color="#38BDF8" />
          <CentralStar />

          {/* Orbiting Planets */}
          {SECTIONS.map((section) => {
            const x = Math.cos(section.angle) * section.distance;
            const z = Math.sin(section.angle) * section.distance;

            return (
              <Planet
                key={section.id}
                position={[x, 0, z]}
                color={section.color}
                name={section.name}
                isActive={activeSection === section.id}
                onClick={() => onPlanetClick(section.id)}
              >
                {/* Unique details per planet */}
                {section.id === 'experience' && <PlanetRing color={section.color} />}
                {section.id === 'skills' && <SkillSatellites color={section.color} />}
                {section.id === 'projects' && <ProjectOrbitals color={section.color} />}
              </Planet>
            );
          })}
        </Suspense>

        <CameraRig activeSection={activeSection} />
      </Canvas>
    </div>
  );
}

// Sub-components to keep scene clean
function PointLightRig() {
  return (
    <group>
      <pointLight position={[10, 10, 10]} intensity={1} color="#38BDF8" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8B5CF6" />
    </group>
  );
}

function PlanetRing({ color }) {
  return (
    <mesh rotation={[Math.PI / 2, 0.1, 0]}>
      <torusGeometry args={[1.3, 0.02, 16, 100]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} transparent opacity={0.4} />
    </mesh>
  );
}

function SkillSatellites({ color }) {
  return (
    <group>
      {[0, 1, 2, 3].map((i) => (
        <Float key={i} speed={4} rotationIntensity={2} floatIntensity={1} position={[1.2 * Math.cos(i * (Math.PI / 2)), 0.6 * Math.sin(i * 2), 1.2 * Math.sin(i * (Math.PI / 2))]}>
          <Sphere args={[0.08, 16, 16]}>
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={5} />
          </Sphere>
          <pointLight color={color} intensity={2} distance={1.5} />
        </Float>
      ))}
    </group>
  );
}

function ProjectOrbitals({ color }) {
  return (
    <mesh rotation={[Math.PI / 4, 0, 0]}>
      <torusGeometry args={[1.5, 0.01, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.25} />
    </mesh>
  );
}
