'use client'

import {
  Edit,
  Camera,
  Calendar,
  Bookmark,
  ChevronRight,
  Lock,
  User as UserIcon,
  Share,
  LogOut,
} from 'lucide-react'
import { useApp } from '../app-context'
import { Header } from '../ui/header'
import { Card } from '../ui/card'
import { Avatar } from '../ui/avatar'
import { Button } from '../ui/button'

function formatDate(dateStr?: string): string {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

export function ProfileScreen() {
  const { user, navigate, logout, showToast } = useApp()

  return (
    <div className="min-h-full flex flex-col" style={{ backgroundColor: 'var(--sc-bg)' }}>
      <Header
        title="Profile"
        rightIcon={<Edit size={22} color="#fff" />}
        onRightPress={() => navigate('profileEdit')}
      />

      <div className="flex-1 p-4 pb-24 overflow-y-auto">
        {/* Profile header */}
        <div
          className="rounded-3xl p-8 flex flex-col items-center mb-4 shadow-lg"
          style={{ background: 'linear-gradient(135deg, #1E1B3A 0%, #4834D4 100%)' }}
        >
          <div className="relative mb-4">
            <Avatar uri={user?.avatar} name={user?.name || 'User'} size={110} />
            <button
              onClick={() => navigate('profileEdit')}
              className="absolute bottom-1 right-1 w-9 h-9 rounded-full bg-[#6C5CE7] border-[3px] flex items-center justify-center"
              style={{ borderColor: 'var(--sc-surface)' }}
            >
              <Camera size={18} color="#fff" />
            </button>
          </div>
          <h2 className="text-2xl font-bold text-white">{user?.name || 'User'}</h2>
          <p className="text-[15px] text-white/85 mt-0.5">@{user?.username || 'user'}</p>
          {user?.bio && (
            <p className="text-sm text-white/95 text-center mt-3 leading-relaxed">{user.bio}</p>
          )}
          {user?.createdAt && (
            <div className="flex items-center gap-1 mt-3">
              <Calendar size={14} color="rgba(255,255,255,0.7)" />
              <span className="text-xs text-white/70">Joined {formatDate(user.createdAt)}</span>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="flex gap-3 mb-6">
          {[
            { value: '128', label: 'Posts' },
            { value: '2.4K', label: 'Followers' },
            { value: '456', label: 'Following' },
          ].map((s) => (
            <div
              key={s.label}
              className="flex-1 rounded-2xl py-4 flex flex-col items-center shadow-sm"
              style={{ backgroundColor: 'var(--sc-surface)' }}
            >
              <span className="text-xl font-bold" style={{ color: 'var(--sc-text)' }}>{s.value}</span>
              <span className="text-xs mt-0.5 font-medium" style={{ color: 'var(--sc-text-muted)' }}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 mb-6">
          <Button
            variant="outline"
            size="md"
            icon={<Edit size={18} color="#6C5CE7" />}
            onClick={() => navigate('profileEdit')}
            className="flex-1"
          >
            Edit Profile
          </Button>
          <Button
            variant="secondary"
            size="md"
            icon={<Share size={18} color="#fff" />}
            onClick={() => showToast('Profile link copied!', 'success')}
            className="flex-1"
          >
            Share
          </Button>
        </div>

        {/* Account */}
        <h3 className="text-[15px] font-bold mb-2 ml-1 mt-2" style={{ color: 'var(--sc-text)' }}>Account</h3>
        <Card padding="none" className="overflow-hidden mb-6">
          <MenuItem
            icon={<UserIcon size={20} color="#6C5CE7" />}
            label="Personal Information"
            sublabel="Name, username, email"
            onClick={() => navigate('profileEdit')}
          />
          <Divider />
          <MenuItem
            icon={<Lock size={20} color="#6C5CE7" />}
            label="Privacy & Security"
            sublabel="Password, blocked accounts"
            onClick={() => navigate('settings')}
          />
          <Divider />
          <MenuItem
            icon={<Bookmark size={20} color="#6C5CE7" />}
            label="Saved Posts"
            sublabel="Your bookmarked content"
            onClick={() => showToast('No saved posts yet', 'info')}
          />
        </Card>

        {/* Preferences */}
        <h3 className="text-[15px] font-bold mb-2 ml-1" style={{ color: 'var(--sc-text)' }}>Preferences</h3>
        <Card padding="none" className="overflow-hidden mb-6">
          <MenuItem
            icon={<Settings2Icon />}
            label="App Settings"
            sublabel="Notifications, theme, language"
            onClick={() => navigate('settings')}
          />
          <Divider />
          <MenuItem
            icon={<HelpIcon />}
            label="Help & Support"
            sublabel="FAQ, contact us"
            onClick={() => showToast('Opening help center…', 'info')}
          />
          <Divider />
          <MenuItem
            icon={<InfoIcon />}
            label="About"
            sublabel="Version 1.0.0"
            onClick={() => showToast('Social Connect v1.0.0', 'info')}
          />
        </Card>

        <button
          onClick={() => {
            logout()
            showToast('Logged out', 'info')
            navigate('login')
          }}
          className="w-full rounded-2xl py-4 flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition"
          style={{ backgroundColor: 'var(--sc-surface)' }}
        >
          <LogOut size={20} color="#FF5252" />
          <span className="text-[#FF5252] text-[15px] font-semibold">Log Out</span>
        </button>
      </div>
    </div>
  )
}

function MenuItem({
  icon,
  label,
  sublabel,
  onClick,
}: {
  icon: React.ReactNode
  label: string
  sublabel?: string
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center px-4 py-4 transition min-h-[64px] hover:bg-[#6C5CE7]/5"
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mr-4"
        style={{ backgroundColor: 'var(--sc-surface-muted)' }}
      >
        {icon}
      </div>
      <div className="flex-1 text-left">
        <p className="text-[15px] font-semibold" style={{ color: 'var(--sc-text)' }}>{label}</p>
        {sublabel && <p className="text-xs mt-0.5" style={{ color: 'var(--sc-text-muted)' }}>{sublabel}</p>}
      </div>
      <ChevronRight size={22} color="var(--sc-text-muted)" />
    </button>
  )
}

function Divider() {
  return <div className="h-px ml-16" style={{ backgroundColor: 'var(--sc-border)' }} />
}

function Settings2Icon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6C5CE7" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  )
}

function HelpIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6C5CE7" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  )
}

function InfoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6C5CE7" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  )
}
