/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
