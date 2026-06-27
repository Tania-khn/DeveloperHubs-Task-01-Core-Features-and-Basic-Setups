'use client'

import { AppProvider, useApp } from '@/components/social/app-context'
import { AppShell } from '@/components/social/app-shell'
import { Toast } from '@/components/social/toast'
import { useState } from 'react'

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative" style={{ width: 390, height: 780 }}>
      {/* Phone outer frame */}
      <div
        className="absolute inset-0 rounded-[3rem] shadow-2xl"
        style={{
          background: 'linear-gradient(145deg, #1a1a1a, #2a2a2a)',
          padding: 12,
        }}
      >
        {/* Inner screen */}
        <div
          className="relative w-full h-full rounded-[2.25rem] overflow-hidden bg-white"
          style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)' }}
        >
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-50 w-32 h-6 bg-black rounded-b-2xl" />
          {/* App content */}
          <div className="absolute inset-0 overflow-hidden">{children}</div>
        </div>
      </div>
    </div>
  )
}

function ScreenIndicator() {
  const { screen, user } = useApp()
  const label = !user
    ? screen === 'signup'
      ? 'Sign Up Screen'
      : screen === 'forgot'
        ? 'Forgot Password'
        : 'Login Screen'
    : screen === 'profileEdit'
      ? 'Edit Profile (Modal)'
      : screen === 'changePassword'
        ? 'Change Password (Modal)'
        : screen === 'home'
          ? 'Home — Feed'
          : screen === 'search'
            ? 'Discover — Search'
            : screen === 'profile'
              ? 'My Profile'
              : screen === 'settings'
                ? 'Settings'
                : 'App'
  return (
    <div className="mt-6 px-4 py-2 bg-white/10 backdrop-blur rounded-full text-white text-sm font-semibold">
      {label}
    </div>
  )
}

function QuickNav() {
  const { user, navigate, switchTab } = useApp()
  if (!user) return null
  return (
    <div className="mt-4 flex flex-wrap gap-2 justify-center max-w-[400px]">
      {[
        { l: 'Home', s: 'home' as const, t: 'tab' as const },
        { l: 'Discover', s: 'search' as const, t: 'tab' as const },
        { l: 'Profile', s: 'profile' as const, t: 'tab' as const },
        { l: 'Settings', s: 'settings' as const, t: 'tab' as const },
        { l: 'Edit Profile', s: 'profileEdit' as const, t: 'nav' as const },
        { l: 'Change Password', s: 'changePassword' as const, t: 'nav' as const },
      ].map((b) => (
        <button
          key={b.l}
          onClick={() => (b.t === 'tab' ? switchTab(b.s) : navigate(b.s))}
          className="px-3 py-1.5 text-xs font-semibold rounded-full bg-white/10 hover:bg-white/20 backdrop-blur text-white transition"
        >
          {b.l}
        </button>
      ))}
    </div>
  )
}

function PageContent() {
  return (
    <div
      className="min-h-screen w-full flex flex-col items-center py-10 px-4"
      style={{
        background:
          'radial-gradient(ellipse at top, #1E1B3A 0%, #0F0E2E 60%, #000 100%)',
      }}
    >
      {/* Title */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 mb-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
            style={{ background: 'linear-gradient(135deg, #6C5CE7, #0984E3)' }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white">Social Connect App</h1>
        </div>
        <p className="text-white/60 text-sm max-w-md mx-auto">
          Interactive preview — click through all screens & features in the phone frame below.
        </p>
      </div>

      <PhoneFrame>
        <AppShell />
        <Toast />
      </PhoneFrame>

      <ScreenIndicator />
      <QuickNav />

      {/* Hint */}
      <div className="mt-8 max-w-md text-center">
        <p className="text-white/50 text-xs leading-relaxed">
          💡 Tip: Login with any email + password to enter the app. Then use bottom tabs or the
          quick-nav buttons above to explore every screen. The full React Native source code is
          included in the ZIP you downloaded.
        </p>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <AppProvider>
      <PageContent />
    </AppProvider>
  )
}
