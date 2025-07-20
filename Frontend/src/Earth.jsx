import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Sphere } from '@react-three/drei'

export function Earth({ setScore }) {
  const earthRef = useRef()
  const [position, setPosition] = useState([0, 0, 0])
  const [isJumping, setIsJumping] = useState(false)

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' && !isJumping) {
        setIsJumping(true)
        setTimeout(() => setIsJumping(false), 1000)
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isJumping])

  // Animation loop
  useFrame(() => {
    if (isJumping) {
      earthRef.current.position.y += 0.1
      if (earthRef.current.position.y >= 2) {
        setIsJumping(false)
      }
    } else if (earthRef.current.position.y > 0) {
      earthRef.current.position.y -= 0.1
    }
  })

  return (
    <group ref={earthRef} position={position}>
      <Sphere args={[1, 32, 32]}>
        <meshStandardMaterial color="blue" />
      </Sphere>
      <Text
        position={[0, -1.5, 0]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Earth
      </Text>
    </group>
  )
}