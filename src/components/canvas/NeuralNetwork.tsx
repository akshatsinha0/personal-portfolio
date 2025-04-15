'use client'
import { useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

const NeuralParticle = ({ position }: { position: THREE.Vector3 }) => {
  const particle = useRef<THREE.Mesh>(null)
  const velocity = useRef(new THREE.Vector3(
    Math.random() * 0.01 - 0.005,
    Math.random() * 0.01 - 0.005,
    0
  ))

  useFrame(({ mouse }) => {
    if (!particle.current) return
    
    // Mouse influence
    const mouseInfluence = new THREE.Vector3(
      (mouse.x * 0.5 - particle.current.position.x) * 0.01,
      (mouse.y * 0.5 - particle.current.position.y) * 0.01,
      0
    )
    
    // Update velocity with damping and mouse influence
    velocity.current.multiplyScalar(0.95).add(mouseInfluence)
    
    // Update position
    particle.current.position.add(velocity.current)
  })

  return (
    <mesh ref={particle} position={position}>
      <sphereGeometry args={[0.05, 16, 16]} />
      <meshStandardMaterial color="#4f46e5" emissive="#6366f1" />
    </mesh>
  )
}

export const NeuralNetwork = () => {
  const particles = useMemo(() => 
    Array.from({ length: 500 }).map(() => new THREE.Vector3(
      Math.random() * 10 - 5,
      Math.random() * 10 - 5,
      Math.random() * 10 - 5
    ))
  , [])

  return (
    <group position={[0, 0, -10]}>
      {particles.map((pos, i) => (
        <NeuralParticle key={i} position={pos} />
      ))}
    </group>
  )
}
