'use client'

import { CheckCircle2, AlertCircle, Info } from 'lucide-react'
import { useApp } from './app-context'

export function Toast() {
  const { toast } = useApp()
  if (!toast) return null

  const { message, type } = toast
  const colors = {
    success: { bg: '#00B894', icon: CheckCircle2 },
    error: { bg: '#FF5252', icon: AlertCircle },
    info: { bg: '#0984E3', icon: Info },
  }[type]
  const Icon = colors.icon

  return (
    <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-50 animate-[fadeInUp_0.2s_ease-out]">
      <div
        className="flex items-center gap-2 px-5 py-3 rounded-full shadow-2xl text-white text-sm font-medium"
        style={{ backgroundColor: colors.bg }}
      >
        <Icon size={18} color="#fff" />
        {message}
      </div>
    </div>
  )
}
