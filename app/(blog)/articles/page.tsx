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
    <div className="py-4 lg:p-8">
      <ul className="flex flex-col gap-4">
        {entries.map(({ data, id }) => (
          <li
            className="hover:bg-ds-border/40 border-ds-border group border-y p-4 lg:border-x"
            key={id}
          >
            <Link href={`/${id}`}>
              <h3 className="mb-2 text-lg font-bold">{data.title}</h3>
              <p className="text-ds-text/60 group-hover:text-ds-text">
                {data.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Articles
