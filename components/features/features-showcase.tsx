import Link from "next/link";
import {
  ArrowRight,
  Brain,
  Flower2,
  History,
  LineChart,
  MessageSquareText,
  Waves,
  Wind,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: MessageSquareText,
    title: "Supportive conversations",
    description:
      "Send a message and receive an AI-generated response intended to support everyday reflection.",
  },
  {
    icon: Brain,
    title: "Mood tracking",
    description:
      "Record a mood on a 0–100 scale and review saved check-ins and period summaries.",
  },
  {
    icon: History,
    title: "Conversation history",
    description:
      "Return to saved chat sessions and review the messages in each conversation.",
  },
  {
    icon: LineChart,
    title: "Emotional insights",
    description:
      "The dashboard surfaces simple patterns from recent check-ins and activities. They are prompts for reflection, not clinical assessments.",
  },
  {
    icon: Flower2,
    title: "Wellness activities",
    description:
      "Log activities and see them alongside mood check-ins in your dashboard.",
  },
  {
    icon: Waves,
    title: "Relaxation experiences",
    description:
      "Try guided breathing, Zen Garden, Mindful Forest, or Ocean Waves from the dashboard.",
  },
];

export function FeaturesHero() {
  return (
    <section className="border-b border-border/70 bg-[radial-gradient(ellipse_at_top_left,_rgba(46,102,220,0.15),_transparent_42%)]">
      <div className="mx-auto max-w-6xl px-4 pb-14 pt-28 sm:pb-20 sm:pt-36">
        <p className="mb-5 text-sm font-medium text-primary">SerenAI tools</p>
        <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-6xl">
          Small tools for a more mindful moment.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
          Explore the conversation, tracking, and relaxation features currently
          available in the app.
        </p>
      </div>
    </section>
  );
}

export function FeatureCard({ icon: Icon, title, description }: Feature) {
  return (
    <Card className="group h-full border-border/80 bg-card/65 shadow-none transition-colors duration-200 hover:border-primary/35 hover:bg-card">
      <CardContent className="p-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <h2 className="mt-6 text-lg font-semibold tracking-tight">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

export function FeatureGrid() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
      <div className="mt-8 flex items-center gap-3 border-t border-border pt-5 text-xs leading-5 text-muted-foreground">
        <Wind className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
        <span>
          AI-generated support is not professional or emergency care. Responses
          may be inaccurate.
        </span>
      </div>
    </section>
  );
}

export function FeaturesCTA() {
  return (
    <section className="border-t border-border/70 bg-card/35">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-12 sm:flex-row sm:items-center sm:py-14">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            Find the right place to begin.
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Create an account to explore the dashboard and its tools.
          </p>
        </div>
        <Button asChild>
          <Link href="/signup">
            Create an account <ArrowRight aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </section>
  );
}