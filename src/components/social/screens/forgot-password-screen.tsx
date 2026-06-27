'use client'

import { useState, FormEvent } from 'react'
import { ArrowLeft, Mail, KeyRound, MailCheck, AlertCircle } from 'lucide-react'
import { useApp } from '../app-context'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

export function ForgotPasswordScreen() {
  const { navigate, showToast } = useApp()
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string>('')
  const [touched, setTouched] = useState(false)
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const validate = () => {
    if (!email) {
      setError('Email is required')
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email')
      return false
    }
    setError('')
    return true
  }

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault()
    setTouched(true)
    if (!validate()) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    setLoading(false)
    setSent(true)
    showToast('Reset link sent! 📧', 'success')
  }

  return (
    <div
      className="min-h-full flex flex-col"
      style={{ background: 'linear-gradient(135deg, #4834D4 0%, #6C5CE7 50%, #0984E3 100%)' }}
    >
      <div className="flex-1 px-6 pb-12 overflow-y-auto">
        <div className="mt-8 mb-6">
          <button
            onClick={() => navigate('login')}
            className="w-11 h-11 -ml-2 flex items-center justify-center text-white"
          >
            <ArrowLeft size={24} />
          </button>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-2xl flex flex-col items-center">
          {sent ? (
            <>
              <div className="w-24 h-24 rounded-full bg-[#E6F7F1] flex items-center justify-center mb-6">
                <MailCheck size={56} color="#00B894" />
              </div>
              <h2 className="text-2xl font-bold text-[#1A1A2E] mb-2">Check Your Email</h2>
              <p className="text-[15px] text-[#6E7191] text-center leading-relaxed mb-8">
                We&apos;ve sent a password reset link to{'\n'}
                <span className="text-[#6C5CE7] font-semibold">{email}</span>
                {'\n\n'}Please check your inbox and follow the link to reset your password.
              </p>
              <Button
                size="lg"
                fullWidth
                onClick={() => navigate('login')}
              >
                Back to Login
              </Button>
              <button
                onClick={() => {
                  setSent(false)
                  setEmail('')
                }}
                className="text-sm font-semibold text-[#6C5CE7] mt-6"
              >
                Didn&apos;t receive it? Try a different email
              </button>
            </>
          ) : (
            <>
              <div className="w-24 h-24 rounded-full bg-[#F5F6FA] flex items-center justify-center mb-6">
                <KeyRound size={56} color="#6C5CE7" />
              </div>
              <h2 className="text-2xl font-bold text-[#1A1A2E] mb-2">Forgot Password?</h2>
              <p className="text-[15px] text-[#6E7191] text-center leading-relaxed mb-8">
                Don&apos;t worry — enter your email address below and we&apos;ll send you a link to
                reset your password.
              </p>

              <form onSubmit={handleSubmit} className="w-full">
                <Input
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={setEmail}
                  onBlur={() => setTouched(true)}
                  error={error}
                  touched={touched}
                  icon={<Mail size={20} color="#6E7191" />}
                />

                <Button type="submit" size="lg" fullWidth loading={loading}>
                  Send Reset Link
                </Button>
              </form>

              <button
                onClick={() => navigate('login')}
                className="flex items-center gap-1 mt-6 text-sm font-semibold text-[#6C5CE7]"
              >
                <ArrowLeft size={16} />
                Back to Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
