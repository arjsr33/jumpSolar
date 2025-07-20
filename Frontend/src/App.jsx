import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { Earth } from './Earth'
import { SolarFlares } from './SolarFlares'
import { useState } from 'react'

export default function App() {
  const [gameStarted, setGameStarted] = useState(false)
  const [score, setScore] = useState(0)

  return (
    <div className="game-container">
      {!gameStarted ? (
        <div className="start-screen">
          <h1>Solar Flare Dodge</h1>
          <button onClick={() => setGameStarted(true)}>Start Game</button>
        </div>
      ) : (
        <>
          <div className="score">Score: {score}</div>
          <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Stars radius={100} depth={50} count={5000} factor={4} />
            <Earth setScore={setScore} />
            <SolarFlares />
            <OrbitControls enableZoom={false} />
          </Canvas>
        </>
      )}
    </div>
  )
}