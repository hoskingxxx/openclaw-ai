import { visit } from "unist-util-visit";
import type { Root, Element, Text } from "hast";

/**
 * rehype plugin to mark internal guide links in "Related" sections as cluster links
 *
 * Finds links within sections headed by "Related Articles", "Related Fixes", "Related Issues", etc.
 * and adds data-link="cluster" attribute to internal guide links (href starting with "/guides/")
 *
 * This enables CSS styling of cluster links without using href-based selectors.
 */
export function rehypeClusterLinks() {
  return (tree: Root) => {
    let inRelatedSection = false;

    visit(tree, "element", (node: Element, index, parent) => {
      // Track if we're in a "Related" section (h2 heading starting with "Related")
      if (node.tagName === "h2") {
        const textContent = getTextContent(node);
        inRelatedSection = /^Related\s+(Articles|Fixes|Guides|Issues)/i.test(textContent);
        return;
      }

      // Add data-link="cluster" to internal guide links within Related sections
      if (inRelatedSection && node.tagName === "a") {
        const href = node.properties?.href;
        if (typeof href === "string" && href.startsWith("/guides/")) {
          node.properties = node.properties || {};
          node.properties["dataLink"] = "cluster";
        }
      }
    });
  };
}

function getTextContent(node: Element): string {
  let text = "";
  if (node.children) {
    for (const child of node.children) {
      if (child.type === "text") {
        text += (child as Text).value;
      } else if (child.type === "element") {
        text += getTextContent(child as Element);
      }
    }
  }
  return text;
}
