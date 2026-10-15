/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {root: __dirname},
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [{protocol: 'https', hostname: 'cdn.sanity.io'}],
  },
}

module.exports = nextConfig
