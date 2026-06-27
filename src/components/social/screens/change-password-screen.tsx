'use client'

import { useState, FormEvent } from 'react'
import { X, Lock, Eye, EyeOff, Check, AlertCircle, ShieldCheck } from 'lucide-react'
import { useApp } from '../app-context'
import { Header } from '../ui/header'
import { Card } from '../ui/card'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

interface Values {
  current: string
  newPwd: string
  confirm: string
}

export function ChangePasswordScreen() {
  const { navigate, showToast } = useApp()
  const [values, setValues] = useState<Values>({ current: '', newPwd: '', confirm: '' })
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const update = (k: keyof Values, v: string) =>
    setValues((prev) => ({ ...prev, [k]: v }))

  // Password strength meter
  const strength = getStrength(values.newPwd)

  const validate = () => {
    const e: Record<string, string> = {}
    if (!values.current) e.current = 'Current password is required'
    if (!values.newPwd) e.newPwd = 'New password is required'
    else if (values.newPwd.length < 8) e.newPwd = 'Password must be at least 8 characters'
    else if (!/[A-Za-z]/.test(values.newPwd)) e.newPwd = 'Add at least one letter'
    else if (!/[0-9]/.test(values.newPwd)) e.newPwd = 'Add at least one number'
    if (!values.confirm) e.confirm = 'Please confirm your new password'
    else if (values.confirm !== values.newPwd) e.confirm = 'Passwords do not match'
    if (values.current && values.newPwd && values.current === values.newPwd)
      e.newPwd = 'New password must be different from current password'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault()
    setTouched({ current: true, newPwd: true, confirm: true })
    if (!validate()) return

    setLoading(true)
    setSubmitError(null)
    // Simulate API call — in real app this would call Firebase updatePassword()
    await new Promise((r) => setTimeout(r, 1100))
    setLoading(false)

    // Mock: if current password is "wrong" (e.g. "wrong"), show error
    if (values.current.toLowerCase() === 'wrong') {
      setSubmitError('Current password is incorrect. Please try again.')
      return
    }

    setSuccess(true)
    showToast('Password changed successfully! 🔐', 'success')
  }

  if (success) {
    return (
      <div className="min-h-full flex flex-col" style={{ backgroundColor: 'var(--sc-bg)' }}>
        <Header title="Change Password" />
        <div className="flex-1 p-6 flex flex-col items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-[#E6F7F1] dark:bg-[#00B894]/20 flex items-center justify-center mb-6">
            <ShieldCheck size={56} color="#00B894" />
          </div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--sc-text)' }}>
            Password Updated!
          </h2>
          <p className="text-[15px] text-center leading-relaxed mb-8" style={{ color: 'var(--sc-text-muted)' }}>
            Your password has been changed successfully. You can now use your new password to log in.
          </p>
          <Button
            size="lg"
            fullWidth
            icon={<Check size={20} color="#fff" />}
            onClick={() => navigate('settings')}
          >
            Done
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-full flex flex-col" style={{ backgroundColor: 'var(--sc-bg)' }}>
      <Header
        title="Change Password"
        leftIcon={<X size={24} color="#fff" />}
        onLeftPress={() => navigate('settings')}
      />

      <div className="flex-1 p-4 pb-24 overflow-y-auto">
        <Card padding="lg" className="shadow-md">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[#6C5CE7]/10 flex items-center justify-center">
              <Lock size={20} color="#6C5CE7" />
            </div>
            <div>
              <h2 className="text-lg font-bold" style={{ color: 'var(--sc-text)' }}>Update Password</h2>
              <p className="text-xs" style={{ color: 'var(--sc-text-muted)' }}>
                Enter your current password and a new one
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Current password */}
            <div className="relative">
              <Input
                label="Current Password"
                type={showCurrent ? 'text' : 'password'}
                placeholder="Enter current password"
                value={values.current}
                onChange={(v) => update('current', v)}
                onBlur={() => setTouched({ ...touched, current: true })}
                error={errors.current}
                touched={touched.current}
                icon={<Lock size={20} color="var(--sc-text-muted)" />}
              />
              <button
                type="button"
                onClick={() => setShowCurrent((s) => !s)}
                className="absolute right-4 top-[42px] p-1"
                style={{ color: 'var(--sc-text-muted)' }}
              >
                {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* New password */}
            <div className="relative">
              <Input
                label="New Password"
                type={showNew ? 'text' : 'password'}
                placeholder="At least 8 characters"
                value={values.newPwd}
                onChange={(v) => update('newPwd', v)}
                onBlur={() => setTouched({ ...touched, newPwd: true })}
                error={errors.newPwd}
                touched={touched.newPwd}
                icon={<Lock size={20} color="var(--sc-text-muted)" />}
              />
              <button
                type="button"
                onClick={() => setShowNew((s) => !s)}
                className="absolute right-4 top-[42px] p-1"
                style={{ color: 'var(--sc-text-muted)' }}
              >
                {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Password strength meter */}
            {values.newPwd && !errors.newPwd && (
              <div className="-mt-2 mb-4">
                <div className="flex gap-1 mb-1">
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className="h-1 flex-1 rounded-full transition-colors"
                      style={{
                        backgroundColor: level <= strength.score ? strength.color : 'var(--sc-border)',
                      }}
                    />
                  ))}
                </div>
                <p className="text-xs" style={{ color: strength.color }}>
                  {strength.label}
                </p>
              </div>
            )}

            {/* Confirm password */}
            <div className="relative">
              <Input
                label="Confirm New Password"
                type={showConfirm ? 'text' : 'password'}
                placeholder="Re-enter new password"
                value={values.confirm}
                onChange={(v) => update('confirm', v)}
                onBlur={() => setTouched({ ...touched, confirm: true })}
                error={errors.confirm}
                touched={touched.confirm}
                icon={<Lock size={20} color="var(--sc-text-muted)" />}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((s) => !s)}
                className="absolute right-4 top-[42px] p-1"
                style={{ color: 'var(--sc-text-muted)' }}
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Requirements helper */}
            <div
              className="rounded-xl px-4 py-3 mb-4 text-xs"
              style={{
                backgroundColor: 'var(--sc-surface-muted)',
                color: 'var(--sc-text-muted)',
              }}
            >
              <p className="font-semibold mb-1.5" style={{ color: 'var(--sc-text)' }}>
                Password requirements:
              </p>
              <ul className="space-y-1">
                <ReqItem ok={values.newPwd.length >= 8}>At least 8 characters</ReqItem>
                <ReqItem ok={/[A-Za-z]/.test(values.newPwd)}>At least one letter</ReqItem>
                <ReqItem ok={/[0-9]/.test(values.newPwd)}>At least one number</ReqItem>
                <ReqItem ok={!!values.confirm && values.confirm === values.newPwd}>
                  Passwords match
                </ReqItem>
              </ul>
            </div>

            {submitError && (
              <div className="flex items-center gap-2 bg-red-50 dark:bg-red-950/30 border border-red-200 rounded-xl px-4 py-2 mb-4">
                <AlertCircle size={18} color="#FF5252" />
                <span className="text-sm text-red-600 font-medium flex-1">{submitError}</span>
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              fullWidth
              loading={loading}
              icon={<ShieldCheck size={20} color="#fff" />}
            >
              Update Password
            </Button>

            <Button
              variant="ghost"
              size="md"
              fullWidth
              onClick={() => navigate('settings')}
              className="mt-2"
            >
              Cancel
            </Button>
          </form>
        </Card>

        {/* Security tip */}
        <div
          className="mt-4 rounded-xl p-4 text-xs"
          style={{
            backgroundColor: 'var(--sc-surface)',
            color: 'var(--sc-text-muted)',
          }}
        >
          <p className="font-semibold mb-1" style={{ color: 'var(--sc-text)' }}>
            💡 Security tip:
          </p>
          Use a strong, unique password. Avoid reusing passwords from other sites.
          Consider using a password manager.
        </div>
      </div>
    </div>
  )
}

function ReqItem({ ok, children }: { ok: boolean; children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-2">
      <span
        className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold"
        style={{
          backgroundColor: ok ? '#00B894' : 'var(--sc-border)',
          color: '#fff',
        }}
      >
        {ok ? '✓' : ''}
      </span>
      <span style={{ color: ok ? '#00B894' : 'var(--sc-text-muted)' }}>{children}</span>
    </li>
  )
}

interface Strength {
  score: number // 0-4
  label: string
  color: string
}

function getStrength(pwd: string): Strength {
  if (!pwd) return { score: 0, label: '', color: 'var(--sc-text-muted)' }
  let score = 0
  if (pwd.length >= 8) score++
  if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score++
  if (/[0-9]/.test(pwd)) score++
  if (/[^A-Za-z0-9]/.test(pwd) || pwd.length >= 12) score++
  const labels = ['Very weak', 'Weak', 'Fair', 'Good', 'Strong']
  const colors = ['#FF5252', '#FF5252', '#FDCB6E', '#0984E3', '#00B894']
  return { score, label: labels[score], color: colors[score] }
}
