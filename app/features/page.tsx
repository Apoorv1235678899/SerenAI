import type { Metadata } from "next";
import {
  FeatureGrid,
  FeaturesCTA,
  FeaturesHero,
} from "@/components/features/features-showcase";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Explore SerenAI's AI conversations, mood tracking, conversation history, dashboard insights, activities, and relaxation experiences.",
};

export default function FeaturesPage() {
  return (
    <>
      <FeaturesHero />
      <FeatureGrid />
      <FeaturesCTA />
    </>
  );
}