/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.s3.amazonaws.com",
        port: ""
      },
      {
        protocol: "https",
        hostname: "d4yfqrpu425xz.cloudfront.net",
        port: ""
      },
    ]
  }
};

export default nextConfig;
