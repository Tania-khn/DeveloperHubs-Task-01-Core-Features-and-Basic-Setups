'use client'

import { ReactNode } from 'react'

interface HeaderProps {
  title: string
  subtitle?: string
  leftIcon?: ReactNode
  onLeftPress?: () => void
  rightIcon?: ReactNode
  onRightPress?: () => void
  rightLabel?: string
  onRightLabelPress?: () => void
}

export function Header({
  title,
  subtitle,
  leftIcon,
  onLeftPress,
  rightIcon,
  onRightPress,
  rightLabel,
  onRightLabelPress,
}: HeaderProps) {
  return (
    <div
      className="px-4 pb-6 rounded-b-3xl relative"
      style={{
        background: 'linear-gradient(135deg, #6C5CE7 0%, #0984E3 100%)',
        paddingTop: 'max(2rem, env(safe-area-inset-top, 2rem))',
      }}
    >
      <div className="flex items-center justify-between min-h-[44px]">
        {leftIcon ? (
          <button
            onClick={onLeftPress}
            className="w-11 h-11 flex items-center justify-center text-white hover:bg-white/10 rounded-full transition"
          >
            {leftIcon}
          </button>
        ) : (
          <div className="w-11" />
        )}
        <div className="flex-1 text-center">
          <h1 className="text-xl font-bold text-white tracking-tight truncate drop-shadow-sm">{title}</h1>
          {subtitle && (
            <p className="text-xs text-white/85 mt-0.5 truncate">{subtitle}</p>
          )}
        </div>
        {rightIcon ? (
          <button
            onClick={onRightPress}
            className="w-11 h-11 flex items-center justify-center text-white hover:bg-white/10 rounded-full transition"
          >
            {rightIcon}
          </button>
        ) : rightLabel ? (
          <button
            onClick={onRightLabelPress}
            className="px-2 py-1 text-white text-[15px] font-semibold hover:bg-white/10 rounded-full transition"
          >
            {rightLabel}
          </button>
        ) : (
          <div className="w-11" />
        )}
      </div>
    </div>
  )
}
