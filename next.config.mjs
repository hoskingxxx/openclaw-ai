/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],

  // 301 重定向
  async redirects() {
    return [
      {
        source: '/blog/:slug*',
        destination: '/guides/:slug*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
