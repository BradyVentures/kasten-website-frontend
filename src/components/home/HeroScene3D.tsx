'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function FloatingParticles({ count = 120 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!);

  const { geometry, speeds } = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2;
      spd[i] = 0.003 + Math.random() * 0.008;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return { geometry: geo, speeds: spd };
  }, [count]);

  useFrame(() => {
    const posArray = geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      posArray[i * 3 + 1] += speeds[i];
      if (posArray[i * 3 + 1] > 6) {
        posArray[i * 3 + 1] = -6;
      }
    }
    geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.025}
        color="#ffffff"
        transparent
        opacity={0.35}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function CameraRig() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const smoothed = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame(() => {
    smoothed.current.x += (mouse.current.x * 0.15 - smoothed.current.x) * 0.03;
    smoothed.current.y += (mouse.current.y * 0.08 - smoothed.current.y) * 0.03;
    camera.position.x = smoothed.current.x;
    camera.position.y = -smoothed.current.y * 0.3;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function Scene() {
  return (
    <>
      <FloatingParticles count={150} />
      <CameraRig />
    </>
  );
}

export default function HeroScene3D() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 z-[2] pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: 'transparent' }}
        fallback={null}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
