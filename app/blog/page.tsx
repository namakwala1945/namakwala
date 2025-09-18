import Link from "next/link";
import Image from "next/image";
import blogData from "../../locales/en/blog.json";
import PageBanner from "@/components/PageBanner";

// ✅ Generate SSR metadata from JSON
export const generateMetadata = async () => {
  const meta = blogData.page.metadata;

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

export default function BlogPage() {
  const { page, posts } = blogData;

  return (
    <section className="relative poppins">
      {/* ✅ Top Banner */}
      <PageBanner
        title={page.title}
        image={page.banner}
        category="Blog"
      />

      {/* ✅ Blog List */}
      <div className="container mx-auto px-6 py-16 space-y-16 text-center">
        <h1 className="text-4xl md:text-5xl playfair font-extrabold animate-slideUp">
          {page.title}
        </h1>
        <p className="text-center text-lg text-gray-700 max-w-2xl mx-auto">
          {page.description}
        </p>

        <div className="grid md:grid-cols-2 gap-12 mt-12">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group"
            >
              <div className="relative overflow-hidden shadow-2xl transition-transform transform hover:scale-105">
                <Image
                  src={post.banner}
                  alt={post.title}
                  width={800}
                  height={500}
                  className="object-cover w-full h-64"
                />
              </div>
              <div className="mt-4">
                <h2 className="text-2xl font-bold text-gray-900 group-hover:text-orange-500 transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-700 mt-2">{post.excerpt}</p>
                <p className="text-sm text-gray-500 mt-1">
                  By {post.author} | {post.date}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
