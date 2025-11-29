/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com', 'platform-lookaside.fbsbx.com'],
  },
  async rewrites() {
    return [
      {
        source: '/:slug*',
        destination: '/artist/:slug*',
        has: [
          {
            type: 'host',
            value: '(?<subdomain>.*)\\.vervibe\\.art',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
