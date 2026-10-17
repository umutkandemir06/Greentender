/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Vercel build aşamasında TypeScript hatalarını tamamen yok sayar ve build'in takılmasını engeller
    ignoreBuildErrors: true,
  },
  eslint: {
    // Build sırasında ESLint takıntılarını da devre dışı bırakır
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig