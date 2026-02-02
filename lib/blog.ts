// Blog post type definitions
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

// Blog post metadata (extracted from frontmatter)
export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-use-deepseek-with-openclaw",
    title: "Running OpenClaw with DeepSeek R1: The Unofficial, Battle-Tested Guide",
    description: "An honest, no-BS guide to running OpenClaw with DeepSeek R1. What works, what crashes, and why your laptop is not enough.",
    date: "2026-02-01",
    author: "LazyDev",
    tags: ["DeepSeek", "OpenClaw", "Tutorial", "Local Deployment"],
    category: "Tutorial",
    featured: true,
    seoKeywords: ["DeepSeek R1", "OpenClaw configuration", "Local LLM setup", "Hardware requirements"],
  },
];
