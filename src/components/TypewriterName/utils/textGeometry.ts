// src/components/TypewriterName/utils/textGeometry.ts
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

export async function createTextGeometry(text: string, letterIndex: number) {
  return new Promise<THREE.BufferGeometry>((resolve) => {
    const fontLoader = new FontLoader();
    
    fontLoader.load('/fonts/droid_sans_bold.typeface.json', (font) => {
      // Create text geometry for the current letter
      const visibleText = text.substring(0, letterIndex + 1);
      
      const textGeometry = new TextGeometry(visibleText, {
        font: font,
        size: 0.5,
        depth: 0.2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5
      });
      
      // Center the text geometry
      textGeometry.computeBoundingBox();
      const textWidth = textGeometry.boundingBox?.max.x || 0;
      textGeometry.translate(-textWidth / 2, 0, 0);
      
      resolve(textGeometry);
    });
  });
}
