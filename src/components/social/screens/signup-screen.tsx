'use client'

import { useState, FormEvent } from 'react'
import { ArrowLeft, User as UserIcon, Mail, Lock, AlertCircle } from 'lucide-react'
import { useApp, User } from '../app-context'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

export function SignupScreen() {
  const { navigate, setUser, showToast } = useApp()
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const update = (k: string, v: string) => setValues((prev) => ({ ...prev, [k]: v }))

  const validate = () => {
    const e: Record<string, string> = {}
    if (!values.name) e.name = 'Name is required'
    else if (values.name.length < 2) e.name = 'Name must be at least 2 characters'
    if (!values.email) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) e.email = 'Please enter a valid email'
    if (!values.password) e.password = 'Password is required'
    else if (values.password.length < 8) e.password = 'Password must be at least 8 characters'
    else if (!/[A-Za-z]/.test(values.password)) e.password = 'Add at least one letter'
    else if (!/[0-9]/.test(values.password)) e.password = 'Add at least one number'
    if (values.confirmPassword !== values.password) e.confirmPassword = 'Passwords must match'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault()
    setTouched({ name: true, email: true, password: true, confirmPassword: true })
    if (!validate()) return

    setLoading(true)
    setSubmitError(null)
    await new Promise((r) => setTimeout(r, 1100))
    const user: User = {
      id: 'mock_' + Date.now(),
      name: values.name,
      email: values.email,
      username: values.email.split('@')[0],
      bio: '',
      avatar: null,
      createdAt: new Date().toISOString(),
    }
    setUser(user)
    setLoading(false)
    showToast('Account created successfully! 🎉', 'success')
    navigate('home')
  }

  return (
    <div
      className="min-h-full flex flex-col"
      style={{ background: 'linear-gradient(135deg, #4834D4 0%, #6C5CE7 50%, #0984E3 100%)' }}
    >
      <div className="flex-1 px-6 pb-12 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center mt-8 mb-6">
          <button
            onClick={() => navigate('login')}
            className="w-11 h-11 -ml-2 flex items-center justify-center text-white"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex-1 flex flex-col items-center -mr-11">
            <div className="w-16 h-16 rounded-full bg-white/15 border border-white/30 flex items-center justify-center mb-2">
              <UserIcon size={32} color="#fff" />
            </div>
            <h1 className="text-2xl font-bold text-white">Create Account</h1>
            <p className="text-[15px] text-white/85 mt-0.5">Join Social Connect today</p>
          </div>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-3xl p-6 shadow-2xl">
          <form onSubmit={handleSubmit}>
            <Input
              label="Full Name"
              placeholder="John Doe"
              value={values.name}
              onChange={(v) => update('name', v)}
              onBlur={() => setTouched({ ...touched, name: true })}
              error={errors.name}
              touched={touched.name}
              icon={<UserIcon size={20} color="#6E7191" />}
            />
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={values.email}
              onChange={(v) => update('email', v)}
              onBlur={() => setTouched({ ...touched, email: true })}
              error={errors.email}
              touched={touched.email}
              icon={<Mail size={20} color="#6E7191" />}
            />
            <Input
              label="Password"
              type="password"
              placeholder="At least 8 characters"
              value={values.password}
              onChange={(v) => update('password', v)}
              onBlur={() => setTouched({ ...touched, password: true })}
              error={errors.password}
              touched={touched.password}
              icon={<Lock size={20} color="#6E7191" />}
            />
            <Input
              label="Confirm Password"
              type="password"
              placeholder="Re-enter your password"
              value={values.confirmPassword}
              onChange={(v) => update('confirmPassword', v)}
              onBlur={() => setTouched({ ...touched, confirmPassword: true })}
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
              icon={<Lock size={20} color="#6E7191" />}
            />

            {submitError && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-2 mb-4">
                <AlertCircle size={18} color="#FF5252" />
                <span className="text-sm text-red-600 font-medium flex-1">{submitError}</span>
              </div>
            )}

            <Button type="submit" size="lg" fullWidth loading={loading}>
              Create Account
            </Button>
          </form>

          <p className="text-center text-xs text-[#6E7191] mt-4 leading-relaxed">
            By signing up you agree to our{' '}
            <span className="font-semibold text-[#6C5CE7]">Terms of Service</span> and{' '}
            <span className="font-semibold text-[#6C5CE7]">Privacy Policy</span>.
          </p>

          <div className="flex justify-center mt-4">
            <span className="text-sm text-[#6E7191]">Already have an account?</span>
            <button
              onClick={() => navigate('login')}
              className="text-sm font-semibold text-[#6C5CE7] ml-1"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
