import { NodeContext } from '@effect/platform-node'
import { Chunk, Effect, Stream } from 'effect'
import type { NextPage } from 'next'
import Link from 'next/link'
import * as Post from '../Post.ts'

const postTask = Post.collection.pipe(
  Stream.flatMap(post =>
    Stream.map(post.data, data => ({ id: post.id, data }))
  ),
  Stream.runCollect
)

const Posts: NextPage = async () => {
  const posts = await Effect.runPromise(
    postTask.pipe(
      Effect.map(Chunk.sort(Post.order)),
      Effect.provide(NodeContext.layer),
      Effect.map(Chunk.toReadonlyArray)
    )
  )

  return (
    <div className="mx-auto w-full max-w-screen-xl">
      <h1 className="pb-10 text-xl font-semibold">Blog posts</h1>

      <ul className="flex flex-col gap-4">
        {posts.map(({ id, data }) => (
          <li key={id}>
            <Link href={`/${id}`} about="">
              <article className="hover:bg-dn-surface-100 border-dn-border rounded-xl border p-4">
                <p className="text-dn-color-200/70 mt-0 mb-2">
                  <time dateTime={data.pubDate.toDateString()}>
                    {data.pubDate.toLocaleString('en-US', {
                      dateStyle: 'long'
                    })}
                  </time>
                </p>
                <h3 className="text-xl">{data.title}</h3>
                <p className="text-dn-color-200/80">{data.description}</p>
              </article>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Posts
