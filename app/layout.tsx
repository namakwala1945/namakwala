import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import CustomCursor from "../components/Cursor"; // ✅ Import cursor

export const metadata: Metadata = {
  title: "Best Salt's Exporter in India | Best Mineral's Exporter in India | NAMAKWALA", // ✅ Default title
  description: "NAMAKWALA – The Best Salt's Exporter in India & Best Mineral's Exporter in India, delivering pure, high-quality salts & minerals worldwide with trust.",
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
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Poppins:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-poppins font-playfair cursor-none">
        <CustomCursor /> {/* ✅ Add custom cursor here */}
        <Header />
        <Providers>{children}</Providers>
        <Footer />
      </body>
    </html>
  );
}
