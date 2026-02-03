// app/about/components/AboutSection.tsx
"use client";

import Image from "next/image";
import React from "react";

interface KnowItem {
  id: number;
  title: string;
  description: { type: string; children: { type: string; text: string }[] }[];
  position: string | number;
  image?: string; // we normalized to full url string in AboutContent
}

interface NestedSection {
  slug: string;
  title: string;
  content: string | string[];
  image?: string;
  position?: string | number;
}

interface SectionProps {
  section: {
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
  KnowAboutUs?: KnowItem[];
}

export default function AboutSection({ section, KnowAboutUs }: SectionProps) {
  // helper to convert Strapi rich text blocks → plain text with paragraphs
  const richToText = (
    blocks?: { type: string; children: { type: string; text: string }[] }[]
  ) => {
    if (!Array.isArray(blocks)) return "";
    return blocks
      .map((b) => (b.children ? b.children.map((c) => c.text).join("") : ""))
      .join("\n\n");
  };

  return (
    <section
      id={section.slug}
      className="scroll-mt-28 overflow-hidden px-4 sm:px-6 md:px-8 py-8 justify-start"
    >
      {/* MAIN – OUR JOURNEY */}
      {section.slug === "our-journey" ? (
        <div className="relative flex flex-col md:flex-row items-center md:items-start md:gap-8 lg:gap-12">
          {/* TEXT */}
          <div className="w-full md:w-1/2 bg-white p-6 sm:p-8 md:p-12 shadow-2xl z-10 relative hover:scale-105 transition-transform duration-300">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-800 animate-slideUp playfair text-gradient">
              {section.title}
            </h2>

            <p className="text-gray-700 whitespace-pre-line">{section.content}</p>
          </div>

          {/* IMAGE */}
          {section.banner?.image && (
            <div className="w-full md:w-1/2 mt-6 md:mt-0 relative md:-top-8 md:-ml-8 lg:-ml-16 overflow-hidden shadow-2xl flex-shrink-0 hover:scale-105 transition-transform duration-500 h-64 sm:h-80 md:h-[350px] lg:h-[380px]">
              <Image
                src={section.banner.image}
                alt={section.title}
                className="object-cover"
                priority
                fill
              />
            </div>
          )}
        </div>
      ) : (
        <>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            {section.title}
          </h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {section.content}
          </p>
        </>
      )}

      {/* --------------------------------------------------
      KNOW ABOUT US — OVERLAP DESIGN LIKE “OUR JOURNEY” ZIG-ZAG
      -------------------------------------------------- */}
      {KnowAboutUs && KnowAboutUs.length > 0 && (
        <div className="mt-20 space-y-24">
          {KnowAboutUs.sort((a, b) => Number(a.position) - Number(b.position)).map(
            (item, index) => {
              const descriptionText = richToText(item.description as any);

              let flexClass = "md:flex-row"; // default: image left, text right

              if (index > 0) {
                // Zig-zag for items after the first one
                flexClass = index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse";
              }

              return (
                <div
                  key={item.id}
                  className={`relative flex flex-col ${flexClass} items-center md:items-start gap-0 mb-20`}
                >
                  {/* IMAGE */}
                  {item.image && (
                    <div className="w-full md:w-1/2 relative overflow-hidden shadow-2xl flex-shrink-0 hover:scale-105 transition-transform duration-500 h-64 sm:h-80 md:h-[350px] lg:h-[380px]">
                      <Image
                        src={item.image}
                        alt={item.title}
                        className="object-cover"
                        fill
                        priority
                      />
                    </div>
                  )}

                  {/* TEXT CARD */}
                  <div className="w-full md:w-1/2 bg-white p-6 sm:p-8 md:p-12 shadow-2xl z-10 relative -mt-16 hover:scale-105 transition-transform duration-300">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-800 animate-slideUp playfair text-gradient">
                      {item.title}
                    </h2>
                    <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                      {descriptionText}
                    </p>
                  </div>
                </div>
              );
            }
          )}
        </div>
      )}



      {/* --------------------------------------------------
              EXISTING NESTED SECTIONS BELOW
      -------------------------------------------------- */}
      {section.sections && (
        <div className="mt-12 py-8 sm:py-12 space-y-12 sm:space-y-16 justify-start">
          {/* MILESTONES */}
          {"milestones" in section.sections && (
            <div
              id={section.sections.milestones.slug}
              className="bg-white p-4 sm:p-8 border border-[#d2ab67] shadow-2xl hover:scale-105 transition-transform duration-500"
            >
              <h3 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-800 playfair text-gradient">
                {section.sections.milestones.title}
              </h3>

              {/* YEAR LIST */}
              <div className="space-y-4 sm:space-y-6">
                {Array.isArray(section.sections.milestones.content) &&
                  section.sections.milestones.content.map((item: string, idx: number) => {
                    const [year, ...rest] = item.split("–");

                    return (
                      <div
                        key={idx}
                        className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6 items-start"
                      >
                        <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 playfair text-gradient md:col-span-1">
                          {year.trim()}
                        </div>
                        <div className="md:col-span-3 text-gray-700 leading-relaxed">
                          {rest.join("–").trim()}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {/* GRID SECTIONS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {Object.values(section.sections)
              .filter((s: any) => !["milestones"].includes(s.slug))
              .sort((a: any, b: any) => (a.position || 0) - (b.position || 0))
              .map((sub: any) => (
                <div
                  key={sub.slug}
                  id={sub.slug}
                  className="relative flex flex-col hover:scale-105 transition-transform duration-500 h-full"
                >
                  {/* IMAGE */}
                  {sub.image && (
                    <div className="w-full relative h-48 sm:h-56 md:h-64 overflow-hidden flex-shrink-0">
                      <Image
                        src={sub.image}
                        alt={sub.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                        priority
                        fill
                      />
                    </div>
                  )}

                  {/* CONTENT BOX */}
                  <div className="w-full bg-white p-6 sm:p-8 md:p-10 relative z-10 -mt-6 sm:-mt-8 shadow-lg flex flex-col flex-grow">
                    <h4 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-gray-800 playfair text-gradient">
                      {sub.title}
                    </h4>

                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {Array.isArray(sub.content)
                        ? sub.content.join("\n\n")
                        : sub.content}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </section>
  );
}
