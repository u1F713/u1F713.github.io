import { getEntry } from '@/lib/markdown-content/render.ts'
import { getContent } from '@/lib/markdown-content/stream.ts'
import { Stream } from 'effect'
import { ArticleScheme } from './article-scheme'

export const getArticles = Stream.mapEffect(
  getContent('app/(blog)/content'),
  getEntry(ArticleScheme)
)
