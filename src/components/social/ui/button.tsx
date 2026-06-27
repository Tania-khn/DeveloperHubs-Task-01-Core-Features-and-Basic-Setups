'use client'

import { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
  icon?: ReactNode
  fullWidth?: boolean
}

const sizeClasses: Record<Size, string> = {
  sm: 'py-2 px-4 text-sm',
  md: 'py-3 px-6 text-[15px]',
  lg: 'py-4 px-8 text-lg',
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  fullWidth = false,
  className = '',
  children,
  disabled,
  ...rest
}: BtnProps) {
  const isDisabled = disabled || loading
  const base = `inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed ${sizeClasses[size]} ${fullWidth ? 'w-full' : ''} ${className}`

  if (variant === 'primary') {
    return (
      <button
        {...rest}
        disabled={isDisabled}
        className={`${base} text-white shadow-[0_4px_12px_rgba(108,92,231,0.4)]`}
        style={{ background: 'linear-gradient(90deg, #6C5CE7 0%, #0984E3 100%)' }}
      >
        {loading ? <Spinner /> : (
          <>
            {icon}
            {children}
          </>
        )}
      </button>
    )
  }

  if (variant === 'secondary') {
    return (
      <button
        {...rest}
        disabled={isDisabled}
        className={`${base} bg-[#1E1B3A] text-white shadow-md`}
      >
        {loading ? <Spinner /> : (
          <>
            {icon}
            {children}
          </>
        )}
      </button>
    )
  }

  if (variant === 'outline') {
    return (
      <button
        {...rest}
        disabled={isDisabled}
        className={`${base} bg-transparent border-[1.5px] border-[#6C5CE7] text-[#6C5CE7]`}
      >
        {loading ? <Spinner /> : (
          <>
            {icon}
            {children}
          </>
        )}
      </button>
    )
  }

  // ghost
  return (
    <button
      {...rest}
      disabled={isDisabled}
      className={`${base} bg-transparent`}
    >
      {loading ? <Spinner /> : (
        <>
          {icon}
          {children}
        </>
      )}
    </button>
  )
}

function Spinner() {
  return (
    <svg
      className="animate-spin h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  )
}
