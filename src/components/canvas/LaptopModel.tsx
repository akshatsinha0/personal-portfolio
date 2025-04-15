'use client';
import { useRef, useState, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// This type defines the expected structure of your 3D model nodes and materials
type GLTFResult = {
  nodes: {
    [key: string]: THREE.Mesh;
  };
  materials: {
    [key: string]: THREE.Material;
  };
};

type LaptopModelProps = {
  position?: [number, number, number];
  scale?: [number, number, number];
  isOpen?: boolean;
  projectIndex?: number;
  rotation?: [number, number, number];
}

export default function LaptopModel({
  position = [0, 0, 0],
  scale = [1, 1, 1],
  isOpen = false,
  projectIndex = 0,
  rotation = [0, 0, 0]
}: LaptopModelProps) {
  // Load the model
  const { nodes, materials } = useGLTF('/models/laptop.glb') as unknown as GLTFResult;
  
  // References to the model parts
  const groupRef = useRef<THREE.Group>(null);
  const screenRef = useRef<THREE.Mesh>(null);
  
  // Animation state
  const [openProgress, setOpenProgress] = useState(0);
  
  // Track mouse for parallax effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Effect to track mouse movement for parallax
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Convert mouse position to normalized coordinates (-1 to 1)
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Animation frame update
  useFrame((_, delta) => {
    if (!groupRef.current || !screenRef.current) return;
    
    // Animate laptop opening and closing
    const targetOpen = isOpen ? 1 : 0;
    setOpenProgress(prev => {
      const newProgress = THREE.MathUtils.lerp(prev, targetOpen, delta * 2.5);
      return Math.abs(newProgress - targetOpen) < 0.001 ? targetOpen : newProgress;
    });
    
    // Calculate the screen rotation based on open progress
    // When closed: ~90 degrees (Math.PI/2), when open: 0 degrees
    if (screenRef.current) {
      screenRef.current.rotation.x = THREE.MathUtils.lerp(
        Math.PI / 2, // Closed position (90 degrees)
        0,           // Open position (0 degrees)
        openProgress
      );
    }
    
    // Apply subtle parallax effect when laptop is open
    if (openProgress > 0.5 && groupRef.current) {
      // Maximum rotation of 6 degrees (0.1 radians)
      const parallaxIntensity = 0.1;
      
      // Smoothly interpolate toward target rotation
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        rotation[1] + mousePosition.x * parallaxIntensity,
        delta * 2
      );
      
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        rotation[0] + mousePosition.y * parallaxIntensity,
        delta * 2
      );
    }
  });
  
  // Determine if we have the correct model parts
  // These names should match the actual node names in your GLB file
  // You might need to adjust these based on your exported model structure
  const hasLaptopBase = Boolean(nodes.LaptopBase || nodes.Base || nodes.Laptop_Base || nodes.base);
  const hasLaptopScreen = Boolean(nodes.LaptopScreen || nodes.Screen || nodes.Laptop_Screen || nodes.screen);
  const hasKeyboard = Boolean(nodes.Keyboard || nodes.LaptopKeyboard || nodes.keyboard);
  
  // If model parts aren't found, show a warning
  if (!hasLaptopBase || !hasLaptopScreen) {
    console.warn('Laptop model parts not found. Check node names in the model.');
  }
  
  // Helper function to find the correct node
  const getNode = (possibleNames: string[]) => {
    for (const name of possibleNames) {
      if (nodes[name]) return nodes[name];
    }
    return null;
  };
  
  // Find model parts
  const baseNode = getNode(['LaptopBase', 'Base', 'Laptop_Base', 'base', 'Body', 'body']);
  const screenNode = getNode(['LaptopScreen', 'Screen', 'Laptop_Screen', 'screen', 'Display', 'display']);
  const keyboardNode = getNode(['Keyboard', 'LaptopKeyboard', 'keyboard']);
  
  return (
    <group ref={groupRef} position={position} scale={scale} rotation={rotation}>
      {/* Laptop base */}
      {baseNode && (
        <mesh
          geometry={baseNode.geometry}
          material={baseNode.material}
          castShadow
          receiveShadow
        />
      )}
      
      {/* Keyboard (optional, with glow effect) */}
      {keyboardNode && (
        <mesh
          geometry={keyboardNode.geometry}
          material={new THREE.MeshStandardMaterial({
            color: 0x333333,
            emissive: new THREE.Color(0x0066ff),
            emissiveIntensity: openProgress * 0.5, // Glow intensity increases as laptop opens
            roughness: 0.5,
            metalness: 0.8,
          })}
          castShadow
        />
      )}
      
      {/* Laptop screen (animated part) */}
      {screenNode && (
        <group ref={screenRef} position={[0, 0.1, -0.95]}>
          <mesh
            geometry={screenNode.geometry}
            material={screenNode.material}
            castShadow
          />
          
          {/* Screen content will be added in the next file */}
        </group>
      )}
    </group>
  );
}

// Preload the model for better performance
useGLTF.preload('/models/laptop.glb');
