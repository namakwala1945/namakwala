import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Globe, ArrowRight } from "lucide-react";
import headerMenu from "@/locales/en/headerMenu.json";
import Image from "next/image";
import Link from "next/link";

function getFooterLinks() {
  return Object.values(headerMenu).filter(
    (menu: any) => menu.name === "About" || menu.name === "Businesses"
  );
}

const footerSections = [
  {
    title: "Important",
    links: [
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Legal Notice", href: "/legal-notice" },
      { name: "Fraud Alert", href: "/fraud-alert" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Our Catalogue", href: "/catalogue" },
      { name: "News & Media", href: "/news-mdia" },
      { name: "Contact Us", href: "/contact" },
      { name: "Blog", href: "/blog" },
      { name: "FAQs", href: "/faqs" },
    ],
  },
];

const socialLinks = [
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/yourpage" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com/yourpage" },
  { name: "Facebook", icon: Facebook, href: "https://facebook.com/yourpage" },
  { name: "Instagram", icon: Instagram, href: "https://instagram.com/yourpage" },
  { name: "YouTube", icon: Youtube, href: "https://youtube.com/yourpage" },
];

export default function Footer() {
  const footerMenus = getFooterLinks();
  return (
    <footer className="relative border-t border-border poppins overflow-hidden">
      {/* Main Footer Content */}
      <div className="w-auto relative mx-auto px-4 md:px-8 lg:px-12 py-16 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/assets/namakwala-footer.jpg"
            alt="Footer background"
            fill
            className="object-cover opacity-40 mix-blend-multiply"
            priority
          />
        </div>

        {/* Footer Sections */}
        <div className="grid md:grid-cols-4 gap-8 relative">
          {/* About */}
          {footerMenus
            .filter((menu: any) => menu.name === "About")
            .map((menu: any) => (
              <div key={menu.name}>
                <h4 className="text-lg font-semibold mb-4">{menu.name}</h4>
                <ul className="space-y-3">
                  {menu.content?.map((section: any) =>
                    section.categories.map((cat: any) => (
                      <li key={cat.slug}>
                        <Link
                          href={`/${menu.link.replace("/", "")}#${cat.slug}`}
                          scroll={true}
                          className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm flex items-center group"
                        >
                          {cat.title}
                          <ArrowRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                        </Link>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            ))}

          {/* Businesses */}
          {footerMenus
            .filter((menu: any) => menu.name === "Businesses")
            .map((menu: any) => (
              <div key={menu.name}>
                <h4 className="text-lg font-semibold mb-4">{menu.name}</h4>
                <ul className="space-y-3">
                  {menu.content.map((section: any) => (
                    <li key={section.slug}>
                      <Link
                        href={`/${section.slug}`}
                        scroll={true}
                        className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm flex items-center group"
                      >
                        {section.title}
                        <ArrowRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

          {/* Important */}
          {footerSections
            .filter((s) => s.title === "Important")
            .map((section) => (
              <div key={section.title}>
                <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm flex items-center group"
                      >
                        {link.name}
                        <ArrowRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

          {/* Resources */}
          {footerSections
            .filter((s) => s.title === "Resources")
            .map((section) => (
              <div key={section.title}>
                <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm flex items-center group"
                      >
                        {link.name}
                        <ArrowRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>

        {/* Social Links */}
        <div className="mt-12 text-center">
          <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
          <div className="flex justify-center space-x-6">
            {socialLinks.map((link, idx) => {
              const Icon = link.icon;
              return (
                <a
                  key={idx}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                >
                  <Icon className="w-6 h-6 text-gray-600 hover:text-primary transition-colors" />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border bg-muted/50">
        <div className="container mx-auto px-4 md:px-8 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} NAMAKWALA. All rights reserved.
            </div>
            <div className="flex items-center gap-6 text-sm">
              <a href="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="/term-service" className="text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="/export-terms" className="text-muted-foreground hover:text-primary transition-colors">
                Export Terms
              </a>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Globe className="w-4 h-4" />
                <span>Made in India</span>
                <span className="text-lg">🇮🇳</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
