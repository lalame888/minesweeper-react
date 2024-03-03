/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  output: isProd ? 'export' : undefined,
  reactStrictMode: true,
  distDir: 'dist',
  basePath: isProd ? '/minesweeper-react' : undefined,
  assetPrefix: isProd
    ? 'https://lalame888.github.io/minesweeper-react/'
    : undefined
}

export default nextConfig
