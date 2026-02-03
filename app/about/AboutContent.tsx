// app/about/AboutContent.tsx
"use client";

import { Suspense } from "react";
import PageBanner from "@/components/PageBanner";
import HashScroll from "@/components/HashScroll";
import AboutSection from "./components/AboutSection";

export default function AboutContent({ data }: { data: any }) {
  const bannerImage = data.pagebanner?.image?.url
    ? `http://localhost:1337${data.pagebanner.image.url}`
    : "/optimized/placeholder-large.webp";

  const commonSections = data.CommonSection || [];
  const milestoneData = data.KeyMilestonesOptions?.KeyMilestonesOptions || [];

  // ✅ Add OurJourney data
  const journeyData = data.OurJourney || {};

  // Map KnowAboutUs — normalize image urls and keep description array
  const knowAboutUs = (data.KnowAboutUs || []).map((item: any) => ({
    id: item.id,
    title: item.title,
    description: item.description, // keep rich blocks (we'll convert in component)
    position: item.position,
    image: item.image?.url ? `http://localhost:1337${item.image.url}` : undefined,
  }));

  const pageData: any = {
    slug: "our-journey",
    title: journeyData?.title || "Our Journey",
    content:
      journeyData?.description?.[0]?.children?.[0]?.text ||
      "Namakwala's journey began in 1945 in Bhilwara.",
    banner: {
      title: journeyData?.title,
      heading: journeyData?.title,
      image: journeyData?.image?.url
        ? `http://localhost:1337${journeyData.image.url}`
        : undefined,
    },
    sections: {
      milestones: {
        slug: "milestones",
        title: data.KeyMilestonesOptions?.title || "Key Milestones",
        content: milestoneData.map((item: any) => `${item.Year} – ${item.Key}`),
      },
      "our-vision": {
        slug: "our-vision",
        title: commonSections[0]?.title || "Our Vision",
        content:
          commonSections[0]?.description?.[0]?.children?.[0]?.text || "",
        image: commonSections[0]?.image?.url
          ? `http://localhost:1337${commonSections[0].image.url}`
          : undefined,
      },
      leadership: {
        slug: "leadership",
        title: commonSections[1]?.title || "Leadership",
        content:
          commonSections[1]?.description?.[0]?.children?.[0]?.text || "",
        image: commonSections[1]?.image?.url
          ? `http://localhost:1337${commonSections[1].image.url}`
          : undefined,
      },
      "founder-legacy": {
        slug: "founder-legacy",
        title: commonSections[2]?.title || "Founder’s Legacy",
        content:
          commonSections[2]?.description?.[0]?.children?.[0]?.text || "",
        image: commonSections[2]?.image?.url
          ? `http://localhost:1337${commonSections[2].image.url}`
          : undefined,
      },
    },
  };

  return (
    <section className="relative bg-[#d2ab67] poppins">
      {/* ✅ Top Banner */}
      <PageBanner
        title={data.pagebanner?.title || "About Us"}
        image={bannerImage}
        category={
          data.pagebanner?.heading ||
          "Learn about our journey, milestones, and leadership"
        }
      />

      <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
        <HashScroll />
      </Suspense>

      {/* ✅ Render Our Journey + Nested Sections */}
      <div className="container mx-auto py-12 space-y-16">
        {/* <-- pass KnowAboutUs prop here --> */}
        <AboutSection section={pageData} KnowAboutUs={knowAboutUs} />
      </div>
    </section>
  );
}
