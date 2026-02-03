// app/about/page.tsx
import { Suspense } from "react";
import AboutContent from "./AboutContent";

// ----------------------
// 🔹 Fetch Function
// ----------------------
async function getAboutUsData() {
  const res = await fetch(
    "http://localhost:1337/api/about-us?populate[Metadata][populate]=*&populate[pagebanner][populate]=*&populate[KnowAboutUs][populate]=*&populate[OurJourney][populate]=*&populate[KeyMilestonesOptions][populate]=*&populate[CommonSection][populate]=*",
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to fetch About Us data");
  const { data } = await res.json();
  return data;
}

// ----------------------
// 🔹 Dynamic Metadata
// ----------------------
export async function generateMetadata() {
  const data = await getAboutUsData();
  const meta = data?.Metadata;
  const ogImage = data?.pagebanner?.image?.url
    ? `http://localhost:1337${data.pagebanner.image.url}`
    : "https://namakwala.in/default.jpg";

  return {
    title: meta?.title || "About Namakwala",
    description:
      meta?.description?.[0]?.children?.[0]?.text ||
      "Learn more about Namakwala’s journey, milestones, and leadership.",
    openGraph: {
      title: meta?.openGraph?.title || meta?.title,
      description:
        meta?.openGraph?.description?.[0]?.children?.[0]?.text ||
        meta?.description?.[0]?.children?.[0]?.text,
      siteName: meta?.openGraph?.siteName || "Namakwala Group",
      images: [ogImage],
    },
    twitter: {
      card: meta?.twitter?.card || "summary_large_image",
      title: meta?.twitter?.title || meta?.title,
      description:
        meta?.twitter?.description?.[0]?.children?.[0]?.text ||
        meta?.description?.[0]?.children?.[0]?.text,
      images: [ogImage],
    },
  };
}

// ----------------------
// 🔹 Server Component Page
// ----------------------
export default async function AboutPage() {
  const data = await getAboutUsData();
  return (
    <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
      <AboutContent data={data} />
    </Suspense>
  );
}
