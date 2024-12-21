'use client';

import { useRecoilState } from 'recoil';
import { settingsState } from '@/app/recoil/atoms/settings';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export function NotificationSettings() {
  const [settings, setSettings] = useRecoilState(settingsState);

  const toggleNotification = (key: keyof typeof settings.notifications) => {
    setSettings({
      ...settings,
      notifications: {
        ...settings.notifications,
        [key]: !settings.notifications[key],
      },
    });
    
    toast.success(`${key} notifications ${!settings.notifications[key] ? 'enabled' : 'disabled'}`);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Notifications</h3>
      <div className="space-y-4">
        {[
          {
            key: 'push' as const,
            title: 'Push Notifications',
            description: 'Receive notifications on your device',
          },
          {
            key: 'email' as const,
            title: 'Email Notifications',
            description: 'Receive updates via email',
          },
          {
            key: 'sound' as const,
            title: 'Sound',
            description: 'Play sound for notifications',
          },
        ].map(({ key, title, description }) => (
          <div key={key} className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>{title}</Label>
              <p className="text-sm text-muted-foreground">
                {description}
              </p>
            </div>
            <Switch
              checked={settings.notifications[key]}
              onCheckedChange={() => toggleNotification(key)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}