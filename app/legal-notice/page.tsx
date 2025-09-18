import content from "../../locales/en/content.json";
import PageBanner from "@/components/PageBanner";
import Image from "next/image";

// TypeScript types
interface Section {
  heading: string;
  text: string;
  image?: string;
}

interface LegalNotice {
  title: string;
  slug: string;
  description: string;
  banner: {
    title: string;
    heading: string;
    image: string;
  };
  sections: Section[];
  metadata: any;
}

export async function generateMetadata() {
  const page: LegalNotice = content["legal-notice"];

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

export default function LegalNoticePage() {
  const page: LegalNotice = content["legal-notice"];

  return (
    <section className="relative bg-gray-50 poppins">
      {/* Banner */}
      <PageBanner
        title={page.banner.title}
        image={page.banner.image}
        category={page.banner.heading}
      />

      {/* Main Content */}
      <div className="w-full mx-auto px-6 py-16 space-y-28">
        {/* Page Title & Description */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-5xl playfair text-gradient font-extrabold animate-slideUp">
            {page.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-700">{page.description}</p>
        </div>

        {/* Sections */}
        {page.sections.map((section, idx) => {
          const isEven = idx % 2 === 0;
          const imageSrc =
            section.image ||
            "https://via.placeholder.com/800x500?text=Namakwala+Image";

          return (
            <div
              key={idx}
              className={`relative flex flex-col md:flex-row items-center md:items-start md:gap-12 ${
                isEven ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Text Content */}
              <div className="md:w-1/2 bg-white p-8 md:p-12 shadow-2xl z-10 relative hover:scale-105 transition-transform duration-300"
              style={{ minHeight: "320px" }}>
                <h2 className="text-4xl md:text-5xl leading-{4} font-bold mb-4 text-gray-800 animate-slideUp playfair text-gradient">
                  {section.heading}
                </h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {section.text}
                </p>
              </div>

              {/* Image Content */}
              <div
                className={`md:w-1/2 mt-8 md:mt-0 relative md:-top-8 ${
                  isEven ? "md:-ml-16" : "md:-mr-16"
                } overflow-hidden shadow-2xl flex-shrink-0 hover:scale-105 transition-transform duration-500`}
                style={{ minHeight: "320px" }}
              >
                <Image
                  src={imageSrc}
                  alt={section.heading}
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
