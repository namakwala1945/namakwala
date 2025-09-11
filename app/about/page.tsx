import content from "@/locales/en/content.json";
import PageBanner from "@/components/PageBanner";
import HashScroll from "@/components/HashScroll";
import { notFound } from "next/navigation";


// ----------------------
// TypeScript Types
// ----------------------
type NestedSection = {
  slug: string;
  title: string;
  content: string | string[];
  image?: string;
};

type AboutSection = {
  slug: string;
  title: string;
  content: string;
  banner?: {
    title: string;
    heading: string;
    image: string;
  };
  sections?: Record<string, NestedSection>;
};

type AboutData = Record<string, AboutSection>;

// ----------------------
// Metadata
// ----------------------
export async function generateMetadata() {
  const aboutData: AboutData = content.about as AboutData;
  if (!aboutData) return { title: "About Us" };

  const firstKey = Object.keys(aboutData)[0];
  const page = aboutData[firstKey];
  const banner = page.banner;

  return {
    title: banner?.title ?? page?.title ?? "About Us",
    description: page?.content ?? "",
  };
}

// ----------------------
// About Page Component
// ----------------------
export default function AboutPage() {
  const aboutData: AboutData = content.about as AboutData;
  if (!aboutData) return notFound();

  // Top Banner
  const firstKey = Object.keys(aboutData)[0];
  const topBanner = aboutData[firstKey]?.banner ?? {
    title: "About Us",
    heading: "Learn about our journey, milestones, and leadership",
    image: "/assets/placeholder.jpg",
  };

  return (
    <section className="relative bg-[#d2ab67] poppins">
      {/* Top Banner */}
      <PageBanner
        title={topBanner.title}
        image={topBanner.image}
        category={topBanner.heading}
      />

      {/* Enable #id scrolling */}
      <HashScroll />

      <div className="container mx-auto py-12">
        {Object.entries(aboutData).map(([sectionKey, section]) => (
          <section
            key={sectionKey}
            id={section.slug}
            className="scroll-mt-28 overflow-hidden p-8"
          >
           {/* Our Journey - special layout */}
            {section.slug === "our-journey" ? (
              <div
                key={section.slug}
                className="relative flex flex-col md:flex-row items-center md:items-start md:gap-12 md:flex-row"
              >
                {/* Text Card */}
                <div
                  className="md:w-1/2 bg-white p-8 md:p-12 shadow-2xl z-10 relative hover:scale-105 transition-transform duration-300"
                  style={{ minHeight: "320px" }}
                >
                  <h2 className="text-4xl md:text-5xl leading-[1.3] font-bold mb-4 text-gray-800 animate-slideUp playfair text-gradient">
                    {section.title}
                  </h2>
                  <p className="text-gray-700 whitespace-pre-line">{section.content}</p>
                </div>

                {/* Image */}
                {section.banner?.image && (
                  <div
                    className="md:w-1/2 mt-8 md:mt-0 relative md:-top-8 md:-ml-16 overflow-hidden shadow-2xl flex-shrink-0 hover:scale-105 transition-transform duration-500"
                    style={{ minHeight: "320px" }}
                  >
                    <img
                      src={section.banner.image}
                      alt={section.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
              </div>
            ) : (
              <>
                {/* Fallback for other sections */}
                <h2 className="text-3xl font-bold mb-4 text-gray-800">{section.title}</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {section.content}
                </p>
              </>
            )}


            {/* Render nested sections: milestones, leadership, vision */}
            {section.sections && (
              <>
                {/* Milestones Section */}
                {"milestones" in section.sections && (
                  <div
                    id={section.sections.milestones.slug}
                    className="mt-16 bg-white p-8 border border-[#d2ab67] shadow-2xl hover:scale-105 transition-transform duration-500"
                  >
                    <h3 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 animate-slideUp playfair text-gradient">
                      {section.sections.milestones.title}
                    </h3>
                    <div className="space-y-6">
                      {Array.isArray(section.sections.milestones.content) &&
                        section.sections.milestones.content.map((item: string, idx: number) => {
                          const [year, ...rest] = item.split(":");
                          return (
                            <div
                              key={idx}
                              className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start"
                            >
                              {/* Left: Year */}
                              <div className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 animate-slideUp playfair text-gradient md:col-span-1">
                                {year}
                              </div>
                              {/* Right: Description */}
                              <div className="md:col-span-3 text-gray-700 leading-relaxed">
                                {rest.join(":").trim()}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}

                {/* Vision + Leadership Section */}
                <div className="mt-16 grid lg:grid-cols-2 gap-10">
                  {["vision", "leadership"].map((key) => {
                    const sub = section.sections?.[key];
                    if (!sub) return null;

                    return (
                      <div
                        key={key}
                        id={sub.slug}
                        className="relative flex flex-col hover:scale-105 transition-transform duration-500 h-full"
                      >
                        {/* Image */}
                        {sub.image && (
                          <div className="w-full relative h-64 overflow-hidden flex-shrink-0">
                            <img
                              src={sub.image}
                              alt={sub.title}
                              className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                            />
                          </div>
                        )}

                        {/* Text Card */}
                        <div className="w-full bg-white p-8 md:p-10 relative z-10 -mt-8 shadow-lg flex flex-col flex-grow">
                          <h3 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 animate-slideUp playfair text-gradient">{sub.title}</h3>
                          <p className="text-gray-700 leading-relaxed flex-grow">{sub.content}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

          </section>
        ))}
      </div>


    </section>
  );
}
