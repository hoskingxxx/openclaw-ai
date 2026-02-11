# OpenClaw AI Survival Guide

Battle-tested documentation for running DeepSeek R1 locally without OOM errors.

## Quick Start

```bash
npm install
npm run dev
```

## Development

```bash
npm run build
npm run dev
```

## Testing

```bash
npm run test:preflight           # Local tracking tests
npm run test:prod:preflight     # Production smoke tests
npm run test:dedupe             # Cross-page impression dedupe
```

---

## Release Gate

Before deploying to production, run the complete test suite:

```bash
npm run build && npm run test:preflight && npm run test:prod:preflight && npm run test:dedupe
```

All tests must pass before any production deployment.

## Project Status

- **Phase:** AEO-first
- **Stack:** Next.js 16, React, Tailwind CSS
- **Hosting:** Vercel
