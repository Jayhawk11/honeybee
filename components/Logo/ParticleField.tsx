'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useTheme } from '@/contexts/ThemeContext'

interface HoneycombParticleProps {
  position: [number, number, number]
  delay: number
}

function HoneycombParticle({ position, delay }: HoneycombParticleProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const themeContext = useTheme()
  const theme = themeContext?.theme || 'light'

  const color = theme === 'light' ? 0xFCD34D : 0xF59E0B

  useFrame((state) => {
    if (!meshRef.current) return

    const time = state.clock.getElapsedTime()

    // Floating animation
    meshRef.current.position.y = position[1] + Math.sin(time * 0.5 + delay) * 0.1

    // Gentle rotation
    meshRef.current.rotation.y = time * 0.1 + delay
    meshRef.current.rotation.x = Math.sin(time * 0.3 + delay) * 0.2

    // Scale pulsing
    const scale = 0.5 + Math.sin(time * 0.8 + delay) * 0.1
    meshRef.current.scale.setScalar(scale)
  })

  // Hexagon geometry
  const geometry = useMemo(() => {
    const shape = new THREE.Shape()
    const radius = 0.5
    const angle = (Math.PI / 3)

    shape.moveTo(radius, 0)
    for (let i = 1; i <= 6; i++) {
      const x = radius * Math.cos(i * angle)
      const y = radius * Math.sin(i * angle)
      shape.lineTo(x, y)
    }

    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.1,
      bevelEnabled: false,
    })
  }, [])

  return (
    <mesh
      ref={meshRef}
      position={position}
      geometry={geometry}
    >
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.6}
        metalness={0.3}
        roughness={0.7}
      />
    </mesh>
  )
}

interface ParticleFieldProps {
  count?: number
}

export default function ParticleField({ count = 30 }: ParticleFieldProps) {
  const themeContext = useTheme()
  const theme = themeContext?.theme || 'light'

  const particles = useMemo(() => {
    const positions: [number, number, number][] = []
    const delays: number[] = []

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = 2 + Math.random() * 4
      const x = Math.cos(angle) * radius
      const y = (Math.random() - 0.5) * 2
      const z = Math.sin(angle) * radius

      positions.push([x, y, z])
      delays.push(Math.random() * Math.PI * 2)
    }

    return { positions, delays }
  }, [count])

  const ambientLightIntensity = theme === 'light' ? 0.8 : 0.4
  const directionalLightIntensity = theme === 'light' ? 1.2 : 0.8

  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        className="opacity-40"
      >
        <ambientLight intensity={ambientLightIntensity} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={directionalLightIntensity}
          color={theme === 'light' ? '#FFFFFF' : '#FBBF24'}
        />

        {particles.positions.map((pos, i) => (
          <HoneycombParticle
            key={i}
            position={pos}
            delay={particles.delays[i]}
          />
        ))}

        {/* Subtle point light for atmosphere */}
        <pointLight
          position={[0, 0, 3]}
          intensity={0.5}
          color={theme === 'light' ? '#FCD34D' : '#F59E0B'}
          distance={10}
        />
      </Canvas>
    </div>
  )
}
