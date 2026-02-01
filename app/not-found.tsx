import Link from "next/link";
import { NextStepCard } from "@/components/NextSteps";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        {/* 404 图形 */}
        <div className="text-8xl md:text-9xl font-bold text-brand-primary mb-6">404</div>

        {/* 面包屑 */}
        <Breadcrumbs items={[{ label: "页面未找到", href: "/404" }]} />

        {/* 主标题 */}
        <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
          哎呀，页面走丢了
        </h1>

        {/* 描述 */}
        <p className="text-lg text-text-secondary mb-8">
          你好像来到了 OpenClaw 的数字虚空。
          <br />
          别担心，让我帮你找到回去的路。
        </p>

        {/* 搜索建议 */}
        <div className="glass-card p-6 mb-8 text-left">
          <h3 className="text-lg font-semibold text-text-primary mb-4">你可以试试：</h3>
          <ul className="space-y-3 text-text-secondary">
            <li className="flex items-center gap-3">
              <span className="text-brand-primary">•</span>
              <span>检查一下 URL 是否拼写正确</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-brand-primary">•</span>
              <span>使用导航栏探索我们的内容</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-brand-primary">•</span>
              <span>直接去 <Link href="/command-builder" className="text-brand-primary hover:underline">指令生成器</Link> 试试</span>
            </li>
          </ul>
        </div>

        {/* 返回按钮 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-primary hover:bg-brand-hover text-white font-medium rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            返回首页
          </Link>
          <Link
            href="/command-builder"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-background-tertiary hover:bg-background-elevated text-text-primary font-medium rounded-lg border border-white/10 transition-colors"
          >
            <span className="text-xl">🦞</span>
            试用指令生成器
          </Link>
        </div>
      </div>

      {/* 下一步推荐 */}
      <div className="mt-16">
        <NextStepCard
          icon="🎯"
          title="从快速开始入手"
          description="如果你是第一次来，建议先查看我们的快速开始指南，5 分钟即可部署 OpenClaw。"
          href="/quick-start"
          linkText="查看快速开始指南"
        />
      </div>
    </div>
  );
}
