// @ts-check
import { CONTINUE, visit } from "unist-util-visit";

/**
 * Check if url is absolute
 *
 * @param {string} url
 * @returns {boolean}
 */
function isAbsoluteUrl(url) {
  return url.startsWith("http://") || url.startsWith("https://");
}

/**
 * Check if url is a heading link
 *
 * @param {string} url
 */
function isHeadingLink(url) {
  return url.startsWith("#");
}

/**
 * Check if node is a link node
 *
 */
function isLinkNode(node) {
  return node.type === "link" && !!node.url;
}

/**
 * Check if url starts with base path
 *
 * @param {string} str
 * @param {string} base
 */
function startsWithBasePath(str, base) {
  return str.startsWith(base);
}

export function remarkBasePath(options = {}) {
  const { base = "" } = options;

  return (tree) => {
    visit(tree, (node) => {
      // Handle link nodes
      if (isLinkNode(node)) {
        if (!isAbsoluteUrl(node.url) && !isHeadingLink(node.url) && !startsWithBasePath(node.url, base)) {
          node.url = `${base}${node.url}`;
        }
        return CONTINUE;
      }

      const hasHref = node?.attributes?.find((a) => a.name === "href");
      if (hasHref) {
        node.attributes = node.attributes.map((a) => {
          if (
            a.name === "href" &&
            !isAbsoluteUrl(a.value) &&
            !isHeadingLink(a.value) &&
            !startsWithBasePath(a.value, base)
          ) {
            a.value = `${base}${a.value}`;
            return a;
          }
          return a;
        });
      }
    });
  };
}
