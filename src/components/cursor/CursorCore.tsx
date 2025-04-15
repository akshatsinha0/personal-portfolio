'use client';
import { useEffect } from 'react';
import CustomCursor from './CustomCursor';

const CursorCore = () => {
  useEffect(() => {
    // Add class to body when component mounts
    document.body.classList.add('custom-cursor');
    
    // Check if device has touch capability (mobile devices)
    const isTouchDevice = 'ontouchstart' in window || 
      navigator.maxTouchPoints > 0 ||
      navigator.maxTouchPoints > 0;
    
    // Don't show custom cursor on touch devices
    if (isTouchDevice) {
      document.body.classList.remove('custom-cursor');
    }
    
    return () => {
      // Remove class when component unmounts
      document.body.classList.remove('custom-cursor');
    };
  }, []);
  
  // Don't render custom cursor for touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }
  
  return <CustomCursor />;
};

export default CursorCore;
