'use client'

import { useApp } from './app-context'
import { LoginScreen } from './screens/login-screen'
import { SignupScreen } from './screens/signup-screen'
import { ForgotPasswordScreen } from './screens/forgot-password-screen'
import { HomeScreen } from './screens/home-screen'
import { SearchScreen } from './screens/search-screen'
import { ProfileScreen } from './screens/profile-screen'
import { SettingsScreen } from './screens/settings-screen'
import { ProfileEditScreen } from './screens/profile-edit-screen'
import { ChangePasswordScreen } from './screens/change-password-screen'
import { BottomTabs } from './bottom-tabs'

export function AppShell() {
  const { screen, user, prefs } = useApp()

  // Auth flow
  if (!user || screen === 'login') {
    return (
      <div className={`h-full overflow-y-auto ${prefs.darkMode ? 'dark' : ''}`}>
        {screen === 'signup' ? <SignupScreen /> :
         screen === 'forgot' ? <ForgotPasswordScreen /> :
         <LoginScreen />}
      </div>
    )
  }

  // Modal-style overlays
  if (screen === 'profileEdit') {
    return (
      <div className={`h-full overflow-y-auto ${prefs.darkMode ? 'dark' : ''}`}>
        <ProfileEditScreen />
      </div>
    )
  }

  if (screen === 'changePassword') {
    return (
      <div className={`h-full overflow-y-auto ${prefs.darkMode ? 'dark' : ''}`}>
        <ChangePasswordScreen />
      </div>
    )
  }

  // Main tabs
  return (
    <div className={`h-full flex flex-col ${prefs.darkMode ? 'dark' : ''}`}>
      <div className="flex-1 overflow-y-auto">
        {screen === 'home' && <HomeScreen />}
        {screen === 'search' && <SearchScreen />}
        {screen === 'profile' && <ProfileScreen />}
        {screen === 'settings' && <SettingsScreen />}
      </div>
      <BottomTabs />
    </div>
  )
}
