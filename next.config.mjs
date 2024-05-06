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
      {
        protocol: "https",
        hostname: "**.googleusercontent.com",
        port: ""
      },
    ]
  },
  output: "standalone"
};

export default nextConfig;
