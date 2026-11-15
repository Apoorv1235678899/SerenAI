import Link from "next/link";
import { ArrowRight, Eye, Heart, LockKeyhole, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";

const principles = [
  {
    icon: Heart,
    title: "Lead with empathy",
    description:
      "Make room for honest reflection without judgment or pressure to have everything figured out.",
  },
  {
    icon: Sprout,
    title: "Grow at your pace",
    description:
      "Small check-ins and simple activities can be useful ways to notice what is happening day to day.",
  },
  {
    icon: Eye,
    title: "Be clear about AI",
    description:
      "AI-generated responses can be imperfect. SerenAI is not a therapist, clinician, or emergency service.",
  },
  {
    icon: LockKeyhole,
    title: "Choose what to share",
    description:
      "Chat messages and recent conversation history are sent to Google Gemini, and sessions are stored in MongoDB.",
  },
];

export function AboutHero() {
  return (
    <section className="border-b border-border/70 bg-[radial-gradient(ellipse_at_top_right,_rgba(46,102,220,0.15),_transparent_42%)]">
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-28 sm:pb-24 sm:pt-36">
        <p className="mb-5 text-sm font-medium text-primary">About SerenAI</p>
        <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-6xl">
          A little more room to check in with yourself.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
          SerenAI brings supportive AI conversations, mood check-ins, and guided
          relaxation into one calm place for everyday reflection.
        </p>
      </div>
    </section>
  );
}

export function MissionSection() {
  return (
    <section className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:py-20 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
      <div>
        <p className="text-sm font-medium text-primary">Why we are here</p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
          Make everyday reflection easier to begin.
        </h2>
      </div>
      <div className="space-y-5 text-base leading-7 text-muted-foreground">
        <p>
          SerenAI is designed to offer a practical starting point: a place to
          put a feeling into words, record a mood, or step into a short
          relaxation experience.
        </p>
        <p>
          It is a wellness companion for reflection, not a source of diagnosis,
          treatment, or professional care. The goal is to support a thoughtful
          pause while keeping that boundary clear.
        </p>
      </div>
    </section>
  );
}

export function PhilosophySection() {
  return (
    <section className="border-y border-border/70 bg-card/35">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-primary">Our approach</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            Thoughtful by design, honest about its limits.
          </h2>
        </div>
        <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {principles.map(({ icon: Icon, title, description }) => (
            <article key={title} className="border-t border-border pt-5">
              <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
              <h3 className="mt-4 font-semibold text-foreground">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TechnologySection() {
  return (
    <section className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:py-20 md:grid-cols-2 md:gap-16">
      <div>
        <p className="text-sm font-medium text-primary">Technology & care</p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
          AI can help open a conversation. It cannot replace human care.
        </h2>
      </div>
      <div className="space-y-5 text-sm leading-6 text-muted-foreground">
        <p>
          SerenAI uses Google Gemini to generate replies from your message and
          recent chat history. Chat sessions are saved in the application&apos;s
          MongoDB database so they can appear in your conversation history.
        </p>
        <p>
          The application does not provide crisis monitoring or professional
          support. AI responses may be inaccurate. Please avoid sharing
          information you are not comfortable sending to these services, and
          seek qualified or emergency help when you need it.
        </p>
      </div>
    </section>
  );
}

export function AboutCTA() {
  return (
    <section className="border-t border-border/70 bg-card/35">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-12 sm:flex-row sm:items-center sm:py-14">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            Start with a simple check-in.
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Explore the tools currently available in SerenAI.
          </p>
        </div>
        <Button asChild>
          <Link href="/features">
            Explore features <ArrowRight aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </section>
  );
}