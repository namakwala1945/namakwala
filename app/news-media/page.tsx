import content from "../../locales/en/content.json";
import PageBanner from "@/components/PageBanner";
import NewsMediaTabs from "@/components/NewsMediaTabs";

interface Video {
  url: string;
  title: string;
}

interface ImageItem {
  src: string;
  title: string;
}

interface NewsMediaPageData {
  title: string;
  content: string;
  banner: {
    title: string;
    heading: string;
    image: string;
  };
  videos?: Video[];
  images?: ImageItem[];
  metadata: any;
}

export async function generateMetadata() {
  const page: NewsMediaPageData = content.newsMedia;

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

export default function NewsMediaPage() {
  const page: NewsMediaPageData = content.newsMedia;

  return (
    <section className="relative bg-[#fdf2df] poppins">
      {/* Top Banner */}
      <div className="relative h-96 w-full overflow-hidden">
        <PageBanner
          title={page.banner.title}
          image={page.banner.image}
          category={page.banner.heading}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 pb-16 space-y-12">
        <div className="bg-[#fff] shadow-lg p-6 md:p-10">
          <h2 className="text-4xl md:text-5xl playfair font-extrabold text-gradient mb-6 text-center">
            Latest News & Media
          </h2>
          {/* Provide default empty arrays to avoid undefined errors */}
          <NewsMediaTabs
            videos={page.videos || []}
            images={page.images || []}
          />
        </div>
      </div>
    </section>
  );
}
