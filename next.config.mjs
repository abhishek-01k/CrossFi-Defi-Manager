/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/profile', // Change to the route you want to redirect to
        permanent: true, // Set to `true` for a 308 permanent redirect, or `false` for a 307 temporary redirect
      },
    ];
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // This allows any hostname
        port: '',
        pathname: '/**', // This allows any path
      },
    ],
  },
  experimental: {
    appDir: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
}

export default nextConfig
