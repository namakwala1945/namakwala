const { i18n } = require('./next-i18next.config');

module.exports = {
  images: {
    unoptimized: true,
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
  eslint: {
    ignoreDuringBuilds: true,
  },
};
