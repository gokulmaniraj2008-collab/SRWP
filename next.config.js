/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow Google Fonts and Supabase image domains
  images: {
    domains: [
      "lh3.googleusercontent.com", // Google profile photos
      "supabase.co",
    ],
  },
};

module.exports = nextConfig;
