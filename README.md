# DeveloperHubs-Task-01-Core-Features-and-Basic-Setups

## Social Connect — Web Preview

Interactive web preview of the Social Connect mobile app, rendered inside a phone frame in the browser. Built with Next.js 16 + TypeScript + Tailwind CSS.

> **Note:** This is the **preview** version (runs in browser). The actual mobile app is in `SocialConnectApp.zip` (React Native).

## Quick Start

```bash
# 1. Extract this ZIP
unzip SocialConnectWebPreview.zip
cd SocialConnectWebPreview

# 2. Install dependencies
npm install

# 3. Run dev server
npm run dev

# 4. Open browser
# http://localhost:3000
```

## What's Included

- **Login / Signup / Forgot Password** screens
- **Home feed** with posts, likes, share, quick actions
- **Discover/Search** with suggested users, trending topics, live search, See All + Refresh
- **Profile** screen with stats and menu
- **Edit Profile** with avatar upload (device/browser/camera) + gradient presets
- **Settings** with 14 toggle switches + **working Dark Mode**
- **Change Password** with current/new/confirm fields + strength meter

## Demo Login

Enter any email + any password → you're in.

## Tech Stack

- Next.js 16 (App Router)
- TypeScript 5
- Tailwind CSS 4
- lucide-react icons
- React Context for state

## Project Structure

```
src/
├── app/
│   ├── globals.css         # Tailwind + dark mode CSS vars
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Phone frame + AppShell
└── components/
    └── social/
        ├── app-context.tsx         # Global state
        ├── app-shell.tsx           # Screen router
        ├── bottom-tabs.tsx         # Tab navigator
        ├── toast.tsx               # Toast notifications
        ├── ui/
        │   ├── avatar.tsx
        │   ├── button.tsx
        │   ├── card.tsx
        │   ├── header.tsx
        │   └── input.tsx
        └── screens/
            ├── login-screen.tsx
            ├── signup-screen.tsx
            ├── forgot-password-screen.tsx
            ├── home-screen.tsx
            ├── search-screen.tsx
            ├── profile-screen.tsx
            ├── profile-edit-screen.tsx
            ├── settings-screen.tsx
            └── change-password-screen.tsx
```

## Troubleshooting

**Port already in use?**
```bash
npx kill-port 3000
npm run dev
```

**Node version too old?**
Need Node 18+. Check with `node --version`.

**Tailwind not applying?**
Run `npm run build` once to regenerate CSS, then `npm run dev` again.

