import rehypeShiki, { RehypeShikiOptions } from '@shikijs/rehype'

const rehypeOptions: RehypeShikiOptions = {
  tabindex: false,
  addLanguageClass: true,
  inline: 'tailing-curly-colon',
  themes: {
    light: 'github-light-high-contrast',
    dark: 'github-dark-high-contrast'
  }
}

export const plugin = [rehypeShiki, rehypeOptions] as const
