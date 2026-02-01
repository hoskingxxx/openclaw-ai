"use client";

import { useState, useMemo } from "react";
import { commandTemplates } from "@/lib/content";

export function CommandBuilder() {
  const [goal, setGoal] = useState("");
  const [scope, setScope] = useState("");
  const [constraints, setConstraints] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const generatedCommand = useMemo(() => {
    return `目标：${goal || "待填写"}
范围：${scope || "待填写"}
约束：${constraints || "待填写"}
输出要求：${output || "待填写"}

---
💡 复制后直接发送给 OpenClaw 即可执行`;
  }, [goal, scope, constraints, output]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadTemplate = (templateId: string) => {
    const template = commandTemplates.find((t) => t.id === templateId);
    if (template) {
      const lines = template.template.split("\n");
      lines.forEach((line) => {
        if (line.startsWith("目标：")) setGoal(line.replace("目标：", ""));
        if (line.startsWith("范围：")) setScope(line.replace("范围：", ""));
        if (line.startsWith("约束：")) setConstraints(line.replace("约束：", ""));
        if (line.startsWith("输出：")) setOutput(line.replace("输出：", ""));
      });
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
          🦞 OpenClaw 指令生成器
        </h2>
        <p className="text-text-secondary text-lg">
          输入你的目标，自动生成标准指令模板
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 左侧：表单输入 */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              🎯 你想要完成什么？
            </label>
            <textarea
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="例如：修复项目中的 bug、批量处理 Excel 文件..."
              className="w-full px-4 py-3 bg-background-tertiary border border-white/10 rounded-lg text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-brand-primary transition-colors"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              📁 限制范围（可选）
            </label>
            <input
              type="text"
              value={scope}
              onChange={(e) => setScope(e.target.value)}
              placeholder="例如：仅 src/ 目录、仅 data/ 文件夹..."
              className="w-full px-4 py-3 bg-background-tertiary border border-white/10 rounded-lg text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-brand-primary transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              ⚠️ 约束条件（可选）
            </label>
            <input
              type="text"
              value={constraints}
              onChange={(e) => setConstraints(e.target.value)}
              placeholder="例如：不新增依赖、保持 API 兼容..."
              className="w-full px-4 py-3 bg-background-tertiary border border-white/10 rounded-lg text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-brand-primary transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              📤 期望的输出格式
            </label>
            <select
              value={output}
              onChange={(e) => setOutput(e.target.value)}
              className="w-full px-4 py-3 bg-background-tertiary border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-brand-primary transition-colors"
            >
              <option value="">选择输出格式...</option>
              <option value="diff + 说明">diff + 说明</option>
              <option value="新文件">新文件</option>
              <option value="JSON 报告">JSON 报告</option>
              <option value="总结文本">总结文本</option>
            </select>
          </div>
        </div>

        {/* 右侧：实时预览 */}
        <div className="lg:sticky lg:top-24 h-fit">
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">生成的指令</h3>
              <button
                onClick={handleCopy}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  copied
                    ? "bg-green-600 text-white"
                    : "bg-brand-primary hover:bg-brand-hover text-white"
                }`}
              >
                {copied ? "✓ 已复制" : "📋 复制指令"}
              </button>
            </div>
            <pre className="p-4 bg-background-tertiary rounded-lg overflow-x-auto">
              <code className="text-sm text-text-primary font-mono whitespace-pre-wrap">
                {generatedCommand}
              </code>
            </pre>
          </div>
        </div>
      </div>

      {/* 快速模板 */}
      <div className="mt-12">
        <h3 className="text-xl font-semibold text-text-primary mb-6">快速模板</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {commandTemplates.map((template) => (
            <button
              key={template.id}
              onClick={() => loadTemplate(template.id)}
              className="glass-card p-4 text-left hover:bg-white/12 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-2xl mb-2">{template.icon}</div>
              <div className="text-text-primary font-medium">{template.title}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 免责声明 */}
      <div className="mt-12 p-6 bg-background-tertiary/50 rounded-xl border border-brand-primary/20">
        <div className="flex items-start gap-4">
          <div className="text-3xl flex-shrink-0">⚠️</div>
          <div>
            <h4 className="text-lg font-semibold text-text-primary mb-2">使用免责声明</h4>
            <p className="text-sm text-text-secondary leading-relaxed">
              生成的指令会在你的环境中执行，OpenClaw 将根据你的目标自动拆解任务并调用系统工具。
              请务必理解指令内容后再执行，特别是涉及文件修改、系统配置等操作时。
            </p>
            <ul className="mt-3 space-y-1 text-xs text-text-tertiary">
              <li>• 建议在测试环境中先运行验证</li>
              <li>• 涉及重要数据前请先备份</li>
              <li>• 使用约束条件可以限制执行范围</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
