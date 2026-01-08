'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface Present {
  color: string
  ribbonColor: string
}

const presents: Present[] = [
  { color: 'from-red-400 to-red-600', ribbonColor: 'bg-yellow-400' },
  { color: 'from-blue-400 to-blue-600', ribbonColor: 'bg-green-400' },
  { color: 'from-purple-400 to-purple-600', ribbonColor: 'bg-pink-400' }
]

// Small present component
function MiniPresent({ present, index }: { present: Present; index: number }) {
  const pathParams = useRef({
    amplitudeY: 8 + Math.random() * 4,
    speed: 3 + Math.random() * 2,
    offset: Math.random() * Math.PI * 2
  })

  return (
    <motion.div
      className="relative z-20"
      animate={{
        y: [
          -pathParams.current.amplitudeY,
          pathParams.current.amplitudeY,
          -pathParams.current.amplitudeY
        ],
        rotate: [-5, 5, -5]
      }}
      transition={{
        duration: pathParams.current.speed,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
        delay: index * 0.2
      }}
      style={{
        right: `${10 + (index * 6)}%`,
        top: `${60 + (index * 8)}%`
      }}
    >
      {/* Bee */}
      <motion.div
        className="absolute -top-10 left-1/2 -translate-x-1/2 text-3xl"
        animate={{ rotate: [-15, 15, -15] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        🐝
      </motion.div>

      {/* Present box */}
      <div className="w-12 h-12 rounded-md bg-gradient-to-br shadow-lg flex items-center justify-center border-2 border-white/40 relative">
        <div className={`absolute left-1/2 -translate-x-1/2 w-1.5 h-full ${present.ribbonColor}`} />
        <div className={`absolute top-1/2 -translate-y-1/2 h-1.5 w-full ${present.ribbonColor}`} />

        {/* Mini bow */}
        <div className={`absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 ${present.ribbonColor} rounded-full`} />
      </div>
    </motion.div>
  )
}

export default function HeaderBees() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="relative w-24 h-32">
      {presents.map((present, index) => (
        <MiniPresent key={index} present={present} index={index} />
      ))}
    </div>
  )
}
