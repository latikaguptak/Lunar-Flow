'use client';

import { useRecoilState } from 'recoil';
import { settingsState } from '@/app/recoil/atoms/settings';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export function PrivacySettings() {
  const [settings, setSettings] = useRecoilState(settingsState);

  const togglePrivacy = (key: keyof typeof settings.privacy) => {
    setSettings({
      ...settings,
      privacy: {
        ...settings.privacy,
        [key]: !settings.privacy[key],
      },
    });
    
    toast.success(`${key} ${!settings.privacy[key] ? 'enabled' : 'disabled'}`);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Privacy</h3>
      <div className="space-y-4">
        {[
          {
            key: 'dataSharing' as const,
            title: 'Data Sharing',
            description: 'Share anonymous data to improve the app',
          },
          {
            key: 'activityStatus' as const,
            title: 'Activity Status',
            description: "Show when you're active in the app",
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
              checked={settings.privacy[key]}
              onCheckedChange={() => togglePrivacy(key)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}