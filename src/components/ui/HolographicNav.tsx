// src/components/ui/HolographicNav.tsx
'use client'
import { useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { type GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: Record<string, THREE.Mesh>
}

export const HolographicNav = () => {
  const { nodes } = useGLTF('/models/hologram.glb') as unknown as GLTFResult

  // Use proper type assertion for Three.js elements
  const hologramMesh = nodes['Cube'] as THREE.Mesh

  useEffect(() => {
    // Client-side only preload
    useGLTF.preload('/models/hologram.glb')
  }, [])

  return (
    <mesh
      geometry={hologramMesh.geometry}
      position={[0, 0, -5]}
      rotation={[0, Math.PI / 4, 0]}
    >
      <meshPhysicalMaterial
        transmission={1}
        thickness={0.5}
        roughness={0}
        clearcoat={1}
        ior={1.5}
        envMapIntensity={2}
      />
    </mesh>
  )
}
