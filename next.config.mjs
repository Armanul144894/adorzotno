/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "medeasy.health",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "e7.pngegg.com",
      },
      {
        protocol: "https",
        hostname: "www.abbott.com.sg",
      },
      {
        protocol: "https",
        hostname: "www.tbsnews.net",
      },
      {
        protocol: "https",
        hostname: "www.merck.com",
      },
      {
        protocol: "https",
        hostname: "mms.businesswire.com",
      },
      {
        protocol: "https",
        hostname: "6a3d28ac.delivery.rocketcdn.me",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "amgen.wd1.myworkdayjobs.com",
      },
    ],
  },
};

export default nextConfig;
