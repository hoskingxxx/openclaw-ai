/**
 * Offer SSOT (Single Source of Truth)
 * 全站收入路径唯一化实施方案（7天冻结版）
 *
 * DEFINES 3 offers:
 * - PRIMARY_OFFER: Survival Kit (Gumroad) - Main revenue path
 * - CLOUD_OFFER: Vultr Cloud Sandbox - Context offer (RED verdict only)
 * - SUPPORT_OFFER: Buy Me a Coffee - Footer only (low weight)
 *
 * DEV GATE: Changes require passing `npm run release:gate`
 * 没通过 npm run release:gate 不准合并、不准部署。
 */

// ============================================================================
// TYPES
// ============================================================================

export type OfferType = "primary" | "context" | "support"
export type DestType = "gumroad" | "vultr" | "bmac"
export type RevenueOffer = "fix_now" | "escape_local" | "support"

export interface OfferConfig {
  id: string
  name: string
  type: OfferType
  dest_type: DestType
  url: string
  dest_id: string
  price: string
  enabled: boolean
}

// ============================================================================
// PRIMARY OFFER - Survival Kit (Gumroad)
// 全站主要收入路径 - 展示位置：文章页顶部/底部、Footer
// ============================================================================

export const PRIMARY_OFFER: OfferConfig = {
  id: "survival_kit",
  name: "Survival Kit",
  type: "primary",
  dest_type: "gumroad",
  url: "https://hilda666888.gumroad.com/l/ymwwgm",
  dest_id: "gumroad_ymwwgm",
  price: "$9.90",
  enabled: true,
}

// ============================================================================
// CONTEXT OFFER - Cloud Sandbox (Vultr)
// 条件渲染 - 仅在 verdict=RED 时显示（硬件不足时推荐云 GPU）
// ============================================================================

export const CLOUD_OFFER: OfferConfig = {
  id: "cloud_sandbox",
  name: "Vultr Cloud Sandbox",
  type: "context",
  dest_type: "vultr",
  url: "https://www.vultr.com/?ref=9864821-9J",
  dest_id: "vultr_cloud_gpu",
  price: "$5/mo",
  enabled: true,
}

// ============================================================================
// SUPPORT OFFER - Buy Me a Coffee
// 仅在 Footer 展示 - 低权重文本链接
// ============================================================================

export const SUPPORT_OFFER: OfferConfig = {
  id: "coffee",
  name: "Buy Me a Coffee",
  type: "support",
  dest_type: "bmac",
  url: "https://buymeacoffee.com/openclaw",
  dest_id: "bmac_openclaw",
  price: "Support",
  enabled: true,
}

// ============================================================================
// OFFER LOOKUP (for dynamic imports)
// ============================================================================

export const OFFERS: Record<string, OfferConfig> = {
  survival_kit: PRIMARY_OFFER,
  cloud_sandbox: CLOUD_OFFER,
  coffee: SUPPORT_OFFER,
}

// ============================================================================
// CTA ID GENERATOR (Canonical tracking IDs)
// Format: {offer}_{placement}_{variant}_{verdict?}
// ============================================================================

export type CtaPlacement = "top" | "bottom" | "footer" | "red_card" | "yellow_card" | "green_card"

export function generateCtaId(params: {
  offer: "kit" | "cloud" | "coffee"
  placement: CtaPlacement
  verdict?: "red" | "yellow" | "green"
}): string {
  const { offer, placement, verdict } = params

  // Primary offer (Survival Kit)
  if (offer === "kit") {
    if (verdict === "red") return `kit_red_secondary`
    if (verdict === "yellow") return `kit_yellow_primary`
    if (verdict === "green") return `kit_green_secondary`
    return `kit_${placement}`
  }

  // Cloud offer (Vultr)
  if (offer === "cloud") {
    if (verdict === "red") return `vultr_red_primary`
    if (verdict === "yellow") return `vultr_yellow_secondary`
    if (verdict === "green") return `vultr_green_secondary`
    return `cloud_${placement}`
  }

  // Support offer (Coffee)
  return `coffee_${placement}`
}

// ============================================================================
// EXPORT ALL OFFERS (for SSOT usage)
// ============================================================================

export const ALL_OFFERS = [PRIMARY_OFFER, CLOUD_OFFER, SUPPORT_OFFER] as const

// ============================================================================
// HELPER: Get offer by type
// ============================================================================

export function getOfferByType(type: OfferType): OfferConfig | undefined {
  return ALL_OFFERS.find((offer) => offer.type === type)
}
