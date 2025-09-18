import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: {
    default: "Namakwala Group",
    template: "%s | Namakwala Group",
  },
  description: "Leading manufacturer & exporter of salts and minerals.",
  metadataBase: new URL("https://namakwala.in"), // ✅ Add this
  verification: {
    google: "your-google-verification-code",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon-large.webp",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Mobile viewport optimization */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        {/* Google Fonts CDN */}
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Poppins:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-poppins font-playfair">
        {/* <ContentProtector /> */}
        <Header />
        <Providers>{children}</Providers>
        <Footer />
      </body>
    </html>
  );
}
