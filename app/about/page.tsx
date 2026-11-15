import type { Metadata } from "next";
import {
  AboutCTA,
  AboutHero,
  MissionSection,
  PhilosophySection,
  TechnologySection,
} from "@/components/about/about-sections";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about SerenAI's approach to everyday reflection, mood check-ins, and guided relaxation.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <MissionSection />
      <PhilosophySection />
      <TechnologySection />
      <AboutCTA />
    </>
  );
}