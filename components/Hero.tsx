import { Button } from "./ui/Button";

export function Hero() {
  return (
    <section className="hero-container relative min-h-screen flex items-center justify-center px-6 py-20">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-muted/20 to-transparent pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl pointer-events-none" />

      {/* 主内容区 */}
      <div className="hero-content relative z-10 max-w-4xl mx-auto text-center">
        {/* 标签 */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-muted/30 border border-brand-primary/30 mb-8">
          <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
          <span className="text-sm text-text-primary">开源 AI Agent 框架</span>
        </div>

        {/* 主标题 */}
        <h1 className="text-5xl md:text-7xl font-bold text-text-primary mb-6 leading-tight">
          不是聊天机器人
          <br />
          <span className="text-brand-primary">而是你的 AI 员工</span>
        </h1>

        {/* 副标题 */}
        <p className="text-xl md:text-2xl text-text-secondary mb-12 max-w-2xl mx-auto">
          你给目标，它负责拆解、执行、汇报
        </p>

        {/* CTA 按钮组 - 全部指向站内内容 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button variant="primary" size="lg" href="/quick-start">
            快速开始 (5分钟)
          </Button>
          <Button variant="secondary" size="lg" href="/use-cases">
            查看 6 大玩法
          </Button>
        </div>

        {/* 核心特性预览 */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="glass-card p-4 rounded-lg">
            <div className="text-brand-primary text-2xl mb-2">⚡</div>
            <h4 className="text-text-primary font-semibold mb-1">本地执行</h4>
            <p className="text-sm text-text-secondary">部署在你自己的设备上，隐私安全可控</p>
          </div>
          <div className="glass-card p-4 rounded-lg">
            <div className="text-brand-primary text-2xl mb-2">🎯</div>
            <h4 className="text-text-primary font-semibold mb-1">目标驱动</h4>
            <p className="text-sm text-text-secondary">给目标不是给提示词，它自己拆步骤执行</p>
          </div>
          <div className="glass-card p-4 rounded-lg">
            <div className="text-brand-primary text-2xl mb-2">🔌</div>
            <h4 className="text-text-primary font-semibold mb-1">多平台支持</h4>
            <p className="text-sm text-text-secondary">WhatsApp、Telegram、Slack、Discord 等</p>
          </div>
        </div>
      </div>
    </section>
  );
}
