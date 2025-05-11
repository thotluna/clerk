'use client'

import { useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { useUserStore } from '@/lib/store/userStore'

export function UserStoreSync() {
  const { user, isSignedIn } = useUser()
  const setUserData = useUserStore((state) => state.setUserData)
  const clearUserData = useUserStore((state) => state.clearUserData)

  useEffect(() => {
    if (isSignedIn && user) {
      setUserData(user.id, null)
    } else {
      clearUserData()
    }
  }, [user, isSignedIn, setUserData, clearUserData])

  return null
}
