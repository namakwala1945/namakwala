import content from "@/locales/en/content.json";
import PageBanner from "@/components/PageBanner";
import HashScroll from "@/components/HashScroll";
import { Suspense } from "react";

// ----------------------
// Metadata
// ----------------------
export async function generateMetadata() {
  return {
    title: "Founder - Namakwala",
    description: "Vision, leadership, and the story of our founder.",
    metadataBase: new URL("https://namakwala.in"), // ✅ Fix OG/Twitter warning
  };
}

// ----------------------
// Page
// ----------------------
export default function FounderPage() {
  const founderData = content.founder;

  return (
    <section className="relative bg-[#fdfbf7] poppins">
      <PageBanner
        title="Founder"
        image="/assets/products/Garnet.jpg"
        category="Vision, Leadership & Story"
      />

      {/* ✅ Suspense wrapper fixes useSearchParams error in HashScroll */}
      <Suspense fallback={<div>Loading...</div>}>
        <HashScroll />
      </Suspense>

      <div className="container mx-auto px-6 py-12 space-y-20">
        {Object.entries(founderData).map(([key, section]: any) => (
          <section
            id={section.slug}
            key={key}
            className="scroll-mt-28 bg-white shadow-xl overflow-hidden border border-[#d2ab67] p-8"
          >
            <div className="mb-6">
              <img
                src={section.banner?.image}
                alt={section.title}
                className="w-full h-64 object-cover border border-[#d2ab67]"
              />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              {section.title}
            </h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {section.content}
            </p>
          </section>
        ))}
      </div>
    </section>
  );
}
