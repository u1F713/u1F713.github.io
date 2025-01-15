import { NodeContext } from '@effect/platform-node'
import { Chunk, ManagedRuntime, Stream } from 'effect'
import Link from 'next/link'
import { getArticles } from '../utils.ts'

async function Articles() {
  const runtime = ManagedRuntime.make(NodeContext.layer)
  const entries = await runtime.runPromise(Stream.runCollect(getArticles))

  return (
    <div className="py-4 lg:p-8">
      <ul className="flex flex-col gap-4">
        {Chunk.toReadonlyArray(entries).map(({ data, id }) => (
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
