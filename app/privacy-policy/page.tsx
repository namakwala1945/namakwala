import content from "../../locales/en/content.json";
import PageBanner from "@/components/PageBanner";
import Image from "next/image";

// Define TypeScript types for better type checking
interface Section {
  title: string;
  content: string | string[];
  image: string;
}

interface PrivacyPolicy {
  title: string;
  content: string;
  banner: {
    title: string;
    heading: string;
    image: string;
  };
  sections: Record<string, Section>;
  metadata: any;
}

export async function generateMetadata() {
  const page: PrivacyPolicy = content["privacy-policy"];

  return {
     title: page.metadata.title,
    description: page.metadata.description,
    keywords: page.metadata.keywords,
    authors: page.metadata.authors.map((a: any) => ({ name: a.name })),
    openGraph: {
      title: page.metadata.openGraph.title,
      description: page.metadata.openGraph.description,
      type: page.metadata.openGraph.type,
      url: page.metadata.openGraph.url,
      siteName: page.metadata.openGraph.siteName,
      images: page.metadata.openGraph.images.map((img: any) => img.url),
    },
    twitter: {
      card: page.metadata.twitter.card,
      title: page.metadata.twitter.title,
      description: page.metadata.twitter.description,
      images: page.metadata.twitter.images,
    },
  };
}

export default function PrivacyPolicyPage() {
  const page: PrivacyPolicy = content["privacy-policy"];

  return (
    <section className="relative poppins">
      {/* Banner */}
      <PageBanner
        title={page.banner.title}
        image={page.banner.image}
        category={page.banner.heading}
      />

      {/* Main Content */}
      <div className="w-auto bg-[#d2ab67] mx-auto px-6 py-12 space-y-24">
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="text-4xl md:text-5xl playfair text-white font-extrabold animate-slideUp">
            {page.title}
          </h1>
          <p className="text-lg md:text-xl text-white">{page.content}</p>
        </div>

        {/* Sections with zig-zag overlapping images */}
        {Object.entries(page.sections).map(([key, section], idx) => {
          const isEven = idx % 2 === 0;

          return (
            <div
              key={key}
              className={`relative flex flex-col md:flex-row items-center md:items-start md:gap-12 poppins ${
                isEven ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Text Content */}
              <div className="md:w-1/2 bg-white p-8 md:p-12 shadow-2xl z-10 relative hover:scale-105 transition-transform duration-300"
              style={{ minHeight: "320px" }}>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 animate-slideUp playfair text-gradient">
                  {section.title}
                </h2>
                {Array.isArray(section.content) ? (
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    {section.content.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-700">{section.content}</p>
                )}
              </div>

              {/* Overlapping Image */}
              <div
                className={`md:w-1/2 mt-8 md:mt-0 relative md:-top-8 ${
                  isEven ? "md:-ml-16" : "md:-mr-16"
                } overflow-hidden shadow-2xl flex-shrink-0 hover:scale-105 transition-transform duration-500`}
                style={{ minHeight: "320px" }}
              >
                <Image
                  src={section.image}
                  alt={section.title}
                  fill
                  className="object-cover"
                  priority 
                  fetchPriority="high"
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
