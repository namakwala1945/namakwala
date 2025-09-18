"use client";
import content from "../../locales/en/content.json";
import PageBanner from "@/components/PageBanner";
import Image from "next/image";

interface Section {
  heading: string;
  text: string | string[];
  image?: string;
}

interface TermsOfService {
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

export default function TermsOfServicePage() {
  const page: TermsOfService = content["terms-of-service"];

  return (
    <section className="relative poppins">
      {/* Banner */}
      <PageBanner
        title={page.banner.title}
        image={page.banner.image}
        category={page.banner.heading}
      />

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16 space-y-20">
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="text-4xl md:text-5xl playfair text-gradient font-extrabold animate-slideUp">
            {page.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-700">{page.description}</p>
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
              <div className="md:w-1/2 bg-white p-8 md:p-12 shadow-2xl z-10 relative hover:scale-105 transition-transform duration-300" style={{ minHeight: "320px" }}>
                <h2 className="text-4xl md:text-5xl leading-{4} font-bold mb-4 text-gray-800 animate-slideUp playfair text-gradient">
                  {section.heading}
                </h2>
                {Array.isArray(section.text) ? (
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    {section.text.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-700 whitespace-pre-line">{section.text}</p>
                )}
              </div>

              {/* Image */}
              {section.image && (
                <div
                    className={`md:w-1/2 mt-8 md:mt-0 relative md:-top-8 ${
                    isEven ? "md:-ml-16" : "md:-mr-16"
                  } overflow-hidden shadow-2xl flex-shrink-0 hover:scale-105 transition-transform duration-500`}
                  style={{ minHeight: "320px" }}
                >
                  <Image
                    src={section.image}
                    alt={section.heading}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    priority 
                    fetchPriority="high"
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
