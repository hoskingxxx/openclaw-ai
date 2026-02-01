import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CommandBuilder } from "@/components/CommandBuilder";
import { NextStepCard } from "@/components/NextSteps";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OpenClaw 指令生成器 - 自动生成标准指令模板",
  description: "输入你的目标，自动生成 OpenClaw 标准指令模板。支持预设模板：修复 Bug、数据处理、SEO 内容生成等，一键复制即可使用。",
  openGraph: {
    title: "OpenClaw 指令生成器 - 自动生成标准指令模板",
    description: "输入目标，自动生成 OpenClaw 标准指令模板，一键复制即可使用。",
    url: "https://openclaw-ai.org/command-builder",
  },
};

export default function CommandBuilderPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        {/* 面包屑 */}
        <div className="max-w-7xl mx-auto px-6 pt-8">
          <Breadcrumbs items={[{ label: "指令生成器", href: "/command-builder" }]} />
        </div>

        {/* 指令生成器组件 */}
        <CommandBuilder />

        {/* 下一步推荐 */}
        <div className="mt-12">
          <NextStepCard
            icon="🎬"
            title="观看视频教程"
            description="看看其他用户是如何使用 OpenClaw 的，每个视频都配有可复制的命令。"
            href="/videos"
            linkText="查看视频教程"
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
