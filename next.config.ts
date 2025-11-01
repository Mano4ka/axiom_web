/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/axiom_web',
  assetPrefix: '/axiom_web',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};


module.exports = nextConfig;