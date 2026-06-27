'use client'

import { createContext, useContext, useState, ReactNode, useMemo, useCallback } from 'react'

// ============================================================
// Types
// ============================================================
export type ScreenName =
  | 'login'
  | 'signup'
  | 'forgot'
  | 'home'
  | 'search'
  | 'profile'
  | 'settings'
  | 'profileEdit'
  | 'changePassword'

export type TabName = 'home' | 'search' | 'profile' | 'settings'

export interface User {
  id: string
  name: string
  email: string
  username: string
  bio: string
  avatar: string | null
  createdAt: string
}

export interface Post {
  id: string
  userName: string
  username: string
  avatar: string | null
  time: string
  content: string
  likes: number
  comments: number
  liked?: boolean
}

export interface MockUser {
  id: string
  name: string
  username: string
  bio: string
  avatar: string | null
  followers: number
  following: number
}

// ============================================================
// Mock data
// ============================================================
export const MOCK_POSTS: Post[] = [
  {
    id: '1',
    userName: 'Ayesha Khan',
    username: 'ayesha.k',
    avatar: null,
    time: '15m ago',
    content:
      'Just finished an amazing hike in the northern mountains! 🏔️ The view was absolutely worth every step.',
    likes: 124,
    comments: 18,
  },
  {
    id: '2',
    userName: 'Bilal Ahmed',
    username: 'bilal.dev',
    avatar: null,
    time: '2h ago',
    content:
      'Working on a new React Native project today. The ecosystem has grown so much! Anyone else using the new architecture yet?',
    likes: 89,
    comments: 23,
  },
  {
    id: '3',
    userName: 'Sara Malik',
    username: 'sara.m',
    avatar: null,
    time: '5h ago',
    content: 'Coffee and code ☕️ — the perfect combination for a productive morning.',
    likes: 256,
    comments: 41,
  },
  {
    id: '4',
    userName: 'Hassan Raza',
    username: 'hassan.r',
    avatar: null,
    time: '1d ago',
    content:
      'Just launched my new portfolio website! Would love to hear your feedback 🚀',
    likes: 178,
    comments: 32,
  },
]

export const MOCK_USERS: MockUser[] = [
  {
    id: 'u1',
    name: 'Ayesha Khan',
    username: 'ayesha.k',
    bio: 'Photographer 📷 | Traveler 🌍 | Coffee lover ☕',
    avatar: null,
    followers: 1240,
    following: 380,
  },
  {
    id: 'u2',
    name: 'Bilal Ahmed',
    username: 'bilal.dev',
    bio: 'Senior Mobile Engineer @ Tech Co | React Native enthusiast',
    avatar: null,
    followers: 2450,
    following: 412,
  },
  {
    id: 'u3',
    name: 'Sara Malik',
    username: 'sara.m',
    bio: 'UI/UX Designer 🎨 | Creating beautiful experiences',
    avatar: null,
    followers: 3890,
    following: 245,
  },
  {
    id: 'u4',
    name: 'Hassan Raza',
    username: 'hassan.r',
    bio: 'Full-stack developer | Open source contributor',
    avatar: null,
    followers: 1567,
    following: 523,
  },
  {
    id: 'u5',
    name: 'Mariam Javed',
    username: 'mariam.j',
    bio: 'Product Manager | Tech enthusiast | Book worm 📚',
    avatar: null,
    followers: 980,
    following: 156,
  },
  {
    id: 'u6',
    name: 'Usman Tariq',
    username: 'usman.t',
    bio: 'Fitness coach 💪 | Nutritionist | Helping you get fit',
    avatar: null,
    followers: 4520,
    following: 89,
  },
]

export const TRENDING_TOPICS = [
  { id: '1', label: '#Photography', count: '12.4K posts' },
  { id: '2', label: '#TechNews', count: '8.7K posts' },
  { id: '3', label: '#Travel', count: '6.2K posts' },
  { id: '4', label: '#Foodie', count: '4.9K posts' },
  { id: '5', label: '#Fitness', count: '3.5K posts' },
  { id: '6', label: '#Music', count: '2.8K posts' },
]

// ============================================================
// Helpers
// ============================================================
export function getAvatarGradient(seed = ''): [string, string] {
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

export function getInitials(name = ''): string {
  if (!name) return '?'
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase()
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
}

export function truncate(text = '', length = 50): string {
  if (text.length <= length) return text
  return text.substring(0, length).trim() + '…'
}

// ============================================================
// Context
// ============================================================
interface AppContextValue {
  user: User | null
  setUser: (u: User | null) => void
  screen: ScreenName
  activeTab: TabName
  navigate: (screen: ScreenName) => void
  switchTab: (tab: TabName) => void
  posts: Post[]
  toggleLike: (postId: string) => void
  following: Record<string, boolean>
  toggleFollow: (userId: string) => void
  prefs: Record<string, boolean>
  togglePref: (key: string) => void
  updateProfile: (updates: Partial<User>) => void
  logout: () => void
  toast: { message: string; type: 'success' | 'error' | 'info' } | null
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [screen, setScreen] = useState<ScreenName>('login')
  const [activeTab, setActiveTab] = useState<TabName>('home')
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS)
  const [following, setFollowing] = useState<Record<string, boolean>>({})
  const [prefs, setPrefs] = useState<Record<string, boolean>>({
    pushNotifications: true,
    emailNotifications: true,
    messagePreviews: false,
    darkMode: false,
    soundEffects: true,
    dataSaver: false,
    autoplayVideos: true,
  })
  const [toast, setToast] = useState<{
    message: string
    type: 'success' | 'error' | 'info'
  } | null>(null)

  const navigate = useCallback((s: ScreenName) => {
    setScreen(s)
    if (['home', 'search', 'profile', 'settings'].includes(s)) {
      setActiveTab(s as TabName)
    }
  }, [])

  const switchTab = useCallback((tab: TabName) => {
    setActiveTab(tab)
    setScreen(tab)
  }, [])

  const toggleLike = useCallback((postId: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              liked: !p.liked,
              likes: p.liked ? p.likes - 1 : p.likes + 1,
            }
          : p,
      ),
    )
  }, [])

  const toggleFollow = useCallback((userId: string) => {
    setFollowing((prev) => ({ ...prev, [userId]: !prev[userId] }))
  }, [])

  const togglePref = useCallback((key: string) => {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }))
  }, [])

  const updateProfile = useCallback((updates: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : prev))
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    setScreen('login')
    setActiveTab('home')
  }, [])

  const showToast = useCallback(
    (message: string, type: 'success' | 'error' | 'info' = 'info') => {
      setToast({ message, type })
      setTimeout(() => setToast(null), 2500)
    },
    [],
  )

  const value = useMemo<AppContextValue>(
    () => ({
      user,
      setUser,
      screen,
      activeTab,
      navigate,
      switchTab,
      posts,
      toggleLike,
      following,
      toggleFollow,
      prefs,
      togglePref,
      updateProfile,
      logout,
      toast,
      showToast,
    }),
    [
      user,
      screen,
      activeTab,
      navigate,
      switchTab,
      posts,
      toggleLike,
      following,
      toggleFollow,
      prefs,
      togglePref,
      updateProfile,
      logout,
      toast,
      showToast,
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>')
  return ctx
}
