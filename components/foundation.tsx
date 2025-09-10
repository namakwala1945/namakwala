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
    <section className="min-h-screen md:h-[80vh] flex items-center bg-[#fdf2df] shadow-lg p-4 md:p-16 poppins">
      <div className="w-full md:w-[95%] mx-auto bg-white overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {/* Left Side (Content) */}
          <div className="md:col-span-5 flex flex-col space-y-4 p-4 md:p-6">
            {section.logo && (
              <Image
                src={section.logo}
                alt={section.heading}
                width={250}
                height={100}
                className="object-contain mb-2 mx-auto md:mx-0"
              />
            )}
            <p className="text-gray-700 text-sm md:text-base leading-relaxed text-center md:text-left">
              {section.text}
            </p>
          </div>

          {/* Right Side (Slider) */}
          <div className="md:col-span-7 relative w-full h-[40vh] md:h-[60vh] overflow-hidden">
            {section.slider && (
              <Image
                key={current} // ✅ forces re-render when slide changes
                src={section.slider[current]}
                alt={`Slide ${current + 1}`}
                fill
                className="object-cover transition-all duration-700"
              />
            )}

            {/* Controls */}
            <button
              onClick={prevSlide}
              className="absolute top-1/2 left-2 md:left-4 -translate-y-1/2 bg-black/40 text-white p-1.5 md:p-2 rounded-full text-xs md:text-base"
            >
              ◀
            </button>
            <button
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
