import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fixing DeepSeek R1 CUDA Out of Memory (OOM) Errors",
  description: "Solutions for CUDA out of memory errors when running DeepSeek R1. Quantization, VPS options, and hardware requirements explained.",
  openGraph: {
    title: "Fixing DeepSeek R1 CUDA Out of Memory (OOM) Errors",
    description: "Solutions for CUDA out of memory errors when running DeepSeek R1.",
    url: "https://openclaw-ai.org/oom",
  },
};

export default function OOMPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-16">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link href="/" className="text-sm text-text-tertiary hover:text-text-primary transition-colors">
              ← Back Home
            </Link>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
            Fixing DeepSeek R1 CUDA Out of Memory (OOM) Errors
          </h1>

          <p className="text-lg text-text-secondary mb-12">
            You tried to run DeepSeek R1 and got an OOM error. Here's what's happening and how to fix it.
          </p>

          {/* The Error */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-text-primary mb-4">
              The Error You're Seeing
            </h2>
            <div className="bg-[#0d1117] rounded-lg overflow-hidden border border-red-500/30">
              <div className="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-white/10">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-2 text-xs text-gray-400 font-mono">terminal</span>
              </div>
              <pre className="p-4 overflow-x-auto">
                <code className="text-sm text-red-300 font-mono leading-relaxed">
{`torch.cuda.OutOfMemoryError: CUDA out of memory. Tried to allocate 14.20 GiB (GPU 0; 8.00 GiB total capacity; 6.42 GiB already allocated; 102.00 MiB free)`}
                </code>
              </pre>
            </div>
          </section>

          {/* Why */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-text-primary mb-4">
              Why This Happens
            </h2>
            <div className="glass-card p-6">
              <p className="text-text-secondary mb-4">
                DeepSeek R1 (full 671B version) requires approximately <strong className="text-white">40GB+ of VRAM</strong> to run at full precision.
              </p>
              <p className="text-text-secondary mb-4">
                Your GPU has <strong className="text-white">8GB</strong> (RTX 3070/3070 Ti) or similar. The math doesn't work.
              </p>
              <ul className="space-y-2 text-text-secondary">
                <li>• 8GB VRAM = 16GB model maximum (and that's with 4-bit quantization)</li>
                <li>• R1 671B requires ~32GB minimum for FP16, ~40GB for comfortable use</li>
                <li>• The model loads partially, then crashes when it tries to allocate more memory</li>
              </ul>
            </div>
          </section>

          {/* Solution 1 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-text-primary mb-4">
              Solution 1: Use Quantized Models (Free)
            </h2>
            <div className="glass-card p-6">
              <p className="text-text-secondary mb-4">
                Use a smaller, quantized version of R1 that fits in your VRAM.
              </p>
              <div className="bg-background-tertiary rounded p-4 mb-4">
                <code className="text-sm text-green-400">
                  ollama run deepseek-r1:8b  # Fits in 8GB VRAM
                </code>
              </div>
              <p className="text-sm text-text-tertiary mb-2">
                <strong>Trade-off:</strong> The 8B version is faster but less intelligent. Good for testing, may fail at complex tasks.
              </p>
              <Link
                href="/blog/how-to-use-deepseek-with-openclaw#option-a"
                className="inline-block px-6 py-3 bg-brand-primary hover:bg-brand-hover text-white font-medium rounded transition-colors"
              >
                Read Full Guide →
              </Link>
            </div>
          </section>

          {/* Solution 2 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-text-primary mb-4">
              Solution 2: Rent a GPU (Immediate Fix)
            </h2>
            <div className="glass-card p-6">
              <p className="text-text-secondary mb-4">
                Use cloud GPU with sufficient VRAM. Spin up in minutes, pay by the hour.
              </p>
              <div className="bg-background-tertiary rounded p-4 mb-4">
                <p className="text-sm text-text-tertiary">
                  <strong>Recommended:</strong> Vultr High Frequency GPU (A100/A6000, 40-80GB VRAM)
                </p>
                <p className="text-sm text-text-tertiary mt-1">
                  ~$0.50-0.80/hr. Kill the instance when done.
                </p>
              </div>
              <a
                href="https://www.vultr.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-background-elevated hover:bg-background-primary text-text-primary font-medium rounded border border-white/10 transition-colors"
              >
                Rent a GPU →
              </a>
            </div>
          </section>

          {/* Quick Reference */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-text-primary mb-4">
              VRAM Requirements Quick Reference
            </h2>
            <div className="overflow-x-auto rounded-lg border border-white/10">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10">
                    <th className="px-4 py-3 text-left font-semibold text-white">Model</th>
                    <th className="px-4 py-3 text-left font-semibold text-white">Min VRAM</th>
                    <th className="px-4 py-3 text-left font-semibold text-white">Recommended VRAM</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5">
                    <td className="px-4 py-3 text-white/90">R1 1.5B</td>
                    <td className="px-4 py-3 text-white/90">4GB</td>
                    <td className="px-4 py-3 text-white/90">6GB</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="px-4 py-3 text-white/90">R1 7B/8B</td>
                    <td className="px-4 py-3 text-white/90">8GB</td>
                    <td className="px-4 py-3 text-white/90">12GB</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="px-4 py-3 text-white/90">R1 14B</td>
                    <td className="px-4 py-3 text-white/90">16GB</td>
                    <td className="px-4 py-3 text-white/90">24GB</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="px-4 py-3 text-white/90">R1 32B</td>
                    <td className="px-4 py-3 text-white/90">24GB</td>
                    <td className="px-4 py-3 text-white/90">32GB</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-white/90">R1 67B (Full)</td>
                    <td className="px-4 py-3 text-white/90">40GB</td>
                    <td className="px-4 py-3 text-white/90">48GB+</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* CTA */}
          <div className="glass-card p-8 text-center">
            <p className="text-text-secondary mb-4">
              Still confused? Read the full hardware guide.
            </p>
            <Link
              href="/blog/how-to-use-deepseek-with-openclaw"
              className="inline-block px-6 py-3 bg-brand-primary hover:bg-brand-hover text-white font-medium rounded transition-colors"
            >
              Read the Survival Guide →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
