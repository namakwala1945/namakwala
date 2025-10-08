import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import ClientComponents from "./ClientComponents"; // client-only wrapper
import { Playfair_Display, Poppins } from "next/font/google";
import Script from "next/script";

// Fonts
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-playfair",
  display: "swap",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-poppins",
  display: "swap",
});

// ✅ Server-side metadata
export const metadata: Metadata = {
  title:
    "Best Salt's Exporter in India | Best Mineral's Exporter in India | NAMAKWALA",
  description:
    "NAMAKWALA – The Best Salt's Exporter in India & Best Mineral's Exporter in India, delivering pure, high-quality salts & minerals worldwide with trust.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
       {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-W28M4F5C');
          `}
        </Script>
      </head>
      <body
        className={`${poppins.variable} ${playfair.variable} font-poppins font-playfair cursor-none`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W28M4F5C"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <ClientComponents /> {/* client-only features */}
        <Header />
        <Providers>{children}</Providers>
        <Footer />
      </body>
    </html>
  );
}
