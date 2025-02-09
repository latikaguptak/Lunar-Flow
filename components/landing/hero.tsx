"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export function LandingHero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center gradient-bg overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/10" />
      
      <div className="container mx-auto px-4 pt-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-left"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Track Your Cycle
              <br />
              <span className="text-primary">With Mindfulness</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-xl text-muted-foreground mb-8 max-w-xl"
            >
              Lunar Flow helps you understand your menstrual cycle with intuitive tracking, 
              personalized insights, and mindful wellness features. Take control of your 
              health journey with our comprehensive cycle tracking solution.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/register">
                <Button size="lg" className="w-full sm:w-auto text-lg px-8 bg-primary hover:bg-primary/90">
                  Start Your Journey
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8">
                  Learn More
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 flex items-center gap-4 text-muted-foreground"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-background bg-primary/20"
                  />
                ))}
              </div>
              <p className="text-sm">Join thousands of women on their wellness journey</p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative"
          >
            <div className="relative w-full aspect-square">
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="absolute inset-0"
              >
                <img
                  src="./woman_meditation.jpg"
                  alt="Woman meditating"
                  className="w-full h-full object-contain"
                />
              </motion.div>
              
              {/* Floating Elements */}
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="absolute top-1/4 -left-8 w-16 h-16 bg-primary/20 rounded-full blur-xl"
              />
              <motion.div
                animate={{
                  rotate: [360, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="absolute bottom-1/4 -right-8 w-24 h-24 bg-secondary/30 rounded-full blur-xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}