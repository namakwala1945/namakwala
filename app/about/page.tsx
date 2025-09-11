"use client";

import { Suspense } from "react";
import content from "@/locales/en/content.json";
import PageBanner from "@/components/PageBanner";
import HashScroll from "@/components/HashScroll";
import AboutSection from "./components/AboutSection";
import { notFound } from "next/navigation";

// ----------------------
// TypeScript Types
// ----------------------
type NestedSection = {
  slug: string;
  title: string;
  content: string | string[];
  image?: string;
};

type AboutSectionType = {
  slug: string;
  title: string;
  content: string;
  banner?: {
    title: string;
    heading: string;
    image: string;
  };
  sections?: Record<string, NestedSection>;
};

type AboutData = Record<string, AboutSectionType>;

// ----------------------
// About Page Component
// ----------------------
function AboutContent() {
  const aboutData: AboutData = content.about as AboutData;
  if (!aboutData) return notFound();

  const firstKey = Object.keys(aboutData)[0];
  const topBanner = aboutData[firstKey]?.banner ?? {
    title: "About Us",
    heading: "Learn about our journey, milestones, and leadership",
    image: "/assets/placeholder.jpg",
  };

  return (
    <section className="relative bg-[#d2ab67] poppins">
      {/* Top Banner */}
      <PageBanner
        title={topBanner.title}
        image={topBanner.image}
        category={topBanner.heading}
      />

      {/* Enable #id scrolling */}
      <HashScroll />

      <div className="container mx-auto py-12 space-y-16">
        {Object.entries(aboutData).map(([sectionKey, section]) => (
          <AboutSection key={sectionKey} section={section} />
        ))}
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <Suspense fallback={<div>Loading about page...</div>}>
      <AboutContent />
    </Suspense>
  );
}
