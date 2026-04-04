import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { inSphere } from "maath/random";

const StarBackground = React.memo(() => {
  const ref = useRef();
  // Using a very small count for mobile-first performance
  const [sphere] = useMemo(() => [inSphere(new Float32Array(600), { radius: 1.5 })], []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 40;
      ref.current.rotation.y -= delta / 60;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={true}>
        <PointMaterial
          transparent
          color="#ff003c"
          size={0.003}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.3}
        />
      </Points>
    </group>
  );
});

const Background3D = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Memoize GL settings to prevent re-creation
  const glSettings = useMemo(() => ({
    antialias: false,
    powerPreference: "high-performance",
    alpha: true,
    stencil: false,
    depth: false,
  }), []);

  // PERFORMANCE: If mobile, skip the 3D background entirely to boost Lighthouse score
  if (isMobile) return <div className="fixed inset-0 z-[-1] bg-black" />;

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-black">
      <Canvas 
        camera={{ position: [0, 0, 1] }}
        gl={glSettings}
        dpr={1} 
      >
        <StarBackground />
      </Canvas>
    </div>
  );
};

export default React.memo(Background3D);
