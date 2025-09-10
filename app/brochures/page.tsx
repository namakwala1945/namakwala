// app/brochures/page.tsx
import content from "../../locales/en/content.json";
import PageBanner from "@/components/PageBanner";

const page = content.brochures;
const brochuress = page.items || [];

// Generate SSR metadata from JSON
export const generateMetadata = async () => {
  const meta = page.metadata;
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    authors: meta.authors.map((a: any) => ({ name: a.name })),
    openGraph: {
      title: meta.openGraph.title,
      description: meta.openGraph.description,
      type: meta.openGraph.type,
      url: meta.openGraph.url,
      siteName: meta.openGraph.siteName,
      images: meta.openGraph.images.map((img: any) => img.url),
    },
    twitter: {
      card: meta.twitter.card,
      title: meta.twitter.title,
      description: meta.twitter.description,
      images: meta.twitter.images,
    },
  };
};

export default function Brochures() {
  return (
    <section className="relative">
      {/* Top Banner */}
      <div className="inset-0 top-0">
        <PageBanner
          title={page.banner.title}
          image={page.banner.image}
          category={page.banner.heading}
        />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 text-center">
        <h1 className="text-5xl font-bold mb-5 leading-[1.5] text-gradient">{page.title}</h1>
        <p className="text-lg leading-relaxed mb-8">{page.content}</p>

        {/* brochures Display */}
        {brochuress.length === 1 ? (
          // ✅ Single brochures -> iframe
          <div className="flex justify-center">
            <div className="w-full max-w-4xl h-[800px] border shadow-lg overflow-hidden">
              <iframe
                src={brochuress[0].file}
                className="w-full h-full"
                title={brochuress[0].title}
              />
            </div>
          </div>
        ) : (
          // ✅ Multiple brochuress -> Grid of iframes
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {brochuress.map((cat, idx) => (
              <div
                key={idx}
                className="bg-white shadow-lg overflow-hidden"
              >
                <div className="h-[400px]">
                  <iframe
                    src={cat.file}
                    className="w-full h-full"
                    title={cat.title}
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-semibold">{cat.title}</h2>
                  <p className="mt-1 text-blue-600 font-medium">Preview</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
