'use client'

import { useState, FormEvent, useRef } from 'react'
import { X, Camera, User as UserIcon, AtSign, Info, Mail, Lock, Check, Image as ImageIcon, Folder, Trash2 } from 'lucide-react'
import { useApp } from '../app-context'
import { Header } from '../ui/header'
import { Card } from '../ui/card'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

const AVATAR_PRESETS = [
  'linear-gradient(135deg, #6C5CE7 0%, #0984E3 100%)',
  'linear-gradient(135deg, #FD79A8 0%, #FDCB6E 100%)',
  'linear-gradient(135deg, #00B894 0%, #0984E3 100%)',
  'linear-gradient(135deg, #E84393 0%, #6C5CE7 100%)',
  'linear-gradient(135deg, #FDCB6E 0%, #E17055 100%)',
  'linear-gradient(135deg, #00CEC9 0%, #6C5CE7 100%)',
]

const MAX_BIO = 160

export function ProfileEditScreen() {
  const { user, updateProfile, navigate, showToast } = useApp()
  const [name, setName] = useState(user?.name || '')
  const [username, setUsername] = useState(user?.username || '')
  const [bio, setBio] = useState(user?.bio || '')
  const [avatarIdx, setAvatarIdx] = useState<number | null>(null)
  const [uploadedAvatar, setUploadedAvatar] = useState<string | null>(
    user?.avatar && user.avatar.startsWith('data:') ? user.avatar : null,
  )
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState(false)
  const [showUploadMenu, setShowUploadMenu] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  const validate = () => {
    const e: Record<string, string> = {}
    if (!name) e.name = 'Name is required'
    else if (name.length < 2) e.name = 'Name must be at least 2 characters'
    else if (name.length > 40) e.name = 'Name is too long'
    if (!username) e.username = 'Username is required'
    else if (username.length < 3) e.username = 'At least 3 characters'
    else if (!/^[a-zA-Z0-9_]+$/.test(username))
      e.username = 'Only letters, numbers and underscore'
    if (bio.length > MAX_BIO) e.bio = `Bio should be under ${MAX_BIO} characters`
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSave = async (ev: FormEvent) => {
    ev.preventDefault()
    setTouched({ name: true, username: true, bio: true })
    if (!validate()) return

    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    let avatar: string | null = null
    if (uploadedAvatar) avatar = uploadedAvatar
    else if (avatarIdx !== null) avatar = `preset:${avatarIdx}`
    else avatar = user?.avatar || null

    updateProfile({ name, username, bio, avatar })
    setLoading(false)
    showToast('Profile updated ✓', 'success')
    navigate('profile')
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      showToast('Please select an image file', 'error')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      showToast('Image must be under 5MB', 'error')
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      setUploadedAvatar(reader.result as string)
      setAvatarIdx(null)
      setShowUploadMenu(false)
      showToast('Profile photo updated ✓', 'success')
    }
    reader.onerror = () => {
      showToast('Failed to load image', 'error')
    }
    reader.readAsDataURL(file)
  }

  const openUploadOption = (kind: 'device' | 'camera') => {
    setShowUploadMenu(false)
    setTimeout(() => {
      if (kind === 'device') fileInputRef.current?.click()
      else cameraInputRef.current?.click()
    }, 100)
  }

  const removeAvatar = () => {
    setUploadedAvatar(null)
    setAvatarIdx(null)
    setShowUploadMenu(false)
    showToast('Profile photo removed', 'info')
  }

  // Determine which avatar to show
  const currentAvatar = uploadedAvatar
    ? uploadedAvatar
    : avatarIdx !== null
      ? AVATAR_PRESETS[avatarIdx]
      : user?.avatar
        ? user.avatar
        : null
  const isImageAvatar = !!uploadedAvatar || (user?.avatar && user.avatar.startsWith('data:'))

  return (
    <div className="min-h-full flex flex-col" style={{ backgroundColor: 'var(--sc-bg)' }}>
      <Header
        title="Edit Profile"
        leftIcon={<X size={24} color="#fff" />}
        onLeftPress={() => navigate('profile')}
      />

      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="user"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Upload options modal */}
      {showUploadMenu && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={() => setShowUploadMenu(false)}
        >
          <div
            className="w-full max-w-[400px] rounded-t-3xl p-6 pb-8 animate-[slideUp_0.2s_ease-out]"
            style={{ backgroundColor: 'var(--sc-surface)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold" style={{ color: 'var(--sc-text)' }}>
                Change Profile Photo
              </h3>
              <button
                onClick={() => setShowUploadMenu(false)}
                className="p-1 rounded-full hover:bg-[#6C5CE7]/10"
                style={{ color: 'var(--sc-text-muted)' }}
              >
                <X size={22} />
              </button>
            </div>
            <p className="text-xs mb-4" style={{ color: 'var(--sc-text-muted)' }}>
              Choose how you want to upload your photo
            </p>

            <div className="space-y-2">
              <UploadOption
                icon={<Folder size={22} color="#6C5CE7" />}
                title="Upload from Device"
                subtitle="Browse files from your computer"
                bg="#EDEBFE"
                onClick={() => openUploadOption('device')}
              />
              <UploadOption
                icon={<Camera size={22} color="#FD79A8" />}
                title="Take Photo (Browser)"
                subtitle="Use your camera to take a selfie"
                bg="#FCE4EC"
                onClick={() => openUploadOption('camera')}
              />
              {uploadedAvatar && (
                <UploadOption
                  icon={<Trash2 size={22} color="#FF5252" />}
                  title="Remove Current Photo"
                  subtitle="Reset to default gradient avatar"
                  bg="#FFE5E5"
                  onClick={removeAvatar}
                />
              )}
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 p-4 pb-24 overflow-y-auto">
        {/* Avatar picker */}
        <div className="flex flex-col items-center py-8">
          <button
            onClick={() => setShowUploadMenu(true)}
            className="relative active:scale-95 transition"
          >
            {isImageAvatar && currentAvatar ? (
              <img
                src={currentAvatar.startsWith('data:') ? currentAvatar : currentAvatar}
                alt="Avatar"
                className="w-[110px] h-[110px] rounded-full object-cover"
              />
            ) : (
              <div
                className="w-[110px] h-[110px] rounded-full flex items-center justify-center text-4xl font-bold text-white"
                style={{
                  background: currentAvatar && currentAvatar.startsWith('linear-gradient')
                    ? currentAvatar
                    : `linear-gradient(135deg, ${getInitialsColor(user?.name || 'User')[0]} 0%, ${getInitialsColor(user?.name || 'User')[1]} 100%)`,
                }}
              >
                {getInitials(name || user?.name || 'User')}
              </div>
            )}
            <div
              className="absolute bottom-1 right-1 w-9 h-9 rounded-full bg-[#6C5CE7] flex items-center justify-center"
              style={{ border: '3px solid var(--sc-bg)' }}
            >
              <Camera size={18} color="#fff" />
            </div>
          </button>
          <button
            onClick={() => setShowUploadMenu(true)}
            className="text-[#6C5CE7] text-[15px] font-semibold mt-4 hover:underline"
          >
            Change Profile Photo
          </button>
          <p className="text-xs mt-1" style={{ color: 'var(--sc-text-muted)' }}>
            Tap to upload from device, browser, or pick a gradient below
          </p>

          {/* Gradient presets */}
          <div className="flex flex-wrap justify-center gap-3 mt-4 px-4 max-w-xs">
            {AVATAR_PRESETS.map((g, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setAvatarIdx(idx)
                  setUploadedAvatar(null)
                  showToast('Avatar gradient selected', 'info')
                }}
                className={`w-12 h-12 rounded-full transition-all ${
                  avatarIdx === idx && !uploadedAvatar ? 'ring-4 ring-offset-2 ring-[#6C5CE7]' : ''
                }`}
                style={{
                  background: g,
                  // @ts-expect-error CSS var
                  '--tw-ring-offset-color': 'var(--sc-bg)',
                }}
              />
            ))}
          </div>
        </div>

        {/* Form */}
        <Card padding="lg" className="shadow-md">
          <form onSubmit={handleSave}>
            <Input
              label="Full Name"
              placeholder="Your name"
              value={name}
              onChange={setName}
              onBlur={() => setTouched({ ...touched, name: true })}
              error={errors.name}
              touched={touched.name}
              icon={<UserIcon size={20} color="var(--sc-text-muted)" />}
            />

            <Input
              label="Username"
              placeholder="username"
              value={username}
              onChange={setUsername}
              onBlur={() => setTouched({ ...touched, username: true })}
              error={errors.username}
              touched={touched.username}
              icon={<AtSign size={20} color="var(--sc-text-muted)" />}
              helperText="Only letters, numbers, and underscore."
            />

            <Input
              label="Bio"
              placeholder="Tell people about yourself…"
              value={bio}
              onChange={setBio}
              onBlur={() => setTouched({ ...touched, bio: true })}
              error={errors.bio}
              touched={touched.bio}
              multiline
              maxLength={MAX_BIO}
              icon={<Info size={20} color="var(--sc-text-muted)" />}
            />
            <div className="text-right text-xs -mt-2 mb-4" style={{ color: 'var(--sc-text-muted)' }}>
              {bio.length} / {MAX_BIO}
            </div>

            <div className="h-px my-4" style={{ backgroundColor: 'var(--sc-border)' }} />

            <div className="flex items-center py-2">
              <Mail size={18} color="var(--sc-text-muted)" />
              <div className="flex-1 ml-4">
                <p className="text-xs font-medium" style={{ color: 'var(--sc-text-muted)' }}>Email</p>
                <p className="text-[15px] mt-0.5" style={{ color: 'var(--sc-text)' }}>{user?.email}</p>
              </div>
              <Lock size={16} color="var(--sc-text-muted)" />
            </div>

            <Button
              type="submit"
              size="lg"
              fullWidth
              loading={loading}
              icon={<Check size={20} color="#fff" />}
              className="mt-6"
            >
              Save Changes
            </Button>

            <Button
              variant="ghost"
              size="md"
              fullWidth
              onClick={() => navigate('profile')}
              className="mt-2"
            >
              Cancel
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}

function UploadOption({
  icon,
  title,
  subtitle,
  bg,
  onClick,
}: {
  icon: React.ReactNode
  title: string
  subtitle: string
  bg: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 p-3 rounded-2xl transition active:scale-[0.98] hover:opacity-90"
      style={{ backgroundColor: 'var(--sc-surface-muted)' }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
        style={{ backgroundColor: bg }}
      >
        {icon}
      </div>
      <div className="flex-1 text-left">
        <p className="text-[15px] font-semibold" style={{ color: 'var(--sc-text)' }}>{title}</p>
        <p className="text-xs mt-0.5" style={{ color: 'var(--sc-text-muted)' }}>{subtitle}</p>
      </div>
    </button>
  )
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase()
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
}

function getInitialsColor(seed: string): [string, string] {
  const gradients: [string, string][] = [
    ['#6C5CE7', '#0984E3'],
    ['#FD79A8', '#FDCB6E'],
    ['#00B894', '#0984E3'],
    ['#E84393', '#6C5CE7'],
    ['#FDCB6E', '#E17055'],
    ['#00CEC9', '#6C5CE7'],
  ]
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i)
    hash |= 0
  }
  return gradients[Math.abs(hash) % gradients.length]
}
