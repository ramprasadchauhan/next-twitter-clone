/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "help.twitter.com",
      },
      {
        protocol: "https",
        hostname: "media.licdn.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.cnbctv18.com",
      },
      {
        protocol: "https",
        hostname: "images.moneycontrol.com",
      },
      {
        protocol: "https",
        hostname: "images.hindustantimes.com",
      },
    ],
  },
};

export default nextConfig;
