// components/BusinessSection.tsx
"use client";

import { useState } from "react";
import content from "../locales/en/content.json";
import Link from "next/link";

type Business = {
  title: string;
  description: string;
  bannerImage: string;
  slug: string;
};

// Convert object to array for easier mapping
const businesses: Business[] = Object.values(content["business-section"]).map(
  (b: any) => ({
    title: b.title,
    description: b.description,
    bannerImage: b.banner.image,
    slug: b.slug,
  })
);

export default function BusinessSection() {
  const [active, setActive] = useState(0);

  return (
    <div className="relative w-full min-h-screen poppins">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-500"
        style={{ backgroundImage: `url(${businesses[active].bannerImage})` }}
      ></div>

      {/* Shadow / Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-80 shadow-inner"></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col md:flex-row h-full w-full md:w-[95%] mx-auto">
        {/* Tabs (Top on Mobile, Right on Desktop) */}
        <div className="flex flex-wrap md:flex-col order-1 md:order-2 w-full md:w-1/3 p-4 md:p-12 text-white">
          {businesses.map((b, index) => (
            <button
              key={index}
              onClick={() => setActive(index)}
              className={`w-1/2 md:w-full text-center md:text-left py-2 px-2 md:px-4 border-b-4 transition-all duration-300 uppercase text-sm md:text-xl ${
                active === index
                  ? "border-[#be9244] text-white"
                  : "border-gray-300 hover:border-[#be9244]"
              }`}
            >
              {b.title}
            </button>
          ))}
        </div>

        {/* Left Content */}
        <div className="order-2 md:order-1 w-full md:w-2/3 p-4 md:p-12 flex flex-col justify-center text-white">
          <h3 className="text-lg md:text-2xl font-semibold mb-4 md:mb-6 uppercase">
            Our Businesses
          </h3>
          <h1 className="text-3xl md:text-6xl playfair mb-4">
            {businesses[active].title}
          </h1>
          <p className="text-sm md:text-lg whitespace-pre-line">
            {businesses[active].description}
          </p>
          <div className="mt-6 md:mt-12 flex flex-col sm:flex-row gap-4">
            <Link href={`/${businesses[active].slug}`}>
              <button className="px-6 py-2 border-2 border-[#be9244] text-[#be9244] rounded hover:bg-[#9c7936] hover:text-white transition-colors w-full sm:w-auto">
                View More
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
