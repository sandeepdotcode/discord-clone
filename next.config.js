/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      "mbawkqeeqdrjvcumcyae.supabase.co"
    ]
  }
}

module.exports = nextConfig
