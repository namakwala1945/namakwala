// app/blog/[slug]/page.tsx
import blogData from "../../../locales/en/blog.json";
import PageBanner from "@/components/PageBanner";
import { notFound } from "next/navigation";

// ----------------------
// ✅ Normalize Params Helper
// ----------------------
async function getParams(params: any) {
  return params instanceof Promise ? await params : params;
}

// ----------------------
// ✅ Generate Metadata from JSON
// ----------------------
export async function generateMetadata({ params }: { params: any }) {
  const { slug } = await getParams(params);

  const post = blogData.posts.find((p) => p.slug === slug);
  if (!post) return {};

  const meta = post.metadata;
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
}

// ----------------------
// ✅ Static Params for SSG
// ----------------------
export async function generateStaticParams() {
  return blogData.posts.map((post) => ({
    slug: post.slug,
  }));
}

// ----------------------
// ✅ Blog Detail Page
// ----------------------
export default async function BlogDetailPage({ params }: { params: any }) {
  const { slug } = await getParams(params);

  const post = blogData.posts.find((p) => p.slug === slug);
  if (!post) return notFound();

  return (
    <section className="relative poppins">
      {/* ✅ Top Banner */}
      <div className="inset-0 top-0">
        <PageBanner
          title={post.title}
          image={post.banner}
          category={post.category || "Blog"}
        />
      </div>

      {/* ✅ Blog Content */}
      <div className="container mx-auto px-6 py-16 max-w-3xl prose prose-lg">
        <div className="mb-6 text-gray-600 text-sm">
          By <span className="font-semibold">{post.author}</span> • {post.date}
        </div>

        {post.content.map((para: string, i: number) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </section>
  );
}
