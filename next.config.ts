const { i18n } = require('./next-i18next.config');

module.exports = {
  // output: "export", // 👈 required for static hosting
  images: {
    unoptimized: true, // 👈 needed because next/image needs optimization server
    domains: ["images.unsplash.com", "img.youtube.com"],
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "apeda.gov.in" }
    ],
  },
  i18n: {
    locales: ["en", "fr", "de", "ar", "ur", "af"],
    defaultLocale: "en",
  },
};
