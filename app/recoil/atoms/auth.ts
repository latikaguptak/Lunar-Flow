import { atom } from 'recoil';

export interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: string;
    email: string;
    name: string;
  } | null;
}

const getInitialState = (): AuthState => {
  if (typeof window === 'undefined') {
    return {
      isAuthenticated: false,
      user: null,
    };
  }

  const stored = localStorage.getItem('authState');
  if (!stored) {
    return {
      isAuthenticated: false,
      user: null,
    };
  }

  return JSON.parse(stored);
};

export const authState = atom<AuthState>({
  key: 'authState',
  default: getInitialState(),
  effects: [
    ({ onSet }) => {
      onSet((newState) => {
        if (typeof window === 'undefined') return;
        localStorage.setItem('authState', JSON.stringify(newState));
      });
    },
  ],
});