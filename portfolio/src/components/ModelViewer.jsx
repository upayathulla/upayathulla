import React, { Suspense, useMemo, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Center, Preload, PerspectiveCamera, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

function Model({ url, onLoadError }) {
  try {
    const { scene } = useGLTF(url);
    const clonedScene = useMemo(() => scene.clone(), [scene]);
    
    useEffect(() => {
      clonedScene.traverse((obj) => {
        if (obj.isMesh) {
          obj.castShadow = true;
          obj.receiveShadow = true;
          if (obj.material) {
             obj.material.side = THREE.DoubleSide;
             // Add a subtle metallic/neon boost for cyberpunk feel
             if (obj.material.metalness !== undefined) obj.material.metalness = 0.8;
             if (obj.material.roughness !== undefined) obj.material.roughness = 0.2;
          }
        }
      });
    }, [clonedScene]);

    return <primitive object={clonedScene} />;
  } catch (err) {
    onLoadError(err.message);
    return null;
  }
}

export default function ModelViewer({ modelPath, fallbackIcon, scale = 1, cameraPosition = [5,   5, 5] }) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="w-full h-full relative bg-transparent flex items-center justify-center overflow-hidden">
      
      {/* Loading Handshake HUD */}
      {!isLoaded && !error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-primary/40 font-mono text-[9px] uppercase tracking-[0.5em] bg-transparent z-10 transition-opacity">
           <div className="w-20 h-px bg-primary/20 relative overflow-hidden mb-6">
              <div className="absolute inset-0 bg-primary animate-scanning" />
           </div>
           {fallbackIcon || "CORE_SYNCING..."}
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 z-50 bg-[#080a0c] flex items-center justify-center p-8 border border-red-500/20">
           <p className="text-red-500 font-mono text-[8px] uppercase text-center leading-relaxed">
              [ ACCESS_DENIED ]<br/>
              {error}<br/>
              PATH: {modelPath}
           </p>
        </div>
      )}

      <Canvas 
        shadows
        dpr={[1, 2]}
        onCreated={() => setIsLoaded(true)}
        onError={(err) => setError(err.message)}
        className="w-full h-full pointer-events-auto"
        gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}
      >
        <PerspectiveCamera makeDefault position={cameraPosition} fov={30} />
        
        {/* Cinematic Studio Lighting */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
        <directionalLight position={[-5, 5, -5]} intensity={1} color="#FF4D4D" />
        <pointLight position={[0, -2, 5]} intensity={1} color="#FF8000" />
        
        <Suspense fallback={null}>
          <Center top scale={scale}>
            <Model url={modelPath} onLoadError={setError} />
          </Center>
        </Suspense>

        <Environment preset="city" />
        <ContactShadows position={[0, -1.4, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />

        <OrbitControls 
          enableZoom={false} 
          autoRotate 
          autoRotateSpeed={0.8}
          minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 1.5}
          makeDefault
        />
        <Preload all />
      </Canvas>
    </div>
  );
}

// Global pre-load
if (typeof window !== "undefined") {
  useGLTF.preload("/models/cyberpunk_laptop.glb");
}
