import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  basePath: process.env.BASE_PATH ?? '',
  images: { unoptimized: true },
  experimental: { reactCompiler: true }
}

export default nextConfig
