// src/components/TypewriterName/utils/particleSystem.ts
import * as THREE from 'three';

export class ParticleSystem {
  private geometry: THREE.BufferGeometry;
  private material: THREE.ShaderMaterial;
  private particles: THREE.Points;
  private destination: Float32Array;
  private phase: Float32Array;
  private particleCount: number;

  constructor(vertexShader: string, fragmentShader: string, particleCount: number) {
    this.particleCount = particleCount;
    
    // Initialize geometry
    this.geometry = new THREE.BufferGeometry();
    
    // Create random positions for particles
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    
    // Create destination array (will be populated later)
    this.destination = new Float32Array(particleCount * 3);
    
    // Create phase values (used for staggered animation)
    this.phase = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      this.phase[i] = Math.random();
    }
    
    // Add attributes to geometry
    this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.geometry.setAttribute('destination', new THREE.BufferAttribute(this.destination, 3));
    this.geometry.setAttribute('phase', new THREE.BufferAttribute(this.phase, 1));
    
    // Create shader material
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        progress: { value: 0 },
        size: { value: 5 }
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    
    // Create points mesh
    this.particles = new THREE.Points(this.geometry, this.material);
  }

  updateDestinations(textGeometry: THREE.BufferGeometry) {
    // Sample points from text geometry surface
    const textPositions = textGeometry.attributes.position.array;
    const stride = this.particleCount / (textPositions.length / 3);
    
    for (let i = 0; i < this.particleCount; i++) {
      const index = Math.min(Math.floor(i / stride) * 3, textPositions.length - 3);
      this.destination[i * 3] = textPositions[index];
      this.destination[i * 3 + 1] = textPositions[index + 1];
      this.destination[i * 3 + 2] = textPositions[index + 2];
    }
    
    // Update the attribute
    this.geometry.attributes.destination.needsUpdate = true;
  }

  getMesh() {
    return this.particles;
  }

  update(time: number, progress: number) {
    this.material.uniforms.time.value = time;
    this.material.uniforms.progress.value = progress;
  }
}
