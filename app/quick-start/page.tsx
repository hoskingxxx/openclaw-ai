import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TableOfContents, MobileTableOfContents } from "@/components/TableOfContents";
import { NextStepCard } from "@/components/NextSteps";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { installSteps, supportedChannels, supportedModels } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OpenClaw 快速开始 - 5 分钟部署你的 AI 员工",
  description: "只需 3 步即可完成 OpenClaw 部署。支持 Node.js ≥22、Anthropic Claude / OpenAI GPT 模型、WhatsApp / Telegram / Slack 等 13+ 平台。",
  openGraph: {
    title: "OpenClaw 快速开始 - 5 分钟部署你的 AI 员工",
    description: "只需 3 步即可完成 OpenClaw 部署，支持 13+ 平台。",
    url: "https://openclaw-ai.org/quick-start",
  },
};

// 目录数据
const tocItems = [
  { id: "requirements", label: "系统要求" },
  { id: "install", label: "安装步骤" },
  { id: "models", label: "模型配置" },
  { id: "platforms", label: "支持的平台" },
];

export default function QuickStartPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        {/* 面包屑 */}
        <div className="max-w-4xl mx-auto px-6 pt-8">
          <Breadcrumbs items={[{ label: "快速开始", href: "/quick-start" }]} />
        </div>

        {/* 页面标题 */}
        <section className="max-w-4xl mx-auto px-6 py-8">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            快速开始
          </h1>
          <p className="text-xl text-text-secondary">
            5 分钟部署你的 AI 员工
          </p>

          {/* 移动端目录 */}
          <MobileTableOfContents items={tocItems} />
        </section>

        {/* 内容区域 + 侧边栏 */}
        <div className="max-w-7xl mx-auto px-6 pb-12 lg:flex lg:gap-12">
          <div className="lg:flex-1 min-w-0">
            {/* 系统要求 */}
            <section id="requirements" className="mb-12 scroll-mt-24">
              <div className="glass-card p-6">
                <h2 className="text-2xl font-semibold text-text-primary mb-4">系统要求</h2>
                <ul className="space-y-2 text-text-secondary">
                  <li>✅ macOS / Linux / Windows (WSL2 强烈推荐)</li>
                  <li>✅ Node.js ≥22</li>
                  <li>✅ 一个 LLM API Key（Anthropic 或 OpenAI）</li>
                </ul>
              </div>
            </section>

            {/* 安装步骤 */}
            <section id="install" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl font-semibold text-text-primary mb-6">安装步骤</h2>
              <div className="space-y-6">
                {installSteps.map((step, index) => (
                  <div key={index} className="glass-card p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-text-primary">{step.title}</h3>
                        <p className="text-sm text-text-secondary">{step.description}</p>
                      </div>
                    </div>
                    <CodeBlock code={Object.values(step.commands).join("\n\n")} />
                  </div>
                ))}
              </div>
            </section>

            {/* 模型配置 */}
            <section id="models" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl font-semibold text-text-primary mb-6">模型配置</h2>
              <div className="glass-card p-6">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-brand-primary/20 text-brand-primary rounded text-sm font-medium mb-2">
                    推荐
                  </span>
                  <p className="text-text-primary font-semibold">
                    {supportedModels.recommended.provider} - {supportedModels.recommended.models.join(", ")}
                  </p>
                  <p className="text-sm text-text-secondary mt-1">{supportedModels.recommended.reason}</p>
                </div>
                <div className="space-y-3 mt-6">
                  {supportedModels.providers.map((provider, index) => (
                    <div key={index} className="border-t border-white/10 pt-3">
                      <p className="text-text-primary font-medium">{provider.name}</p>
                      <p className="text-sm text-text-secondary">认证: {provider.auth}</p>
                      <p className="text-sm text-text-secondary">模型: {provider.models}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 支持的平台 */}
            <section id="platforms" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl font-semibold text-text-primary mb-6">支持的平台</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="glass-card p-4">
                  <h3 className="text-text-primary font-medium mb-2">主流平台</h3>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    {supportedChannels.mainstream.map((channel) => (
                      <li key={channel}>• {channel}</li>
                    ))}
                  </ul>
                </div>
                <div className="glass-card p-4">
                  <h3 className="text-text-primary font-medium mb-2">扩展平台</h3>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    {supportedChannels.extended.map((channel) => (
                      <li key={channel}>• {channel}</li>
                    ))}
                  </ul>
                </div>
                <div className="glass-card p-4">
                  <h3 className="text-text-primary font-medium mb-2">语音支持</h3>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    {supportedChannels.voice.map((channel) => (
                      <li key={channel}>• {channel}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </div>

          {/* 侧边栏目录 */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <TableOfContents items={tocItems} />
            </div>
          </aside>
        </div>

        {/* 下一步推荐 */}
        <NextStepCard
          icon="🎬"
          title="观看视频教程"
          description="通过视频学习 OpenClaw 的实际应用，每个视频都配有可复制的命令。"
          href="/videos"
          linkText="查看视频教程"
        />
      </main>
      <Footer />
    </>
  );
}
