import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere } from '@react-three/drei'

export function SolarFlares() {
  const [flares, setFlares] = useState([])

  // Spawn new flares periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setFlares(prev => [
        ...prev,
        {
          id: Date.now(),
          position: [Math.random() * 10 - 5, 10, Math.random() * 2 - 1],
          speed: 0.05 + Math.random() * 0.05
        }
      ])
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {flares.map((flare) => (
        <SolarFlare 
          key={flare.id}
          position={flare.position}
          speed={flare.speed}
          onRemove={() => setFlares(prev => prev.filter(f => f.id !== flare.id))}
        />
      ))}
    </>
  )
}

function SolarFlare({ position, speed, onRemove }) {
  const flareRef = useRef()

  useFrame(() => {
    flareRef.current.position.y -= speed
    
    // Remove flare when it goes off screen
    if (flareRef.current.position.y < -10) {
      onRemove()
    }
  })

  return (
    <Sphere ref={flareRef} position={position} args={[0.3, 16, 16]}>
      <meshStandardMaterial color="orange" emissive="red" emissiveIntensity={2} />
    </Sphere>
  )
}