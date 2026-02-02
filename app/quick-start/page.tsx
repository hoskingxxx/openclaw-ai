import { Navigation } from "@/components/features/Navigation";
import { Footer } from "@/components/features/Footer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation - OpenClaw Survivor Guide",
  description: "Two paths to running OpenClaw: The stable Cloud API route, or the experimental Local Hardware route.",
};

export default function QuickStartPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background-primary">
        <div className="max-w-3xl mx-auto px-6 py-12">

          {/* Header */}
          <div className="mb-12 border-b border-white/10 pb-8">
            <h1 className="text-4xl font-bold text-text-primary mb-4 font-mono">
              Documentation
            </h1>
            <p className="text-xl text-text-secondary">
              Choose how you want to lose time.
            </p>
          </div>

          {/* Decision Matrix (Reality Check) */}
          <section className="mb-16 bg-white/5 rounded-lg p-6 border border-white/10">
            <h2 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
              <span>⚖️</span> Reality Check
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-green-400 font-mono text-sm mb-2">PATH A: CLOUD API</h3>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>Setup time: 5 mins</li>
                  <li>Hardware: Any laptop</li>
                  <li>Cost: ~$1-5/mo (Usage based)</li>
                  <li>Stability: Operationally boring, until rate limits hit</li>
                </ul>
              </div>
              <div className="border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
                <h3 className="text-orange-400 font-mono text-sm mb-2">PATH B: LOCAL HARDWARE</h3>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>Setup time: 1-4 hours</li>
                  <li>Hardware: 16GB+ RAM / GPU</li>
                  <li>Cost: Electricity + Sanity</li>
                  <li>Stability: Experimental</li>
                </ul>
              </div>
            </div>
          </section>

          {/* PATH A */}
          <section id="cloud" className="mb-20">
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded text-xs font-mono font-bold">RECOMMENDED</span>
              <h2 className="text-2xl font-bold text-text-primary">Path A: The "Just Work" Method</h2>
            </div>

            <div className="space-y-8 border-l-2 border-green-500/20 pl-6 ml-2">
              {/* Step 1 */}
              <div>
                <h3 className="text-lg font-medium text-text-primary mb-2">1. Install OpenClaw</h3>
                <p className="text-sm text-text-secondary mb-3">
                  <code className="text-text-tertiary">node -v # MUST be &gt;=22.3.0 (Tested version)</code>
                </p>
                <CodeBlock code="npm install -g openclaw@latest" />
              </div>

              {/* Step 2 */}
              <div>
                <h3 className="text-lg font-medium text-text-primary mb-2">2. Get DeepSeek Key</h3>
                <p className="text-sm text-text-secondary mb-3">
                  Sign up at <a href="https://platform.deepseek.com" target="_blank" rel="noopener noreferrer" className="text-brand-primary underline">platform.deepseek.com</a>.
                </p>
              </div>

              {/* Step 3 */}
              <div>
                <h3 className="text-lg font-medium text-text-primary mb-2">3. Configure .env</h3>
                <p className="text-sm text-text-secondary mb-3">
                  Create <code>.env</code> in the root directory where you run <code>openclaw start</code>.
                </p>
                <CodeBlock
                  title=".env"
                  code={`# REQUIRED: Use "openai" provider because DeepSeek uses OpenAI-compatible API
LLM_PROVIDER="openai"
LLM_BASE_URL="https://api.deepseek.com"
LLM_API_KEY="sk-your-key-here"
LLM_MODEL="deepseek-reasoner"`}
                />
                <div className="mt-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded">
                  <p className="text-xs text-yellow-200">
                    <strong>⚠️ Rate Limit Reality:</strong> Expect 429 errors or region latency during peak hours (9AM-11AM Beijing time). This is not a bug, it's the reality of DeepSeek.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div>
                <h3 className="text-lg font-medium text-text-primary mb-2">4. Launch</h3>
                <CodeBlock code="openclaw start" />
              </div>
            </div>
          </section>

          {/* PATH B */}
          <section id="local" className="mb-20 pt-8 border-t border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded text-xs font-mono font-bold">HARDWARE REQUIRED</span>
              <h2 className="text-2xl font-bold text-text-primary">Path B: Local (Ollama)</h2>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4 mb-8">
              <p className="text-sm text-orange-200">
                <strong>⚠️ Warning:</strong> If you have less than 16GB RAM, turn back now. Your system will freeze.
              </p>
            </div>

            {/* Pre-flight Check */}
            <div className="mb-8 p-4 bg-background-tertiary/50 rounded-lg border border-white/10">
              <h4 className="text-sm font-mono text-text-primary mb-3">Pre-flight Checklist:</h4>
              <div className="space-y-2 text-sm text-text-secondary">
                <p>Before you start, verify available VRAM:</p>
                <CodeBlock code="nvidia-smi
# Look for: Memory-Total (should be 16GB+ for 8B model)" />
                <p className="text-xs text-text-tertiary mt-2">If Memory-Total is under 16GB, your system will freeze during model load. Stop here.</p>
              </div>
            </div>

            <div className="space-y-8 border-l-2 border-orange-500/20 pl-6 ml-2">
              {/* Step 1 */}
              <div>
                <h3 className="text-lg font-medium text-text-primary mb-2">1. Install Ollama & Pull Model</h3>
                <CodeBlock code={`# Install Ollama (Mac/Linux)
curl -fsSL https://ollama.com/install.sh | sh

# Pull the 8B model
ollama run deepseek-r1:8b`} />
                <div className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded">
                  <p className="text-xs text-red-200">
                    <strong>⚠️ 8GB Blood Oath:</strong> 8B model ≠ 8GB VRAM. With long context, you WILL OOM. Start with <code>num_ctx: 4096</code> or lower in your OpenClaw config.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div>
                <h3 className="text-lg font-medium text-text-primary mb-2">2. Configure OpenClaw</h3>
                <p className="text-sm text-text-secondary mb-3">
                  Create <code>.env</code> in the root directory where you run <code>openclaw start</code>.
                </p>
                <CodeBlock
                  title=".env"
                  code={`LLM_PROVIDER="ollama"
LLM_BASE_URL="http://localhost:11434/v1"
LLM_MODEL="deepseek-r1:8b"`}
                />
                <div className="mt-3 p-3 bg-background-tertiary/50 rounded-lg border border-white/10">
                  <p className="text-xs text-text-tertiary">
                    <strong>Fail-Fast Tip:</strong> If it freezes on first run, do NOT retry. Lower your context window immediately. Set <code>num_ctx: 2048</code> and test again.
                  </p>
                </div>
              </div>

               {/* Step 3 */}
               <div>
                <h3 className="text-lg font-medium text-text-primary mb-2">3. Launch</h3>
                <CodeBlock code="openclaw start" />
              </div>
            </div>
          </section>

          {/* Survivor Checklist */}
          <section className="mb-20 p-6 bg-white/5 rounded-lg border border-white/10">
            <h3 className="text-lg font-mono text-text-primary mb-4">Before You Report An Issue:</h3>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>[ ] Ran <code>nvidia-smi</code> and verified available VRAM?</li>
              <li>[ ] <code>.env</code> file exists in current folder?</li>
              <li>[ ] Using <code>deepseek-reasoner</code> for R1?</li>
              <li>[ ] Checked <Link href="/oom" className="text-brand-primary hover:underline">OOM solutions</Link>?</li>
            </ul>
            <p className="text-xs text-text-tertiary mt-4">
              If you checked all of these and still have issues, then report a bug.
            </p>
          </section>

          {/* CTA */}
          <div className="glass-card p-8 text-center mt-12">
             <h3 className="text-xl font-bold text-text-primary mb-2">Stuck?</h3>
             <p className="text-text-secondary mb-6">Read the full guide for common OOM fixes.</p>
             <Button href="/guides/how-to-use-deepseek-with-openclaw" variant="secondary">
               Go to Survival Guide →
             </Button>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
