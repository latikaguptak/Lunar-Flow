"use client";

import { motion } from "framer-motion";
import { 
  CalendarDays, 
  LineChart, 
  Bell, 
  Heart,
  Moon,
  Droplet
} from "lucide-react";

const features = [
  {
    icon: CalendarDays,
    title: "Smart Cycle Tracking",
    description: "Track your menstrual cycle with an intuitive calendar interface and get accurate predictions"
  },
  {
    icon: LineChart,
    title: "Health Insights",
    description: "Visualize your cycle patterns and receive personalized health recommendations"
  },
  {
    icon: Bell,
    title: "Mindful Reminders",
    description: "Set customized notifications for period tracking, medication, and self-care routines"
  },
  {
    icon: Heart,
    title: "Symptom Logging",
    description: "Record symptoms, moods, and energy levels to better understand your body"
  },
  {
    icon: Moon,
    title: "Sleep Analysis",
    description: "Track your sleep patterns throughout your cycle for optimal rest"
  },
  {
    icon: Droplet,
    title: "Flow Tracking",
    description: "Monitor your flow intensity and symptoms for comprehensive cycle awareness"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

export function LandingFeatures() {
  return (
    <section id="features" className="py-20 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12"
        >
          Features for Your <span className="text-primary">Wellness Journey</span>
        </motion.h2>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group p-6 rounded-2xl bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border/50 hover:border-primary/20"
            >
              <feature.icon className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}