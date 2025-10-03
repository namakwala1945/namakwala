// app/ClientComponents.tsx
"use client"; // mark as client component

import dynamic from "next/dynamic";

// Dynamic imports for client-only features
const CustomCursor = dynamic(() => import("@/components/Cursor"));
const HeavyCarousel = dynamic(() => import("@/components/HeavyCarousel"));
const ThreeModel = dynamic(() => import("@/components/ThreeModel"));

export default function ClientComponents() {
  return (
    <>
      <CustomCursor />
      <HeavyCarousel />
      <ThreeModel />
    </>
  );
}
