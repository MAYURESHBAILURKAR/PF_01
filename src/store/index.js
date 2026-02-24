import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useThemeStore = create(
  persist(
    (set) => ({
      theme: 'dark',
      toggleTheme: () =>
        set((state) => {
          const newTheme = state.theme === 'dark' ? 'light' : 'dark'
          document.documentElement.setAttribute('data-theme', newTheme)
          return { theme: newTheme }
        }),
      setTheme: (theme) => {
        document.documentElement.setAttribute('data-theme', theme)
        set({ theme })
      },
    }),
    {
      name: 'portfolio-theme',
      onRehydrateStorage: () => (state) => {
        if (state?.theme) {
          document.documentElement.setAttribute('data-theme', state.theme)
        }
      },
    }
  )
)

export const useUIStore = create((set) => ({
  isMenuOpen: false,
  isPreloaderDone: false,
  setMenuOpen: (val) => set({ isMenuOpen: val }),
  setPreloaderDone: () => set({ isPreloaderDone: true }),
}))

export const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      login: (token, user) => set({ token, user, isAuthenticated: true }),
      logout: () => set({ token: null, user: null, isAuthenticated: false }),
    }),
    { name: 'portfolio-auth' }
  )
)
