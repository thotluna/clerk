import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware' // Import persist

interface UserState {
  userId: string | null
  owner: string | null
  setUserData: (userId: string, owner: string | null) => void
  setUserId: (userId: string) => void
  setOwner: (owner: string | null) => void
  clearUserData: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userId: null,
      owner: null,
      setUserData: (userId, owner) => set({ userId, owner }),
      setUserId: (userId: string) => set({ userId }),
      setOwner: (owner) => set({ owner }),
      clearUserData: () => set({ userId: null, owner: null }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
