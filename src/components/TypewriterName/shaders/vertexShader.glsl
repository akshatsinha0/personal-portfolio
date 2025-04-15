// src/components/TypewriterName/shaders/vertexShader.glsl
uniform float time;
uniform float size;
uniform float progress;
attribute float phase;
attribute vec3 destination;
varying vec3 vColor;

void main() {
  // Animated position calculation
  vec3 animated = mix(position, destination, smoothstep(0.0, 1.0, progress - phase * 0.2));
  
  // Add subtle oscillation to particles
  animated.x += sin(time * 2.0 + phase * 10.0) * (1.0 - progress) * 0.1;
  animated.y += cos(time * 2.0 + phase * 10.0) * (1.0 - progress) * 0.05;
  
  // Apply sizing
  vec4 mvPosition = modelViewMatrix * vec4(animated, 1.0);
  gl_PointSize = size * (1.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
  
  // Calculate color based on position and phase
  vColor = mix(
    vec3(0.6, 0.2, 0.9),
    vec3(0.2, 0.8, 1.0),
    phase
  );
}
