import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { useUserStoreType } from './type'

const initialState = {
  user: null,
}

export const useUserStore = create<useUserStoreType>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        setUser: (payload) => {
          set((state) => ({
            ...state,
            user: payload,
          }))
        },
      }),
      {
        name: 'userStore',
      }
    )
  )
)
