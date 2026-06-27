'use client'

import { useState } from 'react'
import { Search, SearchX, TrendingUp, X } from 'lucide-react'
import { useApp, MOCK_USERS, TRENDING_TOPICS, truncate } from '../app-context'
import { Header } from '../ui/header'
import { Card } from '../ui/card'
import { Avatar } from '../ui/avatar'
import { Input } from '../ui/input'

export function SearchScreen() {
  const { following, toggleFollow, showToast } = useApp()
  const [query, setQuery] = useState('')
  const [showAll, setShowAll] = useState(false)
  const [trendingVersion, setTrendingVersion] = useState(0)
  const [refreshing, setRefreshing] = useState(false)

  const results = query.trim()
    ? MOCK_USERS.filter(
        (u) =>
          u.name.toLowerCase().includes(query.toLowerCase()) ||
          u.username.toLowerCase().includes(query.toLowerCase()) ||
          u.bio.toLowerCase().includes(query.toLowerCase()),
      )
    : []

  // Show all suggested (instead of just 4)
  const suggested = showAll ? MOCK_USERS : MOCK_USERS.slice(0, 4)

  // Re-shuffle trending topics on refresh
  const trending = [...TRENDING_TOPICS].sort(
    () => Math.random() - 0.5,
  )

  const handleSeeAll = () => {
    setShowAll((v) => !v)
    showToast(showAll ? 'Showing top suggestions' : 'Showing all suggestions ✓', 'info')
  }

  const handleRefresh = () => {
    setRefreshing(true)
    setTrendingVersion((v) => v + 1)
    setTimeout(() => {
      setRefreshing(false)
      showToast('Trending topics refreshed! 🔄', 'success')
    }, 700)
  }

  return (
    <div className="min-h-full flex flex-col" style={{ backgroundColor: 'var(--sc-bg)' }}>
      <Header title="Discover" subtitle="Find people & topics" />
      <div className="px-4 pb-2">
        <Input
          placeholder="Search by name, username, or interest…"
          value={query}
          onChange={setQuery}
          icon={<Search size={20} color="var(--sc-text-muted)" />}
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="-mt-2 mb-2 ml-1 text-xs font-medium hover:underline"
            style={{ color: '#6C5CE7' }}
          >
            Clear search
          </button>
        )}
      </div>

      <div className="flex-1 p-4 pb-24 overflow-y-auto">
        {query.trim() ? (
          results.length === 0 ? (
            <div className="flex flex-col items-center py-20 px-8">
              <SearchX size={64} color="var(--sc-placeholder)" />
              <h3 className="text-lg font-bold mt-4" style={{ color: 'var(--sc-text)' }}>No users found</h3>
              <p className="text-sm mt-1 text-center" style={{ color: 'var(--sc-text-muted)' }}>
                Try searching with a different name or username
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-xs ml-1" style={{ color: 'var(--sc-text-muted)' }}>
                {results.length} {results.length === 1 ? 'result' : 'results'} for &quot;{query}&quot;
              </p>
              {results.map((u) => (
                <Card key={u.id} padding="md">
                  <div className="flex items-center">
                    <Avatar uri={u.avatar} name={u.name} size={56} />
                    <div className="flex-1 ml-4">
                      <p className="text-[15px] font-bold" style={{ color: 'var(--sc-text)' }}>{u.name}</p>
                      <p className="text-xs mt-0.5" style={{ color: '#6C5CE7' }}>@{u.username}</p>
                      <p className="text-sm mt-1 leading-snug" style={{ color: 'var(--sc-text-muted)' }}>
                        {truncate(u.bio, 60)}
                      </p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-xs" style={{ color: 'var(--sc-text-muted)' }}>
                          <b style={{ color: 'var(--sc-text)' }}>{u.followers.toLocaleString()}</b> followers
                        </span>
                        <span style={{ color: 'var(--sc-text-muted)' }}>·</span>
                        <span className="text-xs" style={{ color: 'var(--sc-text-muted)' }}>
                          <b style={{ color: 'var(--sc-text)' }}>{u.following}</b> following
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        toggleFollow(u.id)
                        showToast(
                          following[u.id] ? `Unfollowed ${u.name}` : `Following ${u.name} ✓`,
                          'success',
                        )
                      }}
                      className="px-5 py-2 rounded-full text-sm font-semibold transition active:scale-95"
                      style={
                        !following[u.id]
                          ? { background: 'linear-gradient(90deg, #6C5CE7, #0984E3)', color: '#fff' }
                          : {
                              backgroundColor: 'var(--sc-surface-muted)',
                              border: '1px solid var(--sc-border)',
                              color: 'var(--sc-text-muted)',
                            }
                      }
                    >
                      {following[u.id] ? 'Following' : 'Follow'}
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          )
        ) : (
          <div>
            {/* Suggested */}
            <div className="flex justify-between items-center mb-4 mt-2">
              <h3 className="text-lg font-bold" style={{ color: 'var(--sc-text)' }}>Suggested for You</h3>
              <button
                className="text-sm font-semibold flex items-center gap-1 hover:underline"
                style={{ color: '#6C5CE7' }}
                onClick={handleSeeAll}
              >
                {showAll ? 'Show Less' : 'See All'}
              </button>
            </div>

            {/* Show "see all" as a grid when expanded */}
            {showAll ? (
              <div className="grid grid-cols-2 gap-3 mb-6">
                {suggested.map((u) => (
                  <div
                    key={u.id}
                    className="rounded-2xl p-4 flex flex-col items-center"
                    style={{ backgroundColor: 'var(--sc-surface)' }}
                  >
                    <Avatar uri={u.avatar} name={u.name} size={56} />
                    <p className="text-sm font-bold mt-2 truncate w-full text-center" style={{ color: 'var(--sc-text)' }}>
                      {u.name}
                    </p>
                    <p className="text-xs mt-0.5 mb-2 truncate w-full text-center" style={{ color: 'var(--sc-text-muted)' }}>
                      @{u.username}
                    </p>
                    <p className="text-[10px] mb-3 text-center" style={{ color: 'var(--sc-text-muted)' }}>
                      {u.followers.toLocaleString()} followers
                    </p>
                    <button
                      onClick={() => {
                        toggleFollow(u.id)
                        showToast(
                          following[u.id] ? `Unfollowed ${u.name}` : `Following ${u.name} ✓`,
                          'success',
                        )
                      }}
                      className="w-full py-1.5 rounded-full text-xs font-semibold transition active:scale-95"
                      style={
                        !following[u.id]
                          ? { background: 'linear-gradient(90deg, #6C5CE7, #0984E3)', color: '#fff' }
                          : {
                              backgroundColor: 'var(--sc-surface-muted)',
                              border: '1px solid var(--sc-border)',
                              color: 'var(--sc-text-muted)',
                            }
                      }
                    >
                      {following[u.id] ? 'Following' : 'Follow'}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 mb-2">
                {suggested.map((u) => (
                  <div
                    key={u.id}
                    className="min-w-[130px] rounded-2xl p-4 flex flex-col items-center shadow-sm"
                    style={{ backgroundColor: 'var(--sc-surface)' }}
                  >
                    <Avatar uri={u.avatar} name={u.name} size={64} />
                    <p className="text-sm font-bold mt-2 truncate w-full text-center" style={{ color: 'var(--sc-text)' }}>
                      {u.name}
                    </p>
                    <p className="text-xs mt-0.5 mb-3 truncate w-full text-center" style={{ color: 'var(--sc-text-muted)' }}>
                      @{u.username}
                    </p>
                    <button
                      onClick={() => {
                        toggleFollow(u.id)
                        showToast(
                          following[u.id] ? `Unfollowed ${u.name}` : `Following ${u.name} ✓`,
                          'success',
                        )
                      }}
                      className={`w-full py-1.5 rounded-full text-xs font-semibold transition active:scale-95`}
                      style={
                        !following[u.id]
                          ? { background: 'linear-gradient(90deg, #6C5CE7, #0984E3)', color: '#fff' }
                          : {
                              backgroundColor: 'var(--sc-surface-muted)',
                              border: '1px solid var(--sc-border)',
                              color: 'var(--sc-text-muted)',
                            }
                      }
                    >
                      {following[u.id] ? 'Following' : 'Follow'}
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Trending */}
            <div className="flex justify-between items-center mb-4 mt-6">
              <h3 className="text-lg font-bold" style={{ color: 'var(--sc-text)' }}>Trending Topics</h3>
              <button
                className={`text-sm font-semibold flex items-center gap-1 hover:underline ${refreshing ? 'opacity-50' : ''}`}
                style={{ color: '#6C5CE7' }}
                onClick={handleRefresh}
                disabled={refreshing}
              >
                {refreshing ? (
                  <>
                    <TrendingUp size={14} className="animate-pulse" />
                    Refreshing…
                  </>
                ) : (
                  'Refresh'
                )}
              </button>
            </div>
            <div className="space-y-3" key={trendingVersion}>
              {trending.map((t, idx) => (
                <button
                  key={`${t.id}-${trendingVersion}-${idx}`}
                  onClick={() => {
                    setQuery(t.label.replace('#', ''))
                    showToast(`Searching ${t.label}…`, 'info')
                  }}
                  className="w-full flex items-center justify-between rounded-2xl p-4 shadow-sm active:scale-[0.98] transition"
                  style={{ backgroundColor: 'var(--sc-surface)' }}
                >
                  <div className="text-left">
                    <p className="text-[15px] font-bold" style={{ color: 'var(--sc-text)' }}>{t.label}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--sc-text-muted)' }}>{t.count}</p>
                  </div>
                  <TrendingUp size={18} color="#6C5CE7" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
