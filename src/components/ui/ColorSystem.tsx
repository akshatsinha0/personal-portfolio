'use client'
import { useEffect } from 'react'
import { useScroll } from '@use-gesture/react'
import { useThree } from '@react-three/fiber'

export const ColorSystem = () => {
  const { viewport } = useThree()
  const scrollHandler = useScroll(({ xy: [x, y] }) => {
    const hue = (x * 360 + y * 360) % 360
    document.documentElement.style.setProperty('--primary-hue', `${hue}`)
  })

  useEffect(() => {
    return () => {
      // Cleanup logic if needed
    };
  }, [viewport])

  return null
}
