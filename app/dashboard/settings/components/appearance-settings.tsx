'use client';

import { useTheme } from 'next-themes';
import { useRecoilState } from 'recoil';
import { settingsState } from '@/app/recoil/atoms/settings';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export function AppearanceSettings() {
  const { setTheme } = useTheme();
  const [settings, setSettings] = useRecoilState(settingsState);

  const toggleDarkMode = () => {
    const newTheme = settings.appearance.theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    setSettings({
      ...settings,
      appearance: {
        ...settings.appearance,
        theme: newTheme,
      },
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Appearance</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Dark Mode</Label>
            <p className="text-sm text-muted-foreground">
              Switch between light and dark themes
            </p>
          </div>
          <Switch
            checked={settings.appearance.theme === 'dark'}
            onCheckedChange={toggleDarkMode}
          />
        </div>
      </div>
    </div>
  );
}