'use client'

import { useState, FormEvent } from 'react'
import { Mail, Lock, Eye, EyeOff, MessageCircle, AlertCircle } from 'lucide-react'
import { useApp, User } from '../app-context'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

export function LoginScreen() {
  const { navigate, setUser, showToast } = useApp()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const validate = () => {
    const e: Record<string, string> = {}
    if (!email) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Please enter a valid email'
    if (!password) e.password = 'Password is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault()
    setTouched({ email: true, password: true })
    if (!validate()) return

    setLoading(true)
    setSubmitError(null)
    // Mock auth — accept any valid email + password ≥ 1 char
    await new Promise((r) => setTimeout(r, 900))
    const user: User = {
      id: 'mock_user',
      name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      email,
      username: email.split('@')[0],
      bio: 'Welcome to my Social Connect profile!',
      avatar: null,
      createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
    }
    setUser(user)
    setLoading(false)
    showToast('Welcome back! 🎉', 'success')
    navigate('home')
  }

  return (
    <div
      className="min-h-full flex flex-col"
      style={{ background: 'linear-gradient(135deg, #4834D4 0%, #6C5CE7 50%, #0984E3 100%)' }}
    >
      <div className="flex-1 px-6 pb-12 overflow-y-auto">
        {/* Brand */}
        <div className="flex flex-col items-center mt-20 mb-10">
          <div className="w-20 h-20 rounded-full bg-white/15 border border-white/30 flex items-center justify-center mb-4">
            <MessageCircle size={44} color="#fff" fill="#fff" />
          </div>
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
          <p className="text-[15px] text-white/85 mt-1 text-center">
            Sign in to continue to Social Connect
          </p>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-3xl p-6 shadow-2xl">
          <form onSubmit={handleSubmit}>
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={setEmail}
              onBlur={() => setTouched({ ...touched, email: true })}
              error={errors.email}
              touched={touched.email}
              icon={<Mail size={20} color="#6E7191" />}
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPass ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={setPassword}
                onBlur={() => setTouched({ ...touched, password: true })}
                error={errors.password}
                touched={touched.password}
                icon={<Lock size={20} color="#6E7191" />}
              />
              <button
                type="button"
                onClick={() => setShowPass((s) => !s)}
                className="absolute right-4 top-[42px] text-[#6E7191]"
              >
                {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="flex justify-end -mt-2 mb-4">
              <button
                type="button"
                onClick={() => navigate('forgot')}
                className="text-sm font-semibold text-[#6C5CE7]"
              >
                Forgot password?
              </button>
            </div>

            {submitError && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-2 mb-4">
                <AlertCircle size={18} color="#FF5252" />
                <span className="text-sm text-red-600 font-medium flex-1">{submitError}</span>
              </div>
            )}

            <Button type="submit" size="lg" fullWidth loading={loading}>
              Sign In
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-[#E5E7F0]" />
            <span className="mx-4 text-xs font-semibold text-[#6E7191]">OR</span>
            <div className="flex-1 h-px bg-[#E5E7F0]" />
          </div>

          <Button
            variant="outline"
            size="lg"
            fullWidth
            icon={<MessageCircle size={20} />}
            onClick={() => navigate('signup')}
          >
            Create New Account
          </Button>
        </div>

        <p className="text-center text-xs text-white/70 mt-6">
          Demo: enter any email + password to sign in
        </p>
      </div>
    </div>
  )
}
