'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useRecoilValue } from 'recoil';
import { authState } from '@/app/recoil/atoms/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function LandingNavbar() {
  const { theme, setTheme } = useTheme();
  const auth = useRecoilValue(authState);
  const router = useRouter();

  // Track if client is mounted to avoid SSR hydration mismatch
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Push to /dashboard if authenticated, but only after the client has mounted
  useEffect(() => {
    if (mounted && auth.isAuthenticated) {
      router.push('/dashboard');
    }
  }, [auth.isAuthenticated, mounted, router]);

  // If not yet mounted (still SSR) or already authenticated, return null
  // This prevents hydration mismatch by ensuring the server and client
  // initially render the same thing
  if (!mounted || auth.isAuthenticated) {
    return null;
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed w-full z-50 bg-primary/95 backdrop-blur-sm border-b border-primary/20"
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <MoonIcon className="h-8 w-8 text-white" />
          <span className="text-2xl font-bold text-white">Luna Flow</span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="#features"
            className="text-white/90 hover:text-white transition"
          >
            Features
          </Link>
          <Link
            href="#about"
            className="text-white/90 hover:text-white transition"
          >
            About
          </Link>
          <Link
            href="#contact"
            className="text-white/90 hover:text-white transition"
          >
            Contact
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-white hover:text-white hover:bg-primary-dark"
          >
            {/* Only render theme icon if mounted to avoid SSR mismatch */}
            {mounted && theme === 'dark' ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </Button>
          <Link href="/login">
            <Button
              variant="ghost"
              className="text-white hover:text-white hover:bg-primary-dark"
            >
              Log in
            </Button>
          </Link>
          <Link href="/register">
            <Button className="bg-white text-primary hover:bg-white/90">
              Sign up
            </Button>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
