'use client'

interface HoneycombPatternProps {
  className?: string
  opacity?: number
  color?: string
  size?: 'sm' | 'md' | 'lg'
  animate?: boolean
}

export default function HoneycombPattern({
  className = '',
  opacity = 0.1,
  color = '#FFD700',
  size = 'md',
  animate = false
}: HoneycombPatternProps) {
  const sizes = {
    sm: { width: 30, height: 26 },
    md: { width: 60, height: 52 },
    lg: { width: 90, height: 78 }
  }

  const { width, height } = sizes[size]
  const animateClass = animate ? 'animate-honeycomb-pulse' : ''

  return (
    <svg
      className={`absolute inset-0 ${animateClass} ${className}`}
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
    >
      <defs>
        <pattern
          id={`honeycomb-${size}`}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          patternTransform="scale(2)"
        >
          <path
            d={`M${width / 2} 0 L${width} ${height / 4} L${width} ${height * 0.75} L${width / 2} ${height} L0 ${height * 0.75} L0 ${height / 4} Z`}
            fill="none"
            stroke={color}
            strokeWidth="2"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#honeycomb-${size})`} />
    </svg>
  )
}
