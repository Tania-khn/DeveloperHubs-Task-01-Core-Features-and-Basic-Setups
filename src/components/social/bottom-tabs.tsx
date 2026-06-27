'use client'

import { Home, Search, User as UserIcon, Settings as SettingsIcon } from 'lucide-react'
import { useApp, TabName } from './app-context'

const TABS: { name: TabName; label: string; icon: typeof Home }[] = [
  { name: 'home', label: 'Home', icon: Home },
  { name: 'search', label: 'Discover', icon: Search },
  { name: 'profile', label: 'Profile', icon: UserIcon },
  { name: 'settings', label: 'Settings', icon: SettingsIcon },
]

export function BottomTabs() {
  const { activeTab, switchTab } = useApp()

  return (
    <div
      className="shrink-0 border-t flex items-stretch justify-around"
      style={{
        backgroundColor: 'var(--sc-surface)',
        borderColor: 'var(--sc-border)',
        paddingBottom: 'env(safe-area-inset-bottom, 0)',
        paddingTop: '8px',
      }}
    >
      {TABS.map((tab) => {
        const Icon = tab.icon
        const active = activeTab === tab.name
        return (
          <button
            key={tab.name}
            onClick={() => switchTab(tab.name)}
            className="flex-1 flex flex-col items-center gap-1 py-1 transition active:scale-95"
          >
            <Icon
              size={24}
              color={active ? '#6C5CE7' : 'var(--sc-text-muted)'}
              fill={active ? '#6C5CE7' : 'none'}
              strokeWidth={active ? 2.5 : 2}
            />
            <span
              className="text-[11px] font-semibold"
              style={{ color: active ? '#6C5CE7' : 'var(--sc-text-muted)' }}
            >
              {tab.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
