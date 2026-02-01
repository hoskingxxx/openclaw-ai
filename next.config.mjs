/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // 禁用 Turbopack（生产环境）
  experimental: {
    turbo: undefined,
  },

  // 压缩优化
  compress: true,

  // 图片优化
  images: {
    formats: ['image/avif', 'image/webp'],
  },

  // Force HTTPS in production
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
