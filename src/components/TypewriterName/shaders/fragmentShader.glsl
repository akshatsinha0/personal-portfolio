// src/components/TypewriterName/shaders/fragmentShader.glsl
varying vec3 vColor;

void main() {
  // Create a circular particle with soft edges
  float r = length(gl_PointCoord - vec2(0.5));
  if (r > 0.5) discard;
  
  // Add glow effect
  float glow = 0.5 - r;
  vec3 finalColor = vColor * glow * 2.0;
  
  gl_FragColor = vec4(finalColor, 1.0);
}
