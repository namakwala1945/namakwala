"use client";

import content from "../../locales/en/content.json";
import PageBanner from "@/components/PageBanner";
import Image from "next/image";

interface Section {
  heading: string;
  text: string | string[];
  image?: string;
}

interface ExportTerms {
  title: string;
  description: string;
  banner: {
    title: string;
    heading: string;
    image: string;
  };
  sections: Section[];
  metadata: any;
}

export default function ExportTermsPage() {
  const page: ExportTerms = content["export-terms"];

  return (
    <section className="relative">
      {/* Banner */}
      <PageBanner
        title={page.banner.title}
        image={page.banner.image}
        category={page.banner.heading}
      />

      {/* Main Content */}
      <div className="container mx-auto px-6 py-20 space-y-32">
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <h1 className="text-5xl font-extrabold text-gray-900">
            {page.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-800">{page.description}</p>
        </div>

        {/* Sections */}
        {page.sections.map((section, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div
              key={idx}
              className={`relative flex flex-col md:flex-row items-center md:items-start md:gap-12 ${
                isEven ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Text Card */}
              <div className="md:w-1/2 bg-white/70 backdrop-blur-md p-8 rounded-3xl shadow-2xl z-10 relative border border-white/30">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
                  {section.heading}
                </h2>
                {Array.isArray(section.text) ? (
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    {section.text.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-700 whitespace-pre-line">
                    {section.text}
                  </p>
                )}
              </div>

              {/* Image */}
              {section.image && (
                <div
                  className={`md:w-1/2 mt-8 md:mt-0 relative md:-top-10 overflow-hidden rounded-3xl shadow-2xl flex-shrink-0 ${
                    isEven ? "md:-ml-20" : "md:-mr-20"
                  }`}
                  style={{ minHeight: "300px" }}
                >
                  <Image
                    src={section.image}
                    alt={section.heading}
                    fill
                    className="object-cover rounded-3xl"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
