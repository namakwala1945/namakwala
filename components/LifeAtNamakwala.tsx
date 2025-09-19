"use client";

import content from "../locales/en/content.json";
import Image from "next/image";

interface LifeAtNamakwala {
  title: string;
  content: string;
  banner: {
    title: string;
    heading: string;
    image: string;
  };
  images: { src: string; alt: string }[];
  metadata: any;
}

export async function generateMetadata() {
  const page: LifeAtNamakwala = content["life-at-namakwala"];
  return {
    title: page.metadata.title,
    description: page.metadata.description,
    keywords: page.metadata.keywords,
    authors: page.metadata.authors.map((a: any) => ({ name: a.name })),
    openGraph: { ...page.metadata.openGraph },
    twitter: { ...page.metadata.twitter },
  };
}

export default function LifeAtNamakwala() {
  const page: LifeAtNamakwala = content["life-at-namakwala"];

  return (
    <section className="relative">
      <div className="bg-[#d2ab67] px-4 sm:px-6 lg:px-16 py-6 sm:py-8 lg:py-12 poppins">
        <div className="w-full md:w-[97%] mx-auto bg-white p-2 sm:p-6 md:p-6 lg:p-6 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-top">
          {/* Left Content */}
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
            {page.images.map((img, idx) => (
              <div
                key={idx}
                className={`overflow-hidden shadow-lg relative`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={600}
                  height={400}
                  className="w-full h-24 sm:h-32 md:h-48 lg:h-64 object-cover transition-transform duration-500 hover:scale-105"
                  priority={idx === 0} // first image loads fast
                />
              </div>
            ))}
          </div>
          {/* Right Images */}
          
          <div className="text-gray-700 space-y-4 text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl playfair font-bold">
              {page.title}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-justify">
              {page.content}
            </p>
          </div>
        </div>
      </div>
    </section>

  );
}
