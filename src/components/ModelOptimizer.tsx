'use client'
import { useGLTF } from '@react-three/drei'

export const OptimizedModel = () => {
  const { scene } = useGLTF('/models/hologram.glb')
  return <primitive object={scene} />
}

// Preload and auto-optimize
useGLTF.preload('/models/hologram.glb')
