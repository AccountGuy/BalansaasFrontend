import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { UserData } from '../schemas'

interface AuthProps extends UserData {
  setUserData: (userData: UserData) => void
}

export const localStorageKey = 'balansaas.auth'

export const useLoginStore = create<AuthProps>()(persist(
  (set, _get) => ({
    email: null,
    token: null,
    name: null,
    setUserData: (userData: UserData) => { set({...userData}) }
  }),
  {
    name: localStorageKey,
    storage: createJSONStorage(() => localStorage)
  }
))

