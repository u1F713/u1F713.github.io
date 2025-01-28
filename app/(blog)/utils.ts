import { getEntry } from '@/lib/markdown-content/render.ts'
import { getContent } from '@/lib/markdown-content/stream.ts'
import { Stream } from 'effect'
import { PostScheme } from './postScheme.ts'

export const getPost = Stream.mapEffect(
  getContent('app/(blog)/content'),
  getEntry(PostScheme)
)
