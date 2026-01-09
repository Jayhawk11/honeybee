'use client'

import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, PerspectiveCamera, Environment } from '@react-three/drei'
import * as THREE from 'three'
import { useTheme } from '@/contexts/ThemeContext'

function Bee3D() {
  const meshRef = useRef<THREE.Group>(null)
  const themeContext = useTheme()
  const theme = themeContext?.theme || 'light'

  const bodyColor = theme === 'light' ? 0xFCD34D : 0xF59E0B
  const stripeColor = 0x1A1A1A
  const wingColor = theme === 'light' ? 0xFFFFFF : 0xE5E5E5

  useFrame((state) => {
    if (!meshRef.current) return

    const time = state.clock.getElapsedTime()

    // Gentle floating
    meshRef.current.position.y = Math.sin(time * 0.5) * 0.1

    // Subtle rotation based on mouse
    const mouseX = (state.mouse.x * 0.5)
    const mouseY = (state.mouse.y * 0.5)
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      mouseX,
      0.1
    )
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      mouseY,
      0.1
    )
  })

  return (
    <group ref={meshRef}>
      {/* Bee body */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        {/* Body */}
        <mesh position={[0, 0, 0]}>
          <capsuleGeometry args={[0.4, 0.8, 4, 16]} />
          <meshStandardMaterial
            color={bodyColor}
            metalness={0.3}
            roughness={0.6}
          />
        </mesh>

        {/* Stripes */}
        {[[-0.2], [0], [0.2]].map((y, i) => (
          <mesh key={i} position={[0, y[0], 0.41]}>
            <cylinderGeometry args={[0.4, 0.4, 0.08, 16]} />
            <meshStandardMaterial
              color={stripeColor}
              metalness={0.5}
              roughness={0.3}
            />
          </mesh>
        ))}

        {/* Head */}
        <mesh position={[0, 0.5, 0]}>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshStandardMaterial
            color={bodyColor}
            metalness={0.3}
            roughness={0.6}
          />
        </mesh>

        {/* Eyes */}
        {[-0.1, 0.1].map((x, i) => (
          <mesh key={`eye-${i}`} position={[x, 0.55, 0.2]}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial
              color={0x000000}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        ))}

        {/* Wings */}
        <mesh position={[0.5, 0, 0]} rotation={[0, 0, Math.PI / 6]}>
          <capsuleGeometry args={[0.15, 0.6, 4, 8]} />
          <meshStandardMaterial
            color={wingColor}
            transparent
            opacity={0.7}
            metalness={0.2}
            roughness={0.8}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh position={[-0.5, 0, 0]} rotation={[0, 0, -Math.PI / 6]}>
          <capsuleGeometry args={[0.15, 0.6, 4, 8]} />
          <meshStandardMaterial
            color={wingColor}
            transparent
            opacity={0.7}
            metalness={0.2}
            roughness={0.8}
            side={THREE.DoubleSide}
          />
        </mesh>
      </Float>
    </group>
  )
}

interface Logo3DProps {
  size?: number
  interactive?: boolean
}

export default function Logo3D({ size = 200, interactive = true }: Logo3DProps) {
  const themeContext = useTheme()
  const theme = themeContext?.theme || 'light'

  // Remove mounted state - always render immediately

  return (
    <div
      style={{ width: size, height: size }}
      className="relative"
    >
      <Canvas
        gl={{ antialias: true, alpha: true }}
        className="rounded-full"
      >
        <PerspectiveCamera makeDefault position={[0, 0, 3]} />

        <ambientLight intensity={theme === 'light' ? 0.8 : 0.4} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={theme === 'light' ? 1.2 : 0.8}
          color={theme === 'light' ? '#FFFFFF' : '#FBBF24'}
        />

        <Bee3D />

        <Environment preset={theme === 'light' ? 'sunset' : 'night'} />
      </Canvas>

      {/* Glow effect */}
      <div
        className={`absolute inset-0 rounded-full blur-xl ${
          theme === 'light'
            ? 'bg-amber-400/20'
            : 'bg-amber-500/10'
        } pointer-events-none`}
      />
    </div>
  )
}
