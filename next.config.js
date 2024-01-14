/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ["randomuser.me", "images.unsplash.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.dummyapi.io",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
