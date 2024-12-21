import { atom } from 'recoil';

export interface Settings {
  appearance: {
    theme: 'light' | 'dark' | 'system';
  };
  notifications: {
    push: boolean;
    email: boolean;
    sound: boolean;
  };
  privacy: {
    dataSharing: boolean;
    activityStatus: boolean;
  };
}

const getInitialState = (): Settings => {
  if (typeof window === 'undefined') {
    return {
      appearance: {
        theme: 'system',
      },
      notifications: {
        push: true,
        email: true,
        sound: true,
      },
      privacy: {
        dataSharing: false,
        activityStatus: true,
      },
    };
  }

  const stored = localStorage.getItem('userSettings');
  if (!stored) {
    return {
      appearance: {
        theme: 'system',
      },
      notifications: {
        push: true,
        email: true,
        sound: true,
      },
      privacy: {
        dataSharing: false,
        activityStatus: true,
      },
    };
  }

  return JSON.parse(stored);
};

export const settingsState = atom<Settings>({
  key: 'settingsState',
  default: getInitialState(),
  effects: [
    ({ onSet }) => {
      onSet((newSettings) => {
        if (typeof window === 'undefined') return;
        localStorage.setItem('userSettings', JSON.stringify(newSettings));
      });
    },
  ],
});