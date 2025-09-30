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
        <div className="w-full md:w-[97%] mx-auto bg-white p-2 sm:p-4 md:p-6 lg:p-6 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 items-start">
          
          {/* Left Image Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 sm:gap-4">
            {page.images.map((img, idx) => (
              <div
                key={idx}
                className="overflow-hidden shadow-lg relative rounded-lg"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={600}
                  height={400}
                  className="w-full h-28 sm:h-32 md:h-40 lg:h-48 xl:h-56 object-cover transition-transform duration-500 hover:scale-105"
                  priority={idx === 0}
                />
              </div>
            ))}
          </div>

          {/* Right Content */}
          <div className="text-gray-700 space-y-2 sm:space-y-4 text-center lg:text-left mt-4 lg:mt-0">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl playfair font-bold">
              {page.title}
            </h1>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-justify">
              {page.content}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
