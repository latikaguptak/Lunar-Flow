"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  LineChart, CalendarDays, Heart, User, 
  Moon, Settings, BookOpen, Coffee, 
  Bell, Sun, Droplet, Sparkles
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const menuItems = [
  { 
    icon: LineChart, 
    label: "Overview", 
    path: "/dashboard",
    description: "Track your cycle and wellness"
  },
  { 
    icon: CalendarDays, 
    label: "Calendar", 
    path: "/dashboard/calendar",
    description: "View and plan your cycle"
  },
  { 
    icon: Heart, 
    label: "Symptoms", 
    path: "/dashboard/symptoms",
    description: "Log and monitor symptoms"
  },
  { 
    icon: BookOpen, 
    label: "Journal", 
    path: "/dashboard/journal",
    description: "Record your daily experiences"
  },
  { 
    icon: Coffee, 
    label: "Lifestyle", 
    path: "/dashboard/lifestyle",
    description: "Track habits and activities"
  },
  { 
    icon: Moon, 
    label: "Sleep", 
    path: "/dashboard/sleep",
    description: "Monitor sleep patterns"
  },
  { 
    icon: User, 
    label: "Profile", 
    path: "/dashboard/profile",
    description: "Manage your account"
  },
  { 
    icon: Settings, 
    label: "Settings", 
    path: "/dashboard/settings",
    description: "Customize your experience"
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <motion.nav 
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border/50 shadow-sm p-6 overflow-y-auto"
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="relative">
          <Moon className="h-8 w-8 text-primary absolute animate-pulse" />
          <Sparkles className="h-8 w-8 text-primary/50" />
        </div>
        <div>
          <span className="text-xl font-bold">Luna Flow</span>
          <p className="text-xs text-muted-foreground">Track with mindfulness</p>
        </div>
      </div>

      <div className="space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link href={item.path} key={item.path}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 relative overflow-hidden group",
                  isActive && "bg-primary/10 hover:bg-primary/15"
                )}
              >
                <item.icon className={cn(
                  "h-5 w-5 transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground"
                )} />
                <div className="flex flex-col items-start">
                  <span className={cn(
                    "text-sm",
                    isActive ? "text-primary font-medium" : "text-foreground"
                  )}>{item.label}</span>
                  <span className="text-xs text-muted-foreground hidden group-hover:block">
                    {item.description}
                  </span>
                </div>
              </Button>
            </Link>
          );
        })}
      </div>

      <div className="absolute bottom-6 left-6 right-6">
        <div className="p-4 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/10">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium">Current Phase</p>
            <Droplet className="h-4 w-4 text-primary" />
          </div>
          <p className="text-primary text-lg font-semibold">Follicular Phase</p>
          <div className="flex items-center gap-2 mt-1">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <p className="text-xs text-muted-foreground">Day 7 of 28</p>
          </div>
          <div className="mt-3 pt-3 border-t border-primary/10">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Next Period</span>
              <span className="text-primary font-medium">in 21 days</span>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}