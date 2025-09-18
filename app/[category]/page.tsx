import content from "../../locales/en/content.json";
import PageBanner from "@/components/PageBanner";
import Image from "next/image";
import HashScroll from "@/components/HashScroll";
import { notFound } from "next/navigation";
import { Suspense } from "react";

// ----------------------
// Types
// ----------------------
type Application = { type: string };
type KeyFeature = { feature: string; detail: string };
type TechnicalSpecifications = Record<string, string>;

type CategoryPageItem = {
  title: string;
  description?: string;
  productImage?: string;
  applications?: Application[];
  keyFeatures?: KeyFeature[];
  technicalSpecifications?: TechnicalSpecifications;
  note?: string;
  metadata?: {
    title?: string;
    description?: string;
    keywords?: string;
    openGraph?: {
      title?: string;
      description?: string;
      url?: string;
      siteName?: string;
      images?: { url: string }[];
    };
    twitter?: {
      card?: string;
      title?: string;
      description?: string;
      images?: string[];
    };
  };
  banner?: {
    title: string;
    heading: string;
    image: string;
  };
};

type CategoryData = Record<string, CategoryPageItem>;
type Props = { params: { category: string } };
// Static Params
// ----------------------
export async function generateStaticParams() {
  const businesses = (content as any).businesses || {};
  return Object.keys(businesses).map((category) => ({
    category,
  }));
}

// ----------------------
// Metadata
// ----------------------
export async function generateMetadata({ params }: { params: { category: string } }) {
  // Await params object fully for dynamic route
  const resolvedParams = await Promise.resolve(params);
  const categoryKey = resolvedParams.category;

  const categoryData: CategoryData = (content as any).businesses?.[categoryKey];
  if (!categoryData) return { title: categoryKey };

  const firstKey = Object.keys(categoryData)[0];
  const page = categoryData[firstKey];
  const meta = page?.metadata;

  if (!meta) return { title: page.title };

  return {
    title: meta.title || page.title,
    description: meta.description || page.description,
    keywords: meta.keywords,
    openGraph: {
      title: meta.openGraph?.title || page.title,
      description: meta.openGraph?.description || page.description,
      url: meta.openGraph?.url,
      siteName: meta.openGraph?.siteName,
      images: meta.openGraph?.images?.map((img) => img.url) ?? [],
    },
    twitter: {
      card: meta.twitter?.card,
      title: meta.twitter?.title || page.title,
      description: meta.twitter?.description || page.description,
      images: meta.twitter?.images ?? [],
    },
  };
}
// ----------------------

// ----------------------
// Category Page Component
// ----------------------
export default async function CategoryPage({ params }: { params: { category: string } }) {
  // Resolve params in async page
  const resolvedParams = await Promise.resolve(params);
  const category = resolvedParams.category;

  const categoryData: CategoryData = (content as any).businesses?.[category];
  if (!categoryData) return notFound();

  const firstKey = Object.keys(categoryData)[0];
  const banner = categoryData[firstKey]?.banner ?? {
    title: category,
    heading: "",
    image: "/optimized/placeholder-large.webp",
  };

  return (
    <section className="relative bg-[#d2ab67] poppins">
      {/* Hero Banner */}
      <div className="inset-0 top-0 playfair">
        <PageBanner title={banner.title} image={banner.image} category={banner.heading} />
      </div>

      {/* Smooth hash scroll with Suspense */}
      <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
        <HashScroll />
      </Suspense>

      {/* Main Content Sections */}
      <div className="w-auto bg-[#d2ab67] mx-auto px-6 py-12 space-y-24">
        {Object.entries(categoryData).map(([slug, page], idx) => (
          <section
            id={slug}
            key={slug}
            className={`scroll-mt-28 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} shadow-md px-6 py-12 lg:px-10`}
          >
            {/* Grid layout: image / content */}
            <div className="grid lg:grid-cols-2 gap-10 items-start">
              {page.productImage && (
                <div className="flex w-auto justify-center overflow-hidden">
                  <Image
                    src={page.productImage}
                    alt={page.title}
                    width={600}
                    height={400}
                    priority                // load fast
                    fetchPriority="high"          // compress
                    quality={70} 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1920px"
                  />
                </div>
              )}

              <div>
                <h2 className="text-4xl playfair font-extrabold text-gradient mb-4">{page.title}</h2>
                <div className="text-gray-700 leading-relaxed">
                  {(page.description ?? "").split("\n\n").map((para, i) => (
                    <p key={i} className="block mb-2">{para}</p>
                  ))}
                </div>

                {Array.isArray(page.applications) && page.applications.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-2xl playfair font-extrabold text-gradient mb-2">Applications</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {page.applications.map((app) => app.type).join(", ")}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Tables Section */}
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
              {Array.isArray(page.keyFeatures) && page.keyFeatures.length > 0 && (
                <div className="bg-[#fdf2df] border border-[#d2ab67] shadow-lg overflow-hidden">
                  <div className="px-6 py-2 border-b border-[#d2ab67] text-2xl leading-[1.8]">
                    <h3 className="playfair font-extrabold text-gradient text-center">Key Features & Benefits</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-[#d2ab67]">
                      <thead className="bg-[#fdf2df]">
                        <tr>
                          <th className="px-4 py-2 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">Feature</th>
                          <th className="px-4 py-2 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">Benefits</th>
                        </tr>
                      </thead>
                      <tbody className="bg-[#fdf2df] divide-y divide-[#d2ab67] capitalize">
                        {page.keyFeatures.map((f, idx) => (
                          <tr key={idx} className="transition-colors duration-200 hover:bg-[#d2ab67] hover:text-white">
                            <td className="px-4 py-2">{f.feature}</td>
                            <td className="px-4 py-2">{f.detail}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {page.technicalSpecifications && (
                <div className="bg-[#fdf2df] border border-[#d2ab67] shadow-lg overflow-hidden">
                  <div className="px-6 py-2 border-b border-[#d2ab67] text-2xl leading-[1.8]">
                    <h3 className="playfair font-extrabold text-gradient text-center">Technical Specifications</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-[#d2ab67]">
                      <thead className="bg-[#fdf2df]">
                        <tr>
                          <th className="px-4 py-2 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">Property</th>
                          <th className="px-4 py-2 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">Value</th>
                        </tr>
                      </thead>
                      <tbody className="bg-[#fdf2df] divide-y divide-[#d2ab67] capitalize">
                        {Object.entries(page.technicalSpecifications).map(([prop, value], idx) => (
                          <tr key={idx} className="transition-colors duration-200 hover:bg-[#d2ab67] hover:text-white">
                            <td className="px-4 py-2">{prop}</td>
                            <td className="px-4 py-2">{value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="px-6 py-3 bg-[#fdf2df] border-t border-[#d2ab67] text-center">
                    <p className="text-sm italic text-gray-600">
                      Specifications can be customized as per industry needs
                    </p>
                  </div>
                </div>
              )}
            </div>

            {page.note && (
              <div className="relative mt-12 overflow-hidden shadow-lg">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${page.productImage ?? "/optimized/placeholder-large.webp"})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/70" />
                <div className="relative z-10 p-10 text-center">
                  <h4 className="text-2xl font-bold mb-4 text-white">Why choose {page.title}?</h4>
                  <p className="text-white text-lg leading-relaxed">{page.note}</p>
                </div>
              </div>
            )}
          </section>
        ))}
      </div>
    </section>
  );
}
