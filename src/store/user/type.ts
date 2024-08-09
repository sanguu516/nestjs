import { User } from '@/apis/authApis'

export type InitialStateType = {
  user: User | null
}

export interface SetInitialStateType {
  setUser: (user: User | null) => void
}
export interface useUserStoreType extends InitialStateType, SetInitialStateType {}
