// src/components/canvas/ProjectModels.tsx
'use client'
import { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

interface ProjectModelProps {
  position?: [number, number, number]
}

export const ProjectModel = ({ position = [0, 0, 0] }: ProjectModelProps) => {
  const modelRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (modelRef.current) {
      modelRef.current.rotation.y = clock.getElapsedTime() * 0.2
    }
  })

  return (
    <group ref={modelRef} position={position}>
      <mesh scale={0.8} position={[0, -1, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
      <OrbitControls enableZoom={false} />
    </group>
  )
}
