// src/components/projects/ProjectsCanvas.tsx
'use client';
import { Canvas } from '@react-three/fiber';

export function ProjectsCanvas({ children }: { children: React.ReactNode }) {
  return (
    <Canvas 
      camera={{ position: [0, 0, 5], fov: 50 }}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      {children}
    </Canvas>
  );
}
