import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { VideoWithNotes } from "@/components/VideoWithNotes";
import { NextStepCard } from "@/components/NextSteps";
import { videoTutorials } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OpenClaw 视频教程 - 精选指令实战与笔记",
  description: "收录全网最优质 OpenClaw 教程，并附带独家指令提取笔记。边看边学，每个视频都配有可复制的命令和配置。",
  openGraph: {
    title: "OpenClaw 视频教程 - 精选指令实战与笔记",
    description: "收录全网最优质 OpenClaw 教程，并附带独家指令提取笔记。",
    url: "https://openclaw-ai.org/videos",
  },
};

export default function VideosPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        {/* 面包屑 */}
        <div className="max-w-7xl mx-auto px-6 pt-8">
          <Breadcrumbs items={[{ label: "视频教程", href: "/videos" }]} />
        </div>

        {/* 页面标题 */}
        <section className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            视频教程
          </h1>
          <p className="text-xl text-text-secondary">
            边看边学，每个视频都附带可复制的命令和配置
          </p>
        </section>

        {/* 视频列表 */}
        <section className="max-w-7xl mx-auto px-6 pb-12">
          <div className="grid grid-cols-1 gap-8">
            {videoTutorials.map((video) => (
              <VideoWithNotes key={video.id} video={video} />
            ))}
          </div>
        </section>

        {/* 下一步推荐 */}
        <NextStepCard
          icon="🎯"
          title="试试你刚学的命令"
          description="使用指令生成器，输入你的目标，自动生成 OpenClaw 标准指令模板。"
          href="/command-builder"
          linkText="打开指令生成器"
        />
      </main>
      <Footer />
    </>
  );
}
