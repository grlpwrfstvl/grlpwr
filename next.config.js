/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {root: __dirname},
  // Workshops are events now
  async redirects() {
    return [{source: '/workshop/:slug', destination: '/events/:slug', permanent: true}]
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [{protocol: 'https', hostname: 'cdn.sanity.io'}],
  },
}

module.exports = nextConfig
