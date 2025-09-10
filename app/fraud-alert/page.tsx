import content from "../../locales/en/content.json";
import PageBanner from "@/components/PageBanner";
import Image from "next/image";

interface Section {
  heading: string;
  text: string | string[];
  image?: string;
}

interface FraudAlert {
  title: string;
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
  const page: FraudAlert = content["fraud-alert"];

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

export default function FraudAlertPage() {
  const page: FraudAlert = content["fraud-alert"];

  return (
    <section className="relative poppins w-auto bg-[#d2ab67] mx-auto">
      {/* Banner */}
      <PageBanner
        title={page.banner.title}
        image={page.banner.image}
        category={page.banner.heading}
      />

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 space-y-24">
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto space-y-4 animate-fadeIn text-white">
          <h1 className="text-4xl md:text-5xl playfair font-extrabold animate-slideUp">
            {page.title}
          </h1>
          <p className="text-lg md:text-xl animate-slideUp delay-100">
            {page.description}
          </p>
        </div>

        {/* Sections with zig-zag overlapping images */}
        {page.sections.map((section, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <div
              key={idx}
              className={`relative flex flex-col md:flex-row items-center md:items-start md:gap-12 ${
                isEven ? "md:flex-row" : "md:flex-row-reverse"
              } animate-fadeIn delay-${idx * 100}`}
            >
              {/* Text Content */}
              <div className="md:w-1/2 bg-white p-8 md:p-12 shadow-2xl z-10 relative hover:scale-105 transition-transform duration-300"
              style={{ minHeight: "320px" }}>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 animate-slideUp playfair text-gradient">
                  {section.heading}
                </h2>
                {Array.isArray(section.text) ? (
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    {section.text.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-700 whitespace-pre-line">{section.text}</p>
                )}
              </div>

              {/* Optional Overlapping Image */}
              {section.image && section.image !== "" && (
                <div
                  className={`md:w-1/2 mt-8 md:mt-0 relative md:-top-8 ${
                    isEven ? "md:-ml-16" : "md:-mr-16"
                  } overflow-hidden shadow-2xl flex-shrink-0 hover:scale-105 transition-transform duration-500`}
                  style={{ minHeight: "320px" }}
                >
                  <Image
                    src={section.image}
                    alt={section.heading}
                    fill
                    className="object-cover animate-fadeIn"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
