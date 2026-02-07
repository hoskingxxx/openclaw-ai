/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],

  // SEO: 禁用尾部斜杠，避免权重分散
  trailingSlash: false,

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
