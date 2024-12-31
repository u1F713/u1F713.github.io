import { getCollection } from '@/lib/markdown-content/render.ts'
import { NodeContext } from '@effect/platform-node'
import { ManagedRuntime } from 'effect'
import Link from 'next/link'
import { ArticleScheme } from '../article-scheme'

async function Articles() {
  const runtime = ManagedRuntime.make(NodeContext.layer)
  const entries = await runtime.runPromise(
    getCollection(ArticleScheme)('app/(blog)/content')
  )

  return (
    <div>
      {entries.map(e => (
        <Link href={`/${e.id}`} key={e.id}>
          {e.data.title}
        </Link>
      ))}
    </div>
  )
}

export default Articles
