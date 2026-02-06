import type { Root, Element, Text } from "hast";
import { visit } from "unist-util-visit";

export interface TocItem {
  id: string;
  label: string;
  level: number;
}

type Options = {
  collector: TocItem[];
};

export function rehypeCollectHeadings(options: Options) {
  const { collector } = options;

  return (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      if (node.tagName !== "h2" && node.tagName !== "h3") return;

      const id = node.properties?.id;
      if (typeof id !== "string") return;

      const label = getTextContent(node).trim();
      if (!label) return;

      const level = node.tagName === "h2" ? 2 : 3;

      collector.push({ id, label, level });
    });
  };
}

function getTextContent(node: Element): string {
  let text = "";
  const children = node.children || [];
  for (const child of children) {
    if (child.type === "text") {
      text += (child as Text).value;
    } else if (child.type === "element") {
      text += getTextContent(child as Element);
    }
  }
  return text;
}
