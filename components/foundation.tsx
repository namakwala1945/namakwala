"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import content from "../locales/en/content.json";

interface Section {
  heading: string;
  text: string;
  logo?: string;
  slider?: string[];
}

interface FoundationPage {
  title: string;
  description: string;
  banner: {
    title: string;
    heading: string;
    image: string;
  };
  sections: Section[];
}

export default function FoundationSection() {
  const page: FoundationPage = content["namakwala-foundation"];
  const section = page.sections[0]; // single section for now

  const [current, setCurrent] = useState(0);

  // ✅ Autoplay every 4s
  useEffect(() => {
    if (!section.slider) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % section.slider!.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [section.slider]);

  const nextSlide = () =>
    setCurrent((prev) => (prev + 1) % (section.slider?.length || 1));

  const prevSlide = () =>
    setCurrent(
      (prev) => (prev - 1 + (section.slider?.length || 1)) % (section.slider?.length || 1)
    );

  return (
    <section className="h-screen w-full flex items-center bg-[#fdf2df] shadow-lg p-4 md:p-16 poppins">
      <div className="w-full md:w-[95%] mx-auto bg-white overflow-hidden h-[80vh]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 h-full">
          {/* Left Side (Content) */}
          <div className="md:col-span-4 flex flex-col space-y-4 p-4 md:p-6 h-full">
            {section.logo && (
              <Image
                src={section.logo}
                alt={section.heading}
                width={300}
                height={113}
                className="object-contain mb-2 mx-auto"
                priority 
                fetchPriority="high"
              />
            )}
            <p className="text-gray-700 text-sm md:text-base leading-relaxed text-center md:text-left">
              {section.text}
            </p>
          </div>

          {/* Right Side (Slider) */}
          <div className="md:col-span-8 relative w-full h-full overflow-hidden">
            {section.slider && (
              <Image
                key={current}
                src={section.slider[current]}
                alt={`Slide ${current + 1}`}
                fill
                className="object-cover transition-all duration-700"
                priority 
                fetchPriority="high"
              />
            )}

            {/* Controls */}
            <button
             aria-label="Arrow Left"
              onClick={prevSlide}
              className="absolute top-1/2 left-2 md:left-4 -translate-y-1/2 bg-black/40 text-white p-1.5 md:p-2 rounded-full text-xs md:text-base"
            >
              ◀
            </button>
            <button
             aria-label="Arrow Right"
              onClick={nextSlide}
              className="absolute top-1/2 right-2 md:right-4 -translate-y-1/2 bg-black/40 text-white p-1.5 md:p-2 rounded-full text-xs md:text-base"
            >
              ▶
            </button>
          </div>
        </div>
      </div>
    </section>

  );
}
