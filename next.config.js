/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'api.ts'],
  images: {
    domains: ['cloudflare-ipfs.com', 'images.unsplash.com', 'dummyimage.com'],
  },
};
