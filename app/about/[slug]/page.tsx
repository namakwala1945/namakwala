import content from "@/locales/en/content.json";
import PageBanner from "@/components/PageBanner";
import HashScroll from "@/components/HashScroll";

interface AboutPageProps {
  params: { slug: string };
}

// ✅ Server-side metadata for SSR (SEO)
export async function generateMetadata({ params }: AboutPageProps) {
  const page = content.about[params.slug as keyof typeof content.about];
  if (!page) return {};

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

export default function AboutPage() {
  const aboutSections = content.about;

  return (
    <section className="relative bg-[#fdf2df]">
      {/* ✅ Top Banner (first section banner) */}
      <PageBanner
        title="About Us"
        image="/assets/banners/about-main.jpg"
        category="Learn about our journey, milestones, and leadership"
      />

      {/* ✅ Enable scrolling to #id */}
      <HashScroll />

      {/* ✅ Sections */}
      <div className="container mx-auto px-6 py-12 space-y-20">
        {Object.entries(aboutSections).map(([key, section]: any) => (
          <section
            key={key}
            id={section.slug}
            className="scroll-mt-28 bg-white shadow-xl overflow-hidden border border-[#d2ab67] p-8"
          >
            {/* Banner image for each section */}
            <div className="mb-6">
              <img
                src={section.banner?.image}
                alt={section.title}
                className="w-full h-64 object-cover  border border-[#d2ab67]"
              />
            </div>

            {/* Title + Content */}
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
