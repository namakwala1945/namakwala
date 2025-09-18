// app/news-media/page.tsx
import content from "@/locales/en/content.json";
import PageBanner from "@/components/PageBanner";
import NewsMediaTabs from "@/components/NewsMediaTabs";
import Script from "next/script";

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

// ✅ Generate SEO metadata dynamically
export async function generateMetadata() {
  const page: NewsMediaPageData = content.newsMedia;

  return {
    title: page.metadata.title,
    description: page.metadata.description,
    keywords: page.metadata.keywords,
    authors: page.metadata.authors.map((a: any) => ({ name: a.name })),
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: page.metadata.openGraph.url,
    },
    openGraph: {
      title: page.metadata.openGraph.title,
      description: page.metadata.openGraph.description,
      type: page.metadata.openGraph.type,
      url: page.metadata.openGraph.url,
      siteName: page.metadata.openGraph.siteName,
      images: page.metadata.openGraph.images.map((img: any) => img.url),
      locale: page.metadata.openGraph.locale,
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
      {/* ✅ Structured Data */}
      <Script type="application/ld+json" id="newsmedia-schema">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: page.title,
          description: page.content,
          url: page.metadata.openGraph.url,
        })}
      </Script>

      {/* ✅ Breadcrumb JSON-LD */}
      <Script type="application/ld+json" id="breadcrumb-schema">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://www.namakwala.com/",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "News & Media",
              item: "https://www.namakwala.com/news-media",
            },
          ],
        })}
      </Script>

      {/* ✅ Top Banner with priority */}
      <div className="relative h-96 w-full overflow-hidden">
        <PageBanner
          title={page.banner.title}
          image={page.banner.image}
          category={page.banner.heading}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent"></div>
      </div>

      {/* ✅ Main Content */}
      <div className="container mx-auto px-6 pb-16 space-y-12">
        <div className="bg-white shadow-lg p-6 md:p-10">
          <h2 className="text-4xl md:text-5xl playfair font-extrabold text-gradient mb-6 text-center">
            {page.title}
          </h2>
          <p className="text-center text-gray-700 mb-8">{page.content}</p>

          {/* Avoid undefined errors */}
          <NewsMediaTabs videos={page.videos || []} images={page.images || []} />
        </div>
      </div>
    </section>
  );
}
