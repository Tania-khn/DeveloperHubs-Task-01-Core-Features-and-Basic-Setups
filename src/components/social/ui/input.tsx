'use client'

import { ReactNode } from 'react'

interface InputProps {
  label?: string
  value: string
  onChange: (v: string) => void
  onBlur?: () => void
  type?: 'text' | 'email' | 'password'
  placeholder?: string
  icon?: ReactNode
  error?: string
  touched?: boolean
  multiline?: boolean
  maxLength?: number
  helperText?: string
}

const placeholderStyle = { color: 'var(--sc-placeholder)' } as const

export function Input({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  icon,
  error,
  touched,
  multiline = false,
  maxLength,
  helperText,
}: InputProps) {
  const hasError = Boolean(error && touched)

  return (
    <div className="mb-4">
      {label && (
        <label
          className="block text-[13px] font-medium mb-1 ml-1"
          style={{ color: hasError ? '#FF5252' : 'var(--sc-text-muted)' }}
        >
          {label}
        </label>
      )}
      <div
        className={`flex items-center rounded-xl border-[1.5px] px-4 transition-colors ${
          multiline ? 'items-start' : ''
        } ${
          hasError
            ? 'bg-red-50 dark:bg-red-950/30 border-red-400'
            : 'border-transparent focus-within:border-[#6C5CE7]'
        }`}
        style={{ backgroundColor: hasError ? undefined : 'var(--sc-input-bg)' }}
      >
        {icon && <span className="mr-2" style={{ color: 'var(--sc-text-muted)' }}>{icon}</span>}
        {multiline ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            maxLength={maxLength}
            rows={3}
            className="flex-1 py-3 bg-transparent text-[15px] outline-none resize-none"
            style={{ color: 'var(--sc-text)' }}
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            maxLength={maxLength}
            className="flex-1 py-3.5 bg-transparent text-[15px] outline-none"
            style={{ color: 'var(--sc-text)' }}
          />
        )}
      </div>
      {hasError && (
        <p className="text-xs text-red-500 mt-1 ml-1 font-medium flex items-center gap-1">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
          {error}
        </p>
      )}
      {helperText && !hasError && (
        <p className="text-xs mt-1 ml-1" style={{ color: 'var(--sc-text-muted)' }}>{helperText}</p>
      )}
    </div>
  )
}
