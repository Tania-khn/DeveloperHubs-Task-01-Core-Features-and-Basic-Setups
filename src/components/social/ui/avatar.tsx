'use client'

import { getAvatarGradient, getInitials } from '../app-context'

interface AvatarProps {
  uri?: string | null
  name?: string
  size?: number
  className?: string
}

export function Avatar({ uri, name = '', size = 56, className = '' }: AvatarProps) {
  const [c1, c2] = getAvatarGradient(name)
  const initials = getInitials(name)
  const fontSize = Math.round(size * 0.4)

  if (uri) {
    return (
      <img
        src={uri}
        alt={name}
        className={`rounded-full object-cover ${className}`}
        style={{ width: size, height: size }}
      />
    )
  }

  return (
    <div
      className={`rounded-full flex items-center justify-center font-bold text-white ${className}`}
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${c1} 0%, ${c2} 100%)`,
        fontSize,
        letterSpacing: '0.5px',
      }}
    >
      {initials}
    </div>
  )
}
