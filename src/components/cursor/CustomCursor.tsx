'use client';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import styles from './CustomCursor.module.css';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    
    const onMouseMove = (e: MouseEvent) => {
      // Position cursor at mouse coordinates with small offset
      const posX = e.clientX - cursor.offsetWidth / 2;
      const posY = e.clientY - cursor.offsetHeight / 2;
      
      cursor.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
    };
    
    // Track hover state on interactive elements
    const onMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' ||
        target.closest('a') || 
        target.closest('button') ||
        target.hasAttribute('data-cursor-hover') || 
        target.closest('[data-cursor-hover]')
      ) {
        setIsHovering(true);
      }
    };
    
    const onMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' ||
        target.closest('a') || 
        target.closest('button') ||
        target.hasAttribute('data-cursor-hover') ||
        target.closest('[data-cursor-hover]')
      ) {
        setIsHovering(false);
      }
    };
    
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseEnter);
    document.addEventListener('mouseout', onMouseLeave);
    
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseEnter);
      document.removeEventListener('mouseout', onMouseLeave);
    };
  }, []);
  
  return (
    <div className={styles.cursorContainer} ref={cursorRef}>
      {/* Default cursor (arrow with your image) */}
      <div className={`${styles.cursor} ${isHovering ? styles.hidden : ''}`}>
        <div className={styles.arrow}>
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 3L25 20L17 22L14 29L8 3Z" fill="white" stroke="white" strokeWidth="2" />
          </svg>
        </div>
        <div className={styles.userImage}>
          <Image
            src="/MyImageInCursor.png"
            alt="Akshat Sinha"
            width={25}
            height={25}
            className={styles.profileImage}
          />
        </div>
      </div>
      
      {/* Hover cursor (explore circle) */}
      <div className={`${styles.exploreCursor} ${isHovering ? '' : styles.hidden}`}>
        <div className={styles.exploreCircle}>
          <span>explore</span>
        </div>
      </div>
    </div>
  );
};

export default CustomCursor;
