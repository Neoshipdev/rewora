/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  /* NEXT_EXPORT=1 → statický HTML export do out/ (scripts/build-static.mjs) */
  output: process.env.NEXT_EXPORT ? 'export' : undefined,
  /* NEXT_EXPORT_BASE=/rewora → web beží v podpriečinku domény (GitHub Pages) */
  basePath: process.env.NEXT_EXPORT_BASE || undefined,
  assetPrefix: process.env.NEXT_EXPORT_BASE || undefined,
  /* URL adresy s koncovou lomkou — rovnako ako na rewora.com/sk/ */
  trailingSlash: true,
  /* Playwright beží v Node runtime, nebundlovať ho do serverových chunkov. */
  experimental: {
    serverComponentsExternalPackages: ['playwright', 'playwright-core'],
  },
  /* Web je zatiaľ len slovenský — koreň natrvalo presmerujeme na /sk/. */
  async redirects() {
    return [{ source: '/', destination: '/sk/', permanent: true }];
  },
};

export default nextConfig;
