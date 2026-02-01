import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { NextStepCard } from "@/components/NextSteps";
import { blogPosts } from "@/lib/blog";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OpenClaw 博客 - 教程、案例和最佳实践",
  description: "深入学习 OpenClaw 的使用技巧、部署教程、实战案例和最新动态。DeepSeek、本地部署、AI Agent 架构解析。",
  openGraph: {
    title: "OpenClaw 博客 - 教程、案例和最佳实践",
    description: "深入学习 OpenClaw 的使用技巧、部署教程、实战案例和最新动态。",
    url: "https://openclaw-ai.org/blog",
  },
};

export default function BlogPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        {/* 面包屑 */}
        <div className="max-w-7xl mx-auto px-6 pt-8">
          <Breadcrumbs items={[{ label: "博客", href: "/blog" }]} />
        </div>

        {/* 页面标题 */}
        <section className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            OpenClaw 博客
          </h1>
          <p className="text-xl text-text-secondary">
            教程、案例和最佳实践
          </p>
        </section>

        {/* 特色文章 */}
        {blogPosts.filter((post) => post.featured).length > 0 && (
          <section className="max-w-7xl mx-auto px-6 pb-12">
            <h2 className="text-2xl font-bold text-text-primary mb-6">精选文章</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.filter((post) => post.featured).map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="glass-card p-6 hover:bg-white/12 transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 text-xs font-medium bg-brand-primary/20 text-brand-primary rounded">
                      热门
                    </span>
                    <span className="text-xs text-text-tertiary">{post.date}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary mb-2 group-hover:text-brand-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-text-secondary mb-4 line-clamp-2">
                    {post.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-background-tertiary text-text-secondary rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 所有文章 */}
        <section className="max-w-7xl mx-auto px-6 pb-12">
          <h2 className="text-2xl font-bold text-text-primary mb-6">全部文章</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="glass-card p-6 hover:bg-white/12 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs text-text-tertiary">{post.date}</span>
                  <span className="px-2 py-1 text-xs bg-background-tertiary text-text-secondary rounded">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-2 group-hover:text-brand-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-text-secondary mb-4 line-clamp-2">
                  {post.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs bg-background-tertiary text-text-secondary rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 下一步推荐 */}
        <NextStepCard
          icon="🛠️"
          title="查看资源推荐"
          description="精选 VPS、API 和工具推荐，帮你快速搭建 OpenClaw 环境。"
          href="/resources"
          linkText="查看推荐资源"
        />
      </main>
      <Footer />
    </>
  );
}
