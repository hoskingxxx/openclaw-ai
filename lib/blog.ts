// 博客文章类型定义
export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  category: string;
  featured: boolean;
  seoKeywords: string[];
}

// 文章元数据（从 frontmatter 提取）
export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-use-deepseek-with-openclaw",
    title: "如何使用 DeepSeek R1 驱动 OpenClaw：零成本打造本地最强 AI 员工",
    description: "Claude API 太贵？试试免费的 DeepSeek R1。本文手把手教你配置 DeepSeek 驱动 OpenClaw，实现零成本本地 AI 员工。",
    date: "2026-02-01",
    author: "OpenClaw 中文社区",
    tags: ["DeepSeek", "教程", "本地部署", "成本优化"],
    category: "教程",
    featured: true,
    seoKeywords: ["DeepSeek R1", "OpenClaw tutorial", "Local LLM Agent", "DeepSeek API setup"],
  },
];
