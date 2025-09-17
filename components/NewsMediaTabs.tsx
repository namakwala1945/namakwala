"use client";

import { useState } from "react";
import Image from "next/image";

interface Video {
  url: string;
  title: string;
}

interface ImageItem {
  src: string;
  title: string;
}

interface NewsMediaTabsProps {
  videos?: Video[];
  images?: ImageItem[];
}

type MediaItem = { type: "video" | "image"; url: string; title: string };

export default function NewsMediaTabs({ videos = [], images = [] }: NewsMediaTabsProps) {
  const [activeTab, setActiveTab] = useState<"videos" | "images">("videos");
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Combine videos/images into a single array for lightbox
  const allMedia: MediaItem[] =
    activeTab === "videos"
      ? videos.map((v) => ({ type: "video", url: v.url, title: v.title }))
      : images.map((i) => ({ type: "image", url: i.src, title: i.title }));

  // Open lightbox
  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  // Next/Prev navigation
  const nextMedia = () => setCurrentIndex((prev) => (prev + 1) % allMedia.length);
  const prevMedia = () =>
    setCurrentIndex((prev) => (prev - 1 + allMedia.length) % allMedia.length);

  // Get YouTube thumbnail from URL
  const getYouTubeID = (url: string) => {
  try {
    const regex =
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  } catch {
    return null;
  }
};

  return (
    <>
      {/* Tabs */}
      <div className="flex space-x-4 mb-8 justify-center">
        {["videos", "images"].map((tab) => (
          <button
           aria-label="Videos and Images"
            key={tab}
            onClick={() => setActiveTab(tab as "videos" | "images")}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300
              ${activeTab === tab ? "bg-[#ab8c30] text-white shadow-lg" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Media Grid */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 place-items-center">
        {allMedia.map((item, idx) => (
          <div
            key={idx}
            className="relative w-full max-w-lg shadow-xl overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300"
            onClick={() => openLightbox(idx)}
          >
            {item.type === "image" ? (
              <Image
                src={item.url}
                alt={item.title}
                width={600}
                height={400}
                className="w-full h-64 object-cover"
              />
            ) : (
              <Image
                src={`https://img.youtube.com/vi/${getYouTubeID(item.url)}/hqdefault.jpg`}
                alt={item.title}
                width={600}
                height={400}
                className="w-full h-64 object-cover"
              />
            )}

            <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white text-center py-1">
              {item.title}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button
           aria-label="Is Open"
            className="absolute top-4 right-4 text-white text-3xl font-bold"
            onClick={() => setIsOpen(false)}
          >
            &times;
          </button>

          <button
           aria-label="Prev Media"
            className="absolute left-4 text-white text-3xl font-bold"
            onClick={prevMedia}
          >
            &#8592;
          </button>

          <button
             aria-label="Next Media"
            className="absolute right-4 text-white text-3xl font-bold"
            onClick={nextMedia}
          >
            &#8594;
          </button>

          <div className="max-w-4xl w-full max-h-full flex items-center justify-center">
            {allMedia[currentIndex].type === "image" ? (
              <Image
                src={allMedia[currentIndex].url}
                alt={allMedia[currentIndex].title}
                width={1200}
                height={800}
                className="object-contain"
              />
            ) : (
              <iframe
                src={allMedia[currentIndex].url}
                title={allMedia[currentIndex].title}
                className="w-full h-[70vh]"
                allowFullScreen
              ></iframe>
            )}
          </div>
        </div>
      )}
    </>
  );
}
