'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  CalendarDays, 
  LineChart, 
  Heart, 
  Moon, 
  BookOpen, 
  Coffee,
  Bell,
  Settings,
  User
} from 'lucide-react';

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background p-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Introduction */}
        <section>
          <h1 className="text-4xl font-bold mb-4">Lunar Flow Documentation</h1>
          <p className="text-lg text-muted-foreground mb-8">
            A comprehensive guide to using Lunar Flow for menstrual cycle tracking and wellness management.
          </p>
          <Separator className="my-8" />
        </section>

        {/* Getting Started */}
        <section className="space-y-4">
          <h2 className="text-3xl font-bold">Getting Started</h2>
          <Card>
            <CardContent className="pt-6">
              <p className="mb-4">
                Lunar Flow is a comprehensive menstrual cycle tracking application designed to help you understand and monitor your menstrual health. Here's what you need to know to get started:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Create an account using your email</li>
                <li>Complete your profile with basic cycle information</li>
                <li>Start tracking your cycle from the dashboard</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Core Features */}
        <section className="space-y-4">
          <h2 className="text-3xl font-bold">Core Features</h2>
          
          {/* Dashboard */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="h-6 w-6 text-primary" />
                Dashboard Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">The dashboard provides a comprehensive view of your cycle health:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Current cycle phase visualization</li>
                <li>Upcoming important dates</li>
                <li>Health metrics tracking</li>
                <li>Mood and symptom trends</li>
              </ul>
            </CardContent>
          </Card>

          {/* Calendar */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="h-6 w-6 text-primary" />
                Calendar Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">The calendar module offers comprehensive cycle tracking:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Visual cycle phase indicators</li>
                <li>Period tracking and predictions</li>
                <li>Fertile window calculations</li>
                <li>Ovulation day tracking</li>
                <li>Daily log entries</li>
              </ul>
            </CardContent>
          </Card>

          {/* Symptoms */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-6 w-6 text-primary" />
                Symptom Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Comprehensive symptom monitoring system:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Physical symptom logging (cramps, headaches, etc.)</li>
                <li>Emotional symptom tracking</li>
                <li>Symptom severity levels</li>
                <li>Historical symptom patterns</li>
                <li>Custom notes and observations</li>
              </ul>
            </CardContent>
          </Card>

          {/* Journal */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-primary" />
                Journal Entries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Personal journal for tracking your wellness journey:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Daily mood tracking</li>
                <li>Detailed journal entries</li>
                <li>Customizable tags</li>
                <li>Mood pattern analysis</li>
                <li>Private and secure entries</li>
              </ul>
            </CardContent>
          </Card>

          {/* Lifestyle */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Coffee className="h-6 w-6 text-primary" />
                Lifestyle Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Monitor daily wellness activities:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Water intake tracking</li>
                <li>Exercise logging</li>
                <li>Sleep quality monitoring</li>
                <li>Nutrition tracking</li>
                <li>Personalized recommendations</li>
              </ul>
            </CardContent>
          </Card>

          {/* Sleep */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Moon className="h-6 w-6 text-primary" />
                Sleep Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Comprehensive sleep monitoring features:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Sleep duration logging</li>
                <li>Sleep quality assessment</li>
                <li>Sleep pattern analysis</li>
                <li>Cycle phase correlation</li>
                <li>Sleep improvement tips</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Additional Features */}
        <section className="space-y-4">
          <h2 className="text-3xl font-bold">Additional Features</h2>

          {/* Notifications */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-6 w-6 text-primary" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Stay informed with customizable notifications:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Period predictions and reminders</li>
                <li>Fertile window alerts</li>
                <li>Medication reminders</li>
                <li>Custom notification settings</li>
              </ul>
            </CardContent>
          </Card>

          {/* Settings */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-6 w-6 text-primary" />
                Customization
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Personalize your Lunar Flow experience:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Theme customization (Light/Dark mode)</li>
                <li>Notification preferences</li>
                <li>Privacy settings</li>
                <li>Data export options</li>
                <li>Account management</li>
              </ul>
            </CardContent>
          </Card>

          {/* Profile */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-6 w-6 text-primary" />
                Profile Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Manage your personal information:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Personal details management</li>
                <li>Cycle information updates</li>
                <li>Password and security settings</li>
                <li>Connected devices</li>
                <li>Data privacy controls</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Privacy & Security */}
        <section className="space-y-4">
          <h2 className="text-3xl font-bold">Privacy & Security</h2>
          <Card>
            <CardContent className="pt-6">
              <p className="mb-4">Lunar Flow takes your privacy seriously:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>End-to-end encryption for all personal data</li>
                <li>Strict data protection policies</li>
                <li>Optional data sharing controls</li>
                <li>Regular security updates</li>
                <li>Transparent data usage policies</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Support */}
        <section className="space-y-4">
          <h2 className="text-3xl font-bold">Support</h2>
          <Card>
            <CardContent className="pt-6">
              <p className="mb-4">Get help when you need it:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>24/7 customer support</li>
                <li>Comprehensive FAQ section</li>
                <li>Video tutorials</li>
                <li>Community forums</li>
                <li>Email support</li>
              </ul>
            </CardContent>
          </Card>
        </section>
      </motion.div>
    </div>
  );
}