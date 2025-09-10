import content from "../../../locales/en/content.json";
import PageBanner from "@/components/PageBanner";

export default async function FouderPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = content.founder[slug as keyof typeof content.founder];
  if (!page) {
    return <h1>404 | Page Not Found</h1>;
  }

  return (
    <section className="relative h-[89vh] overflow-hidden">
          {/* Background Slider */}
          <div className="inset-0 top-0">
            <PageBanner 
            title={page.banner.title} 
            image={page.banner.image} 
            category={page.banner.heading}
            />
          </div>
        <div className="container p-6 relative">
          <h1 className="text-2xl font-bold">{page.title}</h1>
          <p className="mt-4">{page.content}</p>
        </div>
    </section>
  );
}
