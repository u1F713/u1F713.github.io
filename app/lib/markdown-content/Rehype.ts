import rehypeShiki, { type RehypeShikiOptions } from '@shikijs/rehype'
import type { Root } from 'hast'
import { visit } from 'unist-util-visit'

const rehypeOptions: RehypeShikiOptions = {
  tabindex: false,
  addLanguageClass: true,
  inline: 'tailing-curly-colon',
  themes: {
    light: 'catppuccin-latte',
    dark: 'night-owl'
  }
}

const addLanguageDataAttribute = () => (tree: Root) =>
  visit(tree, 'element', (node, _, parent) => {
    if (
      parent?.type === 'element' &&
      parent.tagName === 'pre' &&
      node.tagName === 'code' &&
      Array.isArray(node.properties?.class) &&
      typeof node.properties?.class[0] === 'string'
    ) {
      parent.properties = {
        ...parent.properties,
        'data-language': node.properties.class[0].match(/language-(.*)/)?.[1]
      }
      node.properties.class = null
    }
  })

export const plugins = [
  [rehypeShiki, rehypeOptions],
  addLanguageDataAttribute
] as const
