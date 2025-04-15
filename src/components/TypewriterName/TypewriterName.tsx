// src/components/TypewriterName/TypewriterName.tsx
'use client';
import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { gsap } from 'gsap';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

class ParticleSystem {
  private particles: THREE.Points;
  private geometry: THREE.BufferGeometry;
  private positions: Float32Array;
  
  constructor(particleCount: number) {
    this.geometry = new THREE.BufferGeometry();
    this.positions = new Float32Array(particleCount * 3);

    // Initialize random positions
    for (let i = 0; i < particleCount * 3; i += 3) {
      this.positions[i] = (Math.random() - 0.5) * 10;
      this.positions[i + 1] = (Math.random() - 0.5) * 10;
      this.positions[i + 2] = (Math.random() - 0.5) * 10;
    }

    this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
    
    const material = new THREE.PointsMaterial({
      size: 0.05,
      color: 0x4f46e5,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    this.particles = new THREE.Points(this.geometry, material);
  }

  updateDestinations(targetGeometry: THREE.BufferGeometry) {
    const targetPositions = targetGeometry.attributes.position.array;
    const currentPositions = this.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < currentPositions.length; i++) {
      const targetIndex = Math.floor(Math.random() * targetPositions.length / 3) * 3;
      currentPositions[i] = targetPositions[targetIndex] || 0;
    }
    
    this.geometry.attributes.position.needsUpdate = true;
  }

  getMesh() {
    return this.particles;
  }

  update() {
    // Add simple animation
    const positions = this.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < positions.length; i += 3) {
      positions[i] += (Math.random() - 0.5) * 0.01;
      positions[i + 1] += (Math.random() - 0.5) * 0.01;
    }
    this.geometry.attributes.position.needsUpdate = true;
  }
}

const TEXT = "AKSHAT SINHA";
const PARTICLE_COUNT = 5000;
const TYPING_SPEED = 0.5;

const TypewriterScene = () => {
  const sceneRef = useRef<THREE.Group>(null);
  const [letterIndex, setLetterIndex] = useState(-1);
  const [particles, setParticles] = useState<ParticleSystem | null>(null);
  const textMeshRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    const particleSystem = new ParticleSystem(PARTICLE_COUNT);
    setParticles(particleSystem);
    
    if (sceneRef.current) {
      sceneRef.current.add(particleSystem.getMesh());
    }

    const interval = setInterval(() => {
      setLetterIndex(prev => (prev < TEXT.length - 1 ? prev + 1 : prev));
    }, TYPING_SPEED * 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!particles || letterIndex < 0) return;
    const fontLoader = new FontLoader();
    fontLoader.load('/fonts/droid_sans_bold.typeface.json', (font) => {
      const textGeometry = new TextGeometry(TEXT.substring(0, letterIndex + 1), {
        font: font,
        size: 0.5,
        depth: 0.2,
        curveSegments: 12
      });

      if (textMeshRef.current && sceneRef.current) {
        sceneRef.current.remove(textMeshRef.current);
      }

      const textMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x4080ff, 
        wireframe: true 
      });
      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textMeshRef.current = textMesh;
      
      if (sceneRef.current) {
        sceneRef.current.add(textMesh);
      }

      particles.updateDestinations(textGeometry);
    });
  }, [letterIndex, particles]);

  useFrame(() => {
    particles?.update();
  });

  return (
    <group ref={sceneRef} position={[0, 0, 0]}>
      {/* Cursor element */}
      {letterIndex >= 0 && letterIndex < TEXT.length && (
        <mesh position={[letterIndex * 0.35 - 2.35, 0, 0]}>
          <boxGeometry args={[0.1, 0.7, 0.05]} />
          <meshBasicMaterial color={0xffffff} />
        </mesh>
      )}
    </group>
  );
};

export default function TypewriterName() {
  return (
    <div className="w-full h-[50vh] bg-gray-900">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <TypewriterScene />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
