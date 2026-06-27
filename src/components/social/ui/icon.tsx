'use client'

import { LucideIcon } from 'lucide-react'

interface IconProps {
  icon: LucideIcon
  size?: number
  color?: string
  className?: string
}

export function Icon({ icon: IconCmp, size = 20, color = 'currentColor', className = '' }: IconProps) {
  return <IconCmp size={size} color={color} className={className} strokeWidth={2} />
}
