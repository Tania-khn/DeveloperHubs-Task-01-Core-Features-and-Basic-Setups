'use client'

import {
  Bell,
  Mail,
  MessageSquare,
  Moon,
  Volume2,
  Save,
  PlayCircle,
  Trash,
  Lock,
  Shield,
  Ban,
  HelpCircle,
  MessageCircle,
  Star,
  FileText,
  LogOut,
  Info,
  ChevronRight,
} from 'lucide-react'
import { useApp } from '../app-context'
import { Header } from '../ui/header'
import { Card } from '../ui/card'

interface SettingRow {
  icon: React.ReactNode
  label: string
  sublabel?: string
  toggle?: boolean
  toggleKey?: string
  action?: () => void
  chevron?: boolean
}

export function SettingsScreen() {
  const { prefs, togglePref, logout, navigate, showToast } = useApp()

  const handleToggle = (key: string) => {
    const newValue = !prefs[key]
    togglePref(key)
    if (key === 'darkMode') {
      showToast(newValue ? 'Dark mode enabled 🌙' : 'Light mode enabled ☀️', 'success')
    }
  }

  const sections: { title: string; rows: SettingRow[] }[] = [
    {
      title: 'Notifications',
      rows: [
        {
          icon: <Bell size={20} color="#6C5CE7" />,
          label: 'Push Notifications',
          sublabel: 'Receive notifications on this device',
          toggle: true,
          toggleKey: 'pushNotifications',
        },
        {
          icon: <Mail size={20} color="#0984E3" />,
          label: 'Email Notifications',
          sublabel: 'Updates via email',
          toggle: true,
          toggleKey: 'emailNotifications',
        },
        {
          icon: <MessageSquare size={20} color="#FD79A8" />,
          label: 'Message Previews',
          sublabel: 'Show content in notification previews',
          toggle: true,
          toggleKey: 'messagePreviews',
        },
      ],
    },
    {
      title: 'Appearance & Sound',
      rows: [
        {
          icon: <Moon size={20} color="#1E1B3A" />,
          label: 'Dark Mode',
          sublabel: 'Use dark theme (coming soon)',
          toggle: true,
          toggleKey: 'darkMode',
        },
        {
          icon: <Volume2 size={20} color="#00B894" />,
          label: 'Sound Effects',
          sublabel: 'Play sounds for interactions',
          toggle: true,
          toggleKey: 'soundEffects',
        },
      ],
    },
    {
      title: 'Data & Storage',
      rows: [
        {
          icon: <Save size={20} color="#FDCB6E" />,
          label: 'Data Saver',
          sublabel: 'Reduce data usage on cellular networks',
          toggle: true,
          toggleKey: 'dataSaver',
        },
        {
          icon: <PlayCircle size={20} color="#A29BFE" />,
          label: 'Autoplay Videos',
          sublabel: 'Automatically play videos in feed',
          toggle: true,
          toggleKey: 'autoplayVideos',
        },
        {
          icon: <Trash size={20} color="#FF5252" />,
          label: 'Clear Cache',
          sublabel: '12.4 MB cached',
          action: () => showToast('Cache cleared ✓', 'success'),
          chevron: true,
        },
      ],
    },
    {
      title: 'Account',
      rows: [
        {
          icon: <Lock size={20} color="#6C5CE7" />,
          label: 'Change Password',
          sublabel: 'Update your account password',
          action: () => navigate('changePassword'),
          chevron: true,
        },
        {
          icon: <Shield size={20} color="#00B894" />,
          label: 'Privacy',
          sublabel: 'Manage who can see your content',
          action: () => showToast('Opening privacy settings…', 'info'),
          chevron: true,
        },
        {
          icon: <Ban size={20} color="#FF5252" />,
          label: 'Blocked Accounts',
          sublabel: '0 accounts',
          action: () => showToast('No blocked accounts', 'info'),
          chevron: true,
        },
      ],
    },
    {
      title: 'Support',
      rows: [
        {
          icon: <HelpCircle size={20} color="#0984E3" />,
          label: 'Help Center',
          action: () => showToast('Opening help center…', 'info'),
          chevron: true,
        },
        {
          icon: <MessageCircle size={20} color="#FD79A8" />,
          label: 'Send Feedback',
          action: () => showToast('Feedback form coming soon!', 'info'),
          chevron: true,
        },
        {
          icon: <Star size={20} color="#FDCB6E" />,
          label: 'Rate Us',
          sublabel: 'Enjoying the app? Let us know!',
          action: () => showToast('Thanks for the love! ⭐', 'success'),
          chevron: true,
        },
        {
          icon: <FileText size={20} color="#6E7191" />,
          label: 'Terms & Privacy Policy',
          action: () => showToast('Opening terms…', 'info'),
          chevron: true,
        },
      ],
    },
  ]

  return (
    <div className="min-h-full flex flex-col" style={{ backgroundColor: 'var(--sc-bg)' }}>
      <Header title="Settings" subtitle="App preferences" />

      <div className="flex-1 p-4 pb-24 overflow-y-auto">
        {/* Mock banner */}
        <div className="flex items-center bg-[#E0F2FE] dark:bg-[#0984E3]/20 rounded-xl px-4 py-2.5 mb-6 gap-2">
          <Info size={18} color="#0984E3" />
          <p className="flex-1 text-xs text-[#0984E3] dark:text-[#74C0FC] font-medium">
            Using demo auth — switch to Firebase per README for production.
          </p>
        </div>

        {sections.map((section) => (
          <div key={section.title} className="mb-6">
            <h3 className="text-xs font-bold ml-3 mb-2 uppercase tracking-wider" style={{ color: 'var(--sc-text-muted)' }}>
              {section.title}
            </h3>
            <Card padding="none" className="overflow-hidden">
              {section.rows.map((row, i) => (
                <div key={row.label}>
                  <Row row={row} prefs={prefs} onToggle={handleToggle} />
                  {i < section.rows.length - 1 && <Divider />}
                </div>
              ))}
            </Card>
          </div>
        ))}

        <button
          onClick={() => {
            logout()
            showToast('Logged out', 'info')
            navigate('login')
          }}
          className="w-full rounded-2xl py-4 flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition mb-6"
          style={{ backgroundColor: 'var(--sc-surface)' }}
        >
          <LogOut size={20} color="#FF5252" />
          <span className="text-[#FF5252] text-[15px] font-semibold">Log Out</span>
        </button>

        <p className="text-center text-xs font-semibold mt-4" style={{ color: 'var(--sc-text-muted)' }}>
          Social Connect v1.0.0
        </p>
        <p className="text-center text-xs mt-1" style={{ color: 'var(--sc-placeholder)' }}>
          Build your community, beautifully.
        </p>
      </div>
    </div>
  )
}

function Row({
  row,
  prefs,
  onToggle,
}: {
  row: SettingRow
  prefs: Record<string, boolean>
  onToggle: (k: string) => void
}) {
  const isToggle = row.toggle && row.toggleKey
  const isOn = isToggle ? prefs[row.toggleKey!] : false

  const Wrap: any = row.action ? 'button' : 'div'
  return (
    <Wrap
      onClick={row.action}
      className="w-full flex items-center px-4 py-4 min-h-[64px] hover:bg-[#6C5CE7]/5 transition text-left"
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mr-4 shrink-0"
        style={{ backgroundColor: 'var(--sc-surface-muted)' }}
      >
        {row.icon}
      </div>
      <div className="flex-1">
        <p className="text-[15px] font-semibold" style={{ color: 'var(--sc-text)' }}>{row.label}</p>
        {row.sublabel && <p className="text-xs mt-0.5" style={{ color: 'var(--sc-text-muted)' }}>{row.sublabel}</p>}
      </div>
      {isToggle ? (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onToggle(row.toggleKey!)
          }}
          className="relative inline-flex h-7 w-12 items-center rounded-full transition-colors"
          style={{ backgroundColor: isOn ? '#6C5CE7' : 'var(--sc-border)' }}
        >
          <span
            className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow-sm ${
              isOn ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      ) : row.chevron ? (
        <ChevronRight size={22} color="var(--sc-text-muted)" />
      ) : null}
    </Wrap>
  )
}

function Divider() {
  return <div className="h-px ml-16" style={{ backgroundColor: 'var(--sc-border)' }} />
}
