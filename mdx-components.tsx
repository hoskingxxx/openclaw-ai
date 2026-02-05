import type { MDXComponents } from 'mdx/types'
import RealityCheck from '@/components/RealityCheck'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    RealityCheck,
  }
}
