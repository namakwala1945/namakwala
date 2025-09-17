import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";
import { Providers } from "./providers";
import ContentProtector from "./ContentProtector"; 

export const metadata = {
  title: {
    default: "Namakwala Group",
    template: "%s | Namakwala Group",
  },
  description: "Leading manufacturer & exporter of salts and minerals.",
  verification: {
    google: "your-google-verification-code",
  },
  viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon-large.webp", // optional iOS
  },
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
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Playfair+Display:wght@400;600;700&display=swap"
          rel="stylesheet"
        />

      </head>
      <body className="font-sans">
        {/* <ContentProtector /> */}
        <Header />
        <Providers>{children}</Providers>
        <Footer />
      </body>
    </html>
  );
}
