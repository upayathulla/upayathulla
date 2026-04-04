import React, { Suspense, useEffect, useRef, useMemo, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations, OrbitControls, PerspectiveCamera, useTexture } from "@react-three/drei";
import { motion, useInView } from "framer-motion";
import { developerDetails } from "../data/portfolio-data";
import { Cpu, ExternalLink, Phone, Mail, MapPin, Globe } from "lucide-react";

import { EffectComposer, Bloom, Glitch } from "@react-three/postprocessing";
import { GlitchMode } from "postprocessing";

// Memoize the Spider model to prevent re-processing textures/materials
const SpiderModel = React.memo(({ isAttacking, onAnimationEnd }) => {
   const group = useRef();
   const webMeshes = useRef([]);
   const { scene, animations } = useGLTF("/models/spider_walk_and_attack.glb");
   const { actions } = useAnimations(animations, group);

   // Load original textures
   const [textureD, textureR] = useTexture([
      "/textures/texture_d.png",
      "/textures/texture_r.png"
   ]);

   // Configure materials only once
   useEffect(() => {
      if (textureD) textureD.colorSpace = THREE.SRGBColorSpace;
      if (textureR) textureR.colorSpace = THREE.NoColorSpace;

      webMeshes.current = [];
      scene.traverse((child) => {
         if (child.isMesh) {
            // Shadows disabled for performance boost (no ground anyway)
            child.castShadow = false;
            child.receiveShadow = false;
            const name = child.name.toLowerCase();
            const isWeb = name.includes("web") || name.includes("silk") || name.includes("plane") || name.includes("curtain");
            const isSpider = !isWeb;

            if (child.material) {
               child.material = child.material.clone();

               if (isSpider) {
                  child.material.map = textureD;
                  child.material.roughnessMap = textureR;
                  child.material.metalness = 0.5;
                  child.material.roughness = 0.8;
                  child.material.emissiveMap = textureD;
                  child.material.emissiveIntensity = 2.5;
                  child.material.emissive = new THREE.Color("#ff003c");
               } else {
                  child.material.map = null;
                  child.material.color = new THREE.Color("#40ff00");
                  child.material.emissive = new THREE.Color("#40ff00");
                  child.material.emissiveIntensity = 1.5;
                  child.material.transparent = true;
                  child.material.opacity = 0.8;
                  webMeshes.current.push(child);
               }
               child.material.needsUpdate = true;
            }
         }
      });
   }, [scene, textureD, textureR]);

   useEffect(() => {
      const actionNames = Object.keys(actions);
      const walkAction = actions[actionNames.find(name => name.toLowerCase().includes("walk")) || actionNames[0]];
      const attackAction = actions[actionNames.find(name => name.toLowerCase().includes("attack"))];

      if (isAttacking && attackAction) {
         walkAction?.fadeOut(0.2);
         attackAction.reset().fadeIn(0.2).setLoop(THREE.LoopOnce, 1).play();

         const timer = setTimeout(() => {
            onAnimationEnd();
            attackAction.fadeOut(0.2);
            walkAction?.reset().fadeIn(0.2).play();
         }, (attackAction.getClip().duration * 1000) - 200);

         return () => clearTimeout(timer);
      } else {
         walkAction?.reset().fadeIn(0.5).play();
      }
   }, [actions, isAttacking]);

   useFrame((state) => {
      const t = state.clock.getElapsedTime();
      if (group.current) {
         group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, (state.mouse.x * Math.PI) / 10, 0.1);
         group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -(state.mouse.y * Math.PI) / 20, 0.1);
         group.current.position.y = Math.sin(t) * 0.1 - 1;
      }

      // Optimized pulse animation
      if (state.clock.elapsedTime % 1 < 0.1) { // Throttle material updates
         const pulseTime = Math.sin(t * 10);
         webMeshes.current.forEach(mesh => {
            mesh.material.emissiveIntensity = pulseTime > 0.9 ? 4 : 1.5;
            mesh.material.opacity = pulseTime > 0.9 ? 1 : 0.8;
         });
      }
   });

   return (
      <group ref={group} scale={3.5} position={[0, -1, 0]}>
         <primitive object={scene} />
      </group>
   );
});

const Hero = () => {
   const [isAttacking, setIsAttacking] = useState(false);
   const containerRef = useRef(null);
   const isInView = useInView(containerRef, { amount: 0.1 });

   // Performance: Lower DPR on mobile, no shadows, no stencil
   const glProps = useMemo(() => ({
      antialias: false,
      powerPreference: "high-performance",
      stencil: false,
      depth: true,
      alpha: true,
   }), []);

   return (
      <div ref={containerRef} className="relative flex flex-col justify-center overflow-hidden pt-10 pb-5">
         <div className="relative z-10 px-4 md:px-10 lg:px-20 flex flex-col justify-center">
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1, ease: "easeOut" }}
               className="flex flex-col gap-6"
            >
               <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                  <div className="flex flex-col gap-6 max-w-2xl w-full flex-1">
                     <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-primary-red flex items-center justify-center p-0">
                           <Cpu className="text-white" size={32} />
                        </div>
                        <div className="flex flex-col text-left">
                           <span className="text-primary-red text-xs font-bold tracking-[0.3em] uppercase">Employee_ID: MU2025-01</span>
                           <h1 className="font-tech text-4xl md:text-6xl font-black text-white leading-tight uppercase tracking-tighter">
                              {developerDetails.name}
                           </h1>
                        </div>
                     </div>

                     <div className="p-0 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-8 h-8 opacity-20"><ExternalLink size={16} /></div>
                        <p className="text-text-gray/90 text-sm md:text-base leading-relaxed font-mono uppercase tracking-widest max-w-[60ch]">
                           {developerDetails.summary}
                        </p>
                     </div>
                  </div>

                  <div className="w-full lg:w-[600px] aspect-square relative overflow-hidden group flex-1 cursor-crosshair">
                     <div className="absolute top-2 left-10 text-[10px] font-black text-primary-red uppercase tracking-widest z-10">
                        LIVE_BIOS_FEED // UNIT_01 // CLICK_TO_INITIATE_COMBAT
                     </div>
                     <div className="absolute inset-0 z-0">
                        {/* Only render Canvas when in view to save TBT and GPU */}
                        {isInView && (
                           <Canvas gl={glProps} dpr={[1, 1.2]} shadows={false}>
                              <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                              <ambientLight intensity={1.5} />
                              <directionalLight position={[5, 10, 5]} intensity={2} />
                              <pointLight position={[-3, -3, -3]} intensity={1.5} color="#ff003c" />
                              <Suspense fallback={null}>
                                 <SpiderModel isAttacking={isAttacking} onAnimationEnd={() => setIsAttacking(false)} />
                                 <OrbitControls enableZoom={false} autoRotate={!isAttacking} autoRotateSpeed={0.5} />
                              </Suspense>
                              <EffectComposer disableNormalPass multisampling={0}>
                                 {/* Reduced levels from 8 to 4 for better GPU performance */}
                                 <Bloom luminanceThreshold={1} intensity={0.5} levels={4} mipmapBlur />
                                 {isAttacking && (
                                    <Glitch
                                       delay={[20, 30]}
                                       duration={[0.1, 0.2]}
                                       strength={[0.02, 0.05]}
                                       mode={GlitchMode.SPORADIC}
                                       active={true}
                                    />
                                 )}
                              </EffectComposer>
                           </Canvas>
                        )}
                     </div>
                     <div className="absolute inset-0 pointer-events-none bg-repeating-linear-from-transparent-to-black/10 bg-size-[100%_4px] opacity-30" onClick={() => setIsAttacking(true)} />
                  </div>
               </div>

               {/* ... rest of the component remains the same ... */}
               <div className="hidden xl:flex flex-col gap-6 max-w-fit">
                  <div className="tech-frame w-56 p-4 flex flex-col gap-2 border-white/20 bg-black/40">
                     <div className="flex justify-between items-end border-b border-primary-red pb-2 mb-2">
                        <span className="text-white font-bold text-sm tracking-tighter">WAVE</span>
                        <span className="text-text-gray text-[10px]">CSS-S1</span>
                     </div>
                     <div className="barcode-block" />
                     <div className="flex flex-col gap-1 mt-2">
                        <div className="flex justify-between text-[8px] text-text-gray/90 uppercase"><span>System_OS</span> <span>100%</span></div>
                        <div className="flex justify-between text-[8px] text-text-gray/90 uppercase"><span>Auth_Core</span> <span>Active</span></div>
                     </div>
                  </div>
               </div>

               <div className="relative mt-2 group">
                  <div className="font-tech text-[10vw] font-black text-white/5 uppercase leading-[0.8] select-none">
                     PROTOTYPE
                  </div>
                  <div className="font-tech text-[12vw] font-black text-primary-red uppercase leading-[0.8] mt-[-5vw] group-hover:pl-4 transition-all duration-700">
                     FRONTEND
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
                  {[
                     { icon: <Phone size={18} />, label: "Frequency", value: developerDetails.phone },
                     { icon: <Mail size={18} />, label: "Transmission", value: developerDetails.email },
                     { icon: <MapPin size={18} />, label: "Location", value: developerDetails.address },
                     { icon: <Globe size={18} />, label: "Digital_Core", value: developerDetails.portfolioLink }
                  ].map((item, i) => (
                     <div key={i} className="tech-frame p-3 flex items-center gap-4 bg-black/20 hover:border-primary-red transition-all group">
                        <span className="text-primary-red group-hover:scale-110 transition-transform">{item.icon}</span>
                        <div className="flex flex-col">
                           <span className="text-[10px] text-text-gray/90 uppercase font-bold">{item.label}</span>
                           <span className="text-xs text-white font-bold truncate max-w-[150px]">{item.value}</span>
                        </div>
                     </div>
                  ))}
               </div>
            </motion.div>
         </div>
      </div>
   );
};

export default React.memo(Hero);
