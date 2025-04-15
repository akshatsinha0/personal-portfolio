'use client';
import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './CountingLoader.module.css';

interface CountingLoaderProps {
  onComplete: () => void;
  duration?: number;
}

export default function CountingLoader({ 
  onComplete, 
  duration = 3 
}: CountingLoaderProps) {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Create a counter object for GSAP to animate
    const counter = { value: 0 };
    
    // Create a timeline for sequential animations
    const tl = gsap.timeline({
      onComplete: () => {
        // Fade out the entire loader when counting is done
        gsap.to(loaderRef.current, {
          opacity: 0,
          duration: 0.5,
          onComplete: () => onComplete()
        });
      }
    });
    
    // First animation: count from 0 to 100
    tl.to(counter, {
      value: 100,
      duration: duration,
      ease: "power2.out",
      onUpdate: () => setCount(Math.floor(counter.value))
    });
    
    // Clean up GSAP animations on component unmount
    return () => {
      tl.kill();
    };
  }, [duration, onComplete]);
  
  return (
    <div ref={loaderRef} className={styles.loaderContainer}>
      {/* Red top bar */}
      <div className={styles.topBar}></div>
      
      {/* Background pattern overlay */}
      <div className={styles.patternOverlay}></div>
      
      {/* The counter */}
      <div className={styles.counterWrapper}>
        <div ref={counterRef} className={styles.counter}>
          {count}
        </div>
      </div>
    </div>
  );
}
