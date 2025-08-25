/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/web-portfolio",
  assetPrefix: "/web-portfolio/",
};

module.exports = nextConfig;
