import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { NextStepCard } from "@/components/NextSteps";
import { useCases } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OpenClaw 6 大实用玩法 - 使用场景速查表",
  description: "从独立开发者到创业者，从运维到内容创作。AI 程序员、自动化运维、SEO 内容生成、数据分析等 6 大实用场景，附可复制指令模板。",
  openGraph: {
    title: "OpenClaw 6 大实用玩法 - 使用场景速查表",
    description: "从独立开发者到创业者，从运维到内容创作，6 大实用场景，附可复制指令模板。",
    url: "https://openclaw-ai.org/use-cases",
  },
};

// 目录数据
const tocItems = useCases.map((uc) => ({
  id: uc.id,
  label: uc.title,
}));

export default function UseCasesPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        {/* 面包屑 */}
        <div className="max-w-7xl mx-auto px-6 pt-8">
          <Breadcrumbs items={[{ label: "使用场景", href: "/use-cases" }]} />
        </div>

        {/* 页面标题 */}
        <section className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            6 大实用玩法
          </h1>
          <p className="text-xl text-text-secondary">
            从独立开发者到创业者，从运维到内容创作，总有一款适合你
          </p>
        </section>

        {/* 用例列表 */}
        <section className="max-w-7xl mx-auto px-6 pb-12">
          <div className="space-y-8">
            {useCases.map((useCase, index) => (
              <div
                key={useCase.id}
                id={useCase.id}
                className="glass-card p-8 scroll-mt-24"
              >
                <div className="flex items-start gap-6">
                  {/* 图标 */}
                  <div className="text-6xl flex-shrink-0">{useCase.icon}</div>

                  {/* 内容 */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h2 className="text-2xl font-bold text-text-primary">{useCase.title}</h2>
                      {useCase.popular && (
                        <span className="px-3 py-1 text-sm font-medium bg-brand-primary/20 text-brand-primary rounded">
                          🔥 最火
                        </span>
                      )}
                      {useCase.advanced && (
                        <span className="px-3 py-1 text-sm font-medium bg-background-elevated text-text-tertiary rounded">
                          进阶
                        </span>
                      )}
                    </div>

                    <p className="text-text-secondary mb-4">{useCase.description}</p>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-text-primary mb-2">适合谁：</h4>
                      <div className="flex flex-wrap gap-2">
                        {useCase.audience.map((audience) => (
                          <span
                            key={audience}
                            className="px-3 py-1 text-sm bg-background-tertiary text-text-secondary rounded"
                          >
                            {audience}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-text-primary mb-2">示例指令：</h4>
                      <CodeBlock code={useCase.exampleCommand} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 下一步推荐 */}
        <NextStepCard
          icon="🎯"
          title="生成你的第一条指令"
          description="使用指令生成器，根据你的需求自动生成 OpenClaw 标准指令模板。"
          href="/command-builder"
          linkText="打开指令生成器"
        />
      </main>
      <Footer />
    </>
  );
}
