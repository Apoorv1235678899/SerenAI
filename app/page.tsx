"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Brain,
  Shield,
  MessageCircle,
  Sparkles,
  LineChart,
  Waves,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import React from "react";

export default function Home() {
  const emotions = [
    { value: 0, label: "😔 Down" },
    { value: 25, label: "😊 Content" },
    { value: 50, label: "😌 Peaceful" },
    { value: 75, label: "🤗 Happy" },
    { value: 100, label: "✨ Excited" },
  ];

  const [emotion, setEmotion] = useState(50);
  const [mounted, setMounted] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const welcomeSteps = [
    {
      title: "Welcome to SerenAI",
      description:
        "SerenAI offers AI-generated conversation for everyday reflection. It is not a therapist, clinician, or emergency service.",
      icon: Waves,
    },
    {
      title: "Check in, your way",
      description:
        "Record a mood, revisit conversations, or explore guided breathing, garden, forest, and ocean-wave experiences.",
      icon: Brain,
    },
    {
      title: "Before you share",
      description:
        "Messages and recent chat history are sent to Google Gemini to generate replies, and sessions are stored in MongoDB. Share only what you are comfortable sending.",
      icon: Shield,
    },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  const features = [
    {
      icon: MessageCircle,
      title: "Supportive conversations",
      description: "A place to put thoughts into words and receive an AI-generated reply",
      color: "from-blue-500/20",
      delay: 0.2,
    },
    {
      icon: LineChart,
      title: "Mood check-ins",
      description: "Record a mood score and review saved check-ins and summaries",
      color: "from-cyan-500/20",
      delay: 0.4,
    },
    {
      icon: Brain,
      title: "Conversation history",
      description: "Return to saved sessions and review messages from each conversation",
      color: "from-violet-500/20",
      delay: 0.6,
    },
    {
      icon: Waves,
      title: "Guided relaxation",
      description: "Explore breathing, Zen Garden, Mindful Forest, and Ocean Waves",
      color: "from-teal-500/20",
      delay: 0.8,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative mt-16 flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center overflow-hidden px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 space-y-8 text-center"
        >
          {/* Enhanced badge with subtle animation */}
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-sm text-muted-foreground">
            <Waves className="h-4 w-4 text-primary" aria-hidden="true" />
            <span>
              A space for everyday reflection
            </span>
          </div>

          {/* Enhanced main heading with smoother gradient */}
          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            <span className="text-primary">
              SerenAI,
            </span>
            <br />
            <span className="mt-2 inline-block text-foreground">
              for a mindful moment.
            </span>
          </h1>

          {/* Enhanced description with better readability */}
          <p className="mx-auto max-w-[600px] text-base leading-relaxed text-muted-foreground sm:text-lg">
            Make room to notice how you&apos;re feeling, explore what&apos;s on your mind,
            or try a guided reset.
          </p>

          {/* Emotion slider section with enhanced transitions */}
          <motion.div
            className="w-full max-w-[600px] mx-auto space-y-6 py-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="space-y-2 text-center">
              <p className="text-sm font-medium text-muted-foreground">
                Start with a quick mood check-in
              </p>
              <div className="flex justify-between items-center px-2">
                {emotions.map((em) => (
                  <button
                    key={em.value}
                    type="button"
                    aria-pressed={Math.abs(emotion - em.value) < 15}
                    className={`transition-all duration-300 ${
                      Math.abs(emotion - em.value) < 15
                        ? "opacity-100 scale-110 transform-gpu"
                        : "opacity-50 scale-100"
                    }`}
                    onClick={() => setEmotion(em.value)}
                  >
                    <span className="block text-2xl">
                      {em.label.split(" ")[0]}
                    </span>
                    <span className="mt-1 block text-xs font-medium text-muted-foreground">
                      {em.label.split(" ")[1]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Enhanced slider with dynamic gradient */}
            <div className="relative px-2">
              <div
                className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500/25 via-blue-500/10 to-transparent blur-2xl"
              />
              <Slider
                aria-label="Mood check-in score"
                value={[emotion]}
                onValueChange={(value) => setEmotion(value[0])}
                min={0}
                max={100}
                step={1}
                className="py-4"
              />
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Move the slider to explore the mood scale
              </p>
            </div>
          </motion.div>

          {/* Enhanced CTA button and welcome dialog */}
          <motion.div
            className="flex flex-col items-center justify-center gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <Button
              size="lg"
              onClick={() => setShowDialog(true)}
              className="h-12 px-7 shadow-lg shadow-primary/15 transition-transform hover:-translate-y-0.5"
            >
              <span className="flex items-center gap-2 font-medium">
                Take a look around
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </Button>
            <Button asChild size="lg" variant="ghost" className="h-12 px-6">
              <Link href="/features">Explore features</Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Enhanced scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-primary/20 flex items-start justify-center p-1 hover:border-primary/40 transition-colors duration-300">
            <div className="w-1 h-2 rounded-full bg-primary animate-scroll" />
          </div>
        </motion.div>
      </section>

      {/* Enhanced Features Grid */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" /> */}

        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-16 space-y-4 text-white ">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              A few ways to begin
            </h2>
            <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg">
              Tools for reflection, tracking, and a quieter pause.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: feature.delay, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Card className="group relative h-full min-h-[190px] overflow-hidden border-border/80 bg-card/65 shadow-none transition-colors duration-200 hover:border-primary/35 hover:bg-card">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500 dark:group-hover:opacity-30`}
                  />
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-primary/10 dark:bg-primary/20 group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors duration-300">
                        <feature.icon className="w-5 h-5 text-primary dark:text-primary/90" />
                      </div>
                      <h3 className="font-semibold tracking-tight text-foreground/90 dark:text-foreground">
                        {feature.title}
                      </h3>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground/90 dark:text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/20 dark:via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[425px] bg-card/80 backdrop-blur-lg">
          <DialogHeader>
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                {welcomeSteps[currentStep] && (
                  <div>
                    {React.createElement(welcomeSteps[currentStep].icon, {
                      className: "w-8 h-8 text-primary",
                    })}
                  </div>
                )}
              </div>
              <DialogTitle className="text-2xl text-center">
                {welcomeSteps[currentStep]?.title}
              </DialogTitle>
              <DialogDescription className="text-center text-base leading-relaxed">
                {welcomeSteps[currentStep]?.description}
              </DialogDescription>
            </motion.div>
          </DialogHeader>
          <div className="flex justify-between items-center mt-8">
            <div className="flex gap-2">
              {welcomeSteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentStep ? "bg-primary w-4" : "bg-primary/20"
                  }`}
                />
              ))}
            </div>
            <Button
              onClick={() => {
                if (currentStep < welcomeSteps.length - 1) {
                  setCurrentStep((c) => c + 1);
                } else {
                  setShowDialog(false);
                  setCurrentStep(0);
                  
                }
              }}
              className="relative group px-6"
            >
              <span className="flex items-center gap-2">
                {currentStep === welcomeSteps.length - 1 ? (
                  <>
                    Let&apos;s Begin
                    <Sparkles className="w-4 h-4 animate-pulse" />
                  </>
                ) : (
                  <>
                    Next
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add custom animations to globals.css */}
    </div>
  );
}