import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export interface AuthStore {
  User: string;
  isLoggedIn: boolean;
}

const defaultAuthStore: AuthStore = {
  User: '',
  isLoggedIn: false,
};

export const authState = atomWithStorage<AuthStore>('auth', defaultAuthStore);
export const isUserLoggedIn = atom((get) => get(authState).isLoggedIn);
