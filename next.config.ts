/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // <-- this replaces `next export`
  images: {
    unoptimized: true, // needed for GitHub Pages, disables Image Optimization
  },
  basePath: "", // if deploying to subpath (e.g. /portfolio), set it here
};

module.exports = nextConfig;
