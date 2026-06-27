'use client'

import { Search, PlusCircle, Bell, Settings as SettingsIcon, MoreHorizontal, Heart, MessageCircle, Share2, RefreshCw } from 'lucide-react'
import { useApp } from '../app-context'
import { Header } from '../ui/header'
import { Card } from '../ui/card'
import { Avatar } from '../ui/avatar'
import { truncate } from '../app-context'

export function HomeScreen() {
  const { user, posts, toggleLike, switchTab, navigate, showToast } = useApp()

  const refresh = () => {
    showToast('Feed refreshed 🔄', 'info')
  }

  return (
    <div className="min-h-full flex flex-col" style={{ backgroundColor: 'var(--sc-bg)' }}>
      <Header
        title="Social Connect"
        subtitle="Your community feed"
        rightIcon={<Search size={24} color="#fff" />}
        onRightPress={() => switchTab('search')}
      />

      <div className="flex-1 p-4 pb-24 overflow-y-auto">
        {/* Welcome banner */}
        <div
          className="rounded-3xl p-6 mb-6 flex items-center gap-4 shadow-lg"
          style={{ background: 'linear-gradient(135deg, #FD79A8 0%, #FDCB6E 100%)' }}
        >
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white">
              Hello, {user?.name?.split(' ')[0] || 'Friend'}!
            </h2>
            <p className="text-sm text-white/90 mt-1">
              See what&apos;s happening in your community today
            </p>
          </div>
          <button
            onClick={() => switchTab('profile')}
            className="p-0.5 rounded-full bg-white/30"
          >
            <Avatar uri={user?.avatar} name={user?.name || 'You'} size={48} />
          </button>
        </div>

        {/* Quick actions */}
        <div className="flex justify-between mb-6">
          <QuickAction
            icon={<Search size={24} color="#6C5CE7" />}
            bg="#EDEBFE"
            label="Discover"
            onClick={() => switchTab('search')}
          />
          <QuickAction
            icon={<PlusCircle size={24} color="#FDCB6E" />}
            bg="#FEF3E2"
            label="Post"
            onClick={() => showToast('Create post — coming soon!', 'info')}
          />
          <QuickAction
            icon={<Bell size={24} color="#FD79A8" />}
            bg="#FCE4EC"
            label="Alerts"
            onClick={() => showToast('No new notifications', 'info')}
          />
          <QuickAction
            icon={<SettingsIcon size={24} color="#0984E3" />}
            bg="#E0F2FE"
            label="Settings"
            onClick={() => switchTab('settings')}
          />
        </div>

        {/* Section title with refresh */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold" style={{ color: 'var(--sc-text)' }}>Recent Posts</h3>
          <button onClick={refresh} className="text-[#6C5CE7] p-1 hover:bg-[#6C5CE7]/10 rounded-full transition">
            <RefreshCw size={18} />
          </button>
        </div>

        {/* Posts */}
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id} padding="md">
              <div className="flex items-center mb-3">
                <Avatar uri={post.avatar} name={post.userName} size={44} />
                <div className="flex-1 ml-3">
                  <p className="text-[15px] font-bold" style={{ color: 'var(--sc-text)' }}>{post.userName}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--sc-text-muted)' }}>
                    @{post.username} · {post.time}
                  </p>
                </div>
                <button className="p-1 hover:bg-[#6C5CE7]/10 rounded-full transition">
                  <MoreHorizontal size={22} color="var(--sc-text-muted)" />
                </button>
              </div>
              <p className="text-[15px] leading-relaxed mb-4" style={{ color: 'var(--sc-text)' }}>
                {post.content}
              </p>
              <div className="flex items-center pt-3" style={{ borderTopColor: 'var(--sc-border)', borderTopWidth: 1 }}>
                <button
                  onClick={() => toggleLike(post.id)}
                  className="flex items-center mr-6 active:scale-95 transition"
                >
                  {post.liked ? (
                    <Heart size={20} color="#FF5252" fill="#FF5252" />
                  ) : (
                    <Heart size={20} color="var(--sc-text-muted)" />
                  )}
                  <span
                    className="ml-1.5 text-sm font-medium"
                    style={{ color: post.liked ? '#FF5252' : 'var(--sc-text-muted)' }}
                  >
                    {post.likes}
                  </span>
                </button>
                <button className="flex items-center mr-6">
                  <MessageCircle size={20} color="var(--sc-text-muted)" />
                  <span className="ml-1.5 text-sm font-medium" style={{ color: 'var(--sc-text-muted)' }}>
                    {post.comments}
                  </span>
                </button>
                <button
                  className="flex items-center"
                  onClick={() => showToast('Post shared!', 'success')}
                >
                  <Share2 size={20} color="var(--sc-text-muted)" />
                  <span className="ml-1.5 text-sm font-medium" style={{ color: 'var(--sc-text-muted)' }}>Share</span>
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

function QuickAction({
  icon,
  bg,
  label,
  onClick,
}: {
  icon: React.ReactNode
  bg: string
  label: string
  onClick: () => void
}) {
  return (
    <button onClick={onClick} className="flex-1 flex flex-col items-center active:scale-95 transition">
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-1"
        style={{ backgroundColor: bg }}
      >
        {icon}
      </div>
      <span className="text-[11px] font-semibold" style={{ color: 'var(--sc-text-muted)' }}>{label}</span>
    </button>
  )
}
