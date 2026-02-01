import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { NextStepCard } from "@/components/NextSteps";
import { faqs, commandTemplates } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OpenClaw 常见问题 FAQ - 安装配置使用疑难解答",
  description: "OpenClaw 安装、配置、模型选择、平台接入等常见问题解答。包含快速指令模板和使用场景速查。",
  openGraph: {
    title: "OpenClaw 常见问题 FAQ - 安装配置使用疑难解答",
    description: "OpenClaw 安装、配置、模型选择、平台接入等常见问题解答。",
    url: "https://openclaw-ai.org/faq",
  },
};

// 目录数据
const tocItems = faqs.map((cat) => ({
  id: cat.category.replace(/\s+/g, "-").toLowerCase(),
  label: cat.category,
}));

export default function FAQPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        {/* 面包屑 */}
        <div className="max-w-4xl mx-auto px-6 pt-8">
          <Breadcrumbs items={[{ label: "常见问题", href: "/faq" }]} />
        </div>

        {/* 页面标题 */}
        <section className="max-w-4xl mx-auto px-6 py-8">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            常见问题
          </h1>
          <p className="text-xl text-text-secondary">
            关于 OpenClaw 的常见疑问解答
          </p>
        </section>

        {/* FAQ 列表 */}
        <section className="max-w-4xl mx-auto px-6 pb-12">
          <div className="space-y-8">
            {faqs.map((category) => (
              <div
                key={category.category}
                id={category.category.replace(/\s+/g, "-").toLowerCase()}
                className="scroll-mt-24"
              >
                <h2 className="text-2xl font-bold text-text-primary mb-6">
                  {category.category}
                </h2>
                <div className="space-y-4">
                  {category.questions.map((item, index) => (
                    <details
                      key={index}
                      className="group glass-card"
                    >
                      <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-white/5 transition-colors">
                        <h3 className="text-lg font-medium text-text-primary pr-4">
                          {item.q}
                        </h3>
                        <svg
                          className="w-5 h-5 text-text-secondary flex-shrink-0 group-open:rotate-180 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </summary>
                      <div className="px-6 pb-6">
                        <div className="pt-4 border-t border-white/10">
                          <p className="text-text-secondary whitespace-pre-line">{item.a}</p>
                        </div>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 指令模板预览 */}
        <section className="max-w-4xl mx-auto px-6 pb-12">
          <div className="glass-card p-8">
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              💡 快速指令模板
            </h2>
            <p className="text-text-secondary mb-6">
              使用这些预设模板快速开始，或去指令生成器自定义你的命令。
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {commandTemplates.map((template) => (
                <div
                  key={template.id}
                  className="p-4 bg-background-tertiary rounded-lg border border-white/5 hover:border-brand-primary/30 transition-colors"
                >
                  <div className="text-2xl mb-2">{template.icon}</div>
                  <div className="text-text-primary font-medium">{template.title}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 下一步推荐 */}
        <NextStepCard
          icon="📋"
          title="查看完整速查表"
          description="掌握 OpenClaw 的 6 大玩法、万能指令模板和安全指南。"
          href="/use-cases"
          linkText="查看使用场景"
        />
      </main>
      <Footer />
    </>
  );
}
