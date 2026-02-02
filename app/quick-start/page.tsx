import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TableOfContents, MobileTableOfContents } from "@/components/TableOfContents";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quick Start - OpenClaw Setup Guide",
  description: "Get OpenClaw running with DeepSeek R1. Two paths: DeepSeek API or local Ollama.",
  openGraph: {
    title: "Quick Start - OpenClaw Setup Guide",
    description: "Get OpenClaw running with DeepSeek R1.",
    url: "https://openclaw-ai.org/quick-start",
  },
};

const tocItems = [
  { id: "requirements", label: "Requirements" },
  { id: "option-api", label: "Option 1: DeepSeek API" },
  { id: "option-local", label: "Option 2: Local Ollama" },
];

export default function QuickStartPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        {/* Breadcrumbs */}
        <div className="max-w-4xl mx-auto px-6 pt-8">
          <Breadcrumbs items={[{ label: "Quick Start", href: "/quick-start" }]} />
        </div>

        {/* Page Title */}
        <section className="max-w-4xl mx-auto px-6 py-8">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Quick Start
          </h1>
          <p className="text-xl text-text-secondary">
            Get OpenClaw running with DeepSeek R1
          </p>
          <p className="text-sm text-text-tertiary mt-2">
            Two paths: Cloud API (fastest) or Local Ollama (free but hardware-dependent)
          </p>

          {/* Mobile TOC */}
          <MobileTableOfContents items={tocItems} />
        </section>

        {/* Content + Sidebar */}
        <div className="max-w-7xl mx-auto px-6 pb-12 lg:flex lg:gap-12">
          <div className="lg:flex-1 min-w-0">
            {/* Requirements */}
            <section id="requirements" className="mb-12 scroll-mt-24">
              <div className="glass-card p-6">
                <h2 className="text-2xl font-semibold text-text-primary mb-4">Requirements</h2>
                <ul className="space-y-2 text-text-secondary">
                  <li>✅ macOS / Linux / Windows (WSL2 recommended)</li>
                  <li>✅ Node.js ≥22</li>
                  <li>✅ DeepSeek API key <span className="text-text-tertiary">(for Option 1)</span></li>
                  <li>✅ 16GB+ RAM <span className="text-text-tertiary">(for Option 2)</span></li>
                </ul>
                <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded">
                  <p className="text-sm text-yellow-200">
                    <strong>⚠️ Hardware Warning:</strong> Local DeepSeek R1 requires significant VRAM. Read the <Link href="/oom" className="underline">OOM Error Guide</Link> first.
                  </p>
                </div>
              </div>
            </section>

            {/* Option 1: DeepSeek API */}
            <section id="option-api" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl font-semibold text-text-primary mb-6">
                Option 1: DeepSeek API (Recommended)
              </h2>
              <p className="text-text-secondary mb-6">
                Fastest path to get started. No hardware requirements beyond a basic computer.
              </p>

              <div className="space-y-6">
                {/* Step 1 */}
                <div className="glass-card p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary">Install OpenClaw</h3>
                      <p className="text-sm text-text-secondary">Install via npm</p>
                    </div>
                  </div>
                  <div className="bg-[#0d1117] rounded p-4 overflow-x-auto">
                    <pre className="text-sm text-green-400">
                      <code>npm install -g openclaw@latest</code>
                    </pre>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="glass-card p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary">Get API Key</h3>
                      <p className="text-sm text-text-secondary">Sign up at DeepSeek</p>
                    </div>
                  </div>
                  <p className="text-sm text-text-secondary mb-4">
                    Visit <a href="https://www.deepseek.com/" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">deepseek.com</a> to get your API key.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="glass-card p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary">Configure OpenClaw</h3>
                      <p className="text-sm text-text-secondary">Create .env file</p>
                    </div>
                  </div>
                  <div className="bg-[#0d1117] rounded p-4 overflow-x-auto">
                    <pre className="text-sm text-gray-100">
                      <code>{`# .env file (keep this local, never commit)
LLM_PROVIDER="openai"
LLM_BASE_URL="https://api.deepseek.com/v1"
LLM_API_KEY="ds-your-api-key-here"
LLM_MODEL="deepseek-reasoner"`}</code>
                    </pre>
                  </div>
                  <p className="text-xs text-text-tertiary mt-3">
                    🔒 <strong>SECURITY:</strong> Keep your .env file local. Never commit API keys to git.
                  </p>
                </div>

                {/* Step 4 */}
                <div className="glass-card p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                      4
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary">Run OpenClaw</h3>
                      <p className="text-sm text-text-secondary">Start the agent</p>
                    </div>
                  </div>
                  <div className="bg-[#0d1117] rounded p-4 overflow-x-auto">
                    <pre className="text-sm text-green-400">
                      <code>openclaw start</code>
                    </pre>
                  </div>
                </div>
              </div>
            </section>

            {/* Option 2: Local Ollama */}
            <section id="option-local" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl font-semibold text-text-primary mb-6">
                Option 2: Local Ollama (Free)
              </h2>
              <p className="text-text-secondary mb-6">
                Run DeepSeek R1 locally using Ollama. Requires 16GB+ RAM for usable performance.
              </p>

              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded">
                <p className="text-sm text-red-200">
                  <strong>⚠️ Hardware Warning:</strong> Full DeepSeek R1 requires 40GB+ VRAM. Use quantized versions (7B/8B) for consumer hardware.
                </p>
              </div>

              <div className="space-y-6">
                {/* Step 1 */}
                <div className="glass-card p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary">Install Ollama</h3>
                      <p className="text-sm text-text-secondary">Download from ollama.com</p>
                    </div>
                  </div>
                  <p className="text-sm text-text-secondary mb-4">
                    Visit <a href="https://ollama.com/" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">ollama.com</a> to install.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="glass-card p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary">Pull DeepSeek Model</h3>
                      <p className="text-sm text-text-secondary">Download quantized version</p>
                    </div>
                  </div>
                  <div className="bg-[#0d1117] rounded p-4 overflow-x-auto">
                    <pre className="text-sm text-green-400">
                      <code># 8B version (fits in 16GB RAM)
ollama pull deepseek-r1:8b

# OR 1.5B version (fits in 8GB RAM, limited capability)
ollama pull deepseek-r1:1.5b</code>
                    </pre>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="glass-card p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary">Configure OpenClaw</h3>
                      <p className="text-sm text-text-secondary">Point to local Ollama</p>
                    </div>
                  </div>
                  <div className="bg-[#0d1117] rounded p-4 overflow-x-auto">
                    <pre className="text-sm text-gray-100">
                      <code>{`# .env file for local Ollama
LLM_PROVIDER="ollama"
LLM_BASE_URL="http://localhost:11434/v1"
LLM_MODEL="deepseek-r1:8b"`}</code>
                    </pre>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="glass-card p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                      4
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary">Start OpenClaw</h3>
                      <p className="text-sm text-text-secondary">Run with local model</p>
                    </div>
                  </div>
                  <div className="bg-[#0d1117] rounded p-4 overflow-x-auto">
                    <pre className="text-sm text-green-400">
                      <code>openclaw start</code>
                    </pre>
                  </div>
                </div>
              </div>

              <div className="mt-6 glass-card p-4">
                <p className="text-sm text-text-secondary mb-2">
                  <strong>📖 Performance Reality Check:</strong>
                </p>
                <ul className="text-sm text-text-secondary space-y-1">
                  <li>• MacBook M2 (16GB): ~3 tokens/sec (very slow)</li>
                  <li>• RTX 4090 (24GB): ~45 tokens/sec (usable)</li>
                  <li>• Cloud A100: ~110 tokens/sec (instant)</li>
                </ul>
                <p className="text-xs text-text-tertiary mt-3">
                  If local performance is poor, consider <Link href="/resources" className="text-brand-primary hover:underline">renting a GPU</Link>.
                </p>
              </div>
            </section>
          </div>

          {/* Sidebar TOC */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <TableOfContents items={tocItems} />
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
