/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
      NEXT_PUBLIC_BASE_URL: process.env.BASE_URL, // Variabel lingkungan tersedia di sisi server dan klien
    },
  };
  
  module.exports = nextConfig;
  