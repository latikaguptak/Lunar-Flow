'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { AppearanceSettings } from './components/appearance-settings';
import { NotificationSettings } from './components/notification-settings';
import { PrivacySettings } from './components/privacy-settings';
import { AccountActions } from './components/account-actions';
import { useRecoilState } from 'recoil';
import { settingsState } from '@/app/recoil/atoms/settings';

export default function SettingsPage() {
  const [settings, setSettings] = useRecoilState(settingsState);

  const handleResetSettings = () => {
    setSettings({
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
    });
    toast.success('Settings reset to defaults');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8"
    >
      <div className="max-w-4xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>App Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <AppearanceSettings />
            <NotificationSettings />
            <PrivacySettings />
            <AccountActions />

            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={handleResetSettings}>
                Reset to Defaults
              </Button>
              <Button onClick={() => toast.success('Settings saved successfully')}>
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}