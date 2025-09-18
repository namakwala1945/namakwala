// app/catalogue/page.tsx
import content from "../../locales/en/content.json";
import PageBanner from "@/components/PageBanner";

// Types
interface CatalogueItem {
  title: string;
  file: string;
}

interface CataloguePageType {
  title: string;
  content: string;
  banner: {
    title: string;
    heading: string;
    image: string;
  };
  items: CatalogueItem[];
  metadata: any;
}

// Load page data
const page: CataloguePageType = content.catalogue;
const catalogues: CatalogueItem[] = page.items || [];

// ✅ Generate SEO metadata dynamically
export async function generateMetadata() {
  const meta = page.metadata;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    authors: meta.authors.map((a: any) => ({ name: a.name })),
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: meta.openGraph.url,
    },
    openGraph: {
      title: meta.openGraph.title,
      description: meta.openGraph.description,
      type: meta.openGraph.type,
      url: meta.openGraph.url,
      siteName: meta.openGraph.siteName,
      images: meta.openGraph.images.map((img: any) => img.url),
      locale: meta.openGraph.locale,
    },
    twitter: {
      card: meta.twitter.card,
      title: meta.twitter.title,
      description: meta.twitter.description,
      images: meta.twitter.images,
    },
  };
}

export default function CataloguePage() {
  return (
    <section className="relative poppins">
      {/* ✅ Top Banner */}
      <div className="inset-0 top-0">
        <PageBanner
          title={page.banner.title}
          image={page.banner.image}
          category={page.banner.heading}
          priority // ✅ LCP optimization
        />
      </div>

      {/* ✅ Main Content */}
      <div className="container mx-auto px-6 py-12 text-center">
        <h1 className="text-4xl md:text-5xl playfair font-extrabold text-gradient">
          {page.title}
        </h1>
        <p className="text-lg leading-relaxed mb-8">{page.content}</p>

        {/* ✅ Catalogue Display */}
        {catalogues.length === 1 ? (
          // Single catalogue -> iframe
          <div className="flex justify-center">
            <div className="w-full max-w-4xl h-[800px] border shadow-lg overflow-hidden">
              <iframe
                src={catalogues[0].file}
                className="w-full h-full"
                title={catalogues[0].title}
              />
            </div>
          </div>
        ) : (
          // Multiple catalogues -> Grid
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {catalogues.map((cat, idx) => (
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
